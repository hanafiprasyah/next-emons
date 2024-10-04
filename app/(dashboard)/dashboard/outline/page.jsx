"use client";

import React from "react";
import PrelineScript from "@/components/PrelineScript";
import VoltageLinearChart from "@/components/charts/line/VoltageLinearChart";

export default function DashboardOutline() {
  return (
    <div id="outline-template" className="w-full h-fit">
      <VoltageLinearChart key={"voltage-linear-chart"}></VoltageLinearChart>
      <PrelineScript />
    </div>
  );
}
