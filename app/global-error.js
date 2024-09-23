"use client";

import Link from "next/link";

export default function GlobalError({ error, reset }) {
  return (
    <html className="dark" lang="en">
      <body className="antialiased">
        <div className="flex flex-col max-w-full mx-auto size-full">
          <header className="z-50 flex justify-center w-full py-4 mb-auto">
            <nav className="px-4 sm:px-6 lg:px-8" aria-label="Global">
              <Link
                className="flex-none text-xl font-semibold cursor-default select-none sm:text-3xl dark:text-white"
                href=""
                onClick={(e) => e.preventDefault()}
                aria-label="EMONS"
              >
                EMONS
              </Link>
            </nav>
          </header>

          <main id="content">
            <div className="px-4 py-10 text-center sm:px-6 lg:px-8">
              <h1 className="block font-bold text-gray-800 text-7xl sm:text-9xl dark:text-white">
                Oops, something went wrong.
              </h1>
              <p className="mt-3 text-gray-600 dark:text-neutral-400">
                Please check your connection and restart this page by clicking
                this button bellow.
              </p>
              <div className="flex flex-col items-center justify-center gap-2 mt-5 sm:flex-row sm:gap-3">
                <Link
                  className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-white bg-blue-600 border border-transparent rounded-lg sm:w-auto gap-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  href={() => reset()}
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
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  Try again
                </Link>
              </div>
            </div>
          </main>

          <footer className="py-5 mt-auto text-center">
            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-sm text-gray-500 dark:text-neutral-500">
                © EMONS | All Rights Reserved. 2024.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
