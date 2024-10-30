"use client";

import React, { useState, useEffect } from "react";
import PrelineScript from "@/components/PrelineScript";
import {
  Current,
  Ground,
  PowerFactor,
  THDv,
  THDi,
} from "../../../../public/icons";
import Link from "next/link";
import Image from "next/image";
import useSWR, { mutate } from "swr";
import dynamic from "next/dynamic";

const RealTimeVoltageInputSplineChart = dynamic(
  () => import("@/components/charts/line/VoltageInputChart"),
  {
    ssr: true,
  }
);

const RealTimeVoltageOutputSplineChart = dynamic(
  () => import("@/components/charts/line/VoltageOutputChart"),
  {
    ssr: true,
  }
);

// TODO: Fetch monitoring data with SWR isolated
function useMonitoring(localTenant, locationid, start_date) {
  // Function to fetch the data API [REALTIME]
  const fetchDataRealtime = async (
    url,
    localTenant,
    locationid,
    start_date
  ) => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `${process.env.BASE_URL}/`,
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers":
          "Content-Type, Accept, Origin, X-Requested-With",
        tenant: localTenant,
        token: process.env.AUTH_TOKEN,
      },
      body: JSON.stringify({
        tenant: localTenant,
        locationid: locationid,
        lane: "",
        status: "",
        value: "",
        side: "",
        start_date: start_date ?? "2024-01-01 00:40:20",
        end_date: "",
      }),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("500. An error occured.");
      }

      const data = res.json();
      return data;
    });
  };

  // Clear SWR Cache
  const clearSWRCache = () =>
    mutate(() => true, undefined, {
      revalidate: false,
      rollbackOnError: true,
    });

  const { data, isLoading, error } = useSWR(
    ["/api/monitoring/getmonitoring", localTenant, locationid, start_date],
    ([url, localTenant, locationid, start_date]) =>
      fetchDataRealtime(url, localTenant, locationid, start_date),
    {
      isPaused: () =>
        (localTenant == "" && localTenant == undefined) ||
        (locationid === null && locationid === undefined) ||
        (start_date == "" && start_date == undefined)
          ? true
          : false,
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
            "/api/monitoring/getmonitoring",
            localTenant,
            locationid,
            start_date,
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

  if (data?.message === "OK") {
    if (
      data?.monitoring["data"]["datacurrents"][0] === undefined ||
      data?.monitoring["data"]["dataenergys"][0] === undefined ||
      data?.monitoring["data"]["datagrounds"][0] === undefined ||
      data?.monitoring["data"]["datathdis"][0] === undefined ||
      data?.monitoring["data"]["dataThdvs"][0] === undefined ||
      data?.monitoring["data"]["datavoltages"][0] === undefined ||
      data?.monitoring["data"]["datafrequencys"][0] === undefined ||
      data?.monitoring["data"]["dataPowerFactors"][0] === undefined
    ) {
      return {
        monitoring: null,
        isMonitoringError: error,
        isMonitoringLoading: isLoading,
      };
    } else {
      const currentDate = new Date();
      const sendDate = data?.monitoring["data"]["datavoltages"][0].send_date;
      // format the send_date value
      const isoConvSendDate = new Date(sendDate);
      // count the diff
      const diffTime = currentDate - isoConvSendDate;
      // set the minutes value
      const minutes = Math.floor(diffTime / 60000);

      // Set offline status if the diff time more than 5 minutes from NOW()
      if (minutes >= process.env.MAX_LAST_TRIGGER_MINUTE) {
        return {
          monitoring: null,
          isMonitoringError: error,
          isMonitoringLoading: isLoading,
        };
      } else {
        return {
          monitoring: data,
          isMonitoringError: error,
          isMonitoringLoading: isLoading,
        };
      }
    }
  } else {
    return {
      monitoring: null,
      isMonitoringError: error,
      isMonitoringLoading: isLoading,
    };
  }
}

export default function DashboardOutline() {
  /**
   * STATE COLLECTION
   */
  // local Value
  const [localTenant, setLocalTenant] = useState("");

  // Dates
  const [currentDate, setCurrentDate] = useState("");
  const [hoursAgo, setHoursAgo] = useState("");

  // Init the device connection status and signal recipient status
  const [signal, setSignal] = useState(false);

  // Used to set the /tool/dataside API
  const [dataLoc, setDataLoc] = useState([]);
  const [selectLoc, setSelectLoc] = useState([]);
  // const [selectLoc, setSelectLoc] = useState([10, 'Siloam Cibubur']);

  // Used to set the /tool/dataLocation API
  const [dataDev, setDataDev] = useState([]);
  const [selectDev, setSelectDev] = useState([]);
  // const [selectDev, setSelectDev] = useState([102, 'Ruang ICU Lt 3']);

  /**
   * Used to conditioning the device dropdown pointer event
   * if location === [] (null), then disable the device dropdown
   */
  const [showDev, isShowDev] = useState(true);

  // Used to set date time
  const [dateState, setDateState] = useState(new Date());

  // Used to control value of monitoring
  const { monitoring, isMonitoringError, isMonitoringLoading } = useMonitoring(
    localTenant,
    selectDev[0],
    hoursAgo
  );

  /**
   * END OF STATE COLLECTION
   */

  // Scripts
  const handleSelectLocation = (code, name, e) => {
    e.preventDefault();
    setSelectLoc([code, name]);
    isShowDev(true);
    setSelectDev([]);
  };

  const handleSelectDevice = (code, name, e) => {
    e.preventDefault();
    setSelectDev([code, name]);
  };

  const handleDisableClick = (e) => {
    e.preventDefault();
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
      setCurrentDate(getFormatedCurrentDate);
      setHoursAgo(getHoursAgo);
    }
    // if (process.env.NODE_ENV === "development") {
    //   console.log(
    //     "Current date: " +
    //       getFormatedCurrentDate +
    //       "| 1 hours ago: " +
    //       getHoursAgo
    //   );
    // }
  }, []);

  // TODO: Get default site and location
  useEffect(() => {
    // Get local tenant item
    const currentUser = localStorage.getItem("tenant");
    if (localStorage.length != 0) {
      setLocalTenant(`${currentUser.toString()}`);
    }

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

      if (dataSite.message == "OK") {
        setDataLoc(dataSite.site["data"]);

        const firstIndexSite = dataSite.site["data"][0];
        if (selectLoc.length === 0) {
          setSelectLoc([firstIndexSite["code"], firstIndexSite["name"]]);
          setSelectDev([]);
        }

        if (selectLoc.length != 0) {
          // TODO: fetch the device (location)
          fetchDevice(
            currentUser,
            0,
            "",
            "",
            "",
            selectLoc.length === 0 ? "0" : JSON.stringify(selectLoc[0]),
            "2023-01-01 00:00:00",
            "2024-12-30 23:59:00"
          ).then((dataLocation) => {
            // if (process.env.NODE_ENV === "development") {
            //   console.log("fetchDevice: " + dataLocation.loc["data"]);
            // }

            if (dataLocation.message == "OK") {
              setDataDev(dataLocation.loc["data"]);

              const firstIndexDev = dataLocation.loc["data"][0];
              if (selectDev.length === 0) {
                setSelectDev([firstIndexDev["code"], firstIndexDev["name"]]);
                setSignal(true);
              }
            } else {
              setSignal(false);
            }
          });
        }
      } else {
        setSignal(false);
      }
    });
  }, [selectLoc, selectDev]);

  return (
    <div id="outline-template" className="max-w-full h-fit">
      {/* Page Heading */}
      <div className="grid items-center grid-cols-1 px-2 py-2 mx-2 mt-2 mb-4 align-middle border rounded-lg bg-neutral-900 border-neutral-800 md:grid-cols-2 justify-evenly gap-x-4">
        {/* Greetings */}
        <div className="w-full py-0 mx-2 my-2 ps-4 h-fit">
          <div className="flex items-center justify-start gap-x-2">
            {/* Look Dropdown */}
            <div className="relative inline-flex pe-2">
              <div className="hs-dropdown [--auto-close:inside] [--trigger:hover] relative inline-flex">
                {/* Look Button Icon */}
                <button
                  id="hs-pro-shpdcl1d1"
                  type="button"
                  className="duration-200 group hover:scale-110 focus:outline-none"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  aria-label="Dropdown"
                >
                  <span className="relative flex">
                    <span
                      className={`absolute inline-flex ${
                        signal ? "bg-emerald-600" : "bg-red-600"
                      } rounded-full opacity-75 animate-ping size-full`}
                    />
                    <span
                      className={`relative inline-flex ${
                        signal ? "bg-emerald-600" : "bg-red-600"
                      } rounded-full size-3`}
                    />
                    <span className="sr-only">Look Dot</span>
                  </span>
                </button>
                {/* End Look Button Icon */}
                {/* Look Dropdown */}
                <div
                  className="hs-dropdown-menu transition-[opacity,margin] duration-[200ms] hs-dropdown-open:opacity-100 opacity-0 w-52 hidden z-10 bg-white border border-gray-100 rounded-xl shadow-lg before:absolute before:-top-2.5 before:start-0 before:w-full before:h-3 dark:bg-neutral-900 dark:border-neutral-700"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="hs-pro-shpdcl1d1"
                >
                  <div className="p-1 bg-white rounded-xl dark:bg-neutral-900">
                    {/* We will direct user to their profile (Disabled right now) */}
                    <Link
                      className="p-2.5 flex items-center gap-x-2 cursor-default rounded-lg hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:bg-neutral-900 dark:hover:bg-neutral-900 dark:focus:bg-neutral-900"
                      href=""
                      onClick={handleDisableClick.bind(null)}
                    >
                      <div className="grow">
                        <span className="block text-sm text-gray-800 dark:text-neutral-200">
                          {signal
                            ? `You are now connected to ${localTenant}`
                            : `Waiting for connection..`}
                        </span>
                        <p className="mt-1 text-xs text-gray-500 dark:text-neutral-500">
                          Last data update:
                        </p>
                        <p className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                          {dateState.toLocaleString("id-ID", {
                            timeZone: "Asia/Jakarta",
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                            hourCycle: "h24",
                          })}
                        </p>
                      </div>
                      {/* <svg
                        className="text-gray-800 shrink-0 size-4 dark:text-neutral-200"
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
                        <path d="m9 18 6-6-6-6" />
                      </svg> */}
                    </Link>
                  </div>
                </div>
                {/* End Look Dropdown */}
              </div>
            </div>
            {/* End Look Dropdown */}
            <h2 className="inline-flex text-lg lg:text-3xl">
              Welcome,&nbsp;<strong>prasyah</strong>!
            </h2>
          </div>
          <p className="w-full pt-2 text-xs font-light lg:text-sm ps-7 text-wrap text-clip">
            This is a page that provides a summary of the electrical quality in
            your tenant.
          </p>
        </div>
        {/* Location */}
        <div className="py-4 mx-2 h-fit">
          <p className="w-full pb-2 text-xs font-light text-center lg:text-sm text-wrap text-clip">
            Currently you are viewing data:
          </p>
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
              {/* Select Location */}
              <div className="relative inline-block">
                <div
                  className={`relative inline-flex hs-dropdown hs-dropdown-example ${
                    selectLoc.length === null ? "pointer-events-none" : null
                  }`}
                >
                  <button
                    id="hs-dropdown-example"
                    type="button"
                    className="py-2 px-2 inline-flex items-center gap-x-1.5 text-xs rounded-lg bg-white text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:bg-sky-900 dark:text-sky-200 dark:hover:bg-sky-800 dark:focus:bg-sky-800"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    {selectLoc.length != 0 ? selectLoc[1] : "Select location"}
                    <svg
                      className="text-gray-600 hs-dropdown-open:rotate-180 size-3 dark:text-neutral-200"
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
                          dataLoc.findIndex(
                            (item) => item.code === obj.code
                          ) === index
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
              <div className="relative ps-0.5 sm:ps-2 before:block before:absolute before:top-1/2 before:-start-px before:w-px before:h-4 before:bg-gray-300 before:-translate-y-1/2 dark:before:bg-neutral-700">
                <div
                  className={`relative inline-flex hs-dropdown hs-dropdown-example ${
                    selectDev.length === null || !showDev
                      ? "pointer-events-none"
                      : null
                  }`}
                >
                  <button
                    id="hs-dropdown-example"
                    type="button"
                    className="py-2 px-2 inline-flex items-center gap-x-1.5 text-xs rounded-lg bg-white text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:bg-sky-900 dark:text-sky-200 dark:hover:bg-sky-800 dark:focus:bg-sky-800"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    {selectDev.length != 0 ? selectDev[1] : "Select device"}
                    <svg
                      className="text-gray-600 hs-dropdown-open:rotate-180 size-4 dark:text-neutral-200"
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
          </div>
        </div>
      </div>
      {/* End Page Heading */}
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mx-2 my-2 xl:mb-5 xl:gap-6">
        {/* Voltage Input */}
        <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-rose-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-rose-800/30 dark:before:via-transparent">
          {/* Icon */}
          <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow-lg size-8 md:size-10 dark:bg-neutral-900/50 dark:border-neutral-700 dark:text-neutral-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="text-white shrink-0 size-4 md:size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
              />
            </svg>
          </span>
          {/* End Icon */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase lg:text-sm text-rose-500 dark:text-rose-400">
              Voltage Input
            </h2>
            <div className="grid items-center justify-center grid-flow-row-dense grid-cols-4 grid-rows-1 pt-2 pb-4">
              <div className="col-span-4 text-2xl font-semibold text-gray-800 md:col-span-1 dark:text-neutral-200">
                {/* List Group */}
                <ul className="space-y-1">
                  {/* V_RN Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        R-N
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].datavoltages ===
                              undefined ||
                            monitoring.monitoring["data"].datavoltages
                              .length === 0
                          ? 0
                          : monitoring.monitoring["data"].datavoltages[0]
                              .v_rn_input}{" "}
                        V
                      </span>
                    </div>
                  </li>
                  {/* End V_RN Input */}
                  {/* V_SN Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        S-N
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].datavoltages ===
                              undefined ||
                            monitoring.monitoring["data"].datavoltages
                              .length === 0
                          ? 0
                          : monitoring.monitoring["data"].datavoltages[0]
                              .v_sn_input}{" "}
                        V
                      </span>
                    </div>
                  </li>
                  {/* End V_SN Input */}
                  {/* V_TN Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        T-N
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].datavoltages ===
                              undefined ||
                            monitoring.monitoring["data"].datavoltages
                              .length === 0
                          ? 0
                          : monitoring.monitoring["data"].datavoltages[0]
                              .v_tn_input}{" "}
                        V
                      </span>
                    </div>
                  </li>
                  {/* End V_TN Input */}
                  {/* V_RS Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        R-S
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].datavoltages ===
                              undefined ||
                            monitoring.monitoring["data"].datavoltages
                              .length === 0
                          ? 0
                          : monitoring.monitoring["data"].datavoltages[0]
                              .v_rs_input}{" "}
                        V
                      </span>
                    </div>
                  </li>
                  {/* End V_RS Input */}
                  {/* V_ST Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        S-T
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].datavoltages ===
                              undefined ||
                            monitoring.monitoring["data"].datavoltages
                              .length === 0
                          ? 0
                          : monitoring.monitoring["data"].datavoltages[0]
                              .v_st_input}{" "}
                        V
                      </span>
                    </div>
                  </li>
                  {/* End V_ST Input */}
                  {/* V_RT Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        R-T
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].datavoltages ===
                              undefined ||
                            monitoring.monitoring["data"].datavoltages
                              .length === 0
                          ? 0
                          : monitoring.monitoring["data"].datavoltages[0]
                              .v_rt_input}{" "}
                        V
                      </span>
                    </div>
                  </li>
                  {/* End V_RT Input */}
                </ul>
                {/* End List Group */}
              </div>
              {/* Line Chart */}
              <div className="w-full h-full hide md:block col-span-0 md:col-span-3">
                {/* <RealTimeVoltageInputSplineChart /> */}
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs bg-gray-100 text-gray-800 rounded-md dark:bg-neutral-500/20 dark:text-neutral-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="shrink-0 size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                  />
                </svg>
                {dateState.toLocaleString("id-ID", {
                  timeZone: "Asia/Jakarta",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  hourCycle: "h24",
                })}
              </span>
            </div>
          </div>
        </div>
        {/* End Voltage Input */}
        {/* Voltage Output */}
        <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-emerald-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-emerald-800/30 dark:before:via-transparent">
          {/* Icon */}
          <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow-lg size-8 md:size-10 dark:bg-neutral-900/50 dark:border-neutral-700 dark:text-neutral-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="text-white shrink-0 size-4 md:size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
              />
            </svg>
          </span>
          {/* End Icon */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase lg:text-sm text-emerald-500 dark:text-emerald-400">
              Voltage Output
            </h2>
            <div className="grid items-center justify-center grid-flow-row-dense grid-cols-4 grid-rows-1 pt-2 pb-4">
              <div className="col-span-4 text-2xl font-semibold text-gray-800 md:col-span-1 dark:text-neutral-200">
                {/* List Group */}
                <ul className="space-y-1">
                  {/* V_RN Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        R-N
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].datavoltages ===
                              undefined ||
                            monitoring.monitoring["data"].datavoltages
                              .length === 0
                          ? 0
                          : monitoring.monitoring["data"].datavoltages[0]
                              .v_rn_output}{" "}
                        V
                      </span>
                    </div>
                  </li>
                  {/* End V_RN Output */}
                  {/* V_SN Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        S-N
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].datavoltages ===
                              undefined ||
                            monitoring.monitoring["data"].datavoltages
                              .length === 0
                          ? 0
                          : monitoring.monitoring["data"].datavoltages[0]
                              .v_sn_output}{" "}
                        V
                      </span>
                    </div>
                  </li>
                  {/* End V_SN Output */}
                  {/* V_TN Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        T-N
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].datavoltages ===
                              undefined ||
                            monitoring.monitoring["data"].datavoltages
                              .length === 0
                          ? 0
                          : monitoring.monitoring["data"].datavoltages[0]
                              .v_tn_output}{" "}
                        V
                      </span>
                    </div>
                  </li>
                  {/* End V_TN Output */}
                  {/* V_RS Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        R-S
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].datavoltages ===
                              undefined ||
                            monitoring.monitoring["data"].datavoltages
                              .length === 0
                          ? 0
                          : monitoring.monitoring["data"].datavoltages[0]
                              .v_rs_output}{" "}
                        V
                      </span>
                    </div>
                  </li>
                  {/* End V_RS Output */}
                  {/* V_ST Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        S-T
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].datavoltages ===
                              undefined ||
                            monitoring.monitoring["data"].datavoltages
                              .length === 0
                          ? 0
                          : monitoring.monitoring["data"].datavoltages[0]
                              .v_st_output}{" "}
                        V
                      </span>
                    </div>
                  </li>
                  {/* End V_ST Output */}
                  {/* V_RT Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        R-T
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].datavoltages ===
                              undefined ||
                            monitoring.monitoring["data"].datavoltages
                              .length === 0
                          ? 0
                          : monitoring.monitoring["data"].datavoltages[0]
                              .v_rt_output}{" "}
                        V
                      </span>
                    </div>
                  </li>
                  {/* End V_RT Output */}
                </ul>
                {/* End List Group */}
              </div>
              {/* Line Chart */}
              <div className="w-full h-full hide md:block col-span-0 md:col-span-3">
                {/* <RealTimeVoltageOutputSplineChart /> */}
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs bg-gray-100 text-gray-800 rounded-md dark:bg-neutral-500/20 dark:text-neutral-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="shrink-0 size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                  />
                </svg>
                {dateState.toLocaleString("id-ID", {
                  timeZone: "Asia/Jakarta",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  hourCycle: "h24",
                })}
              </span>
            </div>
          </div>
        </div>
        {/* End Voltage Output */}
        {/* Current Input */}
        <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-rose-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-rose-700/30 dark:before:via-transparent">
          {/* Icon */}
          <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow-lg size-8 md:size-10 dark:bg-neutral-900/50 dark:border-neutral-700 dark:text-neutral-400">
            <Image
              priority={true}
              src={Current}
              className="text-rose-500 shrink-0 size-4 md:size-5"
              width={24}
              height={24}
              alt="EMONS | Electrical Monitoring System"
            ></Image>
          </span>
          {/* End Icon */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase lg:text-sm text-rose-500 dark:text-rose-400">
              Current Input
            </h2>
            <div className="grid grid-cols-2 pt-2 pb-4 gap-x-2">
              <div className="col-span-4 text-2xl font-semibold text-gray-800 md:col-span-1 dark:text-neutral-200">
                {/* List Group */}
                <ul className="space-y-1">
                  {/* R Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        R
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].datacurrents ===
                              undefined ||
                            monitoring.monitoring["data"].datacurrents
                              .length === 0
                          ? 0
                          : monitoring.monitoring["data"].datacurrents[0]
                              .i_r_Input}{" "}
                        A
                      </span>
                    </div>
                  </li>
                  {/* End R Input */}
                  {/* S Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        S
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].datacurrents ===
                              undefined ||
                            monitoring.monitoring["data"].datacurrents
                              .length === 0
                          ? 0
                          : monitoring.monitoring["data"].datacurrents[0]
                              .i_s_Input}{" "}
                        A
                      </span>
                    </div>
                  </li>
                  {/* End S Input */}
                  {/* T Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        T
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].datacurrents ===
                              undefined ||
                            monitoring.monitoring["data"].datacurrents
                              .length === 0
                          ? 0
                          : monitoring.monitoring["data"].datacurrents[0]
                              .i_t_Input}{" "}
                        A
                      </span>
                    </div>
                  </li>
                  {/* End T Input */}
                </ul>
                {/* End List Group */}
              </div>
              {/* Line Chart */}
              <div className="w-full h-full hide md:block col-span-0 md:col-span-3">
                {/* <RealTimeVoltageOutputSplineChart /> */}
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs bg-gray-100 text-gray-800 rounded-md dark:bg-neutral-500/20 dark:text-neutral-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="shrink-0 size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                  />
                </svg>
                {dateState.toLocaleString("id-ID", {
                  timeZone: "Asia/Jakarta",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  hourCycle: "h24",
                })}
              </span>
            </div>
          </div>
        </div>
        {/* End Current Input */}
        {/* Current Output */}
        <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-emerald-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-emerald-700/30 dark:before:via-transparent">
          {/* Icon */}
          <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow-lg size-8 md:size-10 dark:bg-neutral-900/50 dark:border-neutral-700 dark:text-neutral-400">
            <Image
              priority={true}
              src={Current}
              className="text-emerald-500 shrink-0 size-4 md:size-5"
              width={24}
              height={24}
              alt="EMONS | Electrical Monitoring System"
            ></Image>
          </span>
          {/* End Icon */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase lg:text-sm text-emerald-500 dark:text-emerald-400">
              Current Output
            </h2>
            <div className="grid grid-cols-2 pt-2 pb-4 gap-x-2">
              <div className="col-span-4 text-2xl font-semibold text-gray-800 md:col-span-1 dark:text-neutral-200">
                {/* List Group */}
                <ul className="space-y-1">
                  {/* R Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        R
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].datacurrents ===
                              undefined ||
                            monitoring.monitoring["data"].datacurrents
                              .length === 0
                          ? 0
                          : monitoring.monitoring["data"].datacurrents[0]
                              .i_r_Output}{" "}
                        A
                      </span>
                    </div>
                  </li>
                  {/* End R Output */}
                  {/* S Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        S
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].datacurrents ===
                              undefined ||
                            monitoring.monitoring["data"].datacurrents
                              .length === 0
                          ? 0
                          : monitoring.monitoring["data"].datacurrents[0]
                              .i_s_Output}{" "}
                        A
                      </span>
                    </div>
                  </li>
                  {/* End S Output */}
                  {/* T Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        T
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].datacurrents ===
                              undefined ||
                            monitoring.monitoring["data"].datacurrents
                              .length === 0
                          ? 0
                          : monitoring.monitoring["data"].datacurrents[0]
                              .i_t_Output}{" "}
                        A
                      </span>
                    </div>
                  </li>
                  {/* End T Output */}
                </ul>
                {/* End List Group */}
              </div>
              {/* Line Chart */}
              <div className="w-full h-full hide md:block col-span-0 md:col-span-3">
                {/* <RealTimeVoltageOutputSplineChart /> */}
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs bg-gray-100 text-gray-800 rounded-md dark:bg-neutral-500/20 dark:text-neutral-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="shrink-0 size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                  />
                </svg>
                {dateState.toLocaleString("id-ID", {
                  timeZone: "Asia/Jakarta",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  hourCycle: "h24",
                })}
              </span>
            </div>
          </div>
        </div>
        {/* End Current Output */}
        {/* Ground Input */}
        <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-rose-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-rose-700/30 dark:before:via-transparent">
          {/* Icon */}
          <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow-lg size-8 md:size-10 dark:bg-neutral-900/50 dark:border-neutral-700 dark:text-neutral-400">
            <Image
              priority={true}
              src={Ground}
              className="text-rose-500 shrink-0 size-4 md:size-5"
              width={24}
              height={24}
              alt="EMONS | Electrical Monitoring System"
            ></Image>
          </span>
          {/* End Icon */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase lg:text-sm text-rose-500 dark:text-rose-400">
              Ground Input
            </h2>
            <div className="grid grid-cols-2 gap-x-2">
              <div className="col-span-4 text-lg font-semibold text-gray-800 lg:text-2xl md:col-span-1 dark:text-neutral-200">
                {monitoring === undefined ||
                monitoring === null ||
                monitoring.length === 0
                  ? 0
                  : monitoring.monitoring["data"].datagrounds === undefined ||
                    monitoring.monitoring["data"].datagrounds.length === 0
                  ? 0
                  : monitoring.monitoring["data"].datagrounds[0]
                      .voltage_input}{" "}
                V
              </div>
              {/* Line Chart */}
              <div className="w-full h-full hide md:block col-span-0 md:col-span-3">
                {/* <RealTimeVoltageOutputSplineChart /> */}
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs bg-gray-100 text-gray-800 rounded-md dark:bg-neutral-500/20 dark:text-neutral-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="shrink-0 size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                  />
                </svg>
                {dateState.toLocaleString("id-ID", {
                  timeZone: "Asia/Jakarta",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  hourCycle: "h24",
                })}
              </span>
            </div>
          </div>
        </div>
        {/* End Ground Input */}
        {/* Ground Output */}
        <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-emerald-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-emerald-700/30 dark:before:via-transparent">
          {/* Icon */}
          <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow-lg size-8 md:size-10 dark:bg-neutral-900/50 dark:border-neutral-700 dark:text-neutral-400">
            <Image
              priority={true}
              src={Ground}
              className="text-emerald-500 shrink-0 size-4 md:size-5"
              width={24}
              height={24}
              alt="EMONS | Electrical Monitoring System"
            ></Image>
          </span>
          {/* End Icon */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase lg:text-sm text-emerald-500 dark:text-emerald-400">
              Ground Output
            </h2>
            <div className="grid grid-cols-2 gap-x-2">
              <div className="col-span-4 text-lg font-semibold text-gray-800 lg:text-2xl md:col-span-1 dark:text-neutral-200">
                {monitoring === undefined ||
                monitoring === null ||
                monitoring.length === 0
                  ? 0
                  : monitoring.monitoring["data"].datagrounds === undefined ||
                    monitoring.monitoring["data"].datagrounds.length === 0
                  ? 0
                  : monitoring.monitoring["data"].datagrounds[0]
                      .voltage_output}{" "}
                V
              </div>
              {/* Line Chart */}
              <div className="w-full h-full hide md:block col-span-0 md:col-span-3">
                {/* <RealTimeVoltageOutputSplineChart /> */}
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs bg-gray-100 text-gray-800 rounded-md dark:bg-neutral-500/20 dark:text-neutral-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="shrink-0 size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                  />
                </svg>
                {dateState.toLocaleString("id-ID", {
                  timeZone: "Asia/Jakarta",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  hourCycle: "h24",
                })}
              </span>
            </div>
          </div>
        </div>
        {/* End Ground Output */}
        {/* Frequency Input */}
        <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-rose-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-rose-800/30 dark:before:via-transparent">
          {/* Icon */}
          <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow-lg size-8 md:size-10 dark:bg-neutral-900/50 dark:border-neutral-700 dark:text-neutral-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="text-white shrink-0 size-4 md:size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </span>
          {/* End Icon */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase lg:text-sm text-rose-500 dark:text-rose-400">
              Frequency Input
            </h2>
            <div className="grid grid-cols-2 gap-x-2">
              <div className="col-span-4 text-lg font-semibold text-gray-800 lg:text-2xl md:col-span-1 dark:text-neutral-200">
                {monitoring === undefined ||
                monitoring === null ||
                monitoring.length === 0
                  ? 0
                  : monitoring.monitoring["data"].datafrequencys ===
                      undefined ||
                    monitoring.monitoring["data"].datafrequencys.length === 0
                  ? 0
                  : monitoring.monitoring["data"].datafrequencys[0]
                      .frequency_input}{" "}
                Hz
              </div>
              {/* Line Chart */}
              <div className="w-full h-full hide md:block col-span-0 md:col-span-3">
                {/* <RealTimeVoltageOutputSplineChart /> */}
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs bg-gray-100 text-gray-800 rounded-md dark:bg-neutral-500/20 dark:text-neutral-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="shrink-0 size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                  />
                </svg>
                {dateState.toLocaleString("id-ID", {
                  timeZone: "Asia/Jakarta",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  hourCycle: "h24",
                })}
              </span>
            </div>
          </div>
        </div>
        {/* End Frequency Input */}
        {/* Frequency Output */}
        <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-emerald-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-emerald-800/30 dark:before:via-transparent">
          {/* Icon */}
          <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow-lg size-8 md:size-10 dark:bg-neutral-900/50 dark:border-neutral-700 dark:text-neutral-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="text-white shrink-0 size-4 md:size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </span>
          {/* End Icon */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase lg:text-sm text-emerald-500 dark:text-emerald-400">
              Frequency Output
            </h2>
            <div className="grid grid-cols-2 gap-x-2">
              <div className="col-span-4 text-lg font-semibold text-gray-800 lg:text-2xl md:col-span-1 dark:text-neutral-200">
                {monitoring === undefined ||
                monitoring === null ||
                monitoring.length === 0
                  ? 0
                  : monitoring.monitoring["data"].datafrequencys ===
                      undefined ||
                    monitoring.monitoring["data"].datafrequencys.length === 0
                  ? 0
                  : monitoring.monitoring["data"].datafrequencys[0]
                      .frequency_output}{" "}
                Hz
              </div>
              {/* Line Chart */}
              <div className="w-full h-full hide md:block col-span-0 md:col-span-3">
                {/* <RealTimeVoltageOutputSplineChart /> */}
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs bg-gray-100 text-gray-800 rounded-md dark:bg-neutral-500/20 dark:text-neutral-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="shrink-0 size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                  />
                </svg>
                {dateState.toLocaleString("id-ID", {
                  timeZone: "Asia/Jakarta",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  hourCycle: "h24",
                })}
              </span>
            </div>
          </div>
        </div>
        {/* End Frequency Output */}
        {/* Energy KWH/KVARH Input */}
        <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-rose-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-rose-800/30 dark:before:via-transparent">
          {/* Icon */}
          <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow-lg size-8 md:size-10 dark:bg-neutral-900/50 dark:border-neutral-700 dark:text-neutral-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="text-white shrink-0 size-4 md:size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
              />
            </svg>
          </span>
          {/* End Icon */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase lg:text-sm text-rose-500 dark:text-rose-400">
              Energy Input
            </h2>
            <div className="grid grid-cols-2 pt-2 pb-4 gap-x-2">
              <div className="col-span-4 text-2xl font-semibold text-gray-800 md:col-span-1 dark:text-neutral-200">
                {/* List Group */}
                <ul className="space-y-1">
                  {/* KWH R Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-xs text-gray-500 align-middle md:text-sm dark:text-neutral-400">
                        KWH R
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataenergys ===
                              undefined ||
                            monitoring.monitoring["data"].dataenergys.length ===
                              0
                          ? 0
                          : monitoring.monitoring["data"].dataenergys[0]
                              .kwh_r_input}{" "}
                        KWH
                      </span>
                    </div>
                  </li>
                  {/* End KWH R Input */}
                  {/* KWH S Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-xs text-gray-500 align-middle md:text-sm dark:text-neutral-400">
                        KWH S
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataenergys ===
                              undefined ||
                            monitoring.monitoring["data"].dataenergys.length ===
                              0
                          ? 0
                          : monitoring.monitoring["data"].dataenergys[0]
                              .kwh_s_input}{" "}
                        KWH
                      </span>
                    </div>
                  </li>
                  {/* End KWH S Input */}
                  {/* KWH T Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-xs text-gray-500 align-middle md:text-sm dark:text-neutral-400">
                        KWH T
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataenergys ===
                              undefined ||
                            monitoring.monitoring["data"].dataenergys.length ===
                              0
                          ? 0
                          : monitoring.monitoring["data"].dataenergys[0]
                              .kwh_t_input}{" "}
                        KWH
                      </span>
                    </div>
                  </li>
                  {/* End KWH T Input */}
                  {/* KVARH R Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-indigo-600 rounded-md size-5 dark:bg-indigo-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-xs text-gray-500 align-middle md:text-sm dark:text-neutral-400">
                        KVARH R
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataenergys ===
                              undefined ||
                            monitoring.monitoring["data"].dataenergys.length ===
                              0
                          ? 0
                          : monitoring.monitoring["data"].dataenergys[0]
                              .kvarh_r_input}{" "}
                        KWH
                      </span>
                    </div>
                  </li>
                  {/* End KVARH R Input */}
                  {/* KVARH S Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-indigo-600 rounded-md size-5 dark:bg-indigo-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-xs text-gray-500 align-middle md:text-sm dark:text-neutral-400">
                        KVARH S
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataenergys ===
                              undefined ||
                            monitoring.monitoring["data"].dataenergys.length ===
                              0
                          ? 0
                          : monitoring.monitoring["data"].dataenergys[0]
                              .kvarh_s_input}{" "}
                        KWH
                      </span>
                    </div>
                  </li>
                  {/* End KVARH S Input */}
                  {/* KVARH T Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-indigo-600 rounded-md size-5 dark:bg-indigo-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-xs text-gray-500 align-middle md:text-sm dark:text-neutral-400">
                        KVARH T
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataenergys ===
                              undefined ||
                            monitoring.monitoring["data"].dataenergys.length ===
                              0
                          ? 0
                          : monitoring.monitoring["data"].dataenergys[0]
                              .kvarh_t_input}{" "}
                        KWH
                      </span>
                    </div>
                  </li>
                  {/* End KVARH T Input */}
                </ul>
                {/* End List Group */}
              </div>
              {/* Line Chart */}
              <div className="w-full h-full hide md:block col-span-0 md:col-span-3">
                {/* <RealTimeVoltageOutputSplineChart /> */}
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs bg-gray-100 text-gray-800 rounded-md dark:bg-neutral-500/20 dark:text-neutral-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="shrink-0 size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                  />
                </svg>
                {dateState.toLocaleString("id-ID", {
                  timeZone: "Asia/Jakarta",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  hourCycle: "h24",
                })}
              </span>
            </div>
          </div>
        </div>
        {/* End Energy KWH/KVARH Input */}
        {/* Energy KWH/KVARH Output */}
        <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-emerald-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-emerald-800/30 dark:before:via-transparent">
          {/* Icon */}
          <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow-lg size-8 md:size-10 dark:bg-neutral-900/50 dark:border-neutral-700 dark:text-neutral-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="text-white shrink-0 size-4 md:size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
              />
            </svg>
          </span>
          {/* End Icon */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase lg:text-sm text-emerald-500 dark:text-emerald-400">
              Energy Output
            </h2>
            <div className="grid grid-cols-2 pt-2 pb-4 gap-x-2">
              <div className="col-span-4 text-2xl font-semibold text-gray-800 md:col-span-1 dark:text-neutral-200">
                {/* List Group */}
                <ul className="space-y-1">
                  {/* KWH R Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-xs text-gray-500 align-middle md:text-sm dark:text-neutral-400">
                        KWH R
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataenergys ===
                              undefined ||
                            monitoring.monitoring["data"].dataenergys.length ===
                              0
                          ? 0
                          : monitoring.monitoring["data"].dataenergys[0]
                              .kwh_r_output}{" "}
                        KWH
                      </span>
                    </div>
                  </li>
                  {/* End KWH R Output */}
                  {/* KWH S Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-xs text-gray-500 align-middle md:text-sm dark:text-neutral-400">
                        KWH S
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataenergys ===
                              undefined ||
                            monitoring.monitoring["data"].dataenergys.length ===
                              0
                          ? 0
                          : monitoring.monitoring["data"].dataenergys[0]
                              .kwh_s_output}{" "}
                        KWH
                      </span>
                    </div>
                  </li>
                  {/* End KWH S Output */}
                  {/* KWH T Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-xs text-gray-500 align-middle md:text-sm dark:text-neutral-400">
                        KWH T
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataenergys ===
                              undefined ||
                            monitoring.monitoring["data"].dataenergys.length ===
                              0
                          ? 0
                          : monitoring.monitoring["data"].dataenergys[0]
                              .kwh_t_output}{" "}
                        KWH
                      </span>
                    </div>
                  </li>
                  {/* End KWH T Output */}
                  {/* KVARH R Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-indigo-600 rounded-md size-5 dark:bg-indigo-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-xs text-gray-500 align-middle md:text-sm dark:text-neutral-400">
                        KVARH R
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataenergys ===
                              undefined ||
                            monitoring.monitoring["data"].dataenergys.length ===
                              0
                          ? 0
                          : monitoring.monitoring["data"].dataenergys[0]
                              .kvarh_r_output}{" "}
                        KWH
                      </span>
                    </div>
                  </li>
                  {/* End KVARH R Output */}
                  {/* KVARH S Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-indigo-600 rounded-md size-5 dark:bg-indigo-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-xs text-gray-500 align-middle md:text-sm dark:text-neutral-400">
                        KVARH S
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataenergys ===
                              undefined ||
                            monitoring.monitoring["data"].dataenergys.length ===
                              0
                          ? 0
                          : monitoring.monitoring["data"].dataenergys[0]
                              .kvarh_s_output}{" "}
                        KWH
                      </span>
                    </div>
                  </li>
                  {/* End KVARH S Output */}
                  {/* KVARH T Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-indigo-600 rounded-md size-5 dark:bg-indigo-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-xs text-gray-500 align-middle md:text-sm dark:text-neutral-400">
                        KVARH T
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataenergys ===
                              undefined ||
                            monitoring.monitoring["data"].dataenergys.length ===
                              0
                          ? 0
                          : monitoring.monitoring["data"].dataenergys[0]
                              .kvarh_t_output}{" "}
                        KWH
                      </span>
                    </div>
                  </li>
                  {/* End KVARH T Output */}
                </ul>
                {/* End List Group */}
              </div>
              {/* Line Chart */}
              <div className="w-full h-full hide md:block col-span-0 md:col-span-3">
                {/* <RealTimeVoltageOutputSplineChart /> */}
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs bg-gray-100 text-gray-800 rounded-md dark:bg-neutral-500/20 dark:text-neutral-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="shrink-0 size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                  />
                </svg>
                {dateState.toLocaleString("id-ID", {
                  timeZone: "Asia/Jakarta",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  hourCycle: "h24",
                })}
              </span>
            </div>
          </div>
        </div>
        {/* End Energy KWH/KVARH Output */}
        {/* Power Factor Input */}
        <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-rose-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-rose-800/30 dark:before:via-transparent">
          {/* Icon */}
          <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow-lg size-8 md:size-10 dark:bg-neutral-900/50 dark:border-neutral-700 dark:text-neutral-400">
            <Image
              priority={true}
              src={PowerFactor}
              className="text-emerald-500 shrink-0 size-4 md:size-5"
              width={24}
              height={24}
              alt="EMONS | Electrical Monitoring System"
            ></Image>
          </span>
          {/* End Icon */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase lg:text-sm text-rose-500 dark:text-rose-400">
              Power Factor Input
            </h2>
            <div className="grid grid-cols-2 gap-x-2">
              <div className="col-span-4 text-lg font-semibold text-gray-800 lg:text-2xl md:col-span-1 dark:text-neutral-200">
                {monitoring === undefined ||
                monitoring === null ||
                monitoring.length === 0
                  ? 0
                  : monitoring.monitoring["data"].dataPowerFactors ===
                      undefined ||
                    monitoring.monitoring["data"].dataPowerFactors.length === 0
                  ? 0
                  : monitoring.monitoring["data"].dataPowerFactors[0]
                      .cosphi_input === -1
                  ? 0
                  : monitoring.monitoring["data"].dataPowerFactors[0]
                      .cosphi_input}
              </div>
              {/* Line Chart */}
              <div className="w-full h-full hide md:block col-span-0 md:col-span-3">
                {/* <RealTimeVoltageOutputSplineChart /> */}
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs bg-gray-100 text-gray-800 rounded-md dark:bg-neutral-500/20 dark:text-neutral-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="shrink-0 size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                  />
                </svg>
                {dateState.toLocaleString("id-ID", {
                  timeZone: "Asia/Jakarta",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  hourCycle: "h24",
                })}
              </span>
            </div>
          </div>
        </div>
        {/* End Power Factor Input */}
        {/* Power Factor Output */}
        <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-emerald-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-emerald-800/30 dark:before:via-transparent">
          {/* Icon */}
          <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow-lg size-8 md:size-10 dark:bg-neutral-900/50 dark:border-neutral-700 dark:text-neutral-400">
            <Image
              priority={true}
              src={PowerFactor}
              className="text-emerald-500 shrink-0 size-4 md:size-5"
              width={24}
              height={24}
              alt="EMONS | Electrical Monitoring System"
            ></Image>
          </span>
          {/* End Icon */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase lg:text-sm text-emerald-500 dark:text-emerald-400">
              Power Factor Output
            </h2>
            <div className="grid grid-cols-2 gap-x-2">
              <div className="col-span-4 text-lg font-semibold text-gray-800 lg:text-2xl md:col-span-1 dark:text-neutral-200">
                {monitoring === undefined ||
                monitoring === null ||
                monitoring.length === 0
                  ? 0
                  : monitoring.monitoring["data"].dataPowerFactors ===
                      undefined ||
                    monitoring.monitoring["data"].dataPowerFactors.length === 0
                  ? 0
                  : monitoring.monitoring["data"].dataPowerFactors[0]
                      .cosphi_output === -1
                  ? 0
                  : monitoring.monitoring["data"].dataPowerFactors[0]
                      .cosphi_output}
              </div>
              {/* Line Chart */}
              <div className="w-full h-full hide md:block col-span-0 md:col-span-3">
                {/* <RealTimeVoltageOutputSplineChart /> */}
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs bg-gray-100 text-gray-800 rounded-md dark:bg-neutral-500/20 dark:text-neutral-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="shrink-0 size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                  />
                </svg>
                {dateState.toLocaleString("id-ID", {
                  timeZone: "Asia/Jakarta",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  hourCycle: "h24",
                })}
              </span>
            </div>
          </div>
        </div>
        {/* End Power Factor Output */}
        {/* THDv Input */}
        <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-rose-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-rose-800/30 dark:before:via-transparent">
          {/* Icon */}
          <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow-lg size-8 md:size-10 dark:bg-neutral-900/50 dark:border-neutral-700 dark:text-neutral-400">
            <Image
              priority={true}
              src={THDv}
              className="text-emerald-500 shrink-0 size-4 md:size-5"
              width={24}
              height={24}
              alt="EMONS | Electrical Monitoring System"
            ></Image>
          </span>
          {/* End Icon */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase lg:text-sm text-rose-500 dark:text-rose-400">
              THDv Input
            </h2>
            <div className="grid items-center justify-center grid-flow-row-dense grid-cols-4 grid-rows-1 pt-2 pb-4">
              <div className="col-span-4 text-2xl font-semibold text-gray-800 md:col-span-1 dark:text-neutral-200">
                {/* List Group */}
                <ul className="space-y-1">
                  {/* RN Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        R-N
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataThdvs ===
                              undefined ||
                            monitoring.monitoring["data"].dataThdvs.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataThdvs[0]
                              .thdv_rn_Input}{" "}
                        %
                      </span>
                    </div>
                  </li>
                  {/* End RN Input */}
                  {/* SN Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        S-N
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataThdvs ===
                              undefined ||
                            monitoring.monitoring["data"].dataThdvs.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataThdvs[0]
                              .thdv_sn_Input}{" "}
                        %
                      </span>
                    </div>
                  </li>
                  {/* End SN Input */}
                  {/* TN Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        T-N
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataThdvs ===
                              undefined ||
                            monitoring.monitoring["data"].dataThdvs.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataThdvs[0]
                              .thdv_tn_Input}{" "}
                        %
                      </span>
                    </div>
                  </li>
                  {/* End TN Input */}
                  {/* RS Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        R-S
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataThdvs ===
                              undefined ||
                            monitoring.monitoring["data"].dataThdvs.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataThdvs[0]
                              .thdv_rs_Input}{" "}
                        %
                      </span>
                    </div>
                  </li>
                  {/* End RS Input */}
                  {/* ST Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        S-T
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataThdvs ===
                              undefined ||
                            monitoring.monitoring["data"].dataThdvs.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataThdvs[0]
                              .thdv_st_Input}{" "}
                        %
                      </span>
                    </div>
                  </li>
                  {/* End ST Input */}
                  {/* RT Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        R-T
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataThdvs ===
                              undefined ||
                            monitoring.monitoring["data"].dataThdvs.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataThdvs[0]
                              .thdv_rt_Input}{" "}
                        %
                      </span>
                    </div>
                  </li>
                  {/* End RT Input */}
                </ul>
                {/* End List Group */}
              </div>
              {/* Line Chart */}
              <div className="w-full h-full hide md:block col-span-0 md:col-span-3">
                {/* <RealTimeVoltageOutputSplineChart /> */}
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs bg-gray-100 text-gray-800 rounded-md dark:bg-neutral-500/20 dark:text-neutral-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="shrink-0 size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                  />
                </svg>
                {dateState.toLocaleString("id-ID", {
                  timeZone: "Asia/Jakarta",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  hourCycle: "h24",
                })}
              </span>
            </div>
          </div>
        </div>
        {/* End THDv Input */}
        {/* THDv Output */}
        <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-emerald-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-emerald-800/30 dark:before:via-transparent">
          {/* Icon */}
          <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow-lg size-8 md:size-10 dark:bg-neutral-900/50 dark:border-neutral-700 dark:text-neutral-400">
            <Image
              priority={true}
              src={THDv}
              className="text-emerald-500 shrink-0 size-4 md:size-5"
              width={24}
              height={24}
              alt="EMONS | Electrical Monitoring System"
            ></Image>
          </span>
          {/* End Icon */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase lg:text-sm text-emerald-500 dark:text-emerald-400">
              THDv Output
            </h2>
            <div className="grid items-center justify-center grid-flow-row-dense grid-cols-4 grid-rows-1 pt-2 pb-4">
              <div className="col-span-4 text-2xl font-semibold text-gray-800 md:col-span-1 dark:text-neutral-200">
                {/* List Group */}
                <ul className="space-y-1">
                  {/* RN Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        R-N
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataThdvs ===
                              undefined ||
                            monitoring.monitoring["data"].dataThdvs.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataThdvs[0]
                              .thdv_rn_output}{" "}
                        %
                      </span>
                    </div>
                  </li>
                  {/* End RN Output */}
                  {/* SN Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        S-N
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataThdvs ===
                              undefined ||
                            monitoring.monitoring["data"].dataThdvs.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataThdvs[0]
                              .thdv_sn_output}{" "}
                        %
                      </span>
                    </div>
                  </li>
                  {/* End SN Output */}
                  {/* TN Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        T-N
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataThdvs ===
                              undefined ||
                            monitoring.monitoring["data"].dataThdvs.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataThdvs[0]
                              .thdv_tn_output}{" "}
                        %
                      </span>
                    </div>
                  </li>
                  {/* End TN Output */}
                  {/* RS Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        R-S
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataThdvs ===
                              undefined ||
                            monitoring.monitoring["data"].dataThdvs.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataThdvs[0]
                              .thdv_rs_output}{" "}
                        %
                      </span>
                    </div>
                  </li>
                  {/* End RS Output */}
                  {/* ST Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        S-T
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataThdvs ===
                              undefined ||
                            monitoring.monitoring["data"].dataThdvs.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataThdvs[0]
                              .thdv_st_output}{" "}
                        %
                      </span>
                    </div>
                  </li>
                  {/* End ST Output */}
                  {/* RT Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        R-T
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataThdvs ===
                              undefined ||
                            monitoring.monitoring["data"].dataThdvs.length === 0
                          ? 0
                          : monitoring.monitoring["data"].dataThdvs[0]
                              .thdv_rt_output}{" "}
                        %
                      </span>
                    </div>
                  </li>
                  {/* End RT Output */}
                </ul>
                {/* End List Group */}
              </div>
              {/* Line Chart */}
              <div className="w-full h-full hide md:block col-span-0 md:col-span-3">
                {/* <RealTimeVoltageOutputSplineChart /> */}
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs bg-gray-100 text-gray-800 rounded-md dark:bg-neutral-500/20 dark:text-neutral-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="shrink-0 size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                  />
                </svg>
                {dateState.toLocaleString("id-ID", {
                  timeZone: "Asia/Jakarta",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  hourCycle: "h24",
                })}
              </span>
            </div>
          </div>
        </div>
        {/* End THDv Output */}
        {/* THDi Input */}
        <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-rose-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-rose-700/30 dark:before:via-transparent">
          {/* Icon */}
          <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow-lg size-8 md:size-10 dark:bg-neutral-900/50 dark:border-neutral-700 dark:text-neutral-400">
            <Image
              priority={true}
              src={THDi}
              className="text-rose-500 shrink-0 size-4 md:size-5"
              width={24}
              height={24}
              alt="EMONS | Electrical Monitoring System"
            ></Image>
          </span>
          {/* End Icon */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase lg:text-sm text-rose-500 dark:text-rose-400">
              THDi Input
            </h2>
            <div className="grid grid-cols-2 pt-2 pb-4 gap-x-2">
              <div className="col-span-4 text-2xl font-semibold text-gray-800 md:col-span-1 dark:text-neutral-200">
                {/* List Group */}
                <ul className="space-y-1">
                  {/* R Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        R
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].datathdis ===
                              undefined ||
                            monitoring.monitoring["data"].datathdis.length === 0
                          ? 0
                          : monitoring.monitoring["data"].datathdis[0]
                              .thdi_r_Input}{" "}
                        %
                      </span>
                    </div>
                  </li>
                  {/* End R Input */}
                  {/* S Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        S
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].datathdis ===
                              undefined ||
                            monitoring.monitoring["data"].datathdis.length === 0
                          ? 0
                          : monitoring.monitoring["data"].datathdis[0]
                              .thdi_s_Input}{" "}
                        %
                      </span>
                    </div>
                  </li>
                  {/* End S Input */}
                  {/* T Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        T
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].datathdis ===
                              undefined ||
                            monitoring.monitoring["data"].datathdis.length === 0
                          ? 0
                          : monitoring.monitoring["data"].datathdis[0]
                              .thdi_t_Input}{" "}
                        %
                      </span>
                    </div>
                  </li>
                  {/* End T Input */}
                </ul>
                {/* End List Group */}
              </div>
              {/* Line Chart */}
              <div className="w-full h-full hide md:block col-span-0 md:col-span-3">
                {/* <RealTimeVoltageOutputSplineChart /> */}
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs bg-gray-100 text-gray-800 rounded-md dark:bg-neutral-500/20 dark:text-neutral-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="shrink-0 size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                  />
                </svg>
                {dateState.toLocaleString("id-ID", {
                  timeZone: "Asia/Jakarta",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  hourCycle: "h24",
                })}
              </span>
            </div>
          </div>
        </div>
        {/* End THDi Input */}
        {/* THDi Output */}
        <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-emerald-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-emerald-700/30 dark:before:via-transparent">
          {/* Icon */}
          <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow-lg size-8 md:size-10 dark:bg-neutral-900/50 dark:border-neutral-700 dark:text-neutral-400">
            <Image
              priority={true}
              src={THDi}
              className="text-emerald-500 shrink-0 size-4 md:size-5"
              width={24}
              height={24}
              alt="EMONS | Electrical Monitoring System"
            ></Image>
          </span>
          {/* End Icon */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase lg:text-sm text-emerald-500 dark:text-emerald-400">
              THDi Output
            </h2>
            <div className="grid grid-cols-2 pt-2 pb-4 gap-x-2">
              <div className="col-span-4 text-2xl font-semibold text-gray-800 md:col-span-1 dark:text-neutral-200">
                {/* List Group */}
                <ul className="space-y-1">
                  {/* R Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        R
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].datathdis ===
                              undefined ||
                            monitoring.monitoring["data"].datathdis.length === 0
                          ? 0
                          : monitoring.monitoring["data"].datathdis[0]
                              .thdi_r_output}{" "}
                        %
                      </span>
                    </div>
                  </li>
                  {/* End R Output */}
                  {/* S Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        S
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].datathdis ===
                              undefined ||
                            monitoring.monitoring["data"].datathdis.length === 0
                          ? 0
                          : monitoring.monitoring["data"].datathdis[0]
                              .thdi_s_output}{" "}
                        %
                      </span>
                    </div>
                  </li>
                  {/* End S Output */}
                  {/* T Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        T
                      </h2>
                      <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                        {monitoring === undefined ||
                        monitoring === null ||
                        monitoring.length === 0
                          ? 0
                          : monitoring.monitoring["data"].datathdis ===
                              undefined ||
                            monitoring.monitoring["data"].datathdis.length === 0
                          ? 0
                          : monitoring.monitoring["data"].datathdis[0]
                              .thdi_t_output}{" "}
                        %
                      </span>
                    </div>
                  </li>
                  {/* End T Output */}
                </ul>
                {/* End List Group */}
              </div>
              {/* Line Chart */}
              <div className="w-full h-full hide md:block col-span-0 md:col-span-3">
                {/* <RealTimeVoltageOutputSplineChart /> */}
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs bg-gray-100 text-gray-800 rounded-md dark:bg-neutral-500/20 dark:text-neutral-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="shrink-0 size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                  />
                </svg>
                {dateState.toLocaleString("id-ID", {
                  timeZone: "Asia/Jakarta",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  hourCycle: "h24",
                })}
              </span>
            </div>
          </div>
        </div>
        {/* End THDi Output */}
      </div>
      {/* End Stats Grid */}
      <PrelineScript />
    </div>
  );
}
