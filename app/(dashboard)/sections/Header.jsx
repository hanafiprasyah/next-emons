"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import MonitoringPicture from "../../../public/images/user-profile.png";
import AccountDropdown from "@/components/AccountDropdown";
import NotificationDropdown from "@/components/NotificationDropdown";
import useSWR, { mutate } from "swr";

export default function DashboardHeader() {
  const getTitle = (pathname) => {
    switch (pathname) {
      case "/dashboard/":
        return "Map Dashboard";
      case "/dashboard/outline/":
        return "Outline Dashboard";
      case "/dashboard/voltage/":
        return "Voltage";
      case "/dashboard/current/":
        return "Current (Ampere)";
      case "/dashboard/ground/":
        return "Ground";
      case "/dashboard/frequency/":
        return "Frequency";
      case "/dashboard/temperature/":
        return "Temperature";
      case "/dashboard/energy/":
        return "Energy";
      case "/dashboard/pf/":
        return "Power Factor";
      case "/dashboard/thdv/":
        return "THDv";
      case "/dashboard/thdi/":
        return "THDi";
      case "/dashboard/alarm-logger/":
        return "Alarm Logger";
      case "/dashboard/database-logger/":
        return "Database Logger";
      case "/dashboard/sd-card-logger/":
        return "SD Card Logger";
    }
  };

  const path = usePathname();
  const title = getTitle(path);

  // State to control notification
  const [notifications, setNotifications] = useState([]);
  const [localTenant, setLocalTenant] = useState("");

  // TODO: Get local tenant item
  useEffect(() => {
    const currentUser = localStorage.getItem("tenant");

    // If tenant local storage is undefined or null
    if (!currentUser) {
      // set local tenant state to null
      setLocalTenant("");
      return;
    } else {
      // save local tenant value to state
      setLocalTenant(currentUser.toString());
    }

    return () => {
      setLocalTenant("");
    };
  }, []);

  // TODO: Function to fetch the API [REALTIME]
  const fetchDeviceData = async (locationid) => {
    try {
      const response = await fetch("/api/monitoring/getmonitoring", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          tenant: localTenant,
          Authorize: cookieData?.salt,
          token: cookieData?.token,
        },
        credentials: "include",
        body: JSON.stringify({
          tenant: localTenant,
          locationid: locationid,
          lane: "",
          status: "",
          value: "",
          side: "",
          start_date: "2024-01-01 00:00:00",
          end_date: "",
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch data");

      return response.json();
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.log("Error to try fetchDeviceData to get alarm value: ", err);
      }
      throw new Error("Interval server error");
    }
  };

  // TODO: Function to fetch the cookie [REALTIME]
  const fetchCookieRealtime = async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cookies");
      } else {
        const data = await response.json();
        return data;
      }
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error in fetchCookieRealtime: ", err);
      }
      throw new Error("Internal Server Error. Please try again!");
    }
  };

  // Array of device codes
  const deviceCodes = [102, 106];

  // Clear SWR Cache
  const clearSWRCache = () =>
    mutate(() => true, undefined, {
      revalidate: false,
      rollbackOnError: true,
    });

  // TODO: to get cookies realtime
  const { data: cookieData, error: cookieError } = useSWR(
    ["/api/tools/cookie/get"],
    ([url]) => fetchCookieRealtime(url),
    {
      refreshInterval: 3000,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      revalidateOnFocus: false,
      loadingTimeout: 10000,
      onError: (err) => clearSWRCache(),
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // TODO: Never retry on 404
        if (error.status === 404) return;
        // TODO: Disable retry for spesific key
        if (JSON.stringify(key) === JSON.stringify(["/api/tools/cookie/get"]))
          return;
        // TODO: Only 10 times retry
        if (retryCount > 10) return;
        // TODO: Retry interval
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    }
  );

  // TODO: fetch all device data in parallel
  const { data, error } = useSWR(
    localTenant && cookieData?.hasCookie
      ? [
          "multiple-devices",
          () => Promise.all(deviceCodes.map((code) => fetchDeviceData(code))),
        ]
      : null,
    {
      isPaused: () =>
        !localTenant && !deviceCodes.length && !cookieData?.hasCookie,
      refreshInterval: 3000, // Poll every 10 seconds for updates
      revalidateOnFocus: false,
      loadingTimeout: 10000,
      onError: (err) => clearSWRCache(),
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // TODO: Never retry on 404
        if (error.status === 404) return;
        // TODO: Disable retry for spesific key
        if (JSON.stringify(key) === JSON.stringify(["multiple-devices"]))
          return;
        // TODO: Only 10 times retry
        if (retryCount > 10) return;
        // TODO: Retry interval
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    }
  );

  useEffect(() => {
    if (data) {
      // Safely extract data with optional chaining and default values
      const newAlarms = data.flatMap(
        (deviceData) => deviceData?.monitoring?.data?.dataalarms || []
      );

      // Only proceed if `newAlarms` has data
      if (newAlarms.length > 0) {
        const uniqueAlarms = newAlarms.filter((newAlarm) => {
          return !notifications.some(
            (existingAlarm) =>
              existingAlarm.id_name === newAlarm.id_name &&
              existingAlarm.value === newAlarm.value &&
              existingAlarm.send_date === newAlarm.send_date
          );
        });

        // Only add new, unique notifications to state
        if (uniqueAlarms.length > 0) {
          setNotifications((prevNotifications) => [
            ...prevNotifications,
            ...uniqueAlarms,
          ]);
        }

        // setNotifications((prevNotifications) => [
        //   ...prevNotifications,
        //   ...newAlarms,
        // ]);
      }
    }
  }, [data, notifications]);

  const handleMarkAsRead = () => {
    setNotifications([]);
    if (process.env.NODE_ENV === "development") {
      console.warn("User reset notifications");
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex flex-wrap justify-start bg-white border-b border-gray-200 dark:bg-neutral-800 dark:border-neutral-700">
      <div
        className="flex justify-between basis-full items-center w-full py-2.5 px-2 sm:px-5"
        aria-label="Global"
      >
        <div className="flex items-center col-span-1 gap-x-3">
          <div className="lg:block">
            {/**
             * - Sidebar Toggle
             * Only appears when user access
             * this website from Mobile Viewport
             */}
            <button
              type="button"
              className="w-7 h-[38px] inline-flex transition duration-200 ease-in-out justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
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

        <div className="flex items-center justify-between w-full ps-4 xl:col-span-2 gap-x-2">
          <div className="flex items-center">
            <span>{title}</span>
          </div>

          <div className="flex items-center justify-end gap-x-8">
            {/**
             * Notification deployed for the next update (v2),
             * so now, it will be hidden for a several times
             */}
            {/* Notification */}
            {!error ? (
              <div
                className={`hs-dropdown [--auto-close:inside] pt-2 relative inline-flex`}
              >
                <div className="hs-tooltip [--placement:bottom] inline-block">
                  <button
                    id="hs-pro-dnnd"
                    type="button"
                    className={`${
                      !error && notifications
                        ? ""
                        : "cursor-not-allowed select-none pointer-events-none"
                    } cursor-pointer w-5 h-5 hs-tooltip-toggle bg-blue-600/0 relative size-[38px] inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent text-gray-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none dark:text-neutral-400`}
                  >
                    {/* Ping effect */}
                    <span className="absolute inset-0 bg-red-600 rounded-full opacity-50 animate-ping"></span>

                    {/* SVG Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 text-red-300 size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                      />
                    </svg>

                    {/* Notification badge */}
                    {notifications.length >= 0 && (
                      <span className="absolute -top-3 -right-4 bg-red-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                        {notifications.length > 99
                          ? "99+"
                          : `${notifications.length}`}
                      </span>
                    )}
                  </button>
                </div>
                <NotificationDropdown
                  notifications={notifications}
                  onMarkAsRead={handleMarkAsRead}
                />
              </div>
            ) : null}

            {/* Divider */}
            {/* <div className="border-e border-gray-200 w-px h-6 mx-1.5 dark:border-neutral-700"></div> */}

            <div className="h-[38px] ">
              {/* Account Dropdown */}
              <div className="hs-dropdown inline-flex [--strategy:absolute] [--auto-close:inside] [--placement:bottom-right] relative text-start">
                <button
                  id="hs-pro-dnad"
                  type="button"
                  className="inline-flex items-center flex-shrink-0 rounded-full gap-x-3 text-start focus:outline-none"
                >
                  {/* This image is shown as Circlet Avatar and clickable */}
                  {/* Set the user image from API */}
                  <Image
                    priority={true}
                    width={40}
                    height={40}
                    className="flex-shrink-0 rounded-full aspect-auto"
                    src={MonitoringPicture}
                    alt="EMONS | Electrical Monitoring System"
                  />
                </button>

                {/**
                 * Import from /root/app/components/
                 */}
                <AccountDropdown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
