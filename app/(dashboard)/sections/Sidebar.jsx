"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import deviceList from "../../lib/api/device-api";

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
      <div className="relative flex flex-col h-full max-h-full pt-3">
        <header className="border-b border-gray-200 dark:border-neutral-700">
          {/**
           * Appear at the top of the sidebar, makes device list more functional to give users some information about their device health score
           * Using dialog and static API for development only
           */}
          {/* Devices */}
          <div className="px-7">
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

              {/* List */}
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

                        {/* Name */}
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

                {/* Footer */}
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
          </div>
        </header>

        {/* Sidebar Menu / Content */}
        <div className="mt-1.5 h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
          {/* Navigation List */}
          <nav
            className="flex flex-col flex-wrap w-full pt-3 pb-3 hs-accordion-group"
            data-hs-accordion-always-open
          >
            <ul>
              <>
                {/* Divider */}
                <li className="px-8 pt-5 mb-2 border-t border-gray-200 first:border-transparent first:pt-0 dark:border-neutral-700 dark:first:border-transparent">
                  <span className="block text-xs text-gray-500 uppercase dark:text-neutral-500">
                    Monitoring
                  </span>
                </li>

                {/* Dashboard */}
                <li className="px-5 mb-1.5">
                  <Link
                    className={`flex px-3 py-2 text-sm text-gray-800 bg-gray-100 rounded-lg gap-x-3 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:focus:bg-neutral-700 
                    ${
                      path === "/dashboard"
                        ? "active-link dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    }`}
                    href="/dashboard"
                  >
                    <svg
                      className="flex-shrink-0 mt-0.5 size-4"
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
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    Dashboard
                  </Link>
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
                      path === "/voltage"
                        ? "active-link dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    }`}
                    href="/voltage"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="flex-shrink-0 mt-0.5 size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                      />
                    </svg>
                    Voltage
                  </Link>
                </li>
                {/* Current */}
                <li className="px-5 mb-1.5">
                  <Link
                    className={`flex px-3 py-2 text-sm text-gray-800 bg-gray-100 rounded-lg gap-x-3 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:focus:bg-neutral-700 
                    ${
                      path === "/current"
                        ? "active-link dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    }`}
                    href="/current"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="flex-shrink-0 mt-0.5 size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
                      />
                    </svg>
                    Current
                  </Link>
                </li>
                {/* Ground */}
                <li className="px-5 mb-1.5">
                  <Link
                    className={`flex px-3 py-2 text-sm text-gray-800 bg-gray-100 rounded-lg gap-x-3 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:focus:bg-neutral-700 
                    ${
                      path === "/ground"
                        ? "active-link dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    }`}
                    href="/ground"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="flex-shrink-0 mt-0.5 size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 9h16.5m-16.5 6.75h16.5"
                      />
                    </svg>
                    Ground
                  </Link>
                </li>
                {/* Frequency */}
                <li className="px-5 mb-1.5">
                  <Link
                    className={`flex px-3 py-2 text-sm text-gray-800 bg-gray-100 rounded-lg gap-x-3 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:focus:bg-neutral-700 
                    ${
                      path === "/frequency"
                        ? "active-link dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    }`}
                    href="/frequency"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="flex-shrink-0 mt-0.5 size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                    Frequency
                  </Link>
                </li>
                {/* Temperature */}
                <li className="px-5 mb-1.5">
                  <Link
                    className={`flex px-3 py-2 text-sm text-gray-800 bg-gray-100 rounded-lg gap-x-3 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:focus:bg-neutral-700 
                    ${
                      path === "/temperature"
                        ? "active-link dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    }`}
                    href="/temperature"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="flex-shrink-0 mt-0.5 size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                      />
                    </svg>
                    Temperature
                  </Link>
                </li>
                {/* Energy */}
                <li className="px-5 mb-1.5">
                  <Link
                    className={`flex px-3 py-2 text-sm text-gray-800 bg-gray-100 rounded-lg gap-x-3 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:focus:bg-neutral-700 
                    ${
                      path === "/energy"
                        ? "active-link dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    }`}
                    href="/energy"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="flex-shrink-0 mt-0.5 size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                      />
                    </svg>
                    Energy
                  </Link>
                </li>
                {/* Power Factor */}
                <li className="px-5 mb-1.5">
                  <Link
                    className={`flex px-3 py-2 text-sm text-gray-800 bg-gray-100 rounded-lg gap-x-3 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:focus:bg-neutral-700 
                    ${
                      path === "/pf"
                        ? "active-link dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    }`}
                    href="/pf"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="flex-shrink-0 mt-0.5 size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                      />
                    </svg>
                    Power Factor
                  </Link>
                </li>
                {/* THDv */}
                <li className="px-5 mb-1.5">
                  <Link
                    className={`flex px-3 py-2 text-sm text-gray-800 bg-gray-100 rounded-lg gap-x-3 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:focus:bg-neutral-700 
                    ${
                      path === "/thdv"
                        ? "active-link dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    }`}
                    href="/thdv"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="flex-shrink-0 mt-0.5 size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                      />
                    </svg>
                    THDv
                  </Link>
                </li>
                {/* THDi */}
                <li className="px-5 mb-1.5">
                  <Link
                    className={`flex px-3 py-2 text-sm text-gray-800 bg-gray-100 rounded-lg gap-x-3 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:focus:bg-neutral-700 
                    ${
                      path === "/thdi"
                        ? "active-link dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    }`}
                    href="/thdi"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="flex-shrink-0 mt-0.5 size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                      />
                    </svg>
                    THDi
                  </Link>
                </li>

                {/* Divider */}
                <li className="pt-5 px-8 mt-5 mb-1.5 border-t border-gray-200 first:border-transparent first:pt-0 dark:border-neutral-700 dark:first:border-transparent">
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
                      path === "/alarm-logger"
                        ? "active-link dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    }`}
                    href="/alarm-logger"
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
                    className={`flex items-center px-3 py-2 text-sm bg-gray-100 text-gray-800 rounded-lg gap-x-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:focus:bg-neutral-700 ${
                      path === "/database-logger"
                        ? "active-link dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    }`}
                    href="/database-logger"
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
                  </Link>
                </li>
                {/* SD Card Log */}
                <li className="px-5 mb-0.5">
                  <Link
                    className={`flex items-center px-3 py-2 text-sm bg-gray-100 text-gray-800 rounded-lg gap-x-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-300 dark:focus:bg-neutral-700 ${
                      path === "/sd-card-logger"
                        ? "active-link dark:bg-neutral-700"
                        : "dark:bg-neutral-800"
                    }`}
                    href="/sd-card-logger"
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
                          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                        />
                      </svg>
                    </span>
                    SD Card Log
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
