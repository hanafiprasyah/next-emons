"use client";

import React, { useState } from "react";
import PrelineScript from "@/components/PrelineScript";
import Image from "next/image";

export default function Dashboard() {
  const [hideTotalUser, setHideTotalUser] = useState(true);
  const [hideActiveUser, setHideActiveUser] = useState(false);
  const [hidePendingUser, setHidePendingUser] = useState(false);
  const [hideDeviceList, setHideDeviceList] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-8 pt-2 pb-6">
      <>
        {/* Stats Grid */}
        <section id="stat-card">
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 md:gap-3 xl:gap-5">
            <>
              {/* Total Users */}
              <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-purple-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-purple-800/30 dark:before:via-transparent">
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex justify-between gap-x-3">
                    {/* Icon */}
                    <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow size-8 md:size-10 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
                      <svg
                        className="flex-shrink-0 text-purple-500 size-4 md:size-5"
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
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </span>

                    <div>
                      {/* More Dropdown */}
                      <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
                        <button
                          id="hs-pro-dusd1"
                          type="button"
                          className="inline-flex items-center justify-center text-gray-500 border border-transparent rounded-lg size-7 gap-x-2 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
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
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="5" r="1" />
                            <circle cx="12" cy="19" r="1" />
                          </svg>
                        </button>

                        {/* Dropdown */}
                        <div
                          className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-36 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-900"
                          aria-labelledby="hs-pro-dusd1"
                        >
                          <div className="p-1">
                            <button
                              type="button"
                              onClick={() => setHideTotalUser(!hideTotalUser)}
                              className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700"
                            >
                              {hideTotalUser ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="flex-shrink-0 size-3.5 mt-0.5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  className="flex-shrink-0 size-3.5 mt-0.5"
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
                                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                  <line x1="2" x2="22" y1="2" y2="22" />
                                </svg>
                              )}
                              {hideTotalUser ? `Show` : `Hide`} stats
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-sm text-gray-800 md:text-base dark:text-neutral-200">
                    Total Users
                  </h2>

                  <div className="grid gap-1 sm:flex sm:justify-between sm:items-center sm:gap-3">
                    <h3 className="text-lg font-semibold text-gray-800 md:text-2xl dark:text-neutral-200">
                      {hideTotalUser ? `****` : 1}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Total Approve Users */}
              <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-teal-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-teal-800/30 dark:before:via-transparent">
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex justify-between gap-x-3">
                    {/* Icon */}
                    <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow size-8 md:size-10 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
                      <svg
                        className="flex-shrink-0 text-teal-500 size-4 md:size-5"
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
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <polyline points="16 11 18 13 22 9" />
                      </svg>
                    </span>

                    <div>
                      {/* More Dropdown */}
                      <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
                        <button
                          id="hs-pro-dusd2"
                          type="button"
                          className="inline-flex items-center justify-center text-gray-500 border border-transparent rounded-lg size-7 gap-x-2 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
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
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="5" r="1" />
                            <circle cx="12" cy="19" r="1" />
                          </svg>
                        </button>

                        {/* Dropdown */}
                        <div
                          className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-36 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-900"
                          aria-labelledby="hs-pro-dusd2"
                        >
                          <div className="p-1">
                            <button
                              type="button"
                              onClick={() => setHideActiveUser(!hideActiveUser)}
                              className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700"
                            >
                              {hideActiveUser ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="flex-shrink-0 size-3.5 mt-0.5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  className="flex-shrink-0 size-3.5 mt-0.5"
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
                                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                  <line x1="2" x2="22" y1="2" y2="22" />
                                </svg>
                              )}
                              {hideActiveUser ? `Show` : `Hide`} stats
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-sm text-gray-800 md:text-base dark:text-neutral-200">
                    Approved Users
                  </h2>

                  <div className="grid gap-1 sm:flex sm:justify-between sm:items-center sm:gap-3">
                    <h3 className="text-lg font-semibold text-gray-800 md:text-2xl dark:text-neutral-200">
                      {hideActiveUser ? `****` : 1}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Total Pending Users */}
              <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-blue-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-blue-800/30 dark:before:via-transparent">
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex justify-between gap-x-3">
                    {/* Icon */}
                    <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow size-8 md:size-10 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="flex-shrink-0 text-blue-500 size-4 md:size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </span>

                    <div>
                      {/* More Dropdown */}
                      <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
                        <button
                          id="hs-pro-dusd3"
                          type="button"
                          className="inline-flex items-center justify-center text-gray-500 border border-transparent rounded-lg size-7 gap-x-2 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
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
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="5" r="1" />
                            <circle cx="12" cy="19" r="1" />
                          </svg>
                        </button>

                        {/* Dropdown  */}
                        <div
                          className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-36 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-900"
                          aria-labelledby="hs-pro-dusd3"
                        >
                          <div className="p-1">
                            <button
                              type="button"
                              onClick={() =>
                                setHidePendingUser(!hidePendingUser)
                              }
                              className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700"
                            >
                              {hidePendingUser ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="flex-shrink-0 size-3.5 mt-0.5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  className="flex-shrink-0 size-3.5 mt-0.5"
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
                                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                  <line x1="2" x2="22" y1="2" y2="22" />
                                </svg>
                              )}
                              {hidePendingUser ? `Show` : `Hide`} stats
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-sm text-gray-800 md:text-base dark:text-neutral-200">
                    Pending Approval
                  </h2>

                  <div className="grid gap-1 sm:flex sm:justify-between sm:items-center sm:gap-3">
                    <h3 className="text-lg font-semibold text-gray-800 md:text-2xl dark:text-neutral-200">
                      {hidePendingUser ? `****` : 0}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Total EMONS Device Installed based on their tenant */}
              <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-blue-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-red-800/30 dark:before:via-transparent">
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex justify-between gap-x-3">
                    {/* Icon */}
                    <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow size-8 md:size-10 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="flex-shrink-0 text-red-500 size-4 md:size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                        />
                      </svg>
                    </span>

                    <div>
                      {/* More Dropdown */}
                      <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
                        <button
                          id="hs-pro-dusd3"
                          type="button"
                          className="inline-flex items-center justify-center text-gray-500 border border-transparent rounded-lg size-7 gap-x-2 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
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
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="5" r="1" />
                            <circle cx="12" cy="19" r="1" />
                          </svg>
                        </button>

                        {/* Dropdown  */}
                        <div
                          className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-36 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-900"
                          aria-labelledby="hs-pro-dusd3"
                        >
                          <div className="p-1">
                            <button
                              type="button"
                              onClick={() => setHideDeviceList(!hideDeviceList)}
                              className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700"
                            >
                              {hidePendingUser ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="flex-shrink-0 size-3.5 mt-0.5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  className="flex-shrink-0 size-3.5 mt-0.5"
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
                                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                  <line x1="2" x2="22" y1="2" y2="22" />
                                </svg>
                              )}
                              {hideDeviceList ? `Show` : `Hide`} stats
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-sm text-gray-800 md:text-base dark:text-neutral-200">
                    Device Installed
                  </h2>

                  <div className="grid gap-1 sm:flex sm:justify-between sm:items-center sm:gap-3">
                    <h3 className="text-lg font-semibold text-gray-800 md:text-2xl dark:text-neutral-200">
                      {hideDeviceList ? `****` : 1}
                    </h3>
                  </div>
                </div>
              </div>
            </>
          </div>
        </section>
        {/* Todays TODO List */}
        <section id="todo">
          <ul className="space-y-2">
            <>
              {/* List Item */}
              <li>
                <a
                  className="p-2.5 flex cursor-not-allowed items-center gap-x-3 bg-white border border-gray-200 text-sm font-medium text-gray-800 dark:text-neutral-200 rounded-xl hover:text-blue-600 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 dark:hover:text-blue-500 dark:focus:bg-neutral-700"
                  href=""
                >
                  <span className="flex items-center justify-center bg-white border border-gray-200 rounded-lg shrink-0 size-7 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="shrink-0 size-3.5 text-blue-600 dark:text-blue-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </span>
                  <div className="grow">
                    <p>Pending user request</p>
                  </div>
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
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </a>
              </li>
              {/* End List Item */}
              {/* List Item */}
              <li>
                <a
                  className="p-2.5 flex cursor-not-allowed items-center gap-x-3 bg-white border border-gray-200 text-sm font-medium text-gray-800 dark:text-neutral-200 rounded-xl hover:text-blue-600 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 dark:hover:text-blue-500 dark:focus:bg-neutral-700"
                  href=""
                >
                  <span className="flex items-center justify-center bg-white border border-gray-200 rounded-lg shrink-0 size-7 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300">
                    <svg
                      className="shrink-0 size-3.5 text-purple-600 dark:text-purple-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                    </svg>
                  </span>
                  <div className="grow">
                    <p>Your team member</p>
                  </div>
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
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </a>
              </li>
              {/* End List Item */}
              {/* List Item */}
              <li>
                <a
                  className="p-2.5 cursor-not-allowed flex items-center gap-x-3 bg-white border border-gray-200 text-sm font-medium text-gray-800 dark:text-neutral-200 rounded-xl hover:text-blue-600 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 dark:hover:text-blue-500 dark:focus:bg-neutral-700"
                  href=""
                >
                  <span className="flex items-center justify-center bg-white border border-gray-200 rounded-lg shrink-0 size-7 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300">
                    <svg
                      className="shrink-0 size-3.5 text-indigo-600 dark:text-indigo-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
                    </svg>
                  </span>
                  <div className="grow">
                    <p>Help center</p>
                  </div>
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
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </a>
              </li>
              {/* End List Item */}
            </>
          </ul>
        </section>
      </>
      <PrelineScript />
    </div>
  );
}
