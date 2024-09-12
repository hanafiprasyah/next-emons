"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import MarkerWithInfo from "./Marker";
import useSWR from "swr";

const Default = () => {
  // local Value
  const [localTenant, setLocalTenant] = useState("");

  // Used to set the /tool/dataLocation API
  const [dataDev, setDataDev] = useState([]);
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
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://45.13.132.175/",
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
    }).then((res) => {
      if (!res.ok) {
        setDeviceStatus(false);
        throw new Error("500. An error occured.");
      }

      // if (process.env.NODE_ENV === "development") {
      //   console.log("Response from fetchDeviceRealtime: " + res.statusText);
      // }

      setDeviceStatus(true);
      const data = res.json();
      return data;
    });
  };

  // SWR
  /**
   * We will map this data based on their Index
   * then we will get the tenancy (more than 2 devices) with their own datas
   */
  const { data, error } = useSWR(
    localTenant !== "" && localTenant !== undefined
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
      refreshInterval: 1000,
    }
  );

  useEffect(() => {
    // Get local tenant item
    const currentUser = localStorage.getItem("tenant");
    if (localStorage.length != 0) {
      setLocalTenant(`${currentUser.toString()}`);
    }

    if (data) {
      setDataDev(data.loc["data"]);
      const firstIndexSite = data.loc["data"][0];
      setSelectDev([firstIndexSite["lat"], firstIndexSite["lot"]]);
    } else if (error) {
      setDeviceStatus(false);
    }
  }, [data, error]);

  if (!data) {
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

  if (error) {
    return <span>{error}</span>;
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
          defaultCenter={{
            lat: selectDev[0],
            lng: selectDev[1],
          }}
          defaultZoom={20}
          disableDefaultUI={true}
          clickableIcons={true}
          zoomControl={true}
          fullscreenControl={true}
          className="w-full h-[calc(100vh-164px)] overflow-hidden rounded-md shadow-md md:shadow-lg lg:rounded-lg"
        >
          {localTenant.length != 0
            ? dataDev.map((location) =>
                location.parent != 0 ? (
                  <MarkerWithInfo
                    key={location.code}
                    locationid={location.code}
                    tenantRef={localTenant}
                    signal={deviceStatus}
                    lat={location.lat}
                    lot={location.lot}
                    markerLabel={location.name}
                    title={location.name}
                    parentName={location.parent}
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
