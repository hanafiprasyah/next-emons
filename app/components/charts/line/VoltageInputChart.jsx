"use client";

import React, { useEffect, useState } from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  SplineSeries,
  Category,
  Legend,
  Tooltip,
  DataLabel,
  Crosshair,
} from "@syncfusion/ej2-react-charts";
import useSWR, { mutate } from "swr";

const fetcher = async (
  url,
  localTenant,
  locationid,
  cookieToken,
  cookieSalt
) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      tenant: localTenant,
      Authorize: cookieSalt,
      token: cookieToken,
    },
    body: JSON.stringify({
      locationid: locationid,
      lane: "",
      status: "",
      value: "",
      side: "",
      start_trancation_date: "",
      end_trancation_date: "",
      tenant: tenant,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch linear chart value");
  }

  const result = await response.json();

  if (result.message === "Success") {
    return result.voltage["data"].map((item) => ({
      time: new Date(item.send_date).toLocaleTimeString(),
      // Single phase
      v_rn_input: item.v_rn_input,
      v_sn_input: item.v_sn_input,
      v_tn_input: item.v_tn_input,
      v_rn_output: item.v_rn_output,
      v_sn_output: item.v_sn_output,
      v_tn_output: item.v_tn_output,
      // Three phase (if exists)
      v_rs_input: item.v_rs_input,
      v_st_input: item.v_st_input,
      v_rt_input: item.v_rt_input,
      v_rs_output: item.v_rs_output,
      v_st_output: item.v_st_output,
      v_rt_output: item.v_rt_output,
    }));
  } else {
    return null;
    if (process.env.NODE_ENV === "development") {
      console.log("Error in fetch Voltage Input Linear chart");
    }
  }
};

const RealTimeVoltageInputSplineChart = ({
  tenant,
  locationid,
  online,
  unstableConnection,
  cookieToken,
  cookieSalt,
}) => {
  const [chartData, setChartData] = useState([]);
  const [threePhase, setThreePhase] = useState(false);

  // TODO: Clear SWR Cache
  const clearSWRCache = () =>
    mutate(() => true, undefined, {
      revalidate: false,
      rollbackOnError: true,
    });

  const {
    data: newData,
    isLoading,
    error,
  } = useSWR(
    tenant && locationid && cookieSalt && cookieToken
      ? [
          "/api/monitoring/voltage/getdata",
          tenant,
          locationid,
          cookieToken,
          cookieSalt,
        ]
      : null,
    ([url, localTenant, locationid, cookieToken, cookieSalt]) =>
      fetcher(url, localTenant, locationid, cookieToken, cookieSalt),
    {
      isPaused: () => !tenant && !locationid && !cookieToken && !cookieSalt,
      isOnline: () => online && !unstableConnection,
      refreshInterval: 3000,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      revalidateOnFocus: false,
      loadingTimeout: 10000,
      keepPreviousData: true,
      onError: (err) => clearSWRCache(),
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // TODO: Never retry on 404
        if (error.status === 404) return;
        // TODO: Disable retry for spesific key
        if (
          JSON.stringify(key) ===
          JSON.stringify([
            "/api/monitoring/voltage/getdata",
            tenant,
            locationid,
            cookieToken,
            cookieSalt,
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

  useEffect(() => {
    if (newData) {
      setChartData((prevData) => {
        // Keep only the last 100 data points by removing the first one when a new one is added
        const updatedData = [...prevData, ...newData];
        return updatedData.length > 10 ? updatedData.slice(1) : updatedData;
      });

      if (newData[0].v_rs_input !== 0) {
        setThreePhase(true);
      }
    }
  }, [newData]);

  if (isLoading) {
    <div
      className="animate-spin inline-block size-3 border-[2px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>;
  }

  if (error) {
    return (
      <div className="w-full text-center text-clip">
        <p className="text-sm font-thin text-white">Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      {threePhase ? (
        <ChartComponent
          id="voltage-input-chart"
          alt="Voltage EMONS Chart"
          titleStyle={{ color: "white", fontFamily: "Outfit" }}
          border={{ width: 0 }}
          chartArea={{ opacity: 0 }}
          theme="TailwindDark"
          background="transparent"
          enableAnimation={true}
          enableCanvas={false}
          width="100%"
          height="200px"
          tooltip={{
            enable: true,
            opacity: 0.9,
            fill: "#333",
            shared: true,
            roundedCorner: { radius: 10 },
            header: "Voltage Realtime Data",
            textStyle: {
              color: "#fff",
              fontWeight: "light",
              fontSize: "12px",
              fontFamily: "Outfit",
            },
            format: "${series.name} : ${point.y} KWH at ${point.x}",
            // template: template,
            // location: { x: 80, y: 85 },
          }}
          crosshair={{
            enable: true,
            lineType: "Vertical",
            dashArray: "2,2",
          }}
          primaryXAxis={{
            visible: false,
            title: "Time",
            titlePadding: 10,
            labelPadding: 10,
            valueType: "Category",
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            minorGridLines: { width: 0 },
            minorTickLines: { width: 0 },
            lineStyle: { width: 1, color: "white" },
            intervalType: "Seconds",
            labelIntersectAction: "Rotate45",
            labelRotation: 0,
            interval: 1,
            edgeLabelPlacement: "Shift",
            titleStyle: {
              fontFamily: "Outfit",
              color: "white",
            },
            labelStyle: {
              opacity: 0,
              color: "white",
              fontFamily: "Outfit",
              size: "10px",
            },
          }}
          primaryYAxis={{
            visible: false,
            interval: 1,
            labelFormat: "{value} V",
            title: "Voltage",
            titlePadding: 10,
            labelPadding: 10,
            titleStyle: {
              fontFamily: "Outfit",
              color: "white",
            },
            crosshairTooltip: { enable: false, fill: "green" },
            majorGridLines: { width: 0, color: "white", dashArray: "2px" },
            majorTickLines: { width: 0 },
            minorGridLines: { width: 0, color: "white" },
            minorTickLines: { width: 0 },
            lineStyle: { width: 0.5, color: "white" },
            labelStyle: {
              opacity: 0,
              color: "white",
              fontFamily: "Outfit",
              size: "10px",
            },
          }}
          margin={{
            top: 0,
            bottom: 0,
            right: 8,
            left: 8,
          }}
          legendSettings={{
            visible: false,
            alignment: "Center",
            position: "Top",
            textWrap: "Wrap",
            containerPadding: { top: 10, bottom: 20 },
            maximumLabelWidth: 100,
            shapeHeight: 8,
            shapeWidth: 8,
            textStyle: { fontFamily: "Outfit", color: "white", size: "10px" },
          }}
          loaded={(args) => {
            if (chartData && chartData.length > 10) {
              args.chart.primaryXAxis.zoomPosition = 1 - 10 / chartData.length; // Shift X-axis range
            }
          }}
        >
          <Inject
            services={[
              SplineSeries,
              Category,
              Legend,
              Tooltip,
              DataLabel,
              Crosshair,
            ]}
          />
          <SeriesCollectionDirective>
            {/* Spline for v_rn_input */}
            <SeriesDirective
              marker={{
                visible: false,
                width: 5,
                height: 5,
                border: 0,
                isFilled: true,
                dataLabel: {
                  format: "n1",
                  name: "text",
                  font: "Outfit",
                  visible: false,
                },
              }}
              dataSource={chartData}
              animation={{ enable: true, duration: 1100 }}
              xName="time"
              yName="v_rn_input"
              type="Spline"
              name="RN Input"
              width={2}
            ></SeriesDirective>
            {/* Spline for v_sn_input */}
            <SeriesDirective
              marker={{
                visible: false,
                width: 5,
                height: 5,
                isFilled: true,
                dataLabel: {
                  format: "n1",
                  name: "text",
                  font: "Outfit",
                  visible: false,
                },
              }}
              dataSource={chartData}
              animation={{ enable: true, duration: 1100 }}
              xName="time"
              yName="v_sn_input"
              type="Spline"
              name="SN Input"
              width={2}
            ></SeriesDirective>
            {/* Spline for v_tn_input */}
            <SeriesDirective
              marker={{
                visible: false,
                width: 5,
                height: 5,
                isFilled: true,
                dataLabel: {
                  format: "n1",
                  name: "text",
                  font: "Outfit",
                  visible: false,
                },
              }}
              dataSource={chartData}
              animation={{ enable: true, duration: 1100 }}
              xName="time"
              yName="v_tn_input"
              type="Spline"
              name="TN Input"
              width={2}
            ></SeriesDirective>
            {/* Three Phase */}
            {/* Spline for v_rs_input */}
            <SeriesDirective
              marker={{
                visible: false,
                width: 5,
                height: 5,
                border: 0,
                isFilled: true,
                dataLabel: {
                  format: "n1",
                  name: "text",
                  font: "Outfit",
                  visible: false,
                },
              }}
              dataSource={chartData}
              animation={{ enable: true, duration: 1100 }}
              xName="time"
              yName="v_rs_input"
              type="Spline"
              name="RS Input"
              width={2}
            ></SeriesDirective>
            {/* Spline for v_st_input */}
            <SeriesDirective
              marker={{
                visible: false,
                width: 5,
                height: 5,
                isFilled: true,
                dataLabel: {
                  format: "n1",
                  name: "text",
                  font: "Outfit",
                  visible: false,
                },
              }}
              dataSource={chartData}
              animation={{ enable: true, duration: 1100 }}
              xName="time"
              yName="v_st_input"
              type="Spline"
              name="ST Input"
              width={2}
            ></SeriesDirective>
            {/* Spline for v_rt_input */}
            <SeriesDirective
              marker={{
                visible: false,
                width: 5,
                height: 5,
                isFilled: true,
                dataLabel: {
                  format: "n1",
                  name: "text",
                  font: "Outfit",
                  visible: false,
                },
              }}
              dataSource={chartData}
              animation={{ enable: true, duration: 1100 }}
              xName="time"
              yName="v_rt_input"
              type="Spline"
              name="RT Input"
              width={2}
            ></SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      ) : (
        <ChartComponent
          id="voltage-input-chart"
          alt="Voltage EMONS Chart"
          titleStyle={{ color: "white", fontFamily: "Outfit" }}
          border={{ width: 0 }}
          chartArea={{ opacity: 0 }}
          theme="TailwindDark"
          background="transparent"
          enableAnimation={true}
          enableCanvas={false}
          width="100%"
          height="200px"
          tooltip={{
            enable: true,
            opacity: 0.9,
            fill: "#333",
            shared: true,
            roundedCorner: { radius: 10 },
            header: "Voltage Realtime Data",
            textStyle: {
              color: "#fff",
              fontWeight: "light",
              fontSize: "12px",
              fontFamily: "Outfit",
            },
            format: "${series.name} : ${point.y} KWH at ${point.x}",
            // template: template,
            // location: { x: 80, y: 85 },
          }}
          crosshair={{
            enable: true,
            lineType: "Vertical",
            dashArray: "2,2",
          }}
          primaryXAxis={{
            visible: false,
            title: "Time",
            titlePadding: 10,
            labelPadding: 10,
            valueType: "Category",
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            minorGridLines: { width: 0 },
            minorTickLines: { width: 0 },
            lineStyle: { width: 0, color: "white" },
            intervalType: "Seconds",
            labelIntersectAction: "Rotate45",
            labelRotation: 0,
            interval: 1,
            edgeLabelPlacement: "Shift",
            titleStyle: {
              fontFamily: "Outfit",
              color: "white",
            },
            labelStyle: {
              opacity: 0,
              color: "white",
              fontFamily: "Outfit",
              size: "10px",
            },
          }}
          primaryYAxis={{
            visible: false,
            interval: 1,
            labelFormat: "{value} V",
            title: "Voltage",
            titlePadding: 10,
            labelPadding: 10,
            titleStyle: {
              fontFamily: "Outfit",
              color: "white",
            },
            crosshairTooltip: { enable: false, fill: "green" },
            majorGridLines: { width: 0, color: "white", dashArray: "2px" },
            majorTickLines: { width: 0 },
            minorGridLines: { width: 0, color: "white" },
            minorTickLines: { width: 0 },
            lineStyle: { width: 0.5, color: "white" },
            labelStyle: {
              opacity: 0,
              color: "white",
              fontFamily: "Outfit",
              size: "10px",
            },
          }}
          margin={{
            top: 0,
            bottom: 0,
            right: 8,
            left: 8,
          }}
          legendSettings={{
            visible: false,
            alignment: "Center",
            position: "Top",
            textWrap: "Wrap",
            containerPadding: { top: 10, bottom: 20 },
            maximumLabelWidth: 100,
            shapeHeight: 8,
            shapeWidth: 8,
            textStyle: { fontFamily: "Outfit", color: "white", size: "10px" },
          }}
          loaded={(args) => {
            if (chartData && chartData.length > 10) {
              args.chart.primaryXAxis.zoomPosition = 1 - 10 / chartData.length; // Shift X-axis range
            }
          }}
        >
          <Inject
            services={[
              SplineSeries,
              Category,
              Legend,
              Tooltip,
              DataLabel,
              Crosshair,
            ]}
          />
          <SeriesCollectionDirective>
            {/* Spline for v_rn_input */}
            <SeriesDirective
              marker={{
                visible: false,
                width: 5,
                height: 5,
                border: 0,
                isFilled: true,
                dataLabel: {
                  format: "n1",
                  name: "text",
                  font: "Outfit",
                  visible: false,
                },
              }}
              dataSource={chartData}
              animation={{ enable: true, duration: 1100 }}
              xName="time"
              yName="v_rn_input"
              type="Spline"
              name="RN Input"
              width={2}
            ></SeriesDirective>
            {/* Spline for v_sn_input */}
            <SeriesDirective
              marker={{
                visible: false,
                width: 5,
                height: 5,
                isFilled: true,
                dataLabel: {
                  format: "n1",
                  name: "text",
                  font: "Outfit",
                  visible: false,
                },
              }}
              dataSource={chartData}
              animation={{ enable: true, duration: 1100 }}
              xName="time"
              yName="v_sn_input"
              type="Spline"
              name="SN Input"
              width={2}
            ></SeriesDirective>
            {/* Spline for v_tn_input */}
            <SeriesDirective
              marker={{
                visible: false,
                width: 5,
                height: 5,
                isFilled: true,
                dataLabel: {
                  format: "n1",
                  name: "text",
                  font: "Outfit",
                  visible: false,
                },
              }}
              dataSource={chartData}
              animation={{ enable: true, duration: 1100 }}
              xName="time"
              yName="v_tn_input"
              type="Spline"
              name="TN Input"
              width={2}
            ></SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      )}
    </>
  );
};

export default RealTimeVoltageInputSplineChart;
