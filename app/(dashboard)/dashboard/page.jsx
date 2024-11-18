"use client";

import React, { useState, useEffect } from "react";
import PrelineScript from "@/components/PrelineScript";
import useSWR, { mutate } from "swr";
import { useOnlineStatus } from "@/lib/hook/connection-hook";
import { useRouter } from "next/navigation";
import LostConnectionAlert from "@/components/alerts/OfflineAlert";
import SlowConnectionAlert from "@/components/alerts/SlowConnectionAlert";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("@/components/maps/NewGoogleMaps"), {
  ssr: false,
});

export default function DashboardMaps() {
  // local Value
  const [localTenant, setLocalTenant] = useState("");

  // Connection state
  const isOnline = useOnlineStatus();
  const [responseTime, setResponseTime] = useState(null);
  const [isConnectionUnstable, setIsConnectionUnstable] = useState(false);

  // Handle for router
  const router = useRouter();

  // Handle slow loading on SWR
  const [isSlowLoad, setSlowLoad] = useState(false);

  // Used to set pin color based on SWR Connection
  const [deviceStatus, setDeviceStatus] = useState(false);

  // TODO: Function to fetch the /tools/location/getlocation API [REALTIME]
  const fetchDeviceRealtime = async (
    url,
    tenant,
    start_trancation_date,
    end_trancation_date
  ) => {
    // main point to track unstable network
    const startTime = performance.now();

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          tenant: localTenant,
          Authorize: cookieData?.salt,
          token: cookieData?.token,
        },
        body: JSON.stringify({
          tenant: tenant,
          locationid: 0,
          lane: "",
          status: "",
          value: "",
          side: "0",
          start_trancation_date: start_trancation_date,
          end_trancation_date: end_trancation_date,
        }),
      });

      if (!response.ok) {
        setDeviceStatus(false);
        throw new Error("Failed to fetch");
      }

      setDeviceStatus(true);
      const data = await response.json();

      // checkpoint to check network performance
      const endTime = performance.now();
      setResponseTime(endTime - startTime);

      if (data.message === "Failed to connect") {
        return null;
      } else if (
        data.message == "Internal Server Error" ||
        data.message == "Fail"
      ) {
        return null;
      } else {
        return data;
      }
    } catch (err) {
      setDeviceStatus(false);
      setResponseTime(null);
      if (process.env.NODE_ENV === "development") {
        console.error("Error in fetchDeviceRealtime: ", err);
      }
      throw new Error("Internal Server Error. Please try again!");
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

  // TODO: Clear SWR Cache
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

  // TODO: SWR to get device list
  /**
   * We will map this data based on their Index
   * then we will get the tenancy (more than 2 devices) with their own datas
   */
  const { data, isLoading, error } = useSWR(
    (isOnline || !isConnectionUnstable) && localTenant && cookieData?.hasCookie
      ? [
          "/api/tools/location/getlocation",
          localTenant,
          "2023-01-01 00:00:00",
          "2024-12-30 23:59:00",
        ]
      : null,
    ([url, tenant, start_trancation_date, end_trancation_date]) =>
      fetchDeviceRealtime(
        url,
        tenant,
        start_trancation_date,
        end_trancation_date
      ),
    {
      isPaused: () => !isOnline && !cookieData?.hasCookie,
      isOnline: () => isOnline,
      refreshInterval: 30000,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      revalidateOnFocus: false,
      loadingTimeout: 10000,
      onLoadingSlow: () => {
        setSlowLoad(true);
      },
      onSuccess: () => {
        setSlowLoad(false);
      },
      onError: (err) => {
        setSlowLoad(false);
        clearSWRCache();
      },
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // TODO: Never retry on 404
        if (error.status === 404) return;
        // TODO: Disable retry for spesific key
        if (
          JSON.stringify(key) ===
          JSON.stringify([
            "/api/tools/location/getlocation",
            localTenant,
            "2023-01-01 00:00:00",
            "2024-12-30 23:59:00",
          ])
        )
          return;
        // TODO: Only 10 times retry
        if (retryCount > 10) return;
        // TODO: Retry interval
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    }
  );

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

  // TODO: Redirect to login page when cookies are invalid or there's an error
  useEffect(() => {
    if (cookieData && !cookieData.hasCookie) {
      router.refresh();
    }
  }, [cookieData, router]);

  // TODO: Alert user if response time is high
  useEffect(() => {
    // Threshold of 5000ms / 5sec
    if (responseTime !== null && responseTime > 5000) {
      setIsConnectionUnstable(true);
    } else {
      setIsConnectionUnstable(false);
    }

    // Cleanup function to reset state on unmount
    return () => {
      setIsConnectionUnstable(false);
    };
  }, [isOnline, responseTime]);

  return (
    <div className="h-[calc(100dvh-78px)]">
      <>
        <LostConnectionAlert connectionFromParent={isOnline} />
        <SlowConnectionAlert unstable={isConnectionUnstable} />
        {/* Maps */}
        <section id="map-layout">
          <div className="bg-white border shadow-sm border-stone-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700 animate-fade-in">
            {/* Body */}
            <div className="grid grid-cols-8 divide-stone-200 dark:divide-neutral-600">
              {/* Header of Body */}
              <div className="col-span-8 ps-2 pe-2">
                {/* Card */}
                <div className="p-2 bg-white dark:bg-neutral-800 dark:border-neutral-800">
                  {/* Nav Tab */}
                  <nav
                    className="relative flex gap-x-2 after:absolute after:bottom-0 after:inset-x-0 after:border-b after:border-stone-200 dark:after:border-neutral-700"
                    aria-label="Tabs"
                    role="tablist"
                    aria-orientation="horizontal"
                  >
                    {/* Total Device */}
                    <button
                      type="button"
                      aria-label="Device list button"
                      title="Device List"
                      className="hs-tab-active:after:bg-stone-800 pointer-events-none hs-tab-active:text-stone-800 px-2.5 py-1.5 mb-2 relative inline-flex items-center gap-x-2 hover:bg-stone-100 text-stone-500 hover:text-stone-800 text-xs md:text-sm rounded-lg disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 after:absolute after:-bottom-2 after:inset-x-0 after:z-10 after:h-0.5 after:pointer-events-none dark:hs-tab-active:text-neutral-200 dark:hs-tab-active:after:bg-emerald-400 dark:text-neutral-500 dark:hover:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 active"
                      id="hs-pro-tabs-dtsch-item-revenue"
                      aria-selected="true"
                      data-hs-tab="#hs-pro-tabs-dtsch-revenue"
                      aria-controls="hs-pro-tabs-dtsch-revenue"
                      role="tab"
                      tabIndex="0" // Make the button accessible via keyboard
                    >
                      {data ? "Device(s) Map" : "Counting devices.."}
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-teal-800 bg-teal-100 rounded-full gap-x-1 dark:bg-teal-500/10 dark:text-teal-500">
                        {data
                          ? data?.loc.data.filter((item) => item.parent !== 0)
                              .length
                          : 0}
                      </span>
                    </button>
                  </nav>
                  {/* End Nav Tab */}
                </div>
                {/* End Card */}
              </div>
              {/* End Header of Body */}
              {/* Map Layout */}
              <div className="col-span-8 pt-2 pb-4 ps-4 pe-4">
                <div
                  id="hs-pro-tabs-dtsch-revenue"
                  role="tabpanel"
                  aria-labelledby="hs-pro-tabs-dtsch-item-revenue"
                >
                  {/* Maps component */}
                  {isOnline && data && localTenant ? (
                    <DynamicMap
                      key={"Google Map for React/NextJS"}
                      mapData={data}
                      mapError={error}
                      mapLoading={isLoading}
                      deviceStatus={deviceStatus}
                      tenantRef={localTenant}
                      tokenCookie={cookieData?.token}
                      saltCookie={cookieData?.salt}
                    ></DynamicMap>
                  ) : isOnline ? (
                    <div
                      className="animate-spin inline-block size-3 border-[2px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                      role="status"
                      aria-label="loading"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <span className="text-xs md:text-sm">
                      Please check your connection..
                    </span>
                  )}
                  {/* End Maps component */}
                </div>
              </div>
              {/* End Map Layout */}
            </div>
            {/* End Body */}
          </div>
        </section>
        {/* End Maps */}
      </>
      <PrelineScript />
    </div>
  );
}
