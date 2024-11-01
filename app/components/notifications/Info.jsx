/**
 * We will provide a link for users to click
 * So, this notification is categorized as Non-Dangerous
 * Usually used to provide updates about our new features to all users
 */

import Link from "next/link";
import React from "react";

function InfoNotification({ notification }) {
  if (process.env.NODE_ENV === "development") {
    console.log("Notification list from component Info: ", notification);
  }

  // Helper function to format date in Indonesian with 24-hour format
  const formatDateIndonesian = (dateString) => {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date(dateString));
  };

  const handleTelegramLinkClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    window.location.href = "tg://resolve?domain=EmonssBot"; // Open Telegram app
  };

  return (
    <li className="relative flex w-full p-5 group gap-x-5 text-start">
      <div className="relative flex-shrink-0">
        <span className="flex flex-shrink-0 justify-center items-center size-[38px] bg-white border border-gray-200 text-gray-500 text-sm font-semibold rounded-full shadow-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
          !!
        </span>
      </div>
      <div className="grow">
        <p className="text-xs text-gray-500 dark:text-neutral-500">
          {formatDateIndonesian(notification.send_date)}
        </p>

        <span className="block text-xs font-medium text-gray-800 dark:text-neutral-300">
          🚨 <strong>{notification.status} detected!</strong> Location:{" "}
          {notification.location_id}
        </span>
        <p>
          <Link
            className="inline-flex items-center text-xs font-medium text-blue-600 gap-x-1 decoration-2 hover:underline focus:outline-none focus:underline dark:text-blue-400 dark:hover:text-blue-500"
            href=""
            onClick={handleTelegramLinkClick.bind(null)}
            aria-label="Go to telegram"
            title="EMONS Telegram"
          >
            Open telegram
            <svg
              className="flex-shrink-0 transition ease-in-out size-4 group-hover:translate-x-1"
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
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </p>
      </div>

      {/* <div>
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
      </div> */}
    </li>
  );
}

export default InfoNotification;
