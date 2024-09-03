"use client";

import React, { useEffect, useState } from "react";

const Default = ({
  id,
  key,
  alt,
  title,
  valueR,
  valueS,
  valueT,
  valueTotal,
}) => {
  const [loaded, isLoaded] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      isLoaded(false);
    }, 500);

    return () => loaded;
  }, [loaded]);

  return (
    <>
      {loaded ? (
        <div
          className="animate-spin inline-block size-3 border-[2px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          {/* Sales Stats Card */}
          <div className="flex flex-col bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
            {/* Header */}
            <div className="flex items-center justify-between p-5 pb-3">
              <h2 className="inline-block font-semibold text-gray-800 dark:text-neutral-200">
                Total {title}
              </h2>
            </div>
            {/* End Header */}
            {/* Body */}
            <div className="h-full px-5 pb-5 space-y-8">
              <h4 className="text-4xl font-medium text-gray-800 dark:text-neutral-200">
                {valueTotal} KWH
              </h4>
              {/* List Group */}
              <ul className="space-y-3">
                {/* List Item */}
                <li className="flex flex-wrap items-center justify-between gap-x-2">
                  <div>
                    <div className="flex items-center gap-x-2">
                      <div className="inline-block size-2.5 bg-blue-600 rounded-sm" />
                      <h2 className="inline-block text-gray-500 align-middle dark:text-neutral-400">
                        {title} R
                      </h2>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-800 dark:text-neutral-200">
                      {valueR}
                    </span>
                  </div>
                </li>
                {/* End List Item */}
                {/* List Item */}
                <li className="flex flex-wrap items-center justify-between gap-x-2">
                  <div>
                    <div className="flex items-center gap-x-2">
                      <div className="inline-block size-2.5 bg-purple-600 rounded-sm" />
                      <h2 className="inline-block text-gray-500 align-middle dark:text-neutral-400">
                        {title} S
                      </h2>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-800 dark:text-neutral-200">
                      {valueS}
                    </span>
                  </div>
                </li>
                {/* End List Item */}
                {/* List Item */}
                <li className="flex flex-wrap items-center justify-between gap-x-2">
                  <div>
                    <div className="flex items-center gap-x-2">
                      <div className="inline-block size-2.5 bg-gray-300 rounded-sm dark:bg-neutral-500" />
                      <h2 className="inline-block text-gray-500 align-middle dark:text-neutral-400">
                        {title} T
                      </h2>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-800 dark:text-neutral-200">
                      {valueT}
                    </span>
                  </div>
                </li>
                {/* End List Item */}
              </ul>
              {/* End List Group */}
            </div>
            {/* End Body */}
          </div>
          {/* End Sales Stats Card */}
        </>
      )}
    </>
  );
};

export default Default;
