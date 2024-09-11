"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import useSWR from "swr";

function useVoltage(tenantRef, locationid) {
  // Function to fetch the /device/getlastdatavoltage API [REALTIME]
  const fetchVoltageRealtime = async (url, tenantRef, locationid) => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://45.13.132.175/",
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
        start_date: "",
        end_date: "",
      }),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("500. An error occured.");
      }

      // if (process.env.NODE_ENV === "development") {
      //   console.log(
      //     "Response from fetchVoltageRealtime on Voltage Sub Component: " +
      //       res.statusText
      //   );
      // }

      const data = res.json();
      return data;
    });
  };

  const { data, error } = useSWR(
    tenantRef !== "" && tenantRef !== undefined
      ? ["/api/monitoring/voltage/getdata", tenantRef, locationid]
      : null,
    ([url, tenantRef, locationid]) =>
      fetchVoltageRealtime(url, tenantRef, locationid),
    {
      refreshInterval: 1000,
    }
  );

  return {
    voltage: data,
    isVoltageError: error,
  };
}

function useGround(tenantRef, locationid) {
  // Function to fetch the /device/getlastdataground API [REALTIME]
  const fetchGroundRealtime = async (url, tenantRef, locationid) => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://45.13.132.175/",
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
        start_date: "",
        end_date: "",
      }),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("500. An error occured.");
      }

      // if (process.env.NODE_ENV === "development") {
      //   console.log(
      //     "Response from fetchGroundRealtime on Ground Sub Component: " +
      //       res.statusText
      //   );
      // }

      const data = res.json();
      return data;
    });
  };

  const { data, error } = useSWR(
    tenantRef !== "" && tenantRef !== undefined
      ? ["/api/monitoring/ground/getdata", tenantRef, locationid]
      : null,
    ([url, tenantRef, locationid]) =>
      fetchGroundRealtime(url, tenantRef, locationid),
    {
      refreshInterval: 1000,
    }
  );

  return {
    ground: data,
    isGroundError: error,
  };
}

function useCurrent(tenantRef, locationid) {
  // Function to fetch the /device/getlastdatacurrent API [REALTIME]
  const fetchCurrentRealtime = async (url, tenantRef, locationid) => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://45.13.132.175/",
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
        start_date: "",
        end_date: "",
      }),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("500. An error occured.");
      }

      // if (process.env.NODE_ENV === "development") {
      //   console.log(
      //     "Response from fetchCurrentRealtime on Current Sub Component: " +
      //       res.statusText
      //   );
      // }

      const data = res.json();
      return data;
    });
  };

  const { data, error } = useSWR(
    tenantRef !== "" && tenantRef !== undefined
      ? ["/api/monitoring/current/getdata", tenantRef, locationid]
      : null,
    ([url, tenantRef, locationid]) =>
      fetchCurrentRealtime(url, tenantRef, locationid),
    {
      refreshInterval: 1000,
    }
  );

  return {
    current: data,
    isCurrentError: error,
  };
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

  // popup info state
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const [infoClickable, setInfoClickable] = useState(true);

  // show/hide marker based on voltage value
  const [showMarker, setShowMarker] = useState(false);

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
  const { voltage, isVoltageError } = useVoltage(tenantRef, locationid);

  const { ground, isGroundError } = useGround(tenantRef, locationid);

  const { current, isCurrentError } = useCurrent(tenantRef, locationid);

  // clicking the marker will toggle the infowindow
  const handleMarkerClick = useCallback(
    () => setInfoWindowShown((isShown) => !isShown),
    []
  );

  // if the maps api closes the infowindow, we have to synchronize our state
  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  useEffect(() => {
    if (voltage && ground && current) {
      if (signal) {
        const dataVoltage = voltage.voltage["data"][0];
        const dataGround = ground.ground["data"][0];
        const dataCurrent = current.current["data"][0];

        if (
          dataVoltage != undefined &&
          dataGround != undefined &&
          dataCurrent != undefined
        ) {
          setShowMarker(true);
          setInfoClickable(true);
          if (process.env.NODE_ENV === "development") {
            // console.log(dataVoltage);
            // console.log(dataGround);
            // console.log(dataCurrent);
            console.log("SRW Connection -> OK");
          }
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
          if (process.env.NODE_ENV === "development") {
            // console.log(dataVoltage);
            // console.log(dataGround);
            // console.log(dataCurrent);
            console.log("SRW Connection -> Please wait..");
          }
        } else {
          setShowMarker(false);
          setInfoClickable(false);
          if (process.env.NODE_ENV === "development") {
            // console.log(dataVoltage);
            // console.log(dataGround);
            // console.log(dataCurrent);
            console.log("SRW Connection -> error");
          }
        }
      } else {
        setShowMarker(false);
        setInfoClickable(false);
        if (process.env.NODE_ENV === "development") {
          console.log("Data -> error(Connection is not stable / unreachable)");
        }
      }
    } else {
      setShowMarker(false);
      setInfoClickable(false);
      if (process.env.NODE_ENV === "development") {
        console.log("Data -> error(Data Undefined)");
      }
    }
  }, [voltage, ground, current, signal]);

  return (
    <>
      {showMarker ? (
        <>
          <AdvancedMarker
            ref={markerRef}
            position={{ lat: lat, lng: lot }}
            onClick={infoClickable ? handleMarkerClick : null}
            title={title}
            draggable={false}
          >
            <Pin
              background={colorPin}
              glyphColor={"#000"}
              borderColor={"#000"}
            />
          </AdvancedMarker>
          {infoWindowShown && (
            <InfoWindow anchor={marker} onClose={handleClose}>
              <h2 className="mb-2 text-sm font-bold text-sky-700 md:text-lg lg:text-xl 2xl:text-3xl">
                {markerLabel}
              </h2>
              <>
                <p className="text-sm font-normal text-gray-800 md:text-lg lg:text-xl 2xl:text-3xl">
                  <span className="inline-flex items-center px-3 py-1 my-0 text-xs font-medium text-blue-800 bg-blue-100 rounded-full 2xl:px-6 gap-x-3 md:text-sm lg:text-lg xl:text-xl 2xl:text-3xl dark:bg-blue-800/0 dark:text-blue-500">
                    <span
                      className={`size-1.5 md:size-2 lg:size-2.5 xl:size-3 2xl:size-4 inline-block rounded-full ${voltageColor}`}
                    ></span>
                    Voltage:{" "}
                    <strong className="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
                      {/* {voltageData} */}
                      {voltage.voltage["data"][0].v_rn_output}
                    </strong>
                  </span>
                </p>
                <p className="text-sm font-normal text-gray-800 md:text-lg lg:text-xl 2xl:text-3xl">
                  <span className="inline-flex items-center px-3 py-1 my-0 text-xs font-medium text-blue-800 bg-blue-100 rounded-full 2xl:px-6 gap-x-3 md:text-sm lg:text-lg xl:text-xl 2xl:text-3xl dark:bg-blue-800/0 dark:text-blue-500">
                    <span
                      className={`size-1.5 md:size-2 lg:size-2.5 xl:size-3 2xl:size-4 inline-block rounded-full ${currentColor}`}
                    ></span>
                    Current:{" "}
                    <strong className="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
                      {/* {currentData} */}
                      {current.current["data"][0].i_r_Output}
                    </strong>
                  </span>
                </p>
                <p className="text-sm font-normal text-gray-800 md:text-lg lg:text-xl 2xl:text-3xl">
                  <span className="inline-flex items-center px-3 py-1 my-0 text-xs font-medium text-blue-800 bg-blue-100 rounded-full 2xl:px-6 gap-x-3 md:text-sm lg:text-lg xl:text-xl 2xl:text-3xl dark:bg-blue-800/0 dark:text-blue-500">
                    <span
                      className={`size-1.5 md:size-2 lg:size-2.5 xl:size-3 2xl:size-4 inline-block rounded-full ${groundColor}`}
                    ></span>
                    Ground:{" "}
                    <strong className="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
                      {/* {groundData} */}
                      {ground.ground["data"][0].voltage_output}
                    </strong>
                  </span>
                </p>
              </>
            </InfoWindow>
          )}
        </>
      ) : null}
    </>
  );
};

export default Marker;
