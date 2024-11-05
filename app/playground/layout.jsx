import React, { Suspense } from "react";
import Header from "@/dashboard/sections/Header";
import Sidebar from "@/dashboard/sections/Sidebar";
import Loader from "@/loading";
import PrelineScript from "@/components/PrelineScript";

export default function PlaygroundLayout({ children }) {
  return (
    <main id="playground-layout">
      <>
        <section id="header">
          <Header />
        </section>
        <section id="sidebar">
          <Sidebar />
        </section>
        <section id="content" className="pt-[60px]">
          <div className="p-2 md:pt-2 md:pb-2">
            <Suspense fallback={<Loader />}>{children}</Suspense>
          </div>
        </section>
      </>
      <PrelineScript />
    </main>
  );
}
