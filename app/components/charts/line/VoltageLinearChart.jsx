import React, { useEffect, useState } from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
} from "@syncfusion/ej2-react-charts";

const Default = ({ id, key, alt, title }) => {
  const [loaded, isLoaded] = useState(true);
  const [bidData, setBidData] = useState([]);

  const fetchData = async () => {
    const response = await fetch("/api/monitoring/voltage/getlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://45.13.132.175/",
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

    return response.json();
  };

  useEffect(() => {
    setTimeout(() => {
      isLoaded(false);
    }, 500);

    fetchData().then((data) => {
      setBidData(data);
      console.log(data);
    });

    const timer = setInterval(() => {
      console.log("interval fetchData running..");
      fetchData().then((data) => {
        setBidData(data);
        console.log(data);
      });
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      {loaded ? (
        <div
          className="animate-spin inline-block size-3 border-[2px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          {/* Gauge Card */}
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
                  id={id}
                  key={key}
                  alt={alt}
                  // loaded={}
                  margin={{
                    top: 20,
                    bottom: 20,
                    right: 100,
                    left: 100,
                  }}
                >
                  <Inject services={[LineSeries]} />
                  <SeriesCollectionDirective>
                    <SeriesDirective
                      dataSource={[]}
                      xName="x"
                      yName="y"
                      type="Line"
                      width={1}
                      marker={{
                        visible: true,
                        dataLabel: {
                          visible: true,
                          position: "Top",
                          font: {
                            fontWeight: "600",
                          },
                        },
                      }}
                    ></SeriesDirective>
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
          {/* End Gauge Card */}
        </>
      )}
    </>
  );
};

export default Default;
