"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import useSWR, { mutate } from "swr";
import dynamic from "next/dynamic";
import { useOnlineStatus } from "@/lib/hook/connection-hook";

const DynamicAlert = dynamic(() =>
  import("@/components/alerts/SlowConnectionAlert")
);

const DynamicMarkerWithInfo = dynamic(() => import("./Marker"), {
  ssr: false,
});

const Default = () => {
  // local Value
  const [localTenant, setLocalTenant] = useState("");

  // Connection state
  const isOnline = useOnlineStatus();
  const [responseTime, setResponseTime] = useState(null);
  const [isConnectionUnstable, setIsConnectionUnstable] = useState(false);

  // Handle slow loading on SWR
  const [isSlowLoad, setSlowLoad] = useState(false);

  // State to store selected device
  const [selectedDevice, setSelectDevice] = useState({
    lat: null,
    lot: null,
  });

  // Used to set pin color based on SWR Connection
  const [deviceStatus, setDeviceStatus] = useState(false);

  // Function to fetch the /tools/location/getlocation API [REALTIME]
  const fetchDeviceRealtime = async (
    url,
    tenant,
    start_trancation_date,
    end_trancation_date
  ) => {
    // main point to track unstable network
    const startTime = performance.now();

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
        throw new Error(
          `HTTP error on fetchDeviceRealtime! Status: ${response.statusText}`
        );
      }

      // checkpoint to check network performance
      const endTime = performance.now();
      setResponseTime(endTime - startTime);

      setDeviceStatus(true);
      const data = await response.json();

      return data;
    } catch (err) {
      setDeviceStatus(false);
      setResponseTime(null);
      if (process.env.NODE_ENV === "development") {
        console.error("Error in fetchDeviceRealtime: ", err);
      }
      throw err;
    }
  };

  // TODO: Clear SWR Cache
  const clearSWRCache = () =>
    mutate(() => true, undefined, {
      revalidate: false,
      rollbackOnError: true,
    });

  // TODO: SWR to get device list
  /**
   * We will map this data based on their Index
   * then we will get the tenancy (more than 2 devices) with their own datas
   */
  const { data, isLoading, error } = useSWR(
    localTenant
      ? [
          "/api/tools/location/getlocation",
          localTenant,
          "2023-01-01 00:00:00",
          "2024-12-30 23:59:00",
        ]
      : null,
    ([url, tenant, start_trancation_date, end_trancation_date]) =>
      fetchDeviceRealtime(
        url,
        tenant,
        start_trancation_date,
        end_trancation_date
      ),
    {
      isPaused: () => (!isOnline && !localTenant ? true : false),
      isOnline: () => isOnline,
      refreshInterval: 500,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      revalidateOnFocus: false,
      loadingTimeout: 6000,
      onLoadingSlow: () => {
        setSlowLoad(true);
      },
      onSuccess: () => {
        setSlowLoad(false);
      },
      onError: (err) => {
        setSlowLoad(false);
        clearSWRCache();
      },
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

  // TODO: Get local tenant item
  useEffect(() => {
    const currentUser = localStorage.getItem("tenant");

    // If tenant local storage is undefined or null
    if (!currentUser) {
      // set local tenant state to null
      setLocalTenant("");
      return;
    }

    // save local tenant value to state
    setLocalTenant(currentUser.toString());

    return () => {
      setLocalTenant("");
    };
  }, []);

  // TODO: Set devices location when data is available
  useEffect(() => {
    if (data) {
      setSelectDevice({
        lat: data?.loc.data[0].lat,
        lot: data?.loc.data[0].lot,
      });
    }

    // Cleanup function to reset state on unmount
    return () => {
      setSelectDevice({ lat: null, lot: null });
    };
  }, [data]);

  // TODO: Alert user if response time is high
  useEffect(() => {
    // Threshold of 5000ms / 5sec
    if (responseTime !== null && responseTime > 5000) {
      setIsConnectionUnstable(true);
    } else {
      setIsConnectionUnstable(false);
    }

    // Cleanup function to reset state on unmount
    return () => {
      setIsConnectionUnstable(false);
    };
  }, [isOnline, responseTime]);

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

  if (!isOnline) {
    return (
      <span className="text-sm text-white text-wrap text-clip">
        You are offline.
      </span>
    );
  }

  return (
    <>
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
        {!localTenant || selectedDevice.lat === undefined ? (
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
              lat: parseFloat(selectedDevice.lat),
              lng: parseFloat(selectedDevice.lot),
            }}
            defaultZoom={4.9}
            disableDefaultUI={true}
            clickableIcons={true}
            zoomControl={true}
            fullscreenControl={true}
            className="w-full h-[calc(100dvh-168px)] overflow-hidden rounded-md shadow-md md:shadow-lg lg:rounded-lg"
          >
            {localTenant && isOnline && !isSlowLoad && !isConnectionUnstable
              ? data?.loc["data"].map((location, index) =>
                  location.parent != 0 && deviceStatus ? (
                    <DynamicMarkerWithInfo
                      key={`${location.code}-${index}`}
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
    </>
  );
};

export default Default;
