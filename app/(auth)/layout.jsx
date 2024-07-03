"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import ImageDark from "../../public/images/authentication-charts-dark.svg";
import EmonsLogo from "../../public/images/emons-logo.svg";

export default function Layout({ children }) {
  return (
    <main>
      <div className="flex min-h-full">
        <div className="hidden min-h-screen lg:w-[400px] xl:w-[430px] lg:flex flex-col justify-between p-6 bg-neutral-200">
          <div className="flex items-center justify-between">
            <div className="flex-none inline-block text-xl font-semibold rounded-md focus:outline-none focus:opacity-80">
              {/* SVG or JPG (36x36) */}
              <Image
                priority
                className="h-auto w-36"
                src={EmonsLogo}
                alt="EMONS"
                width={500}
                height={500}
              />
            </div>
          </div>

          <div>
            <span className="text-2xl font-medium text-gray-800">
              The simplest way to monitor your electricity system
            </span>

            <Image
              priority
              className="block"
              width={500}
              height={500}
              src={ImageDark}
              alt="EMONS"
            />
          </div>

          <div className="flex justify-center gap-x-8">
            <div className="text-xs text-gray-500 dark:text-neutral-500 text-wrap">
              <p>© EMONS. 2024 Wibawa Solusi Elektrik</p>
            </div>
          </div>
        </div>

        {children}
      </div>
    </main>
  );
}
