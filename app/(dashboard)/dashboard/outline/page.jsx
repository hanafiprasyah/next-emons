"use client";

import React, { useState, useEffect } from "react";
import PrelineScript from "@/components/PrelineScript";
import {
  Current,
  Ground,
  PowerFactor,
  THDv,
  THDi,
} from "../../../../public/icons";
import Link from "next/link";
import Image from "next/image";
import useSWR, { mutate } from "swr";
import ErrorImage from "../../../../public/images/error500.svg";
import { useOnlineStatus } from "../../../lib/hook/connection-hook";
import dynamic from "next/dynamic";

const DynamicAlert = dynamic(
  () => import("@/components/alerts/SlowConnectionAlert"),
  { ssr: false }
);

const RealTimeVoltageInputSplineChart = dynamic(
  () => import("@/components/charts/line/VoltageInputChart"),
  {
    ssr: false,
  }
);

const RealTimeVoltageOutputSplineChart = dynamic(
  () => import("@/components/charts/line/VoltageOutputChart"),
  {
    ssr: false,
  }
);

export default function DashboardOutline() {
  /**
   * STATE COLLECTION
   */
  // local Value
  const [localTenant, setLocalTenant] = useState("");

  // Connection state
  const isOnline = useOnlineStatus();
  const [responseTime, setResponseTime] = useState(null);
  const [isConnectionUnstable, setIsConnectionUnstable] = useState(false);

  // Dates
  const [hoursAgo, setHoursAgo] = useState("");
  const [lastTimeUpdate, setLastTimeUpdate] = useState("");

  // Init the device connection status and signal recipient status
  const [signal, setSignal] = useState(false);

  // Handle slow loading on SWR
  const [isSlowLoad, setSlowLoad] = useState(false);

  // State to store selected location
  const [selectedLocation, setSelectedLocation] = useState({
    code: null,
    name: null,
  });

  // State to store selected device
  const [selectedDevice, setSelectDevice] = useState({
    code: null,
    name: null,
  });

  // State to store list location
  const [locationList, setLocationList] = useState([]);
  // State to store list device
  const [deviceList, setDeviceList] = useState([]);

  // Temporary memory to handle null/undefined value from Rest API
  const defaultVoltageValues = {
    v_rs_input: 220,
    v_st_input: 220,
    v_rt_input: 220,
    v_rn_input: 220,
    v_sn_input: 220,
    v_tn_input: 220,
    v_rs_output: 220,
    v_st_output: 220,
    v_rt_output: 220,
    v_rn_output: 220,
    v_sn_output: 220,
    v_tn_output: 220,
  };

  const defaultCurrentValues = {
    i_r_Input: 0,
    i_r_Output: 0,
    i_s_Input: 0,
    i_s_Output: 0,
    i_t_Input: 0,
    i_t_Output: 0,
  };

  const defaultGroundValues = {
    voltage_input: 0,
    voltage_output: 0,
  };

  const defaultFrequencyValue = {
    frequency_input: 50,
    frequency_output: 50,
  };

  const defaultEnergyValues = {
    kwh_r_input: 1,
    kwh_s_input: 1,
    kwh_t_input: 1,
    kwh_total_input: 1,
    kwh_r_output: 1,
    kwh_s_output: 1,
    kwh_t_output: 1,
    kwh_total_output: 1,
    kvarh_r_input: 1,
    kvarh_s_input: 1,
    kvarh_t_input: 1,
    kvarh_total_input: 1,
    kvarh_r_output: 1,
    kvarh_s_output: 1,
    kvarh_t_output: 1,
    kvarh_total_output: 1,
  };

  const defaultPFValues = {
    cosphi_input: 1,
    cosphi_output: 1,
  };

  const defaultThdvValues = {
    thdv_rs_Input: 0,
    thdv_rs_Input: 0,
    thdv_rt_Input: 0,
    thdv_rn_Input: 0,
    thdv_sn_Input: 0,
    thdv_tn_Input: 0,
    thdv_rs_output: 0,
    thdv_st_output: 0,
    thdv_rt_output: 0,
    thdv_rn_output: 0,
    thdv_sn_output: 0,
    thdv_tn_output: 0,
  };

  const defaultThdiValues = {
    thdi_r_Input: 0,
    thdi_s_Input: 0,
    thdi_t_Input: 0,
    thdi_r_output: 0,
    thdi_s_output: 0,
    thdi_t_output: 0,
  };

  const [lastDataGround, setLastDataGround] = useState(defaultGroundValues);
  const [lastDataCurrent, setLastDataCurrent] = useState(defaultCurrentValues);
  const [lastDataVoltage, setLastDataVoltage] = useState(defaultVoltageValues);
  const [lastDataFrequency, setLastDataFrequency] = useState(
    defaultFrequencyValue
  );
  const [lastDataEnergy, setLastDataEnergy] = useState(defaultEnergyValues);
  const [lastDataPF, setLastDataPF] = useState(defaultPFValues);
  const [lastDataThdv, setLastDataThdv] = useState(defaultThdvValues);
  const [lastDataThdi, setLastDataThdi] = useState(defaultThdiValues);

  // Used to set date time
  const [dateState, setDateState] = useState(new Date());
  /**
   * END OF STATE COLLECTION
   */

  // Scripts
  const handleSelectLocation = (code, name, e) => {
    e.preventDefault();
    setSignal(false);
    setSelectedLocation({ code: code, name: name });
    setSelectDevice({ code: null, name: null });
  };

  const handleSelectDevice = (code, name, e) => {
    e.preventDefault();
    setSignal(false);
    setSelectDevice({ code: code, name: name });
  };

  const handleDisableClick = (e) => {
    e.preventDefault();
  };

  // End of Scripts

  // TODO: Function to fetch the site API [REALTIME]
  const fetchSiteRealtime = async (url, tenant, start_date, end_date) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": `${process.env.BASE_URL}/`,
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers":
            "Content-Type, Accept, Origin, X-Requested-With",
          tenant: tenant,
          token: process.env.AUTH_TOKEN,
        },
        body: JSON.stringify({
          locationid: 0,
          lane: "",
          status: "",
          value: "",
          side: "",
          start_date: start_date,
          end_date: end_date,
          tenant: tenant,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `HTTP error on fetchSiteRealtime! Status: ${response.statusText}`
        );
      }

      const data = await response.json();

      if (data.message === "OK") {
        return data.site;
      }
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.log("Error in fetchSiteRealtime: ", err);
      }
      throw err;
    }
  };

  // TODO: Function to fetch the device API [REALTIME]
  const fetchDeviceRealtime = async (
    url,
    tenant,
    side,
    start_date,
    end_date
  ) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": `${process.env.BASE_URL}/`,
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers":
            "Content-Type, Accept, Origin, X-Requested-With",
          tenant: tenant,
          token: process.env.AUTH_TOKEN,
        },
        body: JSON.stringify({
          locationid: 0,
          lane: "",
          status: "",
          value: "",
          side: side,
          start_date: start_date,
          end_date: end_date,
          tenant: tenant,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `HTTP error on fetchDeviceRealtime! Status: ${response.statusText}`
        );
      }

      const data = await response.json();

      if (data.message === "OK") {
        return data.loc;
      }
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.log("Error in fetchDeviceRealtime: ", err);
      }
      throw err;
    }
  };

  // TODO: Function to fetch the data API [REALTIME]
  const fetchDataRealtime = async (
    url,
    localTenant,
    locationid,
    start_date
  ) => {
    // main point to track unstable network
    const startTime = performance.now();

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": `${process.env.BASE_URL}/`,
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers":
            "Content-Type, Accept, Origin, X-Requested-With",
          tenant: localTenant,
          token: process.env.AUTH_TOKEN,
        },
        body: JSON.stringify({
          tenant: localTenant,
          locationid: locationid,
          lane: "",
          status: "",
          value: "",
          side: "",
          start_date: start_date,
          end_date: "",
        }),
      });

      if (!response.ok) {
        throw new Error(
          `HTTP error on fetchDataRealtime! Status: ${response.statusText}`
        );
      }

      const data = await response.json();

      if (data.message === "OK") {
        setSignal(true);

        // Check if device list is not null
        if (selectedDevice.code && selectedDevice.name) {
          setSignal(true);
          // Check if all data length is null
          if (
            data?.monitoring["data"]["datavoltages"][0] === undefined ||
            data?.monitoring["data"]["datacurrents"][0] === undefined ||
            data?.monitoring["data"]["datagrounds"][0] === undefined ||
            data?.monitoring["data"]["datafrequencys"][0] === undefined ||
            data?.monitoring["data"]["dataenergys"][0] === undefined ||
            data?.monitoring["data"]["dataPowerFactors"][0] === undefined ||
            data?.monitoring["data"]["dataThdvs"][0] === undefined ||
            data?.monitoring["data"]["datathdis"][0] === undefined
          ) {
            // Give signal to offline, and set channel to unreachable
            setSignal(false);
          } else {
            // We will check the difference about last send_date from API and current date from NOW()
            setSignal(true);

            const currentDate = new Date();
            const sendDate =
              data?.monitoring["data"]["datavoltages"][0].send_date ||
              data?.monitoring["data"]["datacurrents"][0].send_date ||
              data?.monitoring["data"]["datagrounds"][0].send_date ||
              data?.monitoring["data"]["datafrequencys"][0].send_date ||
              data?.monitoring["data"]["dataenergys"][0].send_date ||
              data?.monitoring["data"]["dataPowerFactors"][0].send_date ||
              data?.monitoring["data"]["dataThdvs"][0].send_date ||
              data?.monitoring["data"]["datathdis"][0].send_date;
            // format the send_date value
            const isoConvSendDate = new Date(sendDate);
            // count the diff
            const diffTime = currentDate - isoConvSendDate;
            // set the minutes value
            const minutes = Math.floor(diffTime / 60000);
            // Format the date to Indonesian format
            const options = {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: false, // 24-hour format
              locale: "id-ID",
            };
            // Format date using Intl Format
            const formattedDateTime = new Intl.DateTimeFormat(
              "en-EN",
              options
            ).format(isoConvSendDate);
            // then set to state
            setLastTimeUpdate(formattedDateTime);

            // Set offline status if the diff time more than 5 minutes from NOW()
            if (minutes >= process.env.NEXT_PUBLIC_MAX_LAST_TRIGGER_MINUTE) {
              setSignal(false);
            } else {
              setSignal(true);
            }

            // checkpoint to check network performance
            const endTime = performance.now();
            setResponseTime(endTime - startTime);

            return data;
          }
        } // if device list is null?
        else {
          setResponseTime(null);
          setSignal(false);
        }
      }
      // If response message is not OK
      else {
        setSignal(false);
        setResponseTime(null);
        if (process.env.NODE_ENV === "development") {
          console.log("Error in fetchDataRealtime: Response Message is Not OK");
        }
      }
    } catch (err) {
      setSignal(false);
      setResponseTime(null);
      if (process.env.NODE_ENV === "development") {
        console.log("Error in fetchDataRealtime: ", err);
      }
      throw err;
    }
  };

  // TODO: Clear SWR Cache
  const clearSWRCache = () =>
    mutate(() => true, undefined, {
      revalidate: false,
      rollbackOnError: true,
    });

  // TODO: to get site realtime
  const { data: locationsData, error: locationsError } = useSWR(
    (isOnline || !isConnectionUnstable) && localTenant
      ? [
          "/api/tools/site/getsite",
          localTenant,
          "2023-01-01 00:00:00",
          "2024-12-30 00:00:00",
        ]
      : null,
    ([url, tenant, start_date, end_date]) =>
      fetchSiteRealtime(url, tenant, start_date, end_date),
    {
      isPaused: () => !isOnline && !localTenant,
      isOnline: () => isOnline,
      refreshInterval: 60000,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      revalidateOnFocus: false,
      loadingTimeout: 10000,
      onLoadingSlow: () => {
        setSlowLoad(true);
      },
      onSuccess: () => {
        setSlowLoad(false);
      },
      onError: (err) => {
        setSlowLoad(false);
        clearSWRCache();
      },
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // TODO: Never retry on 404
        if (error.status === 404) return;
        // TODO: Disable retry for spesific key
        if (
          JSON.stringify(key) ===
          JSON.stringify([
            "/api/tools/site/getsite",
            localTenant,
            "2023-01-01 00:00:00",
            "2024-12-30 00:00:00",
          ])
        )
          return;
        // TODO: Only 10 times retry
        if (retryCount > 10) return;
        // TODO: Retry interval
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    }
  );

  // TODO: to get device realtime
  const { data: devicesData, error: devicesError } = useSWR(
    (isOnline || !isConnectionUnstable) && localTenant && selectedLocation.code
      ? [
          "/api/tools/location/getlocation",
          localTenant,
          JSON.stringify(selectedLocation.code),
          "2023-01-01 00:00:00",
          "2024-12-30 00:00:00",
        ]
      : null,
    ([url, tenant, side, start_date, end_date]) =>
      fetchDeviceRealtime(url, tenant, side, start_date, end_date),
    {
      isPaused: () =>
        !isOnline && (!localTenant || !selectedLocation.code) ? true : false,
      isOnline: () => isOnline,
      refreshInterval: 60000,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      revalidateOnFocus: false,
      loadingTimeout: 10000,
      onLoadingSlow: () => {
        setSlowLoad(true);
      },
      onSuccess: () => {
        setSlowLoad(false);
      },
      onError: (err) => {
        setSlowLoad(false);
        clearSWRCache();
      },
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // TODO: Never retry on 404
        if (error.status === 404) return;
        // TODO: Disable retry for spesific key
        if (
          JSON.stringify(key) ===
          JSON.stringify([
            "/api/tools/location/getlocation",
            localTenant,
            JSON.stringify(selectedLocation.code),
            "2023-01-01 00:00:00",
            "2024-12-30 00:00:00",
          ])
        )
          return;
        // TODO: Only 10 times retry
        if (retryCount > 10) return;
        // TODO: Retry interval
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    }
  );

  // TODO: SWR to get monitoring data
  const { data, isLoading, error } = useSWR(
    (isOnline || !isConnectionUnstable) && selectedDevice.code
      ? [
          "/api/monitoring/getmonitoring",
          localTenant,
          selectedDevice.code,
          hoursAgo,
        ]
      : null,
    ([url, localTenant, locationid, start_date]) =>
      fetchDataRealtime(url, localTenant, locationid, start_date),
    {
      isPaused: () =>
        !isOnline &&
        (selectedLocation.code === null ||
          selectedDevice.code === null ||
          !localTenant ||
          !hoursAgo)
          ? true
          : false,
      isOnline: () => isOnline,
      refreshInterval: 3000,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      revalidateOnFocus: false,
      loadingTimeout: 10000,
      onLoadingSlow: () => {
        setSlowLoad(true);
      },
      onSuccess: () => {
        setSlowLoad(false);
      },
      onError: (err) => {
        setSlowLoad(false);
        clearSWRCache();
      },
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // TODO: Never retry on 404
        if (error.status === 404) return;
        // TODO: Disable retry for spesific key
        if (
          JSON.stringify(key) ===
          JSON.stringify([
            "/api/monitoring/getmonitoring",
            localTenant,
            selectedDevice.code,
            hoursAgo,
          ])
        )
          return;
        // TODO: Only 10 times retry
        if (retryCount > 10) return;
        // TODO: Retry interval
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    }
  );

  // TODO: Get local tenant item
  useEffect(() => {
    const currentUser = localStorage.getItem("tenant");

    // If tenant local storage is undefined or null
    if (!currentUser) {
      // set local tenant state to null
      setLocalTenant("");
      return;
    }

    // save local tenant value to state
    setLocalTenant(currentUser.toString());

    return () => {
      setLocalTenant("");
    };
  }, []);

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

  // TODO: Set defaults site when data is available
  useEffect(() => {
    if (locationsData?.data.length) {
      setSelectedLocation({
        code: locationsData.data[0].code,
        name: locationsData.data[0].name,
      });

      setLocationList(locationsData.data);
    }

    // Cleanup function to reset state on unmount
    return () => {
      setSelectedLocation({ code: null, name: null });
      setLocationList([]);
    };
  }, [locationsData]);

  // TODO: Set defaults device location when data is available
  useEffect(() => {
    if (devicesData?.data.length) {
      setSelectDevice({
        code: devicesData.data[0].code,
        name: devicesData.data[0].name,
      });

      setDeviceList(devicesData.data);
    }

    // Cleanup function to reset state on unmount
    return () => {
      setSelectDevice({ code: null, name: null });
      setDeviceList([]);
    };
  }, [devicesData]);

  // TODO: Update each monitoring in lastData state if data is valid
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("Effect triggered with data:", data);
    }

    if (data) {
      // Voltage set
      setLastDataVoltage((prev) => {
        const newData = {
          v_rs_input:
            data.monitoring["data"]["datavoltages"][0].v_rs_input != null
              ? data.monitoring["data"]["datavoltages"][0].v_rs_input
              : prev.v_rs_input,
          v_st_input:
            data.monitoring["data"]["datavoltages"][0].v_st_input != null
              ? data.monitoring["data"]["datavoltages"][0].v_st_input
              : prev.v_st_input,
          v_rt_input:
            data.monitoring["data"]["datavoltages"][0].v_rt_input != null
              ? data.monitoring["data"]["datavoltages"][0].v_rt_input
              : prev.v_rt_input,
          v_rn_input:
            data.monitoring["data"]["datavoltages"][0].v_rn_input != null
              ? data.monitoring["data"]["datavoltages"][0].v_rn_input
              : prev.v_rn_input,
          v_sn_input:
            data.monitoring["data"]["datavoltages"][0].v_sn_input != null
              ? data.monitoring["data"]["datavoltages"][0].v_sn_input
              : prev.v_sn_input,
          v_tn_input:
            data.monitoring["data"]["datavoltages"][0].v_tn_input != null
              ? data.monitoring["data"]["datavoltages"][0].v_tn_input
              : prev.v_tn_input,
          v_rs_output:
            data.monitoring["data"]["datavoltages"][0].v_rs_output != null
              ? data.monitoring["data"]["datavoltages"][0].v_rs_output
              : prev.v_rs_output,
          v_st_output:
            data.monitoring["data"]["datavoltages"][0].v_st_output != null
              ? data.monitoring["data"]["datavoltages"][0].v_st_output
              : prev.v_st_output,
          v_rt_output:
            data.monitoring["data"]["datavoltages"][0].v_rt_output != null
              ? data.monitoring["data"]["datavoltages"][0].v_rt_output
              : prev.v_rt_output,
          v_rn_output:
            data.monitoring["data"]["datavoltages"][0].v_rn_output != null
              ? data.monitoring["data"]["datavoltages"][0].v_rn_output
              : prev.v_rn_output,
          v_sn_output:
            data.monitoring["data"]["datavoltages"][0].v_sn_output != null
              ? data.monitoring["data"]["datavoltages"][0].v_sn_output
              : prev.v_sn_output,
          v_tn_output:
            data.monitoring["data"]["datavoltages"][0].v_tn_output != null
              ? data.monitoring["data"]["datavoltages"][0].v_tn_output
              : prev.v_tn_output,
        };

        // Log previous and new data for comparison
        if (process.env.NODE_ENV === "development") {
          console.log("Previous voltage State:", prev);
          console.log("New voltage Data:", newData);
        }

        // Ensure we are not setting the state to the same value
        if (JSON.stringify(prev) !== JSON.stringify(newData)) {
          return newData;
        }

        // Return previous state if nothing has changed
        return prev;
      });

      // Current set
      setLastDataCurrent((prev) => {
        const newData = {
          i_r_Input:
            data.monitoring["data"]["datacurrents"][0].i_r_Input != null
              ? data.monitoring["data"]["datacurrents"][0].i_r_Input
              : prev.i_r_Input,
          i_r_Output:
            data.monitoring["data"]["datacurrents"][0].i_r_Output != null
              ? data.monitoring["data"]["datacurrents"][0].i_r_Output
              : prev.i_r_Output,
          i_s_Input:
            data.monitoring["data"]["datacurrents"][0].i_s_Input != null
              ? data.monitoring["data"]["datacurrents"][0].i_s_Input
              : prev.i_s_Input,
          i_s_Output:
            data.monitoring["data"]["datacurrents"][0].i_s_Output != null
              ? data.monitoring["data"]["datacurrents"][0].i_s_Output
              : prev.i_s_Output,
          i_t_Input:
            data.monitoring["data"]["datacurrents"][0].i_t_Input != null
              ? data.monitoring["data"]["datacurrents"][0].i_t_Input
              : prev.i_t_Input,
          i_t_Output:
            data.monitoring["data"]["datacurrents"][0].i_t_Output != null
              ? data.monitoring["data"]["datacurrents"][0].i_t_Output
              : prev.i_t_Output,
        };

        // Log previous and new data for comparison
        if (process.env.NODE_ENV === "development") {
          console.log("Previous current State:", prev);
          console.log("New current Data:", newData);
        }

        // Ensure we are not setting the state to the same value
        if (JSON.stringify(prev) !== JSON.stringify(newData)) {
          return newData;
        }

        // Return previous state if nothing has changed
        return prev;
      });

      // Ground set
      setLastDataGround((prev) => {
        const newData = {
          voltage_input:
            data.monitoring["data"]["datagrounds"][0].voltage_input != null
              ? data.monitoring["data"]["datagrounds"][0].voltage_input
              : prev.voltage_input,
          voltage_output:
            data.monitoring["data"]["datagrounds"][0].voltage_output != null
              ? data.monitoring["data"]["datagrounds"][0].voltage_output
              : prev.voltage_output,
        };

        // Log previous and new data for comparison
        if (process.env.NODE_ENV === "development") {
          console.log("Previous ground State:", prev);
          console.log("New ground Data:", newData);
        }

        // Ensure we are not setting the state to the same value
        if (JSON.stringify(prev) !== JSON.stringify(newData)) {
          return newData;
        }

        // Return previous state if nothing has changed
        return prev;
      });

      // Frequency set
      setLastDataFrequency((prev) => {
        const newData = {
          frequency_input:
            data.monitoring["data"]["datafrequencys"][0].frequency_input != null
              ? data.monitoring["data"]["datafrequencys"][0].frequency_input
              : prev.frequency_input,
          frequency_output:
            data.monitoring["data"]["datafrequencys"][0].frequency_output !=
            null
              ? data.monitoring["data"]["datafrequencys"][0].frequency_output
              : prev.frequency_output,
        };

        // Log previous and new data for comparison
        if (process.env.NODE_ENV === "development") {
          console.log("Previous freq State:", prev);
          console.log("New freq Data:", newData);
        }

        // Ensure we are not setting the state to the same value
        if (JSON.stringify(prev) !== JSON.stringify(newData)) {
          return newData;
        }

        // Return previous state if nothing has changed
        return prev;
      });

      // Energy set
      setLastDataEnergy((prev) => {
        const newData = {
          kwh_r_input:
            data.monitoring["data"]["dataenergys"][0].kwh_r_input != null
              ? data.monitoring["data"]["dataenergys"][0].kwh_r_input
              : prev.kwh_r_input,
          kwh_s_input:
            data.monitoring["data"]["dataenergys"][0].kwh_s_input != null
              ? data.monitoring["data"]["dataenergys"][0].kwh_s_input
              : prev.kwh_s_input,
          kwh_t_input:
            data.monitoring["data"]["dataenergys"][0].kwh_t_input != null
              ? data.monitoring["data"]["dataenergys"][0].kwh_t_input
              : prev.kwh_t_input,
          kwh_total_input:
            data.monitoring["data"]["dataenergys"][0].kwh_total_input != null
              ? data.monitoring["data"]["dataenergys"][0].kwh_total_input
              : prev.kwh_total_input,
          kwh_r_output:
            data.monitoring["data"]["dataenergys"][0].kwh_r_output != null
              ? data.monitoring["data"]["dataenergys"][0].kwh_r_output
              : prev.kwh_r_output,
          kwh_s_output:
            data.monitoring["data"]["dataenergys"][0].kwh_s_output != null
              ? data.monitoring["data"]["dataenergys"][0].kwh_s_output
              : prev.kwh_s_output,
          kwh_t_output:
            data.monitoring["data"]["dataenergys"][0].kwh_t_output != null
              ? data.monitoring["data"]["dataenergys"][0].kwh_t_output
              : prev.kwh_t_output,
          kwh_total_output:
            data.monitoring["data"]["dataenergys"][0].kwh_total_output != null
              ? data.monitoring["data"]["dataenergys"][0].kwh_total_output
              : prev.kwh_total_output,
          kvarh_r_input:
            data.monitoring["data"]["dataenergys"][0].kvarh_r_input != null
              ? data.monitoring["data"]["dataenergys"][0].kvarh_r_input
              : prev.kvarh_r_input,
          kvarh_s_input:
            data.monitoring["data"]["dataenergys"][0].kvarh_s_input != null
              ? data.monitoring["data"]["dataenergys"][0].kvarh_s_input
              : prev.kvarh_s_input,
          kvarh_t_input:
            data.monitoring["data"]["dataenergys"][0].kvarh_t_input != null
              ? data.monitoring["data"]["dataenergys"][0].kvarh_t_input
              : prev.kvarh_t_input,
          kvarh_total_input:
            data.monitoring["data"]["dataenergys"][0].kvarh_total_input != null
              ? data.monitoring["data"]["dataenergys"][0].kvarh_total_input
              : prev.kvarh_total_input,
          kvarh_r_output:
            data.monitoring["data"]["dataenergys"][0].kvarh_r_output != null
              ? data.monitoring["data"]["dataenergys"][0].kvarh_r_output
              : prev.kvarh_r_output,
          kvarh_s_output:
            data.monitoring["data"]["dataenergys"][0].kvarh_s_output != null
              ? data.monitoring["data"]["dataenergys"][0].kvarh_s_output
              : prev.kvarh_s_output,
          kvarh_t_output:
            data.monitoring["data"]["dataenergys"][0].kvarh_t_output != null
              ? data.monitoring["data"]["dataenergys"][0].kvarh_t_output
              : prev.kvarh_t_output,
          kvarh_total_output:
            data.monitoring["data"]["dataenergys"][0].kvarh_total_output != null
              ? data.monitoring["data"]["dataenergys"][0].kvarh_total_output
              : prev.kvarh_total_output,
        };

        // Log previous and new data for comparison
        if (process.env.NODE_ENV === "development") {
          console.log("Previous energy State:", prev);
          console.log("New energy Data:", newData);
        }

        // Ensure we are not setting the state to the same value
        if (JSON.stringify(prev) !== JSON.stringify(newData)) {
          return newData;
        }

        // Return previous state if nothing has changed
        return prev;
      });

      // Power factor set
      setLastDataPF((prev) => {
        const newData = {
          cosphi_input:
            data.monitoring["data"]["dataPowerFactors"][0].cosphi_input != null
              ? data.monitoring["data"]["dataPowerFactors"][0].cosphi_input
              : prev.cosphi_input,
          cosphi_output:
            data.monitoring["data"]["dataPowerFactors"][0].cosphi_output != null
              ? data.monitoring["data"]["dataPowerFactors"][0].cosphi_output
              : prev.cosphi_output,
        };

        // Log previous and new data for comparison
        if (process.env.NODE_ENV === "development") {
          console.log("Previous pf State:", prev);
          console.log("New pf Data:", newData);
        }

        // Ensure we are not setting the state to the same value
        if (JSON.stringify(prev) !== JSON.stringify(newData)) {
          return newData;
        }

        // Return previous state if nothing has changed
        return prev;
      });

      setLastDataThdv((prev) => {
        const newData = {
          thdv_rs_Input:
            data.monitoring["data"]["dataThdvs"][0].thdv_rs_Input != null
              ? data.monitoring["data"]["dataThdvs"][0].thdv_rs_Input
              : prev.thdv_rs_Input,
          thdv_st_Input:
            data.monitoring["data"]["dataThdvs"][0].thdv_st_Input != null
              ? data.monitoring["data"]["dataThdvs"][0].thdv_st_Input
              : prev.thdv_st_Input,
          thdv_rt_Input:
            data.monitoring["data"]["dataThdvs"][0].thdv_rt_Input != null
              ? data.monitoring["data"]["dataThdvs"][0].thdv_rt_Input
              : prev.thdv_rt_Input,
          thdv_rn_Input:
            data.monitoring["data"]["dataThdvs"][0].thdv_rn_Input != null
              ? data.monitoring["data"]["dataThdvs"][0].thdv_rn_Input
              : prev.thdv_rn_Input,
          thdv_sn_Input:
            data.monitoring["data"]["dataThdvs"][0].thdv_sn_Input != null
              ? data.monitoring["data"]["dataThdvs"][0].thdv_sn_Input
              : prev.thdv_sn_Input,
          thdv_tn_Input:
            data.monitoring["data"]["dataThdvs"][0].thdv_tn_Input != null
              ? data.monitoring["data"]["dataThdvs"][0].thdv_tn_Input
              : prev.thdv_tn_Input,
          thdv_rs_output:
            data.monitoring["data"]["dataThdvs"][0].thdv_rs_output != null
              ? data.monitoring["data"]["dataThdvs"][0].thdv_rs_output
              : prev.thdv_rs_output,
          thdv_st_output:
            data.monitoring["data"]["dataThdvs"][0].thdv_st_output != null
              ? data.monitoring["data"]["dataThdvs"][0].thdv_st_output
              : prev.thdv_st_output,
          thdv_rt_output:
            data.monitoring["data"]["dataThdvs"][0].thdv_rt_output != null
              ? data.monitoring["data"]["dataThdvs"][0].thdv_rt_output
              : prev.thdv_rt_output,
          thdv_rn_output:
            data.monitoring["data"]["dataThdvs"][0].thdv_rn_output != null
              ? data.monitoring["data"]["dataThdvs"][0].thdv_rn_output
              : prev.thdv_rn_output,
          thdv_sn_output:
            data.monitoring["data"]["dataThdvs"][0].thdv_sn_output != null
              ? data.monitoring["data"]["dataThdvs"][0].thdv_sn_output
              : prev.thdv_sn_output,
          thdv_tn_output:
            data.monitoring["data"]["dataThdvs"][0].thdv_tn_output != null
              ? data.monitoring["data"]["dataThdvs"][0].thdv_tn_output
              : prev.thdv_tn_output,
        };

        // Log previous and new data for comparison
        if (process.env.NODE_ENV === "development") {
          console.log("Previous thdv State:", prev);
          console.log("New thdv Data:", newData);
        }

        // Ensure we are not setting the state to the same value
        if (JSON.stringify(prev) !== JSON.stringify(newData)) {
          return newData;
        }

        // Return previous state if nothing has changed
        return prev;
      });

      setLastDataThdi((prev) => {
        const newData = {
          thdi_r_Input:
            data.monitoring["data"]["datathdis"][0].thdi_r_Input != null
              ? data.monitoring["data"]["datathdis"][0].thdi_r_Input
              : prev.thdi_r_Input,
          thdi_s_Input:
            data.monitoring["data"]["datathdis"][0].thdi_s_Input != null
              ? data.monitoring["data"]["datathdis"][0].thdi_s_Input
              : prev.thdi_s_Input,
          thdi_t_Input:
            data.monitoring["data"]["datathdis"][0].thdi_t_Input != null
              ? data.monitoring["data"]["datathdis"][0].thdi_t_Input
              : prev.thdi_t_Input,
          thdi_r_output:
            data.monitoring["data"]["datathdis"][0].thdi_r_output != null
              ? data.monitoring["data"]["datathdis"][0].thdi_r_output
              : prev.thdi_r_output,
          thdi_s_output:
            data.monitoring["data"]["datathdis"][0].thdi_s_output != null
              ? data.monitoring["data"]["datathdis"][0].thdi_s_output
              : prev.thdi_s_output,
          thdi_t_output:
            data.monitoring["data"]["datathdis"][0].thdi_t_output != null
              ? data.monitoring["data"]["datathdis"][0].thdi_t_output
              : prev.thdi_t_output,
        };

        // Log previous and new data for comparison
        if (process.env.NODE_ENV === "development") {
          console.log("Previous thdi State:", prev);
          console.log("New thdi Data:", newData);
        }

        // Ensure we are not setting the state to the same value
        if (JSON.stringify(prev) !== JSON.stringify(newData)) {
          return newData;
        }

        // Return previous state if nothing has changed
        return prev;
      });
    }
  }, [data]);

  // TODO: Alert user if response time is high
  useEffect(() => {
    // Threshold of 5000ms / 5sec
    if (responseTime !== null && responseTime > 5000) {
      setIsConnectionUnstable(true);
    } else {
      setIsConnectionUnstable(false);
    }

    // Cleanup function to reset state on unmount
    return () => {
      setIsConnectionUnstable(false);
    };
  }, [isOnline, responseTime]);

  // TODO: Set monitoring values based on valid data or fallback to last known values
  const voltageValues = {
    v_rs_input:
      data && data.monitoring["data"]["datavoltages"][0]?.v_rs_input != null
        ? data.monitoring["data"]["datavoltages"][0].v_rs_input
        : lastDataVoltage.v_rs_input,
    v_st_input:
      data && data.monitoring["data"]["datavoltages"][0]?.v_st_input != null
        ? data.monitoring["data"]["datavoltages"][0].v_st_input
        : lastDataVoltage.v_st_input,
    v_rt_input:
      data && data.monitoring["data"]["datavoltages"][0]?.v_rt_input != null
        ? data.monitoring["data"]["datavoltages"][0].v_rt_input
        : lastDataVoltage.v_rt_input,
    v_rn_input:
      data && data.monitoring["data"]["datavoltages"][0]?.v_rn_input != null
        ? data.monitoring["data"]["datavoltages"][0].v_rn_input
        : lastDataVoltage.v_rn_input,
    v_sn_input:
      data && data.monitoring["data"]["datavoltages"][0]?.v_sn_input != null
        ? data.monitoring["data"]["datavoltages"][0].v_sn_input
        : lastDataVoltage.v_sn_input,
    v_tn_input:
      data && data.monitoring["data"]["datavoltages"][0]?.v_tn_input != null
        ? data.monitoring["data"]["datavoltages"][0].v_tn_input
        : lastDataVoltage.v_tn_input,
    v_rs_output:
      data && data.monitoring["data"]["datavoltages"][0]?.v_rs_output != null
        ? data.monitoring["data"]["datavoltages"][0].v_rs_output
        : lastDataVoltage.v_rs_output,
    v_st_output:
      data && data.monitoring["data"]["datavoltages"][0]?.v_st_output != null
        ? data.monitoring["data"]["datavoltages"][0].v_st_output
        : lastDataVoltage.v_st_output,
    v_rt_output:
      data && data.monitoring["data"]["datavoltages"][0]?.v_rt_output != null
        ? data.monitoring["data"]["datavoltages"][0].v_rt_output
        : lastDataVoltage.v_rt_output,
    v_rn_output:
      data && data.monitoring["data"]["datavoltages"][0]?.v_rn_output != null
        ? data.monitoring["data"]["datavoltages"][0].v_rn_output
        : lastDataVoltage.v_rn_output,
    v_sn_output:
      data && data.monitoring["data"]["datavoltages"][0]?.v_sn_output != null
        ? data.monitoring["data"]["datavoltages"][0].v_sn_output
        : lastDataVoltage.v_sn_output,
    v_tn_output:
      data && data.monitoring["data"]["datavoltages"][0]?.v_tn_output != null
        ? data.monitoring["data"]["datavoltages"][0].v_tn_output
        : lastDataVoltage.v_tn_output,
  };

  const currentValues = {
    i_r_Input:
      data && data.monitoring["data"]["datacurrents"][0]?.i_r_Input != null
        ? data.monitoring["data"]["datacurrents"][0].i_r_Input
        : lastDataCurrent.i_r_Input,
    i_r_Output:
      data && data.monitoring["data"]["datacurrents"][0]?.i_r_Output != null
        ? data.monitoring["data"]["datacurrents"][0].i_r_Output
        : lastDataCurrent.i_r_Output,
    i_s_Input:
      data && data.monitoring["data"]["datacurrents"][0]?.i_s_Input != null
        ? data.monitoring["data"]["datacurrents"][0].i_s_Input
        : lastDataCurrent.i_s_Input,
    i_s_Output:
      data && data.monitoring["data"]["datacurrents"][0]?.i_s_Output != null
        ? data.monitoring["data"]["datacurrents"][0].i_s_Output
        : lastDataCurrent.i_s_Output,
    i_t_Input:
      data && data.monitoring["data"]["datacurrents"][0]?.i_t_Input != null
        ? data.monitoring["data"]["datacurrents"][0].i_t_Input
        : lastDataCurrent.i_t_Input,
    i_t_Output:
      data && data.monitoring["data"]["datacurrents"][0]?.i_t_Output != null
        ? data.monitoring["data"]["datacurrents"][0].i_t_Output
        : lastDataCurrent.i_t_Output,
  };

  const groundValues = {
    voltage_input:
      data && data.monitoring["data"]["datagrounds"][0]?.voltage_input != null
        ? data.monitoring["data"]["datagrounds"][0].voltage_input
        : lastDataGround.voltage_input,
    voltage_output:
      data && data.monitoring["data"]["datagrounds"][0]?.voltage_output != null
        ? data.monitoring["data"]["datagrounds"][0].voltage_output
        : lastDataGround.voltage_output,
  };

  const frequencyValues = {
    frequency_input:
      data &&
      data.monitoring["data"]["datafrequencys"][0]?.frequency_input != null
        ? data.monitoring["data"]["datafrequencys"][0].frequency_input
        : lastDataFrequency.frequency_input,
    frequency_output:
      data &&
      data.monitoring["data"]["datafrequencys"][0]?.frequency_output != null
        ? data.monitoring["data"]["datafrequencys"][0].frequency_output
        : lastDataFrequency.frequency_output,
  };

  const energyValues = {
    kwh_r_input:
      data && data.monitoring["data"]["dataenergys"][0]?.kwh_r_input != null
        ? data.monitoring["data"]["dataenergys"][0].kwh_r_input
        : lastDataEnergy.kwh_r_input,
    kwh_s_input:
      data && data.monitoring["data"]["dataenergys"][0]?.kwh_s_input != null
        ? data.monitoring["data"]["dataenergys"][0].kwh_s_input
        : lastDataEnergy.kwh_s_input,
    kwh_t_input:
      data && data.monitoring["data"]["dataenergys"][0]?.kwh_t_input != null
        ? data.monitoring["data"]["dataenergys"][0].kwh_t_input
        : lastDataEnergy.kwh_t_input,
    kwh_total_input:
      data && data.monitoring["data"]["dataenergys"][0]?.kwh_total_input != null
        ? data.monitoring["data"]["dataenergys"][0].kwh_total_input
        : lastDataEnergy.kwh_total_input,
    kwh_r_output:
      data && data.monitoring["data"]["dataenergys"][0]?.kwh_r_output != null
        ? data.monitoring["data"]["dataenergys"][0].kwh_r_output
        : lastDataEnergy.kwh_r_output,
    kwh_s_output:
      data && data.monitoring["data"]["dataenergys"][0]?.kwh_s_output != null
        ? data.monitoring["data"]["dataenergys"][0].kwh_s_output
        : lastDataEnergy.kwh_s_output,
    kwh_t_output:
      data && data.monitoring["data"]["dataenergys"][0]?.kwh_t_output != null
        ? data.monitoring["data"]["dataenergys"][0].kwh_t_output
        : lastDataEnergy.kwh_t_output,
    kwh_total_output:
      data &&
      data.monitoring["data"]["dataenergys"][0]?.kwh_total_output != null
        ? data.monitoring["data"]["dataenergys"][0].kwh_total_output
        : lastDataEnergy.kwh_total_output,
    kvarh_r_input:
      data && data.monitoring["data"]["dataenergys"][0]?.kvarh_r_input != null
        ? data.monitoring["data"]["dataenergys"][0].kvarh_r_input
        : lastDataEnergy.kvarh_r_input,
    kvarh_s_input:
      data && data.monitoring["data"]["dataenergys"][0]?.kvarh_s_input != null
        ? data.monitoring["data"]["dataenergys"][0].kvarh_s_input
        : lastDataEnergy.kvarh_s_input,
    kvarh_t_input:
      data && data.monitoring["data"]["dataenergys"][0]?.kvarh_t_input != null
        ? data.monitoring["data"]["dataenergys"][0].kvarh_t_input
        : lastDataEnergy.kvarh_t_input,
    kvarh_total_input:
      data &&
      data.monitoring["data"]["dataenergys"][0]?.kvarh_total_input != null
        ? data.monitoring["data"]["dataenergys"][0].kvarh_total_input
        : lastDataEnergy.kvarh_total_input,
    kvarh_r_output:
      data && data.monitoring["data"]["dataenergys"][0]?.kvarh_r_output != null
        ? data.monitoring["data"]["dataenergys"][0].kvarh_r_output
        : lastDataEnergy.kvarh_r_output,
    kvarh_s_output:
      data && data.monitoring["data"]["dataenergys"][0]?.kvarh_s_output != null
        ? data.monitoring["data"]["dataenergys"][0].kvarh_s_output
        : lastDataEnergy.kvarh_s_output,
    kvarh_t_output:
      data && data.monitoring["data"]["dataenergys"][0]?.kvarh_t_output != null
        ? data.monitoring["data"]["dataenergys"][0].kvarh_t_output
        : lastDataEnergy.kvarh_t_output,
    kvarh_total_output:
      data &&
      data.monitoring["data"]["dataenergys"][0]?.kvarh_total_output != null
        ? data.monitoring["data"]["dataenergys"][0].kvarh_total_output
        : lastDataEnergy.kvarh_total_output,
  };

  const pfValues = {
    cosphi_input:
      data &&
      data.monitoring["data"]["dataPowerFactors"][0]?.cosphi_input != null
        ? data.monitoring["data"]["dataPowerFactors"][0].cosphi_input
        : lastDataPF.cosphi_input,
    cosphi_output:
      data &&
      data.monitoring["data"]["dataPowerFactors"][0]?.cosphi_output != null
        ? data.monitoring["data"]["dataPowerFactors"][0].cosphi_output
        : lastDataPF.cosphi_output,
  };

  const thdvValues = {
    thdv_rs_Input:
      data && data.monitoring["data"]["dataThdvs"][0]?.thdv_rs_Input != null
        ? data.monitoring["data"]["dataThdvs"][0].thdv_rs_Input
        : lastDataThdv.thdv_rs_Input,
    thdv_st_Input:
      data && data.monitoring["data"]["dataThdvs"][0]?.thdv_st_Input != null
        ? data.monitoring["data"]["dataThdvs"][0].thdv_st_Input
        : lastDataThdv.thdv_st_Input,
    thdv_rt_Input:
      data && data.monitoring["data"]["dataThdvs"][0]?.thdv_rt_Input != null
        ? data.monitoring["data"]["dataThdvs"][0].thdv_rt_Input
        : lastDataThdv.thdv_rt_Input,
    thdv_rn_Input:
      data && data.monitoring["data"]["dataThdvs"][0]?.thdv_rn_Input != null
        ? data.monitoring["data"]["dataThdvs"][0].thdv_rn_Input
        : lastDataThdv.thdv_rn_Input,
    thdv_sn_Input:
      data && data.monitoring["data"]["dataThdvs"][0]?.thdv_sn_Input != null
        ? data.monitoring["data"]["dataThdvs"][0].thdv_sn_Input
        : lastDataThdv.thdv_sn_Input,
    thdv_tn_Input:
      data && data.monitoring["data"]["dataThdvs"][0]?.thdv_tn_Input != null
        ? data.monitoring["data"]["dataThdvs"][0].thdv_tn_Input
        : lastDataThdv.thdv_tn_Input,
    thdv_rs_output:
      data && data.monitoring["data"]["dataThdvs"][0]?.thdv_rs_output != null
        ? data.monitoring["data"]["dataThdvs"][0].thdv_rs_output
        : lastDataThdv.thdv_rs_output,
    thdv_st_output:
      data && data.monitoring["data"]["dataThdvs"][0]?.thdv_st_output != null
        ? data.monitoring["data"]["dataThdvs"][0].thdv_st_output
        : lastDataThdv.thdv_st_output,
    thdv_rt_output:
      data && data.monitoring["data"]["dataThdvs"][0]?.thdv_rt_output != null
        ? data.monitoring["data"]["dataThdvs"][0].thdv_rt_output
        : lastDataThdv.thdv_rt_output,
    thdv_rn_output:
      data && data.monitoring["data"]["dataThdvs"][0]?.thdv_rn_output != null
        ? data.monitoring["data"]["dataThdvs"][0].thdv_rn_output
        : lastDataThdv.thdv_rn_output,
    thdv_sn_output:
      data && data.monitoring["data"]["dataThdvs"][0]?.thdv_sn_output != null
        ? data.monitoring["data"]["dataThdvs"][0].thdv_sn_output
        : lastDataThdv.thdv_sn_output,
    thdv_tn_output:
      data && data.monitoring["data"]["dataThdvs"][0]?.thdv_tn_output != null
        ? data.monitoring["data"]["dataThdvs"][0].thdv_tn_output
        : lastDataThdv.thdv_tn_output,
  };

  const thdiValues = {
    thdi_r_Input:
      data && data.monitoring["data"]["datathdis"][0]?.thdi_r_Input != null
        ? data.monitoring["data"]["datathdis"][0].thdi_r_Input
        : lastDataThdi.thdi_r_Input,
    thdi_s_Input:
      data && data.monitoring["data"]["datathdis"][0]?.thdi_s_Input != null
        ? data.monitoring["data"]["datathdis"][0].thdi_s_Input
        : lastDataThdi.thdi_s_Input,
    thdi_t_Input:
      data && data.monitoring["data"]["datathdis"][0]?.thdi_t_Input != null
        ? data.monitoring["data"]["datathdis"][0].thdi_t_Input
        : lastDataThdi.thdi_t_Input,
    thdi_r_output:
      data && data.monitoring["data"]["datathdis"][0]?.thdi_r_output != null
        ? data.monitoring["data"]["datathdis"][0].thdi_r_output
        : lastDataThdi.thdi_r_output,
    thdi_s_output:
      data && data.monitoring["data"]["datathdis"][0]?.thdi_s_output != null
        ? data.monitoring["data"]["datathdis"][0].thdi_s_output
        : lastDataThdi.thdi_s_output,
    thdi_t_output:
      data && data.monitoring["data"]["datathdis"][0]?.thdi_t_output != null
        ? data.monitoring["data"]["datathdis"][0].thdi_t_output
        : lastDataThdi.thdi_t_output,
  };

  // If SWR Realtime connection error then show this widget below
  if (error) {
    return (
      <div className="p-2 space-y-5 text-center sm:p-5 sm:pb-0">
        {/* Content */}
        <div className="max-w-md mx-auto space-y-3">
          <Image
            priority={true}
            width={500}
            height={500}
            className="max-w-xs mx-auto dark:hidden"
            src={ErrorImage}
            alt="EMONS | Electrical Monitoring System"
          />
          <Image
            priority={true}
            width={500}
            height={500}
            className="hidden max-w-xs mx-auto dark:block"
            src={ErrorImage}
            alt="EMONS | Electrical Monitoring System"
          />
          {/* Header Text */}
          <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gradient-to-tl from-red-100 to-rose-200 text-red-800 dark:from-red-900 dark:to-rose-950 dark:text-white">
            <svg
              className="shrink-0 size-3.5 text-white dark:from-white dark:to-rose-950 dark:text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              color="#000000"
              fill="none"
            >
              <path
                d="M17 15V17M17.009 19H17M22 17C22 19.7614 19.7614 22 17 22C14.2386 22 12 19.7614 12 17C12 14.2386 14.2386 12 17 12C19.7614 12 22 14.2386 22 17Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M14.384 9.43749C13.7591 8.85581 12.9211 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 12.9211 8.85581 13.7591 9.43749 14.384"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M9.78 20.436C9.33442 19.9904 9.18844 19.8566 8.90573 19.7389C8.62149 19.6204 8.3257 19.6161 7.69171 19.6161C6.1838 19.6161 5.32083 19.6161 4.85239 19.1476C4.38394 18.6792 4.38394 17.8162 4.38394 16.3083C4.38394 15.6777 4.37981 15.3817 4.26299 15.0987C4.14573 14.8147 3.93965 14.6022 3.49166 14.1541C2.92759 13.59 2 12.8859 2 12C2 11.114 2.92756 10.4099 3.49166 9.84585C3.93756 9.39996 4.14378 9.18799 4.26137 8.90515C4.37951 8.62098 4.38394 8.32526 4.38394 7.69171C4.38394 6.1838 4.38394 5.32083 4.85239 4.85239C5.32083 4.38394 6.1838 4.38394 7.69171 4.38394C8.32091 4.38394 8.61661 4.38 8.89929 4.26379C9.18454 4.14652 9.39688 3.94064 9.84585 3.49166C10.4099 2.92756 11.2104 2 12 2C12.7896 2 13.59 2.92759 14.1541 3.49167C14.6029 3.94037 14.8155 4.14637 15.1001 4.26355C15.3827 4.37992 15.6787 4.38394 16.3083 4.38394C17.8162 4.38394 18.6792 4.38394 19.1476 4.85239C19.6161 5.32083 19.6161 6.1838 19.6161 7.69171C19.6161 8.32383 19.6202 8.6196 19.7378 8.90321C19.8555 9.18695 19.9891 9.3211 20.436 9.768"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Internal Server Error!
          </span>
          {/* Paragraph */}
          <h1 className="text-xl font-semibold tracking-tight text-gray-800 dark:text-neutral-200">
            An unexpected error occurred on our server.
          </h1>
          <p className="text-sm text-gray-500 dark:text-neutral-500">
            We cannot provide you with the latest data at this time, please wait
            a moment.
          </p>
        </div>
        {/* End Content */}
      </div>
    );
  }

  return (
    <div id="outline-template" className="max-w-full h-fit">
      {/* Alert on slow loading */}
      {isSlowLoad || isConnectionUnstable ? <DynamicAlert /> : null}
      {/* End Alert on slow loading */}

      {/* Page Heading */}
      <div className="grid items-center grid-cols-1 px-2 py-2 mx-2 mt-2 mb-4 align-middle border rounded-lg bg-neutral-900 border-neutral-800 md:grid-cols-2 justify-evenly gap-x-4">
        {/* Greetings */}
        <div className="w-full py-0 mx-2 my-2 ps-4 h-fit">
          <div className="flex items-center justify-start gap-x-2">
            {/* Look Dropdown */}
            <div className="relative inline-flex pe-2">
              <div className="hs-dropdown [--auto-close:inside] [--trigger:hover] relative inline-flex">
                {/* Look Button Icon */}
                <button
                  id="hs-pro-shpdcl1d1"
                  type="button"
                  className="duration-200 group hover:scale-110 focus:outline-none"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  aria-label="Dropdown"
                >
                  <span className="relative flex">
                    <span
                      className={`absolute inline-flex ${
                        signal ? "bg-emerald-600" : "bg-red-600"
                      } rounded-full opacity-75 animate-ping size-full`}
                    />
                    <span
                      className={`relative inline-flex ${
                        signal ? "bg-emerald-600" : "bg-red-600"
                      } rounded-full size-3`}
                    />
                    <span className="sr-only">Look Dot</span>
                  </span>
                </button>
                {/* End Look Button Icon */}
                {/* Look Dropdown */}
                <div
                  className="hs-dropdown-menu transition-[opacity,margin] duration-[200ms] hs-dropdown-open:opacity-100 opacity-0 w-52 hidden z-10 bg-white border border-gray-100 rounded-xl shadow-lg before:absolute before:-top-2.5 before:start-0 before:w-full before:h-3 dark:bg-neutral-900 dark:border-neutral-700"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="hs-pro-shpdcl1d1"
                >
                  <div className="p-1 bg-white rounded-xl dark:bg-neutral-900">
                    {/* We will direct user to their profile (Disabled right now) */}
                    <Link
                      className="p-2.5 flex items-center gap-x-2 cursor-default rounded-lg hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:bg-neutral-900 dark:hover:bg-neutral-900 dark:focus:bg-neutral-900"
                      href=""
                      onClick={handleDisableClick.bind(null)}
                    >
                      <div className="grow">
                        <span className="block text-sm text-gray-800 dark:text-neutral-200">
                          {signal
                            ? `You are now connected`
                            : `Not connected to ${localTenant}`}
                        </span>
                        <p className="mt-1 text-xs text-gray-500 dark:text-neutral-500">
                          Last data update:
                        </p>
                        <p className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                          {lastTimeUpdate ?? "Loading.."}
                        </p>
                      </div>
                      {/* <svg
                        className="text-gray-800 shrink-0 size-4 dark:text-neutral-200"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg> */}
                    </Link>
                  </div>
                </div>
                {/* End Look Dropdown */}
              </div>
            </div>
            {/* End Look Dropdown */}
            <h2 className="inline-flex text-lg lg:text-3xl">
              Welcome,&nbsp;<strong>prasyah</strong>!
            </h2>
          </div>
          <p className="w-full pt-2 text-xs font-light lg:text-sm ps-7 text-wrap text-clip">
            This is a page that provides a summary of the electrical quality in
            your tenant.
          </p>
        </div>
        {/* Location */}
        <div className="py-4 mx-2 h-fit">
          <p className="w-full pb-2 text-xs font-light text-center lg:text-sm text-wrap text-clip">
            Currently you are viewing data:
          </p>
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
              {/* Select Location */}
              <div className="relative inline-block">
                <div
                  className={`relative inline-flex hs-dropdown hs-dropdown-example ${
                    !selectedLocation.code ? "pointer-events-none" : null
                  }`}
                >
                  <button
                    id="hs-dropdown-example"
                    type="button"
                    className="py-2 px-2 duration-200 ease-in-out transition inline-flex items-center gap-x-1.5 text-xs rounded-lg bg-white text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:bg-sky-900 dark:text-sky-200 dark:hover:bg-sky-800 dark:focus:bg-sky-800"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    {selectedLocation.code
                      ? selectedLocation.name
                      : "Select location"}
                    <svg
                      className="text-gray-600 hs-dropdown-open:rotate-180 size-3 dark:text-neutral-200"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 w-56 hidden z-10 mt-2 min-w-60 bg-white shadow-md rounded-lg p-2 dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:divide-neutral-900"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="hs-dropdown-example"
                  >
                    {locationList
                      .filter(
                        (obj, index) =>
                          locationList.findIndex(
                            (item) => item.code === obj.code
                          ) === index
                      )
                      .map((item, index) => (
                        <Link
                          key={index}
                          className={`${
                            selectedLocation.code === item.code
                              ? "pointer-events-none"
                              : "pointer-events-auto"
                          } flex duration-200 ease-in-out transition items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-800/80 dark:hover:text-neutral-300 dark:focus:bg-neutral-700`}
                          href=""
                          onClick={handleSelectLocation.bind(
                            null,
                            item.code,
                            item.name
                          )}
                        >
                          <span className="inline-flex text-xs text-white">
                            {item.name}
                          </span>
                          <span className="inline-flex text-xs text-gray-400">
                            {selectedLocation.code === item.code
                              ? "Selected"
                              : ""}
                          </span>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
              {/* End Select Location */}
              {/* Select Device */}
              <div className="relative ps-0.5 sm:ps-2 before:block before:absolute before:top-1/2 before:-start-px before:w-px before:h-4 before:bg-gray-300 before:-translate-y-1/2 dark:before:bg-neutral-700">
                <div
                  className={`relative inline-flex hs-dropdown hs-dropdown-example ${
                    !selectedDevice.code ? "pointer-events-none" : null
                  }`}
                >
                  <button
                    id="hs-dropdown-example"
                    type="button"
                    className="py-2 duration-200 ease-in-out transition px-2 inline-flex items-center gap-x-1.5 text-xs rounded-lg bg-white text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:bg-sky-900 dark:text-sky-200 dark:hover:bg-sky-800 dark:focus:bg-sky-800"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    {selectedDevice ? selectedDevice.name : "Select device"}
                    <svg
                      className="text-gray-600 hs-dropdown-open:rotate-180 size-4 dark:text-neutral-200"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 w-56 hidden z-10 mt-2 min-w-60 bg-white shadow-md rounded-lg p-2 dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:divide-neutral-900"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="hs-dropdown-example"
                  >
                    {deviceList.map((item, index) => (
                      <Link
                        key={index}
                        className={`${
                          selectedDevice.code === item.code
                            ? "pointer-events-none"
                            : "pointer-events-auto"
                        } flex duration-200 ease-in-out transition items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-800/80 dark:hover:text-neutral-300 dark:focus:bg-neutral-700`}
                        href=""
                        onClick={handleSelectDevice.bind(
                          null,
                          item.code,
                          item.name
                        )}
                      >
                        <span className="inline-flex text-xs text-white">
                          {item.name}
                        </span>
                        <span className="inline-flex text-xs text-gray-400">
                          {selectedDevice.code === item.code ? "Selected" : ""}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              {/* End Select Device */}
            </div>
          </div>
        </div>
      </div>
      {/* End Page Heading */}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mx-2 my-2 xl:mb-5 xl:gap-6">
        {/* Voltage Input */}
        <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-rose-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-rose-800/30 dark:before:via-transparent">
          {/* Icon */}
          <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow-lg size-8 md:size-10 dark:bg-neutral-900/50 dark:border-neutral-700 dark:text-neutral-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="text-white shrink-0 size-4 md:size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
              />
            </svg>
          </span>
          {/* End Icon */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase lg:text-sm text-rose-500 dark:text-rose-400">
              Voltage Input
            </h2>
            <div className="grid items-center justify-center grid-flow-row-dense grid-cols-4 grid-rows-1 pt-2 pb-4">
              <div className="col-span-4 text-2xl font-semibold text-gray-800 md:col-span-1 dark:text-neutral-200">
                {/* List Group */}
                <ul className="space-y-1">
                  {/* V_RN Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        R-N
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].datavoltages ===
                                undefined ||
                              data?.monitoring["data"].datavoltages.length === 0
                            ? voltageValues.v_rn_input
                            : data?.monitoring["data"].datavoltages[0]
                                .v_rn_input}{" "}
                          V
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End V_RN Input */}
                  {/* V_SN Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        S-N
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].datavoltages ===
                                undefined ||
                              data?.monitoring["data"].datavoltages.length === 0
                            ? voltageValues.v_sn_input
                            : data?.monitoring["data"].datavoltages[0]
                                .v_sn_input}{" "}
                          V
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End V_SN Input */}
                  {/* V_TN Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        T-N
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].datavoltages ===
                                undefined ||
                              data?.monitoring["data"].datavoltages.length === 0
                            ? voltageValues.v_tn_input
                            : data?.monitoring["data"].datavoltages[0]
                                .v_tn_input}{" "}
                          V
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End V_TN Input */}
                  {/* V_RS Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        R-S
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].datavoltages ===
                                undefined ||
                              data?.monitoring["data"].datavoltages.length === 0
                            ? voltageValues.v_rs_input
                            : data?.monitoring["data"].datavoltages[0]
                                .v_rs_input}{" "}
                          V
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End V_RS Input */}
                  {/* V_ST Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        S-T
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].datavoltages ===
                                undefined ||
                              data?.monitoring["data"].datavoltages.length === 0
                            ? voltageValues.v_st_input
                            : data?.monitoring["data"].datavoltages[0]
                                .v_st_input}{" "}
                          V
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End V_ST Input */}
                  {/* V_RT Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        R-T
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].datavoltages ===
                                undefined ||
                              data?.monitoring["data"].datavoltages.length === 0
                            ? voltageValues.v_rt_input
                            : data?.monitoring["data"].datavoltages[0]
                                .v_rt_input}{" "}
                          V
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End V_RT Input */}
                </ul>
                {/* End List Group */}
              </div>
              {/* Line Chart */}
              <div className="w-full h-full hide md:block col-span-0 md:col-span-3">
                {/* <RealTimeVoltageInputSplineChart /> */}
              </div>
            </div>
          </div>
        </div>
        {/* End Voltage Input */}
        {/* Voltage Output */}
        <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-emerald-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-emerald-800/30 dark:before:via-transparent">
          {/* Icon */}
          <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow-lg size-8 md:size-10 dark:bg-neutral-900/50 dark:border-neutral-700 dark:text-neutral-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="text-white shrink-0 size-4 md:size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
              />
            </svg>
          </span>
          {/* End Icon */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase lg:text-sm text-emerald-500 dark:text-emerald-400">
              Voltage Output
            </h2>
            <div className="grid items-center justify-center grid-flow-row-dense grid-cols-4 grid-rows-1 pt-2 pb-4">
              <div className="col-span-4 text-2xl font-semibold text-gray-800 md:col-span-1 dark:text-neutral-200">
                {/* List Group */}
                <ul className="space-y-1">
                  {/* V_RN Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        R-N
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].datavoltages ===
                                undefined ||
                              data?.monitoring["data"].datavoltages.length === 0
                            ? voltageValues.v_rn_output
                            : data?.monitoring["data"].datavoltages[0]
                                .v_rn_output}{" "}
                          V
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End V_RN Output */}
                  {/* V_SN Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        S-N
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].datavoltages ===
                                undefined ||
                              data?.monitoring["data"].datavoltages.length === 0
                            ? voltageValues.v_sn_output
                            : data?.monitoring["data"].datavoltages[0]
                                .v_sn_output}{" "}
                          V
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End V_SN Output */}
                  {/* V_TN Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        T-N
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].datavoltages ===
                                undefined ||
                              data?.monitoring["data"].datavoltages.length === 0
                            ? voltageValues.v_tn_output
                            : data?.monitoring["data"].datavoltages[0]
                                .v_tn_output}{" "}
                          V
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End V_TN Output */}
                  {/* V_RS Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        R-S
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].datavoltages ===
                                undefined ||
                              data?.monitoring["data"].datavoltages.length === 0
                            ? voltageValues.v_rs_output
                            : data?.monitoring["data"].datavoltages[0]
                                .v_rs_output}{" "}
                          V
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End V_RS Output */}
                  {/* V_ST Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        S-T
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].datavoltages ===
                                undefined ||
                              data?.monitoring["data"].datavoltages.length === 0
                            ? voltageValues.v_st_output
                            : data?.monitoring["data"].datavoltages[0]
                                .v_st_output}{" "}
                          V
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End V_ST Output */}
                  {/* V_RT Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        R-T
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].datavoltages ===
                                undefined ||
                              data?.monitoring["data"].datavoltages.length === 0
                            ? voltageValues.v_rt_output
                            : data?.monitoring["data"].datavoltages[0]
                                .v_rt_output}{" "}
                          V
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End V_RT Output */}
                </ul>
                {/* End List Group */}
              </div>
              {/* Line Chart */}
              <div className="w-full h-full hide md:block col-span-0 md:col-span-3">
                {/* <RealTimeVoltageOutputSplineChart /> */}
              </div>
            </div>
          </div>
        </div>
        {/* End Voltage Output */}
        {/* Current Input */}
        <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-rose-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-rose-700/30 dark:before:via-transparent">
          {/* Icon */}
          <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow-lg size-8 md:size-10 dark:bg-neutral-900/50 dark:border-neutral-700 dark:text-neutral-400">
            <Image
              priority={true}
              src={Current}
              className="text-rose-500 shrink-0 size-4 md:size-5"
              width={24}
              height={24}
              alt="EMONS | Electrical Monitoring System"
            ></Image>
          </span>
          {/* End Icon */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase lg:text-sm text-rose-500 dark:text-rose-400">
              Current Input
            </h2>
            <div className="grid grid-cols-2 pt-2 pb-4 gap-x-2">
              <div className="col-span-4 text-2xl font-semibold text-gray-800 md:col-span-1 dark:text-neutral-200">
                {/* List Group */}
                <ul className="space-y-1">
                  {/* R Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        R
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].datacurrents ===
                                undefined ||
                              data?.monitoring["data"].datacurrents.length === 0
                            ? currentValues.i_r_Input
                            : data?.monitoring["data"].datacurrents[0]
                                .i_r_Input}{" "}
                          A
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End R Input */}
                  {/* S Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        S
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].datacurrents ===
                                undefined ||
                              data?.monitoring["data"].datacurrents.length === 0
                            ? currentValues.i_s_Input
                            : data?.monitoring["data"].datacurrents[0]
                                .i_s_Input}{" "}
                          A
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End S Input */}
                  {/* T Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        T
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].datacurrents ===
                                undefined ||
                              data?.monitoring["data"].datacurrents.length === 0
                            ? currentValues.i_t_Input
                            : data?.monitoring["data"].datacurrents[0]
                                .i_t_Input}{" "}
                          A
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End T Input */}
                </ul>
                {/* End List Group */}
              </div>
              {/* Line Chart */}
              <div className="w-full h-full hide md:block col-span-0 md:col-span-3">
                {/* <RealTimeVoltageOutputSplineChart /> */}
              </div>
            </div>
          </div>
        </div>
        {/* End Current Input */}
        {/* Current Output */}
        <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-emerald-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-emerald-700/30 dark:before:via-transparent">
          {/* Icon */}
          <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow-lg size-8 md:size-10 dark:bg-neutral-900/50 dark:border-neutral-700 dark:text-neutral-400">
            <Image
              priority={true}
              src={Current}
              className="text-emerald-500 shrink-0 size-4 md:size-5"
              width={24}
              height={24}
              alt="EMONS | Electrical Monitoring System"
            ></Image>
          </span>
          {/* End Icon */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase lg:text-sm text-emerald-500 dark:text-emerald-400">
              Current Output
            </h2>
            <div className="grid grid-cols-2 pt-2 pb-4 gap-x-2">
              <div className="col-span-4 text-2xl font-semibold text-gray-800 md:col-span-1 dark:text-neutral-200">
                {/* List Group */}
                <ul className="space-y-1">
                  {/* R Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        R
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].datacurrents ===
                                undefined ||
                              data?.monitoring["data"].datacurrents.length === 0
                            ? currentValues.i_r_Output
                            : data?.monitoring["data"].datacurrents[0]
                                .i_r_Output}{" "}
                          A
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End R Output */}
                  {/* S Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        S
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].datacurrents ===
                                undefined ||
                              data?.monitoring["data"].datacurrents.length === 0
                            ? currentValues.i_s_Output
                            : data?.monitoring["data"].datacurrents[0]
                                .i_s_Output}{" "}
                          A
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End S Output */}
                  {/* T Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        T
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].datacurrents ===
                                undefined ||
                              data?.monitoring["data"].datacurrents.length === 0
                            ? currentValues.i_t_Output
                            : data?.monitoring["data"].datacurrents[0]
                                .i_t_Output}{" "}
                          A
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End T Output */}
                </ul>
                {/* End List Group */}
              </div>
              {/* Line Chart */}
              <div className="w-full h-full hide md:block col-span-0 md:col-span-3">
                {/* <RealTimeVoltageOutputSplineChart /> */}
              </div>
            </div>
          </div>
        </div>
        {/* End Current Output */}
        {/* Ground Input */}
        <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-rose-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-rose-700/30 dark:before:via-transparent">
          {/* Icon */}
          <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow-lg size-8 md:size-10 dark:bg-neutral-900/50 dark:border-neutral-700 dark:text-neutral-400">
            <Image
              priority={true}
              src={Ground}
              className="text-rose-500 shrink-0 size-4 md:size-5"
              width={24}
              height={24}
              alt="EMONS | Electrical Monitoring System"
            ></Image>
          </span>
          {/* End Icon */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase lg:text-sm text-rose-500 dark:text-rose-400">
              Ground Input
            </h2>

            <div className="grid grid-cols-2 gap-x-2">
              {data === undefined ||
              data === null ||
              data.length === 0 ||
              isLoading ? (
                <div
                  className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                  role="status"
                  aria-label="loading"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <div className="col-span-4 text-lg font-semibold text-gray-800 lg:text-2xl md:col-span-1 dark:text-neutral-200">
                  {data === undefined || data === null || data.length === 0
                    ? 0
                    : data?.monitoring["data"].datagrounds === undefined ||
                      data?.monitoring["data"].datagrounds.length === 0
                    ? groundValues.voltage_input
                    : data?.monitoring["data"].datagrounds[0]
                        .voltage_input}{" "}
                  V
                </div>
              )}

              {/* Line Chart */}
              <div className="w-full h-full hide md:block col-span-0 md:col-span-3">
                {/* <RealTimeVoltageOutputSplineChart /> */}
              </div>
            </div>
          </div>
        </div>
        {/* End Ground Input */}
        {/* Ground Output */}
        <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-emerald-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-emerald-700/30 dark:before:via-transparent">
          {/* Icon */}
          <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow-lg size-8 md:size-10 dark:bg-neutral-900/50 dark:border-neutral-700 dark:text-neutral-400">
            <Image
              priority={true}
              src={Ground}
              className="text-emerald-500 shrink-0 size-4 md:size-5"
              width={24}
              height={24}
              alt="EMONS | Electrical Monitoring System"
            ></Image>
          </span>
          {/* End Icon */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase lg:text-sm text-emerald-500 dark:text-emerald-400">
              Ground Output
            </h2>
            <div className="grid grid-cols-2 gap-x-2">
              {data === undefined ||
              data === null ||
              data.length === 0 ||
              isLoading ? (
                <div
                  className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                  role="status"
                  aria-label="loading"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <div className="col-span-4 text-lg font-semibold text-gray-800 lg:text-2xl md:col-span-1 dark:text-neutral-200">
                  {data === undefined || data === null || data.length === 0
                    ? 0
                    : data?.monitoring["data"].datagrounds === undefined ||
                      data?.monitoring["data"].datagrounds.length === 0
                    ? groundValues.voltage_output
                    : data?.monitoring["data"].datagrounds[0]
                        .voltage_output}{" "}
                  V
                </div>
              )}

              {/* Line Chart */}
              <div className="w-full h-full hide md:block col-span-0 md:col-span-3">
                {/* <RealTimeVoltageOutputSplineChart /> */}
              </div>
            </div>
          </div>
        </div>
        {/* End Ground Output */}
        {/* Frequency Input */}
        <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-rose-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-rose-800/30 dark:before:via-transparent">
          {/* Icon */}
          <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow-lg size-8 md:size-10 dark:bg-neutral-900/50 dark:border-neutral-700 dark:text-neutral-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="text-white shrink-0 size-4 md:size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </span>
          {/* End Icon */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase lg:text-sm text-rose-500 dark:text-rose-400">
              Frequency Input
            </h2>
            <div className="grid grid-cols-2 gap-x-2">
              {data === undefined ||
              data === null ||
              data.length === 0 ||
              isLoading ? (
                <div
                  className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                  role="status"
                  aria-label="loading"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <div className="col-span-4 text-lg font-semibold text-gray-800 lg:text-2xl md:col-span-1 dark:text-neutral-200">
                  {data === undefined || data === null || data.length === 0
                    ? 0
                    : data?.monitoring["data"].datafrequencys === undefined ||
                      data?.monitoring["data"].datafrequencys.length === 0
                    ? frequencyValues.frequency_input
                    : data?.monitoring["data"].datafrequencys[0]
                        .frequency_input}{" "}
                  Hz
                </div>
              )}

              {/* Line Chart */}
              <div className="w-full h-full hide md:block col-span-0 md:col-span-3">
                {/* <RealTimeVoltageOutputSplineChart /> */}
              </div>
            </div>
          </div>
        </div>
        {/* End Frequency Input */}
        {/* Frequency Output */}
        <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-emerald-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-emerald-800/30 dark:before:via-transparent">
          {/* Icon */}
          <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow-lg size-8 md:size-10 dark:bg-neutral-900/50 dark:border-neutral-700 dark:text-neutral-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="text-white shrink-0 size-4 md:size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </span>
          {/* End Icon */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase lg:text-sm text-emerald-500 dark:text-emerald-400">
              Frequency Output
            </h2>
            <div className="grid grid-cols-2 gap-x-2">
              {data === undefined ||
              data === null ||
              data.length === 0 ||
              isLoading ? (
                <div
                  className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                  role="status"
                  aria-label="loading"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <div className="col-span-4 text-lg font-semibold text-gray-800 lg:text-2xl md:col-span-1 dark:text-neutral-200">
                  {data === undefined || data === null || data.length === 0
                    ? 0
                    : data?.monitoring["data"].datafrequencys === undefined ||
                      data?.monitoring["data"].datafrequencys.length === 0
                    ? frequencyValues.frequency_output
                    : data?.monitoring["data"].datafrequencys[0]
                        .frequency_output}{" "}
                  Hz
                </div>
              )}
              {/* Line Chart */}
              <div className="w-full h-full hide md:block col-span-0 md:col-span-3">
                {/* <RealTimeVoltageOutputSplineChart /> */}
              </div>
            </div>
          </div>
        </div>
        {/* End Frequency Output */}
        {/* Energy KWH/KVARH Input */}
        <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-rose-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-rose-800/30 dark:before:via-transparent">
          {/* Icon */}
          <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow-lg size-8 md:size-10 dark:bg-neutral-900/50 dark:border-neutral-700 dark:text-neutral-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="text-white shrink-0 size-4 md:size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
              />
            </svg>
          </span>
          {/* End Icon */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase lg:text-sm text-rose-500 dark:text-rose-400">
              Energy Input
            </h2>
            <div className="grid grid-cols-2 pt-2 pb-4 gap-x-2">
              <div className="col-span-4 text-2xl font-semibold text-gray-800 md:col-span-1 dark:text-neutral-200">
                {/* List Group */}
                <ul className="space-y-1">
                  {/* KWH R Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-xs text-gray-500 align-middle md:text-sm dark:text-neutral-400">
                        KWH R
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].dataenergys ===
                                undefined ||
                              data?.monitoring["data"].dataenergys.length === 0
                            ? energyValues.kwh_r_input
                            : data?.monitoring["data"].dataenergys[0]
                                .kwh_r_input}{" "}
                          KWH
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End KWH R Input */}
                  {/* KWH S Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-xs text-gray-500 align-middle md:text-sm dark:text-neutral-400">
                        KWH S
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].dataenergys ===
                                undefined ||
                              data?.monitoring["data"].dataenergys.length === 0
                            ? energyValues.kwh_s_input
                            : data?.monitoring["data"].dataenergys[0]
                                .kwh_s_input}{" "}
                          KWH
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End KWH S Input */}
                  {/* KWH T Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-xs text-gray-500 align-middle md:text-sm dark:text-neutral-400">
                        KWH T
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].dataenergys ===
                                undefined ||
                              data?.monitoring["data"].dataenergys.length === 0
                            ? energyValues.kwh_t_input
                            : data?.monitoring["data"].dataenergys[0]
                                .kwh_t_input}{" "}
                          KWH
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End KWH T Input */}
                  {/* KVARH R Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-indigo-600 rounded-md size-5 dark:bg-indigo-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-xs text-gray-500 align-middle md:text-sm dark:text-neutral-400">
                        KVARH R
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].dataenergys ===
                                undefined ||
                              data?.monitoring["data"].dataenergys.length === 0
                            ? energyValues.kvarh_r_input
                            : data?.monitoring["data"].dataenergys[0]
                                .kvarh_r_input}{" "}
                          KWH
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End KVARH R Input */}
                  {/* KVARH S Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-indigo-600 rounded-md size-5 dark:bg-indigo-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-xs text-gray-500 align-middle md:text-sm dark:text-neutral-400">
                        KVARH S
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].dataenergys ===
                                undefined ||
                              data?.monitoring["data"].dataenergys.length === 0
                            ? energyValues.kvarh_s_input
                            : data?.monitoring["data"].dataenergys[0]
                                .kvarh_s_input}{" "}
                          KWH
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End KVARH S Input */}
                  {/* KVARH T Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-indigo-600 rounded-md size-5 dark:bg-indigo-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-xs text-gray-500 align-middle md:text-sm dark:text-neutral-400">
                        KVARH T
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].dataenergys ===
                                undefined ||
                              data?.monitoring["data"].dataenergys.length === 0
                            ? energyValues.kvarh_t_input
                            : data?.monitoring["data"].dataenergys[0]
                                .kvarh_t_input}{" "}
                          KWH
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End KVARH T Input */}
                </ul>
                {/* End List Group */}
              </div>
              {/* Line Chart */}
              <div className="w-full h-full hide md:block col-span-0 md:col-span-3">
                {/* <RealTimeVoltageOutputSplineChart /> */}
              </div>
            </div>
          </div>
        </div>
        {/* End Energy KWH/KVARH Input */}
        {/* Energy KWH/KVARH Output */}
        <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-emerald-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-emerald-800/30 dark:before:via-transparent">
          {/* Icon */}
          <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow-lg size-8 md:size-10 dark:bg-neutral-900/50 dark:border-neutral-700 dark:text-neutral-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="text-white shrink-0 size-4 md:size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
              />
            </svg>
          </span>
          {/* End Icon */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase lg:text-sm text-emerald-500 dark:text-emerald-400">
              Energy Output
            </h2>
            <div className="grid grid-cols-2 pt-2 pb-4 gap-x-2">
              <div className="col-span-4 text-2xl font-semibold text-gray-800 md:col-span-1 dark:text-neutral-200">
                {/* List Group */}
                <ul className="space-y-1">
                  {/* KWH R Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-xs text-gray-500 align-middle md:text-sm dark:text-neutral-400">
                        KWH R
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].dataenergys ===
                                undefined ||
                              data?.monitoring["data"].dataenergys.length === 0
                            ? energyValues.kwh_r_output
                            : data?.monitoring["data"].dataenergys[0]
                                .kwh_r_output}{" "}
                          KWH
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End KWH R output */}
                  {/* KWH S output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-xs text-gray-500 align-middle md:text-sm dark:text-neutral-400">
                        KWH S
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].dataenergys ===
                                undefined ||
                              data?.monitoring["data"].dataenergys.length === 0
                            ? energyValues.kwh_s_output
                            : data?.monitoring["data"].dataenergys[0]
                                .kwh_s_output}{" "}
                          KWH
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End KWH S output */}
                  {/* KWH T output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-xs text-gray-500 align-middle md:text-sm dark:text-neutral-400">
                        KWH T
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].dataenergys ===
                                undefined ||
                              data?.monitoring["data"].dataenergys.length === 0
                            ? energyValues.kwh_t_output
                            : data?.monitoring["data"].dataenergys[0]
                                .kwh_t_output}{" "}
                          KWH
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End KWH T output */}
                  {/* KVARH R output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-indigo-600 rounded-md size-5 dark:bg-indigo-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-xs text-gray-500 align-middle md:text-sm dark:text-neutral-400">
                        KVARH R
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].dataenergys ===
                                undefined ||
                              data?.monitoring["data"].dataenergys.length === 0
                            ? energyValues.kvarh_r_output
                            : data?.monitoring["data"].dataenergys[0]
                                .kvarh_r_output}{" "}
                          KWH
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End KVARH R output */}
                  {/* KVARH S output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-indigo-600 rounded-md size-5 dark:bg-indigo-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-xs text-gray-500 align-middle md:text-sm dark:text-neutral-400">
                        KVARH S
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].dataenergys ===
                                undefined ||
                              data?.monitoring["data"].dataenergys.length === 0
                            ? energyValues.kvarh_s_output
                            : data?.monitoring["data"].dataenergys[0]
                                .kvarh_s_output}{" "}
                          KWH
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End KVARH S output */}
                  {/* KVARH T output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-indigo-600 rounded-md size-5 dark:bg-indigo-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-xs text-gray-500 align-middle md:text-sm dark:text-neutral-400">
                        KVARH T
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].dataenergys ===
                                undefined ||
                              data?.monitoring["data"].dataenergys.length === 0
                            ? energyValues.kvarh_t_output
                            : data?.monitoring["data"].dataenergys[0]
                                .kvarh_t_output}{" "}
                          KWH
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End KVARH T output */}
                </ul>
                {/* End List Group */}
              </div>
              {/* Line Chart */}
              <div className="w-full h-full hide md:block col-span-0 md:col-span-3">
                {/* <RealTimeVoltageOutputSplineChart /> */}
              </div>
            </div>
          </div>
        </div>
        {/* End Energy KWH/KVARH Output */}
        {/* Power Factor Input */}
        <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-rose-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-rose-800/30 dark:before:via-transparent">
          {/* Icon */}
          <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow-lg size-8 md:size-10 dark:bg-neutral-900/50 dark:border-neutral-700 dark:text-neutral-400">
            <Image
              priority={true}
              src={PowerFactor}
              className="text-emerald-500 shrink-0 size-4 md:size-5"
              width={24}
              height={24}
              alt="EMONS | Electrical Monitoring System"
            ></Image>
          </span>
          {/* End Icon */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase lg:text-sm text-rose-500 dark:text-rose-400">
              Power Factor Input
            </h2>
            <div className="grid grid-cols-2 gap-x-2">
              {data === undefined ||
              data === null ||
              data.length === 0 ||
              isLoading ? (
                <div
                  className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                  role="status"
                  aria-label="loading"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <div className="col-span-4 text-lg font-semibold text-gray-800 lg:text-2xl md:col-span-1 dark:text-neutral-200">
                  {data === undefined || data === null || data.length === 0
                    ? 0
                    : data?.monitoring["data"].dataPowerFactors === undefined ||
                      data?.monitoring["data"].dataPowerFactors.length === 0
                    ? pfValues.cosphi_input === -1
                      ? 0
                      : pfValues.cosphi_input
                    : data?.monitoring["data"].dataPowerFactors[0]
                        .cosphi_input || pfValues.cosphi_input === -1
                    ? 0
                    : data?.monitoring["data"].dataPowerFactors[0].cosphi_input}
                </div>
              )}

              {/* Line Chart */}
              <div className="w-full h-full hide md:block col-span-0 md:col-span-3">
                {/* <RealTimeVoltageOutputSplineChart /> */}
              </div>
            </div>
          </div>
        </div>
        {/* End Power Factor Input */}
        {/* Power Factor Output */}
        <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-emerald-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-emerald-800/30 dark:before:via-transparent">
          {/* Icon */}
          <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow-lg size-8 md:size-10 dark:bg-neutral-900/50 dark:border-neutral-700 dark:text-neutral-400">
            <Image
              priority={true}
              src={PowerFactor}
              className="text-emerald-500 shrink-0 size-4 md:size-5"
              width={24}
              height={24}
              alt="EMONS | Electrical Monitoring System"
            ></Image>
          </span>
          {/* End Icon */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase lg:text-sm text-emerald-500 dark:text-emerald-400">
              Power Factor Output
            </h2>
            <div className="grid grid-cols-2 gap-x-2">
              {data === undefined ||
              data === null ||
              data.length === 0 ||
              isLoading ? (
                <div
                  className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                  role="status"
                  aria-label="loading"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <div className="col-span-4 text-lg font-semibold text-gray-800 lg:text-2xl md:col-span-1 dark:text-neutral-200">
                  {data === undefined || data === null || data.length === 0
                    ? 0
                    : data?.monitoring["data"].dataPowerFactors === undefined ||
                      data?.monitoring["data"].dataPowerFactors.length === 0
                    ? pfValues.cosphi_output === -1
                      ? 0
                      : pfValues.cosphi_output
                    : data?.monitoring["data"].dataPowerFactors[0]
                        .cosphi_output || pfValues.cosphi_output === -1
                    ? 0
                    : data?.monitoring["data"].dataPowerFactors[0]
                        .cosphi_output}
                </div>
              )}
              {/* Line Chart */}
              <div className="w-full h-full hide md:block col-span-0 md:col-span-3">
                {/* <RealTimeVoltageOutputSplineChart /> */}
              </div>
            </div>
            {/* <div className="flex items-center gap-x-2">
              <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs bg-gray-100 text-gray-800 rounded-md dark:bg-neutral-500/20 dark:text-neutral-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="shrink-0 size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                  />
                </svg>
                {dateState.toLocaleString("id-ID", {
                  timeZone: "Asia/Jakarta",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  hourCycle: "h24",
                })}
              </span>
            </div> */}
          </div>
        </div>
        {/* End Power Factor Output */}
        {/* THDv Input */}
        <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-rose-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-rose-800/30 dark:before:via-transparent">
          {/* Icon */}
          <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow-lg size-8 md:size-10 dark:bg-neutral-900/50 dark:border-neutral-700 dark:text-neutral-400">
            <Image
              priority={true}
              src={THDv}
              className="text-emerald-500 shrink-0 size-4 md:size-5"
              width={24}
              height={24}
              alt="EMONS | Electrical Monitoring System"
            ></Image>
          </span>
          {/* End Icon */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase lg:text-sm text-rose-500 dark:text-rose-400">
              THDv Input
            </h2>
            <div className="grid items-center justify-center grid-flow-row-dense grid-cols-4 grid-rows-1 pt-2 pb-4">
              <div className="col-span-4 text-2xl font-semibold text-gray-800 md:col-span-1 dark:text-neutral-200">
                {/* List Group */}
                <ul className="space-y-1">
                  {/* RN Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        R-N
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].dataThdvs ===
                                undefined ||
                              data?.monitoring["data"].dataThdvs.length === 0
                            ? thdvValues.thdv_rn_Input
                            : data?.monitoring["data"].dataThdvs[0]
                                .thdv_rn_Input}{" "}
                          %
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End RN Input */}
                  {/* SN Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        S-N
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].dataThdvs ===
                                undefined ||
                              data?.monitoring["data"].dataThdvs.length === 0
                            ? thdvValues.thdv_sn_Input
                            : data?.monitoring["data"].dataThdvs[0]
                                .thdv_sn_Input}{" "}
                          %
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End SN Input */}
                  {/* TN Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        T-N
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].dataThdvs ===
                                undefined ||
                              data?.monitoring["data"].dataThdvs.length === 0
                            ? thdvValues.thdv_tn_Input
                            : data?.monitoring["data"].dataThdvs[0]
                                .thdv_tn_Input}{" "}
                          %
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End TN Input */}
                  {/* RS Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        R-S
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].dataThdvs ===
                                undefined ||
                              data?.monitoring["data"].dataThdvs.length === 0
                            ? thdvValues.thdv_rs_Input
                            : data?.monitoring["data"].dataThdvs[0]
                                .thdv_rs_Input}{" "}
                          %
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End RS Input */}
                  {/* ST Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        S-T
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].dataThdvs ===
                                undefined ||
                              data?.monitoring["data"].dataThdvs.length === 0
                            ? thdvValues.thdv_st_Input
                            : data?.monitoring["data"].dataThdvs[0]
                                .thdv_st_Input}{" "}
                          %
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End ST Input */}
                  {/* RT Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        R-T
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].dataThdvs ===
                                undefined ||
                              data?.monitoring["data"].dataThdvs.length === 0
                            ? thdvValues.thdv_rt_Input
                            : data?.monitoring["data"].dataThdvs[0]
                                .thdv_rt_Input}{" "}
                          %
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End RT Input */}
                </ul>
                {/* End List Group */}
              </div>
              {/* Line Chart */}
              <div className="w-full h-full hide md:block col-span-0 md:col-span-3">
                {/* <RealTimeVoltageOutputSplineChart /> */}
              </div>
            </div>
          </div>
        </div>
        {/* End THDv Input */}
        {/* THDv Output */}
        <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-emerald-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-emerald-800/30 dark:before:via-transparent">
          {/* Icon */}
          <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow-lg size-8 md:size-10 dark:bg-neutral-900/50 dark:border-neutral-700 dark:text-neutral-400">
            <Image
              priority={true}
              src={THDv}
              className="text-emerald-500 shrink-0 size-4 md:size-5"
              width={24}
              height={24}
              alt="EMONS | Electrical Monitoring System"
            ></Image>
          </span>
          {/* End Icon */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase lg:text-sm text-emerald-500 dark:text-emerald-400">
              THDv Output
            </h2>
            <div className="grid items-center justify-center grid-flow-row-dense grid-cols-4 grid-rows-1 pt-2 pb-4">
              <div className="col-span-4 text-2xl font-semibold text-gray-800 md:col-span-1 dark:text-neutral-200">
                {/* List Group */}
                <ul className="space-y-1">
                  {/* RN Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        R-N
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].dataThdvs ===
                                undefined ||
                              data?.monitoring["data"].dataThdvs.length === 0
                            ? thdvValues.thdv_rn_output
                            : data?.monitoring["data"].dataThdvs[0]
                                .thdv_rn_output}{" "}
                          %
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End RN Output */}
                  {/* SN Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        S-N
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].dataThdvs ===
                                undefined ||
                              data?.monitoring["data"].dataThdvs.length === 0
                            ? thdvValues.thdv_sn_output
                            : data?.monitoring["data"].dataThdvs[0]
                                .thdv_sn_output}{" "}
                          %
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End SN Output */}
                  {/* TN Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        T-N
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].dataThdvs ===
                                undefined ||
                              data?.monitoring["data"].dataThdvs.length === 0
                            ? thdvValues.thdv_tn_output
                            : data?.monitoring["data"].dataThdvs[0]
                                .thdv_tn_output}{" "}
                          %
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End TN Output */}
                  {/* RS Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        R-S
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].dataThdvs ===
                                undefined ||
                              data?.monitoring["data"].dataThdvs.length === 0
                            ? thdvValues.thdv_rs_output
                            : data?.monitoring["data"].dataThdvs[0]
                                .thdv_rs_output}{" "}
                          %
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End RS Output */}
                  {/* ST Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        S-T
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].dataThdvs ===
                                undefined ||
                              data?.monitoring["data"].dataThdvs.length === 0
                            ? thdvValues.thdv_st_output
                            : data?.monitoring["data"].dataThdvs[0]
                                .thdv_st_output}{" "}
                          %
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End ST Output */}
                  {/* RT Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        R-T
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].dataThdvs ===
                                undefined ||
                              data?.monitoring["data"].dataThdvs.length === 0
                            ? thdvValues.thdv_rt_output
                            : data?.monitoring["data"].dataThdvs[0]
                                .thdv_rt_output}{" "}
                          %
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End RT Output */}
                </ul>
                {/* End List Group */}
              </div>
              {/* Line Chart */}
              <div className="w-full h-full hide md:block col-span-0 md:col-span-3">
                {/* <RealTimeVoltageOutputSplineChart /> */}
              </div>
            </div>
          </div>
        </div>
        {/* End THDv Output */}
        {/* THDi Input */}
        <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-rose-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-rose-700/30 dark:before:via-transparent">
          {/* Icon */}
          <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow-lg size-8 md:size-10 dark:bg-neutral-900/50 dark:border-neutral-700 dark:text-neutral-400">
            <Image
              priority={true}
              src={THDi}
              className="text-rose-500 shrink-0 size-4 md:size-5"
              width={24}
              height={24}
              alt="EMONS | Electrical Monitoring System"
            ></Image>
          </span>
          {/* End Icon */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase lg:text-sm text-rose-500 dark:text-rose-400">
              THDi Input
            </h2>
            <div className="grid grid-cols-2 pt-2 pb-4 gap-x-2">
              <div className="col-span-4 text-2xl font-semibold text-gray-800 md:col-span-1 dark:text-neutral-200">
                {/* List Group */}
                <ul className="space-y-1">
                  {/* R Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        R
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].datathdis ===
                                undefined ||
                              data?.monitoring["data"].datathdis.length === 0
                            ? thdiValues.thdi_r_Input
                            : data?.monitoring["data"].datathdis[0]
                                .thdi_r_Input}{" "}
                          %
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End R Input */}
                  {/* S Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        S
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].datathdis ===
                                undefined ||
                              data?.monitoring["data"].datathdis.length === 0
                            ? thdiValues.thdi_s_Input
                            : data?.monitoring["data"].datathdis[0]
                                .thdi_s_Input}{" "}
                          %
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End S Input */}
                  {/* T Input */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        T
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].datathdis ===
                                undefined ||
                              data?.monitoring["data"].datathdis.length === 0
                            ? thdiValues.thdi_t_Input
                            : data?.monitoring["data"].datathdis[0]
                                .thdi_t_Input}{" "}
                          %
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End T Input */}
                </ul>
                {/* End List Group */}
              </div>
              {/* Line Chart */}
              <div className="w-full h-full hide md:block col-span-0 md:col-span-3">
                {/* <RealTimeVoltageOutputSplineChart /> */}
              </div>
            </div>
          </div>
        </div>
        {/* End THDi Input */}
        {/* THDi Output */}
        <div className="relative p-4 overflow-hidden bg-white border border-gray-200 shadow-sm sm:p-5 rounded-xl before:absolute before:top-0 before:end-0 before:size-full before:bg-gradient-to-br before:from-emerald-100 before:via-transparent before:blur-xl dark:bg-neutral-800 dark:border-neutral-700 dark:before:from-emerald-700/30 dark:before:via-transparent">
          {/* Icon */}
          <span className="inline-flex items-center justify-center mb-3 text-gray-700 bg-white rounded-lg shadow-lg size-8 md:size-10 dark:bg-neutral-900/50 dark:border-neutral-700 dark:text-neutral-400">
            <Image
              priority={true}
              src={THDi}
              className="text-emerald-500 shrink-0 size-4 md:size-5"
              width={24}
              height={24}
              alt="EMONS | Electrical Monitoring System"
            ></Image>
          </span>
          {/* End Icon */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase lg:text-sm text-emerald-500 dark:text-emerald-400">
              THDi Output
            </h2>
            <div className="grid grid-cols-2 pt-2 pb-4 gap-x-2">
              <div className="col-span-4 text-2xl font-semibold text-gray-800 md:col-span-1 dark:text-neutral-200">
                {/* List Group */}
                <ul className="space-y-1">
                  {/* R Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        R
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].datathdis ===
                                undefined ||
                              data?.monitoring["data"].datathdis.length === 0
                            ? thdiValues.thdi_r_output
                            : data?.monitoring["data"].datathdis[0]
                                .thdi_r_output}{" "}
                          %
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End R Output */}
                  {/* S Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        S
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].datathdis ===
                                undefined ||
                              data?.monitoring["data"].datathdis.length === 0
                            ? thdiValues.thdi_s_output
                            : data?.monitoring["data"].datathdis[0]
                                .thdi_s_output}{" "}
                          %
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End S Output */}
                  {/* T Output */}
                  <li className="flex flex-wrap items-center justify-start gap-x-2">
                    <div className="flex items-center justify-center gap-x-2">
                      <span className="flex items-center justify-center text-white bg-blue-600 rounded-md size-5 dark:bg-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="flex-shrink-0 size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                      </span>
                      <h2 className="inline-block text-sm text-gray-500 align-middle dark:text-neutral-400">
                        T
                      </h2>
                      {data === undefined ||
                      data === null ||
                      data.length === 0 ||
                      isLoading ? (
                        <div
                          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                          role="status"
                          aria-label="loading"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 md:text-lg dark:text-neutral-200">
                          {data === undefined ||
                          data === null ||
                          data.length === 0
                            ? 0
                            : data?.monitoring["data"].datathdis ===
                                undefined ||
                              data?.monitoring["data"].datathdis.length === 0
                            ? thdiValues.thdi_t_output
                            : data?.monitoring["data"].datathdis[0]
                                .thdi_t_output}{" "}
                          %
                        </span>
                      )}
                    </div>
                  </li>
                  {/* End T Output */}
                </ul>
                {/* End List Group */}
              </div>
              {/* Line Chart */}
              <div className="w-full h-full hide md:block col-span-0 md:col-span-3">
                {/* <RealTimeVoltageOutputSplineChart /> */}
              </div>
            </div>
          </div>
        </div>
        {/* End THDi Output */}
      </div>
      {/* End Stats Grid */}
      <PrelineScript />
    </div>
  );
}
