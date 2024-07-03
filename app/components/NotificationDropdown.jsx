import Image from "next/image";
import React from "react";
import DangerNotification from "@/components/notifications/Danger";
import InfoNotification from "@/components/notifications/Info";
import Link from "next/link";

export default function NotificationDropdown() {
  /**
   * Currently this notification dropdown only have on Dialog Segment
   * We will release Archived Notification segment soon after v1
   */
  return (
    /**
     * This notification dropdown will issue information to users about important logs from their devices
     */
    <div
      className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-full sm:w-96 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white border-t border-gray-200 sm:border-t-0 sm:rounded-lg shadow-md sm:shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-900 dark:border-neutral-700"
      aria-labelledby="hs-pro-dnnd"
    >
      <div className="flex items-center justify-between px-5 pt-3 border-b border-gray-200 dark:border-neutral-800">
        <nav className="flex gap-x-1" aria-label="Tabs" role="tablist">
          <button
            type="button"
            className="hs-tab-active:after:bg-gray-800 hs-tab-active:text-gray-800 px-2.5 py-1.5 mb-2 relative inline-flex justify-center items-center gap-x-2  hover:bg-gray-100 text-gray-500 hover:text-gray-800 text-sm rounded-lg disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 after:absolute after:-bottom-2 after:inset-x-2.5 after:z-10 after:h-0.5 after:pointer-events-none dark:hs-tab-active:text-neutral-200 dark:hs-tab-active:after:bg-neutral-400 dark:text-neutral-500 dark:hover:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 active "
            id="hs-pro-tabs-dnn-item-all"
            data-hs-tab="#hs-pro-tabs-dnn-all"
            aria-controls="hs-pro-tabs-dnn-all"
            role="tab"
          >
            All
          </button>
          {/* Archived Notification (SOON) */}
          {/* <button
            type="button"
            className="hs-tab-active:after:bg-gray-800 hs-tab-active:text-gray-800 px-2.5 py-1.5 mb-2 relative inline-flex justify-center items-center gap-x-2  hover:bg-gray-100 text-gray-500 hover:text-gray-800 text-sm rounded-lg disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 after:absolute after:-bottom-2 after:inset-x-2.5 after:z-10 after:h-0.5 after:pointer-events-none dark:hs-tab-active:text-neutral-200 dark:hs-tab-active:after:bg-neutral-400 dark:text-neutral-500 dark:hover:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  "
            id="hs-pro-tabs-dnn-item-archived"
            data-hs-tab="#hs-pro-tabs-dnn-archived"
            aria-controls="hs-pro-tabs-dnn-archived"
            role="tab"
          >
            Archived
          </button> */}
        </nav>

        {/* Notification Preference (SOON) */}
        {/* <div className="relative inline-block mb-3 hs-tooltip">
          <a
            className="inline-flex items-center justify-center text-gray-500 border border-transparent rounded-full hs-tooltip-toggle size-7 gap-x-2 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            href=""
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
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </a>
          <span
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
            role="tooltip"
          >
            Preferences
          </span>
        </div> */}
      </div>

      <div
        id="hs-pro-tabs-dnn-all"
        role="tabpanel"
        aria-labelledby="hs-pro-tabs-dnn-item-all"
      >
        {/* Notification List */}
        <div className="h-[480px] overflow-y-auto overflow-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
          <ul className="divide-y divide-gray-200 dark:divide-neutral-800">
            <>
              <InfoNotification />
            </>
          </ul>
        </div>

        {/* Notification Footer */}
        {/* <div className="text-center border-t border-gray-200 dark:border-neutral-800">
          <Link
            className="flex items-center justify-center p-4 text-sm font-medium text-gray-500 gap-x-2 sm:rounded-b-lg hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
            href=""
          >
            Mark all as read
          </Link>
        </div> */}
      </div>

      {/* Archived Notification List (SOON) */}
      {/* <div
        id="hs-pro-tabs-dnn-archived"
        className="hidden"
        role="tabpanel"
        aria-labelledby="hs-pro-tabs-dnn-item-archived"
      >
        <div className="p-5 min-h-[533px] flex flex-col justify-center items-center text-center">
          <svg
            className="w-48 mx-auto mb-4"
            width="178"
            height="90"
            viewBox="0 0 178 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="27"
              y="50.5"
              width="124"
              height="39"
              rx="7.5"
              fill="currentColor"
              className="fill-white dark:fill-neutral-800"
            />
            <rect
              x="27"
              y="50.5"
              width="124"
              height="39"
              rx="7.5"
              stroke="currentColor"
              className="stroke-gray-50 dark:stroke-neutral-700/10"
            />
            <rect
              x="34.5"
              y="58"
              width="24"
              height="24"
              rx="4"
              fill="currentColor"
              className="fill-gray-50 dark:fill-neutral-700/30"
            />
            <rect
              x="66.5"
              y="61"
              width="60"
              height="6"
              rx="3"
              fill="currentColor"
              className="fill-gray-50 dark:fill-neutral-700/30"
            />
            <rect
              x="66.5"
              y="73"
              width="77"
              height="6"
              rx="3"
              fill="currentColor"
              className="fill-gray-50 dark:fill-neutral-700/30"
            />
            <rect
              x="19.5"
              y="28.5"
              width="139"
              height="39"
              rx="7.5"
              fill="currentColor"
              className="fill-white dark:fill-neutral-800"
            />
            <rect
              x="19.5"
              y="28.5"
              width="139"
              height="39"
              rx="7.5"
              stroke="currentColor"
              className="stroke-gray-100 dark:stroke-neutral-700/30"
            />
            <rect
              x="27"
              y="36"
              width="24"
              height="24"
              rx="4"
              fill="currentColor"
              className="fill-gray-100 dark:fill-neutral-700/70"
            />
            <rect
              x="59"
              y="39"
              width="60"
              height="6"
              rx="3"
              fill="currentColor"
              className="fill-gray-100 dark:fill-neutral-700/70"
            />
            <rect
              x="59"
              y="51"
              width="92"
              height="6"
              rx="3"
              fill="currentColor"
              className="fill-gray-100 dark:fill-neutral-700/70"
            />
            <g filter="url(#filter15)">
              <rect
                x="12"
                y="6"
                width="154"
                height="40"
                rx="8"
                fill="currentColor"
                className="fill-white dark:fill-neutral-800"
                shapeRendering="crispEdges"
              />
              <rect
                x="12.5"
                y="6.5"
                width="153"
                height="39"
                rx="7.5"
                stroke="currentColor"
                className="stroke-gray-100 dark:stroke-neutral-700/60"
                shapeRendering="crispEdges"
              />
              <rect
                x="20"
                y="14"
                width="24"
                height="24"
                rx="4"
                fill="currentColor"
                className="fill-gray-200 dark:fill-neutral-700 "
              />
              <rect
                x="52"
                y="17"
                width="60"
                height="6"
                rx="3"
                fill="currentColor"
                className="fill-gray-200 dark:fill-neutral-700"
              />
              <rect
                x="52"
                y="29"
                width="106"
                height="6"
                rx="3"
                fill="currentColor"
                className="fill-gray-200 dark:fill-neutral-700"
              />
            </g>
            <defs>
              <filter
                id="filter15"
                x="0"
                y="0"
                width="178"
                height="64"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="6" />
                <feGaussianBlur stdDeviation="6" />
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
              No archived notifications
            </p>
            <p className="mb-5 text-sm text-gray-500 dark:text-neutral-500">
              We will notify you about important updates and any time you are
              mentioned on Preline.
            </p>
          </div>

          <a
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            href="#"
          >
            Notifications settings
          </a>
        </div>
      </div> */}
    </div>
  );
}
