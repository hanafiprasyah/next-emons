"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import PrelineScript from "@/components/PrelineScript";
import Link from "next/link";
import useSWR, { mutate } from "swr";
import ErrorImage from "../../../../../public/images/error500.svg";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";

const RadialDynamicGauge = dynamic(
  () => import("@/components/charts/CurrentRadialGauge"),
  {
    ssr: true,
  }
);

export default function Current() {
  /**
   * STATE COLLECTION
   */
  // local Value
  const [localTenant, setLocalTenant] = useState("");

  // Handle parameter from direct map access
  const router = useRouter();
  const searchParams = useSearchParams();
  const param1 = useMemo(
    () => searchParams.get("param1") || "",
    [searchParams]
  );
  const param2 = useMemo(
    () => searchParams.get("param2") || "",
    [searchParams]
  );
  // console.log(`${param1} | ${param2}`);

  // Dates
  const [hoursAgo, setHoursAgo] = useState("");
  const [lastTimeUpdate, setLastTimeUpdate] = useState("");

  // Init the device connection status and signal recipient status
  const [signal, setSignal] = useState(false);
  const [channel, setChannel] = useState("Connecting..");
  const [onLoading, setOnLoading] = useState(true);

  // Used to set the /tool/dataside API
  const [dataLoc, setDataLoc] = useState([]);
  const [selectLoc, setSelectLoc] = useState([]);
  // const [selectLoc, setSelectLoc] = useState([10, 'Siloam Cibubur']);

  // Used to set the /tool/dataLocation API
  const [dataDev, setDataDev] = useState([]);
  const [selectDev, setSelectDev] = useState([]);
  // const [selectDev, setSelectDev] = useState([102, 'Ruang ICU Lt 3']);

  // Temporary memory to handle null/undefined value from Rest API
  const defaultCurrentValues = {
    i_r_Input: 10,
    i_r_Output: 10,
    i_s_Input: 10,
    i_s_Output: 10,
    i_t_Input: 10,
    i_t_Output: 10,
  };
  const [lastDataCurrent, setLastDataCurrent] = useState(defaultCurrentValues); // default to 220 if data is null/undefined

  // Handle slow loading on SWR
  const [isSlowLoad, setSlowLoad] = useState(false);

  /**
   * Used to conditioning the device dropdown pointer event
   * if location === [] (null), then disable the device dropdown
   */
  const [showDev, isShowDev] = useState(true);
  /**
   * END OF STATE COLLECTION
   */

  // Scripts
  const handleSelectLocation = (code, name, e) => {
    e.preventDefault();
    setSignal(false);
    setOnLoading(true);
    if (param1.length !== 0 && param2.length !== 0) {
      router.replace("/dashboard/current/");
      router.refresh();
    } else {
      setSelectLoc([code, name]);
      isShowDev(true);
      setSelectDev([]);
    }
  };

  const handleSelectDevice = (code, name, e) => {
    e.preventDefault();
    setSignal(false);
    setOnLoading(true);
    // indicate user bring params and clear the params after this button clicked
    if (param1.length !== 0 && param2.length !== 0) {
      router.replace("/dashboard/current/");
      router.refresh();
    } else {
      setSelectDev([code, name]);
    }
  };

  const handleResetButton = (e) => {
    e.preventDefault();
    setSignal(false);
    setOnLoading(true);
    isShowDev(true);
    // indicate user bring params and clear the params after this button clicked
    if (param1.length !== 0 && param2.length !== 0) {
      router.replace("/dashboard/current/");
      router.refresh();
    } else {
      setSelectLoc([]);
      setSelectDev([]);
    }
  };
  // End of Scripts

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
        "Access-Control-Allow-Origin": `${process.env.BASE_URL}/`,
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
        "Access-Control-Allow-Origin": `${process.env.BASE_URL}/`,
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

  // Function to fetch the API [REALTIME]
  const fetchCurrentRealtime = async (url, tenant, locationid, start_date) => {
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
        throw new Error(`HTTP error! Status: ${response.statusText}`);
      }

      const data = await response.json();

      // Check response message
      if (data.message === "OK") {
        setSignal(true);

        // Check if device list is not null
        if (selectDev.length !== 0) {
          setSignal(true);
          // Check if data ground length is null
          if (
            data.monitoring["data"]["datacurrents"][0] === undefined ||
            data.monitoring["data"]["datacurrents"][0] === null
          ) {
            // Give signal to offline, and set channel to unreachable
            setOnLoading(false);
            setSignal(false);
            setChannel("Device unreachable");
          } else {
            // We will check the difference about last send_date from API and current date from NOW()
            setSignal(true);

            const currentDate = new Date();
            const sendDate =
              data?.monitoring["data"]["datacurrents"][0].send_date;

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

            return data.monitoring["data"]["datacurrents"];
          }
        }
        // if device list is null?
        else {
          setSignal(false);
          setChannel("Cannot get device location");
          setOnLoading(false);
        }
      }
      // If response message is not OK
      else {
        setSignal(false);
        setOnLoading(false);
        setChannel("Server error");
        if (process.env.NODE_ENV === "development") {
          console.log(
            "Error in fetchCurrentRealtime: Response Message is Not OK"
          );
        }
      }
    } catch (err) {
      setSignal(false);
      setOnLoading(false);
      setChannel("Error while fetch data");
      if (process.env.NODE_ENV === "development") {
        console.log("Error in fetchCurrentRealtime: ", err);
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

  // SWR
  const { data, isLoading, error } = useSWR(
    ["/api/monitoring/getmonitoring", localTenant, selectDev[0], hoursAgo],
    ([url, localTenant, locationid, start_date]) =>
      fetchCurrentRealtime(url, localTenant, locationid, start_date),
    {
      isPaused: () =>
        selectLoc.length === 0 ||
        selectDev.length === 0 ||
        (localTenant == "" && localTenant == undefined) ||
        (hoursAgo == "" && hoursAgo == undefined)
          ? true
          : false,
      refreshInterval: 3000,
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
            selectDev[0],
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

  // Helper function to parse JSON safely
  const parseJSON = (str, fallback) => {
    if (!str) {
      // If str is null, undefined, or an empty string, return the fallback value
      console.warn("Received empty or null input, returning fallback.");
      return fallback;
    }
    try {
      console.warn("trying to parse str:");
      return JSON.parse(str);
    } catch (error) {
      console.error("JSON Parsing Error:", error);
      return fallback;
    }
  };

  // TODO: Get current datetime, this will be mounted at the first time
  useEffect(() => {
    const dateIns = new Date();
    // const isoDate = "2024-09-13T11:30:54";
    // const isoConvDate = new Date(isoDate);

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

    // const diffTime = dateIns - isoConvDate;
    // const minutes = Math.floor((diffTime % 3600000) / 60000);
    if (getFormatedCurrentDate.startsWith("202")) {
      setHoursAgo(getHoursAgo);
    }
    // if (process.env.NODE_ENV === "development") {
    //   console.log(
    //     "Current date: " +
    //       getFormatedCurrentDate +
    //       "| 1 hours ago: " +
    //       getHoursAgo
    //   );
    //   console.log("Different time: " + minutes);
    // }
  }, []);

  // TODO: Get default site
  useEffect(() => {
    // Get local tenant item
    const currentUser = localStorage.getItem("tenant");

    // If tenant local storage is undefined or null
    if (!currentUser) {
      // set local tenant state to null
      setLocalTenant("");
      return;
    }

    // save local tenant value to state
    setLocalTenant(currentUser.toString());

    // TODO: fetch the site data
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
      // if (process.env.NODE_ENV === "development") {
      //   console.log(dataSite.site["data"]);
      // }

      // If site response is not OK
      if (dataSite.message !== "OK") {
        setOnLoading(false);
        setSignal(false);
        setChannel("Unreachable");
        return;
      }

      // If site response is OK
      const siteData = dataSite.site["data"] || [];
      setDataLoc(siteData);

      // Scrap the first index data
      const firstIndexSite = siteData[0];

      if (firstIndexSite) {
        const parsedParam1 = parseJSON(param1);

        // Check and Set initial selectLoc if none provided by user

        setSelectLoc(
          parsedParam1 === undefined
            ? [firstIndexSite["code"], firstIndexSite["name"]]
            : parsedParam1
        );
        // set device state to null in order to refresh the device list
        // when user move to another site
        setSelectDev([]);
      }
    });
  }, [param1]);

  // TODO: GET default device
  useEffect(() => {
    const currentUser = localStorage.getItem("tenant");
    if (!currentUser || selectLoc.length === 0) return;

    // TODO: fetch the device (location) based on selected location/site
    fetchDevice(
      currentUser,
      0,
      "",
      "",
      "",
      param2.length === 0 ? JSON.stringify(selectLoc[0]) : selectLoc[0],
      "2023-01-01 00:00:00",
      "2024-12-30 23:59:00"
    )
      .then((dataLocation) => {
        // if (process.env.NODE_ENV === "development") {
        //   console.log("fetchDevice: " + dataLocation.loc["data"]);
        // }

        // response is not OK
        if (!dataLocation || dataLocation.message !== "OK") {
          setOnLoading(false);
          setSignal(false);
          setChannel("Failed to load resource");
          return;
        }

        const deviceData = dataLocation.loc["data"] || [];

        // device location response is OK
        setDataDev(deviceData);

        // Scrap the first index data
        const firstIndexDev = deviceData[0];

        // Set initial selectDev if none provided by user
        if (firstIndexDev && selectLoc.length !== 0) {
          const parsedParam2 = parseJSON(param2);

          setSelectDev(
            parsedParam2 === undefined
              ? [firstIndexDev["code"], firstIndexDev["name"]]
              : parsedParam2
          );
        }

        setOnLoading(true);
        setChannel("Validating data..");
      })
      .catch((error) => {
        setOnLoading(false);
        setSignal(false);
        setChannel("Failed to load resource");
      });
  }, [param2, selectLoc]);

  // TODO: Update each current in lastDataCurrent if data is valid
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("Effect triggered with data:", data);
    }

    if (data) {
      setLastDataCurrent((prev) => {
        const newData = {
          i_r_Input:
            data[0].i_r_Input != null ? data[0].i_r_Input : prev.i_r_Input,
          i_r_Output:
            data[0].i_r_Output != null ? data[0].i_r_Output : prev.i_r_Output,
          i_s_Input:
            data[0].i_s_Input != null ? data[0].i_s_Input : prev.i_s_Input,
          i_s_Output:
            data[0].i_s_Output != null ? data[0].i_s_Output : prev.i_s_Output,
          i_t_Input:
            data[0].i_t_Input != null ? data[0].i_t_Input : prev.i_t_Input,
          i_t_Output:
            data[0].i_t_Output != null ? data[0].i_t_Output : prev.i_t_Output,
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
  }, [data]);

  // TODO: Set current values based on valid data or fallback to last known values
  const currentValues = {
    i_r_Input:
      data && data[0]?.i_r_Input != null
        ? data[0].i_r_Input
        : lastDataCurrent.i_r_Input,
    i_r_Output:
      data && data[0]?.i_r_Output != null
        ? data[0].i_r_Output
        : lastDataCurrent.i_r_Output,
    i_s_Input:
      data && data[0]?.i_s_Input != null
        ? data[0].i_s_Input
        : lastDataCurrent.i_s_Input,
    i_s_Output:
      data && data[0]?.i_s_Output != null
        ? data[0].i_s_Output
        : lastDataCurrent.i_s_Output,
    i_t_Input:
      data && data[0]?.i_t_Input != null
        ? data[0].i_t_Input
        : lastDataCurrent.i_t_Input,
    i_t_Output:
      data && data[0]?.i_t_Output != null
        ? data[0].i_t_Output
        : lastDataCurrent.i_t_Output,
  };

  // If SWR Realtime connection error then show this widget below
  if (error) {
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
    <div id="current-template" className="grid grid-cols-1 gap-0 mt-2">
      {/* Alert on slow loading */}
      {isSlowLoad ? (
        <>
          <div
            id="hs-pro-shchal"
            className="mb-5 p-4 sm:ps-16 relative overflow-hidden bg-gradient-to-r from-orange-100 via-purple-200 via-70% to-indigo-200 rounded-lg dark:from-orange-800 dark:via-purple-800 dark:to-indigo-800"
            role="alert"
            tabIndex={-1}
            aria-labelledby="hs-pro-shchal-label"
          >
            <div className="flex items-center gap-x-3">
              <div className="absolute hidden sm:block -bottom-4 -start-6">
                <span className="text-7xl">🎁</span>
              </div>
              <div className="grow">
                <h4
                  id="hs-pro-shchal-label"
                  className="font-medium text-orange-700 dark:text-white"
                >
                  Choose your free gift
                </h4>
                <p className="mt-1 text-xs text-gray-800 dark:text-neutral-200">
                  When you spend $30. Use code SUMMER.
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center text-xs text-gray-800 border border-transparent rounded-full size-7 gap-x-1 hover:bg-indigo-300 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-indigo-300 dark:text-purple-300 dark:hover:bg-indigo-700 dark:focus:bg-indigo-700"
                data-hs-remove-element="#hs-pro-shchal"
              >
                <svg
                  className="shrink-0 size-3.5"
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
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
                <span className="sr-only">Remove</span>
              </button>
            </div>
          </div>
        </>
      ) : null}
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
                  selectLoc.length === null ||
                  param1.length !== 0 ||
                  param2.length !== 0
                    ? "pointer-events-none"
                    : null
                }`}
              >
                <button
                  id="hs-dropdown-example"
                  type="button"
                  className="py-2 px-2 inline-flex items-center gap-x-1.5 text-xs rounded-lg bg-white text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  aria-label="Dropdown"
                >
                  {selectLoc.length != 0 ? selectLoc[1] : "Select location"}
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
                  {dataLoc
                    .filter(
                      (obj, index) =>
                        dataLoc.findIndex((item) => item.code === obj.code) ===
                        index
                    )
                    .map((item, index) => (
                      <Link
                        key={index}
                        className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-800/80 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
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
                          {selectLoc[0] === item.code ? "Selected" : ""}
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
                  selectDev.length === null ||
                  !showDev ||
                  param1.length !== 0 ||
                  param2.length !== 0
                    ? "pointer-events-none"
                    : null
                }`}
              >
                <button
                  id="hs-dropdown-example"
                  type="button"
                  className="py-2 px-2 inline-flex items-center gap-x-1.5 text-xs rounded-lg bg-white text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  aria-label="Dropdown"
                >
                  {selectDev.length != 0 ? selectDev[1] : "Select device"}
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
                  {dataDev.map((item, index) => (
                    <Link
                      key={index}
                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-800/80 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
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
                        {selectDev[0] === item.code ? "Selected" : ""}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {/* End Select Device */}
          </div>
          {/* Reset Button */}
          {param1.length !== 0 || param2.length !== 0 ? (
            <>
              <button
                type="button"
                disabled={
                  selectDev.length === 0 ||
                  param1.length === 0 ||
                  param2.length === 0
                    ? true
                    : false
                }
                className="py-[7px] px-2 inline-flex items-center gap-x-1 text-xs font-medium rounded-lg border border-transparent bg-rose-600 dark:bg-rose-700 text-white hover:bg-rose-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-rose-500"
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
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                  />
                </svg>
                Exit Detail Mode
              </button>
            </>
          ) : null}
          {/* End Reset Button */}
        </div>
      </div>
      {/* End Page Heading */}

      {/* Current gauge list */}
      <>
        {/* Current R */}
        <div
          className={`${
            param1.length === 0 || param2.length === 0
              ? "flex flex-col mt-2 mb-4 bg-white border border-gray-200 md:mt-0 rounded-xl dark:bg-neutral-800 dark:border-neutral-700"
              : "flex flex-col mt-2 mb-4 bg-white border border-gray-300 md:mt-0 rounded-xl dark:bg-neutral-900 dark:border-neutral-800"
          }`}
        >
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

            <div className="shrink-0 pb-2 md:pb-0 relative text-center size-11 w-full md:w-[220px] md:h-[50px] mx-auto">
              <h2 className="text-lg font-semibold lg:text-xl">
                {`Current (Ampere) R`}
              </h2>
            </div>
          </div>

          {/* Body */}
          <div className="p-3 pt-0 text-center md:px-5 md:pb-5">
            <div className="flex flex-wrap items-center justify-center md:justify-evenly">
              {!onLoading ? (
                <>
                  <div className="w-full h-full md:w-1/2">
                    {data?.map((item, index) => {
                      if (!error) {
                        return (
                          <RadialDynamicGauge
                            key={`r-input${index}`}
                            id={"current-r-input"}
                            alt={"R"}
                            title="Input"
                            value={
                              !error && data !== undefined
                                ? item.i_r_Input
                                : currentValues.i_r_Input
                            }
                          />
                        );
                      }
                      return (
                        <div key={`current-r-input${index}`}>
                          <span className="inline-flex items-center px-2 py-1 text-xs text-gray-800 bg-gray-100 rounded-full gap-x-1 dark:bg-neutral-500/20 dark:text-neutral-400">
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
                            Device is not connected
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="w-full h-full md:w-1/2">
                    {data?.map((item, index) => {
                      if (!error) {
                        return (
                          <RadialDynamicGauge
                            key={`r-output${index}`}
                            id={"current-r-output"}
                            alt={"R"}
                            title="Output"
                            value={
                              !error && data !== undefined
                                ? item.i_r_Output
                                : currentValues.i_r_Output
                            }
                          />
                        );
                      }
                      return (
                        <div key={`current-r-output${index}`}>
                          <span className="inline-flex items-center px-2 py-1 text-xs text-gray-800 bg-gray-100 rounded-full gap-x-1 dark:bg-neutral-500/20 dark:text-neutral-400">
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
                            Device is not connected
                          </span>
                        </div>
                      );
                    })}
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
        {/* Current S */}
        <div
          className={`${
            param1.length === 0 || param2.length === 0
              ? "flex flex-col mt-2 mb-4 bg-white border border-gray-200 md:mt-0 rounded-xl dark:bg-neutral-800 dark:border-neutral-700"
              : "flex flex-col mt-2 mb-4 bg-white border border-gray-300 md:mt-0 rounded-xl dark:bg-neutral-900 dark:border-neutral-800"
          }`}
        >
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

            <div className="shrink-0 pb-2 md:pb-0 relative text-center size-11 w-full md:w-[220px] md:h-[50px] mx-auto">
              <h2 className="text-lg font-semibold lg:text-xl">{`Current (Ampere) S`}</h2>
            </div>
          </div>

          {/* Body */}
          <div className="p-3 pt-0 text-center md:px-5 md:pb-5">
            <div className="flex flex-wrap items-center justify-center md:justify-evenly">
              {!onLoading ? (
                <>
                  <div className="w-full h-full md:w-1/2">
                    {data?.map((item, index) => {
                      if (!error) {
                        return (
                          <RadialDynamicGauge
                            key={`s-input${index}`}
                            id={"current-s-input"}
                            alt={"S"}
                            title="Input"
                            value={
                              !error && data !== undefined
                                ? item.i_s_Input
                                : currentValues.i_s_Input
                            }
                          />
                        );
                      }
                      return (
                        <div key={`current-s-input${index}`}>
                          <span className="inline-flex items-center px-2 py-1 text-xs text-gray-800 bg-gray-100 rounded-full gap-x-1 dark:bg-neutral-500/20 dark:text-neutral-400">
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
                            Device is not connected
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="w-full h-full md:w-1/2">
                    {data?.map((item, index) => {
                      if (!error) {
                        return (
                          <RadialDynamicGauge
                            key={`s-output${index}`}
                            id={"current-s-output"}
                            alt={"S"}
                            title="Output"
                            value={
                              !error & (data !== undefined)
                                ? item.i_s_Output
                                : currentValues.i_s_Output
                            }
                          />
                        );
                      }
                      return (
                        <div key={`current-s-output${index}`}>
                          <span className="inline-flex items-center px-2 py-1 text-xs text-gray-800 bg-gray-100 rounded-full gap-x-1 dark:bg-neutral-500/20 dark:text-neutral-400">
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
                            Device is not connected
                          </span>
                        </div>
                      );
                    })}
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
        {/* Current T */}
        <div
          className={`${
            param1.length === 0 || param2.length === 0
              ? "flex flex-col mt-2 mb-4 bg-white border border-gray-200 md:mt-0 rounded-xl dark:bg-neutral-800 dark:border-neutral-700"
              : "flex flex-col mt-2 mb-4 bg-white border border-gray-300 md:mt-0 rounded-xl dark:bg-neutral-900 dark:border-neutral-800"
          }`}
        >
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

            <div className="shrink-0 pb-2 md:pb-0 relative text-center size-11 w-full md:w-[220px] md:h-[50px] mx-auto">
              <h2 className="text-lg font-semibold lg:text-xl">{`Current (Ampere) T`}</h2>
            </div>
          </div>

          {/* Body */}
          <div className="p-3 pt-0 text-center md:px-5 md:pb-5">
            <div className="flex flex-wrap items-center justify-center md:justify-evenly">
              {!onLoading ? (
                <>
                  <div className="w-full h-full md:w-1/2">
                    {data?.map((item, index) => {
                      if (!error) {
                        return (
                          <RadialDynamicGauge
                            key={`t-input${index}`}
                            id={"current-t-input"}
                            alt={"T"}
                            title="Input"
                            value={
                              !error && data !== undefined
                                ? item.i_t_Input
                                : currentValues.i_t_Input
                            }
                          />
                        );
                      }
                      return (
                        <div key={`current-t-input${index}`}>
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
                            Device is not connected
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="w-full h-full md:w-1/2">
                    {data?.map((item, index) => {
                      if (!error) {
                        return (
                          <RadialDynamicGauge
                            key={`t-output${index}`}
                            id={"current-t-output"}
                            alt={"T"}
                            title="Output"
                            value={
                              !error && data !== undefined
                                ? item.i_t_Output
                                : currentValues.i_t_Output
                            }
                          />
                        );
                      }
                      return (
                        <div key={`current-t-output${index}`}>
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
                            Device is not connected
                          </span>
                        </div>
                      );
                    })}
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
      </>
      {/* End Current gauge list */}

      <PrelineScript />
    </div>
  );
}
