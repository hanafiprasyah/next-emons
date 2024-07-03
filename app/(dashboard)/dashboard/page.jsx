import React, { Suspense } from "react";

export default function Dashboard() {
  return (
    <>
      <div className="p-4 flex flex-col justify-center h-72 md:h-96 min-h-[calc(100vh-56px)] sm:min-h-[calc(100vh-103px)]  bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
        <div className="relative h-full overflow-hidden border border-gray-200 border-dashed rounded-xl dark:border-neutral-700">
          <div className="absolute inset-0 size-full">
            <div className="bg-[linear-gradient(45deg,rgba(0,0,0,.05)_7.14%,transparent_7.14%,transparent_50%,rgba(0,0,0,.05)_50%,rgba(0,0,0,.05)_57.14%,transparent_57.14%,transparent);] bg-[length:10px_10px] dark:bg-[linear-gradient(45deg,rgba(0,0,0,.4)_7.14%,transparent_7.14%,transparent_50%,rgba(0,0,0,.4)_50%,rgba(0,0,0,.4)_57.14%,transparent_57.14%,transparent);] size-full">
              Content here
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col justify-center h-72 md:h-96 min-h-[calc(100vh-56px)] sm:min-h-[calc(100vh-103px)]  bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
        <div className="relative h-full overflow-hidden border border-gray-200 border-dashed rounded-xl dark:border-neutral-700">
          <div className="absolute inset-0 size-full">
            <div className="bg-[linear-gradient(45deg,rgba(0,0,0,.05)_7.14%,transparent_7.14%,transparent_50%,rgba(0,0,0,.05)_50%,rgba(0,0,0,.05)_57.14%,transparent_57.14%,transparent);] bg-[length:10px_10px] dark:bg-[linear-gradient(45deg,rgba(0,0,0,.4)_7.14%,transparent_7.14%,transparent_50%,rgba(0,0,0,.4)_50%,rgba(0,0,0,.4)_57.14%,transparent_57.14%,transparent);] size-full">
              Content here
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col justify-center h-72 md:h-96 min-h-[calc(100vh-56px)] sm:min-h-[calc(100vh-103px)]  bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
        <div className="relative h-full overflow-hidden border border-gray-200 border-dashed rounded-xl dark:border-neutral-700">
          <div className="absolute inset-0 size-full">
            <div className="bg-[linear-gradient(45deg,rgba(0,0,0,.05)_7.14%,transparent_7.14%,transparent_50%,rgba(0,0,0,.05)_50%,rgba(0,0,0,.05)_57.14%,transparent_57.14%,transparent);] bg-[length:10px_10px] dark:bg-[linear-gradient(45deg,rgba(0,0,0,.4)_7.14%,transparent_7.14%,transparent_50%,rgba(0,0,0,.4)_50%,rgba(0,0,0,.4)_57.14%,transparent_57.14%,transparent);] size-full">
              Content here
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
