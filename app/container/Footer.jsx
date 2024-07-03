import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="text-center">
        <div>
          <Link
            className="flex-none text-xl font-semibold text-black pointer-events-none dark:text-white"
            href={"/"}
            aria-label="EMONS"
          >
            EMONS
          </Link>
        </div>

        <div className="mt-3">
          <p className="text-gray-500 dark:text-neutral-500">
            We are part of the{" "}
            <Link
              className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400"
              href="https://wise.co.id/"
              rel="noopener noreferrer"
              target="_blank"
            >
              WISE
            </Link>{" "}
            family.
          </p>
          <p className="text-gray-500 dark:text-neutral-500">
            © EMONS. 2024 Wibawa Solusi Elektrik. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
