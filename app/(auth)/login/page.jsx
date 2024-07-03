import React from "react";
import LoginForm from "@/components/forms/LoginForm";

function Login() {
  return (
    <div className="h-full min-h-screen sm:w-[448px] flex flex-col justify-center mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-gray-800 sm:text-2xl dark:text-neutral-200">
          Log in to your EMONS Account
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
          Provide your registered email!
        </p>
      </div>

      <LoginForm />
    </div>
  );
}

export default Login;
