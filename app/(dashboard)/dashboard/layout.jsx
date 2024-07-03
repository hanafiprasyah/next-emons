import React from "react";
import Header from "@/dashboard/sections/Header";
import Sidebar from "@/dashboard/sections/Sidebar";
import DeviceInfoModal from "@/components/modals/DeviceInfo";

export default function Layout({ children }) {
  return (
    <main>
      <>
        <section id="header">
          <Header />
        </section>
        <section id="sidebar">
          <Sidebar />
        </section>
        <section id="content" className="lg:ps-[260px] pt-[59px] ">
          {children}
        </section>
        <DeviceInfoModal />
      </>
    </main>
  );
}
