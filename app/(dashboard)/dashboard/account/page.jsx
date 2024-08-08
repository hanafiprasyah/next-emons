"use client";

import React, { useEffect, useState } from "react";

export default function AccountSetting() {
  const [username, setUsername] = useState("");
  const [personal, setPersonal] = useState(false);
  const [pass, setPass] = useState(false);

  useEffect(() => {
    const getLocalValue = async () => {
      const data = await localStorage.getItem("userName");
      if (data && data != "") {
        setUsername(data);
      }
      return username;
    };

    getLocalValue();
  });

  return (
    <>
      {/* Account Card */}
      <div className="p-5 bg-white border border-gray-200 shadow-sm md:p-8 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
        {/* Title */}
        <div className="mb-4 xl:mb-8">
          <h1 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
            Profile
          </h1>
          <p className="text-sm text-gray-500 dark:text-neutral-500">
            Manage your name, password and account settings.
          </p>
        </div>
        {/* End Title */}
        {/* Form */}
        <form>
          {/* Personal Info */}
          <div className="py-6 space-y-5 border-t border-gray-200 sm:py-8 first:border-t-0 dark:border-neutral-700">
            <h2 className="font-semibold text-gray-800 dark:text-neutral-200">
              Personal info
            </h2>
            {/* Name Grid */}
            <div className="grid sm:grid-cols-12 gap-y-1.5 sm:gap-y-0 sm:gap-x-5">
              <div className="sm:col-span-4 xl:col-span-3 2xl:col-span-2">
                <label
                  htmlFor="hs-pro-dappinm"
                  className="sm:mt-2.5 inline-block text-sm text-gray-500 dark:text-neutral-500"
                >
                  Name
                </label>
              </div>
              {/* End Col */}
              <div className="sm:col-span-8 xl:col-span-4">
                <input
                  id="hs-pro-dappinm"
                  type="text"
                  className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                  placeholder="Enter full name"
                  disabled={personal ? false : true}
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-neutral-500">
                  Enter your full name, or a display name you are comfortable
                  with.
                </p>
              </div>
              {/* End Col */}
            </div>
            {/* End Grid */}
            {/* Username Grid */}
            <div className="grid sm:grid-cols-12 gap-y-1.5 sm:gap-y-0 sm:gap-x-5">
              <div className="sm:col-span-4 xl:col-span-3 2xl:col-span-2">
                <label
                  htmlFor="hs-pro-dappiun"
                  className="sm:mt-2.5 inline-block text-sm text-gray-500 dark:text-neutral-500"
                >
                  Username
                </label>
              </div>
              {/* End Col */}
              <div className="sm:col-span-8 xl:col-span-4">
                <input
                  id="hs-pro-dappiun"
                  type="text"
                  className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                  placeholder="Enter username"
                  autoComplete="username"
                  value={`${username}`}
                  disabled={personal ? false : true}
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-neutral-500">
                  Enter your display name on EMONS stricted access forums.
                </p>
              </div>
              {/* End Col */}
            </div>
            {/* End Grid */}
            {/* Email Grid */}
            <div className="grid sm:grid-cols-12 gap-y-1.5 sm:gap-y-0 sm:gap-x-5">
              <div className="sm:col-span-4 xl:col-span-3 2xl:col-span-2">
                <label
                  htmlFor="hs-pro-dappiem"
                  className="sm:mt-2.5 inline-block text-sm text-gray-500 dark:text-neutral-500"
                >
                  Email
                </label>
              </div>
              {/* End Col */}
              <div className="sm:col-span-8 xl:col-span-4">
                <input
                  id="hs-pro-dappiem"
                  type="text"
                  className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                  placeholder="Enter email address"
                  disabled={personal ? false : true}
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-neutral-500">
                  Enter the email address that will receive news from EMONS.
                </p>
              </div>
              {/* End Col */}
            </div>
            {/* End Grid */}
            {/* Button Group */}
            {personal ? (
              <div className="grid sm:grid-cols-12 gap-y-1.5 sm:gap-y-0 sm:gap-x-5">
                <div className="sm:col-span-4 xl:col-span-3 2xl:col-span-2" />
                <div className="sm:col-span-8 xl:col-span-4">
                  <div className="flex gap-x-3">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Save changes
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      onClick={() => setPersonal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid sm:grid-cols-12 gap-y-1.5 sm:gap-y-0 sm:gap-x-5">
                <div className="sm:col-span-4 xl:col-span-3 2xl:col-span-2" />
                <div className="sm:col-span-8 xl:col-span-4">
                  <div className="flex gap-x-3">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onClick={() => setPersonal(true)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* End Button Group */}
          </div>
          {/* End Personal Info */}

          {/* Password */}
          <div className="py-6 space-y-5 border-t border-gray-200 sm:py-8 first:border-t-0 dark:border-neutral-700">
            <div className="inline-flex items-center gap-x-2">
              <h2 className="font-semibold text-gray-800 dark:text-neutral-200">
                Password
              </h2>
              {/* Tooltip */}
              <div className="inline-block hs-tooltip">
                <svg
                  className="text-gray-500 hs-tooltip-toggle shrink-0 ms-1 size-3 dark:text-neutral-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
                <div
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-[60] p-4 w-96 bg-white rounded-xl shadow-xl dark:bg-neutral-900 dark:text-neutral-400"
                  role="tooltip"
                >
                  <p className="font-medium text-gray-800 dark:text-neutral-200">
                    Password requirements:
                  </p>
                  <p className="mt-1 text-sm font-normal text-gray-500 dark:text-neutral-400">
                    Ensure that these requirements are met:
                  </p>
                  <ul className="mt-1 ps-3.5 list-disc list-outside text-sm font-normal text-gray-500 dark:text-neutral-400">
                    <li>Minimum 8 characters long - the more, the better</li>
                    <li>At least one lowercase character</li>
                    <li>At least one uppercase character</li>
                    <li>
                      At least one number, symbol, or whitespace character
                    </li>
                  </ul>
                </div>
              </div>
              {/* End Tooltip */}
            </div>
            {/* Grid */}
            <div className="grid sm:grid-cols-12 gap-y-1.5 sm:gap-y-0 sm:gap-x-5">
              <div className="sm:col-span-4 xl:col-span-3 2xl:col-span-2">
                <label
                  htmlFor="hs-pro-dappcp"
                  className="sm:mt-2.5 inline-block text-sm text-gray-500 dark:text-neutral-500"
                >
                  Current password
                </label>
              </div>
              {/* End Col */}
              <div className="sm:col-span-8 xl:col-span-4">
                {/* Input */}
                <div className="relative">
                  <input
                    id="hs-pro-dappcp"
                    type="text"
                    autoComplete="current-password"
                    className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    data-hs-toggle-password='{
                      "target": "#hs-pro-dappcp"
                    }'
                    className="absolute inset-y-0 z-20 flex items-center px-3 text-gray-400 cursor-pointer end-0 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
                  >
                    <svg
                      className="shrink-0 size-3.5"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
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
                        x1={2}
                        x2={22}
                        y1={2}
                        y2={22}
                      />
                      <path
                        className="hidden hs-password-active:block"
                        d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                      />
                      <circle
                        className="hidden hs-password-active:block"
                        cx={12}
                        cy={12}
                        r={3}
                      />
                    </svg>
                  </button>
                </div>
                {/* End Input */}
              </div>
              {/* End Col */}
            </div>
            {/* End Grid */}
            {/* Grid */}
            <div className="grid sm:grid-cols-12 gap-y-1.5 sm:gap-y-0 sm:gap-x-5">
              <div className="sm:col-span-4 xl:col-span-3 2xl:col-span-2">
                <label
                  htmlFor="hs-pro-dappnp"
                  className="sm:mt-2.5 inline-block text-sm text-gray-500 dark:text-neutral-500"
                >
                  New password
                </label>
              </div>
              {/* End Col */}
              <div className="sm:col-span-8 xl:col-span-4">
                <div data-hs-toggle-password-group="" className="space-y-2">
                  {/* Input */}
                  <div className="relative">
                    <input
                      id="hs-pro-dappnp"
                      type="text"
                      autoComplete="new-password"
                      className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      data-hs-toggle-password='{
                        "target": ["#hs-pro-dappnp", "#hs-pro-dapprnp"]
                      }'
                      className="absolute inset-y-0 z-20 flex items-center px-3 text-gray-400 cursor-pointer end-0 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
                    >
                      <svg
                        className="shrink-0 size-3.5"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
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
                          x1={2}
                          x2={22}
                          y1={2}
                          y2={22}
                        />
                        <path
                          className="hidden hs-password-active:block"
                          d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                        />
                        <circle
                          className="hidden hs-password-active:block"
                          cx={12}
                          cy={12}
                          r={3}
                        />
                      </svg>
                    </button>
                  </div>
                  {/* End Input */}
                  {/* Input */}
                  <div className="relative">
                    <input
                      id="hs-pro-dapprnp"
                      type="text"
                      className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                      autoComplete="new-password"
                      placeholder="Repeat new password"
                    />
                    <button
                      type="button"
                      data-hs-toggle-password='{
            "target": ["#hs-pro-dappnp", "#hs-pro-dapprnp"]
          }'
                      className="absolute inset-y-0 z-20 flex items-center px-3 text-gray-400 cursor-pointer end-0 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
                    >
                      <svg
                        className="shrink-0 size-3.5"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
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
                          x1={2}
                          x2={22}
                          y1={2}
                          y2={22}
                        />
                        <path
                          className="hidden hs-password-active:block"
                          d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                        />
                        <circle
                          className="hidden hs-password-active:block"
                          cx={12}
                          cy={12}
                          r={3}
                        />
                      </svg>
                    </button>
                  </div>
                  {/* End Input */}
                  <div
                    data-hs-strong-password='{
            "target": "#hs-pro-dappnp",
            "stripClasses": "hs-strong-password:opacity-100 hs-strong-password-accepted:bg-teal-500 h-2 flex-auto rounded-full bg-blue-500 opacity-50 mx-1"
          }'
                    className="flex mt-2 -mx-1"
                  />
                  <p className="text-sm text-gray-600 dark:text-neutral-400">
                    Level: <span />
                  </p>
                  {/* Button Group */}
                  <div className="flex items-center gap-x-3">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Change
                    </button>
                    <a
                      className="text-sm font-medium text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline dark:text-blue-400 dark:hover:text-blue-500"
                      href="#"
                    >
                      I forgot my password
                    </a>
                  </div>
                  {/* End Button Group */}
                </div>
              </div>
              {/* End Col */}
            </div>
            {/* End Grid */}
          </div>
          {/* End Password */}
          {/* Social Accounts */}
          <div className="py-6 space-y-5 border-t border-gray-200 sm:py-8 first:border-t-0 dark:border-neutral-700">
            <h2 className="font-semibold text-gray-800 dark:text-neutral-200">
              Social accounts
            </h2>
            {/* Grid */}
            <div className="grid sm:grid-cols-12 gap-y-1.5 sm:gap-y-0 sm:gap-x-5">
              <div className="sm:col-span-4 xl:col-span-3 2xl:col-span-2">
                <label
                  htmlFor="hs-pro-dapsaurl"
                  className="sm:mt-2.5 inline-block text-sm text-gray-500 dark:text-neutral-500"
                >
                  URL
                </label>
              </div>
              {/* End Col */}
              <div className="sm:col-span-8 xl:col-span-4">
                <div className="space-y-2">
                  <div id="hs-wrapper-for-copy" className="space-y-2">
                    <input
                      id="hs-pro-dapsaurl"
                      type="text"
                      className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                      placeholder="Link to social profile"
                    />
                    <input
                      type="text"
                      className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                      placeholder="Link to social profile"
                    />
                    <input
                      id="hs-content-for-copy"
                      type="text"
                      className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                      placeholder="Link to social profile"
                    />
                  </div>
                  {/* Add Link */}
                  <p className="mt-3">
                    <button
                      type="button"
                      data-hs-copy-markup='{
            "targetSelector": "#hs-content-for-copy",
            "wrapperSelector": "#hs-wrapper-for-copy",
            "limit": 4
          }'
                      className="py-1.5 px-2 inline-flex items-center gap-x-1 text-xs font-medium rounded-full border border-dashed border-gray-200 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    >
                      <svg
                        className="shrink-0 size-3"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                      Add link
                    </button>
                  </p>
                  {/* End Add Link */}
                </div>
              </div>
              {/* End Col */}
            </div>
            {/* End Grid */}
          </div>
          {/* End Social Accounts */}
          {/* Connect Accounts */}
          <div className="py-6 space-y-5 border-t border-gray-200 sm:py-8 first:border-t-0 dark:border-neutral-700">
            {/* Grid */}
            <div className="grid sm:grid-cols-12 gap-y-1.5 sm:gap-y-0 sm:gap-x-5">
              <div className="sm:col-span-4 xl:col-span-3 2xl:col-span-2">
                <label className="sm:mt-2.5 inline-block text-sm text-gray-500 dark:text-neutral-500">
                  Connect accounts
                </label>
              </div>
              {/* End Col */}
              <div className="sm:col-span-8 xl:col-span-4">
                {/* Button Group */}
                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  >
                    <svg
                      className="size-4"
                      width={33}
                      height={32}
                      viewBox="0 0 33 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_4132_5805)">
                        <path
                          d="M32.2566 16.36C32.2566 15.04 32.1567 14.08 31.9171 13.08H16.9166V19.02H25.7251C25.5454 20.5 24.5866 22.72 22.4494 24.22L22.4294 24.42L27.1633 28.1L27.4828 28.14C30.5189 25.34 32.2566 21.22 32.2566 16.36Z"
                          fill="#4285F4"
                        />
                        <path
                          d="M16.9166 32C21.231 32 24.8463 30.58 27.5028 28.12L22.4694 24.2C21.1111 25.14 19.3135 25.8 16.9366 25.8C12.7021 25.8 9.12677 23 7.84844 19.16L7.66867 19.18L2.71513 23L2.65521 23.18C5.2718 28.4 10.6648 32 16.9166 32Z"
                          fill="#34A853"
                        />
                        <path
                          d="M7.82845 19.16C7.48889 18.16 7.28915 17.1 7.28915 16C7.28915 14.9 7.48889 13.84 7.80848 12.84V12.62L2.81499 8.73999L2.6552 8.81999C1.55663 10.98 0.937439 13.42 0.937439 16C0.937439 18.58 1.55663 21.02 2.63522 23.18L7.82845 19.16Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M16.9166 6.18C19.9127 6.18 21.9501 7.48 23.0886 8.56L27.6027 4.16C24.8263 1.58 21.231 0 16.9166 0C10.6648 0 5.27181 3.6 2.63525 8.82L7.80851 12.84C9.10681 8.98 12.6821 6.18 16.9166 6.18Z"
                          fill="#EB4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4132_5805">
                          <rect
                            width={32}
                            height={32}
                            fill="white"
                            transform="translate(0.937439)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    Remove Google
                    <svg
                      className="text-gray-500 shrink-0 size-3 dark:text-neutral-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  >
                    <svg
                      className="size-4"
                      width={32}
                      height={32}
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.7326 0C9.96372 0.00130479 8.53211 1.43397 8.53342 3.19935C8.53211 4.96473 9.96503 6.39739 11.7339 6.39869H14.9345V3.20065C14.9358 1.43527 13.5029 0.00260958 11.7326 0C11.7339 0 11.7339 0 11.7326 0M11.7326 8.53333H3.20053C1.43161 8.53464 -0.00130383 9.9673 3.57297e-06 11.7327C-0.00261123 13.4981 1.4303 14.9307 3.19922 14.9333H11.7326C13.5016 14.932 14.9345 13.4994 14.9332 11.734C14.9345 9.9673 13.5016 8.53464 11.7326 8.53333Z"
                        fill="#36C5F0"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M32 11.7327C32.0013 9.9673 30.5684 8.53464 28.7995 8.53333C27.0306 8.53464 25.5976 9.9673 25.5989 11.7327V14.9333H28.7995C30.5684 14.932 32.0013 13.4994 32 11.7327ZM23.4666 11.7327V3.19935C23.4679 1.43527 22.0363 0.00260958 20.2674 0C18.4984 0.00130479 17.0655 1.43397 17.0668 3.19935V11.7327C17.0642 13.4981 18.4971 14.9307 20.2661 14.9333C22.035 14.932 23.4679 13.4994 23.4666 11.7327Z"
                        fill="#2EB67D"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M20.2661 32C22.035 31.9987 23.4679 30.566 23.4666 28.8007C23.4679 27.0353 22.035 25.6026 20.2661 25.6013H17.0656V28.8007C17.0642 30.5647 18.4972 31.9974 20.2661 32ZM20.2661 23.4654H28.7995C30.5684 23.4641 32.0013 22.0314 32 20.266C32.0026 18.5006 30.5697 17.068 28.8008 17.0654H20.2674C18.4985 17.0667 17.0656 18.4993 17.0669 20.2647C17.0656 22.0314 18.4972 23.4641 20.2661 23.4654Z"
                        fill="#ECB22E"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.93953e-07 20.266C-0.00130651 22.0314 1.43161 23.4641 3.20052 23.4654C4.96944 23.4641 6.40235 22.0314 6.40105 20.266V17.0667H3.20052C1.43161 17.068 -0.00130651 18.5006 8.93953e-07 20.266ZM8.53342 20.266V28.7993C8.5308 30.5647 9.96372 31.9974 11.7326 32C13.5016 31.9987 14.9345 30.566 14.9332 28.8007V20.2686C14.9358 18.5032 13.5029 17.0706 11.7339 17.068C9.96372 17.068 8.53211 18.5006 8.53342 20.266C8.53342 20.2673 8.53342 20.266 8.53342 20.266Z"
                        fill="#E01E5A"
                      />
                    </svg>
                    Connect with Slack
                  </button>
                </div>
                {/* End Button Group */}
                <p className="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                  Access your Preline Workspaces with any email address, or by
                  connecting an account.
                </p>
              </div>
              {/* End Col */}
            </div>
            {/* End Grid */}
          </div>
          {/* End Connect Accounts */}
          {/* Two-Step Verification */}
          <div className="py-6 space-y-5 border-t border-gray-200 sm:py-8 first:border-t-0 dark:border-neutral-700">
            {/* Grid */}
            <div className="grid sm:grid-cols-12 gap-y-1.5 sm:gap-y-0 sm:gap-x-5">
              <div className="sm:col-span-4 xl:col-span-3 2xl:col-span-2">
                <label className="sm:mt-2.5 inline-block text-sm text-gray-500 dark:text-neutral-500">
                  Two-Step Verification
                </label>
              </div>
              {/* End Col */}
              <div className="sm:col-span-8 xl:col-span-4">
                {/* Alert */}
                <div
                  className="p-4 text-blue-600 rounded-lg bg-blue-50 bg-blue-500/10"
                  role="alert"
                  tabIndex={-1}
                  aria-labelledby="hs-pro-dasfaaoea-label"
                >
                  <div className="flex">
                    <svg
                      className="mt-1 shrink-0 size-5"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    <div className="space-y-2 ms-3">
                      <h3
                        id="hs-pro-dasfaaoea-label"
                        className="text-sm text-blue-600 dark:text-blue-500"
                      >
                        Advanced security features are available on Enterprise
                      </h3>
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <svg
                          className="shrink-0 size-3"
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={16}
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z" />
                        </svg>
                        Upgrade
                      </button>
                    </div>
                  </div>
                </div>
                {/* End Alert */}
              </div>
              {/* End Col */}
            </div>
            {/* End Grid */}
          </div>
          {/* End Two-Step Verification */}
          {/* Disable Ads */}
          <div className="py-6 space-y-5 border-t border-gray-200 sm:py-8 first:border-t-0 dark:border-neutral-700">
            {/* Grid */}
            <div className="grid sm:grid-cols-12 gap-y-1.5 sm:gap-y-0 sm:gap-x-5">
              <div className="sm:col-span-4 xl:col-span-3 2xl:col-span-2">
                <label className="inline-block text-sm text-gray-500 dark:text-neutral-500">
                  Disable Ads
                  <span className="ms-1 inline-flex items-center gap-x-1.5 px-1.5 text-[10px] font-medium bg-blue-600 text-white rounded-full dark:bg-blue-500">
                    PRO
                  </span>
                </label>
              </div>
              {/* End Col */}
              <div className="sm:col-span-8 xl:col-span-4">
                <div className="mt-1.5 flex">
                  <input
                    type="checkbox"
                    className="shrink-0 border-gray-200 size-3.5 rounded text-blue-600 focus:ring-offset-0 dark:bg-neutral-800 dark:checked:bg-blue-500 dark:border-neutral-700"
                    id="hs-pro-dapdach"
                  />
                  <label
                    htmlFor="hs-pro-dapdach"
                    className="text-xs text-gray-600 ms-2 dark:text-neutral-400"
                  >
                    With your Pro account, you can disable ads across the site.
                  </label>
                </div>
              </div>
              {/* End Col */}
            </div>
            {/* End Grid */}
          </div>
          {/* End Disable Ads */}
          {/* Sessions */}
          <div className="py-6 space-y-5 border-t border-gray-200 sm:py-8 first:border-t-0 dark:border-neutral-700">
            {/* Grid */}
            <div className="grid sm:grid-cols-12 gap-y-1.5 2xl:gap-y-0 sm:gap-x-5">
              <div className="sm:col-span-4 xl:col-span-3 2xl:col-span-2">
                <label className="inline-block text-sm text-gray-500 dark:text-neutral-500">
                  Sessions
                </label>
              </div>
              {/* End Col */}
              <div className="sm:col-span-8 2xl:col-span-10">
                {/* Grid */}
                <div className="grid gap-5 xl:grid-cols-2 2xl:grid-cols-3">
                  {/* Card */}
                  <div className="flex flex-col p-5 space-y-4 bg-white border border-gray-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                    {/* Header */}
                    <div className="flex justify-between">
                      <div className="flex flex-col justify-center items-center size-[38px] border border-gray-200 rounded-lg dark:border-neutral-700">
                        <svg
                          className="text-gray-500 size-5 dark:text-neutral-500"
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
                        </svg>
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      >
                        <svg
                          className="shrink-0 size-3"
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1={21} x2={9} y1={12} y2={12} />
                        </svg>
                        Sign out
                      </button>
                    </div>
                    {/* End Header */}
                    {/* Heading */}
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-800 dark:text-neutral-200">
                        Mac
                      </span>
                      <span className="inline-flex items-center gap-1.5 py-px px-2 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-500/10 dark:text-blue-500">
                        Current session
                      </span>
                    </div>
                    {/* End Heading */}
                    {/* List Group */}
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 uppercase dark:text-neutral-500">
                          Location:
                        </span>
                        <span className="text-sm text-gray-800 dark:text-neutral-200">
                          United Kingdom
                        </span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 uppercase dark:text-neutral-500">
                          Device:
                        </span>
                        <span className="text-sm text-gray-800 dark:text-neutral-200">
                          Safari - iOS
                        </span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 uppercase dark:text-neutral-500">
                          IP address:
                        </span>
                        <span className="text-sm text-gray-800 dark:text-neutral-200">
                          129.562.028.172
                        </span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 uppercase dark:text-neutral-500">
                          Recent activity:
                        </span>
                        <span className="text-sm text-gray-800 dark:text-neutral-200">
                          5 minutes ago
                        </span>
                      </li>
                    </ul>
                    {/* End List Group */}
                    <button
                      type="button"
                      className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    >
                      <svg
                        className="shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx={12} cy={12} r={10} />
                        <path d="M12 16v-4" />
                        <path d="M12 8h.01" />
                      </svg>
                      Don’t recognize something?
                    </button>
                  </div>
                  {/* End Card */}
                  {/* Card */}
                  <div className="flex flex-col p-5 space-y-4 bg-white border border-gray-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                    {/* Header */}
                    <div className="flex justify-between">
                      <div className="flex flex-col justify-center items-center size-[38px] border border-gray-200 rounded-lg dark:border-neutral-700">
                        <svg
                          className="text-gray-500 size-5 dark:text-neutral-500"
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
                        </svg>
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      >
                        <svg
                          className="shrink-0 size-3"
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1={21} x2={9} y1={12} y2={12} />
                        </svg>
                        Sign out
                      </button>
                    </div>
                    {/* End Header */}
                    {/* Heading */}
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-800 dark:text-neutral-200">
                        Mac
                      </span>
                      <span className="inline-flex items-center gap-1.5 py-px px-2 text-xs font-medium bg-gray-100 text-gray-800 rounded-full dark:bg-neutral-700 dark:text-neutral-200">
                        Expired
                      </span>
                    </div>
                    {/* End Heading */}
                    {/* List Group */}
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 uppercase dark:text-neutral-500">
                          Location:
                        </span>
                        <span className="text-sm text-gray-800 dark:text-neutral-200">
                          United Kingdom
                        </span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 uppercase dark:text-neutral-500">
                          Device:
                        </span>
                        <span className="text-sm text-gray-800 dark:text-neutral-200">
                          Safari - iOS
                        </span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 uppercase dark:text-neutral-500">
                          IP address:
                        </span>
                        <span className="text-sm text-gray-800 dark:text-neutral-200">
                          129.562.028.172
                        </span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 uppercase dark:text-neutral-500">
                          Recent activity:
                        </span>
                        <span className="text-sm text-gray-800 dark:text-neutral-200">
                          1 month ago
                        </span>
                      </li>
                    </ul>
                    {/* End List Group */}
                    <button
                      type="button"
                      className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    >
                      <svg
                        className="shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx={12} cy={12} r={10} />
                        <path d="M12 16v-4" />
                        <path d="M12 8h.01" />
                      </svg>
                      Don’t recognize something?
                    </button>
                  </div>
                  {/* End Card */}
                  {/* Card */}
                  <div className="flex flex-col p-5 space-y-4 bg-white border border-gray-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                    {/* Header */}
                    <div className="flex justify-between">
                      <div className="flex flex-col justify-center items-center size-[38px] border border-gray-200 rounded-lg dark:border-neutral-700">
                        <svg
                          className="text-gray-500 size-5 dark:text-neutral-500"
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            width={16}
                            height={20}
                            x={4}
                            y={2}
                            rx={2}
                            ry={2}
                          />
                          <line x1={12} x2="12.01" y1={18} y2={18} />
                        </svg>
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      >
                        <svg
                          className="shrink-0 size-3"
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1={21} x2={9} y1={12} y2={12} />
                        </svg>
                        Sign out
                      </button>
                    </div>
                    {/* End Header */}
                    {/* Heading */}
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-800 dark:text-neutral-200">
                        iPad PRO
                      </span>
                    </div>
                    {/* End Heading */}
                    {/* List Group */}
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 uppercase dark:text-neutral-500">
                          Location:
                        </span>
                        <span className="text-sm text-gray-800 dark:text-neutral-200">
                          United Kingdom
                        </span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 uppercase dark:text-neutral-500">
                          Device:
                        </span>
                        <span className="text-sm text-gray-800 dark:text-neutral-200">
                          Safari - iOS
                        </span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 uppercase dark:text-neutral-500">
                          IP address:
                        </span>
                        <span className="text-sm text-gray-800 dark:text-neutral-200">
                          129.562.028.172
                        </span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 uppercase dark:text-neutral-500">
                          Recent activity:
                        </span>
                        <span className="text-sm text-gray-800 dark:text-neutral-200">
                          2 days ago
                        </span>
                      </li>
                    </ul>
                    {/* End List Group */}
                    <button
                      type="button"
                      className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    >
                      <svg
                        className="shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx={12} cy={12} r={10} />
                        <path d="M12 16v-4" />
                        <path d="M12 8h.01" />
                      </svg>
                      Don’t recognize something?
                    </button>
                  </div>
                  {/* End Card */}
                </div>
                {/* End Grid */}
              </div>
              {/* End Col */}
            </div>
            {/* End Grid */}
          </div>
          {/* End Sessions */}
          {/* Danger Zone */}
          <div className="py-6 space-y-5 border-t border-gray-200 sm:py-8 first:border-t-0 dark:border-neutral-700">
            {/* Grid */}
            <div className="grid sm:grid-cols-12 gap-y-1.5 sm:gap-y-0 sm:gap-x-5">
              <div className="sm:col-span-4 xl:col-span-3 2xl:col-span-2">
                <label className="inline-block text-sm text-gray-500 dark:text-neutral-500">
                  Danger zone
                </label>
              </div>
              {/* End Col */}
              <div className="sm:col-span-8 xl:col-span-4">
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-500 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-red-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                >
                  Delete my account
                </button>
                <p className="mt-3 text-sm text-gray-500 dark:text-neutral-500">
                  This will immediately delete all of your data. This action is
                  not reversible, so please continue with caution.{" "}
                  <a
                    className="text-sm font-medium text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline dark:text-blue-400 dark:hover:text-blue-500"
                    href="#"
                  >
                    Learn more
                  </a>
                </p>
              </div>
              {/* End Col */}
            </div>
            {/* End Grid */}
          </div>
          {/* End Danger Zone */}
        </form>
        {/* End Form */}
      </div>
      {/* End Account Card */}
    </>
  );
}
