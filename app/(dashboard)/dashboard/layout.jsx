import React, { Suspense } from "react";
import Header from "@/dashboard/sections/Header";
import DeviceInfoModal from "@/components/modals/DeviceInfo";
import Loader from "@/loading";
import dynamic from "next/dynamic";
import PrelineScript from "@/components/PrelineScript";

const Sidebar = dynamic(() => import("@/dashboard/sections/Sidebar"));

export default function DashboardLayout({ children }) {
  return (
    <main id="dashboard-layout">
      <>
        <section id="header">
          <Header />
        </section>
        <section id="sidebar">
          <Suspense fallback={<Loader />}>
            <Sidebar />
          </Suspense>
        </section>
        <section id="content" className="lg:ps-[260px] pt-[59px] ">
          <div className="p-2 space-y-5 sm:p-5 sm:py-0 md:pt-5 md:pb-5">
            <Suspense fallback={<Loader />}>{children}</Suspense>
          </div>
        </section>
        <DeviceInfoModal />
      </>
      <PrelineScript />
    </main>
  );
}
