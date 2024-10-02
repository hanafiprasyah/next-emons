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
} from "@syncfusion/ej2-react-charts";

const RealTimeVoltageSplineChart = ({ title, alt }) => {
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

  return (
    <ChartComponent
      id="charts"
      background="#FFF"
      title="Real-time Voltage Spline Chart"
      primaryXAxis={{
        valueType: "Category",
        title: "Time",
        intervalType: "Seconds",
        labelIntersectAction: "Rotate45",
      }}
      primaryYAxis={{ labelFormat: "{value}V" }}
      tooltip={{ enable: true }}
      margin={{
        top: 0,
        bottom: 20,
        right: 20,
        left: 20,
      }}
      loaded={(args) => {
        if (chartData.length > 100) {
          args.chart.primaryXAxis.zoomPosition = 1 - 100 / chartData.length; // Shift X-axis range
        }
      }}
    >
      <Inject services={[LineSeries, Category, Legend, Tooltip, DataLabel]} />
      <SeriesCollectionDirective>
        {/* Spline for v_rn_input */}
        <SeriesDirective
          marker={{ visible: true, width: 10, height: 10 }}
          dataSource={chartData}
          xName="time"
          yName="v_rn_input"
          type="Line"
          name="V_RN Input"
          width={2}
        ></SeriesDirective>
        {/* Spline for v_sn_input */}
        <SeriesDirective
          marker={{ visible: true, width: 10, height: 10 }}
          dataSource={chartData}
          xName="time"
          yName="v_sn_input"
          type="Line"
          name="V_SN Input"
          width={2}
        ></SeriesDirective>
        {/* Spline for v_tn_input */}
        <SeriesDirective
          marker={{ visible: true, width: 10, height: 10 }}
          dataSource={chartData}
          xName="time"
          yName="v_tn_input"
          type="Line"
          name="V_TN Input"
          width={2}
        ></SeriesDirective>
        {/* Spline for v_rn_output */}
        <SeriesDirective
          marker={{ visible: true, width: 10, height: 10 }}
          dataSource={chartData}
          xName="time"
          yName="v_rn_output"
          type="Line"
          name="V_RN Output"
          width={2}
        ></SeriesDirective>
        {/* Spline for v_sn_output */}
        <SeriesDirective
          marker={{ visible: true, width: 10, height: 10 }}
          dataSource={chartData}
          xName="time"
          yName="v_sn_output"
          type="Line"
          name="V_SN Output"
          width={2}
        ></SeriesDirective>
        {/* Spline for v_tn_output */}
        <SeriesDirective
          marker={{ visible: true, width: 10, height: 10 }}
          dataSource={chartData}
          xName="time"
          yName="v_tn_output"
          type="Line"
          name="V_TN Output"
          width={2}
        ></SeriesDirective>
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default RealTimeVoltageSplineChart;
