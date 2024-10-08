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
import useSWR from "swr";

const fetcher = async (url) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      tenant: "alif",
      token: process.env.AUTH_TOKEN,
    },
    body: JSON.stringify({
      locationid: 106,
      lane: "",
      status: "",
      value: "",
      side: "",
      start_trancation_date: "",
      end_trancation_date: "",
      tenant: "alif",
    }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const result = await response.json();
  return result.energy["data"].map((item) => ({
    time: new Date(item.send_date).toLocaleTimeString(),
    // KWH input
    kwh_r_input: item.kwh_r_input,
    kwh_s_input: item.kwh_s_input,
    kwh_t_input: item.kwh_t_input,
    kwh_total_input: item.kwh_total_input,
    // KWH output
    kwh_r_output: item.kwh_r_output,
    kwh_s_output: item.kwh_s_output,
    kwh_t_output: item.kwh_t_output,
    kwh_total_output: item.kwh_total_output,
    // KVARH input
    kvarh_r_input: item.kvarh_r_input,
    kvarh_s_input: item.kvarh_s_input,
    kvarh_t_input: item.kvarh_t_input,
    kvarh_total_input: item.kvarh_total_input,
    // KVARH output
    kvarh_r_output: item.kvarh_r_output,
    kvarh_s_output: item.kvarh_s_output,
    kvarh_t_output: item.kvarh_t_output,
    kvarh_total_output: item.kvarh_total_output,
  }));
};

const EnergyKWHLinearChart = ({ id, name, chartType }) => {
  const [chartData, setChartData] = useState([]);

  const {
    data: newData,
    isLoading,
    error,
  } = useSWR("/api/monitoring/energy/getdata", fetcher, {
    refreshInterval: 2000,
    dedupingInterval: 500,
    refreshWhenHidden: true,
    refreshWhenOffline: false,
    errorRetryInterval: 1000,
    errorRetryCount: 10,
    shouldRetryOnError: true,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (newData) {
      setChartData((prevData) => {
        // Keep only the last 100 data points by removing the first one when a new one is added
        const updatedData = [...prevData, ...newData];
        return updatedData.length > 100 ? updatedData.slice(1) : updatedData;
      });
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
    <ChartComponent
      id={id}
      name={name}
      alt="Energy EMONS Chart"
      titleStyle={{ color: "white", fontFamily: "Outfit" }}
      border={{ width: 0 }}
      chartArea={{ opacity: 0 }}
      theme="TailwindDark"
      background="transparent"
      enableAnimation={true}
      enableCanvas={false}
      width="100%"
      height="140px"
      tooltip={{
        enable: true,
        fill: "#333",
        shared: true,
        roundedCorner: { radius: 10 },
        header: "Energy KWH Data",
        textStyle: {
          color: "#fff",
          fontWeight: "light",
          fontSize: "12px",
          fontFamily: "Outfit",
        },
        format: "${point.y} KWH at ${point.x}",
      }}
      crosshair={{
        enable: true,
        lineType: "Vertical",
        dashArray: "2,2",
      }}
      primaryXAxis={{
        // title: "Time",
        visible: false,
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
        labelFormat: "{value}",
        // title: "Energy",
        visible: false,
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
        lineStyle: { width: 0, color: "white" },
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
        right: 0,
        left: 0,
      }}
      legendSettings={{
        visible: false,
        alignment: "Center",
        position: "Bottom",
        textWrap: "Wrap",
        containerPadding: { top: 0, bottom: 0 },
        maximumLabelWidth: 50,
        shapeHeight: 8,
        shapeWidth: 8,
        textStyle: { fontFamily: "Outfit", color: "white", size: "10px" },
      }}
      loaded={(args) => {
        if (chartData && chartData.length > 100) {
          args.chart.primaryXAxis.zoomPosition = 1 - 100 / chartData.length; // Shift X-axis range
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
        {/* =========== KWH */}
        {/* Spline for kwh_r_Input */}
        <SeriesDirective
          opacity={chartType === "energy-kwh-input" ? 1 : 0}
          dataSource={chartType === "energy-kwh-input" ? chartData : []}
          animation={{ enable: true, duration: 1100 }}
          xName="time"
          yName="kwh_r_input"
          type="Spline"
          name="KWH R Input"
          width={2}
          fill="#3b82f6"
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
        ></SeriesDirective>
        {/* Spline for kwh_s_Input */}
        <SeriesDirective
          opacity={chartType === "energy-kwh-input" ? 1 : 0}
          dataSource={chartType === "energy-kwh-input" ? chartData : []}
          animation={{ enable: true, duration: 1100 }}
          xName="time"
          yName="kwh_s_input"
          type="Spline"
          name="KWH S Input"
          width={2}
          fill="#6366f1"
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
        ></SeriesDirective>
        {/* Spline for kwh_t_Input */}
        <SeriesDirective
          opacity={chartType === "energy-kwh-input" ? 1 : 0}
          dataSource={chartType === "energy-kwh-input" ? chartData : []}
          animation={{ enable: true, duration: 1100 }}
          xName="time"
          yName="kwh_t_input"
          type="Spline"
          name="KWH T Input"
          width={2}
          fill="#10b981"
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
        ></SeriesDirective>
        {/* Spline for kwh_r_Output */}
        <SeriesDirective
          opacity={chartType === "energy-kwh-input" ? 0 : 1}
          dataSource={chartType === "energy-kwh-input" ? [] : chartData}
          animation={{ enable: true, duration: 1100 }}
          xName="time"
          yName="kwh_r_output"
          type="Spline"
          name="KWH R Output"
          width={2}
          fill="#3b82f6"
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
        ></SeriesDirective>
        {/* Spline for kwh_s_Output */}
        <SeriesDirective
          opacity={chartType === "energy-kwh-input" ? 0 : 1}
          dataSource={chartType === "energy-kwh-input" ? [] : chartData}
          animation={{ enable: true, duration: 1100 }}
          xName="time"
          yName="kwh_s_output"
          type="Spline"
          name="KWH S Output"
          width={2}
          fill="#6366f1"
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
        ></SeriesDirective>
        {/* Spline for kwh_t_Output */}
        <SeriesDirective
          opacity={chartType === "energy-kwh-input" ? 0 : 1}
          dataSource={chartType === "energy-kwh-input" ? [] : chartData}
          animation={{ enable: true, duration: 1100 }}
          xName="time"
          yName="kwh_t_output"
          type="Spline"
          name="KWH T Output"
          width={2}
          fill="#10b981"
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
        ></SeriesDirective>
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default EnergyKWHLinearChart;
