import PrelineScript from "@/components/PrelineScript";
import React from "react";

export default function Template({ children }) {
  return (
    <>
      <div className="px-5 grow">{children}</div>
      <PrelineScript />
    </>
  );
}
