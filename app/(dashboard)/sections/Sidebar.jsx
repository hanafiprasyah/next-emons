"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import {
  Home,
  Voltage,
  Current,
  Ground,
  Frequency,
  Temperature,
  Energy,
  PowerFactor,
  THDv,
  THDi,
  SdCardLog,
} from "../../../public/icons";
import Image from "next/image";

export default function DashboardSidebar() {
  /**
   * Here we use the pathName method to
   * checking the active links
   * if usePathname() == current url, then make it active
   * Lets see on line 161 below
   */
  const path = usePathname();

  return (
    /**
     * This jsx will heading you on the sidebar menu list
     * Do not forget to use React.Fragment or <> to improve DOM loading performance
     */
    <aside
      id="hs-pro-sidebar"
      className="hs-overlay [--auto-close:lg]
        hs-overlay-open:translate-x-0
        -translate-x-full transition-all duration-300 transform
        w-[260px] h-full
        hidden
        fixed inset-y-0 start-0 z-[60]
        bg-white border-e border-gray-200
        lg:block lg:translate-x-0 lg:end-auto lg:bottom-0
        dark:bg-neutral-800 dark:border-neutral-700"
    >
      <div className="relative flex flex-col h-full max-h-full pt-0">
        {/* <header className="border-b border-gray-200 dark:border-neutral-700"> */}
        {/**
         * Appear at the top of the sidebar, makes device list more functional to give users some information about their device health score
         * Using dialog and static API for development only
         */}
        {/* Devices */}
        {/* <div className="px-7">
          <div className="hs-dropdown [--auto-close:inside] relative flex">
            <button
              id="hs-pro-dnwpd"
              type="button"
              className="inline-flex items-center w-full py-3 text-gray-800 align-middle group text-start disabled:opacity-50 disabled:pointer-events-none focus:outline-none dark:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="flex-shrink-0 size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5h3m-6.75 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-15a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 4.5v15a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
              <span className="block ms-3">
                <span className="block text-sm font-medium text-gray-800 group-hover:text-blue-600 group-focus-hover:text-blue-600 dark:text-neutral-200 dark:group-hover:text-blue-600 dark:group-focus-hover:text-blue-600">
                  Device Information
                </span>
                <span className="block text-xs text-gray-500 dark:text-neutral-500">
                  Select your device
                </span>
              </span>
              <svg
                className="flex-shrink-0 size-3.5 ms-auto"
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
                <path d="m7 15 5 5 5-5" />
                <path d="m7 9 5-5 5 5" />
              </svg>
            </button>

            <div
              className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-60 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-900"
              aria-labelledby="hs-pro-dnwpd"
            >
              <div className="p-1 space-y-0.5">
                {deviceList.map((data, index) => (
                  <button
                    key={index}
                    id={data.id}
                    className="block w-full px-3 py-2 rounded-lg text-start hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                    type="button"
                    data-hs-overlay={`#${data.slogan}`}
                  >
                    <div className="flex gap-x-2">
                      <div className="self-center">
                        <svg
                          className="flex-shrink-0 text-gray-500 size-5 dark:text-neutral-500"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                        </svg>
                      </div>

                      <div className="grow">
                        <p className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                          {data.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-neutral-500">
                          {data.location}
                        </p>
                      </div>
                      <div className="self-center ms-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="flex-shrink-0 text-green-800 size-4 dark:text-sky-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-1 border-t border-gray-200 dark:border-neutral-800">
                <div className="flex items-center w-full px-3 py-2 text-xs text-green-800 rounded-lg gap-x-3 hover:bg-gray-100 disabled:opacity-50 focus:outline-none focus:bg-gray-100 dark:text-green-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                  Stable Channel
                  <span className="text-xs text-gray-500 ms-auto dark:text-neutral-500">
                    info@wise.co.id
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* </header> */}

        {/* Sidebar Menu / Content */}
        <div className="mt-0 h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
          {/* Navigation List */}
          <nav
            className="flex flex-col flex-wrap w-full pt-6 pb-3 hs-accordion-group"
            data-hs-accordion-always-open={false}
          >
            <ul>
              <>
                {/* Divider */}
                <li className="px-8 pt-5 mb-2 border-t border-gray-200 first:border-transparent first:pt-0 dark:border-neutral-700 dark:first:border-transparent">
                  <span className="block text-xs text-gray-500 uppercase dark:text-neutral-500">
                    Main Menu
                  </span>
                </li>
                {/* Dashboard */}
                <li className="px-5 mb-1.5">
                  <Link
                    className={`flex px-3 py-2 text-sm text-gray-800 bg-gray-100 items-center rounded-lg gap-x-3 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:focus:bg-neutral-700 
                    ${
                      path === "/dashboard/"
                        ? "active-link dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    }`}
                    href="/dashboard"
                    prefetch={true}
                  >
                    <Image
                      src={Home}
                      className="flex-shrink-0 size-4"
                      width={24}
                      height={24}
                      alt="EMONS"
                    ></Image>
                    Dashboard
                  </Link>
                </li>

                {/* Divider */}
                <li className="px-8 pt-5 mt-5 mb-2 border-t border-gray-200 first:border-transparent first:pt-0 dark:border-neutral-700 dark:first:border-transparent">
                  <span className="block text-xs text-gray-500 uppercase dark:text-neutral-500">
                    Monitoring
                  </span>
                </li>
                {/**
                 * MONITORING MENU
                 * This menu will control all of the realtime data from database using API transaction and channeling
                 * Using gauge and realtime chart
                 * Also read a realtime fetch for NextJS!
                 */}
                {/* Voltage */}
                <li className="px-5 mb-1.5">
                  <Link
                    className={`flex px-3 py-2 text-sm text-gray-800 bg-gray-100 rounded-lg gap-x-3 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:focus:bg-neutral-700 
                    ${
                      path === "/dashboard/voltage/"
                        ? "active-link dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    }`}
                    href="/dashboard/voltage"
                    prefetch={true}
                  >
                    <Image
                      src={Voltage}
                      className="flex-shrink-0 mt-0.5 size-4"
                      width={24}
                      height={24}
                      alt="EMONS"
                    ></Image>
                    Voltage
                  </Link>
                </li>
                {/* Current */}
                <li className="px-5 mb-1.5">
                  <Link
                    className={`flex px-3 py-2 text-sm text-gray-800 bg-gray-100 rounded-lg gap-x-3 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:focus:bg-neutral-700 
                    ${
                      path === "/dashboard/current/"
                        ? "active-link dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    }`}
                    href="/dashboard/current"
                    prefetch={true}
                  >
                    <Image
                      src={Current}
                      className="flex-shrink-0 mt-0.5 size-4"
                      width={24}
                      height={24}
                      alt="EMONS"
                    ></Image>
                    Current
                  </Link>
                </li>
                {/* Ground */}
                <li className="px-5 mb-1.5">
                  <Link
                    className={`flex px-3 py-2 text-sm text-gray-800 bg-gray-100 rounded-lg gap-x-3 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:focus:bg-neutral-700 
                    ${
                      path === "/dashboard/ground/"
                        ? "active-link dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    }`}
                    href="/dashboard/ground"
                    prefetch={true}
                  >
                    <Image
                      src={Ground}
                      className="flex-shrink-0 mt-0.5 size-4"
                      width={24}
                      height={24}
                      alt="EMONS"
                    ></Image>
                    Ground
                  </Link>
                </li>
                {/* Frequency */}
                <li className="px-5 mb-1.5">
                  <Link
                    className={`flex px-3 py-2 text-sm text-gray-800 bg-gray-100 rounded-lg gap-x-3 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:focus:bg-neutral-700 
                    ${
                      path === "/dashboard/frequency"
                        ? "active-link dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    }`}
                    // onClick={(e) => e.preventDefault()}
                    href="/dashboard/frequency/"
                    prefetch={true}
                  >
                    <Image
                      src={Frequency}
                      className="flex-shrink-0 mt-0.5 size-4"
                      width={24}
                      height={24}
                      alt="EMONS"
                    ></Image>
                    Frequency
                  </Link>
                </li>
                {/* Temperature */}
                <li className="px-5 mb-1.5">
                  <Link
                    className={`flex px-3 py-2 text-sm cursor-not-allowed text-gray-800 bg-gray-100 rounded-lg gap-x-3 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:focus:bg-neutral-700 
                    ${
                      path === "/dashboard/temperature"
                        ? "active-link dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    }`}
                    onClick={(e) => e.preventDefault()}
                    href="/dashboard/temperature/"
                    prefetch={true}
                  >
                    <Image
                      src={Temperature}
                      className="flex-shrink-0 mt-0.5 size-4"
                      width={24}
                      height={24}
                      alt="EMONS"
                    ></Image>
                    Temperature
                    <span className="inline-flex items-center gap-x-0.5 py-0 px-1.5 rounded-lg text-[9px] font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-800/30 dark:text-indigo-500">
                      Soon
                    </span>
                  </Link>
                </li>
                {/* Energy */}
                <li className="px-5 mb-1.5">
                  <Link
                    className={`flex px-3 py-2 text-sm text-gray-800 bg-gray-100 rounded-lg gap-x-3 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:focus:bg-neutral-700 
                    ${
                      path === "/dashboard/energy/"
                        ? "active-link dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    }`}
                    href="/dashboard/energy"
                    // onClick={(e) => e.preventDefault()}
                    prefetch={true}
                  >
                    <Image
                      src={Energy}
                      className="flex-shrink-0 mt-0.5 size-4"
                      width={24}
                      height={24}
                      alt="EMONS"
                    ></Image>
                    Energy
                  </Link>
                </li>
                {/* Power Factor */}
                <li className="px-5 mb-1.5">
                  <Link
                    className={`flex px-3 py-2 text-sm cursor-not-allowed text-gray-800 bg-gray-100 rounded-lg gap-x-3 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:focus:bg-neutral-700 
                    ${
                      path === "/dashboard/pf"
                        ? "active-link dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    }`}
                    onClick={(e) => e.preventDefault()}
                    href="/dashboard/pf/"
                    prefetch={true}
                  >
                    <Image
                      src={PowerFactor}
                      className="flex-shrink-0 mt-0.5 size-4"
                      width={24}
                      height={24}
                      alt="EMONS"
                    ></Image>
                    Power Factor
                    <span className="inline-flex items-center gap-x-0.5 py-0 px-1.5 rounded-lg text-[9px] font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-800/30 dark:text-indigo-500">
                      Soon
                    </span>
                  </Link>
                </li>
                {/* THDv */}
                <li className="px-5 mb-1.5">
                  <Link
                    className={`flex px-3 py-2 text-sm cursor-not-allowed text-gray-800 bg-gray-100 rounded-lg gap-x-3 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:focus:bg-neutral-700 
                    ${
                      path === "/dashboard/thdv"
                        ? "active-link dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    }`}
                    onClick={(e) => e.preventDefault()}
                    href="/dashboard/thdv/"
                    prefetch={true}
                  >
                    <Image
                      src={THDv}
                      className="flex-shrink-0 mt-0.5 size-4"
                      width={24}
                      height={24}
                      alt="EMONS"
                    ></Image>
                    THDv
                    <span className="inline-flex items-center gap-x-0.5 py-0 px-1.5 rounded-lg text-[9px] font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-800/30 dark:text-indigo-500">
                      Soon
                    </span>
                  </Link>
                </li>
                {/* THDi */}
                <li className="px-5 mb-1.5">
                  <Link
                    className={`flex px-3 py-2 text-sm cursor-not-allowed text-gray-800 bg-gray-100 rounded-lg gap-x-3 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:focus:bg-neutral-700 
                    ${
                      path === "/dashboard/thdi"
                        ? "active-link dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    }`}
                    onClick={(e) => e.preventDefault()}
                    href="/dashboard/thdi/"
                    prefetch={true}
                  >
                    <Image
                      src={THDi}
                      className="flex-shrink-0 mt-0.5 size-4"
                      width={24}
                      height={24}
                      alt="EMONS"
                    ></Image>
                    THDi
                    <span className="inline-flex items-center gap-x-0.5 py-0 px-1.5 rounded-lg text-[9px] font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-800/30 dark:text-indigo-500">
                      Soon
                    </span>
                  </Link>
                </li>

                {/* Divider */}
                <li className="px-8 pt-5 mt-5 mb-2 border-t border-gray-200 first:border-transparent first:pt-0 dark:border-neutral-700 dark:first:border-transparent">
                  <span className="block text-xs text-gray-500 uppercase dark:text-neutral-500">
                    Report & Logger
                  </span>
                </li>

                {/**
                 * LOGGER MENU
                 * This menu will control all of the log data from database using API transaction
                 * Using tables and realtime row fetch
                 * Also read a pagination concept for NextJS!
                 */}
                {/* Alarm Log */}
                <li className="px-5 mb-0.5">
                  <Link
                    className={`flex items-center px-3 py-2 text-sm bg-gray-100 text-gray-800 rounded-lg gap-x-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:focus:bg-neutral-700 ${
                      path === "/dashboard/alarm-logger/"
                        ? "active-link dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    }`}
                    href="/dashboard/alarm-logger"
                    prefetch={true}
                  >
                    <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-6 dark:bg-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="flex-shrink-0 size-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                        />
                      </svg>
                    </span>
                    Alarm Log
                  </Link>
                </li>
                {/* Database Log */}
                <li className="px-5 mb-0.5">
                  <Link
                    className={`flex items-center px-3 py-2 cursor-not-allowed text-sm bg-gray-100 text-gray-800 rounded-lg gap-x-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:focus:bg-neutral-700 ${
                      path === "/dashboard/database-logger/"
                        ? "active-link dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    }`}
                    onClick={(e) => e.preventDefault()}
                    href="/dashboard/database-logger"
                    prefetch={true}
                  >
                    <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-6 dark:bg-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="flex-shrink-0 size-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                        />
                      </svg>
                    </span>
                    Database Log
                    <span className="inline-flex items-center gap-x-0.5 py-0 px-1.5 rounded-lg text-[9px] font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-800/30 dark:text-indigo-500">
                      Soon
                    </span>
                  </Link>
                </li>
                {/* SD Card Log */}
                <li className="px-5 mb-0.5">
                  <Link
                    className={`flex items-center px-3 py-2 text-sm cursor-not-allowed bg-gray-100 text-gray-800 rounded-lg gap-x-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:focus:bg-neutral-700 ${
                      path === "/dashboard/sd-card-logger/"
                        ? "active-link dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    }`}
                    onClick={(e) => e.preventDefault()}
                    href="/dashboard/sd-card-logger"
                    prefetch={true}
                  >
                    <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-6 dark:bg-blue-500">
                      <Image
                        src={SdCardLog}
                        className="flex-shrink-0 size-3"
                        width={24}
                        height={24}
                        alt="EMONS"
                      ></Image>
                    </span>
                    SD Card Log
                    <span className="inline-flex items-center gap-x-0.5 py-0 px-1.5 rounded-lg text-[9px] font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-800/30 dark:text-indigo-500">
                      Soon
                    </span>
                  </Link>
                </li>
              </>
            </ul>
          </nav>
        </div>

        {/**
         * Here the sidebar close button
         * It will appears when user open this website on Mobile Viewport
         */}
        <div className="absolute z-10 lg:hidden top-3 -end-3">
          {/* Sidebar Close */}
          <button
            type="button"
            className="inline-flex items-center justify-center w-6 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-md h-7 gap-x-2 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            data-hs-overlay="#hs-pro-sidebar"
            aria-controls="hs-pro-sidebar"
            aria-label="Toggle navigation"
          >
            <svg
              className="flex-shrink-0 size-4"
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
              <polyline points="7 8 3 12 7 16" />
              <line x1="21" x2="11" y1="12" y2="12" />
              <line x1="21" x2="11" y1="6" y2="6" />
              <line x1="21" x2="11" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
