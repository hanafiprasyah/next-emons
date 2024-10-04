import React, { useEffect, useState } from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  Category,
  Legend,
  Tooltip,
  DataLabel,
  Crosshair,
} from "@syncfusion/ej2-react-charts";

const RealTimeVoltageSplineChart = () => {
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const [chartData, setChartData] = useState([]);

  const fetchData = async () => {
    setLoading(true); // Set loading to true when fetching data
    setError(null); // Reset error before making the request

    try {
      const response = await fetch("/api/monitoring/voltage/getdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": `${process.env.BASE_URL}/`,
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers":
            "Content-Type, Accept, Origin, X-Requested-With",
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
        throw new Error(`Service returned ${response.status}`);
      }

      const result = await response.json();
      if (!result.voltage["data"] || !Array.isArray(result.voltage["data"])) {
        throw new Error("Invalid data format from API");
      }

      const data = result.voltage["data"];

      const formattedData = data.map((item) => ({
        time: new Date(item.send_date).toLocaleTimeString(),
        v_rn_input: item.v_rn_input,
        v_sn_input: item.v_sn_input,
        v_tn_input: item.v_tn_input,
        v_rn_output: item.v_rn_output,
        v_sn_output: item.v_sn_output,
        v_tn_output: item.v_tn_output,
      }));

      setChartData((prevData) => {
        // Keep only the last 100 data points by removing the first one when a new one is added
        const updatedData = [...prevData, ...formattedData];
        return updatedData.length > 100 ? updatedData.slice(1) : updatedData;
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false); // End loading regardless of success or failure
    }
  };

  useEffect(() => {
    fetchData();

    // Fetch data at regular intervals (for real-time effect)
    const intervalId = setInterval(fetchData, 3000); // Fetch every 3 seconds

    // Cleanup the interval when component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
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
        <button
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          onClick={fetchData}
        >
          Retry
        </button>
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
    <ChartComponent
      id="voltage-chart"
      alt="Voltage EMONS Chart"
      titleStyle={{ color: "white", fontFamily: "Outfit" }}
      border={{ width: 0 }}
      chartArea={{ opacity: 0 }}
      theme="TailwindDark"
      background="transparent"
      enableCanvas="true"
      tooltip={{
        enable: true,
        shared: true,
        format: "${series.name} : ${point.x} - ${point.y}",
        // template: template,
        // location: { x: 80, y: 85 },
      }}
      crosshair={{
        enable: true,
        lineType: "Vertical",
      }}
      enableAnimation={true}
      primaryXAxis={{
        // title: "Time",
        titlePadding: 10,
        labelPadding: 10,
        titleStyle: {
          fontFamily: "Outfit",
          color: "white",
        },
        valueType: "Category",
        labelFormat: "hms",
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorGridLines: { width: 0 },
        minorTickLines: { width: 0 },
        lineStyle: { width: 1, color: "white" },
        skeletonType: "Time",
        startFromZero: true,
        startAngle: 0,
        intervalType: "Seconds",
        labelIntersectAction: "Rotate45",
        labelStyle: {
          opacity: 0,
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
      loaded={(args) => {
        if (chartData.length > 100) {
          args.chart.primaryXAxis.zoomPosition = 1 - 100 / chartData.length; // Shift X-axis range
        }
      }}
      legendSettings={{
        visible: true,
        position: "Top",
        textWrap: "Wrap",
      }}
    >
      <Inject
        services={[LineSeries, Category, Legend, Tooltip, DataLabel, Crosshair]}
      />
      <SeriesCollectionDirective>
        {/* Spline for v_rn_input */}
        <SeriesDirective
          marker={{
            visible: true,
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
          xName="time"
          yName="v_rn_input"
          type="Line"
          name="RN Input"
          width={2}
        ></SeriesDirective>
        {/* Spline for v_sn_input */}
        <SeriesDirective
          marker={{
            visible: true,
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
          xName="time"
          yName="v_sn_input"
          type="Line"
          name="SN Input"
          width={2}
        ></SeriesDirective>
        {/* Spline for v_tn_input */}
        <SeriesDirective
          marker={{
            visible: true,
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
          xName="time"
          yName="v_tn_input"
          type="Line"
          name="TN Input"
          width={2}
        ></SeriesDirective>
        {/* Spline for v_rn_output */}
        <SeriesDirective
          marker={{
            visible: true,
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
          xName="time"
          yName="v_rn_output"
          type="Line"
          name="RN Output"
          width={2}
        ></SeriesDirective>
        {/* Spline for v_sn_output */}
        <SeriesDirective
          marker={{
            visible: true,
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
          xName="time"
          yName="v_sn_output"
          type="Line"
          name="SN Output"
          width={2}
        ></SeriesDirective>
        {/* Spline for v_tn_output */}
        <SeriesDirective
          marker={{
            visible: true,
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
          xName="time"
          yName="v_tn_output"
          type="Line"
          name="TN Output"
          width={2}
        ></SeriesDirective>
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default RealTimeVoltageSplineChart;
