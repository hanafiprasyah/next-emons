"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR, { mutate } from "swr";
import PrelineScript from "@/components/PrelineScript";
import dynamic from "next/dynamic";
import ErrorImage from "../../public/images/error500.svg";
import { useOnlineStatus } from "../lib/hook/connection-hook";

const DynamicAlert = dynamic(() =>
  import("@/components/alerts/SlowConnectionAlert")
);

const RadialDynamicGauge = dynamic(
  () => import("@/components/charts/FrequencyRadialGauge"),
  {
    ssr: true,
  }
);

export default function Frequency() {
  /**
   * STATE COLLECTION
   */
  // local Value
  const [localTenant, setLocalTenant] = useState("");

  // Connection state
  const isOnline = useOnlineStatus();
  const [responseTime, setResponseTime] = useState(null);
  const [isConnectionUnstable, setIsConnectionUnstable] = useState(false);

  // Dates
  const [selectedDateExport, setSelectedDateExport] = useState({
    start: null,
    end: null,
  });
  const [currentHours, setCurrentHours] = useState("");
  const [hoursAgo, setHoursAgo] = useState("");

  // Handle slow loading on SWR
  const [isSlowLoad, setSlowLoad] = useState(false);

  // State to store selected location
  const [selectedLocation, setSelectedLocation] = useState({
    code: null,
    name: null,
  });

  // State to store selected device
  const [selectedDevice, setSelectDevice] = useState({
    code: null,
    name: null,
  });

  // State to store list location
  const [locationList, setLocationList] = useState([]);
  // State to store list device
  const [deviceList, setDeviceList] = useState([]);

  // pagination
  const [page, setPage] = useState(1);
  const limit = 10; // Number of items per page

  // TODO: Function to fetch the site API [REALTIME]
  const fetchSiteRealtime = async (url, tenant, start_date, end_date) => {
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
          locationid: 0,
          lane: "",
          status: "",
          value: "",
          side: "",
          start_date: start_date,
          end_date: end_date,
          tenant: tenant,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `HTTP error on fetchSiteRealtime! Status: ${response.statusText}`
        );
      }

      const data = await response.json();

      if (data.message === "OK") {
        return data.site;
      }
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.log("Error in fetchSiteRealtime: ", err);
      }
      throw err;
    }
  };

  // TODO: Function to fetch the device API [REALTIME]
  const fetchDeviceRealtime = async (
    url,
    tenant,
    side,
    start_date,
    end_date
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
          locationid: 0,
          lane: "",
          status: "",
          value: "",
          side: side,
          start_date: start_date,
          end_date: end_date,
          tenant: tenant,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `HTTP error on fetchDeviceRealtime! Status: ${response.statusText}`
        );
      }

      const data = await response.json();

      if (data.message === "OK") {
        return data.loc;
      }
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.log("Error in fetchDeviceRealtime: ", err);
      }
      throw err;
    }
  };

  // TODO: Function to fetch the API [REALTIME]
  const fetchAlarmData = async (
    url,
    tenant,
    locationid,
    start_date,
    end_date
  ) => {
    // main point to track unstable network
    const startTime = performance.now();
    console.warn("Started to run fetchAlarmData");

    try {
      console.warn("Trying..");
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
          locationid: locationid,
          lane: "",
          status: "",
          value: "",
          side: "",
          start_date: start_date,
          end_date: end_date,
        }),
      });

      if (!response.ok) {
        console.error("Data is not OK!");
        throw new Error(
          `HTTP error on fetchAlarmData! Status: ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Raw data: ", data);
      console.log("Data length is", data.data.length);

      // Check response message
      if (data) {
        console.log("Data is OK to serve!");

        const endTime = performance.now();
        setResponseTime(startTime - endTime);

        console.log("data after filtering: ", data.data);
        return data;
      }
      // If response message is not OK
      else {
        setResponseTime(null);
        if (process.env.NODE_ENV === "development") {
          console.error("Error in fetchAlarmData: Response Message is Not OK");
        }
      }
    } catch (err) {
      setResponseTime(null);
      if (process.env.NODE_ENV === "development") {
        console.error("Error in fetchAlarmData: ", err);
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

  // TODO: to get site realtime
  const { data: locationsData, error: locationsError } = useSWR(
    localTenant
      ? [
          "/api/tools/site/getsite",
          localTenant,
          "2023-01-01 00:00:00",
          "2024-12-30 00:00:00",
        ]
      : null,
    ([url, tenant, start_date, end_date]) =>
      fetchSiteRealtime(url, tenant, start_date, end_date),
    {
      isPaused: () => !isOnline && !localTenant,
      isOnline: () => isOnline,
      refreshInterval: 100,
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
            "/api/tools/site/getsite",
            localTenant,
            "2023-01-01 00:00:00",
            "2024-12-30 00:00:00",
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

  // TODO: to get device realtime
  const { data: devicesData, error: devicesError } = useSWR(
    localTenant && selectedLocation.code
      ? [
          "/api/tools/location/getlocation",
          localTenant,
          JSON.stringify(selectedLocation.code),
          "2023-01-01 00:00:00",
          "2024-12-30 00:00:00",
        ]
      : null,
    ([url, tenant, side, start_date, end_date]) =>
      fetchDeviceRealtime(url, tenant, side, start_date, end_date),
    {
      isPaused: () =>
        !isOnline && (!localTenant || !selectedLocation.code ? true : false),
      isOnline: () => isOnline,
      refreshInterval: 100,
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
            JSON.stringify(selectedLocation.code),
            "2023-01-01 00:00:00",
            "2024-12-30 00:00:00",
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

  // TODO: SWR to get monitoring data
  const {
    data: alarmData,
    isLoading: alarmLoading,
    error: alarmError,
  } = useSWR(
    selectedDevice.code
      ? [
          `/api/table/alarm/getdata?page=${page}&limit=${limit}`,
          localTenant,
          selectedDevice.code,
          hoursAgo,
          currentHours,
        ]
      : null,
    ([url, tenant, locationid, start_date, end_date]) =>
      fetchAlarmData(url, tenant, locationid, start_date, end_date),
    {
      isPaused: () =>
        !isOnline &&
        (selectedLocation.code === null ||
          selectedDevice.code === null ||
          !localTenant)
          ? true
          : false,
      isOnline: () => isOnline,
      refreshInterval: 60000, //refresh every 1 minute
      keepPreviousData: true,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      revalidateOnFocus: false,
      loadingTimeout: 10000,
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
  }, []);

  // TODO: Set defaults site when data is available
  useEffect(() => {
    if (locationsData?.data.length) {
      setSelectedLocation({
        code: locationsData.data[0].code,
        name: locationsData.data[0].name,
      });

      setLocationList(locationsData.data);
    }
  }, [locationsData]);

  // TODO: Set defaults device location when data is available
  useEffect(() => {
    if (devicesData?.data.length) {
      setSelectDevice({
        code: devicesData.data[0].code,
        name: devicesData.data[0].name,
      });

      setDeviceList(devicesData.data);
    }
  }, [devicesData]);

  // TODO: Get current datetime, this will be mounted at the first time
  useEffect(() => {
    const dateIns = new Date();

    // Get current date time
    const getFormatedCurrentDate = `${dateIns.getFullYear()}-${(
      dateIns.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${dateIns.getDate().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    })} ${dateIns.getHours()}:${dateIns
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${dateIns.getSeconds().toString().padStart(2, "0")}`;

    // Get -1 hour of current date time
    const getHoursAgo = `${dateIns.getFullYear()}-${(dateIns.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${dateIns.getDate().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    })} ${dateIns.getHours() - 1}:${dateIns
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${dateIns.getSeconds().toString().padStart(2, "0")}`;

    if (getFormatedCurrentDate.startsWith("202")) {
      setCurrentHours(getFormatedCurrentDate);
      setHoursAgo(getHoursAgo);
    }
  }, []);

  // TODO: Alert user if response time is high
  useEffect(() => {
    // Threshold of 5000ms / 5sec
    if (responseTime !== null && responseTime > 5000) {
      setIsConnectionUnstable(true);
      alert("Connection is unstable. Response time is high!");
    } else {
      setIsConnectionUnstable(false);
    }
  }, [isOnline, responseTime]);

  // If SWR Realtime connection error then show this widget below
  if (alarmError) {
    return (
      <div className="p-2 space-y-5 text-center sm:p-5 sm:pb-0">
        {/* Content */}
        <div className="max-w-md mx-auto space-y-3">
          <Image
            priority={true}
            width={500}
            height={500}
            className="max-w-xs mx-auto dark:hidden"
            src={ErrorImage}
            alt="EMONS | Electrical Monitoring System"
          />
          <Image
            priority={true}
            width={500}
            height={500}
            className="hidden max-w-xs mx-auto dark:block"
            src={ErrorImage}
            alt="EMONS | Electrical Monitoring System"
          />
          {/* Header Text */}
          <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gradient-to-tl from-red-100 to-rose-200 text-red-800 dark:from-red-900 dark:to-rose-950 dark:text-white">
            <svg
              className="shrink-0 size-3.5 text-white dark:from-white dark:to-rose-950 dark:text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              color="#000000"
              fill="none"
            >
              <path
                d="M17 15V17M17.009 19H17M22 17C22 19.7614 19.7614 22 17 22C14.2386 22 12 19.7614 12 17C12 14.2386 14.2386 12 17 12C19.7614 12 22 14.2386 22 17Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M14.384 9.43749C13.7591 8.85581 12.9211 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 12.9211 8.85581 13.7591 9.43749 14.384"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M9.78 20.436C9.33442 19.9904 9.18844 19.8566 8.90573 19.7389C8.62149 19.6204 8.3257 19.6161 7.69171 19.6161C6.1838 19.6161 5.32083 19.6161 4.85239 19.1476C4.38394 18.6792 4.38394 17.8162 4.38394 16.3083C4.38394 15.6777 4.37981 15.3817 4.26299 15.0987C4.14573 14.8147 3.93965 14.6022 3.49166 14.1541C2.92759 13.59 2 12.8859 2 12C2 11.114 2.92756 10.4099 3.49166 9.84585C3.93756 9.39996 4.14378 9.18799 4.26137 8.90515C4.37951 8.62098 4.38394 8.32526 4.38394 7.69171C4.38394 6.1838 4.38394 5.32083 4.85239 4.85239C5.32083 4.38394 6.1838 4.38394 7.69171 4.38394C8.32091 4.38394 8.61661 4.38 8.89929 4.26379C9.18454 4.14652 9.39688 3.94064 9.84585 3.49166C10.4099 2.92756 11.2104 2 12 2C12.7896 2 13.59 2.92759 14.1541 3.49167C14.6029 3.94037 14.8155 4.14637 15.1001 4.26355C15.3827 4.37992 15.6787 4.38394 16.3083 4.38394C17.8162 4.38394 18.6792 4.38394 19.1476 4.85239C19.6161 5.32083 19.6161 6.1838 19.6161 7.69171C19.6161 8.32383 19.6202 8.6196 19.7378 8.90321C19.8555 9.18695 19.9891 9.3211 20.436 9.768"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Internal Server Error!
          </span>
          {/* Paragraph */}
          <h1 className="text-xl font-semibold tracking-tight text-gray-800 dark:text-neutral-200">
            An unexpected error occurred on our server.
          </h1>
          <p className="text-sm text-gray-500 dark:text-neutral-500">
            We cannot provide you with the latest data at this time, please wait
            a moment.
          </p>
        </div>
        {/* End Content */}
      </div>
    );
  }

  return (
    <div id="playground-template" className="grid grid-cols-1 gap-0 mt-2">
      {/* Content */}
      <div className="grid items-center grid-cols-1 py-2 my-2 gap-x-2 gap-y-2 justify-evenly">
        <>
          <span className="py-2 text-sm">
            &nbsp;Site/Company:&nbsp;
            {selectedLocation?.length !== 0 && !locationsError
              ? `${selectedLocation.code ?? "No data"} - ${
                  selectedLocation.name ?? "No data"
                }`
              : "Error while fetch data"}
          </span>
          <span className="py-2 text-sm">
            &nbsp;Device location:&nbsp;
            {selectedDevice?.length !== 0 && !devicesError
              ? `${selectedDevice.code ?? "No data"} - ${
                  selectedDevice.name ?? "No data"
                }`
              : "Error while fetch data"}
          </span>
          <span className="py-2 text-sm">
            &nbsp;Location list:{" "}
            <li>
              &nbsp;
              {locationList && !locationsError
                ? locationList
                    .filter(
                      (obj, index) =>
                        locationList.findIndex(
                          (item) => item.code === obj.code
                        ) === index
                    )
                    .map((item, index) => (
                      <>
                        <ul>Index: {index}</ul>
                        <ul>Location Code: {item.code}</ul>
                        <ul>Location Name: {item.name}</ul>
                      </>
                    ))
                : null}
            </li>
          </span>
          <span className="py-2 text-sm">
            &nbsp;Selected device list based on <strong>location list</strong>:{" "}
            <li>
              &nbsp;
              {deviceList && !devicesError
                ? deviceList
                    .filter(
                      (obj, index) =>
                        deviceList.findIndex(
                          (item) => item.code === obj.code
                        ) === index
                    )
                    .map((item, index) => (
                      <>
                        <ul>Index: {index}</ul>
                        <ul>Device Code: {item.code}</ul>
                        <ul>Device Name: {item.name}</ul>
                      </>
                    ))
                : null}
            </li>
          </span>
          {/* <span className="py-2 text-sm">
            &nbsp;So here are the datas that you need to see!{" "}
            <strong>Alarm datas</strong>:{" "}
            <li>
              &nbsp;
              {frequencyData && !frequencyError
                ? frequencyData.map((item, index) => (
                    <>
                      <ul>Index: {index}</ul>
                      <ul>ID: {item.id}</ul>
                      <ul>Value Input: {item.frequency_input}</ul>
                      <ul>Value Output: {item.frequency_output}</ul>
                      <ul>Location code selected: {item.location_id}</ul>
                      <ul>Frequency send date: {item.send_date}</ul>
                    </>
                  ))
                : null}
            </li>
          </span> */}
        </>
      </div>
      {/* End Content */}

      <PrelineScript />
    </div>
  );
}
