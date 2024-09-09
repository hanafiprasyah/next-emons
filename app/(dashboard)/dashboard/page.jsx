"use client";

import React, { useState } from "react";
import PrelineScript from "@/components/PrelineScript";
import Image from "next/image";
import Link from "next/link";
import Maps from "@/components/maps/NewGoogleMaps";

export default function Dashboard() {
  const [hideTotalUser, setHideTotalUser] = useState(true);
  const [hideActiveUser, setHideActiveUser] = useState(false);
  const [hidePendingUser, setHidePendingUser] = useState(false);
  const [hideDeviceList, setHideDeviceList] = useState(false);

  return (
    <div className="h-[calc(100vh-78px)]">
      <>
        {/* Maps */}
        <section id="map-layout">
          <div className="bg-white border shadow-sm border-stone-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
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
                      className="hs-tab-active:after:bg-stone-800 pointer-events-none hs-tab-active:text-stone-800 px-2.5 py-1.5 mb-2 relative inline-flex items-center gap-x-2 hover:bg-stone-100 text-stone-500 hover:text-stone-800 text-xs md:text-sm rounded-lg disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 after:absolute after:-bottom-2 after:inset-x-0 after:z-10 after:h-0.5 after:pointer-events-none dark:hs-tab-active:text-neutral-200 dark:hs-tab-active:after:bg-emerald-400 dark:text-neutral-500 dark:hover:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 active"
                      id="hs-pro-tabs-dtsch-item-revenue"
                      aria-selected="true"
                      data-hs-tab="#hs-pro-tabs-dtsch-revenue"
                      aria-controls="hs-pro-tabs-dtsch-revenue"
                      role="tab"
                    >
                      Devices Installed
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-teal-800 bg-teal-100 rounded-full gap-x-1 dark:bg-teal-500/10 dark:text-teal-500">
                        6
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
                {/* Maps component */}
                <Maps></Maps>
                {/* End Maps component */}
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
