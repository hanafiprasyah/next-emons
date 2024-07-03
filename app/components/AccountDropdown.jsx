import React from "react";
import Image from "next/image";
import Link from "next/link";
import Han from "../../public/images/hanafi.jpeg";

export default function AccountDropdown() {
  return (
    <div
      className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-60 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-900"
      aria-labelledby="hs-pro-dnad"
    >
      <>
        {/* Profile */}
        <div className="p-1 border-b border-gray-200 dark:border-neutral-800">
          <div className="flex items-center px-3 py-2 text-sm text-gray-800 rounded-lg gap-x-3 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
            <Image
              width={500}
              height={500}
              className="flex-shrink-0 rounded-full size-8"
              src={Han}
              alt="EMONS"
            />

            <div className="grow">
              <span className="text-sm font-semibold text-gray-800 text-wrap dark:text-neutral-300">
                Muhammad Hanafi Prasyah
              </span>
              <p className="text-xs text-gray-500 dark:text-neutral-500">
                RS Otak Bukittinggi
              </p>
            </div>
          </div>
        </div>
        {/* Activity */}
        <div className="p-1">
          <Link
            className="flex items-center px-3 py-2 text-sm text-gray-800 rounded-lg gap-x-3 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            href="#"
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
                d="M10.5 19.5h3m-6.75 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-15a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 4.5v15a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
            Devices
          </Link>
          <Link
            className="flex items-center px-3 py-2 text-sm text-gray-800 rounded-lg gap-x-3 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="flex-shrink-0 size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            Locations
          </Link>
          <Link
            className="flex items-center px-3 py-2 text-sm text-gray-800 rounded-lg gap-x-3 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            href="#"
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
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            My account
          </Link>
        </div>
        {/* Action */}
        <div className="p-1 border-t px-2 py-1.5 border-gray-200 dark:border-neutral-800">
          <Link
            className="flex items-center px-3 py-2 text-sm text-gray-800 rounded-lg gap-x-3 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-red-800 dark:focus:bg-neutral-800"
            href={"/login"}
            prefetch
            rel="noopener noreferrer"
          >
            Sign out
          </Link>
        </div>
      </>
    </div>
  );
}
