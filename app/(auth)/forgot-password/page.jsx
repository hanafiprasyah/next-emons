import React from "react";
import ForgotForm from "@/components/forms/ForgotPasswordForm";
import Link from "next/link";

function ForgotPassword() {
  return (
    <div className="h-full min-h-screen sm:w-[448px] flex flex-col justify-center mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-gray-800 sm:text-2xl dark:text-neutral-200">
          Reset your password
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
          Enter the email address associated with your account. We’ll send you a
          link to reset your password.
        </p>
      </div>

      <ForgotForm />

      <p className="text-sm text-gray-500 dark:text-neutral-500">
        You did not forget your password?&nbsp;
        <Link
          className="inline-flex items-center text-sm font-medium text-blue-600 gap-x-1 decoration-2 hover:underline focus:outline-none focus:underline dark:text-blue-500"
          href={"/login"}
          prefetch={true}
        >
          Sign in
          <svg
            className="flex-shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Link>
      </p>
    </div>
  );
}

export default ForgotPassword;
