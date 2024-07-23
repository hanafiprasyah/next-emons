"use client";

import React, { useEffect, useState } from "react";
import PrelineScript from "@/components/PrelineScript";
import { redirect } from "next/navigation";

export default function Template({ children }) {
  useEffect(() => {
    const storedLocalValue = localStorage.getItem("userName");

    if (!storedLocalValue) {
      if (process.env.NODE_ENV === "development") {
        console.log("Local key: " + storedLocalValue);
      }

      redirect("/login");
    }
  }, []);

  return (
    <div className="p-2 space-y-5 sm:p-5 sm:py-0 md:pt-5">
      <div className="grid grid-cols-1 gap-8 pt-2 pb-6">{children}</div>
      <PrelineScript />
    </div>
  );
}
