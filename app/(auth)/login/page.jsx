"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import LoginForm from "@/components/forms/LoginForm";
import Loader from "@/loading";

export default function Login() {
  const [errorVideo, setErrorVideo] = useState(false);

  return (
    <main id="auth-page" aria-label="Authentication" className="h-dvh">
      <div className="flex w-full h-full bg-black/80">
        <>
          {/* Video Background */}
          <video
            className={`${
              errorVideo ? "hidden" : "block"
            } absolute object-cover w-full h-dvh -z-10 scale-x-[-1]`}
            autoPlay
            onLoad={() => setErrorVideo(false)}
            muted
            loop
            playsInline
            preload="auto"
            onError={(e) => {
              if (process.env.NODE_ENV === "development") {
                console.error("Error loading video:", e);
              }
              setErrorVideo(true);
            }}
          >
            <source src="/videos/background3a1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="w-full px-6 grow">
            <div className="h-dvh sm:w-[448px] flex flex-col justify-center mx-auto space-y-5 select-none z-50">
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
        </>
      </div>
    </main>
  );
}
