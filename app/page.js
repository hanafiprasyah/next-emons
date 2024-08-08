"use client";

import React from "react";
import PrelineScript from "./components/PrelineScript";
import Hero from "@/container/(home)/Hero";
import Faq from "@/container/(home)/Faq";
import Footer from "@/container/Footer";

export default function Home() {
  return (
    <main id="welcome-page" className="md:px-2">
      <>
        <section id="hero">
          <Hero />
        </section>
        <section id="faq">
          <Faq />
        </section>
        <section id="footer">
          <Footer />
        </section>
      </>
      <PrelineScript />
    </main>
  );
}
