"use client";

import React from "react";
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
import Link from "next/link";
import { usePathname } from "next/navigation";

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
      className="hs-overlay [--auto-close:sm]
        hs-overlay-open:translate-x-0
        -translate-x-full transition-all duration-300 transform
        w-[260px] h-full
        hidden
        fixed inset-y-0 start-0 z-[60]
        bg-white border-e border-gray-200
        dark:bg-neutral-800 dark:border-neutral-700"
    >
      <div className="relative flex flex-col h-full max-h-full pt-0">
        {/* Sidebar Menu / Content */}
        <div className="mt-0 h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
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
                <li
                  className={`px-5 mb-1.5 hs-accordion ${
                    path === "/dashboard/" || path === "/dashboard/outline/"
                      ? "active"
                      : ""
                  }`}
                  id="dashboard-accordion"
                >
                  <button
                    type="button"
                    className={`${
                      path === "/dashboard/" || path === "/dashboard/outline/"
                        ? "dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    } flex w-full px-3 py-2 text-sm text-gray-800 rounded-lg hs-accordion-toggle hs-accordion-active:bg-gray-100 text-start gap-x-3 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:bg-neutral-700 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:focus:bg-neutral-700`}
                    aria-expanded={
                      path === "/dashboard/" || path === "/dashboard/outline/"
                        ? "true"
                        : "false"
                    }
                    aria-controls="dashboard-accordion-sub"
                  >
                    <Image
                      priority={true}
                      src={Home}
                      className="flex-shrink-0 size-4 xl:size-5"
                      width={24}
                      height={24}
                      alt="EMONS | Electrical Monitoring System"
                    ></Image>
                    Dashboard
                    <svg
                      className="hs-accordion-active:-rotate-180 shrink-0 mt-1 size-3.5 ms-auto transition"
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
                    id="dashboard-accordion-sub"
                    className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${
                      path === "/dashboard/" || path === "/dashboard/outline/"
                        ? ""
                        : "hidden"
                    }`}
                    role="region"
                    aria-labelledby="dashboard-accordion"
                  >
                    <ul
                      className="hs-accordion-group ps-7 mt-1.5 space-y-1.5 relative before:absolute before:top-0 before:start-[18px] before:w-0.5 before:h-full before:bg-gray-100 dark:before:bg-neutral-700"
                      data-hs-accordion-always-open={
                        path === "/dashboard/" || path === "/dashboard/outline/"
                          ? "true"
                          : "false"
                      }
                    >
                      <>
                        <Link
                          // onClick={(e) => e.preventDefault()}
                          data-hs-overlay="#hs-pro-sidebar"
                          aria-controls="hs-pro-sidebar"
                          aria-label="Toggle navigation"
                          className={`flex px-3 py-2 text-sm text-gray-800 bg-gray-100 items-center rounded-lg gap-x-3 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:focus:bg-neutral-700 
                    ${
                      path === "/dashboard/"
                        ? "active-link dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    }`}
                          href="/dashboard/"
                          prefetch={true}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-3 xl:size-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
                            />
                          </svg>
                          Map Info
                        </Link>
                        <Link
                          // onClick={(e) => e.preventDefault()}
                          data-hs-overlay="#hs-pro-sidebar"
                          aria-controls="hs-pro-sidebar"
                          aria-label="Toggle navigation"
                          className={`flex px-3 py-2 text-sm text-gray-800 bg-gray-100 items-center rounded-lg gap-x-3 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:focus:bg-neutral-700 
                    ${
                      path === "/dashboard/outline/"
                        ? "active-link dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    }`}
                          href="/dashboard/outline/"
                          prefetch={true}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-3 xl:size-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                            />
                          </svg>
                          Outline
                        </Link>
                      </>
                    </ul>
                  </div>
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
                    // onClick={(e) => e.preventDefault()}
                    data-hs-overlay="#hs-pro-sidebar"
                    aria-controls="hs-pro-sidebar"
                    aria-label="Toggle navigation"
                    href="/dashboard/voltage"
                    prefetch={true}
                  >
                    <Image
                      priority={true}
                      src={Voltage}
                      className="flex-shrink-0 mt-0.5 size-4 xl:size-5"
                      width={24}
                      height={24}
                      alt="EMONS | Electrical Monitoring System"
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
                    // onClick={(e) => e.preventDefault()}
                    data-hs-overlay="#hs-pro-sidebar"
                    aria-controls="hs-pro-sidebar"
                    aria-label="Toggle navigation"
                    href="/dashboard/current"
                    prefetch={true}
                  >
                    <Image
                      priority={true}
                      src={Current}
                      className="flex-shrink-0 mt-0.5 size-4 xl:size-5"
                      width={24}
                      height={24}
                      alt="EMONS | Electrical Monitoring System"
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
                    data-hs-overlay="#hs-pro-sidebar"
                    aria-controls="hs-pro-sidebar"
                    aria-label="Toggle navigation"
                    href="/dashboard/ground"
                    prefetch={true}
                  >
                    <Image
                      priority={true}
                      src={Ground}
                      className="flex-shrink-0 mt-0.5 size-4 xl:size-5"
                      width={24}
                      height={24}
                      alt="EMONS | Electrical Monitoring System"
                    ></Image>
                    Ground
                  </Link>
                </li>
                {/* Frequency */}
                <li className="px-5 mb-1.5">
                  <Link
                    className={`flex px-3 py-2 text-sm text-gray-800 bg-gray-100 rounded-lg gap-x-3 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:focus:bg-neutral-700 
                    ${
                      path === "/dashboard/frequency/"
                        ? "active-link dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    }`}
                    // onClick={(e) => e.preventDefault()}
                    data-hs-overlay="#hs-pro-sidebar"
                    aria-controls="hs-pro-sidebar"
                    aria-label="Toggle navigation"
                    href="/dashboard/frequency/"
                    prefetch={true}
                  >
                    <Image
                      priority={true}
                      src={Frequency}
                      className="flex-shrink-0 mt-0.5 size-4 xl:size-5"
                      width={24}
                      height={24}
                      alt="EMONS | Electrical Monitoring System"
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
                    // data-hs-overlay="#hs-pro-sidebar"
                    // aria-controls="hs-pro-sidebar"
                    aria-label="Toggle navigation"
                    onClick={(e) => e.preventDefault()}
                    href="/dashboard/temperature/"
                    // prefetch={true}
                  >
                    <Image
                      priority={true}
                      src={Temperature}
                      className="flex-shrink-0 mt-0.5 size-4 xl:size-5"
                      width={24}
                      height={24}
                      alt="EMONS | Electrical Monitoring System"
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
                    data-hs-overlay="#hs-pro-sidebar"
                    aria-controls="hs-pro-sidebar"
                    aria-label="Toggle navigation"
                    href="/dashboard/energy"
                    // onClick={(e) => e.preventDefault()}
                    prefetch={true}
                  >
                    <Image
                      priority={true}
                      src={Energy}
                      className="flex-shrink-0 mt-0.5 size-4 xl:size-5"
                      width={24}
                      height={24}
                      alt="EMONS | Electrical Monitoring System"
                    ></Image>
                    Energy
                  </Link>
                </li>
                {/* Power Factor */}
                <li className="px-5 mb-1.5">
                  <Link
                    className={`flex px-3 py-2 text-sm text-gray-800 bg-gray-100 rounded-lg gap-x-3 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:focus:bg-neutral-700 
                    ${
                      path === "/dashboard/pf/"
                        ? "active-link dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    }`}
                    data-hs-overlay="#hs-pro-sidebar"
                    aria-controls="hs-pro-sidebar"
                    aria-label="Toggle navigation"
                    // onClick={(e) => e.preventDefault()}
                    href="/dashboard/pf/"
                    prefetch={true}
                  >
                    <Image
                      priority={true}
                      src={PowerFactor}
                      className="flex-shrink-0 mt-0.5 size-4 xl:size-5"
                      width={24}
                      height={24}
                      alt="EMONS | Electrical Monitoring System"
                    ></Image>
                    Power Factor
                  </Link>
                </li>
                {/* THDv */}
                <li className="px-5 mb-1.5">
                  <Link
                    className={`flex px-3 py-2 text-sm text-gray-800 bg-gray-100 rounded-lg gap-x-3 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:focus:bg-neutral-700 
                    ${
                      path === "/dashboard/thdv/"
                        ? "active-link dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    }`}
                    data-hs-overlay="#hs-pro-sidebar"
                    aria-controls="hs-pro-sidebar"
                    aria-label="Toggle navigation"
                    // onClick={(e) => e.preventDefault()}
                    href="/dashboard/thdv/"
                    prefetch={true}
                  >
                    <Image
                      priority={true}
                      src={THDv}
                      className="flex-shrink-0 mt-0.5 size-4 xl:size-5"
                      width={24}
                      height={24}
                      alt="EMONS | Electrical Monitoring System"
                    ></Image>
                    THDv
                  </Link>
                </li>
                {/* THDi */}
                <li className="px-5 mb-1.5">
                  <Link
                    className={`flex px-3 py-2 text-sm text-gray-800 bg-gray-100 rounded-lg gap-x-3 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:focus:bg-neutral-700 
                    ${
                      path === "/dashboard/thdi/"
                        ? "active-link dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    }`}
                    data-hs-overlay="#hs-pro-sidebar"
                    aria-controls="hs-pro-sidebar"
                    aria-label="Toggle navigation"
                    // onClick={(e) => e.preventDefault()}
                    href="/dashboard/thdi/"
                    prefetch={true}
                  >
                    <Image
                      priority={true}
                      src={THDi}
                      className="flex-shrink-0 mt-0.5 size-4 xl:size-5"
                      width={24}
                      height={24}
                      alt="EMONS | Electrical Monitoring System"
                    ></Image>
                    THDi
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
                    data-hs-overlay="#hs-pro-sidebar"
                    aria-controls="hs-pro-sidebar"
                    aria-label="Toggle navigation"
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
                    data-hs-overlay="#hs-pro-sidebar"
                    aria-controls="hs-pro-sidebar"
                    aria-label="Toggle navigation"
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
                    data-hs-overlay="#hs-pro-sidebar"
                    aria-controls="hs-pro-sidebar"
                    aria-label="Toggle navigation"
                    onClick={(e) => e.preventDefault()}
                    href="/dashboard/sd-card-logger"
                    prefetch={true}
                  >
                    <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-6 dark:bg-blue-500">
                      <Image
                        priority={true}
                        src={SdCardLog}
                        className="flex-shrink-0 size-3"
                        width={24}
                        height={24}
                        alt="EMONS | Electrical Monitoring System"
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
        {/* Sidebar Close */}
        {/* <div className="absolute z-10 top-3 -end-3">
          
          <button
            type="button"
            className="inline-flex items-center justify-center w-6 text-sm font-medium text-gray-500 transition-all duration-300 ease-in-out bg-white border border-gray-200 rounded-md h-7 gap-x-2 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
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
        </div> */}
      </div>
    </aside>
  );
}
