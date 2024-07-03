import React from "react";
import deviceList from "../../lib/api/device-api";

export default function DeviceInfoModal() {
  return (
    <div>
      {deviceList.map((data, index) => (
        <div
          key={data.slogan}
          id={data.slogan}
          className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto [--close-when-click-inside:true] pointer-events-none"
        >
          <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
            <div className="w-full max-h-full flex flex-col bg-white rounded-xl pointer-events-auto shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-800">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b dark:border-neutral-700">
                <h3 className="font-semibold text-gray-800 dark:text-neutral-200">
                  {data.name} Details
                </h3>
                <button
                  type="button"
                  className="inline-flex items-center justify-center text-gray-800 bg-gray-100 border border-transparent rounded-full size-8 gap-x-2 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                  data-hs-overlay={`#${data.slogan}`}
                >
                  <span className="sr-only">Close</span>
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
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="p-2">
                <div className="flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                  <div className="flex items-center justify-between p-5 pb-3">
                    <h2 className="inline-block text-sm font-semibold text-gray-800 ms-1 dark:text-neutral-200">
                      Sensors Quality Score
                    </h2>

                    <span className="py-1 ps-1.5 pe-2 inline-flex items-center gap-x-1 text-xs font-medium rounded-full bg-white border border-gray-200 text-gray-800 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                      {data.q_score > 90 ? (
                        <svg
                          className="flex-shrink-0 text-emerald-500 size-3"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                      ) : (
                        <svg
                          className="flex-shrink-0 text-red-500 size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                          />
                        </svg>
                      )}

                      {data.q_score > 90 ? "Excellent" : "Bad"}
                    </span>
                  </div>

                  <div className="flex flex-col justify-between h-full px-5 pb-5">
                    <div>
                      <h4 className="text-5xl font-medium text-blue-600 md:text-6xl dark:text-blue-500">
                        <span className="text-transparent bg-clip-text bg-gradient-to-tl from-blue-500 to-violet-500">
                          {data.q_score}
                        </span>
                      </h4>

                      <p className="mt-5 text-gray-500 dark:text-neutral-500">
                        {data.q_score > 90
                          ? "All sensors work without problems, please keep the EMON panel clean to avoid undetected damage in the future."
                          : "Please contact our Engineer to check up your EMONS and do the preventive maintenance."}
                      </p>
                    </div>

                    <div className="mt-5">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 bg-gray-100 rounded-lg dark:bg-neutral-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="flex-shrink-0 mb-4 size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"
                            />
                          </svg>

                          <p className="text-xs text-gray-800 dark:text-neutral-200">
                            {data.sensors[0].sensor_name}
                          </p>
                          <p className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                            {data.sensors[0].score}
                          </p>
                        </div>

                        <div className="p-3 bg-gray-100 rounded-lg dark:bg-neutral-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="flex-shrink-0 mb-4 size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"
                            />
                          </svg>
                          <p className="text-xs text-gray-800 dark:text-neutral-200">
                            {data.sensors[1].sensor_name}
                          </p>
                          <p className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                            {data.sensors[1].score}
                          </p>
                        </div>

                        <div className="p-3 bg-gray-100 rounded-lg dark:bg-neutral-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="flex-shrink-0 mb-4 size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"
                            />
                          </svg>
                          <p className="text-xs text-gray-800 dark:text-neutral-200">
                            {data.sensors[2].sensor_name}
                          </p>
                          <p className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                            {data.sensors[2].score}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
