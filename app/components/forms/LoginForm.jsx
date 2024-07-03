"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function LoginForm() {
  const router = useRouter();

  return (
    <form>
      <div className="space-y-5">
        <div>
          <label
            htmlFor="hs-pro-dale"
            className="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
          >
            Email
          </label>

          <input
            type="email"
            id="hs-pro-dale"
            className="py-2.5 px-3 block w-full border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
            placeholder="you@email.com or anything"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="hs-pro-dalp"
              className="block text-sm font-medium text-gray-800 dark:text-white"
            >
              Password
            </label>

            <Link
              className="inline-flex items-center gap-x-1.5 text-xs text-gray-600 hover:text-gray-700 decoration-2 hover:underline focus:outline-none focus:underline dark:text-neutral-500 dark:hover:text-neutral-600"
              href={"/forgot-password"}
            >
              I forgot my password
            </Link>
          </div>

          <div className="relative">
            <input
              id="hs-pro-dalp"
              type="password"
              className="py-2.5 px-3 block w-full border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
              placeholder="Your strength password"
              autoComplete="on"
            />
            <button
              type="button"
              data-hs-toggle-password='{
                      "target": "#hs-pro-dalp"
                    }'
              className="absolute inset-y-0 z-20 flex items-center px-3 text-gray-400 cursor-pointer end-0 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
            >
              <svg
                className="flex-shrink-0 size-4"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  className="hs-password-active:hidden"
                  d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                />
                <path
                  className="hs-password-active:hidden"
                  d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                />
                <path
                  className="hs-password-active:hidden"
                  d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                />
                <line
                  className="hs-password-active:hidden"
                  x1="2"
                  x2="22"
                  y1="2"
                  y2="22"
                />
                <path
                  className="hidden hs-password-active:block"
                  d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                />
                <circle
                  className="hidden hs-password-active:block"
                  cx="12"
                  cy="12"
                  r="3"
                />
              </svg>
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="py-2.5 px-3 w-full inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-neutral-600"
        >
          Sign in
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
