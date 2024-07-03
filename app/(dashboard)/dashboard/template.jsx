import PrelineScript from "@/components/PrelineScript";
import React from "react";

export default function Template({ children }) {
  return (
    <div className="p-2 space-y-5 sm:p-5 sm:py-0 md:pt-5">
      <div className="grid grid-cols-1 gap-8 pt-2 pb-6">{children}</div>
      <PrelineScript />
    </div>
  );
}
