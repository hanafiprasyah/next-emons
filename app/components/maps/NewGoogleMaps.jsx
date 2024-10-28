"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import useSWR from "swr";
import dynamic from "next/dynamic";

const DynamicMarkerWithInfo = dynamic(() => import("./Marker"), {
  ssr: true,
});

const Default = () => {
  // local Value
  const [localTenant, setLocalTenant] = useState("");

  // Used to set the /tool/dataLocation API
  const [selectDev, setSelectDev] = useState([]);
  // const [selectDev, setSelectDev] = useState([102, 'Ruang ICU Lt 3']);

  // Used to set pin color based on SWR Connection
  const [deviceStatus, setDeviceStatus] = useState(false);

  // Function to fetch the /tools/location/getlocation API [REALTIME]
  const fetchDeviceRealtime = async (
    url,
    tenant,
    start_trancation_date,
    end_trancation_date
  ) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": `${process.env.BASE_URL}/`,
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers":
            "Content-Type, Accept, Origin, X-Requested-With",
          tenant: tenant,
          token: process.env.AUTH_TOKEN,
        },
        body: JSON.stringify({
          tenant: tenant,
          locationid: 0,
          lane: "",
          status: "",
          value: "",
          side: "0",
          start_trancation_date: start_trancation_date,
          end_trancation_date: end_trancation_date,
        }),
      });

      if (!response.ok) {
        setDeviceStatus(false);
        throw new Error(`Please check your connection..`);
      }

      setDeviceStatus(true);
      const data = await response.json();
      return data;
    } catch (err) {
      setDeviceStatus(false);
      if (process.env.NODE_ENV === "development") {
        console.log("Error in fetchDeviceRealtime: ", err);
      }
      throw err;
    }
  };

  // SWR
  /**
   * We will map this data based on their Index
   * then we will get the tenancy (more than 2 devices) with their own datas
   */
  const { data, isLoading, error } = useSWR(
    [
      "/api/tools/location/getlocation",
      localTenant,
      "2023-01-01 00:00:00",
      "2024-12-30 23:59:00",
    ],
    async ([url, tenant, start_trancation_date, end_trancation_date]) => {
      try {
        return await fetchDeviceRealtime(
          url,
          tenant,
          start_trancation_date,
          end_trancation_date
        );
      } catch (err) {
        if (process.env.NODE_ENV === "development") {
          console.log("Error SWR Fetch data: ", err);
        }
        throw err;
      }
    },
    {
      isPaused: () => (localTenant === "" && !deviceStatus ? true : false),
      refreshInterval: 3000,
      revalidateOnFocus: false,
      loadingTimeout: 6000,
      onLoadingSlow: () => {
        setChannel("Unstable network, please wait..");
      },
      onError: (err) => clearSWRCache(),
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // TODO: Never retry on 404
        if (error.status === 404) return;
        // TODO: Disable retry for spesific key
        if (
          JSON.stringify(key) ===
          JSON.stringify([
            "/api/tools/location/getlocation",
            localTenant,
            "2023-01-01 00:00:00",
            "2024-12-30 23:59:00",
          ])
        )
          return;
        // TODO: Only 10 times retry
        if (retryCount > 10) return;
        // TODO: Retry interval
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    }
  );

  useEffect(() => {
    // Get local tenant item
    const currentUser = localStorage.getItem("tenant");
    if (currentUser) {
      setLocalTenant(`${currentUser.toString()}`);

      if (data) {
        setDeviceStatus(true);
        const firstIndexSite = data.loc["data"][0];
        setSelectDev([firstIndexSite["lat"], firstIndexSite["lot"]]);
      } else if (error) {
        setDeviceStatus(false);
        setSelectDev([]);
      } else {
        setDeviceStatus(false);
      }
    } else {
      setDeviceStatus(false);
      setLocalTenant("");
    }
  }, [data, error]);

  if (error) {
    return (
      <span className="text-sm text-white text-wrap text-clip">
        {`${error}`}
      </span>
    );
  }

  if (isLoading) {
    return (
      <div
        className="animate-spin inline-block size-3 border-[2px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <APIProvider
      version="weekly"
      authReferrerPolicy="origin"
      region="ID"
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      onLoad={() => (
        <div
          className="animate-spin inline-block size-3 border-[2px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      )}
    >
      {localTenant === "" ||
      localTenant === undefined ||
      selectDev[0] === undefined ? (
        <div
          className="animate-spin inline-block size-3 border-[2px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <Map
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}
          renderingType="RASTER"
          // -0.6470361141413117, 115.40106170003429 => Center of Indonesia's Map
          defaultCenter={{
            lat: parseFloat(selectDev[0]),
            lng: parseFloat(selectDev[1]),
          }}
          defaultZoom={4.9}
          disableDefaultUI={true}
          clickableIcons={true}
          zoomControl={true}
          fullscreenControl={true}
          className="w-full h-[calc(100dvh-168px)] overflow-hidden rounded-md shadow-md md:shadow-lg lg:rounded-lg"
        >
          {localTenant.length != 0
            ? data?.loc["data"].map((location) =>
                location.parent != 0 && deviceStatus ? (
                  <DynamicMarkerWithInfo
                    key={location.code}
                    locationid={location.code}
                    tenantRef={localTenant}
                    signal={deviceStatus}
                    lat={parseFloat(location.lat)}
                    lot={parseFloat(location.lot)}
                    markerLabel={location.name}
                    title={location.name}
                  />
                ) : null
              )
            : null}
        </Map>
      )}
    </APIProvider>
  );
};

export default Default;
