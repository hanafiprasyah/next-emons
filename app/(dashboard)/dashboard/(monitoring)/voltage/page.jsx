"use client";

import React, { useState, useEffect, Suspense } from "react";
import PrelineScript from "@/components/PrelineScript";
import dynamic from "next/dynamic";
import Loader from "@/loading";
import Link from "next/link";

const RadialDynamicGauge = dynamic(() =>
  import("@/components/charts/VoltageRadialGauge")
);

export default function Voltage() {
  const [signal, setSignal] = useState(false);
  const [channel, setChannel] = useState("Connecting");
  const [dataLoc, setDataLoc] = useState([]);
  const [dataDev, setDataDev] = useState([]);
  const [selectLoc, setSelectLoc] = useState([]);
  const [showDev, isShowDev] = useState(false);
  const [selectDev, setSelectDev] = useState([]);

  // Function to fetch the /device/getdatavoltage API
  const fetchVoltage = async (
    tenant,
    locationid,
    lane,
    status,
    value,
    side,
    start_date,
    end_date
  ) => {
    const response = await fetch("/api/monitoring/voltage/getdata", {
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
        locationid: locationid ?? "",
        lane: lane ?? "",
        status: status ?? "",
        value: value ?? "",
        side: side ?? "",
        start_trancation_date: start_date ?? "",
        end_trancation_date: end_date ?? "",
        tenant: tenant ?? "",
      }),
    });

    return response.json();
  };

  useEffect(() => {
    // local item
    const currentUser = localStorage.getItem("tenant");

    fetchVoltage(
      currentUser,
      selectLoc.length === 0 ? 0 : selectLoc,
      "",
      "",
      "",
      "",
      "2023-08-01 00:49:04",
      "2024-08-01 00:49:04"
    ).then((data) => {
      if (process.env.NODE_ENV === "development") {
        console.log(data.voltage["data"]);
      }

      if (data.message == "OK") {
        // delay signal and channel status by 250ms after connection ready
        setTimeout(() => {
          setSignal(true);
          setChannel("Stable");
        }, 250);

        if (selectLoc.length != 0) {
          setDataDev(data.voltage["data"]);
        } else {
          setDataLoc(data.voltage["data"]);
        }
      } else {
        setSignal(false);
        setChannel("Unreachable");
      }
    });
  }, [selectLoc]);

  return (
    <div id="voltage-template" className="grid grid-cols-1 gap-4">
      <>
        {/* Page Heading */}
        <div className="px-2 pb-2 md:px-1 sm:pb-4">
          <div className="min-h-[34px] flex flex-wrap justify-between items-center gap-3">
            <div className="-ms-1">
              {/* Breadcrumb */}
              <ol className="flex items-center whitespace-nowrap">
                <li className="flex items-center">
                  <Link
                    className="py-0.5 px-1.5 flex items-center gap-x-1 text-sm rounded-md gray=='true'){text-gray-600 hover:bg-gray-100 focus:bg-gray-100}text-stone-600 hover:bg-stone-100 focus:bg-stone-100 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                    href="/dashboard"
                    prefetch={true}
                  >
                    <span className="flex items-center justify-center -mx-1 shrink-0 size-5">
                      <svg
                        className="shrink-0 size-4"
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
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                      <span className="sr-only">Home</span>
                    </span>
                  </Link>
                  <svg
                    className="overflow-visible shrink-0 size-4 text-stone-400 dark:text-neutral-600"
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 13L10 3"
                      stroke="currentColor"
                      strokeLinecap="round"
                    />
                  </svg>
                </li>
                <li className="flex items-center">
                  <Link
                    className="py-0.5 px-1.5 flex items-center gap-x-1 text-sm rounded-md gray=='true'){text-gray-600 hover:bg-gray-100 focus:bg-gray-100}text-stone-600 hover:bg-stone-100 focus:bg-stone-100 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                    href="/dashboard/voltage"
                    prefetch={false}
                  >
                    Voltage
                  </Link>
                  <svg
                    className="overflow-visible shrink-0 size-4 text-stone-400 dark:text-neutral-600"
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 13L10 3"
                      stroke="currentColor"
                      strokeLinecap="round"
                    />
                  </svg>
                </li>
                <li className="flex items-center">
                  <a
                    className="py-0.5 px-1.5 pointer-events-none flex items-center gap-x-1 text-sm rounded-md gray=='true'){text-gray-600 hover:bg-gray-100 focus:bg-gray-100}text-stone-600 hover:bg-stone-100 focus:bg-stone-100 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                    href=""
                    onClick={(e) => e.preventDefault()}
                  >
                    Overview
                  </a>
                </li>
              </ol>
              {/* End Breadcrumb */}
            </div>
          </div>
          <h4 className="pt-2 pb-2 text-4xl font-semibold text-gray-800 md:pb-4 md:pt-2 dark:text-neutral-200">
            Voltage
          </h4>
          <div className="-ms-[5px] flex justify-between items-center gap-1 sm:gap-2">
            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
              {/* Location */}
              <div className="relative inline-block">
                {/* Select the location, then the device list will enable to select */}
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
                        ? selectLoc
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
                          dataLoc.findIndex(
                            (item) => item.location_id === obj.location_id
                          ) === index
                      )
                      .map((item, index) => (
                        <a
                          key={index}
                          className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-800/80 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                          href=""
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectLoc(item.location_id);
                            isShowDev(true);
                            setSelectDev([]);
                          }}
                        >
                          <span className="inline-flex text-sm text-white">
                            {item.location_id}
                          </span>
                          <span className="inline-flex text-xs text-gray-400">
                            {selectLoc === item.location_id ? "Selected" : ""}
                          </span>
                        </a>
                      ))}
                  </div>
                </div>
              </div>
              {/* End Location */}
              {/* Device */}
              <div className="relative ps-0.5 sm:ps-2 before:block before:absolute before:top-1/2 before:-start-px before:w-px before:h-4 before:bg-gray-300 before:-translate-y-1/2 dark:before:bg-neutral-700">
                {/* Select the device after user has choosen location, disable this button if user not selected the location as a first step */}
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
                        ? selectDev
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
                          setSelectDev(item.id);
                        }}
                      >
                        <span className="inline-flex text-sm text-white">
                          {item.id}
                        </span>
                        <span className="inline-flex text-xs text-gray-400">
                          {selectDev === item.id ? "Selected" : ""}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              {/* End Device */}
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
                isShowDev(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="shrink-0 size-3.5"
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

        {selectLoc.length != 0 ? (
          selectDev.length != 0 ? (
            // Voltage gauge list
            <>
              {/* R-N */}
              <div className="flex flex-col bg-white border border-gray-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
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

                  <div className="shrink-0 relative text-center size-11 w-full md:w-[90px] md:h-[62px] mx-auto">
                    <h2 className="text-2xl">R to N</h2>
                  </div>
                </div>

                {/* Body */}
                <div className="p-3 pt-0 text-center md:px-5 md:pb-5">
                  <div className="flex flex-wrap items-center justify-center md:justify-evenly">
                    <div className="w-full h-full md:w-1/2">
                      {dataDev.map((item, index) => {
                        if (item.id === selectDev) {
                          return (
                            <RadialDynamicGauge
                              id={"voltage-rn-input"}
                              key={"rn-input"}
                              alt={"R-N"}
                              title="Input"
                              value={item.v_rn_input}
                            />
                          );
                        }
                        return null;
                      })}
                    </div>
                    <div className="w-full h-full md:w-1/2">
                      {dataDev.map((item, index) => {
                        if (item.id === selectDev) {
                          return (
                            <RadialDynamicGauge
                              id={"voltage-rn-output"}
                              key={"rn-output"}
                              alt={"R-N"}
                              title="Output"
                              value={item.v_rn_output}
                            />
                          );
                        }
                        return null;
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
                      Updated every 5 seconds
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
              {/* S-N */}
              <div className="flex flex-col bg-white border border-gray-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
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

                  <div className="shrink-0 relative text-center size-11 w-full md:w-[90px] md:h-[62px] mx-auto">
                    <h2 className="text-2xl">S to N</h2>
                  </div>
                </div>

                {/* Body */}
                <div className="p-3 pt-0 text-center md:px-5 md:pb-5">
                  <div className="flex flex-wrap items-center justify-center md:justify-evenly">
                    <div className="w-full h-full md:w-1/2">
                      {dataDev.map((item, index) => {
                        if (item.id === selectDev) {
                          return (
                            <RadialDynamicGauge
                              id={"voltage-sn-input"}
                              key={"sn-input"}
                              alt={"S-N"}
                              title="Input"
                              value={item.v_sn_input}
                            />
                          );
                        }
                        return null;
                      })}
                    </div>
                    <div className="w-full h-full md:w-1/2">
                      {dataDev.map((item, index) => {
                        if (item.id === selectDev) {
                          return (
                            <RadialDynamicGauge
                              id={"voltage-sn-output"}
                              key={"sn-output"}
                              alt={"S-N"}
                              title="Output"
                              value={item.v_sn_output}
                            />
                          );
                        }
                        return null;
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
                      Updated every 5 seconds
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
              {/* T-N */}
              <div className="flex flex-col bg-white border border-gray-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
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

                  <div className="shrink-0 relative text-center size-11 w-full md:w-[90px] md:h-[62px] mx-auto">
                    <h2 className="text-2xl">T to N</h2>
                  </div>
                </div>

                {/* Body */}
                <div className="p-3 pt-0 text-center md:px-5 md:pb-5">
                  <div className="flex flex-wrap items-center justify-center md:justify-evenly">
                    <div className="w-full h-full md:w-1/2">
                      {dataDev.map((item, index) => {
                        if (item.id === selectDev) {
                          return (
                            <RadialDynamicGauge
                              id={"voltage-tn-input"}
                              key={"tn-input"}
                              alt={"T-N"}
                              title="Input"
                              value={item.v_tn_input}
                            />
                          );
                        }
                        return null;
                      })}
                    </div>
                    <div className="w-full h-full md:w-1/2">
                      {dataDev.map((item, index) => {
                        if (item.id === selectDev) {
                          return (
                            <RadialDynamicGauge
                              id={"voltage-tn-output"}
                              key={"tn-output"}
                              alt={"T-N"}
                              title="Output"
                              value={item.v_tn_output}
                            />
                          );
                        }
                        return null;
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
                      Updated every 5 seconds
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
              {/* R-S */}
              <div className="flex flex-col bg-white border border-gray-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
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

                  <div className="shrink-0 relative text-center size-11 w-full md:w-[90px] md:h-[62px] mx-auto">
                    <h2 className="text-2xl">R to S</h2>
                  </div>
                </div>

                {/* Body */}
                <div className="p-3 pt-0 text-center md:px-5 md:pb-5">
                  <div className="flex flex-wrap items-center justify-center md:justify-evenly">
                    <div className="w-full h-full md:w-1/2">
                      {dataDev.map((item, index) => {
                        if (item.id === selectDev) {
                          return (
                            <RadialDynamicGauge
                              id={"voltage-rs-input"}
                              key={"rs-input"}
                              alt={"R-S"}
                              title="Input"
                              value={item.v_rs_input}
                            />
                          );
                        }
                        return null;
                      })}
                    </div>
                    <div className="w-full h-full md:w-1/2">
                      {dataDev.map((item, index) => {
                        if (item.id === selectDev) {
                          return (
                            <RadialDynamicGauge
                              id={"voltage-rs-output"}
                              key={"rs-output"}
                              alt={"R-S"}
                              title="Output"
                              value={item.v_rs_output}
                            />
                          );
                        }
                        return null;
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
                      Updated every 5 seconds
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
              {/* S-T */}
              <div className="flex flex-col bg-white border border-gray-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
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

                  <div className="shrink-0 relative text-center size-11 w-full md:w-[90px] md:h-[62px] mx-auto">
                    <h2 className="text-2xl">S to T</h2>
                  </div>
                </div>

                {/* Body */}
                <div className="p-3 pt-0 text-center md:px-5 md:pb-5">
                  <div className="flex flex-wrap items-center justify-center md:justify-evenly">
                    <div className="w-full h-full md:w-1/2">
                      {dataDev.map((item, index) => {
                        if (item.id === selectDev) {
                          return (
                            <RadialDynamicGauge
                              id={"voltage-st-input"}
                              key={"st-input"}
                              alt={"S-T"}
                              title="Input"
                              value={item.v_st_input}
                            />
                          );
                        }
                        return null;
                      })}
                    </div>
                    <div className="w-full h-full md:w-1/2">
                      {dataDev.map((item, index) => {
                        if (item.id === selectDev) {
                          return (
                            <RadialDynamicGauge
                              id={"voltage-st-output"}
                              key={"st-output"}
                              alt={"S-T"}
                              title="Output"
                              value={item.v_st_output}
                            />
                          );
                        }
                        return null;
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
                      Updated every 5 seconds
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
              {/* R-T */}
              <div className="flex flex-col bg-white border border-gray-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
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

                  <div className="shrink-0 relative text-center size-11 w-full md:w-[90px] md:h-[62px] mx-auto">
                    <h2 className="text-2xl">R to T</h2>
                  </div>
                </div>

                {/* Body */}
                <div className="p-3 pt-0 text-center md:px-5 md:pb-5">
                  <div className="flex flex-wrap items-center justify-center md:justify-evenly">
                    <div className="w-full h-full md:w-1/2">
                      {dataDev.map((item, index) => {
                        if (item.id === selectDev) {
                          return (
                            <RadialDynamicGauge
                              id={"voltage-rt-input"}
                              key={"rt-input"}
                              alt={"R-T"}
                              title="Input"
                              value={item.v_rt_input}
                            />
                          );
                        }
                        return null;
                      })}
                    </div>
                    <div className="w-full h-full md:w-1/2">
                      {dataDev.map((item, index) => {
                        if (item.id === selectDev) {
                          return (
                            <RadialDynamicGauge
                              id={"voltage-rt-output"}
                              key={"rt-output"}
                              alt={"R-T"}
                              title="Output"
                              value={item.v_rt_output}
                            />
                          );
                        }
                        return null;
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
                      Updated every 5 seconds
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
          ) : (
            <div className="flex flex-col items-center justify-center p-5 text-center min-h-96">
              <svg
                className="w-48 mx-auto mb-4"
                width={178}
                height={90}
                viewBox="0 0 178 90"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x={27}
                  y="50.5"
                  width={124}
                  height={39}
                  rx="7.5"
                  fill="currentColor"
                  className="fill-white dark:fill-neutral-800"
                />
                <rect
                  x={27}
                  y="50.5"
                  width={124}
                  height={39}
                  rx="7.5"
                  stroke="currentColor"
                  className="stroke-gray-50 dark:stroke-neutral-700/10"
                />
                <rect
                  x="34.5"
                  y={58}
                  width={24}
                  height={24}
                  rx={4}
                  fill="currentColor"
                  className="fill-gray-50 dark:fill-neutral-700/30"
                />
                <rect
                  x="66.5"
                  y={61}
                  width={60}
                  height={6}
                  rx={3}
                  fill="currentColor"
                  className="fill-gray-50 dark:fill-neutral-700/30"
                />
                <rect
                  x="66.5"
                  y={73}
                  width={77}
                  height={6}
                  rx={3}
                  fill="currentColor"
                  className="fill-gray-50 dark:fill-neutral-700/30"
                />
                <rect
                  x="19.5"
                  y="28.5"
                  width={139}
                  height={39}
                  rx="7.5"
                  fill="currentColor"
                  className="fill-white dark:fill-neutral-800"
                />
                <rect
                  x="19.5"
                  y="28.5"
                  width={139}
                  height={39}
                  rx="7.5"
                  stroke="currentColor"
                  className="stroke-gray-100 dark:stroke-neutral-700/30"
                />
                <rect
                  x={27}
                  y={36}
                  width={24}
                  height={24}
                  rx={4}
                  fill="currentColor"
                  className="fill-gray-100 dark:fill-neutral-700/70"
                />
                <rect
                  x={59}
                  y={39}
                  width={60}
                  height={6}
                  rx={3}
                  fill="currentColor"
                  className="fill-gray-100 dark:fill-neutral-700/70"
                />
                <rect
                  x={59}
                  y={51}
                  width={92}
                  height={6}
                  rx={3}
                  fill="currentColor"
                  className="fill-gray-100 dark:fill-neutral-700/70"
                />
                <g filter="url(#filter19)">
                  <rect
                    x={12}
                    y={6}
                    width={154}
                    height={40}
                    rx={8}
                    fill="currentColor"
                    className="fill-white dark:fill-neutral-800"
                    shapeRendering="crispEdges"
                  />
                  <rect
                    x="12.5"
                    y="6.5"
                    width={153}
                    height={39}
                    rx="7.5"
                    stroke="currentColor"
                    className="stroke-gray-100 dark:stroke-neutral-700/60"
                    shapeRendering="crispEdges"
                  />
                  <rect
                    x={20}
                    y={14}
                    width={24}
                    height={24}
                    rx={4}
                    fill="currentColor"
                    className="fill-gray-200 dark:fill-neutral-700 "
                  />
                  <rect
                    x={52}
                    y={17}
                    width={60}
                    height={6}
                    rx={3}
                    fill="currentColor"
                    className="fill-gray-200 dark:fill-neutral-700"
                  />
                  <rect
                    x={52}
                    y={29}
                    width={106}
                    height={6}
                    rx={3}
                    fill="currentColor"
                    className="fill-gray-200 dark:fill-neutral-700"
                  />
                </g>
                <defs>
                  <filter
                    id="filter19"
                    x={0}
                    y={0}
                    width={178}
                    height={64}
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy={6} />
                    <feGaussianBlur stdDeviation={6} />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_1187_14810"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_1187_14810"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
              <div className="max-w-sm mx-auto">
                <p className="mt-2 font-medium text-gray-800 dark:text-neutral-200">
                  No device selected
                </p>
                <p className="mb-5 text-sm text-gray-500 dark:text-neutral-500">
                  Please select which device you prefer to see the details.
                </p>
              </div>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center p-5 text-center min-h-96">
            <svg
              className="w-48 mx-auto mb-4"
              width={178}
              height={90}
              viewBox="0 0 178 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x={27}
                y="50.5"
                width={124}
                height={39}
                rx="7.5"
                fill="currentColor"
                className="fill-white dark:fill-neutral-800"
              />
              <rect
                x={27}
                y="50.5"
                width={124}
                height={39}
                rx="7.5"
                stroke="currentColor"
                className="stroke-gray-50 dark:stroke-neutral-700/10"
              />
              <rect
                x="34.5"
                y={58}
                width={24}
                height={24}
                rx={4}
                fill="currentColor"
                className="fill-gray-50 dark:fill-neutral-700/30"
              />
              <rect
                x="66.5"
                y={61}
                width={60}
                height={6}
                rx={3}
                fill="currentColor"
                className="fill-gray-50 dark:fill-neutral-700/30"
              />
              <rect
                x="66.5"
                y={73}
                width={77}
                height={6}
                rx={3}
                fill="currentColor"
                className="fill-gray-50 dark:fill-neutral-700/30"
              />
              <rect
                x="19.5"
                y="28.5"
                width={139}
                height={39}
                rx="7.5"
                fill="currentColor"
                className="fill-white dark:fill-neutral-800"
              />
              <rect
                x="19.5"
                y="28.5"
                width={139}
                height={39}
                rx="7.5"
                stroke="currentColor"
                className="stroke-gray-100 dark:stroke-neutral-700/30"
              />
              <rect
                x={27}
                y={36}
                width={24}
                height={24}
                rx={4}
                fill="currentColor"
                className="fill-gray-100 dark:fill-neutral-700/70"
              />
              <rect
                x={59}
                y={39}
                width={60}
                height={6}
                rx={3}
                fill="currentColor"
                className="fill-gray-100 dark:fill-neutral-700/70"
              />
              <rect
                x={59}
                y={51}
                width={92}
                height={6}
                rx={3}
                fill="currentColor"
                className="fill-gray-100 dark:fill-neutral-700/70"
              />
              <g filter="url(#filter19)">
                <rect
                  x={12}
                  y={6}
                  width={154}
                  height={40}
                  rx={8}
                  fill="currentColor"
                  className="fill-white dark:fill-neutral-800"
                  shapeRendering="crispEdges"
                />
                <rect
                  x="12.5"
                  y="6.5"
                  width={153}
                  height={39}
                  rx="7.5"
                  stroke="currentColor"
                  className="stroke-gray-100 dark:stroke-neutral-700/60"
                  shapeRendering="crispEdges"
                />
                <rect
                  x={20}
                  y={14}
                  width={24}
                  height={24}
                  rx={4}
                  fill="currentColor"
                  className="fill-gray-200 dark:fill-neutral-700 "
                />
                <rect
                  x={52}
                  y={17}
                  width={60}
                  height={6}
                  rx={3}
                  fill="currentColor"
                  className="fill-gray-200 dark:fill-neutral-700"
                />
                <rect
                  x={52}
                  y={29}
                  width={106}
                  height={6}
                  rx={3}
                  fill="currentColor"
                  className="fill-gray-200 dark:fill-neutral-700"
                />
              </g>
              <defs>
                <filter
                  id="filter19"
                  x={0}
                  y={0}
                  width={178}
                  height={64}
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy={6} />
                  <feGaussianBlur stdDeviation={6} />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_1187_14810"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_1187_14810"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
            <div className="max-w-sm mx-auto">
              <p className="mt-2 font-medium text-gray-800 dark:text-neutral-200">
                No location selected
              </p>
              <p className="mb-5 text-sm text-gray-500 dark:text-neutral-500">
                Please select which location you prefer to see the details.
              </p>
            </div>
          </div>
        )}
      </>

      <PrelineScript />
    </div>
  );
}
