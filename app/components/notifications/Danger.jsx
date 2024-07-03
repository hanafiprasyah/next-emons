/**
 * This notification will display a red background.
 * If the system sends information with a dangerous category,
 * we will display this type of notification.
 */

import Image from "next/image";
import React from "react";

function DangerNotification() {
  return (
    <li className="relative flex w-full p-5 bg-gray-100 group gap-x-5 text-start dark:bg-neutral-800">
      <div className="relative flex-shrink-0">
        <Image
          width={500}
          height={500}
          className="flex-shrink-0 size-[38px] rounded-full"
          src="https://images.unsplash.com/photo-1659482634023-2c4fda99ac0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80"
          alt="Image Description"
        />
        <span className="absolute bg-blue-600 rounded-full top-4 -start-3 size-2 dark:bg-blue-500"></span>
      </div>
      <div className="grow">
        <p className="text-xs text-gray-500 dark:text-neutral-500">
          2 hours ago
        </p>

        <span className="block text-sm font-medium text-gray-800 dark:text-neutral-300">
          Eilis Warner
        </span>
        <p className="text-sm text-gray-500 dark:text-neutral-500">
          {`changed an issue from 'in Progress' to 'Review'`}
        </p>
      </div>
      <div>
        <div className="sm:group-hover:opacity-100 sm:opacity-0 sm:absolute sm:top-5 sm:end-5">
          <div className="inline-block p-0.5 bg-white border border-gray-200 rounded-lg shadow-sm transition ease-out dark:bg-neutral-800 dark:border-neutral-700">
            <div className="flex items-center">
              <div className="relative inline-block hs-tooltip">
                <button
                  type="button"
                  className="flex items-center justify-center flex-shrink-0 text-gray-500 rounded hs-tooltip-toggle size-7 hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:focus:bg-neutral-700"
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
                    <polyline points="9 11 12 14 22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                  <svg
                    className="flex-shrink-0 hidden size-4"
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
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M8 12h8" />
                  </svg>
                </button>
                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                  role="tooltip"
                >
                  Mark this notification as read
                </span>
              </div>
              <div className="relative inline-block hs-tooltip">
                <button
                  type="button"
                  className="flex items-center justify-center flex-shrink-0 text-gray-500 rounded hs-tooltip-toggle size-7 hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-400 dark:focus:bg-neutral-700"
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
                    <rect width="20" height="5" x="2" y="4" rx="2" />
                    <path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" />
                    <path d="M10 13h4" />
                  </svg>
                </button>
                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                  role="tooltip"
                >
                  Archive this notification
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default DangerNotification;
