"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// TODO: Substring the string "after and before" char(/) to separate the value of tenant and username
function substringUsername(input) {
  return {
    username: input.split("/").slice(1).join("/"),
    tenant: input.substring(0, input.indexOf("/")),
  };
}

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [errors, setError] = useState("");
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();

    // First, we will check if user input their data or not
    if (username == "" || password == "") {
      setError("Please fill in the username and password!");
    }
    // then check if user input their team name or not
    else if (!username.includes("/")) {
      setError("You have to set your team name first!");
    }
    // if all clear, continue the process
    else {
      setError("");
      setLoading(true);

      // Patch the value of substringUsername(input) value
      const pureUsername = substringUsername(username).username;
      const pureTenant = substringUsername(username).tenant;

      if (process.env.NODE_ENV === "development") {
        console.log("=====");
        console.log("Pure username after substring: " + pureUsername);
        console.log("Pure tenant after substring: " + pureTenant);
        console.log("=====");
      }

      // TODO: Salt and username encryption
      const saltPost = async () => {
        const response = await fetch(`/api/login/${pureUsername}`, {
          method: "GET",
        });

        return response.json();
      };

      // TODO: Password encryption
      const passEnc = async () => {
        const response = await fetch(`/api/login2/${password}`, {
          method: "GET",
        });

        return response.json();
      };

      // TODO: Final chapter to process the encrypt username, password and salt
      const loggedIn = async (tenant, userName, password, salt) => {
        const response = await fetch("/api/login3/login", {
          method: "POST",
          body: JSON.stringify({
            tenant: tenant,
            userName: userName,
            password: password,
            salt: salt,
          }),
        });

        return response.json();
      };

      // TODO: Processing
      saltPost()
        .then((data) => {
          if (process.env.NODE_ENV === "development") {
            console.log("===== Salt started =====");
            console.log(
              "Salt: " +
                data.datas["salt"] +
                " and username ecript: " +
                data.datas["ecript"]
            );
          }

          if (data.datas["salt"] === null || data.datas["ecript"] === null) {
            setLoading(false);
            throw new Error("Empty value from encryption");
          }

          return {
            salt: data.datas["salt"],
            username: data.datas["ecript"],
          };
        })
        .then((dataSaltPost) => {
          if (process.env.NODE_ENV === "development") {
            console.log("Ok then we will encrypt the password like below:");
          }

          passEnc()
            .then((data2) => {
              if (process.env.NODE_ENV === "development") {
                console.log("===== Password encrypt started =====");
                console.log("Encrypted password: " + data2.passdata["ecript"]);
              }

              if (data2.passdata["ecript"] === null) {
                setLoading(false);
                throw new Error("Empty value from encryptions");
              }

              return {
                password: data2.passdata["ecript"],
              };
            })
            .then((dataPassEnc) => {
              if (process.env.NODE_ENV === "development") {
                console.log(
                  "===== Great! Then at the final stage we get this things already: ====="
                );
                console.log("1. Encrypted Username: " + dataSaltPost.username);
                console.log("2. Encrypted Password: " + dataPassEnc.password);
                console.log("3. Salt: " + dataSaltPost.salt);
                console.log("4. Tenant: " + pureTenant);
                console.log("================================");
              }

              loggedIn(
                `${pureTenant}`,
                `${dataSaltPost.username}`,
                `${dataPassEnc.password}`,
                `${dataSaltPost.salt}`
              ).then((dataLoggedIn) => {
                if (process.env.NODE_ENV === "development") {
                  console.log(
                    "===== Logged In running on server side and this is the data:"
                  );
                  console.log("Status: " + dataLoggedIn.message);
                  console.log(
                    "Data/Object: " + dataLoggedIn.datalogin["decript"]
                  );
                }

                if (dataLoggedIn.datalogin["decript"] === null) {
                  setLoading(false);
                  throw new Error("Empty value from encryptions.");
                }

                if (dataLoggedIn.message === "Login successfully") {
                  setLoading(false);
                  setLoggedIn(true);
                  localStorage.setItem(
                    "userName",
                    `${dataLoggedIn.datalogin["decript"]}`
                  );
                } else {
                  setLoggedIn(false);
                  setError(
                    "Oops! Something went wrong! Please check your data again."
                  );
                }
              });
            });
        });
    }
  }

  useEffect(() => {
    const storedLocalValue = localStorage.getItem("userName");

    if (storedLocalValue) {
      if (process.env.NODE_ENV === "development") {
        console.log("Local key: " + storedLocalValue);
      }

      isLoggedIn ? router.replace("/dashboard") : null;
    }
  }, [router, isLoggedIn]);

  return (
    <form onSubmit={handleSubmit}>
      {errors ? (
        <div className="my-2">
          <div
            className="p-4 text-sm text-yellow-800 bg-yellow-100 border border-yellow-200 rounded-lg dark:bg-yellow-800/10 dark:border-yellow-900 dark:text-yellow-500"
            role="alert"
          >
            <span className="font-bold">Warning</span> {errors}
          </div>
        </div>
      ) : null}
      <div className="space-y-5">
        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
          >
            Username
          </label>

          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            className="py-2.5 px-3 block w-full border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
            placeholder="Your active username"
          />
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-800 dark:text-white"
            >
              Password
            </label>
          </div>

          <div className="relative">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              className="py-2.5 px-3 block w-full border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
              placeholder="Your strength password"
              autoComplete="on"
            />
            <button
              type="button"
              data-hs-toggle-password='{
                      "target": "#password"
                    }'
              className="absolute inset-y-0 z-20 flex items-center px-3 text-gray-400 cursor-pointer end-0 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
            >
              <svg
                className="flex-shrink-0 size-4"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  className="hs-password-active:hidden"
                  d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                />
                <path
                  className="hs-password-active:hidden"
                  d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                />
                <path
                  className="hs-password-active:hidden"
                  d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                />
                <line
                  className="hs-password-active:hidden"
                  x1="2"
                  x2="22"
                  y1="2"
                  y2="22"
                />
                <path
                  className="hidden hs-password-active:block"
                  d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                />
                <circle
                  className="hidden hs-password-active:block"
                  cx="12"
                  cy="12"
                  r="3"
                />
              </svg>
            </button>
          </div>
          <Link
            className="inline-flex items-center gap-x-1.5 text-xs text-gray-600 hover:text-gray-700 decoration-2 hover:underline focus:outline-none focus:underline dark:text-neutral-500 dark:hover:text-neutral-600"
            href={"/forgot-password"}
            prefetch={true}
          >
            I forgot my password
          </Link>
        </div>

        {!isLoggedIn ? (
          <button
            type="submit"
            disabled={loading}
            className="py-2.5 px-3 w-full inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-neutral-600"
          >
            {loading ? "Credential checked.." : "Login"}
          </button>
        ) : (
          <div
            className="w-full bg-white border border-gray-200 shadow-lg rounded-xl dark:bg-neutral-800 dark:border-neutral-700"
            role="alert"
          >
            <div className="flex items-center p-4">
              <div className="inline-flex items-center justify-center w-full">
                <div
                  className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
                  role="status"
                  aria-label="loading"
                >
                  <span className="sr-only">Loading...</span>
                </div>
                <p className="text-sm text-gray-700 ms-3 dark:text-neutral-400">
                  {isLoggedIn ? "Redirect to dashboard" : "Loading data.."}
                </p>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center duration-200 ease-in-out">
            <div className="inline-flex text-center">
              <div
                className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </form>
  );
}

export default LoginForm;
