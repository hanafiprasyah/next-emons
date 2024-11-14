"use client";

import React, { useEffect, useState } from "react";

export default function OfflineAlert({ connectionFromParent }) {
  const [hideAlert, setHideAlert] = useState(true);

  useEffect(() => {
    if (!connectionFromParent) {
      // Show alert
      setHideAlert(false);
    } else {
      // Hide alert
      setHideAlert(true);
    }

    return () => setHideAlert(true);
  }, [connectionFromParent]);

  return (
    <div
      className={` ${
        hideAlert
          ? "opacity-0 duration-200 ease-in-out transition-opacity"
          : "animate-fade-in"
      } fixed left-0 z-50 justify-center w-full text-center transform -translate-x-1/2 bg-transparent top-1/2 h-fit`}
    >
      <div className="px-4 py-4 mx-auto text-center sm:px-6 lg:px-8">
        {/* Announcement Banner */}
        <div className="inline-flex flex-wrap items-center p-1 border border-red-900 rounded-full shadow-md group bg-white/10 hover:bg-white/10 focus:outline-none focus:bg-white/10 ps-4">
          <p className="text-xs text-white md:text-sm xl:text-lg me-2">
            You are offline
          </p>
          <span className="group-hover:bg-white/10 group-focus:bg-white/10 py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-white/10 font-semibold text-white text-sm">
            <div
              className="animate-spin inline-block size-3 border-[1px] border-current border-t-transparent text-red-600 rounded-full dark:text-red-500"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </span>
        </div>
        {/* End Announcement Banner */}
      </div>
    </div>
  );
}
