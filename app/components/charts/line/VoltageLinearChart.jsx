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
};

const RealTimeVoltageSplineChart = () => {
  const [chartData, setChartData] = useState([]);
  const [threePhase, setThreePhase] = useState(false);

  const {
    data: newData,
    isLoading,
    error,
  } = useSWR("/api/monitoring/voltage/getdata", fetcher, {
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

  const template = tooltipTemplate;
  function tooltipTemplate(args) {
    return (
      <>
        {/* Top Countries Card */}
        <div className="flex flex-col h-full bg-white border shadow-sm border-stone-200 rounded-xl dark:bg-neutral-800/95 dark:border-neutral-700">
          {/* Header */}
          <div className="flex items-center pb-0 justify-evenly">
            <h2 className="inline-block mt-5 font-semibold text-stone-800 dark:text-neutral-200">
              Voltage
            </h2>
            <span className="mt-5 text-xs font-light text-gray-400">
              {args.x}
            </span>
          </div>
          {/* End Header */}
          {/* Body */}
          <div className="flex flex-col justify-between h-full px-5 pb-5">
            <div className="flex items-center py-3 mt-4 text-sm text-stone-800 before:flex-1 before:border-stone-200 before:me-3 after:flex-1 after:border-stone-200 after:ms-3 dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600">
              <span className="py-1 ps-1.5 pe-2.5 inline-flex items-center gap-x-1.5 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                <svg
                  className="shrink-0 size-3"
                  width={8}
                  height={8}
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                <strong>
                  {parseInt(args.y) >= 200 && parseInt(args.y) < 240
                    ? "Good"
                    : "Bad"}
                </strong>
              </span>
            </div>
            <p className="mt-1 text-sm text-stone-500 dark:text-neutral-200">
              Voltage value is {args.y}
            </p>
          </div>
          {/* End Body */}
        </div>
        {/* End Top Countries Card */}
      </>
    );
  }

  return (
    <>
      {threePhase ? (
        <ChartComponent
          id="voltage-chart"
          alt="Voltage EMONS Chart"
          titleStyle={{ color: "white", fontFamily: "Outfit" }}
          border={{ width: 0 }}
          chartArea={{ opacity: 0 }}
          theme="TailwindDark"
          background="transparent"
          enableAnimation={true}
          enableCanvas={true}
          width="100%"
          height="370px"
          tooltip={{
            enable: true,
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
            format: "${series.name} : ${point.y}",
            // template: template,
            // location: { x: 80, y: 85 },
          }}
          crosshair={{
            enable: true,
            lineType: "Vertical",
          }}
          primaryXAxis={{
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
              opacity: 1,
              color: "white",
              fontFamily: "Outfit",
              size: "10px",
            },
          }}
          primaryYAxis={{
            labelFormat: "{value} V",
            title: "Voltage",
            titlePadding: 10,
            labelPadding: 10,
            titleStyle: {
              fontFamily: "Outfit",
              color: "white",
            },
            crosshairTooltip: { enable: false, fill: "green" },
            majorGridLines: { width: 0.5, color: "white", dashArray: "2px" },
            majorTickLines: { width: 0 },
            minorGridLines: { width: 0, color: "white" },
            minorTickLines: { width: 0 },
            lineStyle: { width: 0.5, color: "white" },
            labelStyle: {
              color: "white",
              fontFamily: "Outfit",
              size: "10px",
            },
          }}
          margin={{
            top: 40,
            bottom: 20,
            right: 30,
            left: 20,
          }}
          legendSettings={{
            visible: true,
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
            {/* Spline for v_rn_output */}
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
              yName="v_rn_output"
              type="Spline"
              name="RN Output"
              width={2}
            ></SeriesDirective>
            {/* Spline for v_sn_output */}
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
              yName="v_sn_output"
              type="Spline"
              name="SN Output"
              width={2}
            ></SeriesDirective>
            {/* Spline for v_tn_output */}
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
              yName="v_tn_output"
              type="Spline"
              name="TN Output"
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
            {/* Spline for v_rs_output */}
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
              yName="v_rs_output"
              type="Spline"
              name="RS Output"
              width={2}
            ></SeriesDirective>
            {/* Spline for v_st_output */}
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
              yName="v_st_output"
              type="Spline"
              name="ST Output"
              width={2}
            ></SeriesDirective>
            {/* Spline for v_rt_output */}
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
              yName="v_rt_output"
              type="Spline"
              name="RT Output"
              width={2}
            ></SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      ) : (
        <ChartComponent
          id="voltage-chart"
          alt="Voltage EMONS Chart"
          titleStyle={{ color: "white", fontFamily: "Outfit" }}
          border={{ width: 0 }}
          chartArea={{ opacity: 0 }}
          theme="TailwindDark"
          background="transparent"
          enableAnimation={true}
          enableCanvas={false}
          width="100%"
          tooltip={{
            enable: true,
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
            format: "${series.name} : ${point.y}",
            // template: template,
            // location: { x: 80, y: 85 },
          }}
          crosshair={{
            enable: true,
            lineType: "Vertical",
          }}
          primaryXAxis={{
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
              opacity: 1,
              color: "white",
              fontFamily: "Outfit",
              size: "10px",
            },
          }}
          primaryYAxis={{
            labelFormat: "{value} V",
            title: "Voltage",
            titlePadding: 10,
            labelPadding: 10,
            titleStyle: {
              fontFamily: "Outfit",
              color: "white",
            },
            crosshairTooltip: { enable: false, fill: "green" },
            majorGridLines: { width: 0.5, color: "white", dashArray: "2px" },
            majorTickLines: { width: 0 },
            minorGridLines: { width: 0, color: "white" },
            minorTickLines: { width: 0 },
            lineStyle: { width: 0.5, color: "white" },
            labelStyle: {
              color: "white",
              fontFamily: "Outfit",
              size: "10px",
            },
          }}
          margin={{
            top: 40,
            bottom: 20,
            right: 30,
            left: 20,
          }}
          legendSettings={{
            visible: true,
            alignment: "Center",
            position: "Top",
            textWrap: "Wrap",
            containerPadding: { top: 10, bottom: 10 },
            maximumLabelWidth: 50,
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
            {/* Spline for v_rn_output */}
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
              yName="v_rn_output"
              type="Spline"
              name="RN Output"
              width={2}
            ></SeriesDirective>
            {/* Spline for v_sn_output */}
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
              yName="v_sn_output"
              type="Spline"
              name="SN Output"
              width={2}
            ></SeriesDirective>
            {/* Spline for v_tn_output */}
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
              yName="v_tn_output"
              type="Spline"
              name="TN Output"
              width={2}
            ></SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      )}
    </>
  );
};

export default RealTimeVoltageSplineChart;
