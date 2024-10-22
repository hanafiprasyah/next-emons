"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import useSWR from "swr";

// TODO: Fetch monitoring data with SWR isolated
function useMonitoring(tenantRef, locationid, start_date) {
  // Function to fetch the data API [REALTIME]
  const fetchDataRealtime = async (url, tenantRef, locationid, start_date) => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `${process.env.BASE_URL}/`,
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers":
          "Content-Type, Accept, Origin, X-Requested-With",
        tenant: tenantRef,
        token: process.env.AUTH_TOKEN,
      },
      body: JSON.stringify({
        tenant: tenantRef,
        locationid: locationid,
        lane: "",
        status: "",
        value: "",
        side: "",
        start_date: start_date ?? "2024-01-01 00:40:20",
        end_date: "",
      }),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("500. An error occured.");
      }

      const data = res.json();
      return data;
    });
  };

  const { data, isLoading, error } = useSWR(
    tenantRef !== "" && tenantRef !== undefined && tenantRef !== null
      ? ["/api/monitoring/getmonitoring", tenantRef, locationid, start_date]
      : null,
    ([url, tenantRef, locationid, start_date]) =>
      fetchDataRealtime(url, tenantRef, locationid, start_date),
    {
      isPaused: () =>
        (tenantRef == "" && tenantRef == undefined) ||
        (locationid === null && locationid === undefined) ||
        (start_date == "" && start_date == undefined)
          ? true
          : false,
      refreshInterval: 1000,
      focusThrottleInterval: 3000,
      errorRetryInterval: 1000,
      errorRetryCount: 10,
      shouldRetryOnError: true,
      keepPreviousData: true,
      loadingTimeout: 6000,
    }
  );

  if (data != undefined) {
    if (data.message === "OK") {
      if (data.monitoring["data"]["datavoltages"].length === 0) {
        return {
          monitoring: null,
          isMonitoringError: error,
          isMonitoringLoading: isLoading,
        };
      } else {
        const currentDate = new Date();
        const sendDate = data.monitoring["data"]["datavoltages"][0].send_date;
        // format the send_date value
        const isoConvSendDate = new Date(sendDate);
        // count the diff
        const diffTime = currentDate - isoConvSendDate;
        // set the minutes value
        const minutes = Math.floor(diffTime / 60000);

        // Set offline status if the diff time more than 5 minutes from NOW()
        if (minutes >= 5) {
          return {
            monitoring: null,
            isMonitoringError: error,
            isMonitoringLoading: isLoading,
          };
        } else {
          return {
            monitoring: data,
            isMonitoringError: error,
            isMonitoringLoading: isLoading,
          };
        }
      }
    } else {
      return {
        monitoring: null,
        isMonitoringError: error,
        isMonitoringLoading: isLoading,
      };
    }
  } else {
    return {
      monitoring: null,
      isMonitoringError: error,
      isMonitoringLoading: isLoading,
    };
  }
}

const Marker = ({
  locationid,
  tenantRef,
  lat,
  lot,
  title,
  markerLabel,
  signal = false,
}) => {
  // marker state
  const [markerRef, marker] = useAdvancedMarkerRef();

  // Dates
  const [currentDate, setCurrentDate] = useState("");
  const [hoursAgo, setHoursAgo] = useState("");

  // popup info state
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const [infoClickable, setInfoClickable] = useState(true);

  // Set monitoring data state
  const [connected, setConnection] = useState(false);

  // set parent name from API
  const [parentName, setParentName] = useState("");

  // show/hide marker based on voltage value
  const [showMarker, setShowMarker] = useState(false);

  // TODO: Get current datetime, this will be mounted at the first time
  useEffect(() => {
    const dateIns = new Date();
    // const isoDate = "2024-09-13T11:30:54";
    // const isoConvDate = new Date(isoDate);

    // Get current date time
    const getFormatedCurrentDate = `${dateIns.getFullYear()}-${(
      dateIns.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${dateIns.getDate().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    })} ${dateIns.getHours()}:${dateIns
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${dateIns.getSeconds().toString().padStart(2, "0")}`;

    // Get -1 hour of current date time
    const getHoursAgo = `${dateIns.getFullYear()}-${(dateIns.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${dateIns.getDate().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    })} ${dateIns.getHours() - 1}:${dateIns
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${dateIns.getSeconds().toString().padStart(2, "0")}`;

    // const diffTime = dateIns - isoConvDate;
    // const minutes = Math.floor((diffTime % 3600000) / 60000);
    if (getFormatedCurrentDate.startsWith("202")) {
      setCurrentDate(getFormatedCurrentDate);
      setHoursAgo(getHoursAgo);
    }
    // if (process.env.NODE_ENV === "development") {
    //   console.log(
    //     "Current date: " +
    //       getFormatedCurrentDate +
    //       "| 1 hours ago: " +
    //       getHoursAgo
    //   );
    // }
  }, []);

  // Custom Pin with SVG
  const parser = new DOMParser();
  const pinCustom = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"> <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.923a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m19.5 0a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3m19.5 0a3 3 0 0 0-3-3H5.25a3 3 0 0 0-3 3m16.5 0h.008v.008h-.008v-.008Zm-3 0h.008v.008h-.008v-.008Z" /></svg>`;
  const pinHtml = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"> <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.923a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m19.5 0a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3m19.5 0a3 3 0 0 0-3-3H5.25a3 3 0 0 0-3 3m16.5 0h.008v.008h-.008v-.008Zm-3 0h.008v.008h-.008v-.008Z" /></svg>`;
  const pinSvg = parser.parseFromString(
    pinHtml,
    "image/svg+xml"
  ).documentElement;

  /**
   * Disconnected: #e84a35 * (DEFAULT)
   */
  const [colorPin, setColorPin] = useState("#e84a35");
  const [voltageColor, setVoltageColor] = useState(
    "bg-neutral-800 dark:bg-neutral-500"
  );
  const [currentColor, setCurrentColor] = useState(
    "bg-neutral-800 dark:bg-neutral-500"
  );
  const [groundColor, setGroundColor] = useState(
    "bg-neutral-800 dark:bg-neutral-500"
  );

  // SWR
  /**
   * We will map this data based on their Index
   * then we will get the tenancy (more than 2 devices) with their own datas
   */
  const { monitoring, isMonitoringError, isMonitoringLoading } = useMonitoring(
    tenantRef,
    locationid,
    hoursAgo
  );

  // console.log(monitoring);

  // Function to fetch the /tool/dataside API
  const fetchSite = async (tenantRef, locationid) => {
    const response = await fetch("/api/tools/getsiteloc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `${process.env.BASE_URL}/`,
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers":
          "Content-Type, Accept, Origin, X-Requested-With",
        tenant: tenantRef,
        token: process.env.AUTH_TOKEN,
      },
      body: JSON.stringify({
        locationid: locationid,
        lane: "",
        status: "",
        value: "",
        side: "",
        start_trancation_date: "",
        end_trancation_date: "",
        tenant: tenantRef,
      }),
    });

    return response.json();
  };

  // clicking the marker will toggle the infowindow
  const handleMarkerClick = useCallback(() => {
    setInfoWindowShown((isShown) => !isShown);
  }, []);

  // if the maps api closes the infowindow, we have to synchronize our state
  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  useEffect(() => {
    if (monitoring) {
      setConnection(true);
      if (signal) {
        setConnection(true);
        fetchSite(tenantRef, locationid).then((data) => {
          const siteData = data.siteloc["data"][0].site;
          if (siteData) {
            setParentName(siteData.name);
          }
        });

        const dataVoltage = monitoring?.monitoring["data"].datavoltages[0];
        const dataGround = monitoring?.monitoring["data"].datagrounds[0];
        const dataCurrent = monitoring?.monitoring["data"].datacurrents[0];

        if (
          dataVoltage != undefined &&
          dataGround != undefined &&
          dataCurrent != undefined
        ) {
          setShowMarker(true);
          setInfoClickable(true);
          setConnection(true);

          // if (process.env.NODE_ENV === "development") {
          //   console.log(dataVoltage);
          //   console.log(dataGround);
          //   console.log(dataCurrent);
          //   console.log("SRW Connection -> OK");
          // }

          /**
           * if
           * voltageData >= 200 &&
           * voltageData <= 240 &&
           * currentData <= 15 &&
           * groundData < 0.5
           * setColorPin("#1bd155"); => GREEN MARKER
           * else
           * setColorPin("#e8e833"); => YELLOW MARKER
           */

          // console.log(dataVoltage.v_rn_output);
          // console.log(dataCurrent.i_r_Output);
          // console.log(dataGround.voltage_output);
          if (
            dataVoltage.v_rn_output >= 200 &&
            dataVoltage.v_rn_output <= 240 &&
            dataCurrent.i_r_Output <= 15 &&
            dataGround.voltage_output < 0.5
          ) {
            setColorPin("#1bd155");
          } else {
            setColorPin("#e8e833");
          }

          if (dataVoltage.v_rn_output >= 100 && dataVoltage.v_rn_output < 180) {
            setVoltageColor("bg-red-800 dark:bg-red-500");
          } else if (
            dataVoltage.v_rn_output >= 180 &&
            dataVoltage.v_rn_output < 200
          ) {
            setVoltageColor("bg-yellow-800 dark:bg-yellow-500");
          } else if (
            dataVoltage.v_rn_output >= 200 &&
            dataVoltage.v_rn_output <= 240
          ) {
            setVoltageColor("bg-emerald-800 dark:bg-emerald-500");
          } else if (
            dataVoltage.v_rn_output > 240 &&
            dataVoltage.v_rn_output <= 260
          ) {
            setVoltageColor("bg-yellow-800 dark:bg-yellow-500");
          } else {
            setVoltageColor("bg-red-800 dark:bg-red-500");
          }

          if (dataCurrent.i_r_Output >= 0 && dataCurrent.i_r_Output <= 15) {
            setCurrentColor("bg-emerald-800 dark:bg-emerald-500");
          } else if (
            dataCurrent.i_r_Output > 15 &&
            dataCurrent.i_r_Output <= 50
          ) {
            setCurrentColor("bg-yellow-800 dark:bg-yellow-500");
          } else {
            setCurrentColor("bg-red-800 dark:bg-red-500");
          }

          if (
            dataGround.voltage_output >= 0 &&
            dataGround.voltage_output <= 0.5
          ) {
            setGroundColor("bg-emerald-800 dark:bg-emerald-500");
          } else if (
            dataGround.voltage_output > 0.5 &&
            dataGround.voltage_output <= 5
          ) {
            setGroundColor("bg-yellow-800 dark:bg-yellow-500");
          } else {
            setGroundColor("bg-red-800 dark:bg-red-500");
          }
        } else if (
          dataVoltage === undefined &&
          dataGround === undefined &&
          dataCurrent === undefined
        ) {
          setShowMarker(false);
          setInfoClickable(false);
          // if (process.env.NODE_ENV === "development") {
          //   console.log(dataVoltage);
          //   console.log(dataGround);
          //   console.log(dataCurrent);
          //   console.log("SRW Connection -> Please wait..");
          // }
        } else {
          setShowMarker(false);
          setInfoClickable(false);
          // if (process.env.NODE_ENV === "development") {
          //   console.log(dataVoltage);
          //   console.log(dataGround);
          //   console.log(dataCurrent);
          //   console.log("SRW Connection -> error");
          // }
        }
      } else {
        setShowMarker(false);
        setInfoClickable(false);
        setConnection(false);
        // if (process.env.NODE_ENV === "development") {
        //   console.log("Data -> error(Connection is not stable / unreachable)");
        // }
      }
    } else if (monitoring === null) {
      setShowMarker(true);
      setInfoClickable(false);
      setConnection(false);
    } else {
      setShowMarker(false);
      setInfoClickable(false);
      setConnection(false);
      // if (process.env.NODE_ENV === "development") {
      //   console.log("Data -> error(Data Undefined)");
      // }
    }
  }, [monitoring, signal, locationid, tenantRef]);

  return (
    <>
      {showMarker ? (
        <>
          <AdvancedMarker
            key={locationid}
            ref={markerRef}
            position={{ lat: lat, lng: lot }}
            onClick={handleMarkerClick}
            clickable={infoClickable}
            title={title}
            draggable={false}
            collisionBehavior="OPTIONAL_AND_HIDES_LOWER_PRIORITY"
          >
            <Pin
              background={colorPin}
              glyphColor={"#000"}
              borderColor={"#000"}
              glyph={pinSvg}
            />
          </AdvancedMarker>
          {infoWindowShown && (
            <InfoWindow
              key={lat}
              anchor={marker}
              ariaLabel={title}
              onClose={handleClose}
            >
              <>
                {/* Card */}
                <div className="flex flex-col pb-2 overflow-auto truncate bg-transparent border-none pe-4 xl:pe-2 ps-2 rounded-xl">
                  {/* Header */}
                  <div className="relative flex items-center pb-2 md:p-4 gap-x-3">
                    {/* Logo */}
                    <div className="shrink-0">
                      <div
                        className={`border border-sky-200 shrink-0 rounded-xl ${
                          connected
                            ? "dark:border-sky-400"
                            : "dark:border-red-400"
                        }`}
                      >
                        <div className="flex items-center justify-center size-8 md:size-10 lg:size-12">
                          {connected ? (
                            <svg
                              className="text-sky-500 shrink-0 size-4 md:size-6 lg:size-8 dark:text-sky-700"
                              width={32}
                              height={32}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.923a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m19.5 0a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3m19.5 0a3 3 0 0 0-3-3H5.25a3 3 0 0 0-3 3m16.5 0h.008v.008h-.008v-.008Zm-3 0h.008v.008h-.008v-.008Z"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="text-sky-500 shrink-0 size-8 dark:text-red-500"
                              width={32}
                              height={32}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* End Logo */}
                    {/* Title */}
                    <div className="mt-1 truncate grow">
                      <div className="pe-5">
                        <span className="block text-xs text-sky-800 md:text-sm 2xl:text-2xl lg:text-lg xl:text-xl">
                          {markerLabel}
                        </span>
                      </div>
                      <div className="block shrink-0">
                        <h4
                          className={`text-xs font-medium truncate ${
                            connected ? "text-sky-800" : "text-neutral-500"
                          }`}
                        >
                          {parentName != null ||
                          parentName != undefined ||
                          parentName != ""
                            ? connected
                              ? parentName
                              : "Connection interrupted"
                            : "Loading data.."}
                        </h4>
                      </div>
                    </div>
                    {/* End Title */}
                  </div>
                  {/* End Header */}
                  {/* List */}
                  <div className="grid items-center justify-center grid-cols-1 py-3 text-center align-middle border-gray-200 divide-x-reverse divide-gray-200 gap-y-4 md:gap-y-0 md:divide-x md:grid-cols-3 border-y dark:border-sky-700 dark:divide-sky-700">
                    <>
                      {/* Voltage */}
                      <div className="flex flex-col items-center justify-center px-4 text-center align-middle">
                        <span className="flex items-center px-2 py-1 pt-2 text-lg font-bold bg-transparent rounded-full text-neutral-800 xl:text-xl 2xl:text-2xl gap-x-1">
                          <span className="me-2 relative inline-flex size-1.5 md:size-2 lg:size-2.5 xl:size-3 2xl:size-4">
                            <span
                              className={`absolute inline-flex size-1.5 md:size-2 lg:size-2.5 xl:size-3 2xl:size-4 rounded-full opacity-75 animate-ping ${voltageColor}`}
                            />
                            <span
                              className={`relative inline-flex size-1.5 md:size-2 lg:size-2.5 xl:size-3 2xl:size-4 rounded-full ${voltageColor}`}
                            />
                          </span>
                          {monitoring?.monitoring["data"].datavoltages[0]
                            .v_rn_output ?? "-"}
                          <svg
                            className="shrink-0 size-3"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.75 13.5L14.25 2.25L12 10.5H20.25L9.75 21.75L12 13.5H3.75Z"
                              stroke="black"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span className="text-center">
                          <p className="text-xs xl:text-xl text-neutral-800">
                            Voltage
                          </p>
                        </span>
                      </div>
                      {/* End Voltage */}
                      {/* Current */}
                      <div className="flex flex-col items-center justify-center px-4 text-center align-middle">
                        <span className="flex items-center px-2 py-1 pt-2 text-lg font-bold bg-transparent rounded-full text-neutral-800 xl:text-xl 2xl:text-2xl gap-x-1">
                          <span className="me-2 relative inline-flex size-1.5 md:size-2 lg:size-2.5 xl:size-3 2xl:size-4">
                            <span
                              className={`absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping ${currentColor}`}
                            />
                            <span
                              className={`relative inline-flex size-1.5 md:size-2 lg:size-2.5 xl:size-3 2xl:size-4 rounded-full ${currentColor}`}
                            />
                          </span>
                          {monitoring?.monitoring["data"].datacurrents[0]
                            .i_r_Output ?? "-"}
                          <svg
                            className=" shrink-0 size-3"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="9.01235"
                              stroke="black"
                              strokeWidth="1.5"
                            />
                            <circle
                              cx="12"
                              cy="12"
                              r="9.01235"
                              stroke="black"
                              strokeOpacity="0.2"
                              strokeWidth="1.5"
                            />
                            <path
                              d="M0 12L3.44368 12"
                              stroke="black"
                              strokeWidth="1.5"
                            />
                            <path
                              d="M20.5563 12H24"
                              stroke="black"
                              strokeWidth="1.5"
                            />
                            <path
                              d="M5.16534 12.3873C11.1481 3.0961 13.2923 20.1278 18.8346 12.3873"
                              stroke="black"
                              strokeWidth="1.5"
                            />
                          </svg>
                        </span>
                        <span className="text-center">
                          <p className="text-xs xl:text-xl text-neutral-800">
                            Current/Ampere
                          </p>
                        </span>
                      </div>
                      {/* End Current */}
                      {/* Ground */}
                      <div className="flex flex-col items-center justify-center px-4 text-center align-middle">
                        <span className="flex items-center px-2 py-1 pt-2 text-lg font-bold bg-transparent rounded-full text-neutral-800 xl:text-xl 2xl:text-2xl gap-x-1">
                          <span className="me-2 relative inline-flex size-1.5 md:size-2 lg:size-2.5 xl:size-3 2xl:size-4">
                            <span
                              className={`absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping ${groundColor}`}
                            />
                            <span
                              className={`relative inline-flex size-1.5 md:size-2 lg:size-2.5 xl:size-3 2xl:size-4 rounded-full ${groundColor}`}
                            />
                          </span>
                          {monitoring?.monitoring["data"].datagrounds[0]
                            .voltage_output ?? "-"}
                          <svg
                            className=" shrink-0 size-3"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.49376 15.5327H21.5062"
                              stroke="black"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M12 1.39389L12 13.1749"
                              stroke="black"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M3.495 17.8905H20.505"
                              stroke="black"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M4.495 20.2483H19.505"
                              stroke="black"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M5.495 22.6061H18.505"
                              stroke="black"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        <span className="text-center">
                          <p className="text-xs xl:text-xl text-neutral-800">
                            Ground
                          </p>
                        </span>
                      </div>
                      {/* End Ground */}
                    </>
                  </div>
                  {/* End List */}
                  {/* Grid */}
                  <div className="flex flex-col p-4 gap-y-4">
                    {/* Item */}
                    <div className="flex items-center gap-x-2">
                      <p className="text-xs text-gray-500 md:text-sm min-w-20 dark:text-neutral-800">
                        Last updated
                      </p>
                      <div className="grow">
                        <p
                          className={`text-xs md:text-sm font-medium ${
                            connected ? "text-sky-700" : "text-neutral-500"
                          }`}
                        >
                          {connected ? "Just now" : "Offline"}
                        </p>
                      </div>
                    </div>
                    {/* End Item */}
                    {/* Item */}
                    <div className="flex items-center gap-x-2">
                      <p className="text-xs text-gray-500 md:text-sm min-w-20 dark:text-neutral-800">
                        Device Status
                      </p>
                      <div className="grow">
                        <span className="py-px px-2 inline-flex items-center gap-x-1 md:gap-x-1.5 bg-gray-100 text-xs lg:text-sm text-gray-800 rounded-md dark:bg-neutral-700 dark:text-neutral-200">
                          <span
                            className={`inline-block w-1 h-3 ${
                              connected ? "bg-emerald-600" : "bg-red-600"
                            } rounded-full`}
                          />
                          {connected ? "Online" : "Unreachable"}
                        </span>
                      </div>
                    </div>
                    {/* End Item */}
                  </div>
                  {/* End Grid */}
                  {/* Footer */}
                  <div className="flex items-center justify-center px-4 py-3 mt-auto border-t border-gray-200 md:justify-evenly dark:border-sky-700">
                    {/* Tenant */}
                    <span
                      className={`flex justify-center items-center gap-x-1 text-sm sm:text-[13px] text-gray-500 ${
                        connected ? "dark:text-sky-800" : "dark:text-red-800"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="shrink-0 size-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                        />
                      </svg>
                      {connected ? (
                        <small>Linked to {tenantRef}</small>
                      ) : (
                        <small>Not linked to {tenantRef}</small>
                      )}
                    </span>
                    {/* End Tenant */}
                    {/* Progress */}
                    <div className="items-center hidden w-1/2 md:flex ms-auto gap-x-1 whitespace-nowrap">
                      <div
                        className="flex w-full h-1 overflow-hidden bg-gray-200 rounded-full dark:bg-neutral-700"
                        role="progressbar"
                        aria-valuenow={connected ? 100 : 0}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className={`flex flex-col justify-center rounded-full overflow-hidden ${
                            connected ? "bg-green-500" : "bg-red-500"
                          } text-sm sm:text-[13px] text-white text-center whitespace-nowrap transition duration-500`}
                          style={{ width: connected ? "100%" : "0%" }}
                        />
                      </div>
                      <div className="w-10 text-end -mt-0.5">
                        <span className="text-sm sm:text-[13px] text-gray-500 dark:text-neutral-500">
                          {connected ? "100%" : "0%"}
                        </span>
                      </div>
                    </div>
                    {/* End Progress */}
                  </div>
                  {/* End Footer */}
                </div>
                {/* End Card */}
              </>
            </InfoWindow>
          )}
        </>
      ) : null}
    </>
  );
};

export default Marker;
