import Image from "next/image";
import React from "react";

export default function AlarmLogger() {
  return (
    <>
      {/* AlarmLogger Table Card */}
      <div className="flex flex-col p-5 space-y-4 bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
        {/* Nav Tab */}
        <nav
          className="relative flex space-x-1 after:absolute after:bottom-0 after:inset-x-0 after:border-b-2 after:border-gray-200 dark:after:border-neutral-700"
          aria-label="Tabs"
          role="tablist"
          aria-orientation="horizontal"
        >
          <button
            type="button"
            className="hs-tab-active:after:bg-gray-800 hs-tab-active:text-gray-800 px-2.5 py-1.5 mb-2 relative inline-flex justify-center items-center gap-x-2  hover:bg-gray-100 text-gray-500 hover:text-gray-800 text-sm rounded-lg disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 after:absolute after:-bottom-2 after:inset-x-0 after:z-10 after:h-0.5 after:pointer-events-none dark:hs-tab-active:text-neutral-200 dark:hs-tab-active:after:bg-neutral-400 dark:text-neutral-500 dark:hover:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 active "
            id="hs-pro-tabs-dut-item-alarm-voltage"
            aria-selected="true"
            data-hs-tab="#hs-pro-tabs-dut-alarm-voltage"
            aria-controls="hs-pro-tabs-dut-alarm-voltage"
            role="tab"
          >
            Alarm Voltage
          </button>
          <button
            type="button"
            className="hs-tab-active:after:bg-gray-800 hs-tab-active:text-gray-800 px-2.5 py-1.5 mb-2 relative inline-flex justify-center items-center gap-x-2  hover:bg-gray-100 text-gray-500 hover:text-gray-800 text-sm rounded-lg disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 after:absolute after:-bottom-2 after:inset-x-0 after:z-10 after:h-0.5 after:pointer-events-none dark:hs-tab-active:text-neutral-200 dark:hs-tab-active:after:bg-neutral-400 dark:text-neutral-500 dark:hover:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  "
            id="hs-pro-tabs-dut-item-alarm-temperature"
            aria-selected="false"
            data-hs-tab="#hs-pro-tabs-dut-alarm-temperature"
            aria-controls="hs-pro-tabs-dut-alarm-temperature"
            role="tab"
          >
            Alarm Temperature
          </button>
        </nav>
        {/* End Nav Tab */}
        {/* Filter Group */}
        <div className="grid md:grid-cols-2 gap-y-2 md:gap-y-0 md:gap-x-5">
          <div>
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                <svg
                  className="text-gray-500 shrink-0 size-4 dark:text-neutral-400"
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
                  <circle cx={11} cy={11} r={8} />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <input
                type="text"
                className="py-[7px] ps-10 pe-8 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:bg-white focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder:text-neutral-400 dark:focus:bg-neutral-800 dark:focus:ring-neutral-600"
                placeholder="Search data"
              />
              <div className="absolute inset-y-0 z-20 items-center hidden end-0 pe-1">
                <button
                  type="button"
                  className="inline-flex items-center justify-center text-gray-500 rounded-full shrink-0 size-6 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
                  aria-label="Close"
                >
                  <span className="sr-only">Close</span>
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
                    <circle cx={12} cy={12} r={10} />
                    <path d="m15 9-6 6" />
                    <path d="m9 9 6 6" />
                  </svg>
                </button>
              </div>
            </div>
            {/* End Search Input */}
          </div>
          {/* End Col */}
          <div className="flex items-center justify-end gap-x-2">
            {/* Filter Dropdown */}
            <div className="hs-dropdown [--auto-close:true] relative inline-flex">
              {/* Filter Button */}
              <button
                id="hs-pro-dptied"
                type="button"
                className="py-2 px-2.5 inline-flex items-center gap-x-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                aria-haspopup="menu"
                aria-expanded="false"
                aria-label="Dropdown"
              >
                <svg
                  className="shrink-0 mt-0.5 size-3.5"
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
                  <path d="m3 16 4 4 4-4" />
                  <path d="M7 20V4" />
                  <path d="m21 8-4-4-4 4" />
                  <path d="M17 4v16" />
                </svg>
                Export Datas
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
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {/* End Filter Button */}
              {/* Dropdown */}
              <div
                className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-40 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-900"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="hs-pro-dptied"
              >
                <div className="p-1">
                  <button
                    type="button"
                    className="w-full flex gap-x-3 py-1.5 px-2 rounded-lg text-[13px] text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                    data-hs-overlay="#hs-pro-dicm"
                  >
                    <svg
                      className="shrink-0 mt-0.5 size-3.5"
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
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1={12} x2={12} y1={15} y2={3} />
                    </svg>
                    Import contacts
                  </button>
                  <button
                    type="button"
                    className="w-full flex gap-x-3 py-1.5 px-2 rounded-lg text-[13px] text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                    data-hs-overlay="#hs-pro-decm"
                  >
                    <svg
                      className="shrink-0 mt-0.5 size-3.5"
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
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1={12} x2={12} y1={3} y2={15} />
                    </svg>
                    Export contacts
                  </button>
                </div>
              </div>
              {/* End Dropdown */}
            </div>
            {/* End Filter Dropdown */}
            {/* Download Dropdown */}
            <div className="hs-dropdown [--auto-close:inside] relative inline-flex">
              <button
                id="hs-pro-dptfd"
                type="button"
                className="py-2 px-2.5 inline-flex items-center gap-x-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                aria-haspopup="menu"
                aria-expanded="false"
                aria-label="Dropdown"
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
                  <line x1={21} x2={14} y1={4} y2={4} />
                  <line x1={10} x2={3} y1={4} y2={4} />
                  <line x1={21} x2={12} y1={12} y2={12} />
                  <line x1={8} x2={3} y1={12} y2={12} />
                  <line x1={21} x2={16} y1={20} y2={20} />
                  <line x1={12} x2={3} y1={20} y2={20} />
                  <line x1={14} x2={14} y1={2} y2={6} />
                  <line x1={8} x2={8} y1={10} y2={14} />
                  <line x1={16} x2={16} y1={18} y2={22} />
                </svg>
                Filter
                <span className="font-medium text-[10px] py-0.5 px-[5px] bg-gray-800 text-white leading-3 rounded-full dark:bg-neutral-500">
                  5
                </span>
              </button>
              {/* Download Dropdown */}
              <div
                className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-48 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-900"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="hs-pro-dptfd"
              >
                {/* Search Input */}
                <div className="px-1 pt-1">
                  <div className="pb-1 border-b border-gray-200 dark:border-neutral-800">
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-2.5">
                        <svg
                          className="shrink-0 size-3.5 text-gray-400 dark:text-white/60"
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
                          <circle cx={11} cy={11} r={8} />
                          <path d="m21 21-4.3-4.3" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        className="py-1.5 px-8 block w-full bg-gray-100 border-transparent rounded-md text-sm placeholder:text-gray-500 focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:bg-white disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-transparent dark:text-neutral-400 dark:placeholder:text-neutral-400 dark:focus:ring-neutral-600 dark:focus:bg-neutral-900"
                        placeholder="Search"
                      />
                      <div className="absolute inset-y-0 z-20 items-center hidden end-0 pe-1">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center text-gray-500 rounded-full shrink-0 size-6 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
                          aria-label="Close"
                        >
                          <span className="sr-only">Close</span>
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
                            <circle cx={12} cy={12} r={10} />
                            <path d="m15 9-6 6" />
                            <path d="m9 9 6 6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Search Input */}
                <div className="p-1 space-y-0.5">
                  <a
                    className="flex w-full px-3 py-2 text-sm text-gray-800 rounded-lg gap-x-3 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                    href="#"
                  >
                    <svg
                      className="shrink-0 mt-0.5 size-3.5"
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
                      <rect width={18} height={18} x={3} y={3} rx={2} />
                      <circle cx={12} cy={10} r={3} />
                      <path d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
                    </svg>
                    Name
                  </a>
                  <a
                    className="flex w-full px-3 py-2 text-sm text-gray-800 rounded-lg gap-x-3 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                    href="#"
                  >
                    <svg
                      className="shrink-0 mt-0.5 size-3.5"
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
                      <rect width={20} height={16} x={2} y={4} rx={2} />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    Email addresses
                  </a>
                  <a
                    className="flex w-full px-3 py-2 text-sm text-gray-800 rounded-lg gap-x-3 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                    href="#"
                  >
                    <svg
                      className="shrink-0 mt-0.5 size-3.5"
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
                      <path d="M11 12H3" />
                      <path d="M16 6H3" />
                      <path d="M16 18H3" />
                      <path d="M21 12h-6" />
                    </svg>
                    Description
                  </a>
                  <a
                    className="flex w-full px-3 py-2 text-sm text-gray-800 rounded-lg gap-x-3 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                    href="#"
                  >
                    <svg
                      className="shrink-0 mt-0.5 size-3.5"
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
                      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                      <path d="M10 6h4" />
                      <path d="M10 10h4" />
                      <path d="M10 14h4" />
                      <path d="M10 18h4" />
                    </svg>
                    Company
                  </a>
                  <a
                    className="flex w-full px-3 py-2 text-sm text-gray-800 rounded-lg gap-x-3 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                    href="#"
                  >
                    <svg
                      className="shrink-0 mt-0.5 size-3.5"
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
                      <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
                      <rect width={18} height={18} x={3} y={4} rx={2} />
                      <circle cx={12} cy={10} r={2} />
                      <line x1={8} x2={8} y1={2} y2={4} />
                      <line x1={16} x2={16} y1={2} y2={4} />
                    </svg>
                    User ID
                  </a>
                  <a
                    className="flex w-full px-3 py-2 text-sm text-gray-800 rounded-lg gap-x-3 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                    href="#"
                  >
                    <svg
                      className="shrink-0 mt-0.5 size-3.5"
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
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    Phone numbers
                  </a>
                  <a
                    className="flex w-full px-3 py-2 text-sm text-gray-800 rounded-lg gap-x-3 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                    href="#"
                  >
                    <svg
                      className="shrink-0 mt-0.5 size-3.5"
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
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx={12} cy={10} r={3} />
                    </svg>
                    Location
                  </a>
                  <a
                    className="flex w-full px-3 py-2 text-sm text-gray-800 rounded-lg gap-x-3 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                    href="#"
                  >
                    <svg
                      className="shrink-0 mt-0.5 size-3.5"
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
                      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    Signed up as
                  </a>
                </div>
              </div>
              {/* End Download Dropdown */}
            </div>
            {/* End Download Dropdown */}
          </div>
          {/* End Col */}
        </div>
        {/* End Filter Group */}
        <div>
          {/* Tab Content */}
          <div
            id="hs-pro-tabs-dut-alarm-voltage"
            role="tabpanel"
            aria-labelledby="hs-pro-tabs-dut-item-alarm-voltage"
          >
            {/* Table Section */}
            <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
              <div className="inline-block min-w-full align-middle">
                {/* Table */}
                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                  <thead>
                    <tr className="border-t border-gray-200 divide-x divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
                      <th scope="col" className="px-3 py-2.5 text-start">
                        <input
                          type="checkbox"
                          className="text-blue-600 border-gray-300 rounded shrink-0 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        />
                      </th>
                      <th scope="col" className="min-w-72 ">
                        {/* Sort Dropdown */}
                        <div className="relative inline-flex w-full cursor-pointer hs-dropdown">
                          <button
                            id="hs-pro-dutnms"
                            type="button"
                            className="px-5 py-2.5 text-start w-full flex items-center gap-x-1 text-sm text-nowrap font-normal text-gray-500 focus:outline-none focus:bg-gray-100 dark:text-neutral-500 dark:focus:bg-neutral-700"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            aria-label="Dropdown"
                          >
                            Name
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
                              <path d="m7 15 5 5 5-5" />
                              <path d="m7 9 5-5 5 5" />
                            </svg>
                          </button>
                          {/* Dropdown */}
                          <div
                            className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-40 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-900"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="hs-pro-dutnms"
                          >
                            <div className="p-1">
                              <button
                                type="button"
                                className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
                                  <path d="m5 12 7-7 7 7" />
                                  <path d="M12 19V5" />
                                </svg>
                                Sort ascending
                              </button>
                              <button
                                type="button"
                                className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
                                  <path d="M12 5v14" />
                                  <path d="m19 12-7 7-7-7" />
                                </svg>
                                Sort descending
                              </button>
                              <button
                                type="button"
                                className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
                                  <path d="m12 19-7-7 7-7" />
                                  <path d="M19 12H5" />
                                </svg>
                                Move left
                              </button>
                              <button
                                type="button"
                                className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
                                  <path d="M5 12h14" />
                                  <path d="m12 5 7 7-7 7" />
                                </svg>
                                Move right
                              </button>
                              <div className="my-1 border-t border-gray-200 dark:border-neutral-800" />
                              <button
                                type="button"
                                className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
                                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                  <line x1={2} x2={22} y1={2} y2={22} />
                                </svg>
                                Hide in view
                              </button>
                            </div>
                          </div>
                          {/* End Dropdown */}
                        </div>
                        {/* End Sort Dropdown */}
                      </th>
                      <th scope="col" className="min-w-40">
                        {/* Sort Dropdown */}
                        <div className="relative inline-flex w-full cursor-pointer hs-dropdown">
                          <button
                            id="hs-pro-dutads"
                            type="button"
                            className="px-5 py-2.5 text-start w-full flex items-center gap-x-1 text-sm text-nowrap font-normal text-gray-500 focus:outline-none focus:bg-gray-100 dark:text-neutral-500 dark:focus:bg-neutral-700"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            aria-label="Dropdown"
                          >
                            Address
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
                              <path d="m7 15 5 5 5-5" />
                              <path d="m7 9 5-5 5 5" />
                            </svg>
                          </button>
                          {/* Dropdown */}
                          <div
                            className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-40 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-900"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="hs-pro-dutads"
                          >
                            <div className="p-1">
                              <button
                                type="button"
                                className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
                                  <path d="m5 12 7-7 7 7" />
                                  <path d="M12 19V5" />
                                </svg>
                                Sort ascending
                              </button>
                              <button
                                type="button"
                                className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
                                  <path d="M12 5v14" />
                                  <path d="m19 12-7 7-7-7" />
                                </svg>
                                Sort descending
                              </button>
                              <button
                                type="button"
                                className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
                                  <path d="m12 19-7-7 7-7" />
                                  <path d="M19 12H5" />
                                </svg>
                                Move left
                              </button>
                              <button
                                type="button"
                                className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
                                  <path d="M5 12h14" />
                                  <path d="m12 5 7 7-7 7" />
                                </svg>
                                Move right
                              </button>
                              <div className="my-1 border-t border-gray-200 dark:border-neutral-800" />
                              <button
                                type="button"
                                className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
                                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                  <line x1={2} x2={22} y1={2} y2={22} />
                                </svg>
                                Hide in view
                              </button>
                            </div>
                          </div>
                          {/* End Dropdown */}
                        </div>
                        {/* End Sort Dropdown */}
                      </th>
                      <th scope="col" className="min-w-36">
                        {/* Sort Dropdown */}
                        <div className="relative inline-flex w-full cursor-pointer hs-dropdown">
                          <button
                            id="hs-pro-dutsgs"
                            type="button"
                            className="px-5 py-2.5 text-start w-full flex items-center gap-x-1 text-sm text-nowrap font-normal text-gray-500 focus:outline-none focus:bg-gray-100 dark:text-neutral-500 dark:focus:bg-neutral-700"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            aria-label="Dropdown"
                          >
                            Signed up as
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
                              <path d="m7 15 5 5 5-5" />
                              <path d="m7 9 5-5 5 5" />
                            </svg>
                          </button>
                          {/* Dropdown */}
                          <div
                            className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-40 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-900"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="hs-pro-dutsgs"
                          >
                            <div className="p-1">
                              <button
                                type="button"
                                className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
                                  <path d="m5 12 7-7 7 7" />
                                  <path d="M12 19V5" />
                                </svg>
                                Sort ascending
                              </button>
                              <button
                                type="button"
                                className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
                                  <path d="M12 5v14" />
                                  <path d="m19 12-7 7-7-7" />
                                </svg>
                                Sort descending
                              </button>
                              <button
                                type="button"
                                className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
                                  <path d="m12 19-7-7 7-7" />
                                  <path d="M19 12H5" />
                                </svg>
                                Move left
                              </button>
                              <button
                                type="button"
                                className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
                                  <path d="M5 12h14" />
                                  <path d="m12 5 7 7-7 7" />
                                </svg>
                                Move right
                              </button>
                              <div className="my-1 border-t border-gray-200 dark:border-neutral-800" />
                              <button
                                type="button"
                                className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
                                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                  <line x1={2} x2={22} y1={2} y2={22} />
                                </svg>
                                Hide in view
                              </button>
                            </div>
                          </div>
                          {/* End Dropdown */}
                        </div>
                        {/* End Sort Dropdown */}
                      </th>
                      <th scope="col">
                        {/* Sort Dropdown */}
                        <div className="relative inline-flex w-full cursor-pointer hs-dropdown">
                          <button
                            id="hs-pro-dutems"
                            type="button"
                            className="px-5 py-2.5 text-start w-full flex items-center gap-x-1 text-sm text-nowrap font-normal text-gray-500 focus:outline-none focus:bg-gray-100 dark:text-neutral-500 dark:focus:bg-neutral-700"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            aria-label="Dropdown"
                          >
                            Email
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
                              <path d="m7 15 5 5 5-5" />
                              <path d="m7 9 5-5 5 5" />
                            </svg>
                          </button>
                          {/* Dropdown */}
                          <div
                            className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-40 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-900"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="hs-pro-dutems"
                          >
                            <div className="p-1">
                              <button
                                type="button"
                                className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
                                  <path d="m5 12 7-7 7 7" />
                                  <path d="M12 19V5" />
                                </svg>
                                Sort ascending
                              </button>
                              <button
                                type="button"
                                className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
                                  <path d="M12 5v14" />
                                  <path d="m19 12-7 7-7-7" />
                                </svg>
                                Sort descending
                              </button>
                              <button
                                type="button"
                                className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
                                  <path d="m12 19-7-7 7-7" />
                                  <path d="M19 12H5" />
                                </svg>
                                Move left
                              </button>
                              <button
                                type="button"
                                className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
                                  <path d="M5 12h14" />
                                  <path d="m12 5 7 7-7 7" />
                                </svg>
                                Move right
                              </button>
                              <div className="my-1 border-t border-gray-200 dark:border-neutral-800" />
                              <button
                                type="button"
                                className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
                                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                  <line x1={2} x2={22} y1={2} y2={22} />
                                </svg>
                                Hide in view
                              </button>
                            </div>
                          </div>
                          {/* End Dropdown */}
                        </div>
                        {/* End Sort Dropdown */}
                      </th>
                      <th scope="col">
                        {/* Sort Dropdown */}
                        <div className="relative inline-flex w-full cursor-pointer hs-dropdown">
                          <button
                            id="hs-pro-dutphs"
                            type="button"
                            className="px-5 py-2.5 text-start w-full flex items-center gap-x-1 text-sm text-nowrap font-normal text-gray-500 focus:outline-none focus:bg-gray-100 dark:text-neutral-500 dark:focus:bg-neutral-700"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            aria-label="Dropdown"
                          >
                            Phone
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
                              <path d="m7 15 5 5 5-5" />
                              <path d="m7 9 5-5 5 5" />
                            </svg>
                          </button>
                          {/* Dropdown */}
                          <div
                            className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-40 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-900"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="hs-pro-dutphs"
                          >
                            <div className="p-1">
                              <button
                                type="button"
                                className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
                                  <path d="m5 12 7-7 7 7" />
                                  <path d="M12 19V5" />
                                </svg>
                                Sort ascending
                              </button>
                              <button
                                type="button"
                                className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
                                  <path d="M12 5v14" />
                                  <path d="m19 12-7 7-7-7" />
                                </svg>
                                Sort descending
                              </button>
                              <button
                                type="button"
                                className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
                                  <path d="m12 19-7-7 7-7" />
                                  <path d="M19 12H5" />
                                </svg>
                                Move left
                              </button>
                              <button
                                type="button"
                                className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
                                  <path d="M5 12h14" />
                                  <path d="m12 5 7 7-7 7" />
                                </svg>
                                Move right
                              </button>
                              <div className="my-1 border-t border-gray-200 dark:border-neutral-800" />
                              <button
                                type="button"
                                className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-300 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
                                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                  <line x1={2} x2={22} y1={2} y2={22} />
                                </svg>
                                Hide in view
                              </button>
                            </div>
                          </div>
                          {/* End Dropdown */}
                        </div>
                        {/* End Sort Dropdown */}
                      </th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                    <tr className="divide-x divide-gray-200 dark:divide-neutral-700">
                      <td className="px-3 py-4 size-px whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="text-blue-600 border-gray-300 rounded shrink-0 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        />
                      </td>
                      <td className="relative px-4 py-1 cursor-pointer size-px group pe-20 lg:pe-24">
                        <div className="flex items-center w-full gap-x-3">
                          <Image
                            width={38}
                            height={38}
                            className="shrink-0 size-[38px] rounded-full"
                            src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80"
                            alt="Avatar"
                          />
                          <div className="grow">
                            <span className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                              Amanda Harvey
                            </span>
                          </div>
                        </div>
                        <div className="absolute transform -translate-y-1/2 lg:group-hover:block lg:hidden top-1/2 end-4">
                          <button
                            type="button"
                            className="hs-tooltip-toggle py-1.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700"
                            data-hs-overlay="#hs-pro-dutoo"
                          >
                            <svg
                              className="shrink-0 size-3.5 hidden lg:block"
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
                              <rect
                                width={18}
                                height={18}
                                x={3}
                                y={3}
                                rx={2}
                                ry={2}
                              />
                              <line x1={15} x2={15} y1={3} y2={21} />
                              <path d="m10 15-3-3 3-3" />
                            </svg>
                            Open
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                          4222 River Rd, Columbus, 31904, United States
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="py-1.5 ps-1.5 pe-2.5 inline-flex items-center gap-x-1.5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full dark:bg-neutral-500/20 dark:text-neutral-500">
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
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Valid account
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                          amanda@site.so
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400"></span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        {/* Download Dropdown */}
                        <div className="hs-dropdown [--auto-close:inside] [--placement:bottom-right] relative inline-flex">
                          <button
                            id="hs-pro-dutdm1"
                            type="button"
                            className="inline-flex items-center justify-center text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm size-7 gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            aria-label="Dropdown"
                          >
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
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1={12} x2={12} y1={15} y2={3} />
                            </svg>
                          </button>
                          {/* Download Dropdown */}
                          <div
                            className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-60 transition-[opacity,margin] duration opacity-0 hidden z-20 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-900"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="hs-pro-dutdm1"
                          >
                            <div className="p-1">
                              <div className="px-3 py-2">
                                <span className="block font-semibold text-gray-800 dark:text-neutral-200">
                                  Download Report
                                </span>
                                <span className="block text-xs text-gray-500 dark:text-neutral-500">
                                  Select Options
                                </span>
                              </div>
                              <div className="m-2 border-t border-gray-200 dark:border-neutral-700" />
                              <div className="px-2 py-1">
                                <div className="flex items-center p-1 bg-gray-100 rounded-xl dark:bg-neutral-800">
                                  <label
                                    htmlFor="hs-pro-dutdm1ts1"
                                    className="relative py-1.5 px-3 w-full cursor-pointer text-center text-sm text-gray-800 rounded-lg has-[:checked]:bg-white has-[:checked]:shadow-sm dark:text-neutral-200 dark:has-[:checked]:bg-neutral-600"
                                  >
                                    <svg
                                      className="relative z-10 me-1.5 inline-block align-middle shrink-0 size-4"
                                      width={32}
                                      height={32}
                                      viewBox="0 0 32 32"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M20.0324 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 15.8079L25.9844 18.3197L31.9364 15.8079V8.86395L20.0324 1.91994Z"
                                        fill="#21A366"
                                      />
                                      <path
                                        d="M8.12839 8.86395H20.0324V15.8079H8.12839V8.86395Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        d="M30.614 1.91994H20.0324V8.86395H31.9364V3.24228C31.9364 2.89158 31.7971 2.55523 31.5491 2.30725C31.3011 2.05926 30.9647 1.91994 30.614 1.91994Z"
                                        fill="#33C481"
                                      />
                                      <path
                                        d="M20.0324 15.8079H8.12839V28.3736C8.12839 28.7243 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.6959 9.45071 29.6959H30.6141C30.9647 29.6959 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7243 31.9364 28.3736V22.7519L20.0324 15.8079Z"
                                        fill="#185C37"
                                      />
                                      <path
                                        d="M20.0324 15.8079H31.9364V22.7519H20.0324V15.8079Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        opacity="0.1"
                                        d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16402 23.7439 0.827672 23.6047 0.579686 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579686 8.25922C0.827672 8.01122 1.16402 7.87194 1.51472 7.87194Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        d="M3.69711 20.7679L6.90722 15.794L3.96694 10.8479H6.33286L7.93791 14.0095C8.08536 14.3091 8.18688 14.5326 8.24248 14.68H8.26328C8.36912 14.4407 8.47984 14.2079 8.5956 13.9817L10.3108 10.8479H12.4822L9.46656 15.7663L12.5586 20.7679H10.2473L8.3932 17.2959C8.30592 17.148 8.23184 16.9927 8.172 16.8317H8.14424C8.09016 16.9891 8.01824 17.1399 7.92998 17.2811L6.02236 20.7679H3.69711Z"
                                        fill="white"
                                      />
                                    </svg>
                                    <span className="relative z-10 align-middle">
                                      Excel
                                    </span>
                                    <input
                                      type="radio"
                                      name="hs-pro-dutdm1ts"
                                      className="hidden"
                                      id="hs-pro-dutdm1ts1"
                                      defaultChecked=""
                                    />
                                  </label>
                                  <label
                                    htmlFor="hs-pro-dutdm1ts2"
                                    className="relative py-1.5 px-3 w-full cursor-pointer text-center text-sm text-gray-800 rounded-lg has-[:checked]:bg-white has-[:checked]:shadow-sm dark:text-neutral-200 dark:has-[:checked]:bg-neutral-600"
                                  >
                                    <svg
                                      className="relative z-10 me-1.5 inline-block align-middle shrink-0 size-4"
                                      width={32}
                                      height={32}
                                      viewBox="0 0 32 32"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M30.6141 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 12.3359L31.9364 8.86395V3.24228C31.9364 2.89158 31.797 2.55523 31.549 2.30725C31.3011 2.05926 30.9647 1.91994 30.6141 1.91994Z"
                                        fill="#41A5EE"
                                      />
                                      <path
                                        d="M31.9364 8.86395H8.12839V15.8079L20.0324 19.2799L31.9364 15.8079V8.86395Z"
                                        fill="#2B7CD3"
                                      />
                                      <path
                                        d="M31.9364 15.8079H8.12839V22.7519L20.0324 26.2239L31.9364 22.7519V15.8079Z"
                                        fill="#185ABD"
                                      />
                                      <path
                                        d="M31.9364 22.752H8.12839V28.3736C8.12839 28.7244 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.696 9.45071 29.696H30.6141C30.9647 29.696 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7244 31.9364 28.3736V22.752Z"
                                        fill="#103F91"
                                      />
                                      <path
                                        opacity="0.1"
                                        d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16401 23.7439 0.827669 23.6047 0.579687 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579687 8.25922C0.827669 8.01122 1.16401 7.87194 1.51472 7.87194Z"
                                        fill="#185ABD"
                                      />
                                      <path
                                        d="M12.0468 20.7679H10.2612L8.17801 13.9231L5.99558 20.7679H4.20998L2.22598 10.8479H4.01158L5.40038 17.7919L7.48358 11.0463H8.97161L10.9556 17.7919L12.3444 10.8479H14.0308L12.0468 20.7679Z"
                                        fill="white"
                                      />
                                    </svg>
                                    <span className="relative z-10 align-middle">
                                      Word
                                    </span>
                                    <input
                                      type="radio"
                                      name="hs-pro-dutdm1ts"
                                      className="hidden"
                                      id="hs-pro-dutdm1ts2"
                                    />
                                  </label>
                                </div>
                              </div>
                              <div className="m-2 border-t border-gray-200 dark:border-neutral-700" />
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm1s1"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                    <circle cx={12} cy={7} r={4} />
                                  </svg>
                                  Full name
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm1s1"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm1s2"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                    <circle cx={12} cy={10} r={3} />
                                  </svg>
                                  Address
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm1s2"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm1s3"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                                    <path d="m9 12 2 2 4-4" />
                                  </svg>
                                  Signed up as
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm1s3"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm1s4"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
                                    <rect
                                      width={18}
                                      height={18}
                                      x={3}
                                      y={4}
                                      rx={2}
                                    />
                                    <circle cx={12} cy={10} r={2} />
                                    <line x1={8} x2={8} y1={2} y2={4} />
                                    <line x1={16} x2={16} y1={2} y2={4} />
                                  </svg>
                                  User ID
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm1s4"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm1s5"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                  </svg>
                                  Phone
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm1s5"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="my-1 border-t border-gray-200 dark:border-neutral-700" />
                              <button
                                type="button"
                                className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                Download
                              </button>
                            </div>
                          </div>
                          {/* End Download Dropdown */}
                        </div>
                        {/* End Download Dropdown */}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 dark:divide-neutral-700">
                      <td className="px-3 py-4 size-px whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="text-blue-600 border-gray-300 rounded shrink-0 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        />
                      </td>
                      <td className="relative px-4 py-1 cursor-pointer size-px group pe-20 lg:pe-24">
                        <div className="flex items-center w-full gap-x-3">
                          <span className="flex shrink-0 justify-center items-center size-[38px] bg-white border border-gray-200 text-gray-700 text-xs font-medium uppercase rounded-full dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300">
                            Rd
                          </span>
                          <div className="grow">
                            <span className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                              Rachel Doe
                            </span>
                          </div>
                        </div>
                        <div className="absolute transform -translate-y-1/2 lg:group-hover:block lg:hidden top-1/2 end-4">
                          <button
                            type="button"
                            className="hs-tooltip-toggle py-1.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700"
                            data-hs-overlay="#hs-pro-dutoo"
                          >
                            <svg
                              className="shrink-0 size-3.5 hidden lg:block"
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
                              <rect
                                width={18}
                                height={18}
                                x={3}
                                y={3}
                                rx={2}
                                ry={2}
                              />
                              <line x1={15} x2={15} y1={3} y2={21} />
                              <path d="m10 15-3-3 3-3" />
                            </svg>
                            Open
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                          2952 S Peoria Ave, Tulsa, 74114, United States
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="py-1.5 ps-1.5 pe-2.5 inline-flex items-center gap-x-1.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full dark:bg-yellow-500/10 dark:text-yellow-500">
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
                            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                            <path d="M12 9v4" />
                            <path d="M12 17h.01" />
                          </svg>
                          Fake account
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                          rachel@site.so
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                          +297 000-00-00
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        {/* Download Dropdown */}
                        <div className="hs-dropdown [--auto-close:inside] [--placement:bottom-right] relative inline-flex">
                          <button
                            id="hs-pro-dutdm2"
                            type="button"
                            className="inline-flex items-center justify-center text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm size-7 gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            aria-label="Dropdown"
                          >
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
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1={12} x2={12} y1={15} y2={3} />
                            </svg>
                          </button>
                          {/* Download Dropdown */}
                          <div
                            className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-60 transition-[opacity,margin] duration opacity-0 hidden z-20 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-900"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="hs-pro-dutdm2"
                          >
                            <div className="p-1">
                              <div className="px-3 py-2">
                                <span className="block font-semibold text-gray-800 dark:text-neutral-200">
                                  Download Report
                                </span>
                                <span className="block text-xs text-gray-500 dark:text-neutral-500">
                                  Select Options
                                </span>
                              </div>
                              <div className="m-2 border-t border-gray-200 dark:border-neutral-700" />
                              <div className="px-2 py-1">
                                <div className="flex items-center p-1 bg-gray-100 rounded-xl dark:bg-neutral-800">
                                  <label
                                    htmlFor="hs-pro-dutdm2ts1"
                                    className="relative py-1.5 px-3 w-full cursor-pointer text-center text-sm text-gray-800 rounded-lg has-[:checked]:bg-white has-[:checked]:shadow-sm dark:text-neutral-200 dark:has-[:checked]:bg-neutral-600"
                                  >
                                    <svg
                                      className="relative z-10 me-1.5 inline-block align-middle shrink-0 size-4"
                                      width={32}
                                      height={32}
                                      viewBox="0 0 32 32"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M20.0324 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 15.8079L25.9844 18.3197L31.9364 15.8079V8.86395L20.0324 1.91994Z"
                                        fill="#21A366"
                                      />
                                      <path
                                        d="M8.12839 8.86395H20.0324V15.8079H8.12839V8.86395Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        d="M30.614 1.91994H20.0324V8.86395H31.9364V3.24228C31.9364 2.89158 31.7971 2.55523 31.5491 2.30725C31.3011 2.05926 30.9647 1.91994 30.614 1.91994Z"
                                        fill="#33C481"
                                      />
                                      <path
                                        d="M20.0324 15.8079H8.12839V28.3736C8.12839 28.7243 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.6959 9.45071 29.6959H30.6141C30.9647 29.6959 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7243 31.9364 28.3736V22.7519L20.0324 15.8079Z"
                                        fill="#185C37"
                                      />
                                      <path
                                        d="M20.0324 15.8079H31.9364V22.7519H20.0324V15.8079Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        opacity="0.1"
                                        d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16402 23.7439 0.827672 23.6047 0.579686 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579686 8.25922C0.827672 8.01122 1.16402 7.87194 1.51472 7.87194Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        d="M3.69711 20.7679L6.90722 15.794L3.96694 10.8479H6.33286L7.93791 14.0095C8.08536 14.3091 8.18688 14.5326 8.24248 14.68H8.26328C8.36912 14.4407 8.47984 14.2079 8.5956 13.9817L10.3108 10.8479H12.4822L9.46656 15.7663L12.5586 20.7679H10.2473L8.3932 17.2959C8.30592 17.148 8.23184 16.9927 8.172 16.8317H8.14424C8.09016 16.9891 8.01824 17.1399 7.92998 17.2811L6.02236 20.7679H3.69711Z"
                                        fill="white"
                                      />
                                    </svg>
                                    <span className="relative z-10 align-middle">
                                      Excel
                                    </span>
                                    <input
                                      type="radio"
                                      name="hs-pro-dutdm2ts"
                                      className="hidden"
                                      id="hs-pro-dutdm2ts1"
                                      defaultChecked=""
                                    />
                                  </label>
                                  <label
                                    htmlFor="hs-pro-dutdm2ts2"
                                    className="relative py-1.5 px-3 w-full cursor-pointer text-center text-sm text-gray-800 rounded-lg has-[:checked]:bg-white has-[:checked]:shadow-sm dark:text-neutral-200 dark:has-[:checked]:bg-neutral-600"
                                  >
                                    <svg
                                      className="relative z-10 me-1.5 inline-block align-middle shrink-0 size-4"
                                      width={32}
                                      height={32}
                                      viewBox="0 0 32 32"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M30.6141 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 12.3359L31.9364 8.86395V3.24228C31.9364 2.89158 31.797 2.55523 31.549 2.30725C31.3011 2.05926 30.9647 1.91994 30.6141 1.91994Z"
                                        fill="#41A5EE"
                                      />
                                      <path
                                        d="M31.9364 8.86395H8.12839V15.8079L20.0324 19.2799L31.9364 15.8079V8.86395Z"
                                        fill="#2B7CD3"
                                      />
                                      <path
                                        d="M31.9364 15.8079H8.12839V22.7519L20.0324 26.2239L31.9364 22.7519V15.8079Z"
                                        fill="#185ABD"
                                      />
                                      <path
                                        d="M31.9364 22.752H8.12839V28.3736C8.12839 28.7244 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.696 9.45071 29.696H30.6141C30.9647 29.696 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7244 31.9364 28.3736V22.752Z"
                                        fill="#103F91"
                                      />
                                      <path
                                        opacity="0.1"
                                        d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16401 23.7439 0.827669 23.6047 0.579687 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579687 8.25922C0.827669 8.01122 1.16401 7.87194 1.51472 7.87194Z"
                                        fill="#185ABD"
                                      />
                                      <path
                                        d="M12.0468 20.7679H10.2612L8.17801 13.9231L5.99558 20.7679H4.20998L2.22598 10.8479H4.01158L5.40038 17.7919L7.48358 11.0463H8.97161L10.9556 17.7919L12.3444 10.8479H14.0308L12.0468 20.7679Z"
                                        fill="white"
                                      />
                                    </svg>
                                    <span className="relative z-10 align-middle">
                                      Word
                                    </span>
                                    <input
                                      type="radio"
                                      name="hs-pro-dutdm2ts"
                                      className="hidden"
                                      id="hs-pro-dutdm2ts2"
                                    />
                                  </label>
                                </div>
                              </div>
                              <div className="m-2 border-t border-gray-200 dark:border-neutral-700" />
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm2s1"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                    <circle cx={12} cy={7} r={4} />
                                  </svg>
                                  Full name
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm2s1"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm2s2"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                    <circle cx={12} cy={10} r={3} />
                                  </svg>
                                  Address
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm2s2"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm2s3"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                                    <path d="m9 12 2 2 4-4" />
                                  </svg>
                                  Signed up as
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm2s3"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm2s4"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
                                    <rect
                                      width={18}
                                      height={18}
                                      x={3}
                                      y={4}
                                      rx={2}
                                    />
                                    <circle cx={12} cy={10} r={2} />
                                    <line x1={8} x2={8} y1={2} y2={4} />
                                    <line x1={16} x2={16} y1={2} y2={4} />
                                  </svg>
                                  User ID
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm2s4"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm2s5"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                  </svg>
                                  Phone
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm2s5"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="my-1 border-t border-gray-200 dark:border-neutral-700" />
                              <button
                                type="button"
                                className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                Download
                              </button>
                            </div>
                          </div>
                          {/* End Download Dropdown */}
                        </div>
                        {/* End Download Dropdown */}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 dark:divide-neutral-700">
                      <td className="px-3 py-4 size-px whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="text-blue-600 border-gray-300 rounded shrink-0 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        />
                      </td>
                      <td className="relative px-4 py-1 cursor-pointer size-px group pe-20 lg:pe-24">
                        <div className="flex items-center w-full gap-x-3">
                          <Image
                            width={38}
                            height={38}
                            className="shrink-0 size-[38px] rounded-full"
                            src="https://images.unsplash.com/photo-1601935111741-ae98b2b230b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80"
                            alt="Avatar"
                          />
                          <div className="grow">
                            <span className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                              Costa Quinn
                            </span>
                          </div>
                        </div>
                        <div className="absolute transform -translate-y-1/2 lg:group-hover:block lg:hidden top-1/2 end-4">
                          <button
                            type="button"
                            className="hs-tooltip-toggle py-1.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700"
                            data-hs-overlay="#hs-pro-dutoo"
                          >
                            <svg
                              className="shrink-0 size-3.5 hidden lg:block"
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
                              <rect
                                width={18}
                                height={18}
                                x={3}
                                y={3}
                                rx={2}
                                ry={2}
                              />
                              <line x1={15} x2={15} y1={3} y2={21} />
                              <path d="m10 15-3-3 3-3" />
                            </svg>
                            Open
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                          255 Dock Ln, New Tazewell, 37825, United States
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="py-1.5 ps-1.5 pe-2.5 inline-flex items-center gap-x-1.5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full dark:bg-neutral-500/20 dark:text-neutral-500">
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
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Valid account
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                          costa@site.so
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                          +1 000-00-00
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        {/* Download Dropdown */}
                        <div className="hs-dropdown [--auto-close:inside] [--placement:bottom-right] relative inline-flex">
                          <button
                            id="hs-pro-dutdm3"
                            type="button"
                            className="inline-flex items-center justify-center text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm size-7 gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            aria-label="Dropdown"
                          >
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
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1={12} x2={12} y1={15} y2={3} />
                            </svg>
                          </button>
                          {/* Download Dropdown */}
                          <div
                            className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-60 transition-[opacity,margin] duration opacity-0 hidden z-20 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-900"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="hs-pro-dutdm3"
                          >
                            <div className="p-1">
                              <div className="px-3 py-2">
                                <span className="block font-semibold text-gray-800 dark:text-neutral-200">
                                  Download Report
                                </span>
                                <span className="block text-xs text-gray-500 dark:text-neutral-500">
                                  Select Options
                                </span>
                              </div>
                              <div className="m-2 border-t border-gray-200 dark:border-neutral-700" />
                              <div className="px-2 py-1">
                                <div className="flex items-center p-1 bg-gray-100 rounded-xl dark:bg-neutral-800">
                                  <label
                                    htmlFor="hs-pro-dutdm3ts1"
                                    className="relative py-1.5 px-3 w-full cursor-pointer text-center text-sm text-gray-800 rounded-lg has-[:checked]:bg-white has-[:checked]:shadow-sm dark:text-neutral-200 dark:has-[:checked]:bg-neutral-600"
                                  >
                                    <svg
                                      className="relative z-10 me-1.5 inline-block align-middle shrink-0 size-4"
                                      width={32}
                                      height={32}
                                      viewBox="0 0 32 32"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M20.0324 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 15.8079L25.9844 18.3197L31.9364 15.8079V8.86395L20.0324 1.91994Z"
                                        fill="#21A366"
                                      />
                                      <path
                                        d="M8.12839 8.86395H20.0324V15.8079H8.12839V8.86395Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        d="M30.614 1.91994H20.0324V8.86395H31.9364V3.24228C31.9364 2.89158 31.7971 2.55523 31.5491 2.30725C31.3011 2.05926 30.9647 1.91994 30.614 1.91994Z"
                                        fill="#33C481"
                                      />
                                      <path
                                        d="M20.0324 15.8079H8.12839V28.3736C8.12839 28.7243 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.6959 9.45071 29.6959H30.6141C30.9647 29.6959 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7243 31.9364 28.3736V22.7519L20.0324 15.8079Z"
                                        fill="#185C37"
                                      />
                                      <path
                                        d="M20.0324 15.8079H31.9364V22.7519H20.0324V15.8079Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        opacity="0.1"
                                        d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16402 23.7439 0.827672 23.6047 0.579686 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579686 8.25922C0.827672 8.01122 1.16402 7.87194 1.51472 7.87194Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        d="M3.69711 20.7679L6.90722 15.794L3.96694 10.8479H6.33286L7.93791 14.0095C8.08536 14.3091 8.18688 14.5326 8.24248 14.68H8.26328C8.36912 14.4407 8.47984 14.2079 8.5956 13.9817L10.3108 10.8479H12.4822L9.46656 15.7663L12.5586 20.7679H10.2473L8.3932 17.2959C8.30592 17.148 8.23184 16.9927 8.172 16.8317H8.14424C8.09016 16.9891 8.01824 17.1399 7.92998 17.2811L6.02236 20.7679H3.69711Z"
                                        fill="white"
                                      />
                                    </svg>
                                    <span className="relative z-10 align-middle">
                                      Excel
                                    </span>
                                    <input
                                      type="radio"
                                      name="hs-pro-dutdm3ts"
                                      className="hidden"
                                      id="hs-pro-dutdm3ts1"
                                      defaultChecked=""
                                    />
                                  </label>
                                  <label
                                    htmlFor="hs-pro-dutdm3ts2"
                                    className="relative py-1.5 px-3 w-full cursor-pointer text-center text-sm text-gray-800 rounded-lg has-[:checked]:bg-white has-[:checked]:shadow-sm dark:text-neutral-200 dark:has-[:checked]:bg-neutral-600"
                                  >
                                    <svg
                                      className="relative z-10 me-1.5 inline-block align-middle shrink-0 size-4"
                                      width={32}
                                      height={32}
                                      viewBox="0 0 32 32"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M30.6141 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 12.3359L31.9364 8.86395V3.24228C31.9364 2.89158 31.797 2.55523 31.549 2.30725C31.3011 2.05926 30.9647 1.91994 30.6141 1.91994Z"
                                        fill="#41A5EE"
                                      />
                                      <path
                                        d="M31.9364 8.86395H8.12839V15.8079L20.0324 19.2799L31.9364 15.8079V8.86395Z"
                                        fill="#2B7CD3"
                                      />
                                      <path
                                        d="M31.9364 15.8079H8.12839V22.7519L20.0324 26.2239L31.9364 22.7519V15.8079Z"
                                        fill="#185ABD"
                                      />
                                      <path
                                        d="M31.9364 22.752H8.12839V28.3736C8.12839 28.7244 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.696 9.45071 29.696H30.6141C30.9647 29.696 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7244 31.9364 28.3736V22.752Z"
                                        fill="#103F91"
                                      />
                                      <path
                                        opacity="0.1"
                                        d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16401 23.7439 0.827669 23.6047 0.579687 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579687 8.25922C0.827669 8.01122 1.16401 7.87194 1.51472 7.87194Z"
                                        fill="#185ABD"
                                      />
                                      <path
                                        d="M12.0468 20.7679H10.2612L8.17801 13.9231L5.99558 20.7679H4.20998L2.22598 10.8479H4.01158L5.40038 17.7919L7.48358 11.0463H8.97161L10.9556 17.7919L12.3444 10.8479H14.0308L12.0468 20.7679Z"
                                        fill="white"
                                      />
                                    </svg>
                                    <span className="relative z-10 align-middle">
                                      Word
                                    </span>
                                    <input
                                      type="radio"
                                      name="hs-pro-dutdm3ts"
                                      className="hidden"
                                      id="hs-pro-dutdm3ts2"
                                    />
                                  </label>
                                </div>
                              </div>
                              <div className="m-2 border-t border-gray-200 dark:border-neutral-700" />
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm3s1"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                    <circle cx={12} cy={7} r={4} />
                                  </svg>
                                  Full name
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm3s1"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm3s2"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                    <circle cx={12} cy={10} r={3} />
                                  </svg>
                                  Address
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm3s2"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm3s3"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                                    <path d="m9 12 2 2 4-4" />
                                  </svg>
                                  Signed up as
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm3s3"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm3s4"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
                                    <rect
                                      width={18}
                                      height={18}
                                      x={3}
                                      y={4}
                                      rx={2}
                                    />
                                    <circle cx={12} cy={10} r={2} />
                                    <line x1={8} x2={8} y1={2} y2={4} />
                                    <line x1={16} x2={16} y1={2} y2={4} />
                                  </svg>
                                  User ID
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm3s4"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm3s5"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                  </svg>
                                  Phone
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm3s5"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="my-1 border-t border-gray-200 dark:border-neutral-700" />
                              <button
                                type="button"
                                className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                Download
                              </button>
                            </div>
                          </div>
                          {/* End Download Dropdown */}
                        </div>
                        {/* End Download Dropdown */}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 dark:divide-neutral-700">
                      <td className="px-3 py-4 size-px whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="text-blue-600 border-gray-300 rounded shrink-0 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        />
                      </td>
                      <td className="relative px-4 py-1 cursor-pointer size-px group pe-20 lg:pe-24">
                        <div className="flex items-center w-full gap-x-3">
                          <Image
                          width={38}
                          height={38}
                            className="shrink-0 size-[38px] rounded-full"
                            src="https://images.unsplash.com/photo-1570654639102-bdd95efeca7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80"
                            alt="Avatar"
                          />
                          <div className="grow">
                            <span className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                              Anna Richard
                            </span>
                          </div>
                        </div>
                        <div className="absolute transform -translate-y-1/2 lg:group-hover:block lg:hidden top-1/2 end-4">
                          <button
                            type="button"
                            className="hs-tooltip-toggle py-1.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700"
                            data-hs-overlay="#hs-pro-dutoo"
                          >
                            <svg
                              className="shrink-0 size-3.5 hidden lg:block"
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
                              <rect
                                width={18}
                                height={18}
                                x={3}
                                y={3}
                                rx={2}
                                ry={2}
                              />
                              <line x1={15} x2={15} y1={3} y2={21} />
                              <path d="m10 15-3-3 3-3" />
                            </svg>
                            Open
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                          4970 Park Ave W, Ohio, 44273, United States
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="py-1.5 ps-1.5 pe-2.5 inline-flex items-center gap-x-1.5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full dark:bg-neutral-500/20 dark:text-neutral-500">
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
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Valid account
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                          anne@site.so
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                          +1 230-28-00
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        {/* Download Dropdown */}
                        <div className="hs-dropdown [--auto-close:inside] [--placement:bottom-right] relative inline-flex">
                          <button
                            id="hs-pro-dutdm4"
                            type="button"
                            className="inline-flex items-center justify-center text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm size-7 gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            aria-label="Dropdown"
                          >
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
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1={12} x2={12} y1={15} y2={3} />
                            </svg>
                          </button>
                          {/* Download Dropdown */}
                          <div
                            className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-60 transition-[opacity,margin] duration opacity-0 hidden z-20 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-900"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="hs-pro-dutdm4"
                          >
                            <div className="p-1">
                              <div className="px-3 py-2">
                                <span className="block font-semibold text-gray-800 dark:text-neutral-200">
                                  Download Report
                                </span>
                                <span className="block text-xs text-gray-500 dark:text-neutral-500">
                                  Select Options
                                </span>
                              </div>
                              <div className="m-2 border-t border-gray-200 dark:border-neutral-700" />
                              <div className="px-2 py-1">
                                <div className="flex items-center p-1 bg-gray-100 rounded-xl dark:bg-neutral-800">
                                  <label
                                    htmlFor="hs-pro-dutdm4ts1"
                                    className="relative py-1.5 px-3 w-full cursor-pointer text-center text-sm text-gray-800 rounded-lg has-[:checked]:bg-white has-[:checked]:shadow-sm dark:text-neutral-200 dark:has-[:checked]:bg-neutral-600"
                                  >
                                    <svg
                                      className="relative z-10 me-1.5 inline-block align-middle shrink-0 size-4"
                                      width={32}
                                      height={32}
                                      viewBox="0 0 32 32"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M20.0324 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 15.8079L25.9844 18.3197L31.9364 15.8079V8.86395L20.0324 1.91994Z"
                                        fill="#21A366"
                                      />
                                      <path
                                        d="M8.12839 8.86395H20.0324V15.8079H8.12839V8.86395Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        d="M30.614 1.91994H20.0324V8.86395H31.9364V3.24228C31.9364 2.89158 31.7971 2.55523 31.5491 2.30725C31.3011 2.05926 30.9647 1.91994 30.614 1.91994Z"
                                        fill="#33C481"
                                      />
                                      <path
                                        d="M20.0324 15.8079H8.12839V28.3736C8.12839 28.7243 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.6959 9.45071 29.6959H30.6141C30.9647 29.6959 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7243 31.9364 28.3736V22.7519L20.0324 15.8079Z"
                                        fill="#185C37"
                                      />
                                      <path
                                        d="M20.0324 15.8079H31.9364V22.7519H20.0324V15.8079Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        opacity="0.1"
                                        d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16402 23.7439 0.827672 23.6047 0.579686 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579686 8.25922C0.827672 8.01122 1.16402 7.87194 1.51472 7.87194Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        d="M3.69711 20.7679L6.90722 15.794L3.96694 10.8479H6.33286L7.93791 14.0095C8.08536 14.3091 8.18688 14.5326 8.24248 14.68H8.26328C8.36912 14.4407 8.47984 14.2079 8.5956 13.9817L10.3108 10.8479H12.4822L9.46656 15.7663L12.5586 20.7679H10.2473L8.3932 17.2959C8.30592 17.148 8.23184 16.9927 8.172 16.8317H8.14424C8.09016 16.9891 8.01824 17.1399 7.92998 17.2811L6.02236 20.7679H3.69711Z"
                                        fill="white"
                                      />
                                    </svg>
                                    <span className="relative z-10 align-middle">
                                      Excel
                                    </span>
                                    <input
                                      type="radio"
                                      name="hs-pro-dutdm4ts"
                                      className="hidden"
                                      id="hs-pro-dutdm4ts1"
                                      defaultChecked=""
                                    />
                                  </label>
                                  <label
                                    htmlFor="hs-pro-dutdm4ts2"
                                    className="relative py-1.5 px-3 w-full cursor-pointer text-center text-sm text-gray-800 rounded-lg has-[:checked]:bg-white has-[:checked]:shadow-sm dark:text-neutral-200 dark:has-[:checked]:bg-neutral-600"
                                  >
                                    <svg
                                      className="relative z-10 me-1.5 inline-block align-middle shrink-0 size-4"
                                      width={32}
                                      height={32}
                                      viewBox="0 0 32 32"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M30.6141 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 12.3359L31.9364 8.86395V3.24228C31.9364 2.89158 31.797 2.55523 31.549 2.30725C31.3011 2.05926 30.9647 1.91994 30.6141 1.91994Z"
                                        fill="#41A5EE"
                                      />
                                      <path
                                        d="M31.9364 8.86395H8.12839V15.8079L20.0324 19.2799L31.9364 15.8079V8.86395Z"
                                        fill="#2B7CD3"
                                      />
                                      <path
                                        d="M31.9364 15.8079H8.12839V22.7519L20.0324 26.2239L31.9364 22.7519V15.8079Z"
                                        fill="#185ABD"
                                      />
                                      <path
                                        d="M31.9364 22.752H8.12839V28.3736C8.12839 28.7244 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.696 9.45071 29.696H30.6141C30.9647 29.696 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7244 31.9364 28.3736V22.752Z"
                                        fill="#103F91"
                                      />
                                      <path
                                        opacity="0.1"
                                        d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16401 23.7439 0.827669 23.6047 0.579687 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579687 8.25922C0.827669 8.01122 1.16401 7.87194 1.51472 7.87194Z"
                                        fill="#185ABD"
                                      />
                                      <path
                                        d="M12.0468 20.7679H10.2612L8.17801 13.9231L5.99558 20.7679H4.20998L2.22598 10.8479H4.01158L5.40038 17.7919L7.48358 11.0463H8.97161L10.9556 17.7919L12.3444 10.8479H14.0308L12.0468 20.7679Z"
                                        fill="white"
                                      />
                                    </svg>
                                    <span className="relative z-10 align-middle">
                                      Word
                                    </span>
                                    <input
                                      type="radio"
                                      name="hs-pro-dutdm4ts"
                                      className="hidden"
                                      id="hs-pro-dutdm4ts2"
                                    />
                                  </label>
                                </div>
                              </div>
                              <div className="m-2 border-t border-gray-200 dark:border-neutral-700" />
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm4s1"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                    <circle cx={12} cy={7} r={4} />
                                  </svg>
                                  Full name
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm4s1"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm4s2"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                    <circle cx={12} cy={10} r={3} />
                                  </svg>
                                  Address
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm4s2"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm4s3"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                                    <path d="m9 12 2 2 4-4" />
                                  </svg>
                                  Signed up as
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm4s3"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm4s4"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
                                    <rect
                                      width={18}
                                      height={18}
                                      x={3}
                                      y={4}
                                      rx={2}
                                    />
                                    <circle cx={12} cy={10} r={2} />
                                    <line x1={8} x2={8} y1={2} y2={4} />
                                    <line x1={16} x2={16} y1={2} y2={4} />
                                  </svg>
                                  User ID
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm4s4"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm4s5"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                  </svg>
                                  Phone
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm4s5"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="my-1 border-t border-gray-200 dark:border-neutral-700" />
                              <button
                                type="button"
                                className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                Download
                              </button>
                            </div>
                          </div>
                          {/* End Download Dropdown */}
                        </div>
                        {/* End Download Dropdown */}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 dark:divide-neutral-700">
                      <td className="px-3 py-4 size-px whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="text-blue-600 border-gray-300 rounded shrink-0 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        />
                      </td>
                      <td className="relative px-4 py-1 cursor-pointer size-px group pe-20 lg:pe-24">
                        <div className="flex items-center w-full gap-x-3">
                          <span className="flex shrink-0 justify-center items-center size-[38px] bg-white border border-gray-200 text-gray-700 text-xs font-medium uppercase rounded-full dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300">
                            Bd
                          </span>
                          <div className="grow">
                            <span className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                              Bob Dean
                            </span>
                          </div>
                        </div>
                        <div className="absolute transform -translate-y-1/2 lg:group-hover:block lg:hidden top-1/2 end-4">
                          <button
                            type="button"
                            className="hs-tooltip-toggle py-1.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700"
                            data-hs-overlay="#hs-pro-dutoo"
                          >
                            <svg
                              className="shrink-0 size-3.5 hidden lg:block"
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
                              <rect
                                width={18}
                                height={18}
                                x={3}
                                y={3}
                                rx={2}
                                ry={2}
                              />
                              <line x1={15} x2={15} y1={3} y2={21} />
                              <path d="m10 15-3-3 3-3" />
                            </svg>
                            Open
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                          4222 River Rd, Columbus, 31904, United States
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="py-1.5 ps-1.5 pe-2.5 inline-flex items-center gap-x-1.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full dark:bg-yellow-500/10 dark:text-yellow-500">
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
                            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                            <path d="M12 9v4" />
                            <path d="M12 17h.01" />
                          </svg>
                          Fake account
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                          bob@site.so
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                          +33 000-00-00
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        {/* Download Dropdown */}
                        <div className="hs-dropdown [--auto-close:inside] [--placement:bottom-right] relative inline-flex">
                          <button
                            id="hs-pro-dutdm5"
                            type="button"
                            className="inline-flex items-center justify-center text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm size-7 gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            aria-label="Dropdown"
                          >
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
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1={12} x2={12} y1={15} y2={3} />
                            </svg>
                          </button>
                          {/* Download Dropdown */}
                          <div
                            className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-60 transition-[opacity,margin] duration opacity-0 hidden z-20 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-900"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="hs-pro-dutdm5"
                          >
                            <div className="p-1">
                              <div className="px-3 py-2">
                                <span className="block font-semibold text-gray-800 dark:text-neutral-200">
                                  Download Report
                                </span>
                                <span className="block text-xs text-gray-500 dark:text-neutral-500">
                                  Select Options
                                </span>
                              </div>
                              <div className="m-2 border-t border-gray-200 dark:border-neutral-700" />
                              <div className="px-2 py-1">
                                <div className="flex items-center p-1 bg-gray-100 rounded-xl dark:bg-neutral-800">
                                  <label
                                    htmlFor="hs-pro-dutdm5ts1"
                                    className="relative py-1.5 px-3 w-full cursor-pointer text-center text-sm text-gray-800 rounded-lg has-[:checked]:bg-white has-[:checked]:shadow-sm dark:text-neutral-200 dark:has-[:checked]:bg-neutral-600"
                                  >
                                    <svg
                                      className="relative z-10 me-1.5 inline-block align-middle shrink-0 size-4"
                                      width={32}
                                      height={32}
                                      viewBox="0 0 32 32"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M20.0324 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 15.8079L25.9844 18.3197L31.9364 15.8079V8.86395L20.0324 1.91994Z"
                                        fill="#21A366"
                                      />
                                      <path
                                        d="M8.12839 8.86395H20.0324V15.8079H8.12839V8.86395Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        d="M30.614 1.91994H20.0324V8.86395H31.9364V3.24228C31.9364 2.89158 31.7971 2.55523 31.5491 2.30725C31.3011 2.05926 30.9647 1.91994 30.614 1.91994Z"
                                        fill="#33C481"
                                      />
                                      <path
                                        d="M20.0324 15.8079H8.12839V28.3736C8.12839 28.7243 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.6959 9.45071 29.6959H30.6141C30.9647 29.6959 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7243 31.9364 28.3736V22.7519L20.0324 15.8079Z"
                                        fill="#185C37"
                                      />
                                      <path
                                        d="M20.0324 15.8079H31.9364V22.7519H20.0324V15.8079Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        opacity="0.1"
                                        d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16402 23.7439 0.827672 23.6047 0.579686 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579686 8.25922C0.827672 8.01122 1.16402 7.87194 1.51472 7.87194Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        d="M3.69711 20.7679L6.90722 15.794L3.96694 10.8479H6.33286L7.93791 14.0095C8.08536 14.3091 8.18688 14.5326 8.24248 14.68H8.26328C8.36912 14.4407 8.47984 14.2079 8.5956 13.9817L10.3108 10.8479H12.4822L9.46656 15.7663L12.5586 20.7679H10.2473L8.3932 17.2959C8.30592 17.148 8.23184 16.9927 8.172 16.8317H8.14424C8.09016 16.9891 8.01824 17.1399 7.92998 17.2811L6.02236 20.7679H3.69711Z"
                                        fill="white"
                                      />
                                    </svg>
                                    <span className="relative z-10 align-middle">
                                      Excel
                                    </span>
                                    <input
                                      type="radio"
                                      name="hs-pro-dutdm5ts"
                                      className="hidden"
                                      id="hs-pro-dutdm5ts1"
                                      defaultChecked=""
                                    />
                                  </label>
                                  <label
                                    htmlFor="hs-pro-dutdm5ts2"
                                    className="relative py-1.5 px-3 w-full cursor-pointer text-center text-sm text-gray-800 rounded-lg has-[:checked]:bg-white has-[:checked]:shadow-sm dark:text-neutral-200 dark:has-[:checked]:bg-neutral-600"
                                  >
                                    <svg
                                      className="relative z-10 me-1.5 inline-block align-middle shrink-0 size-4"
                                      width={32}
                                      height={32}
                                      viewBox="0 0 32 32"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M30.6141 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 12.3359L31.9364 8.86395V3.24228C31.9364 2.89158 31.797 2.55523 31.549 2.30725C31.3011 2.05926 30.9647 1.91994 30.6141 1.91994Z"
                                        fill="#41A5EE"
                                      />
                                      <path
                                        d="M31.9364 8.86395H8.12839V15.8079L20.0324 19.2799L31.9364 15.8079V8.86395Z"
                                        fill="#2B7CD3"
                                      />
                                      <path
                                        d="M31.9364 15.8079H8.12839V22.7519L20.0324 26.2239L31.9364 22.7519V15.8079Z"
                                        fill="#185ABD"
                                      />
                                      <path
                                        d="M31.9364 22.752H8.12839V28.3736C8.12839 28.7244 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.696 9.45071 29.696H30.6141C30.9647 29.696 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7244 31.9364 28.3736V22.752Z"
                                        fill="#103F91"
                                      />
                                      <path
                                        opacity="0.1"
                                        d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16401 23.7439 0.827669 23.6047 0.579687 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579687 8.25922C0.827669 8.01122 1.16401 7.87194 1.51472 7.87194Z"
                                        fill="#185ABD"
                                      />
                                      <path
                                        d="M12.0468 20.7679H10.2612L8.17801 13.9231L5.99558 20.7679H4.20998L2.22598 10.8479H4.01158L5.40038 17.7919L7.48358 11.0463H8.97161L10.9556 17.7919L12.3444 10.8479H14.0308L12.0468 20.7679Z"
                                        fill="white"
                                      />
                                    </svg>
                                    <span className="relative z-10 align-middle">
                                      Word
                                    </span>
                                    <input
                                      type="radio"
                                      name="hs-pro-dutdm5ts"
                                      className="hidden"
                                      id="hs-pro-dutdm5ts2"
                                    />
                                  </label>
                                </div>
                              </div>
                              <div className="m-2 border-t border-gray-200 dark:border-neutral-700" />
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm5s1"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                    <circle cx={12} cy={7} r={4} />
                                  </svg>
                                  Full name
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm5s1"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm5s2"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                    <circle cx={12} cy={10} r={3} />
                                  </svg>
                                  Address
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm5s2"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm5s3"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                                    <path d="m9 12 2 2 4-4" />
                                  </svg>
                                  Signed up as
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm5s3"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm5s4"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
                                    <rect
                                      width={18}
                                      height={18}
                                      x={3}
                                      y={4}
                                      rx={2}
                                    />
                                    <circle cx={12} cy={10} r={2} />
                                    <line x1={8} x2={8} y1={2} y2={4} />
                                    <line x1={16} x2={16} y1={2} y2={4} />
                                  </svg>
                                  User ID
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm5s4"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm5s5"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                  </svg>
                                  Phone
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm5s5"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="my-1 border-t border-gray-200 dark:border-neutral-700" />
                              <button
                                type="button"
                                className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                Download
                              </button>
                            </div>
                          </div>
                          {/* End Download Dropdown */}
                        </div>
                        {/* End Download Dropdown */}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 dark:divide-neutral-700">
                      <td className="px-3 py-4 size-px whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="text-blue-600 border-gray-300 rounded shrink-0 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        />
                      </td>
                      <td className="relative px-4 py-1 cursor-pointer size-px group pe-20 lg:pe-24">
                        <div className="flex items-center w-full gap-x-3">
                          <span className="flex shrink-0 justify-center items-center size-[38px] bg-white border border-gray-200 text-gray-700 text-xs font-medium uppercase rounded-full dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300">
                            Mc
                          </span>
                          <div className="grow">
                            <span className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                              Mark Colbert
                            </span>
                          </div>
                        </div>
                        <div className="absolute transform -translate-y-1/2 lg:group-hover:block lg:hidden top-1/2 end-4">
                          <button
                            type="button"
                            className="hs-tooltip-toggle py-1.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700"
                            data-hs-overlay="#hs-pro-dutoo"
                          >
                            <svg
                              className="shrink-0 size-3.5 hidden lg:block"
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
                              <rect
                                width={18}
                                height={18}
                                x={3}
                                y={3}
                                rx={2}
                                ry={2}
                              />
                              <line x1={15} x2={15} y1={3} y2={21} />
                              <path d="m10 15-3-3 3-3" />
                            </svg>
                            Open
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                          2952 S Peoria Ave, Tulsa, 74114, United States
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="py-1.5 ps-1.5 pe-2.5 inline-flex items-center gap-x-1.5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full dark:bg-neutral-500/20 dark:text-neutral-500">
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
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Valid account
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                          mark@site.so
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                          +420 000-00-00
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        {/* Download Dropdown */}
                        <div className="hs-dropdown [--auto-close:inside] [--placement:bottom-right] relative inline-flex">
                          <button
                            id="hs-pro-dutdm6"
                            type="button"
                            className="inline-flex items-center justify-center text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm size-7 gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            aria-label="Dropdown"
                          >
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
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1={12} x2={12} y1={15} y2={3} />
                            </svg>
                          </button>
                          {/* Download Dropdown */}
                          <div
                            className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-60 transition-[opacity,margin] duration opacity-0 hidden z-20 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-900"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="hs-pro-dutdm6"
                          >
                            <div className="p-1">
                              <div className="px-3 py-2">
                                <span className="block font-semibold text-gray-800 dark:text-neutral-200">
                                  Download Report
                                </span>
                                <span className="block text-xs text-gray-500 dark:text-neutral-500">
                                  Select Options
                                </span>
                              </div>
                              <div className="m-2 border-t border-gray-200 dark:border-neutral-700" />
                              <div className="px-2 py-1">
                                <div className="flex items-center p-1 bg-gray-100 rounded-xl dark:bg-neutral-800">
                                  <label
                                    htmlFor="hs-pro-dutdm6ts1"
                                    className="relative py-1.5 px-3 w-full cursor-pointer text-center text-sm text-gray-800 rounded-lg has-[:checked]:bg-white has-[:checked]:shadow-sm dark:text-neutral-200 dark:has-[:checked]:bg-neutral-600"
                                  >
                                    <svg
                                      className="relative z-10 me-1.5 inline-block align-middle shrink-0 size-4"
                                      width={32}
                                      height={32}
                                      viewBox="0 0 32 32"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M20.0324 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 15.8079L25.9844 18.3197L31.9364 15.8079V8.86395L20.0324 1.91994Z"
                                        fill="#21A366"
                                      />
                                      <path
                                        d="M8.12839 8.86395H20.0324V15.8079H8.12839V8.86395Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        d="M30.614 1.91994H20.0324V8.86395H31.9364V3.24228C31.9364 2.89158 31.7971 2.55523 31.5491 2.30725C31.3011 2.05926 30.9647 1.91994 30.614 1.91994Z"
                                        fill="#33C481"
                                      />
                                      <path
                                        d="M20.0324 15.8079H8.12839V28.3736C8.12839 28.7243 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.6959 9.45071 29.6959H30.6141C30.9647 29.6959 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7243 31.9364 28.3736V22.7519L20.0324 15.8079Z"
                                        fill="#185C37"
                                      />
                                      <path
                                        d="M20.0324 15.8079H31.9364V22.7519H20.0324V15.8079Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        opacity="0.1"
                                        d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16402 23.7439 0.827672 23.6047 0.579686 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579686 8.25922C0.827672 8.01122 1.16402 7.87194 1.51472 7.87194Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        d="M3.69711 20.7679L6.90722 15.794L3.96694 10.8479H6.33286L7.93791 14.0095C8.08536 14.3091 8.18688 14.5326 8.24248 14.68H8.26328C8.36912 14.4407 8.47984 14.2079 8.5956 13.9817L10.3108 10.8479H12.4822L9.46656 15.7663L12.5586 20.7679H10.2473L8.3932 17.2959C8.30592 17.148 8.23184 16.9927 8.172 16.8317H8.14424C8.09016 16.9891 8.01824 17.1399 7.92998 17.2811L6.02236 20.7679H3.69711Z"
                                        fill="white"
                                      />
                                    </svg>
                                    <span className="relative z-10 align-middle">
                                      Excel
                                    </span>
                                    <input
                                      type="radio"
                                      name="hs-pro-dutdm6ts"
                                      className="hidden"
                                      id="hs-pro-dutdm6ts1"
                                      defaultChecked=""
                                    />
                                  </label>
                                  <label
                                    htmlFor="hs-pro-dutdm6ts2"
                                    className="relative py-1.5 px-3 w-full cursor-pointer text-center text-sm text-gray-800 rounded-lg has-[:checked]:bg-white has-[:checked]:shadow-sm dark:text-neutral-200 dark:has-[:checked]:bg-neutral-600"
                                  >
                                    <svg
                                      className="relative z-10 me-1.5 inline-block align-middle shrink-0 size-4"
                                      width={32}
                                      height={32}
                                      viewBox="0 0 32 32"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M30.6141 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 12.3359L31.9364 8.86395V3.24228C31.9364 2.89158 31.797 2.55523 31.549 2.30725C31.3011 2.05926 30.9647 1.91994 30.6141 1.91994Z"
                                        fill="#41A5EE"
                                      />
                                      <path
                                        d="M31.9364 8.86395H8.12839V15.8079L20.0324 19.2799L31.9364 15.8079V8.86395Z"
                                        fill="#2B7CD3"
                                      />
                                      <path
                                        d="M31.9364 15.8079H8.12839V22.7519L20.0324 26.2239L31.9364 22.7519V15.8079Z"
                                        fill="#185ABD"
                                      />
                                      <path
                                        d="M31.9364 22.752H8.12839V28.3736C8.12839 28.7244 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.696 9.45071 29.696H30.6141C30.9647 29.696 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7244 31.9364 28.3736V22.752Z"
                                        fill="#103F91"
                                      />
                                      <path
                                        opacity="0.1"
                                        d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16401 23.7439 0.827669 23.6047 0.579687 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579687 8.25922C0.827669 8.01122 1.16401 7.87194 1.51472 7.87194Z"
                                        fill="#185ABD"
                                      />
                                      <path
                                        d="M12.0468 20.7679H10.2612L8.17801 13.9231L5.99558 20.7679H4.20998L2.22598 10.8479H4.01158L5.40038 17.7919L7.48358 11.0463H8.97161L10.9556 17.7919L12.3444 10.8479H14.0308L12.0468 20.7679Z"
                                        fill="white"
                                      />
                                    </svg>
                                    <span className="relative z-10 align-middle">
                                      Word
                                    </span>
                                    <input
                                      type="radio"
                                      name="hs-pro-dutdm6ts"
                                      className="hidden"
                                      id="hs-pro-dutdm6ts2"
                                    />
                                  </label>
                                </div>
                              </div>
                              <div className="m-2 border-t border-gray-200 dark:border-neutral-700" />
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm6s1"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                    <circle cx={12} cy={7} r={4} />
                                  </svg>
                                  Full name
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm6s1"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm6s2"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                    <circle cx={12} cy={10} r={3} />
                                  </svg>
                                  Address
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm6s2"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm6s3"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                                    <path d="m9 12 2 2 4-4" />
                                  </svg>
                                  Signed up as
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm6s3"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm6s4"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
                                    <rect
                                      width={18}
                                      height={18}
                                      x={3}
                                      y={4}
                                      rx={2}
                                    />
                                    <circle cx={12} cy={10} r={2} />
                                    <line x1={8} x2={8} y1={2} y2={4} />
                                    <line x1={16} x2={16} y1={2} y2={4} />
                                  </svg>
                                  User ID
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm6s4"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm6s5"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                  </svg>
                                  Phone
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm6s5"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="my-1 border-t border-gray-200 dark:border-neutral-700" />
                              <button
                                type="button"
                                className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                Download
                              </button>
                            </div>
                          </div>
                          {/* End Download Dropdown */}
                        </div>
                        {/* End Download Dropdown */}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 dark:divide-neutral-700">
                      <td className="px-3 py-4 size-px whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="text-blue-600 border-gray-300 rounded shrink-0 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        />
                      </td>
                      <td className="relative px-4 py-1 cursor-pointer size-px group pe-20 lg:pe-24">
                        <div className="flex items-center w-full gap-x-3">
                          <span className="flex shrink-0 justify-center items-center size-[38px] bg-white border border-gray-200 text-gray-700 text-xs font-medium uppercase rounded-full dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300">
                            Fh
                          </span>
                          <div className="grow">
                            <span className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                              Finch Hoot
                            </span>
                          </div>
                        </div>
                        <div className="absolute transform -translate-y-1/2 lg:group-hover:block lg:hidden top-1/2 end-4">
                          <button
                            type="button"
                            className="hs-tooltip-toggle py-1.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700"
                            data-hs-overlay="#hs-pro-dutoo"
                          >
                            <svg
                              className="shrink-0 size-3.5 hidden lg:block"
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
                              <rect
                                width={18}
                                height={18}
                                x={3}
                                y={3}
                                rx={2}
                                ry={2}
                              />
                              <line x1={15} x2={15} y1={3} y2={21} />
                              <path d="m10 15-3-3 3-3" />
                            </svg>
                            Open
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                          1818 H St NW, Washington, 20433, United States
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="py-1.5 ps-1.5 pe-2.5 inline-flex items-center gap-x-1.5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full dark:bg-neutral-500/20 dark:text-neutral-500">
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
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Valid account
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                          finch@site.so
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400"></span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        {/* Download Dropdown */}
                        <div className="hs-dropdown [--auto-close:inside] [--placement:bottom-right] relative inline-flex">
                          <button
                            id="hs-pro-dutdm7"
                            type="button"
                            className="inline-flex items-center justify-center text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm size-7 gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            aria-label="Dropdown"
                          >
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
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1={12} x2={12} y1={15} y2={3} />
                            </svg>
                          </button>
                          {/* Download Dropdown */}
                          <div
                            className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-60 transition-[opacity,margin] duration opacity-0 hidden z-20 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-900"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="hs-pro-dutdm7"
                          >
                            <div className="p-1">
                              <div className="px-3 py-2">
                                <span className="block font-semibold text-gray-800 dark:text-neutral-200">
                                  Download Report
                                </span>
                                <span className="block text-xs text-gray-500 dark:text-neutral-500">
                                  Select Options
                                </span>
                              </div>
                              <div className="m-2 border-t border-gray-200 dark:border-neutral-700" />
                              <div className="px-2 py-1">
                                <div className="flex items-center p-1 bg-gray-100 rounded-xl dark:bg-neutral-800">
                                  <label
                                    htmlFor="hs-pro-dutdm7ts1"
                                    className="relative py-1.5 px-3 w-full cursor-pointer text-center text-sm text-gray-800 rounded-lg has-[:checked]:bg-white has-[:checked]:shadow-sm dark:text-neutral-200 dark:has-[:checked]:bg-neutral-600"
                                  >
                                    <svg
                                      className="relative z-10 me-1.5 inline-block align-middle shrink-0 size-4"
                                      width={32}
                                      height={32}
                                      viewBox="0 0 32 32"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M20.0324 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 15.8079L25.9844 18.3197L31.9364 15.8079V8.86395L20.0324 1.91994Z"
                                        fill="#21A366"
                                      />
                                      <path
                                        d="M8.12839 8.86395H20.0324V15.8079H8.12839V8.86395Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        d="M30.614 1.91994H20.0324V8.86395H31.9364V3.24228C31.9364 2.89158 31.7971 2.55523 31.5491 2.30725C31.3011 2.05926 30.9647 1.91994 30.614 1.91994Z"
                                        fill="#33C481"
                                      />
                                      <path
                                        d="M20.0324 15.8079H8.12839V28.3736C8.12839 28.7243 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.6959 9.45071 29.6959H30.6141C30.9647 29.6959 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7243 31.9364 28.3736V22.7519L20.0324 15.8079Z"
                                        fill="#185C37"
                                      />
                                      <path
                                        d="M20.0324 15.8079H31.9364V22.7519H20.0324V15.8079Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        opacity="0.1"
                                        d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16402 23.7439 0.827672 23.6047 0.579686 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579686 8.25922C0.827672 8.01122 1.16402 7.87194 1.51472 7.87194Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        d="M3.69711 20.7679L6.90722 15.794L3.96694 10.8479H6.33286L7.93791 14.0095C8.08536 14.3091 8.18688 14.5326 8.24248 14.68H8.26328C8.36912 14.4407 8.47984 14.2079 8.5956 13.9817L10.3108 10.8479H12.4822L9.46656 15.7663L12.5586 20.7679H10.2473L8.3932 17.2959C8.30592 17.148 8.23184 16.9927 8.172 16.8317H8.14424C8.09016 16.9891 8.01824 17.1399 7.92998 17.2811L6.02236 20.7679H3.69711Z"
                                        fill="white"
                                      />
                                    </svg>
                                    <span className="relative z-10 align-middle">
                                      Excel
                                    </span>
                                    <input
                                      type="radio"
                                      name="hs-pro-dutdm7ts"
                                      className="hidden"
                                      id="hs-pro-dutdm7ts1"
                                      defaultChecked=""
                                    />
                                  </label>
                                  <label
                                    htmlFor="hs-pro-dutdm7ts2"
                                    className="relative py-1.5 px-3 w-full cursor-pointer text-center text-sm text-gray-800 rounded-lg has-[:checked]:bg-white has-[:checked]:shadow-sm dark:text-neutral-200 dark:has-[:checked]:bg-neutral-600"
                                  >
                                    <svg
                                      className="relative z-10 me-1.5 inline-block align-middle shrink-0 size-4"
                                      width={32}
                                      height={32}
                                      viewBox="0 0 32 32"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M30.6141 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 12.3359L31.9364 8.86395V3.24228C31.9364 2.89158 31.797 2.55523 31.549 2.30725C31.3011 2.05926 30.9647 1.91994 30.6141 1.91994Z"
                                        fill="#41A5EE"
                                      />
                                      <path
                                        d="M31.9364 8.86395H8.12839V15.8079L20.0324 19.2799L31.9364 15.8079V8.86395Z"
                                        fill="#2B7CD3"
                                      />
                                      <path
                                        d="M31.9364 15.8079H8.12839V22.7519L20.0324 26.2239L31.9364 22.7519V15.8079Z"
                                        fill="#185ABD"
                                      />
                                      <path
                                        d="M31.9364 22.752H8.12839V28.3736C8.12839 28.7244 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.696 9.45071 29.696H30.6141C30.9647 29.696 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7244 31.9364 28.3736V22.752Z"
                                        fill="#103F91"
                                      />
                                      <path
                                        opacity="0.1"
                                        d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16401 23.7439 0.827669 23.6047 0.579687 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579687 8.25922C0.827669 8.01122 1.16401 7.87194 1.51472 7.87194Z"
                                        fill="#185ABD"
                                      />
                                      <path
                                        d="M12.0468 20.7679H10.2612L8.17801 13.9231L5.99558 20.7679H4.20998L2.22598 10.8479H4.01158L5.40038 17.7919L7.48358 11.0463H8.97161L10.9556 17.7919L12.3444 10.8479H14.0308L12.0468 20.7679Z"
                                        fill="white"
                                      />
                                    </svg>
                                    <span className="relative z-10 align-middle">
                                      Word
                                    </span>
                                    <input
                                      type="radio"
                                      name="hs-pro-dutdm7ts"
                                      className="hidden"
                                      id="hs-pro-dutdm7ts2"
                                    />
                                  </label>
                                </div>
                              </div>
                              <div className="m-2 border-t border-gray-200 dark:border-neutral-700" />
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm7s1"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                    <circle cx={12} cy={7} r={4} />
                                  </svg>
                                  Full name
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm7s1"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm7s2"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                    <circle cx={12} cy={10} r={3} />
                                  </svg>
                                  Address
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm7s2"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm7s3"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                                    <path d="m9 12 2 2 4-4" />
                                  </svg>
                                  Signed up as
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm7s3"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm7s4"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
                                    <rect
                                      width={18}
                                      height={18}
                                      x={3}
                                      y={4}
                                      rx={2}
                                    />
                                    <circle cx={12} cy={10} r={2} />
                                    <line x1={8} x2={8} y1={2} y2={4} />
                                    <line x1={16} x2={16} y1={2} y2={4} />
                                  </svg>
                                  User ID
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm7s4"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm7s5"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                  </svg>
                                  Phone
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm7s5"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="my-1 border-t border-gray-200 dark:border-neutral-700" />
                              <button
                                type="button"
                                className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                Download
                              </button>
                            </div>
                          </div>
                          {/* End Download Dropdown */}
                        </div>
                        {/* End Download Dropdown */}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 dark:divide-neutral-700">
                      <td className="px-3 py-4 size-px whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="text-blue-600 border-gray-300 rounded shrink-0 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        />
                      </td>
                      <td className="relative px-4 py-1 cursor-pointer size-px group pe-20 lg:pe-24">
                        <div className="flex items-center w-full gap-x-3">
                          <Image
                          width={38}
                          height={38}
                            className="shrink-0 size-[38px] rounded-full"
                            src="https://images.unsplash.com/photo-1659482634023-2c4fda99ac0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80"
                            alt="Avatar"
                          />
                          <div className="grow">
                            <span className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                              Ella Lauda
                            </span>
                          </div>
                        </div>
                        <div className="absolute transform -translate-y-1/2 lg:group-hover:block lg:hidden top-1/2 end-4">
                          <button
                            type="button"
                            className="hs-tooltip-toggle py-1.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700"
                            data-hs-overlay="#hs-pro-dutoo"
                          >
                            <svg
                              className="shrink-0 size-3.5 hidden lg:block"
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
                              <rect
                                width={18}
                                height={18}
                                x={3}
                                y={3}
                                rx={2}
                                ry={2}
                              />
                              <line x1={15} x2={15} y1={3} y2={21} />
                              <path d="m10 15-3-3 3-3" />
                            </svg>
                            Open
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                          3 Grace Dr, New Mexico, 08857, United States
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="py-1.5 ps-1.5 pe-2.5 inline-flex items-center gap-x-1.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full dark:bg-yellow-500/10 dark:text-yellow-500">
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
                            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                            <path d="M12 9v4" />
                            <path d="M12 17h.01" />
                          </svg>
                          Fake account
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                          ella@site.so
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                          +1 212-00-11
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        {/* Download Dropdown */}
                        <div className="hs-dropdown [--auto-close:inside] [--placement:bottom-right] relative inline-flex">
                          <button
                            id="hs-pro-dutdm8"
                            type="button"
                            className="inline-flex items-center justify-center text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm size-7 gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            aria-label="Dropdown"
                          >
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
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1={12} x2={12} y1={15} y2={3} />
                            </svg>
                          </button>
                          {/* Download Dropdown */}
                          <div
                            className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-60 transition-[opacity,margin] duration opacity-0 hidden z-20 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-900"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="hs-pro-dutdm8"
                          >
                            <div className="p-1">
                              <div className="px-3 py-2">
                                <span className="block font-semibold text-gray-800 dark:text-neutral-200">
                                  Download Report
                                </span>
                                <span className="block text-xs text-gray-500 dark:text-neutral-500">
                                  Select Options
                                </span>
                              </div>
                              <div className="m-2 border-t border-gray-200 dark:border-neutral-700" />
                              <div className="px-2 py-1">
                                <div className="flex items-center p-1 bg-gray-100 rounded-xl dark:bg-neutral-800">
                                  <label
                                    htmlFor="hs-pro-dutdm8ts1"
                                    className="relative py-1.5 px-3 w-full cursor-pointer text-center text-sm text-gray-800 rounded-lg has-[:checked]:bg-white has-[:checked]:shadow-sm dark:text-neutral-200 dark:has-[:checked]:bg-neutral-600"
                                  >
                                    <svg
                                      className="relative z-10 me-1.5 inline-block align-middle shrink-0 size-4"
                                      width={32}
                                      height={32}
                                      viewBox="0 0 32 32"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M20.0324 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 15.8079L25.9844 18.3197L31.9364 15.8079V8.86395L20.0324 1.91994Z"
                                        fill="#21A366"
                                      />
                                      <path
                                        d="M8.12839 8.86395H20.0324V15.8079H8.12839V8.86395Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        d="M30.614 1.91994H20.0324V8.86395H31.9364V3.24228C31.9364 2.89158 31.7971 2.55523 31.5491 2.30725C31.3011 2.05926 30.9647 1.91994 30.614 1.91994Z"
                                        fill="#33C481"
                                      />
                                      <path
                                        d="M20.0324 15.8079H8.12839V28.3736C8.12839 28.7243 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.6959 9.45071 29.6959H30.6141C30.9647 29.6959 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7243 31.9364 28.3736V22.7519L20.0324 15.8079Z"
                                        fill="#185C37"
                                      />
                                      <path
                                        d="M20.0324 15.8079H31.9364V22.7519H20.0324V15.8079Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        opacity="0.1"
                                        d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16402 23.7439 0.827672 23.6047 0.579686 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579686 8.25922C0.827672 8.01122 1.16402 7.87194 1.51472 7.87194Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        d="M3.69711 20.7679L6.90722 15.794L3.96694 10.8479H6.33286L7.93791 14.0095C8.08536 14.3091 8.18688 14.5326 8.24248 14.68H8.26328C8.36912 14.4407 8.47984 14.2079 8.5956 13.9817L10.3108 10.8479H12.4822L9.46656 15.7663L12.5586 20.7679H10.2473L8.3932 17.2959C8.30592 17.148 8.23184 16.9927 8.172 16.8317H8.14424C8.09016 16.9891 8.01824 17.1399 7.92998 17.2811L6.02236 20.7679H3.69711Z"
                                        fill="white"
                                      />
                                    </svg>
                                    <span className="relative z-10 align-middle">
                                      Excel
                                    </span>
                                    <input
                                      type="radio"
                                      name="hs-pro-dutdm8ts"
                                      className="hidden"
                                      id="hs-pro-dutdm8ts1"
                                      defaultChecked=""
                                    />
                                  </label>
                                  <label
                                    htmlFor="hs-pro-dutdm8ts2"
                                    className="relative py-1.5 px-3 w-full cursor-pointer text-center text-sm text-gray-800 rounded-lg has-[:checked]:bg-white has-[:checked]:shadow-sm dark:text-neutral-200 dark:has-[:checked]:bg-neutral-600"
                                  >
                                    <svg
                                      className="relative z-10 me-1.5 inline-block align-middle shrink-0 size-4"
                                      width={32}
                                      height={32}
                                      viewBox="0 0 32 32"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M30.6141 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 12.3359L31.9364 8.86395V3.24228C31.9364 2.89158 31.797 2.55523 31.549 2.30725C31.3011 2.05926 30.9647 1.91994 30.6141 1.91994Z"
                                        fill="#41A5EE"
                                      />
                                      <path
                                        d="M31.9364 8.86395H8.12839V15.8079L20.0324 19.2799L31.9364 15.8079V8.86395Z"
                                        fill="#2B7CD3"
                                      />
                                      <path
                                        d="M31.9364 15.8079H8.12839V22.7519L20.0324 26.2239L31.9364 22.7519V15.8079Z"
                                        fill="#185ABD"
                                      />
                                      <path
                                        d="M31.9364 22.752H8.12839V28.3736C8.12839 28.7244 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.696 9.45071 29.696H30.6141C30.9647 29.696 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7244 31.9364 28.3736V22.752Z"
                                        fill="#103F91"
                                      />
                                      <path
                                        opacity="0.1"
                                        d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16401 23.7439 0.827669 23.6047 0.579687 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579687 8.25922C0.827669 8.01122 1.16401 7.87194 1.51472 7.87194Z"
                                        fill="#185ABD"
                                      />
                                      <path
                                        d="M12.0468 20.7679H10.2612L8.17801 13.9231L5.99558 20.7679H4.20998L2.22598 10.8479H4.01158L5.40038 17.7919L7.48358 11.0463H8.97161L10.9556 17.7919L12.3444 10.8479H14.0308L12.0468 20.7679Z"
                                        fill="white"
                                      />
                                    </svg>
                                    <span className="relative z-10 align-middle">
                                      Word
                                    </span>
                                    <input
                                      type="radio"
                                      name="hs-pro-dutdm8ts"
                                      className="hidden"
                                      id="hs-pro-dutdm8ts2"
                                    />
                                  </label>
                                </div>
                              </div>
                              <div className="m-2 border-t border-gray-200 dark:border-neutral-700" />
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm8s1"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                    <circle cx={12} cy={7} r={4} />
                                  </svg>
                                  Full name
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm8s1"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm8s2"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                    <circle cx={12} cy={10} r={3} />
                                  </svg>
                                  Address
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm8s2"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm8s3"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                                    <path d="m9 12 2 2 4-4" />
                                  </svg>
                                  Signed up as
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm8s3"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm8s4"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
                                    <rect
                                      width={18}
                                      height={18}
                                      x={3}
                                      y={4}
                                      rx={2}
                                    />
                                    <circle cx={12} cy={10} r={2} />
                                    <line x1={8} x2={8} y1={2} y2={4} />
                                    <line x1={16} x2={16} y1={2} y2={4} />
                                  </svg>
                                  User ID
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm8s4"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm8s5"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                  </svg>
                                  Phone
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm8s5"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="my-1 border-t border-gray-200 dark:border-neutral-700" />
                              <button
                                type="button"
                                className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                Download
                              </button>
                            </div>
                          </div>
                          {/* End Download Dropdown */}
                        </div>
                        {/* End Download Dropdown */}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 dark:divide-neutral-700">
                      <td className="px-3 py-4 size-px whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="text-blue-600 border-gray-300 rounded shrink-0 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        />
                      </td>
                      <td className="relative px-4 py-1 cursor-pointer size-px group pe-20 lg:pe-24">
                        <div className="flex items-center w-full gap-x-3">
                          <Image
                          width={38}
                          height={38}
                            className="shrink-0 size-[38px] rounded-full"
                            src="https://images.unsplash.com/photo-1679412330254-90cb240038c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80"
                            alt="Avatar"
                          />
                          <div className="grow">
                            <span className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                              Lewis Clarke
                            </span>
                          </div>
                        </div>
                        <div className="absolute transform -translate-y-1/2 lg:group-hover:block lg:hidden top-1/2 end-4">
                          <button
                            type="button"
                            className="hs-tooltip-toggle py-1.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700"
                            data-hs-overlay="#hs-pro-dutoo"
                          >
                            <svg
                              className="shrink-0 size-3.5 hidden lg:block"
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
                              <rect
                                width={18}
                                height={18}
                                x={3}
                                y={3}
                                rx={2}
                                ry={2}
                              />
                              <line x1={15} x2={15} y1={3} y2={21} />
                              <path d="m10 15-3-3 3-3" />
                            </svg>
                            Open
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                          4531 W Saile Dr, Batavia, North Dakota, 14020, United
                          States
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="py-1.5 ps-1.5 pe-2.5 inline-flex items-center gap-x-1.5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full dark:bg-neutral-500/20 dark:text-neutral-500">
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
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Valid account
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                          lewis@site.so
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400"></span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        {/* Download Dropdown */}
                        <div className="hs-dropdown [--auto-close:inside] [--placement:bottom-right] relative inline-flex">
                          <button
                            id="hs-pro-dutdm9"
                            type="button"
                            className="inline-flex items-center justify-center text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm size-7 gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            aria-label="Dropdown"
                          >
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
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1={12} x2={12} y1={15} y2={3} />
                            </svg>
                          </button>
                          {/* Download Dropdown */}
                          <div
                            className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-60 transition-[opacity,margin] duration opacity-0 hidden z-20 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-900"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="hs-pro-dutdm9"
                          >
                            <div className="p-1">
                              <div className="px-3 py-2">
                                <span className="block font-semibold text-gray-800 dark:text-neutral-200">
                                  Download Report
                                </span>
                                <span className="block text-xs text-gray-500 dark:text-neutral-500">
                                  Select Options
                                </span>
                              </div>
                              <div className="m-2 border-t border-gray-200 dark:border-neutral-700" />
                              <div className="px-2 py-1">
                                <div className="flex items-center p-1 bg-gray-100 rounded-xl dark:bg-neutral-800">
                                  <label
                                    htmlFor="hs-pro-dutdm9ts1"
                                    className="relative py-1.5 px-3 w-full cursor-pointer text-center text-sm text-gray-800 rounded-lg has-[:checked]:bg-white has-[:checked]:shadow-sm dark:text-neutral-200 dark:has-[:checked]:bg-neutral-600"
                                  >
                                    <svg
                                      className="relative z-10 me-1.5 inline-block align-middle shrink-0 size-4"
                                      width={32}
                                      height={32}
                                      viewBox="0 0 32 32"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M20.0324 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 15.8079L25.9844 18.3197L31.9364 15.8079V8.86395L20.0324 1.91994Z"
                                        fill="#21A366"
                                      />
                                      <path
                                        d="M8.12839 8.86395H20.0324V15.8079H8.12839V8.86395Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        d="M30.614 1.91994H20.0324V8.86395H31.9364V3.24228C31.9364 2.89158 31.7971 2.55523 31.5491 2.30725C31.3011 2.05926 30.9647 1.91994 30.614 1.91994Z"
                                        fill="#33C481"
                                      />
                                      <path
                                        d="M20.0324 15.8079H8.12839V28.3736C8.12839 28.7243 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.6959 9.45071 29.6959H30.6141C30.9647 29.6959 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7243 31.9364 28.3736V22.7519L20.0324 15.8079Z"
                                        fill="#185C37"
                                      />
                                      <path
                                        d="M20.0324 15.8079H31.9364V22.7519H20.0324V15.8079Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        opacity="0.1"
                                        d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16402 23.7439 0.827672 23.6047 0.579686 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579686 8.25922C0.827672 8.01122 1.16402 7.87194 1.51472 7.87194Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        d="M3.69711 20.7679L6.90722 15.794L3.96694 10.8479H6.33286L7.93791 14.0095C8.08536 14.3091 8.18688 14.5326 8.24248 14.68H8.26328C8.36912 14.4407 8.47984 14.2079 8.5956 13.9817L10.3108 10.8479H12.4822L9.46656 15.7663L12.5586 20.7679H10.2473L8.3932 17.2959C8.30592 17.148 8.23184 16.9927 8.172 16.8317H8.14424C8.09016 16.9891 8.01824 17.1399 7.92998 17.2811L6.02236 20.7679H3.69711Z"
                                        fill="white"
                                      />
                                    </svg>
                                    <span className="relative z-10 align-middle">
                                      Excel
                                    </span>
                                    <input
                                      type="radio"
                                      name="hs-pro-dutdm9ts"
                                      className="hidden"
                                      id="hs-pro-dutdm9ts1"
                                      defaultChecked=""
                                    />
                                  </label>
                                  <label
                                    htmlFor="hs-pro-dutdm9ts2"
                                    className="relative py-1.5 px-3 w-full cursor-pointer text-center text-sm text-gray-800 rounded-lg has-[:checked]:bg-white has-[:checked]:shadow-sm dark:text-neutral-200 dark:has-[:checked]:bg-neutral-600"
                                  >
                                    <svg
                                      className="relative z-10 me-1.5 inline-block align-middle shrink-0 size-4"
                                      width={32}
                                      height={32}
                                      viewBox="0 0 32 32"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M30.6141 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 12.3359L31.9364 8.86395V3.24228C31.9364 2.89158 31.797 2.55523 31.549 2.30725C31.3011 2.05926 30.9647 1.91994 30.6141 1.91994Z"
                                        fill="#41A5EE"
                                      />
                                      <path
                                        d="M31.9364 8.86395H8.12839V15.8079L20.0324 19.2799L31.9364 15.8079V8.86395Z"
                                        fill="#2B7CD3"
                                      />
                                      <path
                                        d="M31.9364 15.8079H8.12839V22.7519L20.0324 26.2239L31.9364 22.7519V15.8079Z"
                                        fill="#185ABD"
                                      />
                                      <path
                                        d="M31.9364 22.752H8.12839V28.3736C8.12839 28.7244 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.696 9.45071 29.696H30.6141C30.9647 29.696 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7244 31.9364 28.3736V22.752Z"
                                        fill="#103F91"
                                      />
                                      <path
                                        opacity="0.1"
                                        d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16401 23.7439 0.827669 23.6047 0.579687 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579687 8.25922C0.827669 8.01122 1.16401 7.87194 1.51472 7.87194Z"
                                        fill="#185ABD"
                                      />
                                      <path
                                        d="M12.0468 20.7679H10.2612L8.17801 13.9231L5.99558 20.7679H4.20998L2.22598 10.8479H4.01158L5.40038 17.7919L7.48358 11.0463H8.97161L10.9556 17.7919L12.3444 10.8479H14.0308L12.0468 20.7679Z"
                                        fill="white"
                                      />
                                    </svg>
                                    <span className="relative z-10 align-middle">
                                      Word
                                    </span>
                                    <input
                                      type="radio"
                                      name="hs-pro-dutdm9ts"
                                      className="hidden"
                                      id="hs-pro-dutdm9ts2"
                                    />
                                  </label>
                                </div>
                              </div>
                              <div className="m-2 border-t border-gray-200 dark:border-neutral-700" />
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm9s1"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                    <circle cx={12} cy={7} r={4} />
                                  </svg>
                                  Full name
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm9s1"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm9s2"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                    <circle cx={12} cy={10} r={3} />
                                  </svg>
                                  Address
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm9s2"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm9s3"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                                    <path d="m9 12 2 2 4-4" />
                                  </svg>
                                  Signed up as
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm9s3"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm9s4"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
                                    <rect
                                      width={18}
                                      height={18}
                                      x={3}
                                      y={4}
                                      rx={2}
                                    />
                                    <circle cx={12} cy={10} r={2} />
                                    <line x1={8} x2={8} y1={2} y2={4} />
                                    <line x1={16} x2={16} y1={2} y2={4} />
                                  </svg>
                                  User ID
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm9s4"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm9s5"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                  </svg>
                                  Phone
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm9s5"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="my-1 border-t border-gray-200 dark:border-neutral-700" />
                              <button
                                type="button"
                                className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                Download
                              </button>
                            </div>
                          </div>
                          {/* End Download Dropdown */}
                        </div>
                        {/* End Download Dropdown */}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 dark:divide-neutral-700">
                      <td className="px-3 py-4 size-px whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="text-blue-600 border-gray-300 rounded shrink-0 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        />
                      </td>
                      <td className="relative px-4 py-1 cursor-pointer size-px group pe-20 lg:pe-24">
                        <div className="flex items-center w-full gap-x-3">
                          <span className="flex shrink-0 justify-center items-center size-[38px] bg-white border border-gray-200 text-gray-700 text-xs font-medium uppercase rounded-full dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300">
                            Lh
                          </span>
                          <div className="grow">
                            <span className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                              Lori Hunter
                            </span>
                          </div>
                        </div>
                        <div className="absolute transform -translate-y-1/2 lg:group-hover:block lg:hidden top-1/2 end-4">
                          <button
                            type="button"
                            className="hs-tooltip-toggle py-1.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700"
                            data-hs-overlay="#hs-pro-dutoo"
                          >
                            <svg
                              className="shrink-0 size-3.5 hidden lg:block"
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
                              <rect
                                width={18}
                                height={18}
                                x={3}
                                y={3}
                                rx={2}
                                ry={2}
                              />
                              <line x1={15} x2={15} y1={3} y2={21} />
                              <path d="m10 15-3-3 3-3" />
                            </svg>
                            Open
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                          2126 N Eagle Rd #120, Meridian, Illinois, 83646,
                          United States
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="py-1.5 ps-1.5 pe-2.5 inline-flex items-center gap-x-1.5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full dark:bg-neutral-500/20 dark:text-neutral-500">
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
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Valid account
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                          lori@site.so
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400"></span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        {/* Download Dropdown */}
                        <div className="hs-dropdown [--auto-close:inside] [--placement:bottom-right] relative inline-flex">
                          <button
                            id="hs-pro-dutdm10"
                            type="button"
                            className="inline-flex items-center justify-center text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm size-7 gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            aria-label="Dropdown"
                          >
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
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1={12} x2={12} y1={15} y2={3} />
                            </svg>
                          </button>
                          {/* Download Dropdown */}
                          <div
                            className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-60 transition-[opacity,margin] duration opacity-0 hidden z-20 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-900"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="hs-pro-dutdm10"
                          >
                            <div className="p-1">
                              <div className="px-3 py-2">
                                <span className="block font-semibold text-gray-800 dark:text-neutral-200">
                                  Download Report
                                </span>
                                <span className="block text-xs text-gray-500 dark:text-neutral-500">
                                  Select Options
                                </span>
                              </div>
                              <div className="m-2 border-t border-gray-200 dark:border-neutral-700" />
                              <div className="px-2 py-1">
                                <div className="flex items-center p-1 bg-gray-100 rounded-xl dark:bg-neutral-800">
                                  <label
                                    htmlFor="hs-pro-dutdm10ts1"
                                    className="relative py-1.5 px-3 w-full cursor-pointer text-center text-sm text-gray-800 rounded-lg has-[:checked]:bg-white has-[:checked]:shadow-sm dark:text-neutral-200 dark:has-[:checked]:bg-neutral-600"
                                  >
                                    <svg
                                      className="relative z-10 me-1.5 inline-block align-middle shrink-0 size-4"
                                      width={32}
                                      height={32}
                                      viewBox="0 0 32 32"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M20.0324 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 15.8079L25.9844 18.3197L31.9364 15.8079V8.86395L20.0324 1.91994Z"
                                        fill="#21A366"
                                      />
                                      <path
                                        d="M8.12839 8.86395H20.0324V15.8079H8.12839V8.86395Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        d="M30.614 1.91994H20.0324V8.86395H31.9364V3.24228C31.9364 2.89158 31.7971 2.55523 31.5491 2.30725C31.3011 2.05926 30.9647 1.91994 30.614 1.91994Z"
                                        fill="#33C481"
                                      />
                                      <path
                                        d="M20.0324 15.8079H8.12839V28.3736C8.12839 28.7243 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.6959 9.45071 29.6959H30.6141C30.9647 29.6959 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7243 31.9364 28.3736V22.7519L20.0324 15.8079Z"
                                        fill="#185C37"
                                      />
                                      <path
                                        d="M20.0324 15.8079H31.9364V22.7519H20.0324V15.8079Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        opacity="0.1"
                                        d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16402 23.7439 0.827672 23.6047 0.579686 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579686 8.25922C0.827672 8.01122 1.16402 7.87194 1.51472 7.87194Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        d="M3.69711 20.7679L6.90722 15.794L3.96694 10.8479H6.33286L7.93791 14.0095C8.08536 14.3091 8.18688 14.5326 8.24248 14.68H8.26328C8.36912 14.4407 8.47984 14.2079 8.5956 13.9817L10.3108 10.8479H12.4822L9.46656 15.7663L12.5586 20.7679H10.2473L8.3932 17.2959C8.30592 17.148 8.23184 16.9927 8.172 16.8317H8.14424C8.09016 16.9891 8.01824 17.1399 7.92998 17.2811L6.02236 20.7679H3.69711Z"
                                        fill="white"
                                      />
                                    </svg>
                                    <span className="relative z-10 align-middle">
                                      Excel
                                    </span>
                                    <input
                                      type="radio"
                                      name="hs-pro-dutdm10ts"
                                      className="hidden"
                                      id="hs-pro-dutdm10ts1"
                                      defaultChecked=""
                                    />
                                  </label>
                                  <label
                                    htmlFor="hs-pro-dutdm10ts2"
                                    className="relative py-1.5 px-3 w-full cursor-pointer text-center text-sm text-gray-800 rounded-lg has-[:checked]:bg-white has-[:checked]:shadow-sm dark:text-neutral-200 dark:has-[:checked]:bg-neutral-600"
                                  >
                                    <svg
                                      className="relative z-10 me-1.5 inline-block align-middle shrink-0 size-4"
                                      width={32}
                                      height={32}
                                      viewBox="0 0 32 32"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M30.6141 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 12.3359L31.9364 8.86395V3.24228C31.9364 2.89158 31.797 2.55523 31.549 2.30725C31.3011 2.05926 30.9647 1.91994 30.6141 1.91994Z"
                                        fill="#41A5EE"
                                      />
                                      <path
                                        d="M31.9364 8.86395H8.12839V15.8079L20.0324 19.2799L31.9364 15.8079V8.86395Z"
                                        fill="#2B7CD3"
                                      />
                                      <path
                                        d="M31.9364 15.8079H8.12839V22.7519L20.0324 26.2239L31.9364 22.7519V15.8079Z"
                                        fill="#185ABD"
                                      />
                                      <path
                                        d="M31.9364 22.752H8.12839V28.3736C8.12839 28.7244 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.696 9.45071 29.696H30.6141C30.9647 29.696 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7244 31.9364 28.3736V22.752Z"
                                        fill="#103F91"
                                      />
                                      <path
                                        opacity="0.1"
                                        d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16401 23.7439 0.827669 23.6047 0.579687 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579687 8.25922C0.827669 8.01122 1.16401 7.87194 1.51472 7.87194Z"
                                        fill="#185ABD"
                                      />
                                      <path
                                        d="M12.0468 20.7679H10.2612L8.17801 13.9231L5.99558 20.7679H4.20998L2.22598 10.8479H4.01158L5.40038 17.7919L7.48358 11.0463H8.97161L10.9556 17.7919L12.3444 10.8479H14.0308L12.0468 20.7679Z"
                                        fill="white"
                                      />
                                    </svg>
                                    <span className="relative z-10 align-middle">
                                      Word
                                    </span>
                                    <input
                                      type="radio"
                                      name="hs-pro-dutdm10ts"
                                      className="hidden"
                                      id="hs-pro-dutdm10ts2"
                                    />
                                  </label>
                                </div>
                              </div>
                              <div className="m-2 border-t border-gray-200 dark:border-neutral-700" />
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm10s1"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                    <circle cx={12} cy={7} r={4} />
                                  </svg>
                                  Full name
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm10s1"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm10s2"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                    <circle cx={12} cy={10} r={3} />
                                  </svg>
                                  Address
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm10s2"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm10s3"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                                    <path d="m9 12 2 2 4-4" />
                                  </svg>
                                  Signed up as
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm10s3"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm10s4"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
                                    <rect
                                      width={18}
                                      height={18}
                                      x={3}
                                      y={4}
                                      rx={2}
                                    />
                                    <circle cx={12} cy={10} r={2} />
                                    <line x1={8} x2={8} y1={2} y2={4} />
                                    <line x1={16} x2={16} y1={2} y2={4} />
                                  </svg>
                                  User ID
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm10s4"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm10s5"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                  </svg>
                                  Phone
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm10s5"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="my-1 border-t border-gray-200 dark:border-neutral-700" />
                              <button
                                type="button"
                                className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                Download
                              </button>
                            </div>
                          </div>
                          {/* End Download Dropdown */}
                        </div>
                        {/* End Download Dropdown */}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 dark:divide-neutral-700">
                      <td className="px-3 py-4 size-px whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="text-blue-600 border-gray-300 rounded shrink-0 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        />
                      </td>
                      <td className="relative px-4 py-1 cursor-pointer size-px group pe-20 lg:pe-24">
                        <div className="flex items-center w-full gap-x-3">
                          <Image
                          width={38}
                          height={38}
                            className="shrink-0 size-[38px] rounded-full"
                            src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80"
                            alt="Avatar"
                          />
                          <div className="grow">
                            <span className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                              David Harrison
                            </span>
                          </div>
                        </div>
                        <div className="absolute transform -translate-y-1/2 lg:group-hover:block lg:hidden top-1/2 end-4">
                          <button
                            type="button"
                            className="hs-tooltip-toggle py-1.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700"
                            data-hs-overlay="#hs-pro-dutoo"
                          >
                            <svg
                              className="shrink-0 size-3.5 hidden lg:block"
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
                              <rect
                                width={18}
                                height={18}
                                x={3}
                                y={3}
                                rx={2}
                                ry={2}
                              />
                              <line x1={15} x2={15} y1={3} y2={21} />
                              <path d="m10 15-3-3 3-3" />
                            </svg>
                            Open
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                          3817 Beryl Rd, Raleigh, Nebraska, 27607, United States
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="py-1.5 ps-1.5 pe-2.5 inline-flex items-center gap-x-1.5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full dark:bg-neutral-500/20 dark:text-neutral-500">
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
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Valid account
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                          david@site.so
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                          +492-00-11
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        {/* Download Dropdown */}
                        <div className="hs-dropdown [--auto-close:inside] [--placement:bottom-right] relative inline-flex">
                          <button
                            id="hs-pro-dutdm11"
                            type="button"
                            className="inline-flex items-center justify-center text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm size-7 gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            aria-label="Dropdown"
                          >
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
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1={12} x2={12} y1={15} y2={3} />
                            </svg>
                          </button>
                          {/* Download Dropdown */}
                          <div
                            className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-60 transition-[opacity,margin] duration opacity-0 hidden z-20 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-900"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="hs-pro-dutdm11"
                          >
                            <div className="p-1">
                              <div className="px-3 py-2">
                                <span className="block font-semibold text-gray-800 dark:text-neutral-200">
                                  Download Report
                                </span>
                                <span className="block text-xs text-gray-500 dark:text-neutral-500">
                                  Select Options
                                </span>
                              </div>
                              <div className="m-2 border-t border-gray-200 dark:border-neutral-700" />
                              <div className="px-2 py-1">
                                <div className="flex items-center p-1 bg-gray-100 rounded-xl dark:bg-neutral-800">
                                  <label
                                    htmlFor="hs-pro-dutdm11ts1"
                                    className="relative py-1.5 px-3 w-full cursor-pointer text-center text-sm text-gray-800 rounded-lg has-[:checked]:bg-white has-[:checked]:shadow-sm dark:text-neutral-200 dark:has-[:checked]:bg-neutral-600"
                                  >
                                    <svg
                                      className="relative z-10 me-1.5 inline-block align-middle shrink-0 size-4"
                                      width={32}
                                      height={32}
                                      viewBox="0 0 32 32"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M20.0324 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 15.8079L25.9844 18.3197L31.9364 15.8079V8.86395L20.0324 1.91994Z"
                                        fill="#21A366"
                                      />
                                      <path
                                        d="M8.12839 8.86395H20.0324V15.8079H8.12839V8.86395Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        d="M30.614 1.91994H20.0324V8.86395H31.9364V3.24228C31.9364 2.89158 31.7971 2.55523 31.5491 2.30725C31.3011 2.05926 30.9647 1.91994 30.614 1.91994Z"
                                        fill="#33C481"
                                      />
                                      <path
                                        d="M20.0324 15.8079H8.12839V28.3736C8.12839 28.7243 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.6959 9.45071 29.6959H30.6141C30.9647 29.6959 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7243 31.9364 28.3736V22.7519L20.0324 15.8079Z"
                                        fill="#185C37"
                                      />
                                      <path
                                        d="M20.0324 15.8079H31.9364V22.7519H20.0324V15.8079Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        opacity="0.1"
                                        d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16402 23.7439 0.827672 23.6047 0.579686 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579686 8.25922C0.827672 8.01122 1.16402 7.87194 1.51472 7.87194Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        d="M3.69711 20.7679L6.90722 15.794L3.96694 10.8479H6.33286L7.93791 14.0095C8.08536 14.3091 8.18688 14.5326 8.24248 14.68H8.26328C8.36912 14.4407 8.47984 14.2079 8.5956 13.9817L10.3108 10.8479H12.4822L9.46656 15.7663L12.5586 20.7679H10.2473L8.3932 17.2959C8.30592 17.148 8.23184 16.9927 8.172 16.8317H8.14424C8.09016 16.9891 8.01824 17.1399 7.92998 17.2811L6.02236 20.7679H3.69711Z"
                                        fill="white"
                                      />
                                    </svg>
                                    <span className="relative z-10 align-middle">
                                      Excel
                                    </span>
                                    <input
                                      type="radio"
                                      name="hs-pro-dutdm11ts"
                                      className="hidden"
                                      id="hs-pro-dutdm11ts1"
                                      defaultChecked=""
                                    />
                                  </label>
                                  <label
                                    htmlFor="hs-pro-dutdm11ts2"
                                    className="relative py-1.5 px-3 w-full cursor-pointer text-center text-sm text-gray-800 rounded-lg has-[:checked]:bg-white has-[:checked]:shadow-sm dark:text-neutral-200 dark:has-[:checked]:bg-neutral-600"
                                  >
                                    <svg
                                      className="relative z-10 me-1.5 inline-block align-middle shrink-0 size-4"
                                      width={32}
                                      height={32}
                                      viewBox="0 0 32 32"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M30.6141 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 12.3359L31.9364 8.86395V3.24228C31.9364 2.89158 31.797 2.55523 31.549 2.30725C31.3011 2.05926 30.9647 1.91994 30.6141 1.91994Z"
                                        fill="#41A5EE"
                                      />
                                      <path
                                        d="M31.9364 8.86395H8.12839V15.8079L20.0324 19.2799L31.9364 15.8079V8.86395Z"
                                        fill="#2B7CD3"
                                      />
                                      <path
                                        d="M31.9364 15.8079H8.12839V22.7519L20.0324 26.2239L31.9364 22.7519V15.8079Z"
                                        fill="#185ABD"
                                      />
                                      <path
                                        d="M31.9364 22.752H8.12839V28.3736C8.12839 28.7244 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.696 9.45071 29.696H30.6141C30.9647 29.696 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7244 31.9364 28.3736V22.752Z"
                                        fill="#103F91"
                                      />
                                      <path
                                        opacity="0.1"
                                        d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16401 23.7439 0.827669 23.6047 0.579687 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579687 8.25922C0.827669 8.01122 1.16401 7.87194 1.51472 7.87194Z"
                                        fill="#185ABD"
                                      />
                                      <path
                                        d="M12.0468 20.7679H10.2612L8.17801 13.9231L5.99558 20.7679H4.20998L2.22598 10.8479H4.01158L5.40038 17.7919L7.48358 11.0463H8.97161L10.9556 17.7919L12.3444 10.8479H14.0308L12.0468 20.7679Z"
                                        fill="white"
                                      />
                                    </svg>
                                    <span className="relative z-10 align-middle">
                                      Word
                                    </span>
                                    <input
                                      type="radio"
                                      name="hs-pro-dutdm11ts"
                                      className="hidden"
                                      id="hs-pro-dutdm11ts2"
                                    />
                                  </label>
                                </div>
                              </div>
                              <div className="m-2 border-t border-gray-200 dark:border-neutral-700" />
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm11s1"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                    <circle cx={12} cy={7} r={4} />
                                  </svg>
                                  Full name
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm11s1"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm11s2"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                    <circle cx={12} cy={10} r={3} />
                                  </svg>
                                  Address
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm11s2"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm11s3"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                                    <path d="m9 12 2 2 4-4" />
                                  </svg>
                                  Signed up as
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm11s3"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm11s4"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
                                    <rect
                                      width={18}
                                      height={18}
                                      x={3}
                                      y={4}
                                      rx={2}
                                    />
                                    <circle cx={12} cy={10} r={2} />
                                    <line x1={8} x2={8} y1={2} y2={4} />
                                    <line x1={16} x2={16} y1={2} y2={4} />
                                  </svg>
                                  User ID
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm11s4"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm11s5"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                  </svg>
                                  Phone
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm11s5"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="my-1 border-t border-gray-200 dark:border-neutral-700" />
                              <button
                                type="button"
                                className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                Download
                              </button>
                            </div>
                          </div>
                          {/* End Download Dropdown */}
                        </div>
                        {/* End Download Dropdown */}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 dark:divide-neutral-700">
                      <td className="px-3 py-4 size-px whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="text-blue-600 border-gray-300 rounded shrink-0 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        />
                      </td>
                      <td className="relative px-4 py-1 cursor-pointer size-px group pe-20 lg:pe-24">
                        <div className="flex items-center w-full gap-x-3">
                          <span className="flex shrink-0 justify-center items-center size-[38px] bg-white border border-gray-200 text-gray-700 text-xs font-medium uppercase rounded-full dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300">
                            Cm
                          </span>
                          <div className="grow">
                            <span className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                              Chris Mathew
                            </span>
                          </div>
                        </div>
                        <div className="absolute transform -translate-y-1/2 lg:group-hover:block lg:hidden top-1/2 end-4">
                          <button
                            type="button"
                            className="hs-tooltip-toggle py-1.5 px-2 inline-flex items-center gap-x-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700"
                            data-hs-overlay="#hs-pro-dutoo"
                          >
                            <svg
                              className="shrink-0 size-3.5 hidden lg:block"
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
                              <rect
                                width={18}
                                height={18}
                                x={3}
                                y={3}
                                rx={2}
                                ry={2}
                              />
                              <line x1={15} x2={15} y1={3} y2={21} />
                              <path d="m10 15-3-3 3-3" />
                            </svg>
                            Open
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                          4807 3rd Ave, Kearney, New Hampshire, 68845, United
                          States
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="py-1.5 ps-1.5 pe-2.5 inline-flex items-center gap-x-1.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full dark:bg-yellow-500/10 dark:text-yellow-500">
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
                            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                            <path d="M12 9v4" />
                            <path d="M12 17h.01" />
                          </svg>
                          Fake account
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                          chris@site.so
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-neutral-400">
                          +234-95-86
                        </span>
                      </td>
                      <td className="px-4 py-1 size-px whitespace-nowrap">
                        {/* Download Dropdown */}
                        <div className="hs-dropdown [--auto-close:inside] [--placement:bottom-right] relative inline-flex">
                          <button
                            id="hs-pro-dutdm12"
                            type="button"
                            className="inline-flex items-center justify-center text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm size-7 gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            aria-label="Dropdown"
                          >
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
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1={12} x2={12} y1={15} y2={3} />
                            </svg>
                          </button>
                          {/* Download Dropdown */}
                          <div
                            className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-60 transition-[opacity,margin] duration opacity-0 hidden z-20 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-900"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="hs-pro-dutdm12"
                          >
                            <div className="p-1">
                              <div className="px-3 py-2">
                                <span className="block font-semibold text-gray-800 dark:text-neutral-200">
                                  Download Report
                                </span>
                                <span className="block text-xs text-gray-500 dark:text-neutral-500">
                                  Select Options
                                </span>
                              </div>
                              <div className="m-2 border-t border-gray-200 dark:border-neutral-700" />
                              <div className="px-2 py-1">
                                <div className="flex items-center p-1 bg-gray-100 rounded-xl dark:bg-neutral-800">
                                  <label
                                    htmlFor="hs-pro-dutdm12ts1"
                                    className="relative py-1.5 px-3 w-full cursor-pointer text-center text-sm text-gray-800 rounded-lg has-[:checked]:bg-white has-[:checked]:shadow-sm dark:text-neutral-200 dark:has-[:checked]:bg-neutral-600"
                                  >
                                    <svg
                                      className="relative z-10 me-1.5 inline-block align-middle shrink-0 size-4"
                                      width={32}
                                      height={32}
                                      viewBox="0 0 32 32"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M20.0324 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 15.8079L25.9844 18.3197L31.9364 15.8079V8.86395L20.0324 1.91994Z"
                                        fill="#21A366"
                                      />
                                      <path
                                        d="M8.12839 8.86395H20.0324V15.8079H8.12839V8.86395Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        d="M30.614 1.91994H20.0324V8.86395H31.9364V3.24228C31.9364 2.89158 31.7971 2.55523 31.5491 2.30725C31.3011 2.05926 30.9647 1.91994 30.614 1.91994Z"
                                        fill="#33C481"
                                      />
                                      <path
                                        d="M20.0324 15.8079H8.12839V28.3736C8.12839 28.7243 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.6959 9.45071 29.6959H30.6141C30.9647 29.6959 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7243 31.9364 28.3736V22.7519L20.0324 15.8079Z"
                                        fill="#185C37"
                                      />
                                      <path
                                        d="M20.0324 15.8079H31.9364V22.7519H20.0324V15.8079Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        opacity="0.1"
                                        d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16402 23.7439 0.827672 23.6047 0.579686 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579686 8.25922C0.827672 8.01122 1.16402 7.87194 1.51472 7.87194Z"
                                        fill="#107C41"
                                      />
                                      <path
                                        d="M3.69711 20.7679L6.90722 15.794L3.96694 10.8479H6.33286L7.93791 14.0095C8.08536 14.3091 8.18688 14.5326 8.24248 14.68H8.26328C8.36912 14.4407 8.47984 14.2079 8.5956 13.9817L10.3108 10.8479H12.4822L9.46656 15.7663L12.5586 20.7679H10.2473L8.3932 17.2959C8.30592 17.148 8.23184 16.9927 8.172 16.8317H8.14424C8.09016 16.9891 8.01824 17.1399 7.92998 17.2811L6.02236 20.7679H3.69711Z"
                                        fill="white"
                                      />
                                    </svg>
                                    <span className="relative z-10 align-middle">
                                      Excel
                                    </span>
                                    <input
                                      type="radio"
                                      name="hs-pro-dutdm12ts"
                                      className="hidden"
                                      id="hs-pro-dutdm12ts1"
                                      defaultChecked=""
                                    />
                                  </label>
                                  <label
                                    htmlFor="hs-pro-dutdm12ts2"
                                    className="relative py-1.5 px-3 w-full cursor-pointer text-center text-sm text-gray-800 rounded-lg has-[:checked]:bg-white has-[:checked]:shadow-sm dark:text-neutral-200 dark:has-[:checked]:bg-neutral-600"
                                  >
                                    <svg
                                      className="relative z-10 me-1.5 inline-block align-middle shrink-0 size-4"
                                      width={32}
                                      height={32}
                                      viewBox="0 0 32 32"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M30.6141 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 12.3359L31.9364 8.86395V3.24228C31.9364 2.89158 31.797 2.55523 31.549 2.30725C31.3011 2.05926 30.9647 1.91994 30.6141 1.91994Z"
                                        fill="#41A5EE"
                                      />
                                      <path
                                        d="M31.9364 8.86395H8.12839V15.8079L20.0324 19.2799L31.9364 15.8079V8.86395Z"
                                        fill="#2B7CD3"
                                      />
                                      <path
                                        d="M31.9364 15.8079H8.12839V22.7519L20.0324 26.2239L31.9364 22.7519V15.8079Z"
                                        fill="#185ABD"
                                      />
                                      <path
                                        d="M31.9364 22.752H8.12839V28.3736C8.12839 28.7244 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.696 9.45071 29.696H30.6141C30.9647 29.696 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7244 31.9364 28.3736V22.752Z"
                                        fill="#103F91"
                                      />
                                      <path
                                        opacity="0.1"
                                        d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        opacity="0.2"
                                        d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z"
                                        className="fill-black dark:fill-neutral-200"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16401 23.7439 0.827669 23.6047 0.579687 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579687 8.25922C0.827669 8.01122 1.16401 7.87194 1.51472 7.87194Z"
                                        fill="#185ABD"
                                      />
                                      <path
                                        d="M12.0468 20.7679H10.2612L8.17801 13.9231L5.99558 20.7679H4.20998L2.22598 10.8479H4.01158L5.40038 17.7919L7.48358 11.0463H8.97161L10.9556 17.7919L12.3444 10.8479H14.0308L12.0468 20.7679Z"
                                        fill="white"
                                      />
                                    </svg>
                                    <span className="relative z-10 align-middle">
                                      Word
                                    </span>
                                    <input
                                      type="radio"
                                      name="hs-pro-dutdm12ts"
                                      className="hidden"
                                      id="hs-pro-dutdm12ts2"
                                    />
                                  </label>
                                </div>
                              </div>
                              <div className="m-2 border-t border-gray-200 dark:border-neutral-700" />
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm12s1"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                    <circle cx={12} cy={7} r={4} />
                                  </svg>
                                  Full name
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm12s1"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm12s2"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                    <circle cx={12} cy={10} r={3} />
                                  </svg>
                                  Address
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm12s2"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm12s3"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                                    <path d="m9 12 2 2 4-4" />
                                  </svg>
                                  Signed up as
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm12s3"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm12s4"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
                                    <rect
                                      width={18}
                                      height={18}
                                      x={3}
                                      y={4}
                                      rx={2}
                                    />
                                    <circle cx={12} cy={10} r={2} />
                                    <line x1={8} x2={8} y1={2} y2={4} />
                                    <line x1={16} x2={16} y1={2} y2={4} />
                                  </svg>
                                  User ID
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm12s4"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-700">
                                <label
                                  htmlFor="hs-pro-dutdm12s5"
                                  className="flex items-center flex-1 text-sm text-gray-800 cursor-pointer gap-x-3 dark:text-neutral-300"
                                >
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
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                  </svg>
                                  Phone
                                </label>
                                <input
                                  type="checkbox"
                                  className="shrink-0 size-3.5 border-gray-300 rounded text-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                  id="hs-pro-dutdm12s5"
                                  defaultChecked=""
                                />
                              </div>
                              <div className="my-1 border-t border-gray-200 dark:border-neutral-700" />
                              <button
                                type="button"
                                className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                Download
                              </button>
                            </div>
                          </div>
                          {/* End Download Dropdown */}
                        </div>
                        {/* End Download Dropdown */}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* End Table */}
              </div>
            </div>
            {/* End Table Section */}
            {/* Footer */}
            <div className="grid items-center grid-cols-2 gap-y-2 sm:gap-y-0 sm:gap-x-5">
              <p className="text-sm text-gray-800 dark:text-neutral-200">
                <span className="font-medium">27</span>
                <span className="text-gray-500 dark:text-neutral-500">
                  results
                </span>
              </p>
              {/* Pagination */}
              <nav
                className="flex items-center justify-end gap-x-1"
                aria-label="Pagination"
              >
                <button
                  type="button"
                  className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-white dark:hover:bg-white/10 dark:focus:bg-neutral-700"
                  aria-label="Previous"
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
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  <span className="sr-only">Previous</span>
                </button>
                <div className="flex items-center gap-x-1">
                  <span
                    className="min-h-[38px] min-w-[38px] flex justify-center items-center bg-gray-100 text-gray-800 py-2 px-3 text-sm rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:text-white"
                    aria-current="page"
                  >
                    1
                  </span>
                  <span className="min-h-[38px] flex justify-center items-center text-gray-500 py-2 px-1.5 text-sm dark:text-neutral-500">
                    of
                  </span>
                  <span className="min-h-[38px] flex justify-center items-center text-gray-500 py-2 px-1.5 text-sm dark:text-neutral-500">
                    3
                  </span>
                </div>
                <button
                  type="button"
                  className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-white dark:hover:bg-white/10 dark:focus:bg-neutral-700"
                  aria-label="Next"
                >
                  <span className="sr-only">Next</span>
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
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </nav>
              {/* End Pagination */}
            </div>
            {/* End Footer */}
          </div>
          {/* End Tab Content */}
          {/* Tab Content */}
          <div
            id="hs-pro-tabs-dut-alarm-temperature"
            className="hidden"
            role="tabpanel"
            aria-labelledby="hs-pro-tabs-dut-item-alarm-temperature"
          >
            {/* Empty State */}
            <div className="p-5 min-h-[500px]  flex flex-col justify-center items-center text-center">
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
                <g filter="url(#filter3)">
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
                    id="filter3"
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
                  Your data will appear here soon.
                </p>
                <p className="mb-5 text-sm text-gray-500 dark:text-neutral-500">
                  In the meantime, you can create new custom insights to monitor
                  your most important metrics.
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-hs-overlay="#hs-pro-empty"
              >
                <svg
                  className="hidden sm:block shrink-0 size-4"
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
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                Add user
              </button>
            </div>
            {/* End Empty State */}
          </div>
          {/* End Tab Content */}
          {/* Tab Content */}
          <div
            id="hs-pro-tabs-dut-fakeaccounts"
            className="hidden"
            role="tabpanel"
            aria-labelledby="hs-pro-tabs-dut-item-fakeaccounts"
          >
            {/* Empty State */}
            <div className="p-5 min-h-[500px]  flex flex-col justify-center items-center text-center">
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
                <g filter="url(#filter4)">
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
                    id="filter4"
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
                  Your data will appear here soon.
                </p>
                <p className="mb-5 text-sm text-gray-500 dark:text-neutral-500">
                  In the meantime, you can create new custom insights to monitor
                  your most important metrics.
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-hs-overlay="#hs-pro-empty"
              >
                <svg
                  className="hidden sm:block shrink-0 size-4"
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
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                Add user
              </button>
            </div>
            {/* End Empty State */}
          </div>
          {/* End Tab Content */}
        </div>
      </div>
      {/* End AlarmLogger Table Card */}
      {/* Import Modal */}
      <div
        id="hs-pro-dicm"
        className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto [--close-when-click-inside:true] pointer-events-none"
        role="dialog"
        tabIndex={-1}
        aria-labelledby="hs-pro-dicm-label"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
          <div className="w-full max-h-full flex flex-col bg-white rounded-xl pointer-events-auto shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-800">
            {/* Header */}
            <div className="py-2.5 px-4 flex justify-between items-center border-b dark:border-neutral-700">
              <h3
                id="hs-pro-dicm-label"
                className="font-medium text-gray-800 dark:text-neutral-200"
              >
                Import contacts
              </h3>
              <button
                type="button"
                className="inline-flex items-center justify-center text-gray-800 bg-gray-100 border border-transparent rounded-full size-6 gap-x-2 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                aria-label="Close"
                data-hs-overlay="#hs-pro-dicm"
              >
                <span className="sr-only">Close</span>
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
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            {/* End Header */}
            {/* Body */}
            <div className="overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
              <div className="p-4">
                {/* Media */}
                <div className="flex w-full pb-5 mb-5 border-b border-gray-200 gap-x-5 last:pb-0 last:mb-0 last:border-b-transparent dark:border-neutral-700 dark:last:border-b-transparent">
                  <svg
                    className="shrink-0 size-8"
                    width={33}
                    height={32}
                    viewBox="0 0 33 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_11766_122209asdasd21123fde)">
                      <path
                        d="M3.11931 28.4817H8.21019V16.1181L0.937439 10.6636V26.3C0.937439 27.5054 1.91381 28.4819 3.11931 28.4819V28.4817Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M25.6647 28.4817H30.7556C31.961 28.4817 32.9374 27.5054 32.9374 26.2999V10.6636L25.6647 16.1181V28.4817Z"
                        fill="#34A853"
                      />
                      <path
                        d="M25.6647 6.66356V16.1181L32.9374 10.6636V7.7545C32.9374 5.05812 29.8593 3.51812 27.701 5.13631L25.6647 6.66356Z"
                        fill="#FBBC04"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.21021 16.1181V6.66356L16.9375 13.2091L25.6647 6.66356V16.1181L16.9375 22.6636L8.21021 16.1181Z"
                        fill="#EA4335"
                      />
                      <path
                        d="M0.937439 7.7545V10.6636L8.21019 16.1181V6.66356L6.17381 5.13631C4.01556 3.51813 0.937439 5.05813 0.937439 7.75438V7.7545Z"
                        fill="#C5221F"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_11766_122209asdasd21123fde">
                        <rect
                          width={32}
                          height={32}
                          fill="white"
                          transform="translate(0.937439)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="grow">
                    <span className="block text-sm font-medium text-gray-800 dark:text-neutral-300">
                      Gmail account
                    </span>
                    <p className="block text-sm text-gray-500 dark:text-neutral-500">
                      Import your Gmail account contacts.
                    </p>
                  </div>
                  <div className="flex flex-col justify-center">
                    <button
                      type="button"
                      className="inline-flex items-center p-2 text-xs font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Connect
                    </button>
                  </div>
                </div>
                {/* End Media */}
                {/* Media */}
                <div className="flex w-full pb-5 mb-5 border-b border-gray-200 gap-x-5 last:pb-0 last:mb-0 last:border-b-transparent dark:border-neutral-700 dark:last:border-b-transparent">
                  <svg
                    className="shrink-0 size-8"
                    width={32}
                    height={32}
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.7438 0.940745C6.84695 1.30308 2.6841 1.63631 2.48837 1.67533C1.9396 1.77319 1.44038 2.14544 1.20563 2.63537L1 3.06646L1.01982 13.3407L1.04893 23.615L1.36234 24.2517C1.53886 24.6042 2.73365 26.2499 4.0362 27.9439C6.61221 31.2836 6.79802 31.47 7.77726 31.5679C8.06156 31.597 10.1966 31.4991 12.5081 31.3622C14.8295 31.2154 18.5508 30.99 20.7842 30.863C30.3233 30.2839 29.8334 30.3328 30.3815 29.8627C31.0672 29.2947 31.0183 30.2251 31.0474 17.7377C31.0672 7.15003 31.0573 6.45509 30.9006 6.13177C30.7148 5.76943 30.3815 5.51487 26.0329 2.45885C23.1243 0.421704 22.9186 0.313932 21.6155 0.294111C21.0772 0.274911 16.6307 0.568497 11.7438 0.940745ZM22.752 2.28232C23.1633 2.46814 26.1704 4.56412 26.6108 4.9661C26.7284 5.08378 26.7675 5.18164 26.7086 5.24048C26.5717 5.35817 7.96245 6.465 7.42421 6.38634C7.17956 6.34732 6.81722 6.20052 6.61159 6.06302C5.75932 5.48514 3.64413 3.75149 3.64413 3.62452C3.64413 3.29129 3.57538 3.29129 11.8714 2.69421C13.4582 2.58644 16.0633 2.39071 17.6502 2.26312C21.0871 1.98874 22.1159 1.99865 22.752 2.28232ZM28.6677 7.63996C28.8046 7.77685 28.9223 8.04132 28.9613 8.29589C28.9904 8.53125 29.0102 12.9189 28.9904 18.0313C28.9613 26.8067 28.9514 27.3555 28.7848 27.61C28.6869 27.7667 28.4912 27.9333 28.3438 27.9823C27.9331 28.1489 8.43318 29.2557 8.03183 29.138C7.84601 29.0891 7.59083 28.9324 7.45394 28.7955L7.21858 28.541L7.18947 19.0799C7.16965 12.4395 7.18947 9.5012 7.26813 9.23672C7.32697 9.041 7.47376 8.80564 7.60136 8.72759C7.77788 8.60991 8.93364 8.51205 12.9101 8.2773C15.7016 8.1206 20.0206 7.85613 22.4987 7.70933C28.3933 7.34638 28.3741 7.34638 28.6677 7.63996Z"
                      className="fill-black dark:fill-neutral-200"
                      fill="currentColor"
                    />
                    <path
                      d="M23.4277 10.8818C22.3698 10.9506 21.4296 11.0484 21.3218 11.1073C20.9985 11.2739 20.8028 11.5483 20.7638 11.8617C20.7347 12.185 20.8325 12.224 21.8898 12.3516L22.35 12.4104V16.5925C22.35 19.0799 22.311 20.7256 22.2621 20.6767C22.2131 20.6178 20.8226 18.5027 19.167 15.9756C17.512 13.4392 16.1407 11.3525 16.1209 11.3333C16.1011 11.3135 15.024 11.3724 13.7313 11.4609C12.1445 11.5687 11.273 11.6666 11.0965 11.7644C10.8122 11.9112 10.4988 12.4303 10.4988 12.7734C10.4988 12.979 10.871 13.0868 11.6545 13.0868H12.0658V25.1139L11.4 25.3196C10.8809 25.4763 10.7044 25.5741 10.6165 25.7698C10.4598 26.1031 10.4697 26.4066 10.6264 26.4066C10.6852 26.4066 11.792 26.3378 13.0649 26.2598C15.582 26.113 15.8657 26.0442 16.1302 25.5252C16.2088 25.3685 16.277 25.2019 16.277 25.1529C16.277 25.1139 15.9345 24.9962 15.5226 24.8984C15.1014 24.8005 14.6802 24.7027 14.5923 24.6828C14.4257 24.6339 14.4157 24.3304 14.4157 20.1186V15.6033L17.3931 20.2753C20.5173 25.1721 20.9093 25.7308 21.3893 25.9755C21.987 26.2889 23.5051 26.0733 24.2688 25.5741L24.5042 25.4273L24.524 18.7479L24.5531 12.0586L25.0722 11.9608C25.6891 11.8431 25.9734 11.5594 25.9734 11.0695C25.9734 10.7561 25.9536 10.7362 25.66 10.7462C25.4847 10.7542 24.4757 10.813 23.4277 10.8818Z"
                      className="fill-black dark:fill-neutral-200"
                      fill="currentColor"
                    />
                  </svg>
                  <div className="grow">
                    <span className="block text-sm font-medium text-gray-800 dark:text-neutral-300">
                      Notion
                    </span>
                    <p className="block text-sm text-gray-500 dark:text-neutral-500">
                      Add your contacts to a Notion file and upload it here.
                    </p>
                  </div>
                  <div className="flex flex-col justify-center">
                    <button
                      type="button"
                      className="inline-flex items-center p-2 text-xs font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Connect
                    </button>
                  </div>
                </div>
                {/* End Media */}
                {/* Media */}
                <div className="flex w-full pb-5 mb-5 border-b border-gray-200 gap-x-5 last:pb-0 last:mb-0 last:border-b-transparent dark:border-neutral-700 dark:last:border-b-transparent">
                  <svg
                    className="shrink-0 size-8"
                    width={32}
                    height={32}
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30.6141 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 12.3359L31.9364 8.86395V3.24228C31.9364 2.89158 31.797 2.55523 31.549 2.30725C31.3011 2.05926 30.9647 1.91994 30.6141 1.91994Z"
                      fill="#41A5EE"
                    />
                    <path
                      d="M31.9364 8.86395H8.12839V15.8079L20.0324 19.2799L31.9364 15.8079V8.86395Z"
                      fill="#2B7CD3"
                    />
                    <path
                      d="M31.9364 15.8079H8.12839V22.7519L20.0324 26.2239L31.9364 22.7519V15.8079Z"
                      fill="#185ABD"
                    />
                    <path
                      d="M31.9364 22.752H8.12839V28.3736C8.12839 28.7244 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.696 9.45071 29.696H30.6141C30.9647 29.696 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7244 31.9364 28.3736V22.752Z"
                      fill="#103F91"
                    />
                    <path
                      opacity="0.1"
                      d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z"
                      className="fill-black dark:fill-neutral-200"
                      fill="currentColor"
                    />
                    <path
                      opacity="0.2"
                      d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                      className="fill-black dark:fill-neutral-200"
                      fill="currentColor"
                    />
                    <path
                      opacity="0.2"
                      d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                      className="fill-black dark:fill-neutral-200"
                      fill="currentColor"
                    />
                    <path
                      opacity="0.2"
                      d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z"
                      className="fill-black dark:fill-neutral-200"
                      fill="currentColor"
                    />
                    <path
                      d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16401 23.7439 0.827669 23.6047 0.579687 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579687 8.25922C0.827669 8.01122 1.16401 7.87194 1.51472 7.87194Z"
                      fill="#185ABD"
                    />
                    <path
                      d="M12.0468 20.7679H10.2612L8.17801 13.9231L5.99558 20.7679H4.20998L2.22598 10.8479H4.01158L5.40038 17.7919L7.48358 11.0463H8.97161L10.9556 17.7919L12.3444 10.8479H14.0308L12.0468 20.7679Z"
                      fill="white"
                    />
                  </svg>
                  <div className="grow">
                    <span className="block text-sm font-medium text-gray-800 dark:text-neutral-300">
                      Word file
                    </span>
                    <span className="block text-sm text-gray-500 dark:text-neutral-500">
                      Add your contacts to a Word file and upload it here.
                    </span>
                  </div>
                  <div className="flex flex-col justify-center">
                    <button
                      type="button"
                      className="inline-flex items-center p-2 text-xs font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Connect
                    </button>
                  </div>
                </div>
                {/* End Media */}
              </div>
            </div>
            {/* End Body */}
            {/* Upload Form */}
            <div className="p-4 bg-gray-100 border-t border-gray-200 rounded-b-xl dark:bg-neutral-700 dark:border-neutral-700">
              {/* Drag 'n Drop */}
              <div className="space-y-2">
                <label className="block mb-2 text-sm font-medium text-gray-800 dark:text-neutral-200">
                  Upload file
                </label>
                <div className="flex justify-center p-12 bg-white border border-gray-300 border-dashed rounded-xl dark:bg-neutral-800 dark:border-neutral-600">
                  <div className="text-center">
                    <svg
                      className="w-16 mx-auto text-gray-400 dark:text-neutral-400"
                      width={70}
                      height={46}
                      viewBox="0 0 70 46"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.05172 9.36853L17.2131 7.5083V41.3608L12.3018 42.3947C9.01306 43.0871 5.79705 40.9434 5.17081 37.6414L1.14319 16.4049C0.515988 13.0978 2.73148 9.92191 6.05172 9.36853Z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="fill-white stroke-gray-400 dark:fill-neutral-800 dark:stroke-neutral-500"
                      />
                      <path
                        d="M63.9483 9.36853L52.7869 7.5083V41.3608L57.6982 42.3947C60.9869 43.0871 64.203 40.9434 64.8292 37.6414L68.8568 16.4049C69.484 13.0978 67.2685 9.92191 63.9483 9.36853Z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="fill-white stroke-gray-400 dark:fill-neutral-800 dark:stroke-neutral-500"
                      />
                      <rect
                        x="17.0656"
                        y="1.62305"
                        width="35.8689"
                        height="42.7541"
                        rx={5}
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="fill-white stroke-gray-400 dark:fill-neutral-800 dark:stroke-neutral-500"
                      />
                      <path
                        d="M47.9344 44.3772H22.0655C19.3041 44.3772 17.0656 42.1386 17.0656 39.3772L17.0656 35.9161L29.4724 22.7682L38.9825 33.7121C39.7832 34.6335 41.2154 34.629 42.0102 33.7025L47.2456 27.5996L52.9344 33.7209V39.3772C52.9344 42.1386 50.6958 44.3772 47.9344 44.3772Z"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="stroke-gray-400 dark:stroke-neutral-500"
                      />
                      <circle
                        cx="39.5902"
                        cy="14.9672"
                        r="4.16393"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="stroke-gray-400 dark:stroke-neutral-500"
                      />
                    </svg>
                    <div className="flex flex-wrap justify-center mt-4 text-sm leading-6 text-gray-600">
                      <span className="font-medium text-gray-800 pe-1 dark:text-neutral-200">
                        Drop your files here or
                      </span>
                      <label
                        htmlFor="hs-pro-daiccf"
                        className="relative font-semibold text-blue-600 bg-white rounded-lg cursor-pointer hover:text-blue-700 decoration-2 hover:underline focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 dark:bg-neutral-800 dark:text-blue-500 dark:hover:text-blue-600"
                      >
                        <span>browse</span>
                        <input
                          id="hs-pro-daiccf"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <p className="mt-1 text-xs text-gray-400 dark:text-neutral-400">
                      CSV, XLS, DOCX
                    </p>
                  </div>
                </div>
              </div>
              {/* End Drag 'n Drop */}
            </div>
            {/* End Upload Form */}
          </div>
        </div>
      </div>
      {/* End Import Modal */}
      {/* Export Modal */}
      <div
        id="hs-pro-decm"
        className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto [--close-when-click-inside:true] pointer-events-none"
        role="dialog"
        tabIndex={-1}
        aria-labelledby="hs-pro-decm-label"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
          <div className="w-full max-h-full flex flex-col bg-white rounded-xl pointer-events-auto shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-800">
            {/* Header */}
            <div className="py-2.5 px-4 flex justify-between items-center border-b dark:border-neutral-700">
              <h3
                id="hs-pro-decm-label"
                className="font-medium text-gray-800 dark:text-neutral-200"
              >
                Export contacts (2)
              </h3>
              <button
                type="button"
                className="inline-flex items-center justify-center text-gray-800 bg-gray-100 border border-transparent rounded-full size-6 gap-x-2 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                aria-label="Close"
                data-hs-overlay="#hs-pro-decm"
              >
                <span className="sr-only">Close</span>
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
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            {/* End Header */}
            {/* Body */}
            <div className="overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
              <div className="p-4">
                {/* List Item */}
                <div className="pb-5 mb-5 border-b border-gray-200 last:pb-0 last:mb-0 last:border-b-0 dark:border-neutral-700">
                  <label className="text-sm text-gray-500 dark:text-neutral-500">
                    Choose what contact details want to export:
                  </label>
                  {/* Grid */}
                  <div className="grid grid-cols-2 mt-2">
                    <div className="space-y-2">
                      {/* Checkbox */}
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="text-blue-600 border-gray-300 rounded shrink-0 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                          id="hs-pro-duecmwcdte1"
                          defaultChecked=""
                        />
                        <label
                          htmlFor="hs-pro-duecmwcdte1"
                          className="text-sm text-gray-800 ms-3 dark:text-neutral-400"
                        >
                          Name
                        </label>
                      </div>
                      {/* End Checkbox */}
                      {/* Checkbox */}
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="text-blue-600 border-gray-300 rounded shrink-0 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                          id="hs-pro-duecmwcdte2"
                          defaultChecked=""
                        />
                        <label
                          htmlFor="hs-pro-duecmwcdte2"
                          className="text-sm text-gray-800 ms-3 dark:text-neutral-400"
                        >
                          User ID
                        </label>
                      </div>
                      {/* End Checkbox */}
                      {/* Checkbox */}
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="text-blue-600 border-gray-300 rounded shrink-0 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                          id="hs-pro-duecmwcdte3"
                          defaultChecked=""
                        />
                        <label
                          htmlFor="hs-pro-duecmwcdte3"
                          className="text-sm text-gray-800 ms-3 dark:text-neutral-400"
                        >
                          Email
                        </label>
                      </div>
                      {/* End Checkbox */}
                    </div>
                    {/* End Col */}
                    <div className="space-y-2">
                      {/* Checkbox */}
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="text-blue-600 border-gray-300 rounded shrink-0 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                          id="hs-pro-duecmwcdte4"
                          defaultChecked=""
                        />
                        <label
                          htmlFor="hs-pro-duecmwcdte4"
                          className="text-sm text-gray-800 ms-3 dark:text-neutral-400"
                        >
                          Address
                        </label>
                      </div>
                      {/* End Checkbox */}
                      {/* Checkbox */}
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="text-blue-600 border-gray-300 rounded shrink-0 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                          id="hs-pro-duecmwcdte5"
                          defaultChecked=""
                        />
                        <label
                          htmlFor="hs-pro-duecmwcdte5"
                          className="text-sm text-gray-800 ms-3 dark:text-neutral-400"
                        >
                          Phone
                        </label>
                      </div>
                      {/* End Checkbox */}
                      {/* Checkbox */}
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="text-blue-600 border-gray-300 rounded shrink-0 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                          id="hs-pro-duecmwcdte6"
                        />
                        <label
                          htmlFor="hs-pro-duecmwcdte6"
                          className="text-sm text-gray-800 ms-3 dark:text-neutral-400"
                        >
                          Signed up as
                        </label>
                      </div>
                      {/* End Checkbox */}
                    </div>
                    {/* End Col */}
                  </div>
                  {/* End Grid */}
                </div>
                {/* End List Item */}
                {/* List Item */}
                <div className="pb-5 mb-5 border-b border-gray-200 last:pb-0 last:mb-0 last:border-b-0 dark:border-neutral-700">
                  <label className="text-sm text-gray-500 dark:text-neutral-500">
                    Choose your format for exporting your contacts:
                  </label>
                  <div className="mt-2 space-y-2">
                    {/* Radio */}
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="hs-pro-duecmfm"
                        className="text-blue-600 border-gray-300 rounded-full shrink-0 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        id="hs-pro-duecmfm1"
                        defaultChecked=""
                      />
                      <label
                        htmlFor="hs-pro-duecmfm1"
                        className="text-sm text-gray-800 ms-3 dark:text-neutral-400"
                      >
                        Regular CSV file
                      </label>
                    </div>
                    {/* End Radio */}
                    {/* Radio */}
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="hs-pro-duecmfm"
                        className="text-blue-600 border-gray-300 rounded-full shrink-0 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        id="hs-pro-duecmfm2"
                      />
                      <label
                        htmlFor="hs-pro-duecmfm2"
                        className="text-sm text-gray-800 ms-3 dark:text-neutral-400"
                      >
                        Google CSV file
                      </label>
                    </div>
                    {/* End Radio */}
                  </div>
                </div>
                {/* End List Item */}
                {/* List Item */}
                <div className="pb-5 mb-5 border-b border-gray-200 last:pb-0 last:mb-0 last:border-b-0 dark:border-neutral-700">
                  <label className="text-sm text-gray-500 dark:text-neutral-500">
                    Date range
                  </label>
                  <div className="space-y-2">
                    {/* Radio */}
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="hs-pro-duecmdtr"
                        className="text-blue-600 border-gray-300 rounded-full shrink-0 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        id="hs-pro-duecmdtr1"
                        defaultChecked=""
                      />
                      <label
                        htmlFor="hs-pro-duecmdtr1"
                        className="text-sm text-gray-800 ms-3 dark:text-neutral-400"
                      >
                        Today (18 Feb)
                      </label>
                    </div>
                    {/* End Radio */}
                    {/* Radio */}
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="hs-pro-duecmdtr"
                        className="text-blue-600 border-gray-300 rounded-full shrink-0 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        id="hs-pro-duecmdtr2"
                      />
                      <label
                        htmlFor="hs-pro-duecmdtr2"
                        className="text-sm text-gray-800 ms-3 dark:text-neutral-400"
                      >
                        Current month
                      </label>
                    </div>
                    {/* End Radio */}
                    {/* Radio */}
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="hs-pro-duecmdtr"
                        className="text-blue-600 border-gray-300 rounded-full shrink-0 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        id="hs-pro-duecmdtr3"
                      />
                      <label
                        htmlFor="hs-pro-duecmdtr3"
                        className="text-sm text-gray-800 ms-3 dark:text-neutral-400"
                      >
                        Last 7 days
                      </label>
                    </div>
                    {/* End Radio */}
                    {/* Radio */}
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="hs-pro-duecmdtr"
                        className="text-blue-600 border-gray-300 rounded-full shrink-0 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        id="hs-pro-duecmdtr4"
                      />
                      <label
                        htmlFor="hs-pro-duecmdtr4"
                        className="text-sm text-gray-800 ms-3 dark:text-neutral-400"
                      >
                        Last month
                      </label>
                    </div>
                    {/* End Radio */}
                    {/* Radio */}
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="hs-pro-duecmdtr"
                        className="text-blue-600 border-gray-300 rounded-full shrink-0 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        id="hs-pro-duecmdtr5"
                      />
                      <label
                        htmlFor="hs-pro-duecmdtr5"
                        className="text-sm text-gray-800 ms-3 dark:text-neutral-400"
                      >
                        All
                      </label>
                    </div>
                    {/* End Radio */}
                    {/* Radio */}
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="hs-pro-duecmdtr"
                        className="text-blue-600 border-gray-300 rounded-full shrink-0 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        id="hs-pro-duecmdtr6"
                      />
                      <label
                        htmlFor="hs-pro-duecmdtr6"
                        className="text-sm text-gray-800 ms-3 dark:text-neutral-400"
                      >
                        Custom
                      </label>
                    </div>
                    {/* End Radio */}
                    <div className="ps-7">
                      <button
                        type="button"
                        className="inline-flex items-center p-2 text-xs font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
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
                          <rect
                            width={18}
                            height={18}
                            x={3}
                            y={4}
                            rx={2}
                            ry={2}
                          />
                          <line x1={16} x2={16} y1={2} y2={6} />
                          <line x1={8} x2={8} y1={2} y2={6} />
                          <line x1={3} x2={21} y1={10} y2={10} />
                          <path d="M8 14h.01" />
                          <path d="M12 14h.01" />
                          <path d="M16 14h.01" />
                          <path d="M8 18h.01" />
                          <path d="M12 18h.01" />
                          <path d="M16 18h.01" />
                        </svg>
                        1 Jan 2023 - 18 Feb 2023
                      </button>
                    </div>
                  </div>
                </div>
                {/* End List Item */}
              </div>
            </div>
            {/* End Body */}
            {/* Footer */}
            <div className="flex justify-between p-4 gap-x-2">
              <div className="flex flex-wrap items-center justify-end flex-1 gap-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-800 align-middle bg-white border border-gray-200 rounded-lg shadow-sm text-start hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  data-hs-overlay="#hs-pro-decm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white align-middle bg-blue-600 border border-blue-600 rounded-lg shadow-sm gap-x-2 text-start hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 focus:ring-blue-300 dark:focus:ring-blue-500"
                  data-hs-overlay="#hs-pro-decm"
                >
                  Export
                </button>
              </div>
            </div>
            {/* Footer */}
          </div>
        </div>
      </div>
      {/* End Export Modal */}
      {/* AlarmLogger Table | AlarmLogger Details Offcanvas */}
      <div
        id="hs-pro-dutoo"
        className="hs-overlay hs-overlay-open:translate-x-0 hidden translate-x-full fixed top-0 end-0 transition-all duration-300 transform size-full flex-1 md:flex flex-col sm:w-[400px] z-[80] bg-white border-s dark:bg-neutral-800 dark:border-neutral-700"
        role="dialog"
        tabIndex={-1}
        aria-labelledby="hs-pro-dutoo-label"
      >
        {/* Close Button */}
        <div className="absolute z-10 top-2 end-4">
          <button
            type="button"
            className="inline-flex items-center justify-center text-gray-800 bg-gray-100 border border-transparent rounded-full size-6 gap-x-2 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
            aria-label="Close"
            data-hs-overlay="#hs-pro-dutoo"
          >
            <span className="sr-only">Close</span>
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
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        {/* End Close Button */}
        {/* Header */}
        <div className="flex flex-col items-center justify-center p-5 mt-5 text-center">
          <Image
            width={38}
            height={38}
            className="rounded-full shrink-0 size-16"
            src="https://images.unsplash.com/photo-1570654639102-bdd95efeca7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80"
            alt="Avatar"
          />
          <div className="mt-2">
            <h3
              id="hs-pro-dutoo-label"
              className="text-lg font-semibold text-gray-800 dark:text-neutral-200"
            >
              Anna Richard
            </h3>
            <p className="text-xs text-gray-500 dark:text-neutral-500">
              Contact was created 22 days ago
            </p>
          </div>
        </div>
        {/* End Header */}
        {/* Body */}
        <div className="mt-5 px-5 h-full flex-1 flex flex-col overflow-y-auto overflow-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
          {/* List Item */}
          <div className="grid grid-cols-3 py-4 border-t border-gray-200 gap-x-4 dark:border-neutral-700">
            <div className="col-span-1">
              <p className="text-sm text-gray-500 dark:text-neutral-500">
                User ID:
              </p>
            </div>
            <div className="col-span-2">
              <p>
                <a
                  className="text-sm font-medium text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline dark:text-blue-400 dark:hover:text-blue-500"
                  href="#"
                >
                  #96810
                </a>
              </p>
            </div>
          </div>
          {/* End List Item */}
          {/* List Item */}
          <div className="grid grid-cols-3 py-4 border-t border-gray-200 gap-x-4 dark:border-neutral-700">
            <div className="col-span-1">
              <p className="text-sm text-gray-500 dark:text-neutral-500">
                Email:
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-800 dark:text-neutral-200">
                anna@site.com
              </p>
            </div>
          </div>
          {/* End List Item */}
          {/* List Item */}
          <div className="grid grid-cols-3 py-4 border-t border-gray-200 gap-x-4 dark:border-neutral-700">
            <div className="col-span-1">
              <p className="text-sm text-gray-500 dark:text-neutral-500">
                Phone:
              </p>
            </div>
            <div className="col-span-2">
              <div className="flex items-center gap-x-2">
                <svg
                  className="rounded-full shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  id="flag-icon-css-us"
                  viewBox="0 0 512 512"
                >
                  <g fillRule="evenodd">
                    <g strokeWidth="1pt">
                      <path
                        fill="#bd3d44"
                        d="M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
                        transform="scale(3.9385)"
                      />
                      <path
                        fill="#fff"
                        d="M0 10h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
                        transform="scale(3.9385)"
                      />
                    </g>
                    <path
                      fill="#192f5d"
                      d="M0 0h98.8v70H0z"
                      transform="scale(3.9385)"
                    />
                    <path
                      fill="#fff"
                      d="M8.2 3l1 2.8H12L9.7 7.5l.9 2.7-2.4-1.7L6 10.2l.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7L74 8.5l-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 7.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 24.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 21.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 38.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 35.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 52.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 49.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 66.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 63.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9z"
                      transform="scale(3.9385)"
                    />
                  </g>
                </svg>
                <span className="text-sm text-gray-800 dark:text-neutral-200">
                  +1 000-00-00
                </span>
              </div>
            </div>
          </div>
          {/* End List Item */}
          {/* List Item */}
          <div className="grid grid-cols-3 py-4 border-t border-gray-200 gap-x-4 dark:border-neutral-700">
            <div className="col-span-1">
              <p className="text-sm text-gray-500 dark:text-neutral-500">
                Address:
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-800 dark:text-neutral-200">
                4970 Park Ave W, Ohio, 44723, Untied States
              </p>
            </div>
          </div>
          {/* End List Item */}
          {/* List Item */}
          <div className="grid items-center grid-cols-3 py-4 border-t border-gray-200 gap-x-4 dark:border-neutral-700">
            <div className="col-span-1">
              <p className="text-sm text-gray-500 dark:text-neutral-500">
                Signed up as:
              </p>
            </div>
            <div className="col-span-2">
              <span className="py-1.5 ps-1.5 pe-2.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                <svg
                  className="size-3"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                Valid account
              </span>
            </div>
          </div>
          {/* End List Item */}
        </div>
        {/* End Body */}
        {/* Footer */}
        <div className="p-5 border-t border-gray-200 dark:border-neutral-700">
          <div className="flex items-center gap-x-2">
            {/* Button */}
            <button
              type="button"
              className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              data-hs-overlay="#hs-pro-deum"
            >
              <svg
                className="hidden sm:block shrink-0 size-4"
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
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                <path d="m15 5 4 4" />
              </svg>
              Edit user
            </button>
            {/* End Button */}
            {/* Button */}
            <button
              type="button"
              className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            >
              <svg
                className="hidden sm:block shrink-0 size-4"
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
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1={10} x2={10} y1={11} y2={17} />
                <line x1={14} x2={14} y1={11} y2={17} />
              </svg>
              Delete
            </button>
            {/* End Button */}
          </div>
        </div>
        {/* End Footer */}
      </div>
      {/* End AlarmLogger Table AlarmLogger Details Offcanvas */}
      {/* Edit AlarmLogger Modal */}
      <div
        id="hs-pro-deum"
        className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto [--close-when-click-inside:true] pointer-events-none"
        role="dialog"
        tabIndex={-1}
        aria-labelledby="hs-pro-deum-label"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
          <div className="w-full max-h-full flex flex-col bg-white rounded-xl pointer-events-auto shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-800">
            {/* Header */}
            <div className="py-2.5 px-4 flex justify-between items-center border-b dark:border-neutral-700">
              <h3
                id="hs-pro-deum-label"
                className="font-medium text-gray-800 dark:text-neutral-200"
              >
                Edit user
              </h3>
              <button
                type="button"
                className="inline-flex items-center justify-center text-gray-800 bg-gray-100 border border-transparent rounded-full size-6 gap-x-2 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                aria-label="Close"
                data-hs-overlay="#hs-pro-deum"
              >
                <span className="sr-only">Close</span>
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
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            {/* End Header */}
            {/* Body */}
            <div className="overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
              <div className="p-4 space-y-5">
                {/* Grid */}
                <div className="grid sm:grid-cols-12 gap-y-1.5 sm:gap-y-0 sm:gap-x-5">
                  <div className="sm:col-span-3">
                    <label className="sm:mt-2.5 inline-block text-sm text-gray-500 dark:text-neutral-500">
                      Avatar
                    </label>
                  </div>
                  {/* End Col */}
                  <div className="sm:col-span-9">
                    {/* Logo Upload Group */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-5">
                      <Image
                        width={38}
                        height={38}
                        className="rounded-full shrink-0 size-20"
                        src="https://images.unsplash.com/photo-1570654639102-bdd95efeca7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80"
                        alt="Avatar"
                      />
                      <div className="grow">
                        <div className="flex items-center gap-x-2">
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 text-xs font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
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
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="17 8 12 3 7 8" />
                              <line x1={12} x2={12} y1={3} y2={15} />
                            </svg>
                            Upload photo
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 text-xs font-medium text-red-500 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-red-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* End Logo Upload Group */}
                  </div>
                  {/* End Col */}
                </div>
                {/* End Grid */}
                {/* Grid */}
                <div className="grid sm:grid-cols-12 gap-y-1.5 sm:gap-y-0 sm:gap-x-5">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="hs-pro-daufnm"
                      className="sm:mt-2.5 inline-block text-sm text-gray-500 dark:text-neutral-500"
                    >
                      Name
                    </label>
                  </div>
                  {/* End Col */}
                  <div className="sm:col-span-9">
                    <input
                      id="hs-pro-daufnm"
                      type="text"
                      className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                      placeholder="James Davidson"
                      defaultValue="Anna Richard "
                    />
                  </div>
                  {/* End Col */}
                </div>
                {/* End Grid */}
                {/* Grid */}
                <div className="grid sm:grid-cols-12 gap-y-1.5 sm:gap-y-0 sm:gap-x-5">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="hs-pro-daufnm"
                      className="sm:mt-2.5 inline-block text-sm text-gray-500 dark:text-neutral-500"
                    >
                      Email
                    </label>
                  </div>
                  {/* End Col */}
                  <div className="sm:col-span-9">
                    <input
                      id="hs-pro-daufem"
                      type="email"
                      className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                      placeholder="james@site.com"
                      defaultValue="anna@site.com "
                    />
                  </div>
                  {/* End Col */}
                </div>
                {/* End Grid */}
                {/* Grid */}
                <div className="grid sm:grid-cols-12 gap-y-1.5 sm:gap-y-0 sm:gap-x-5">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="hs-pro-daufph"
                      className="sm:mt-2.5 inline-block text-sm text-gray-500 dark:text-neutral-500"
                    >
                      Phone
                    </label>
                  </div>
                  {/* End Col */}
                  <div className="sm:col-span-9">
                    <div id="hs-wrapper-for-copy" className="space-y-3">
                      <div
                        id="hs-content-for-copy"
                        className="grid grid-cols-12 gap-2"
                      >
                        <div className="col-span-3">
                          <input
                            id="hs-pro-daufph"
                            type="text"
                            className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                            placeholder="Code"
                            defaultValue=" "
                          />
                        </div>
                        <div className="col-span-9">
                          <input
                            type="text"
                            className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                            placeholder="Phone"
                            defaultValue=" "
                          />
                        </div>
                      </div>
                    </div>
                    {/* Add Phone */}
                    <p className="mt-3 text-end">
                      <button
                        type="button"
                        data-hs-copy-markup='{
                "targetSelector": "#hs-content-for-copy",
                "wrapperSelector": "#hs-wrapper-for-copy",
                "limit": 3
              }'
                        className="py-1.5 px-2 inline-flex items-center gap-x-1 text-xs font-medium rounded-full border border-dashed border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      >
                        <svg
                          className="shrink-0 size-3"
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
                          <path d="M5 12h14" />
                          <path d="M12 5v14" />
                        </svg>
                        Add phone
                      </button>
                    </p>
                    {/* End Add Phone */}
                  </div>
                  {/* End Col */}
                </div>
                {/* End Grid */}
                {/* Grid */}
                <div className="grid sm:grid-cols-12 gap-y-1.5 sm:gap-y-0 sm:gap-x-5">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="hs-pro-daufad"
                      className="sm:mt-2.5 inline-block text-sm text-gray-500 dark:text-neutral-500"
                    >
                      Address
                    </label>
                  </div>
                  {/* End Col */}
                  <div className="space-y-3 sm:col-span-9">
                    <div className="space-y-3">
                      <input
                        id="hs-pro-daufad"
                        type="text"
                        className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                        placeholder="Street"
                        defaultValue="4970 Park Ave W "
                      />
                      <input
                        type="text"
                        className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                        placeholder="Street line 2 (Optional)"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-x-3">
                      <div>
                        <input
                          type="text"
                          className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                          placeholder="City"
                          defaultValue="Ohio "
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                          placeholder="Zip/Postal code"
                          defaultValue={44723}
                        />
                      </div>
                    </div>
                    {/* Select */}
                    <div className="relative">
                      <select
                        data-hs-select='{
                "placeholder": "Select country",
                "hasSearch": true,
                "searchPlaceholder": "Search country",
                "searchClasses": "block w-full text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-400 py-2 px-3",
                "searchWrapperClasses": "bg-white p-2 -mx-1 sticky top-0 dark:bg-neutral-900",
                "toggleTag": "<button type=\"button\" aria-expanded=\"false\"><span data-icon></span><span class=\"text-gray-800 dark:text-neutral-200\" data-title></span></button>",
                "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-2 ps-3 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-neutral-600",
                "dropdownClasses": "max-h-64 p-1 pt-0 space-y-0.5 z-50 w-full overflow-hidden overflow-y-auto bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900",
                "optionClasses": "hs-selected:bg-gray-100 dark:hs-selected:bg-neutral-800 py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
                "optionTemplate": "<div><div class=\"flex items-center\"><div class=\"me-2\" data-icon></div><div class=\"text-gray-800 dark:text-neutral-200\" data-title></div></div></div>",
                "viewport": "#hs-pro-create-new-user"
              }'
                        className="hidden"
                      >
                        <option value="">Choose</option>
                        <option
                          value="AF"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/af.png\" alt=\"Afghanistan\" />"}'
                        >
                          Afghanistan
                        </option>
                        <option
                          value="AX"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ax.png\" alt=\"Aland Islands\" />"}'
                        >
                          Aland Islands
                        </option>
                        <option
                          value="AL"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/al.png\" alt=\"Albania\" />"}'
                        >
                          Albania
                        </option>
                        <option
                          value="DZ"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/dz.png\" alt=\"Algeria\" />"}'
                        >
                          Algeria
                        </option>
                        <option
                          value="AS"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/as.png\" alt=\"American Samoa\" />"}'
                        >
                          American Samoa
                        </option>
                        <option
                          value="AD"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ad.png\" alt=\"Andorra\" />"}'
                        >
                          Andorra
                        </option>
                        <option
                          value="AO"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ao.png\" alt=\"Angola\" />"}'
                        >
                          Angola
                        </option>
                        <option
                          value="AI"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ai.png\" alt=\"Anguilla\" />"}'
                        >
                          Anguilla
                        </option>
                        <option
                          value="AG"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ag.png\" alt=\"Antigua and Barbuda\" />"}'
                        >
                          Antigua and Barbuda
                        </option>
                        <option
                          value="AR"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ar.png\" alt=\"Argentina\" />"}'
                        >
                          Argentina
                        </option>
                        <option
                          value="AM"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/am.png\" alt=\"Armenia\" />"}'
                        >
                          Armenia
                        </option>
                        <option
                          value="AW"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/aw.png\" alt=\"Aruba\" />"}'
                        >
                          Aruba
                        </option>
                        <option
                          value="AU"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/au.png\" alt=\"Australia\" />"}'
                        >
                          Australia
                        </option>
                        <option
                          value="AT"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/at.png\" alt=\"Austria\" />"}'
                        >
                          Austria
                        </option>
                        <option
                          value="AZ"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/az.png\" alt=\"Azerbaijan\" />"}'
                        >
                          Azerbaijan
                        </option>
                        <option
                          value="BS"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/bs.png\" alt=\"Bahamas\" />"}'
                        >
                          Bahamas
                        </option>
                        <option
                          value="BH"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/bh.png\" alt=\"Bahrain\" />"}'
                        >
                          Bahrain
                        </option>
                        <option
                          value="BD"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/bd.png\" alt=\"Bangladesh\" />"}'
                        >
                          Bangladesh
                        </option>
                        <option
                          value="BB"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/bb.png\" alt=\"Barbados\" />"}'
                        >
                          Barbados
                        </option>
                        <option
                          value="BY"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/by.png\" alt=\"Belarus\" />"}'
                        >
                          Belarus
                        </option>
                        <option
                          value="BE"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/be.png\" alt=\"Belgium\" />"}'
                        >
                          Belgium
                        </option>
                        <option
                          value="BZ"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/bz.png\" alt=\"Belize\" />"}'
                        >
                          Belize
                        </option>
                        <option
                          value="BJ"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/bj.png\" alt=\"Benin\" />"}'
                        >
                          Benin
                        </option>
                        <option
                          value="BM"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/bm.png\" alt=\"Bermuda\" />"}'
                        >
                          Bermuda
                        </option>
                        <option
                          value="BT"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/bt.png\" alt=\"Bhutan\" />"}'
                        >
                          Bhutan
                        </option>
                        <option
                          value="BO"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/bo.png\" alt=\"Bolivia (Plurinational State of)\" />"}'
                        >
                          Bolivia (Plurinational State of)
                        </option>
                        <option
                          value="BQ"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/bq.png\" alt=\"Bonaire, Sint Eustatius and Saba\" />"}'
                        >
                          Bonaire, Sint Eustatius and Saba
                        </option>
                        <option
                          value="BA"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ba.png\" alt=\"Bosnia and Herzegovina\" />"}'
                        >
                          Bosnia and Herzegovina
                        </option>
                        <option
                          value="BW"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/bw.png\" alt=\"Botswana\" />"}'
                        >
                          Botswana
                        </option>
                        <option
                          value="BR"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/br.png\" alt=\"Brazil\" />"}'
                        >
                          Brazil
                        </option>
                        <option
                          value="IO"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/io.png\" alt=\"British Indian Ocean Territory\" />"}'
                        >
                          British Indian Ocean Territory
                        </option>
                        <option
                          value="BN"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/bn.png\" alt=\"Brunei Darussalam\" />"}'
                        >
                          Brunei Darussalam
                        </option>
                        <option
                          value="BG"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/bg.png\" alt=\"Bulgaria\" />"}'
                        >
                          Bulgaria
                        </option>
                        <option
                          value="BF"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/bf.png\" alt=\"Burkina Faso\" />"}'
                        >
                          Burkina Faso
                        </option>
                        <option
                          value="BI"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/bi.png\" alt=\"Burundi\" />"}'
                        >
                          Burundi
                        </option>
                        <option
                          value="CV"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/cv.png\" alt=\"Cabo Verde\" />"}'
                        >
                          Cabo Verde
                        </option>
                        <option
                          value="KH"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/kh.png\" alt=\"Cambodia\" />"}'
                        >
                          Cambodia
                        </option>
                        <option
                          value="CM"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/cm.png\" alt=\"Cameroon\" />"}'
                        >
                          Cameroon
                        </option>
                        <option
                          value="CA"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ca.png\" alt=\"Canada\" />"}'
                        >
                          Canada
                        </option>
                        <option
                          value="KY"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ky.png\" alt=\"Cayman Islands\" />"}'
                        >
                          Cayman Islands
                        </option>
                        <option
                          value="CF"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/cf.png\" alt=\"Central African Republic\" />"}'
                        >
                          Central African Republic
                        </option>
                        <option
                          value="TD"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/td.png\" alt=\"Chad\" />"}'
                        >
                          Chad
                        </option>
                        <option
                          value="CL"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/cl.png\" alt=\"Chile\" />"}'
                        >
                          Chile
                        </option>
                        <option
                          value="CN"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/cn.png\" alt=\"China\" />"}'
                        >
                          China
                        </option>
                        <option
                          value="CX"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/cx.png\" alt=\"Christmas Island\" />"}'
                        >
                          Christmas Island
                        </option>
                        <option
                          value="CC"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/cc.png\" alt=\"Cocos (Keeling) Islands\" />"}'
                        >
                          Cocos (Keeling) Islands
                        </option>
                        <option
                          value="CO"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/co.png\" alt=\"Colombia\" />"}'
                        >
                          Colombia
                        </option>
                        <option
                          value="KM"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/km.png\" alt=\"Comoros\" />"}'
                        >
                          Comoros
                        </option>
                        <option
                          value="CK"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ck.png\" alt=\"Cook Islands\" />"}'
                        >
                          Cook Islands
                        </option>
                        <option
                          value="CR"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/cr.png\" alt=\"Costa Rica\" />"}'
                        >
                          Costa Rica
                        </option>
                        <option
                          value="HR"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/hr.png\" alt=\"Croatia\" />"}'
                        >
                          Croatia
                        </option>
                        <option
                          value="CU"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/cu.png\" alt=\"Cuba\" />"}'
                        >
                          Cuba
                        </option>
                        <option
                          value="CW"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/cw.png\" alt=\"Curaçao\" />"}'
                        >
                          Curaçao
                        </option>
                        <option
                          value="CY"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/cy.png\" alt=\"Cyprus\" />"}'
                        >
                          Cyprus
                        </option>
                        <option
                          value="CZ"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/cz.png\" alt=\"Czech Republic\" />"}'
                        >
                          Czech Republic
                        </option>
                        <option
                          value="CI"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ci.png\" alt=Côte dIvoire\" />"}'
                        >
                          Côte dIvoire
                        </option>
                        <option
                          value="CD"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/cd.png\" alt=\"Democratic Republic of the Congo\" />"}'
                        >
                          Democratic Republic of the Congo
                        </option>
                        <option
                          value="DK"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/dk.png\" alt=\"Denmark\" />"}'
                        >
                          Denmark
                        </option>
                        <option
                          value="DJ"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/dj.png\" alt=\"Djibouti\" />"}'
                        >
                          Djibouti
                        </option>
                        <option
                          value="DM"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/dm.png\" alt=\"Dominica\" />"}'
                        >
                          Dominica
                        </option>
                        <option
                          value="DO"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/do.png\" alt=\"Dominican Republic\" />"}'
                        >
                          Dominican Republic
                        </option>
                        <option
                          value="EC"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ec.png\" alt=\"Ecuador\" />"}'
                        >
                          Ecuador
                        </option>
                        <option
                          value="EG"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/eg.png\" alt=\"Egypt\" />"}'
                        >
                          Egypt
                        </option>
                        <option
                          value="SV"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/sv.png\" alt=\"El Salvador\" />"}'
                        >
                          El Salvador
                        </option>
                        <option
                          value="GB-ENG"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/gb.png\" alt=\"England\" />"}'
                        >
                          England
                        </option>
                        <option
                          value="GQ"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/gq.png\" alt=\"Equatorial Guinea\" />"}'
                        >
                          Equatorial Guinea
                        </option>
                        <option
                          value="ER"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/er.png\" alt=\"Eritrea\" />"}'
                        >
                          Eritrea
                        </option>
                        <option
                          value="EE"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ee.png\" alt=\"Estonia\" />"}'
                        >
                          Estonia
                        </option>
                        <option
                          value="ET"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/et.png\" alt=\"Ethiopia\" />"}'
                        >
                          Ethiopia
                        </option>
                        <option
                          value="FK"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/fk.png\" alt=\"Falkland Islands\" />"}'
                        >
                          Falkland Islands
                        </option>
                        <option
                          value="FO"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/fo.png\" alt=\"Faroe Islands\" />"}'
                        >
                          Faroe Islands
                        </option>
                        <option
                          value="FM"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/fm.png\" alt=\"Federated States of Micronesia\" />"}'
                        >
                          Federated States of Micronesia
                        </option>
                        <option
                          value="FJ"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/fj.png\" alt=\"Fiji\" />"}'
                        >
                          Fiji
                        </option>
                        <option
                          value="FI"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/fi.png\" alt=\"Finland\" />"}'
                        >
                          Finland
                        </option>
                        <option
                          value="FR"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/fr.png\" alt=\"France\" />"}'
                        >
                          France
                        </option>
                        <option
                          value="GF"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/gf.png\" alt=\"French Guiana\" />"}'
                        >
                          French Guiana
                        </option>
                        <option
                          value="PF"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/pf.png\" alt=\"French Polynesia\" />"}'
                        >
                          French Polynesia
                        </option>
                        <option
                          value="TF"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/tf.png\" alt=\"French Southern Territories\" />"}'
                        >
                          French Southern Territories
                        </option>
                        <option
                          value="GA"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ga.png\" alt=\"Gabon\" />"}'
                        >
                          Gabon
                        </option>
                        <option
                          value="GM"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/gm.png\" alt=\"Gambia\" />"}'
                        >
                          Gambia
                        </option>
                        <option
                          value="GE"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ge.png\" alt=\"Georgia\" />"}'
                        >
                          Georgia
                        </option>
                        <option
                          value="DE"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/de.png\" alt=\"Germany\" />"}'
                        >
                          Germany
                        </option>
                        <option
                          value="GH"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/gh.png\" alt=\"Ghana\" />"}'
                        >
                          Ghana
                        </option>
                        <option
                          value="GI"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/gi.png\" alt=\"Gibraltar\" />"}'
                        >
                          Gibraltar
                        </option>
                        <option
                          value="GR"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/gr.png\" alt=\"Greece\" />"}'
                        >
                          Greece
                        </option>
                        <option
                          value="GL"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/gl.png\" alt=\"Greenland\" />"}'
                        >
                          Greenland
                        </option>
                        <option
                          value="GD"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/gd.png\" alt=\"Grenada\" />"}'
                        >
                          Grenada
                        </option>
                        <option
                          value="GP"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/gp.png\" alt=\"Guadeloupe\" />"}'
                        >
                          Guadeloupe
                        </option>
                        <option
                          value="GU"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/gu.png\" alt=\"Guam\" />"}'
                        >
                          Guam
                        </option>
                        <option
                          value="GT"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/gt.png\" alt=\"Guatemala\" />"}'
                        >
                          Guatemala
                        </option>
                        <option
                          value="GG"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/gg.png\" alt=\"Guernsey\" />"}'
                        >
                          Guernsey
                        </option>
                        <option
                          value="GN"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/gn.png\" alt=\"Guinea\" />"}'
                        >
                          Guinea
                        </option>
                        <option
                          value="GW"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/gw.png\" alt=\"Guinea-Bissau\" />"}'
                        >
                          Guinea-Bissau
                        </option>
                        <option
                          value="GY"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/gy.png\" alt=\"Guyana\" />"}'
                        >
                          Guyana
                        </option>
                        <option
                          value="HT"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ht.png\" alt=\"Haiti\" />"}'
                        >
                          Haiti
                        </option>
                        <option
                          value="VA"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/va.png\" alt=\"Holy See\" />"}'
                        >
                          Holy See
                        </option>
                        <option
                          value="HN"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/hn.png\" alt=\"Honduras\" />"}'
                        >
                          Honduras
                        </option>
                        <option
                          value="HK"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/hk.png\" alt=\"Hong Kong\" />"}'
                        >
                          Hong Kong
                        </option>
                        <option
                          value="HU"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/hu.png\" alt=\"Hungary\" />"}'
                        >
                          Hungary
                        </option>
                        <option
                          value="IS"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/is.png\" alt=\"Iceland\" />"}'
                        >
                          Iceland
                        </option>
                        <option
                          value="IN"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/in.png\" alt=\"India\" />"}'
                        >
                          India
                        </option>
                        <option
                          value="ID"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/id.png\" alt=\"Indonesia\" />"}'
                        >
                          Indonesia
                        </option>
                        <option
                          value="IR"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ir.png\" alt=\"Iran (Islamic Republic of)\" />"}'
                        >
                          Iran (Islamic Republic of)
                        </option>
                        <option
                          value="IQ"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/iq.png\" alt=\"Iraq\" />"}'
                        >
                          Iraq
                        </option>
                        <option
                          value="IE"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ie.png\" alt=\"Ireland\" />"}'
                        >
                          Ireland
                        </option>
                        <option
                          value="IM"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/im.png\" alt=\"Isle of Man\" />"}'
                        >
                          Isle of Man
                        </option>
                        <option
                          value="IL"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/il.png\" alt=\"Israel\" />"}'
                        >
                          Israel
                        </option>
                        <option
                          value="IT"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/it.png\" alt=\"Italy\" />"}'
                        >
                          Italy
                        </option>
                        <option
                          value="JM"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/jm.png\" alt=\"Jamaica\" />"}'
                        >
                          Jamaica
                        </option>
                        <option
                          value="JP"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/jp.png\" alt=\"Japan\" />"}'
                        >
                          Japan
                        </option>
                        <option
                          value="JE"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/je.png\" alt=\"Jersey\" />"}'
                        >
                          Jersey
                        </option>
                        <option
                          value="JO"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/jo.png\" alt=\"Jordan\" />"}'
                        >
                          Jordan
                        </option>
                        <option
                          value="KZ"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/kz.png\" alt=\"Kazakhstan\" />"}'
                        >
                          Kazakhstan
                        </option>
                        <option
                          value="KE"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ke.png\" alt=\"Kenya\" />"}'
                        >
                          Kenya
                        </option>
                        <option
                          value="KI"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ki.png\" alt=\"Kiribati\" />"}'
                        >
                          Kiribati
                        </option>
                        <option
                          value="KW"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/kw.png\" alt=\"Kuwait\" />"}'
                        >
                          Kuwait
                        </option>
                        <option
                          value="KG"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/kg.png\" alt=\"Kyrgyzstan\" />"}'
                        >
                          Kyrgyzstan
                        </option>
                        <option
                          value="LA"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/la.png\" alt=\"Laos\" />"}'
                        >
                          Laos
                        </option>
                        <option
                          value="LV"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/lv.png\" alt=\"Latvia\" />"}'
                        >
                          Latvia
                        </option>
                        <option
                          value="LB"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/lb.png\" alt=\"Lebanon\" />"}'
                        >
                          Lebanon
                        </option>
                        <option
                          value="LS"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ls.png\" alt=\"Lesotho\" />"}'
                        >
                          Lesotho
                        </option>
                        <option
                          value="LR"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/lr.png\" alt=\"Liberia\" />"}'
                        >
                          Liberia
                        </option>
                        <option
                          value="LY"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ly.png\" alt=\"Libya\" />"}'
                        >
                          Libya
                        </option>
                        <option
                          value="LI"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/li.png\" alt=\"Liechtenstein\" />"}'
                        >
                          Liechtenstein
                        </option>
                        <option
                          value="LT"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/lt.png\" alt=\"Lithuania\" />"}'
                        >
                          Lithuania
                        </option>
                        <option
                          value="LU"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/lu.png\" alt=\"Luxembourg\" />"}'
                        >
                          Luxembourg
                        </option>
                        <option
                          value="MO"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/mo.png\" alt=\"Macau\" />"}'
                        >
                          Macau
                        </option>
                        <option
                          value="MG"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/mg.png\" alt=\"Madagascar\" />"}'
                        >
                          Madagascar
                        </option>
                        <option
                          value="MW"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/mw.png\" alt=\"Malawi\" />"}'
                        >
                          Malawi
                        </option>
                        <option
                          value="MY"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/my.png\" alt=\"Malaysia\" />"}'
                        >
                          Malaysia
                        </option>
                        <option
                          value="MV"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/mv.png\" alt=\"Maldives\" />"}'
                        >
                          Maldives
                        </option>
                        <option
                          value="ML"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ml.png\" alt=\"Mali\" />"}'
                        >
                          Mali
                        </option>
                        <option
                          value="MT"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/mt.png\" alt=\"Malta\" />"}'
                        >
                          Malta
                        </option>
                        <option
                          value="MH"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/mh.png\" alt=\"Marshall Islands\" />"}'
                        >
                          Marshall Islands
                        </option>
                        <option
                          value="MQ"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/mq.png\" alt=\"Martinique\" />"}'
                        >
                          Martinique
                        </option>
                        <option
                          value="MR"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/mr.png\" alt=\"Mauritania\" />"}'
                        >
                          Mauritania
                        </option>
                        <option
                          value="MU"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/mu.png\" alt=\"Mauritius\" />"}'
                        >
                          Mauritius
                        </option>
                        <option
                          value="YT"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/yt.png\" alt=\"Mayotte\" />"}'
                        >
                          Mayotte
                        </option>
                        <option
                          value="MX"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/mx.png\" alt=\"Mexico\" />"}'
                        >
                          Mexico
                        </option>
                        <option
                          value="MD"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/md.png\" alt=\"Moldova\" />"}'
                        >
                          Moldova
                        </option>
                        <option
                          value="MC"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/mc.png\" alt=\"Monaco\" />"}'
                        >
                          Monaco
                        </option>
                        <option
                          value="MN"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/mn.png\" alt=\"Mongolia\" />"}'
                        >
                          Mongolia
                        </option>
                        <option
                          value="ME"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/me.png\" alt=\"Montenegro\" />"}'
                        >
                          Montenegro
                        </option>
                        <option
                          value="MS"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ms.png\" alt=\"Montserrat\" />"}'
                        >
                          Montserrat
                        </option>
                        <option
                          value="MA"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ma.png\" alt=\"Morocco\" />"}'
                        >
                          Morocco
                        </option>
                        <option
                          value="MZ"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/mz.png\" alt=\"Mozambique\" />"}'
                        >
                          Mozambique
                        </option>
                        <option
                          value="MM"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/mm.png\" alt=\"Myanmar\" />"}'
                        >
                          Myanmar
                        </option>
                        <option
                          value="NA"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/na.png\" alt=\"Namibia\" />"}'
                        >
                          Namibia
                        </option>
                        <option
                          value="NR"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/nr.png\" alt=\"Nauru\" />"}'
                        >
                          Nauru
                        </option>
                        <option
                          value="NP"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/np.png\" alt=\"Nepal\" />"}'
                        >
                          Nepal
                        </option>
                        <option
                          value="NL"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/nl.png\" alt=\"Netherlands\" />"}'
                        >
                          Netherlands
                        </option>
                        <option
                          value="NC"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/nc.png\" alt=\"New Caledonia\" />"}'
                        >
                          New Caledonia
                        </option>
                        <option
                          value="NZ"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/nz.png\" alt=\"New Zealand\" />"}'
                        >
                          New Zealand
                        </option>
                        <option
                          value="NI"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ni.png\" alt=\"Nicaragua\" />"}'
                        >
                          Nicaragua
                        </option>
                        <option
                          value="NE"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ne.png\" alt=\"Niger\" />"}'
                        >
                          Niger
                        </option>
                        <option
                          value="NG"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ng.png\" alt=\"Nigeria\" />"}'
                        >
                          Nigeria
                        </option>
                        <option
                          value="NU"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/nu.png\" alt=\"Niue\" />"}'
                        >
                          Niue
                        </option>
                        <option
                          value="NF"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/nf.png\" alt=\"Norfolk Island\" />"}'
                        >
                          Norfolk Island
                        </option>
                        <option
                          value="KP"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/kp.png\" alt=\"North Korea\" />"}'
                        >
                          North Korea
                        </option>
                        <option
                          value="MK"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/mk.png\" alt=\"North Macedonia\" />"}'
                        >
                          North Macedonia
                        </option>
                        <option
                          value="GB-NIR"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/gb.png\" alt=\"Northern Ireland\" />"}'
                        >
                          Northern Ireland
                        </option>
                        <option
                          value="MP"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/mp.png\" alt=\"Northern Mariana Islands\" />"}'
                        >
                          Northern Mariana Islands
                        </option>
                        <option
                          value="NO"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/no.png\" alt=\"Norway\" />"}'
                        >
                          Norway
                        </option>
                        <option
                          value="OM"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/om.png\" alt=\"Oman\" />"}'
                        >
                          Oman
                        </option>
                        <option
                          value="PK"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/pk.png\" alt=\"Pakistan\" />"}'
                        >
                          Pakistan
                        </option>
                        <option
                          value="PW"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/pw.png\" alt=\"Palau\" />"}'
                        >
                          Palau
                        </option>
                        <option
                          value="PA"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/pa.png\" alt=\"Panama\" />"}'
                        >
                          Panama
                        </option>
                        <option
                          value="PG"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/pg.png\" alt=\"Papua New Guinea\" />"}'
                        >
                          Papua New Guinea
                        </option>
                        <option
                          value="PY"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/py.png\" alt=\"Paraguay\" />"}'
                        >
                          Paraguay
                        </option>
                        <option
                          value="PE"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/pe.png\" alt=\"Peru\" />"}'
                        >
                          Peru
                        </option>
                        <option
                          value="PH"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ph.png\" alt=\"Philippines\" />"}'
                        >
                          Philippines
                        </option>
                        <option
                          value="PN"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/pn.png\" alt=\"Pitcairn\" />"}'
                        >
                          Pitcairn
                        </option>
                        <option
                          value="PL"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/pl.png\" alt=\"Poland\" />"}'
                        >
                          Poland
                        </option>
                        <option
                          value="PT"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/pt.png\" alt=\"Portugal\" />"}'
                        >
                          Portugal
                        </option>
                        <option
                          value="PR"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/pr.png\" alt=\"Puerto Rico\" />"}'
                        >
                          Puerto Rico
                        </option>
                        <option
                          value="QA"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/qa.png\" alt=\"Qatar\" />"}'
                        >
                          Qatar
                        </option>
                        <option
                          value="CG"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/cg.png\" alt=\"Republic of the Congo\" />"}'
                        >
                          Republic of the Congo
                        </option>
                        <option
                          value="RO"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ro.png\" alt=\"Romania\" />"}'
                        >
                          Romania
                        </option>
                        <option
                          value="RU"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ru.png\" alt=\"Russia\" />"}'
                        >
                          Russia
                        </option>
                        <option
                          value="RW"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/rw.png\" alt=\"Rwanda\" />"}'
                        >
                          Rwanda
                        </option>
                        <option
                          value="RE"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/re.png\" alt=\"Réunion\" />"}'
                        >
                          Réunion
                        </option>
                        <option
                          value="BL"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/bl.png\" alt=\"Saint Barthélemy\" />"}'
                        >
                          Saint Barthélemy
                        </option>
                        <option
                          value="SH"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/sh.png\" alt=\"Saint Helena, Ascension and Tristan da Cunha\" />"}'
                        >
                          Saint Helena, Ascension and Tristan da Cunha
                        </option>
                        <option
                          value="KN"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/kn.png\" alt=\"Saint Kitts and Nevis\" />"}'
                        >
                          Saint Kitts and Nevis
                        </option>
                        <option
                          value="LC"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/lc.png\" alt=\"Saint Lucia\" />"}'
                        >
                          Saint Lucia
                        </option>
                        <option
                          value="MF"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/mf.png\" alt=\"Saint Martin\" />"}'
                        >
                          Saint Martin
                        </option>
                        <option
                          value="PM"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/pm.png\" alt=\"Saint Pierre and Miquelon\" />"}'
                        >
                          Saint Pierre and Miquelon
                        </option>
                        <option
                          value="VC"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/vc.png\" alt=\"Saint Vincent and the Grenadines\" />"}'
                        >
                          Saint Vincent and the Grenadines
                        </option>
                        <option
                          value="WS"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ws.png\" alt=\"Samoa\" />"}'
                        >
                          Samoa
                        </option>
                        <option
                          value="SM"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/sm.png\" alt=\"San Marino\" />"}'
                        >
                          San Marino
                        </option>
                        <option
                          value="ST"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/st.png\" alt=\"Sao Tome and Principe\" />"}'
                        >
                          Sao Tome and Principe
                        </option>
                        <option
                          value="SA"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/sa.png\" alt=\"Saudi Arabia\" />"}'
                        >
                          Saudi Arabia
                        </option>
                        <option
                          value="GB-SCT"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/gb.png\" alt=\"Scotland\" />"}'
                        >
                          Scotland
                        </option>
                        <option
                          value="SN"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/sn.png\" alt=\"Senegal\" />"}'
                        >
                          Senegal
                        </option>
                        <option
                          value="RS"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/rs.png\" alt=\"Serbia\" />"}'
                        >
                          Serbia
                        </option>
                        <option
                          value="SC"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/sc.png\" alt=\"Seychelles\" />"}'
                        >
                          Seychelles
                        </option>
                        <option
                          value="SL"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/sl.png\" alt=\"Sierra Leone\" />"}'
                        >
                          Sierra Leone
                        </option>
                        <option
                          value="SG"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/sg.png\" alt=\"Singapore\" />"}'
                        >
                          Singapore
                        </option>
                        <option
                          value="SX"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/sx.png\" alt=\"Sint Maarten\" />"}'
                        >
                          Sint Maarten
                        </option>
                        <option
                          value="SK"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/sk.png\" alt=\"Slovakia\" />"}'
                        >
                          Slovakia
                        </option>
                        <option
                          value="SI"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/si.png\" alt=\"Slovenia\" />"}'
                        >
                          Slovenia
                        </option>
                        <option
                          value="SB"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/sb.png\" alt=\"Solomon Islands\" />"}'
                        >
                          Solomon Islands
                        </option>
                        <option
                          value="SO"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/so.png\" alt=\"Somalia\" />"}'
                        >
                          Somalia
                        </option>
                        <option
                          value="ZA"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/za.png\" alt=\"South Africa\" />"}'
                        >
                          South Africa
                        </option>
                        <option
                          value="GS"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/gs.png\" alt=\"South Georgia and the South Sandwich Islands\" />"}'
                        >
                          South Georgia and the South Sandwich Islands
                        </option>
                        <option
                          value="KR"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/kr.png\" alt=\"South Korea\" />"}'
                        >
                          South Korea
                        </option>
                        <option
                          value="SS"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ss.png\" alt=\"South Sudan\" />"}'
                        >
                          South Sudan
                        </option>
                        <option
                          value="ES"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/es.png\" alt=\"Spain\" />"}'
                        >
                          Spain
                        </option>
                        <option
                          value="LK"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/lk.png\" alt=\"Sri Lanka\" />"}'
                        >
                          Sri Lanka
                        </option>
                        <option
                          value="PS"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ps.png\" alt=\"State of Palestine\" />"}'
                        >
                          State of Palestine
                        </option>
                        <option
                          value="SD"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/sd.png\" alt=\"Sudan\" />"}'
                        >
                          Sudan
                        </option>
                        <option
                          value="SR"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/sr.png\" alt=\"Suriname\" />"}'
                        >
                          Suriname
                        </option>
                        <option
                          value="SJ"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/sj.png\" alt=\"Svalbard and Jan Mayen\" />"}'
                        >
                          Svalbard and Jan Mayen
                        </option>
                        <option
                          value="SZ"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/sz.png\" alt=\"Swaziland\" />"}'
                        >
                          Swaziland
                        </option>
                        <option
                          value="SE"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/se.png\" alt=\"Sweden\" />"}'
                        >
                          Sweden
                        </option>
                        <option
                          value="CH"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ch.png\" alt=\"Switzerland\" />"}'
                        >
                          Switzerland
                        </option>
                        <option
                          value="SY"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/sy.png\" alt=\"Syrian Arab Republic\" />"}'
                        >
                          Syrian Arab Republic
                        </option>
                        <option
                          value="TW"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/tw.png\" alt=\"Taiwan\" />"}'
                        >
                          Taiwan
                        </option>
                        <option
                          value="TJ"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/tj.png\" alt=\"Tajikistan\" />"}'
                        >
                          Tajikistan
                        </option>
                        <option
                          value="TZ"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/tz.png\" alt=\"Tanzania\" />"}'
                        >
                          Tanzania
                        </option>
                        <option
                          value="TH"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/th.png\" alt=\"Thailand\" />"}'
                        >
                          Thailand
                        </option>
                        <option
                          value="TL"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/tl.png\" alt=\"Timor-Leste\" />"}'
                        >
                          Timor-Leste
                        </option>
                        <option
                          value="TG"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/tg.png\" alt=\"Togo\" />"}'
                        >
                          Togo
                        </option>
                        <option
                          value="TK"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/tk.png\" alt=\"Tokelau\" />"}'
                        >
                          Tokelau
                        </option>
                        <option
                          value="TO"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/to.png\" alt=\"Tonga\" />"}'
                        >
                          Tonga
                        </option>
                        <option
                          value="TT"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/tt.png\" alt=\"Trinidad and Tobago\" />"}'
                        >
                          Trinidad and Tobago
                        </option>
                        <option
                          value="TN"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/tn.png\" alt=\"Tunisia\" />"}'
                        >
                          Tunisia
                        </option>
                        <option
                          value="TR"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/tr.png\" alt=\"Turkey\" />"}'
                        >
                          Turkey
                        </option>
                        <option
                          value="TM"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/tm.png\" alt=\"Turkmenistan\" />"}'
                        >
                          Turkmenistan
                        </option>
                        <option
                          value="TC"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/tc.png\" alt=\"Turks and Caicos Islands\" />"}'
                        >
                          Turks and Caicos Islands
                        </option>
                        <option
                          value="TV"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/tv.png\" alt=\"Tuvalu\" />"}'
                        >
                          Tuvalu
                        </option>
                        <option
                          value="UG"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ug.png\" alt=\"Uganda\" />"}'
                        >
                          Uganda
                        </option>
                        <option
                          value="UA"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ua.png\" alt=\"Ukraine\" />"}'
                        >
                          Ukraine
                        </option>
                        <option
                          value="AE"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ae.png\" alt=\"United Arab Emirates\" />"}'
                        >
                          United Arab Emirates
                        </option>
                        <option
                          value="GB"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/gb.png\" alt=\"United Kingdom\" />"}'
                        >
                          United Kingdom
                        </option>
                        <option
                          value="UM"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/um.png\" alt=\"United States Minor Outlying Islands\" />"}'
                        >
                          United States Minor Outlying Islands
                        </option>
                        <option
                          value="US"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/us.png\" alt=\"United States of America\" />"}'
                        >
                          United States of America
                        </option>
                        <option
                          value="UY"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/uy.png\" alt=\"Uruguay\" />"}'
                        >
                          Uruguay
                        </option>
                        <option
                          value="UZ"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/uz.png\" alt=\"Uzbekistan\" />"}'
                        >
                          Uzbekistan
                        </option>
                        <option
                          value="VU"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/vu.png\" alt=\"Vanuatu\" />"}'
                        >
                          Vanuatu
                        </option>
                        <option
                          value="VE"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ve.png\" alt=\"Venezuela (Bolivarian Republic of)\" />"}'
                        >
                          Venezuela (Bolivarian Republic of)
                        </option>
                        <option
                          value="VN"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/vn.png\" alt=\"Vietnam\" />"}'
                        >
                          Vietnam
                        </option>
                        <option
                          value="VG"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/vg.png\" alt=\"Virgin Islands (British)\" />"}'
                        >
                          Virgin Islands (British)
                        </option>
                        <option
                          value="VI"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/vi.png\" alt=\"Virgin Islands (U.S.)\" />"}'
                        >
                          Virgin Islands (U.S.)
                        </option>
                        <option
                          value="GB-WLS"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/gb.png\" alt=\"Wales\" />"}'
                        >
                          Wales
                        </option>
                        <option
                          value="WF"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/wf.png\" alt=\"Wallis and Futuna\" />"}'
                        >
                          Wallis and Futuna
                        </option>
                        <option
                          value="EH"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/eh.png\" alt=\"Western Sahara\" />"}'
                        >
                          Western Sahara
                        </option>
                        <option
                          value="YE"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/ye.png\" alt=\"Yemen\" />"}'
                        >
                          Yemen
                        </option>
                        <option
                          value="ZM"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/zm.png\" alt=\"Zambia\" />"}'
                        >
                          Zambia
                        </option>
                        <option
                          value="ZW"
                          data-hs-select-option='{
                "icon": "<img class=\"inline-block size-4 rounded-full\" src=\"../../assets/vendor/svg-country-flags/png100px/zw.png\" alt=\"Zimbabwe\" />"}'
                        >
                          Zimbabwe
                        </option>
                      </select>
                      <div className="absolute top-1/2 end-2.5 -translate-y-1/2">
                        <svg
                          className="shrink-0 size-3.5 text-gray-500 dark:text-neutral-500"
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
                          <path d="m7 15 5 5 5-5" />
                          <path d="m7 9 5-5 5 5" />
                        </svg>
                      </div>
                    </div>
                    {/* End Select */}
                  </div>
                  {/* End Col */}
                </div>
                {/* End Grid */}
              </div>
            </div>
            {/* End Body */}
            {/* Footer */}
            <div className="flex justify-end p-4 gap-x-2">
              <div className="flex flex-wrap items-center justify-end flex-1 gap-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-800 align-middle bg-white border border-gray-200 rounded-lg shadow-sm text-start hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  data-hs-overlay="#hs-pro-deum"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white align-middle bg-blue-600 border border-blue-600 rounded-lg shadow-sm gap-x-2 text-start hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 focus:ring-blue-300 dark:focus:ring-blue-500"
                  data-hs-overlay="#hs-pro-deum"
                >
                  Save changes
                </button>
              </div>
            </div>
            {/* End Footer */}
          </div>
        </div>
      </div>
      {/* End Edit AlarmLogger Modal */}
    </>
  );
}
