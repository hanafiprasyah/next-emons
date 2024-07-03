import React from "react";

function ForgotPasswordForm() {
  return (
    <div id="forgot-pass-form" aria-label="forgot-pass-form">
      <form>
        <div className="space-y-5">
          <div>
            <label
              htmlFor="hs-pro-dale"
              className="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
            >
              Email
            </label>

            <input
              type="email"
              id="hs-pro-dale"
              className="py-2.5 px-3 block w-full border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
              placeholder="you@email.com"
            />
          </div>

          <button
            type="button"
            className="py-2.5 px-3 w-full inline-flex justify-center items-center gap-x-2 text-start bg-blue-600 border border-blue-600 text-white text-sm font-medium rounded-lg shadow-sm align-middle hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-300 dark:focus:ring-blue-500"
          >
            Send email
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPasswordForm;
