"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PrelineScript from "@/components/PrelineScript";

// TODO: To check username if contains uppercase or not
function containsUppercase(input) {
  return /[A-Z]/.test(input);
}

// TODO: Substring the string "after and before" char(/) to separate the value of tenant and username
function substringUsername(input) {
  return {
    username: input.split("/").slice(1).join("/"),
    tenant: containsUppercase(input.substring(0, input.indexOf("/")))
      ? input.substring(0, input.indexOf("/")).toLowerCase()
      : input.substring(0, input.indexOf("/")),
  };
}

function LoginForm() {
  const [mobileStyle, setMobileStyle] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [errors, setError] = useState(null);
  const [errorTitle, setErrorTitle] = useState(null);
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    // Set to default for all state on first execution
    setError(null);
    setErrorTitle(null);
    setLoading(true);

    // Regural expression default checker char
    const regex = /\\$/;

    // First, we will check if user input their data or not
    if (username == "" || password == "") {
      setLoggedIn(false);
      setLoading(false);
      setError("Please fill in the username and password!");
      setErrorTitle(null);
    }
    // then check if user input their team name or not
    else if (!username.includes("/")) {
      setLoggedIn(false);
      setLoading(false);
      setError("Authentication failed! Please check your form again.");
      setErrorTitle(null);
    }
    // then check if user input on username field completely or not
    else if (
      username.endsWith("/") ||
      username.endsWith("\\") ||
      regex.test(username)
    ) {
      setLoggedIn(false);
      setLoading(false);
      setError("Fill in the form correctly!");
      setErrorTitle("Oops! Something wrong..");
    }
    // if all clear, continue the process
    else {
      // Set to default for all state to continue to the next execution step (if all clear)
      setError(null);
      setErrorTitle(null);
      setLoading(true);

      // Patch the value of substringUsername(input) value
      const pureUsername = substringUsername(username).username;
      const pureTenant = substringUsername(username).tenant;

      if (process.env.NODE_ENV === "development") {
        console.warn("=====");
        console.log("Pure username after substring: " + pureUsername);
        console.log("Pure tenant after substring: " + pureTenant);
        console.warn("=====");
      }

      // TODO: Salt and username encryption
      const saltPost = async () => {
        try {
          const response = await fetch(`/api/login/${pureUsername}`, {
            headers: {
              tenant: pureTenant,
            },
            method: "GET",
          });

          return response.json();
        } catch (err) {
          process.env.NODE_ENV === "development" ??
            console.error("Something happened while feeding the salt");
          setError("500 code. Internal server error!");
          setError("Connection interrupted");
          setLoading(false);
        }
      };

      // TODO: Password encryption
      const passEnc = async () => {
        try {
          const response = await fetch(`/api/login2/${password}`, {
            headers: {
              tenant: pureTenant,
            },
            method: "GET",
          });

          return response.json();
        } catch (err) {
          process.env.NODE_ENV === "development" ??
            console.error("Something happened while encrypt the password");
          setError("500 code. Internal server error! (2)");
          setErrorTitle("Connection interrupted");
          setLoading(false);
        }
      };

      // TODO: Final chapter to process the encrypt username, password and salt
      const loggedIn = async (tenant, userName, password, salt) => {
        try {
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
        } catch (err) {
          process.env.NODE_ENV === "development" ??
            console.error("Something happened while logging in user");
          setError("500 code. Internal server error! (3)");
          setErrorTitle("Connection interrupted");
          setLoading(false);
        }
      };

      // TODO: Processing
      saltPost()
        .then((data) => {
          if (
            data.message == "Failed to seed" ||
            data.message == "Method not allowed" ||
            data.message == "Internal server error" ||
            data.message == "Failed to connect"
          ) {
            setLoggedIn(false);
            setLoading(false);
            setError("We cannot authenticate your username");
            setErrorTitle("Auth failed");
            if (process.env.NODE_ENV === "development") {
              console.warn("Check the salt process on server actions!");
            }

            return {
              salt: null,
              username: null,
            };
          } else {
            if (process.env.NODE_ENV === "development") {
              console.warn("===== Salt started =====");
              console.log("Salt: " + data.datas["salt"]);
              console.log("Encrypted Username: " + data.datas["ecript"]);
            }

            return {
              salt: data.datas["salt"],
              username: data.datas["ecript"],
            };
          }
        })
        .then((dataSaltPost) => {
          if (process.env.NODE_ENV === "development") {
            console.warn(
              "=== Ok then we will encrypt the password like below:"
            );
          }

          passEnc()
            .then((data2) => {
              if (
                data2.message === "Encrypted failed" ||
                data2.message === "Internal server error" ||
                data2.message === "Method not allowed" ||
                data2.message === "Failed to connect"
              ) {
                setLoggedIn(false);
                setLoading(false);
                setError(
                  "We cannot provide encrypted text for the password. The login flow is not safe!"
                );
                setErrorTitle("Auth failed");
                if (process.env.NODE_ENV === "development") {
                  console.warn(
                    "Check the encrypted password process on server actions!"
                  );
                }

                return {
                  password: null,
                };
              } else {
                if (process.env.NODE_ENV === "development") {
                  console.warn("===== Password encrypt started =====");
                  console.log(
                    "Encrypted password: " + data2.passdata["ecript"]
                  );
                }

                return {
                  password: data2.passdata["ecript"],
                };
              }
            })
            .then((dataPassEnc) => {
              if (process.env.NODE_ENV === "development") {
                console.warn(
                  "===== Great! Then at the final stage we get this things already: ====="
                );
                console.log("1. Encrypted Username: " + dataSaltPost.username);
                console.log("2. Encrypted Password: " + dataPassEnc.password);
                console.log("3. Salt: " + dataSaltPost.salt);
                console.log("4. Tenant: " + pureTenant);
                console.warn("================================");
              }

              loggedIn(
                `${pureTenant}`,
                `${dataSaltPost.username}`,
                `${dataPassEnc.password}`,
                `${dataSaltPost.salt}`
              ).then((dataLoggedIn) => {
                if (
                  dataLoggedIn.message == "Failed to connect" ||
                  dataLoggedIn.message == "Login failed" ||
                  dataLoggedIn.message == "Method not allowed"
                ) {
                  setLoggedIn(false);
                  setLoading(false);
                  setError("We can't recognize you. Please try again!");
                  setErrorTitle("Auth failed");
                  if (process.env.NODE_ENV === "development") {
                    console.warn(
                      "Check the final login process on server actions!"
                    );
                  }
                } else if (dataLoggedIn.message == "Error setting cookie") {
                  setLoggedIn(false);
                  setLoading(false);
                  setError("Your connection is not safe.");
                  setErrorTitle("Auth failed");
                  if (process.env.NODE_ENV === "development") {
                    console.warn(
                      "Check the final login process on server actions! Cache is unset!"
                    );
                  }
                } else if (dataLoggedIn.message == "Internal server error") {
                  setLoggedIn(false);
                  setLoading(false);
                  setError(
                    "Error while trying to connect to server. Please try again later."
                  );
                  setErrorTitle("Server not response");
                  if (process.env.NODE_ENV === "development") {
                    console.warn(
                      "Check the final login process on server actions! Try catch on fetching process is failed!"
                    );
                  }
                } else {
                  if (process.env.NODE_ENV === "development") {
                    console.warn(
                      "===== Logged In running on server side and this is the data:"
                    );
                    console.log("Status: " + dataLoggedIn.message);
                    console.log("Cookie Token: ", dataLoggedIn.cookie_token);
                    console.log("Cookie Salt: ", dataLoggedIn.cookie_salt);
                    console.log(
                      "Data/Object: " + dataLoggedIn.datalogin["decript"]
                    );
                  }
                  if (dataLoggedIn.message === "Login successfully") {
                    const decrpytUsername = dataLoggedIn.datalogin["decript"];
                    setLoggedIn(true);
                    setError(null);
                    setErrorTitle(null);
                    // Set the username to localstorage
                    localStorage.setItem("userName", `${decrpytUsername}`);
                    // Set the tenant to localstorage
                    localStorage.setItem("tenant", `${pureTenant}`);
                    // Set the boolean key to session storage
                    // sessionStorage.setItem("auth_status", true);
                    // Redirect to dashboard after successful login
                    router.replace("/dashboard/");
                  } else {
                    setLoggedIn(false);
                    setLoading(false);
                    setError("Please check your data again.");
                  }
                }
              });
            });
        });
    }
  }

  // TODO: Handle responsive style
  useEffect(() => {
    // Define the mobile screen width limit (e.g., 768px)
    const isMobile = window.innerWidth <= 768;

    // Apply font size style if on mobile
    if (isMobile) {
      setMobileStyle({ fontSize: "16px" });
    }

    // Optional: Listen for window resize to update if screen size changes
    const handleResize = () => {
      setMobileStyle(window.innerWidth <= 768 ? { fontSize: "16px" } : {});
    };
    window.addEventListener("resize", handleResize);

    // Cleanup the resize event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // TODO:Direct to login after tenant check
  useEffect(() => {
    // Check if user and tenant details are stored
    const storedUsernameOnLocal = localStorage.getItem("userName");
    const storedTenantOnLocal = localStorage.getItem("tenant");
    // const storedSessionAuthStatus = sessionStorage.getItem("auth_status");

    const clearSensitiveDatas = async () => {
      await localStorage.clear();
      await sessionStorage.clear();
    };

    // Determine if the user is logged in and if tenant info is available
    const isAuthenticated =
      isLoggedIn && storedUsernameOnLocal && storedTenantOnLocal;

    // Determine if the user is not logged in yet but the localStorage is not empty
    const dizzyAuthenticated =
      storedUsernameOnLocal && storedTenantOnLocal && !isLoggedIn;

    if (isAuthenticated) {
      setLoading(false);
      setLoggedIn(true);
      setError(null);
      setErrorTitle(null);
      router.replace("/dashboard/");
      // if (process.env.NODE_ENV === "development") {
      //   console.log("Local key: " + storedUsernameOnLocal);
      // }
    }
    // check if user is not logged in but localStorage is not empty
    else if (dizzyAuthenticated) {
      setLoading(false);
      setLoggedIn(false);
      setUsername("");
      setPassword("");
      clearSensitiveDatas().then(() => {
        setError("Revalidate your credentials to continue!");
        setErrorTitle("Token mismatch");
      });
    } else {
      clearSensitiveDatas();
      setLoading(false);
      setLoggedIn(false);
      setUsername("");
      setPassword("");
      setError(null);
      setErrorTitle(null);
    }
  }, [isLoggedIn, router]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* If they had an error, show the message */}
        {errors ? (
          <div className="mb-8 transition-opacity duration-300 ease-in-out opacity-0 animate-fade-in md:mt-2 md:mb-6">
            <div
              className="p-4 text-sm text-yellow-800 border border-yellow-200 rounded-lg bg-yellow-50 dark:bg-yellow-800/10 dark:border-yellow-900 dark:text-yellow-500"
              role="alert"
              tabIndex="-1"
              aria-labelledby="hs-with-description-label"
            >
              <div className="flex">
                <div className="shrink-0">
                  <svg
                    className="mt-0 shrink-0 size-4"
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
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                    <path d="M12 9v4"></path>
                    <path d="M12 17h.01"></path>
                  </svg>
                </div>
                <div className="ms-4">
                  <h3
                    id="hs-with-description-label"
                    className="text-sm font-semibold xl:text-lg"
                  >
                    {errorTitle}
                  </h3>
                  <div
                    className={`${
                      errorTitle ? "mt-1" : "mt-0"
                    }  text-xs text-yellow-700 xl:text-sm`}
                  >
                    {errors}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* MAIN FORM */}
        <div className="space-y-6">
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
              className="py-2.5 px-3 block w-full duration-300 transition-all ease-in-out border border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 hover:shadow-md disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-blue-600/60 ripple-pulse"
              placeholder="Your active username"
              autoComplete="off"
              style={mobileStyle}
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

            <div className="relative mb-4">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                className="py-2.5 px-3 block w-full duration-300 transition-all ease-in-out border border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 hover:shadow-md disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-blue-600/60 ripple-pulse"
                placeholder="Your strength password"
                autoComplete="off"
                style={mobileStyle}
              />
              <button
                type="button"
                data-hs-toggle-password='{
                      "target": "#password"
                    }'
                className="absolute inset-y-0 z-20 flex items-center px-3 text-gray-400 transition duration-200 ease-in-out cursor-pointer end-0 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
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
            {/* Disabled by request */}
            {/* <Link
            className="inline-flex items-center gap-x-1.5 text-xs text-gray-600 hover:text-gray-700 decoration-2 hover:underline focus:outline-none focus:underline dark:text-neutral-500 dark:hover:text-neutral-600"
            href={"/forgot-password"}
          >
            I forgot my password
          </Link> */}
          </div>

          {/* The decision of choosing the state action */}
          {!isLoggedIn ? (
            <button
              type="submit"
              disabled={loading}
              className="py-2.5 duration-200 ease-in-out transition px-3 w-full inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg  bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-1 dark:focus:outline-none dark:focus:outline-sky-800 shadow-lg"
            >
              {loading && (
                <div
                  className="animate-spin inline-block size-3 border-[1px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                  role="status"
                  aria-label="loading"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              )}
              <span>{loading ? "Credential checked.." : "Submit"}</span>
            </button>
          ) : (
            <div
              className="w-full bg-white border border-gray-200 shadow-lg rounded-xl dark:bg-neutral-800 dark:border-neutral-700"
              role="alert"
            >
              <div className="flex items-center p-4">
                <div className="inline-flex items-center justify-center w-full">
                  <div
                    className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
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
        </div>
      </form>
      <PrelineScript />
    </>
  );
}

export default LoginForm;
