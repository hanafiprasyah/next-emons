"use client";

import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 400) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    if (process.env.NODE_ENV === "development") {
      console.log("send user to the top of viewport");
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (process.env.NODE_ENV === "development") {
        console.log("clean up scroll listener");
      }
    };
  }, []);

  return (
    <div
      className={`fixed bottom-8 right-8 ${
        showButton ? " opacity-100 translate-y-0" : " opacity-0 translate-y-24"
      } transition duration-300 ease-in-out`}
    >
      <button
        type="button"
        onClick={scrollToTop}
        className="flex flex-shrink-0 justify-center items-center gap-2 size-[38px] text-sm font-semibold rounded-lg border border-transparent bg-blue-600/50 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none transition duration-200 ease-in-out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0 size-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </div>
  );
}
