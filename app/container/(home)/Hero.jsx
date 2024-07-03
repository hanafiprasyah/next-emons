import React from "react";
import Link from "next/link";

function Hero() {
  return (
    <div className="grid relative place-items-center h-screen overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('/images/squared-bg-element.svg')] dark:before:bg-[url('/images/dark-squared-bg-element.svg')] before:bg-no-repeat before:bg-top before:size-full before:-z-[1] before:transform before:-translate-x-1/2 after:absolute after:bottom-0 after:left-0 after:w-full after:h-16 lg:after:h-24 after:bg-gradient-to-b after:from-black/0 after:to-black/70 after:z-10">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <div className="flex justify-center">
          <Link
            className="inline-flex items-center p-2 px-3 text-xs text-gray-600 transition bg-white border border-gray-200 rounded-full gap-x-2 hover:border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:hover:border-neutral-600 dark:text-neutral-400"
            href={"https://wise.co.id/products"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore the other products from us
            <span className="flex items-center gap-x-1">
              <span className="text-blue-600 border-gray-200 border-s ps-2 dark:text-blue-500 dark:border-neutral-700">
                Explore
              </span>
              <svg
                className="flex-shrink-0 text-blue-600 size-4"
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
                <path d="m9 18 6-6-6-6" />
              </svg>
            </span>
          </Link>
        </div>

        <div className="max-w-xl mx-auto mt-5 text-center">
          <h1 className="block text-4xl font-bold text-gray-800 md:text-5xl lg:text-6xl dark:text-neutral-200">
            Electricity Monitoring System
          </h1>
        </div>

        <div className="max-w-3xl mx-auto mt-5 text-center">
          <p className="text-lg text-gray-600 dark:text-neutral-400">
            Electricity Monitoring System or we can call it{" "}
            <strong>EMONS</strong>, helps you monitor the latest electrical
            system conditions with <i>real-time</i> method
          </p>
        </div>

        <div className="flex justify-center gap-3 mt-8">
          <Link
            className="inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-center text-white border border-transparent rounded-full gap-x-3 bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 dark:focus:ring-offset-gray-800"
            href="/login"
            rel="noopener noreferrer"
            target="_self"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="flex-shrink-0 size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
              />
            </svg>
            Login to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
