"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import SideImage from "../../../public/images/authentication-charts-dark.svg";
import EmonsLogo from "../../../public/images/emons-logo.svg";
import Loader from "@/loading";

const DynamicForm = dynamic(() => import("@/components/forms/LoginForm"));

export default function Login() {
  return (
    <main id="auth-page">
      <div className="flex min-h-full">
        <div className="hidden min-h-screen lg:w-[400px] xl:w-[430px] lg:flex flex-col justify-between p-6 bg-neutral-200">
          <div className="flex items-center justify-between">
            <div className="flex-none inline-block text-xl font-semibold rounded-md focus:outline-none focus:opacity-80">
              {/* EMONS Logo */}
              <Image
                priority={true}
                className="h-auto w-36"
                src={EmonsLogo}
                alt="EMONS"
                quality={75}
                width={36}
                height={36}
              />
            </div>
          </div>

          <div>
            <span className="text-2xl font-medium text-gray-800">
              The simplest way to monitor your electricity system
            </span>

            <Suspense fallback={<Loader />}>
              <Image
                priority={true}
                className="block w-auto antialiased"
                src={SideImage}
                alt="EMONS"
                quality={50}
                width={36}
                height={36}
              />
            </Suspense>
          </div>

          <div className="flex justify-center gap-x-8">
            <div className="text-xs text-gray-500 dark:text-neutral-500 text-wrap">
              <p>© EMONS. 2024 Wibawa Solusi Elektrik</p>
            </div>
          </div>
        </div>

        <div className="px-5 grow">
          <div className="h-full min-h-screen sm:w-[448px] flex flex-col justify-center mx-auto space-y-5">
            <div>
              <h1 className="text-xl font-semibold text-gray-800 sm:text-2xl dark:text-neutral-200">
                Log in to your EMONS Account
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
                Provide your registered username!
              </p>
            </div>

            <Suspense fallback={<Loader />}>
              <DynamicForm />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
