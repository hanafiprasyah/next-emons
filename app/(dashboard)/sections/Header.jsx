"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
import Han from "../../../public/images/hanafi.jpeg";
import AccountDropdown from "@/components/AccountDropdown";

// const NotificationDropdown = dynamic(
//   () => import("@/components/NotificationDropdown"),
//   { ssr: true }
// );

export default function DashboardHeader() {
  return (
    <header className="lg:ms-[260px] fixed top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 bg-white border-b border-gray-200 dark:bg-neutral-800 dark:border-neutral-700">
      <div
        className="flex justify-between xl:grid xl:grid-cols-3 basis-full items-center w-full py-2.5 px-2 sm:px-5"
        aria-label="Global"
      >
        <div className="flex items-center xl:col-span-1 md:gap-x-3">
          <div className="lg:hidden">
            {/**
             * - Sidebar Toggle
             * Only appears when user access
             * this website from Mobile Viewport
             */}
            <button
              type="button"
              className="w-7 h-[38px] inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
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
                <path d="M17 8L21 12L17 16M3 12H13M3 6H13M3 18H13" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end xl:col-span-2 gap-x-2">
          <div className="flex items-center">
            {/**
             * Notification deployed for the next update (v2),
             * so now, it will be hidden for a several times
             */}
            {/* Notification */}
            {/* <div className="hs-dropdown [--auto-close:inside] relative inline-flex">
              <div className="hs-tooltip [--placement:bottom] inline-block">
                <button
                  id="hs-pro-dnnd"
                  type="button"
                  className="hs-tooltip-toggle relative size-[38px] inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
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
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                  </svg>
                  <span className="flex absolute top-0 end-0 z-10 -mt-1.5 -me-1.5">
                    <span className="absolute inline-flex bg-red-400 rounded-full opacity-75 animate-ping size-full dark:bg-red-600"></span>
                    <span className="relative min-w-[18px] min-h-[18px] inline-flex justify-center items-center text-[10px] bg-red-500 text-white rounded-full px-1">
                      1
                    </span>
                  </span>
                </button>
                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                  role="tooltip"
                >
                  Notifications
                </span>
              </div>

              // Dynamic import from /root/app/components/
              <NotificationDropdown />
            </div> */}
          </div>

          {/* Divider */}
          <div className="border-e border-gray-200 w-px h-6 mx-1.5 dark:border-neutral-700"></div>

          <div className="h-[38px] ">
            {/* Account Dropdown */}
            <div className="hs-dropdown inline-flex   [--strategy:absolute] [--auto-close:inside] [--placement:bottom-right] relative text-start">
              <button
                id="hs-pro-dnad"
                type="button"
                className="inline-flex items-center flex-shrink-0 rounded-full gap-x-3 text-start focus:outline-none"
              >
                {/* This image is shown as Circlet Avatar and clickable */}
                <Image
                  width={500}
                  height={500}
                  className="flex-shrink-0 size-[38px] rounded-full"
                  src={Han}
                  alt="EMONS"
                />
              </button>

              {/**
               * Dynamic import from /root/app/components/
               */}
              <AccountDropdown />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
