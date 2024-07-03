"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  AxisModel,
  Category,
  ChartComponent,
  ColumnSeries,
  DataLabel,
  Inject,
  Legend,
  LegendSeriesModel,
  LineSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  Tooltip,
  TooltipSettingsModel,
} from "@syncfusion/ej2-react-charts";

export default function Dashboard() {
  const [hideTotalUser, setHideTotalUser] = useState(true);
  const [hideActiveUser, setHideActiveUser] = useState(false);
  const [hidePendingUser, setHidePendingUser] = useState(false);

  const data = [
    { month: "Jan", sales: 35 },
    { month: "Feb", sales: 28 },
    { month: "Mar", sales: 34 },
    { month: "Apr", sales: 32 },
    { month: "May", sales: 40 },
    { month: "Jun", sales: 32 },
    { month: "Jul", sales: 35 },
    { month: "Aug", sales: 55 },
    { month: "Sep", sales: 38 },
    { month: "Oct", sales: 30 },
    { month: "Nov", sales: 25 },
    { month: "Dec", sales: 32 },
  ];
  const tooltip = { enable: true, shared: false };
  const primaryyAxis = { labelFormat: "${value}K" };
  const primarxyAxis = { valueType: "Category" };
  const legendSettings = { visible: true };
  const marker = { dataLabel: { visible: true } };

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 md:gap-3 xl:gap-5">
        {/* Total User */}
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

              <div className="flex items-center -space-x-2">
                <Image
                  width={500}
                  height={500}
                  className="flex-shrink-0 border-2 border-white rounded-full size-7 dark:border-neutral-800"
                  src="https://images.unsplash.com/photo-1679412330254-90cb240038c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80"
                  alt="Image Description"
                />
                <span className="flex items-center justify-center flex-shrink-0 text-xs font-medium text-gray-700 uppercase bg-gray-200 border-2 border-white rounded-full size-7 dark:bg-neutral-700 dark:border-neutral-800 dark:text-neutral-300">
                  L
                </span>
                <Image
                  width={500}
                  height={500}
                  className="flex-shrink-0 border-2 border-white rounded-full size-7 dark:border-neutral-800"
                  src="https://images.unsplash.com/photo-1659482634023-2c4fda99ac0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80"
                  alt="Image Description"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Active User */}
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
              Active users
            </h2>

            <div className="grid gap-1 sm:flex sm:justify-between sm:items-center sm:gap-3">
              <h3 className="text-lg font-semibold text-gray-800 md:text-2xl dark:text-neutral-200">
                {hideActiveUser ? `****` : 1}
              </h3>

              <div className="flex items-center -space-x-2">
                <Image
                  width={500}
                  height={500}
                  className="flex-shrink-0 border-2 border-white rounded-full size-7 dark:border-neutral-800"
                  src="https://images.unsplash.com/photo-1679412330254-90cb240038c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80"
                  alt="Image Description"
                />
                <Image
                  width={500}
                  height={500}
                  className="flex-shrink-0 border-2 border-white rounded-full size-7 dark:border-neutral-800"
                  src="https://images.unsplash.com/photo-1659482634023-2c4fda99ac0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80"
                  alt="Image Description"
                />
                <span className="flex items-center justify-center flex-shrink-0 text-xs font-medium text-gray-700 uppercase bg-gray-200 border-2 border-white rounded-full size-7 dark:bg-neutral-700 dark:border-neutral-800 dark:text-neutral-300">
                  O
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Invites */}
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
                        onClick={() => setHidePendingUser(!hidePendingUser)}
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
              Pending Invites
            </h2>

            <div className="grid gap-1 sm:flex sm:justify-between sm:items-center sm:gap-3">
              <h3 className="text-lg font-semibold text-gray-800 md:text-2xl dark:text-neutral-200">
                {hidePendingUser ? `****` : 0}
              </h3>

              <div className="flex items-center -space-x-2">
                <Image
                  width={500}
                  height={500}
                  className="flex-shrink-0 border-2 border-white rounded-full size-7 dark:border-neutral-800"
                  src="https://images.unsplash.com/photo-1601935111741-ae98b2b230b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80"
                  alt="Image Description"
                />
                <span className="flex items-center justify-center flex-shrink-0 text-xs font-medium text-gray-700 uppercase bg-gray-200 border-2 border-white rounded-full size-7 dark:bg-neutral-700 dark:border-neutral-800 dark:text-neutral-300">
                  M
                </span>
                <span className="flex items-center justify-center flex-shrink-0 text-xs font-medium text-gray-700 uppercase bg-gray-200 border-2 border-white rounded-full size-7 dark:bg-neutral-700 dark:border-neutral-800 dark:text-neutral-300">
                  S
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Charts */}
      <ChartComponent
        id="charts"
        primaryXAxis={primarxyAxis}
        legendSettings={legendSettings}
        primaryYAxis={primaryyAxis}
        tooltip={tooltip}
      >
        <Inject
          services={[
            ColumnSeries,
            DataLabel,
            Tooltip,
            Legend,
            LineSeries,
            Category,
          ]}
        />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={data}
            xName="month"
            yName="sales"
            name="Sales"
            marker={marker}
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </>
  );
}
