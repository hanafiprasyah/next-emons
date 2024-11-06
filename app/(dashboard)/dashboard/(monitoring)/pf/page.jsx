"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR, { mutate } from "swr";
import PrelineScript from "@/components/PrelineScript";
import dynamic from "next/dynamic";
import ErrorImage from "../../../../../public/images/error500.svg";
import { useOnlineStatus } from "../../../../lib/hook/connection-hook";

const DynamicAlert = dynamic(() =>
  import("@/components/alerts/SlowConnectionAlert")
);

const RadialDynamicGauge = dynamic(
  () => import("@/components/charts/PowerFactorRadialGauge"),
  {
    ssr: false,
  }
);

export default function PowerFactor() {
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
  const [hoursAgo, setHoursAgo] = useState("");
  const [lastTimeUpdate, setLastTimeUpdate] = useState("");

  // Init the device connection status and signal recipient status
  const [signal, setSignal] = useState(false);
  const [channel, setChannel] = useState("Connecting..");
  const [onLoading, setOnLoading] = useState(true);

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

  // Temporary memory to handle null/undefined value from Rest API
  const defaultPFValues = {
    cosphi_input: 0,
    cosphi_output: 0,
  };
  const [lastDataPF, setLastDataPF] = useState(defaultPFValues);

  const [showDev, isShowDev] = useState(true);
  /**
   * END OF STATE COLLECTION
   */

  // Scripts
  const handleSelectLocation = (code, name, e) => {
    e.preventDefault();
    setSignal(false);
    setOnLoading(true);
    setSelectedLocation({ code: code, name: name });
    setSelectDevice({ code: null, name: null });
  };

  const handleSelectDevice = (code, name, e) => {
    e.preventDefault();
    setSignal(false);
    setOnLoading(true);
    setSelectDevice({ code: code, name: name });
  };

  const handleResetButton = (e) => {
    e.preventDefault();
    setSignal(false);
    isOnline ? setOnLoading(true) : setOnLoading(false);

    if (locationList && locationList?.length > 0) {
      if (selectedLocation.code !== locationList[0].code) {
        setSelectedLocation({
          code: locationList[0].code,
          name: locationList[0].name,
        });
      }
      return;
    } else {
      setSelectedLocation({ code: null, name: null });
    }

    if (deviceList && deviceList?.length > 0) {
      if (selectedDevice.code !== deviceList[0].code) {
        setSelectDevice({
          code: deviceList[0].code,
          name: deviceList[0].name,
        });
      }
      return;
    } else {
      setSelectDevice({ code: null, name: null });
    }
  };
  // End of Scripts

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
  const fetchPFRealtime = async (url, tenant, locationid, start_date) => {
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
          locationid: locationid,
          lane: "",
          status: "",
          value: "",
          side: "",
          start_date: start_date,
          end_date: "",
        }),
      });

      if (!response.ok) {
        throw new Error(
          `HTTP error on fetchPFRealtime! Status: ${response.statusText}`
        );
      }

      const data = await response.json();

      // Check response message
      if (data.message === "OK") {
        setSignal(true);

        // Check if device list is not null
        if (selectedDevice.code && selectedDevice.name) {
          setSignal(true);
          // Check if data pf length is null
          if (
            data.monitoring["data"]["dataPowerFactors"][0] === undefined ||
            data.monitoring["data"]["dataPowerFactors"][0] === null
          ) {
            // Give signal to offline, and set channel to unreachable
            setOnLoading(false);
            setSignal(false);
            setChannel("Device unreachable");
          }

          // We will check the difference about last send_date from API and current date from NOW()
          setSignal(true);

          const currentDate = new Date();
          const sendDate =
            data?.monitoring["data"]["dataPowerFactors"][0].send_date;
          // format the send_date value
          const isoConvSendDate = new Date(sendDate);
          // count the diff
          const diffTime = currentDate - isoConvSendDate;
          // set the minutes value
          const minutes = Math.floor(diffTime / 60000);
          // Format the date to Indonesian format
          const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: false, // 24-hour format
            locale: "id-ID",
          };
          // Format date using Intl Format
          const formattedDateTime = new Intl.DateTimeFormat(
            "en-EN",
            options
          ).format(isoConvSendDate);
          // then set to state
          setLastTimeUpdate(formattedDateTime);

          // Set offline status if the diff time more than 5 minutes from NOW()
          if (minutes >= process.env.NEXT_PUBLIC_MAX_LAST_TRIGGER_MINUTE) {
            setOnLoading(false);
            setSignal(false);
            setChannel("Lost connection");
          } else {
            setSignal(true);
            setChannel("Stable");
            setOnLoading(false);
          }
          // checkpoint to check network performance
          const endTime = performance.now();
          setResponseTime(endTime - startTime);

          return data.monitoring["data"]["dataPowerFactors"];
        }
        // if device list is null?
        else {
          setSignal(false);
          setChannel("Cannot get device location");
          setOnLoading(false);
          setResponseTime(null);
        }
      }
      // If response message is not OK
      else {
        setSignal(false);
        setOnLoading(false);
        setChannel("Server error");
        setResponseTime(null);
        if (process.env.NODE_ENV === "development") {
          console.log("Error in fetchPFRealtime: Response Message is Not OK");
        }
      }
    } catch (err) {
      setSignal(false);
      setOnLoading(false);
      setChannel("Error while fetch data");
      setResponseTime(null);
      if (process.env.NODE_ENV === "development") {
        console.log("Error in fetchPFRealtime: ", err);
      }
      throw err;
    }
  };

  // Clear SWR Cache
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
        !isOnline && (!localTenant || !selectedLocation.code) ? true : false,
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
    data: pfData,
    isLoading: pfLoading,
    error: pfError,
  } = useSWR(
    selectedDevice.code
      ? [
          "/api/monitoring/getmonitoring",
          localTenant,
          selectedDevice.code,
          hoursAgo,
        ]
      : null,
    ([url, localTenant, locationid, start_date]) =>
      fetchPFRealtime(url, localTenant, locationid, start_date),
    {
      isPaused: () =>
        !isOnline &&
        (selectedLocation.code === null ||
          selectedDevice.code === null ||
          !localTenant ||
          !hoursAgo)
          ? true
          : false,
      isOnline: () => isOnline,
      refreshInterval: 3000,
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
            "/api/monitoring/getmonitoring",
            localTenant,
            selectedDevice.code,
            hoursAgo,
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
      setHoursAgo(getHoursAgo);
    }
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

    // Cleanup function to reset state on unmount
    return () => {
      setSelectedLocation({ code: null, name: null });
      setLocationList([]);
    };
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

    // Cleanup function to reset state on unmount
    return () => {
      setSelectDevice({ code: null, name: null });
      setDeviceList([]);
    };
  }, [devicesData]);

  // TODO: Update each pf in lastDataPF if data is valid
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("Effect triggered with data:", pfData);
    }

    if (pfData?.length > 0) {
      setLastDataPF((prev) => {
        const newData = {
          cosphi_input:
            pfData[0].cosphi_input != null
              ? pfData[0].cosphi_input
              : prev.cosphi_input,
          cosphi_output:
            pfData[0].cosphi_output != null
              ? pfData[0].cosphi_output
              : prev.cosphi_output,
        };

        // Log previous and new data for comparison
        if (process.env.NODE_ENV === "development") {
          console.log("Previous State:", prev);
          console.log("New Data:", newData);
        }

        // Ensure we are not setting the state to the same value
        if (JSON.stringify(prev) !== JSON.stringify(newData)) {
          return newData;
        }

        // Return previous state if nothing has changed
        return prev;
      });
    }
  }, [pfData]);

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

  // TODO: Set pf values based on valid data or fallback to last known values
  const pfValues = {
    cosphi_input:
      pfData && pfData[0]?.cosphi_input != null
        ? pfData[0].cosphi_input
        : lastDataPF.cosphi_input,
    cosphi_output:
      pfData && pfData[0]?.cosphi_output != null
        ? pfData[0].cosphi_output
        : lastDataPF.cosphi_output,
  };

  // If SWR Realtime connection error then show this widget below
  if (pfError) {
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
    <div id="pf-template" className="grid grid-cols-1 gap-0 mt-2">
      {/* Alert on slow loading */}
      {isSlowLoad || isConnectionUnstable ? <DynamicAlert /> : null}
      {/* End Alert on slow loading */}

      {/* Page Heading */}
      <div className="px-2 pb-2 md:px-1 sm:pb-4">
        <div className="-ms-[5px] flex justify-between items-center gap-1 sm:gap-2">
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            {/* Select Location */}
            <div className="relative inline-block">
              <h2 className="pb-2 text-xs ps-1">Location:</h2>
              <div
                className={`relative inline-flex hs-dropdown hs-dropdown-example ${
                  selectedLocation.length === null
                    ? "pointer-events-none"
                    : null
                }`}
              >
                <button
                  id="hs-dropdown-example"
                  type="button"
                  className="py-2 px-2 duration-200 ease-in-out transition inline-flex items-center gap-x-1.5 text-xs rounded-lg bg-white text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  aria-label="Dropdown"
                >
                  {locationsData ? selectedLocation.name : "Loading"}
                  <svg
                    className="text-gray-600 hs-dropdown-open:rotate-180 size-3 dark:text-neutral-600"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div
                  className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 w-56 hidden z-10 mt-2 min-w-60 bg-white shadow-md rounded-lg p-2 dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:divide-neutral-900"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="hs-dropdown-example"
                >
                  {locationList
                    .filter(
                      (obj, index) =>
                        locationList.findIndex(
                          (item) => item.code === obj.code
                        ) === index
                    )
                    .map((item, index) => (
                      <Link
                        key={index}
                        className={`${
                          selectedLocation.code === item.code
                            ? "pointer-events-none"
                            : "pointer-events-auto"
                        } flex duration-200 ease-in-out transition items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-800/80 dark:hover:text-neutral-300 dark:focus:bg-neutral-700`}
                        href=""
                        onClick={handleSelectLocation.bind(
                          null,
                          item.code,
                          item.name
                        )}
                      >
                        <span className="inline-flex text-sm text-white">
                          {item.name}
                        </span>
                        <span className="inline-flex text-xs text-gray-400">
                          {selectedLocation.code === item.code
                            ? "Selected"
                            : ""}
                        </span>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
            {/* End Select Location */}

            {/* Select Device */}
            <div className="relative ps-0.5 sm:ps-2 before:block before:absolute before:top-1/2 before:-start-px before:w-px before:bg-gray-300 before:-translate-y-1/2 dark:before:bg-neutral-700">
              <h2 className="pb-2 text-xs ps-1">Device:</h2>
              <div
                className={`relative inline-flex hs-dropdown hs-dropdown-example ${
                  selectedDevice.length === null ? "pointer-events-none" : null
                }`}
              >
                <button
                  id="hs-dropdown-example"
                  type="button"
                  className="py-2 px-2 duration-200 ease-in-out transition inline-flex items-center gap-x-1.5 text-xs rounded-lg bg-white text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  aria-label="Dropdown"
                >
                  {devicesData ? selectedDevice.name : "Loading"}
                  <svg
                    className="text-gray-600 hs-dropdown-open:rotate-180 size-4 dark:text-neutral-600"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div
                  className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 w-56 hidden z-10 mt-2 min-w-60 bg-white shadow-md rounded-lg p-2 dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:divide-neutral-900"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="hs-dropdown-example"
                >
                  {deviceList.map((item, index) => (
                    <Link
                      key={index}
                      className={`${
                        selectedDevice.code === item.code
                          ? "pointer-events-none"
                          : "pointer-events-auto"
                      } flex duration-200 ease-in-out transition items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-800/80 dark:hover:text-neutral-300 dark:focus:bg-neutral-700`}
                      href=""
                      onClick={handleSelectDevice.bind(
                        null,
                        item.code,
                        item.name
                      )}
                    >
                      <span className="inline-flex text-sm text-white">
                        {item.name}
                      </span>
                      <span className="inline-flex text-xs text-gray-400">
                        {selectedDevice.code === item.code ? "Selected" : ""}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {/* End Select Device */}
          </div>
          {/* Reset Button */}
          <button
            type="button"
            disabled={selectedDevice.length === 0 ? true : false}
            className="py-[7px] duration-200 ease-in-out transition px-2 inline-flex items-center gap-x-1 text-xs font-medium rounded-lg border border-transparent bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-teal-500"
            onClick={handleResetButton.bind(null)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="shrink-0 size-3.5 hidden md:block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            Reset
          </button>
          {/* End Reset Button */}
        </div>
      </div>
      {/* End Page Heading */}

      {/* PF Input and Output */}
      <div className="flex flex-col mt-2 mb-2 bg-white border border-gray-200 md:mt-0 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
        {/* Header */}
        <div className="grid grid-cols-3 p-3 md:pt-5 md:px-5 gap-x-2">
          <div>
            <span
              className={`hidden md:inline-flex items-center gap-x-1.5 py-1 px-2.5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full ${
                signal ? "dark:bg-emerald-700" : "dark:bg-red-700"
              } dark:text-neutral-200`}
            >
              {signal ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-3 pt-0 text-center md:px-5 md:pb-5">
          <div className="flex flex-wrap items-center justify-center md:justify-evenly">
            {!onLoading ? (
              <>
                <div className="w-full h-full md:w-1/2">
                  {isOnline && !pfError ? (
                    <RadialDynamicGauge
                      id={"pf-input"}
                      key={"pf-input"}
                      alt={"Power Factor"}
                      title="Input"
                      value={
                        !pfError && pfData !== undefined
                          ? pfData[0]?.cosphi_input
                          : pfValues.cosphi_input
                      }
                    />
                  ) : (
                    <div id={`pfInput`}>
                      <span className="inline-flex items-center px-2 py-1 my-4 text-xs text-gray-800 bg-gray-100 rounded-full gap-x-1 dark:bg-neutral-500/20 dark:text-neutral-400">
                        <svg
                          className="shrink-0 size-3"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                          <line x1="12" x2="12" y1="2" y2="12"></line>
                        </svg>
                        You are offline
                      </span>
                    </div>
                  )}
                </div>
                <div className="w-full h-full md:w-1/2">
                  {isOnline && !pfError ? (
                    <RadialDynamicGauge
                      id={"pf-output"}
                      key={"pf-output"}
                      alt={"Power Factor"}
                      title="Output"
                      value={
                        !pfError && pfData !== undefined
                          ? pfData[0]?.cosphi_output
                          : pfValues.cosphi_output
                      }
                    />
                  ) : (
                    <div id={`pfOutput`}>
                      <span className="inline-flex items-center px-2 py-1 my-4 text-xs text-gray-800 bg-gray-100 rounded-full gap-x-1 dark:bg-neutral-500/20 dark:text-neutral-400">
                        <svg
                          className="shrink-0 size-3"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                          <line x1="12" x2="12" y1="2" y2="12"></line>
                        </svg>
                        You are offline
                      </span>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div
                className="animate-spin inline-block size-4 border-[2px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col px-5 py-3 text-center border-t border-gray-200 sm:flex-row sm:justify-between sm:items-center gap-y-1 sm:gap-y-0 gap-x-2 sm:text-start dark:border-neutral-700">
          <div>
            <span className="hidden md:inline-flex items-center gap-x-1.5 py-1 px-2.5 font-medium rounded-full  text-xs text-gray-500 dark:text-neutral-500">
              <span className="relative flex w-2 h-2">
                <span
                  className={`absolute inline-block w-full h-full rounded-full opacity-75 animate-ping shrink-0 ${
                    signal ? "bg-sky-400" : "bg-red-400"
                  }`}
                ></span>
                <span
                  className={`relative inline-flex w-2 h-2 rounded-full ${
                    signal ? "bg-sky-500" : "bg-red-500"
                  }`}
                ></span>
              </span>
              {signal
                ? "Updated every seconds"
                : "Cannot update data right now"}
            </span>
          </div>
          <div>
            <label
              htmlFor="hs-pro-dupccn1"
              className={`relative block w-auto px-3 py-2 ${
                channel === "Lost connection" ? "text-xs" : "text-sm"
              } font-medium text-center rounded-lg cursor-default sm:text-start focus:outline-none`}
            >
              <span
                className={`relative z-10 text-gray-800 peer-checked:hidden ${
                  channel == "Stable"
                    ? "dark:text-emerald-400"
                    : "dark:text-gray-500"
                }`}
              >
                {`${
                  channel === "Lost connection"
                    ? `${channel} on ${lastTimeUpdate}`
                    : channel
                }`}
              </span>
            </label>
          </div>
        </div>
      </div>
      {/* End PF gauge list */}

      <PrelineScript />
    </div>
  );
}
