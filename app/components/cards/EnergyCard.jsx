"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const EnergyKWHLinearChart = dynamic(
  () => import("@/components/charts/line/EnergyKWHLinearChart"),
  {
    ssr: true,
  }
);
const EnergyKVARHLinearChart = dynamic(
  () => import("@/components/charts/line/EnergyKVARHLinearChart"),
  {
    ssr: true,
  }
);

const Default = ({
  id,
  key,
  alt,
  title,
  valueR,
  valueS,
  valueT,
  valueTotal,
  child,
}) => {
  return (
    <>
      {/* Sales Stats Card */}
      <div
        className={`flex flex-col bg-white border mx-2 my-2 border-gray-200 shadow-sm rounded-xl dark:bg-neutral-800 ${
          alt === "Input" ? "dark:border-rose-500" : "dark:border-emerald-500"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 pb-3">
          <h2 className="inline-block font-semibold text-gray-800 dark:text-neutral-200">
            Total {title}
          </h2>
          {/* Pulse */}
          <div className="inline-flex">
            <span className="relative flex w-3 h-3">
              <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-emerald-400"></span>
              <span className="relative inline-flex w-3 h-3 rounded-full bg-emerald-500"></span>
            </span>
          </div>
          {/* End Pulse */}
        </div>
        {/* End Header */}
        {/* Body */}
        <div className="h-full px-5 pb-5 space-y-8">
          <h4 className="text-4xl font-medium text-gray-800 dark:text-neutral-200">
            {valueTotal} KWH
          </h4>
          {/* List Group */}
          <ul className="space-y-3">
            {/* List Item */}
            <li className="flex flex-wrap items-center justify-between gap-x-2">
              <div>
                <div className="flex items-center gap-x-2">
                  {/* <div className="inline-block size-2.5 bg-blue-600 rounded-sm" /> */}
                  <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-6 dark:bg-blue-500">
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
                  <h2 className="inline-block text-gray-500 align-middle dark:text-neutral-400">
                    {title} R
                  </h2>
                </div>
              </div>
              <div>
                <span className="text-gray-800 dark:text-neutral-200">
                  {valueR}
                </span>
              </div>
            </li>
            {/* End List Item */}
            {/* List Item */}
            <li className="flex flex-wrap items-center justify-between gap-x-2">
              <div>
                <div className="flex items-center gap-x-2">
                  {/* <div className="inline-block size-2.5 bg-purple-600 rounded-sm" /> */}
                  <span className="flex items-center justify-center text-white bg-indigo-600 rounded-md size-6 dark:bg-indigo-500">
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
                  <h2 className="inline-block text-gray-500 align-middle dark:text-neutral-400">
                    {title} S
                  </h2>
                </div>
              </div>
              <div>
                <span className="text-gray-800 dark:text-neutral-200">
                  {valueS}
                </span>
              </div>
            </li>
            {/* End List Item */}
            {/* List Item */}
            <li className="flex flex-wrap items-center justify-between gap-x-2">
              <div>
                <div className="flex items-center gap-x-2">
                  {/* <div className="inline-block size-2.5 bg-gray-300 rounded-sm dark:bg-neutral-500" /> */}
                  <span className="flex items-center justify-center text-white rounded-md bg-emerald-600 size-6 dark:bg-emerald-500">
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
                  <h2 className="inline-block text-gray-500 align-middle dark:text-neutral-400">
                    {title} T
                  </h2>
                </div>
              </div>
              <div>
                <span className="text-gray-800 dark:text-neutral-200">
                  {valueT}
                </span>
              </div>
            </li>
            {/* End List Item */}
          </ul>
          {/* End List Group */}
        </div>
        {/* End Body */}
        {/* Footer */}
        <div className="p-5 pt-0 space-y-8">
          <div className="w-full">
            {/* Realtime Line Chart */}
            {id === "energy-kwh-input" || id === "energy-kwh-output" ? (
              <div id="charts-kwh" key={key} className="w-full h-[140px]">
                <EnergyKWHLinearChart
                  id={id}
                  name={key}
                  chartType={id}
                ></EnergyKWHLinearChart>
              </div>
            ) : (
              <div id="charts-kvarh" key={key} className="w-full h-[140px]">
                <EnergyKVARHLinearChart
                  id={id}
                  name={key}
                  chartType={id}
                ></EnergyKVARHLinearChart>
              </div>
            )}
          </div>
        </div>
        {/* End Footer */}
      </div>
      {/* End Sales Stats Card */}
    </>
  );
};

export default Default;
