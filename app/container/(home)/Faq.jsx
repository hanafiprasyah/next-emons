"use client";

import React from "react";
import Link from "next/link";

function Faq() {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-2xl mx-auto mb-10 text-center lg:mb-14">
        <h2 className="text-2xl font-bold text-gray-800 md:text-3xl md:leading-tight dark:text-neutral-200">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="grid gap-6 sm:grid-cols-2 md:gap-12">
          <>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                What is EMONS?
              </h3>
              <p className="mt-2 text-gray-600 dark:text-neutral-400">
                EMONS is an IoT-based tool that helps you monitor the quality of
                your electrical system in real-time.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                What does EMONS work like?
              </h3>
              <p className="mt-2 text-gray-600 dark:text-neutral-400">
                The EMONS tool will send data on the quality of your electrical
                system to be displayed on the website. We use encryption to
                increase the security of your tools and accounts.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                Where is EMONS installed?
              </h3>
              <p className="mt-2 text-gray-600 dark:text-neutral-400">
                EMONS can be installed on main panels in buildings, sub panels
                in rooms, as well as equipment that uses an electrical system.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                How to order EMONS?
              </h3>
              <p className="mt-2 text-gray-600 dark:text-neutral-400">
                You can visit{" "}
                <Link
                  className="underline"
                  href={`https://wise.co.id/contact`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Wibawa Solusi Elektrik"
                >
                  our official site
                </Link>{" "}
                for more information.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                Who can monitor electrical systems with EMONS?
              </h3>
              <p className="mt-2 text-gray-600 dark:text-neutral-400">
                After you purchase the EMONS tool, we will give you an account
                that acts as a manager. Then, you can add new users to monitor
                the electrical system together with you. Of course, with
                limitations on user rights that you have previously agreed to.
              </p>
            </div>
          </>
        </div>
      </div>
    </div>
  );
}

export default Faq;
