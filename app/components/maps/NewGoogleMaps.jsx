"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import MarkerWithInfo from "./Marker";
import useSWR from "swr";

const Default = () => {
  // local Value
  const [localTenant, setLocalTenant] = useState("");

  // Used to set the /tool/dataside API
  const [dataLoc, setDataLoc] = useState([]);
  const [selectLoc, setSelectLoc] = useState([]);
  // const [selectLoc, setSelectLoc] = useState([10, 'Siloam Cibubur']);

  // Used to set the /tool/dataLocation API
  const [dataDev, setDataDev] = useState([]);
  const [selectDev, setSelectDev] = useState([]);
  // const [selectDev, setSelectDev] = useState([102, 'Ruang ICU Lt 3']);

  // Used to set pin color based on SWR Connection
  const [deviceStatus, setDeviceStatus] = useState(false);

  // Function to fetch the /device/getlastdatavoltage API [REALTIME]
  const fetchVoltageRealtime = async (url, tenant, locationid) => {
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
        locationid: locationid,
        lane: "",
        status: "",
        value: "",
        side: "",
        start_date: "",
        end_date: "",
      }),
    }).then((res) => {
      res.ok ? setDeviceStatus(true) : setDeviceStatus(false);
      if (process.env.NODE_ENV === "development") {
        console.log(res.statusText);
      }
    });
  };

  // SWR
  const { data, error } = useSWR(
    "/api/monitoring/voltage/getdata",
    fetchVoltageRealtime,
    {
      refreshInterval: 1000,
    },
    localTenant ?? "",
    selectLoc[2]
  );

  // Function to fetch the /tool/dataside API
  const fetchSite = async (
    tenant,
    locationid,
    lane,
    status,
    value,
    side,
    start_trancation_date,
    end_trancation_date
  ) => {
    const response = await fetch("/api/tools/site/getsite", {
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
        locationid: locationid ?? 0,
        lane: lane ?? "",
        status: status ?? "",
        value: value ?? "",
        side: side ?? "",
        start_trancation_date: start_trancation_date ?? "",
        end_trancation_date: end_trancation_date ?? "",
        tenant: tenant ?? "",
      }),
    });

    return response.json();
  };

  // Function to fetch the /tool/dataLocation API
  const fetchDevice = async (
    tenant,
    locationid,
    lane,
    status,
    value,
    side,
    start_trancation_date,
    end_trancation_date
  ) => {
    const response = await fetch("/api/tools/location/getlocation", {
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
        locationid: locationid ?? 0,
        lane: lane ?? "",
        status: status ?? "",
        value: value ?? "",
        side: side ?? "0",
        start_trancation_date: start_trancation_date ?? "",
        end_trancation_date: end_trancation_date ?? "",
        tenant: tenant ?? "",
      }),
    });

    return response.json();
  };

  useEffect(() => {
    // Get local tenant item
    const currentUser = localStorage.getItem("tenant");
    if (localStorage.length != 0) {
      setLocalTenant(`${currentUser.toString()}`);
    }

    // TODO: fetch all site data
    fetchDevice(
      currentUser,
      0,
      "",
      "",
      "",
      "0",
      "2023-01-01 00:00:00",
      "2024-12-30 23:59:00"
    ).then((dataLocation) => {
      if (process.env.NODE_ENV === "development") {
        console.log(dataLocation.loc["data"]);
      }

      if (dataLocation.message == "OK") {
        setDataDev(dataLocation.loc["data"]);
      }
    });

    // TODO: fetch the first row of site data
    fetchSite(
      currentUser,
      0,
      "",
      "",
      "",
      "",
      "2023-01-01 00:00:00",
      "2024-12-30 23:59:00"
    ).then((dataSite) => {
      if (process.env.NODE_ENV === "development") {
        console.log(dataSite.site["data"]);
      }

      if (dataSite.message == "OK") {
        setDataLoc(dataSite.site["data"]);

        const firstIndexSite = dataSite.site["data"][0];
        if (selectLoc.length === 0) {
          setSelectLoc([
            firstIndexSite["lat"],
            firstIndexSite["lot"],
            firstIndexSite["code"],
          ]);
        }
      }
    });
  }, [selectLoc]);

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
      {selectLoc.length === 0 ? (
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
            lat: selectLoc[0],
            lng: selectLoc[1],
          }}
          defaultZoom={20}
          disableDefaultUI={true}
          clickableIcons={true}
          zoomControl={true}
          fullscreenControl={true}
          className="w-full h-[calc(100vh-164px)] overflow-auto rounded-md shadow-md md:shadow-lg lg:rounded-lg"
        >
          <>
            {dataDev.map((location) =>
              location.parent != 0 ? (
                <MarkerWithInfo
                  key={location.code}
                  lat={location.lat}
                  lot={location.lot}
                  name={location.name}
                  content={location.initial}
                  signal={deviceStatus}
                />
              ) : null
            )}
          </>
        </Map>
      )}
    </APIProvider>
  );
};

export default Default;
