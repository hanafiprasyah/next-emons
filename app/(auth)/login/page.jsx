"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import LoginForm from "@/components/forms/LoginForm";
import SideImage from "../../../public/images/side-image.svg";
import EmonsLogo from "../../../public/images/emons-logo.svg";
import Loader from "@/loading";

export default function Login() {
  return (
    <main id="auth-page" className="min-h-[calc(100dvh)]">
      <div className="flex h-[calc(100dvh)] bg-black/85">
        {/* Video Background */}
        <video
          className="absolute top-0 left-0 object-cover w-full h-[calc(100dvh)] -z-10 scale-x-[-1]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={(e) => {
            if (process.env.NODE_ENV === "development") {
              console.error("Error loading video:", e);
            }
            throw e;
          }}
        >
          <source src="/videos/background3a1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="w-full px-5 grow">
          <div className="h-full min-h-screen sm:w-[448px] flex flex-col justify-center mx-auto space-y-5 select-none z-50">
            {/* Glass Container */}
            <div className="p-6 text-white shadow-xl lg:p-12 bg-white/10 backdrop-blur-md rounded-xl">
              <h1 className="text-lg font-semibold text-gray-800 transition-opacity duration-300 ease-in-out lg:text-xl dark:text-neutral-200 animate-fade-in">
                Electrical Monitoring System
              </h1>
              <p className="mt-1 mb-8 text-xs text-gray-500 transition-opacity duration-300 ease-in-out lg:text-sm dark:text-neutral-500 text-wrap animate-fade-in">
                The simplest way to monitor your electrical system
              </p>

              {/* End of Glass Container */}
              <Suspense fallback={<Loader />}>
                <LoginForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
