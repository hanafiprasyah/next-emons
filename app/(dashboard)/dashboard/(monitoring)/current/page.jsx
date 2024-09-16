"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import PrelineScript from "@/components/PrelineScript";
import Loader from "@/loading";
import Link from "next/link";
import useSWR from "swr";
import ErrorImage from "../../../../../public/images/error500.svg";

import dynamic from "next/dynamic";
const RadialDynamicGauge = dynamic(
  () => import("@/components/charts/CurrentRadialGauge"),
  {
    ssr: true,
  }
);

export default function Current() {
  // local Value
  const [localTenant, setLocalTenant] = useState("");

  // Init the device connection status and signal recipient status
  const [signal, setSignal] = useState(false);
  const [channel, setChannel] = useState("Connecting");

  // Used to set the /tool/dataside API
  const [dataLoc, setDataLoc] = useState([]);
  const [selectLoc, setSelectLoc] = useState([]);
  // const [selectLoc, setSelectLoc] = useState([10, 'Siloam Cibubur']);

  // Used to set the /tool/dataLocation API
  const [dataDev, setDataDev] = useState([]);
  const [selectDev, setSelectDev] = useState([]);
  // const [selectDev, setSelectDev] = useState([102, 'Ruang ICU Lt 3']);

  // Used to set the /device/getlastdatacurrent API
  const [dataCurrent, setDataCurrent] = useState([]);

  /**
   * Used to conditioning the device dropdown pointer event
   * if location === [] (null), then disable the device dropdown
   */
  const [showDev, isShowDev] = useState(true);

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

  // Function to fetch the /device/getlastdatacurrent API [REALTIME]
  const fetchCurrentRealtime = async (url, tenant, locationid) => {
    return fetch(url, {
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
        start_date: "",
        end_date: "",
      }),
    })
      .then((res) => (res.ok ? res.json() : setChannel("Unreachable")))
      .then((datas) => {
        if (datas) {
          selectDev.indexOf(0).length != 0
            ? setDataCurrent(datas.current["data"])
            : setDataCurrent([]);
        } else {
          setChannel("Unreachable");
        }
      });
  };

  // SWR
  const { data, error } = useSWR(
    localTenant !== "" && localTenant !== undefined
      ? [
          "/api/monitoring/current/getdata",
          localTenant,
          selectDev.length === 0 ? "0" : selectDev[0],
        ]
      : null,
    ([url, localTenant, locationid]) =>
      fetchCurrentRealtime(url, localTenant, locationid),
    {
      refreshInterval: 1000,
      refreshWhenHidden: true,
      refreshWhenOffline: false,
      revalidateOnReconnect: true,
    }
  );

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
      if (process.env.NODE_ENV === "development") {
        console.log(dataSite.site["data"]);
      }

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
            selectLoc.length === 0
              ? "0"
              : JSON.stringify(selectLoc[0]).toString(),
            "2023-01-01 00:00:00",
            "2024-12-30 23:59:00"
          ).then((dataLocation) => {
            if (process.env.NODE_ENV === "development") {
              console.log(dataLocation.loc["data"]);
            }

            if (dataLocation.message == "OK") {
              setDataDev(dataLocation.loc["data"]);

              const firstIndexDev = dataLocation.loc["data"][0];
              if (selectDev.length === 0) {
                setSelectDev([firstIndexDev["code"], firstIndexDev["name"]]);
              }

              // delay signal and channel status by 100ms after connection ready
              setTimeout(() => {
                setSignal(true);
                setChannel("Stable");
              }, 100);
            } else {
              setSignal(false);
              setChannel("Unreachable");
            }
          });
        }
      } else {
        setSignal(false);
        setChannel("Unreachable");
      }
    });
  }, [selectLoc, selectDev]);

  // If SWR Realtime connection error then show this widget below
  if (error) {
    return (
      <div className="p-2 space-y-5 text-center sm:p-5 sm:pb-0">
        {/* Content */}
        <div className="max-w-md mx-auto space-y-3">
          <Image
            width={500}
            height={500}
            className="max-w-xs mx-auto dark:hidden"
            src={ErrorImage}
            alt="EMONS"
          />
          <Image
            width={500}
            height={500}
            className="hidden max-w-xs mx-auto dark:block"
            src={ErrorImage}
            alt="EMONS"
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
            Server is under maintenance
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
      {/* Page Heading */}
      <div className="px-2 pb-2 md:px-1 sm:pb-4">
        {/* Title */}
        {/* <h4 className="pt-2 pb-4 text-3xl font-semibold text-gray-800 lg:text-4xl md:pb-4 md:pt-0 dark:text-neutral-200">
          Current
        </h4> */}
        {/* End Title */}
        <div className="-ms-[5px] flex justify-between items-center gap-1 sm:gap-2">
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            {/* Select Location */}
            <div className="relative inline-block">
              <div
                className={`relative inline-flex hs-dropdown hs-dropdown-example ${
                  !signal ? "pointer-events-none" : null
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
                  {signal
                    ? selectLoc.length != 0
                      ? selectLoc[1]
                      : "Select location"
                    : "Loading location"}
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
                      <a
                        key={index}
                        className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-800/80 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                        href=""
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectLoc([item.code, item.name]);
                          isShowDev(true);
                          setSelectDev([]);
                        }}
                      >
                        <span className="inline-flex text-sm text-white">
                          {item.name}
                        </span>
                        <span className="inline-flex text-xs text-gray-400">
                          {selectLoc[0] === item.code ? "Selected" : ""}
                        </span>
                      </a>
                    ))}
                </div>
              </div>
            </div>
            {/* End Select Location */}

            {/* Select Device */}
            <div className="relative ps-0.5 sm:ps-2 before:block before:absolute before:top-1/2 before:-start-px before:w-px before:h-4 before:bg-gray-300 before:-translate-y-1/2 dark:before:bg-neutral-700">
              <div
                className={`relative inline-flex hs-dropdown hs-dropdown-example ${
                  !signal || !showDev ? "pointer-events-none" : null
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
                  {signal
                    ? selectDev.length != 0
                      ? selectDev[1]
                      : "Select device"
                    : "Loading device"}
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
                    <a
                      key={index}
                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-800/80 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectDev([item.code, item.name]);
                      }}
                    >
                      <span className="inline-flex text-sm text-white">
                        {item.name}
                      </span>
                      <span className="inline-flex text-xs text-gray-400">
                        {selectDev[0] === item.code ? "Selected" : ""}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            {/* End Select Device */}
          </div>
          {/* Reset Button */}
          <button
            type="button"
            disabled={selectDev.length === 0 ? true : false}
            className="py-[7px] px-2 inline-flex items-center gap-x-1 text-xs font-medium rounded-lg border border-transparent bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-teal-500"
            onClick={(e) => {
              e.preventDefault();
              setSelectLoc([]);
              setSelectDev([]);
              isShowDev(true);
            }}
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

      {/* Current gauge list */}
      <>
        {/* Current R */}
        <div className="flex flex-col mt-2 mb-4 bg-white border border-gray-200 md:mt-0 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
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
              <div className="w-full h-full md:w-1/2">
                {dataCurrent.map((item, index) => {
                  if (item.location_id === selectDev[0]) {
                    return (
                      <RadialDynamicGauge
                        id={"current-r-input"}
                        key={"r-input"}
                        alt={"R"}
                        title="Input"
                        value={
                          item.location_id === selectDev[0] ? item.i_r_Input : 0
                        }
                      />
                    );
                  }
                  return (
                    <div key={index}>
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
                        No device installed
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="w-full h-full md:w-1/2">
                {dataCurrent.map((item, index) => {
                  if (item.location_id === selectDev[0]) {
                    return (
                      <RadialDynamicGauge
                        id={"current-r-output"}
                        key={"r-output"}
                        alt={"R"}
                        title="Output"
                        value={
                          item.location_id === selectDev[0]
                            ? item.i_r_Output
                            : 0
                        }
                      />
                    );
                  }
                  return (
                    <div key={index}>
                      <span className="items-center hidden px-2 py-1 my-4 text-xs text-gray-800 bg-gray-100 rounded-full md:inline-flex gap-x-1 dark:bg-neutral-500/20 dark:text-neutral-400">
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
                        No device installed
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col px-5 py-3 text-center border-t border-gray-200 sm:flex-row sm:justify-between sm:items-center gap-y-1 sm:gap-y-0 gap-x-2 sm:text-start dark:border-neutral-700">
            <div>
              <span className="hidden md:inline-flex items-center gap-x-1.5 py-1 px-2.5 font-medium rounded-full  text-xs text-gray-500 dark:text-neutral-500">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-block w-full h-full rounded-full opacity-75 animate-ping shrink-0 bg-sky-400"></span>
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-sky-500"></span>
                </span>
                Updated every seconds
              </span>
            </div>
            <div>
              <label
                htmlFor="hs-pro-dupccn1"
                className="relative block w-auto px-3 py-2 text-sm font-medium text-center rounded-lg cursor-default sm:text-start focus:outline-none"
              >
                <span
                  className={`relative z-10 text-gray-800 peer-checked:hidden ${
                    channel == "Stable"
                      ? "dark:text-emerald-400"
                      : "dark:text-gray-500"
                  }`}
                >
                  {channel}
                </span>
              </label>
            </div>
          </div>
        </div>
        {/* Current S */}
        <div className="flex flex-col mb-4 bg-white border border-gray-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
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
              <div className="w-full h-full md:w-1/2">
                {dataCurrent.map((item, index) => {
                  if (item.location_id === selectDev[0]) {
                    return (
                      <RadialDynamicGauge
                        id={"current-s-input"}
                        key={"s-input"}
                        alt={"S"}
                        title="Input"
                        value={
                          item.location_id === selectDev[0] ? item.i_s_Input : 0
                        }
                      />
                    );
                  }
                  return (
                    <div key={index}>
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
                        No device installed
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="w-full h-full md:w-1/2">
                {dataCurrent.map((item, index) => {
                  if (item.location_id === selectDev[0]) {
                    return (
                      <RadialDynamicGauge
                        id={"current-s-output"}
                        key={"s-output"}
                        alt={"S"}
                        title="Output"
                        value={
                          item.location_id === selectDev[0]
                            ? item.i_s_Output
                            : 0
                        }
                      />
                    );
                  }
                  return (
                    <div key={index}>
                      <span className="items-center hidden px-2 py-1 my-4 text-xs text-gray-800 bg-gray-100 rounded-full md:inline-flex gap-x-1 dark:bg-neutral-500/20 dark:text-neutral-400">
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
                        No device installed
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col px-5 py-3 text-center border-t border-gray-200 sm:flex-row sm:justify-between sm:items-center gap-y-1 sm:gap-y-0 gap-x-2 sm:text-start dark:border-neutral-700">
            <div>
              <span className="hidden md:inline-flex items-center gap-x-1.5 py-1 px-2.5 font-medium rounded-full  text-xs text-gray-500 dark:text-neutral-500">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-block w-full h-full rounded-full opacity-75 animate-ping shrink-0 bg-sky-400"></span>
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-sky-500"></span>
                </span>
                Updated every seconds
              </span>
            </div>
            <div>
              <label
                htmlFor="hs-pro-dupccn1"
                className="relative block w-auto px-3 py-2 text-sm font-medium text-center rounded-lg cursor-default sm:text-start focus:outline-none"
              >
                <span
                  className={`relative z-10 text-gray-800 peer-checked:hidden ${
                    channel == "Stable"
                      ? "dark:text-emerald-400"
                      : "dark:text-gray-500"
                  }`}
                >
                  {channel}
                </span>
              </label>
            </div>
          </div>
        </div>
        {/* Current T */}
        <div className="flex flex-col mb-2 bg-white border border-gray-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
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
              <div className="w-full h-full md:w-1/2">
                {dataCurrent.map((item, index) => {
                  if (item.location_id === selectDev[0]) {
                    return (
                      <RadialDynamicGauge
                        id={"current-t-input"}
                        key={"t-input"}
                        alt={"T"}
                        title="Input"
                        value={
                          item.location_id === selectDev[0] ? item.i_t_Input : 0
                        }
                      />
                    );
                  }
                  return (
                    <div key={index}>
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
                        No device installed
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="w-full h-full md:w-1/2">
                {dataCurrent.map((item, index) => {
                  if (item.location_id === selectDev[0]) {
                    return (
                      <RadialDynamicGauge
                        id={"current-t-output"}
                        key={"t-output"}
                        alt={"T"}
                        title="Output"
                        value={
                          item.location_id === selectDev[0]
                            ? item.i_t_Output
                            : 0
                        }
                      />
                    );
                  }
                  return (
                    <div key={index}>
                      <span className="items-center hidden px-2 py-1 my-4 text-xs text-gray-800 bg-gray-100 rounded-full md:inline-flex gap-x-1 dark:bg-neutral-500/20 dark:text-neutral-400">
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
                        No device installed
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col px-5 py-3 text-center border-t border-gray-200 sm:flex-row sm:justify-between sm:items-center gap-y-1 sm:gap-y-0 gap-x-2 sm:text-start dark:border-neutral-700">
            <div>
              <span className="hidden md:inline-flex items-center gap-x-1.5 py-1 px-2.5 font-medium rounded-full  text-xs text-gray-500 dark:text-neutral-500">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-block w-full h-full rounded-full opacity-75 animate-ping shrink-0 bg-sky-400"></span>
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-sky-500"></span>
                </span>
                Updated every seconds
              </span>
            </div>
            <div>
              <label
                htmlFor="hs-pro-dupccn1"
                className="relative block w-auto px-3 py-2 text-sm font-medium text-center rounded-lg cursor-default sm:text-start focus:outline-none"
              >
                <span
                  className={`relative z-10 text-gray-800 peer-checked:hidden ${
                    channel == "Stable"
                      ? "dark:text-emerald-400"
                      : "dark:text-gray-500"
                  }`}
                >
                  {channel}
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
