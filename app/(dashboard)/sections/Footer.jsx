import React from "react";

export default function DashboardFooter() {
  return (
    <footer className="lg:ps-[260px] h-[40px] sm:h-[64px] absolute bottom-0 inset-x-0">
      <div className="flex items-center justify-between p-2 sm:p-5">
        <p className="text-xs text-gray-500 sm:text-sm dark:text-neutral-500">
          © 2024 Wibawa Solusi Elektrik.
        </p>

        <ul>
          <li className="inline-block relative pe-5 text-xs sm:text-sm text-gray-500 align-middle last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:w-px before:h-3.5 before:bg-gray-400 before:rotate-[18deg] dark:text-neutral-500 dark:before:bg-neutral-600">
            <a
              className="hover:text-blue-600 focus:outline-none focus:underline dark:hover:text-neutral-200"
              href="#"
            >
              FAQ
            </a>
          </li>
          <li className="inline-block relative pe-5 text-xs sm:text-sm text-gray-500 align-middle last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:w-px before:h-3.5 before:bg-gray-400 before:rotate-[18deg] dark:text-neutral-500 dark:before:bg-neutral-600">
            <a
              className="hover:text-blue-600 focus:outline-none focus:underline dark:hover:text-neutral-200"
              href="#"
            >
              License
            </a>
          </li>
          <li className="inline-block relative pe-5 text-xs sm:text-sm text-gray-500 align-middle sm:leading-3 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:w-px before:h-3.5 before:bg-gray-400 before:rotate-[18deg] dark:text-neutral-500 dark:before:bg-neutral-600">
            <button
              type="button"
              className="hover:text-blue-600 focus:outline-none focus:text-gray-800 dark:hover:text-neutral-200 dark:focus:text-neutral-400"
              data-hs-overlay="#hs-pro-dfkm"
            >
              <svg
                className="flex-shrink-0 size-3.5 sm:size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </footer>
  );
}
