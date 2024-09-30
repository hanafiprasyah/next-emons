import React, { useEffect, useState } from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  SplineSeries,
  Legend,
  DateTime,
  Tooltip,
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
          locationid: 102,
          lane: "",
          status: "",
          value: "",
          side: "",
          start_trancation_date: "2024-09-02 15:00:00",
          end_trancation_date: "2024-09-02 16:00:00",
          tenant: "alif",
        }),
      });

      if (!response.ok) {
        throw new Error(`Service returned ${response.status}`);
      }

      const result = await response.json();
      if (!result.data || !Array.isArray(result.data)) {
        throw new Error("Invalid data format from API");
      }

      const data = result.data;

      const formattedData = data.map((item) => ({
        time: new Date(item.send_date), // Convert send_date to Date object
        v_rn_input: item.v_rn_input, // Input voltage readings
        v_sn_input: item.v_sn_input,
        v_tn_input: item.v_tn_input,
        v_rn_output: item.v_rn_output, // Output voltage readings
        v_sn_output: item.v_sn_output,
        v_tn_output: item.v_tn_output,
      }));

      setChartData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false); // End loading regardless of success or failure
    }
  };

  useEffect(() => {
    fetchData().then((data) => {
      if (process.env.NODE_ENV === "development") {
        console.log("fetchData is working..");
      }
    });

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
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col overflow-hidden transition-all duration-200 ease-in-out border dark:shadow-sm rounded-xl dark:bg-neutral-800 dark:border-transparent ${
        title === "Input"
          ? "hover:dark:border-red-500"
          : "hover:dark:border-emerald-500"
      } hover:dark:shadow-lg focus:dark:shadow-lg`}
    >
      <div className="relative group">
        {/* Gauge Device */}
        <div className="flex flex-col items-center justify-center h-full">
          <ChartComponent
            title="Real-time Voltage Spline Chart"
            primaryXAxis={{
              valueType: "DateTime",
              labelFormat: "hh:mm:ss",
              intervalType: "Seconds",
              edgeLabelPlacement: "Shift",
            }}
            primaryYAxis={{
              labelFormat: "{value} V",
            }}
            tooltip={true}
            margin={{
              top: 20,
              bottom: 20,
              right: 100,
              left: 100,
            }}
          >
            <Inject services={[SplineSeries, DateTime, Tooltip, Legend]} />
            <SeriesCollectionDirective>
              {/* Spline for v_rn_input */}
              <SeriesDirective
                dataSource={chartData}
                xName="time"
                yName="v_rn_input"
                type="Spline"
                name="V_RN Input"
                width={1}
              />
              {/* Spline for v_sn_input */}
              <SeriesDirective
                dataSource={chartData}
                xName="time"
                yName="v_sn_input"
                type="Spline"
                name="V_SN Input"
                width={2}
              />
              {/* Spline for v_tn_input */}
              <SeriesDirective
                dataSource={chartData}
                xName="time"
                yName="v_tn_input"
                type="Spline"
                name="V_TN Input"
                width={2}
              />
              {/* Spline for v_rn_output */}
              <SeriesDirective
                dataSource={chartData}
                xName="time"
                yName="v_rn_output"
                type="Spline"
                name="V_RN Output"
                width={2}
              />
              {/* Spline for v_sn_output */}
              <SeriesDirective
                dataSource={chartData}
                xName="time"
                yName="v_sn_output"
                type="Spline"
                name="V_SN Output"
                width={2}
              />
              {/* Spline for v_tn_output */}
              <SeriesDirective
                dataSource={chartData}
                xName="time"
                yName="v_tn_output"
                type="Spline"
                name="V_TN Output"
                width={2}
              />
            </SeriesCollectionDirective>
          </ChartComponent>
        </div>
        {/* End Gauge Device */}
      </div>

      {/* Body */}
      <div className="flex items-center pb-3 gap-x-3">
        <div className="truncate grow">
          <p className="block text-sm font-semibold text-gray-800 truncate dark:text-neutral-200">
            {title}
            {/* {res === 0 ? "Single Phase Device" : title} */}
          </p>
          <p className="block px-2 text-xs text-gray-500 truncate lg:px-4 dark:text-neutral-500 text-wrap text-clip">
            {alt}
            {/* {res === 0
                    ? `This ${alt} ${title} chart will not be displayed if the device used is Single Phase`
                    : alt} */}
          </p>
        </div>
      </div>
      {/* End Body */}
    </div>
  );
};

export default RealTimeVoltageSplineChart;
