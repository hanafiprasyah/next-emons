import React from "react";

export default function SlowConnectionAlert() {
  return (
    <div
      id="hs-pro-shchal"
      className="mb-5 transition-opacity duration-300 ease-in-out animate-fade-in p-4 sm:ps-16 relative overflow-hidden bg-gradient-to-r from-orange-100 via-purple-200 via-70% to-indigo-200 rounded-lg dark:from-orange-800 dark:via-amber-800/40 dark:to-neutral-800/0"
      role="alert"
      tabIndex={-1}
      aria-labelledby="hs-pro-shchal-label"
    >
      <div className="flex items-center gap-x-3">
        <div className="absolute hidden sm:block -bottom-4 -start-6">
          <span className="text-7xl">🚨</span>
        </div>
        <div className="grow">
          <h4
            id="hs-pro-shchal-label"
            className="font-medium text-orange-700 dark:text-white"
          >
            Slow connection?
          </h4>
          <p className="mt-1 text-xs text-gray-800 dark:text-neutral-200">
            Loading is taking longer than expected. Please wait...
          </p>
        </div>
      </div>
    </div>
  );
}
