"use client";

import React, { useEffect, useState } from "react";
import {
  CircularGaugeComponent,
  AxesDirective,
  AxisDirective,
  PointersDirective,
  PointerDirective,
  Inject,
  Annotation,
  Annotations,
  AnnotationsDirective,
  AnnotationDirective,
  GaugeTooltip,
  ImageExport,
} from "@syncfusion/ej2-react-circulargauge";

const Default = ({ id, key, alt, title, value }) => {
  var gaugeInstance;

  const [loaded, isLoaded] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      isLoaded(false);
    }, 500);

    return () => loaded;
  }, [loaded]);

  function rnExportInputHandler() {
    gaugeInstance.export("PNG", `Current ${alt} input`);
  }
  function rnExportOutputHandler() {
    gaugeInstance.export("PNG", `Current ${alt} output`);
  }

  const load = (ILoadedEventArgs) => {};
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
              <>
                {/* Gauge Device */}
                <div className="flex flex-col items-center justify-center h-72">
                  <CircularGaugeComponent
                    id={id}
                    key={key}
                    animationDuration={800}
                    alt={alt}
                    allowImageExport={true}
                    ref={(g) => (gaugeInstance = g)}
                    // title={title}
                    // titleStyle={{
                    //   color: "#fff",
                    //   fontStyle: "medium",
                    //   fontFamily: "quicksand",
                    // }}
                    margin={{
                      left: 100,
                      right: 100,
                      top: 120,
                      bottom: 0,
                    }}
                    background="transparent"
                    tooltip={{
                      type: ["Pointer"],
                      enable: true,
                      enableAnimation: true,
                      annotationSettings: {
                        template: "<div>CircularGauge</div>",
                      },
                      rangeSettings: { fill: "blue" },
                    }}
                  >
                    <Inject
                      services={[Annotations, GaugeTooltip, ImageExport]}
                    />
                    <AxesDirective>
                      <AxisDirective
                        minimum={0}
                        maximum={250}
                        hideIntersectingLabel={true}
                        labelStyle={{
                          hiddenLabel: "None",
                          position: "Outside",
                          format: `{value} A`,
                          offset: 0,
                          font: {
                            color: "white",
                            size: "10px",
                            fontWeight: "Normal",
                          },
                        }}
                        startAngle={270}
                        endAngle={90}
                        direction="ClockWise"
                        radius="100%"
                        majorTicks={{
                          interval: 50,
                          color: "#00379e",
                          height: 10,
                          width: 3,
                          position: "Inside",
                          offset: 0,
                        }}
                        minorTicks={{
                          interval: 10,
                          color: "#fff",
                          height: 4,
                          width: 1,
                          position: "Inside",
                          offset: 5,
                        }}
                        lineStyle={{
                          width: 1,
                          color: "",
                        }}
                      >
                        <PointersDirective>
                          <PointerDirective
                            value={value}
                            animation={{ enable: true, duration: 500 }}
                            radius="80%"
                            markerHeight={6}
                            markerWidth={4}
                            pointerWidth={4}
                            linearGradient={{
                              startValue: "0%",
                              endValue: "100%",
                              colorStop: [
                                { color: "#fff", offset: "0%", opacity: 0.9 },
                                {
                                  color: "#fff",
                                  offset: "80%",
                                  opacity: 0.9,
                                },
                              ],
                            }}
                            cap={{
                              radius: 6,
                              color: "white",
                              border: {
                                color: "#fff",
                                width: 0,
                              },
                            }}
                            needleTail={{
                              length: "20%",
                              linearGradient: {
                                startValue: "0%",
                                endValue: "100%",
                                colorStop: [
                                  {
                                    color: "#fff",
                                    offset: "0%",
                                    opacity: 0.9,
                                  },
                                  {
                                    color: "#fff",
                                    offset: "60%",
                                    opacity: 0.9,
                                  },
                                ],
                              },
                            }}
                          ></PointerDirective>
                        </PointersDirective>
                        <AnnotationsDirective>
                          <AnnotationDirective
                            angle={0}
                            radius="-30%"
                            zIndex="1"
                            textStyle={{ size: "10px" }}
                            content={`<div><div><span> ${value} A</span></div></div>`}
                          />
                        </AnnotationsDirective>
                      </AxisDirective>
                    </AxesDirective>
                  </CircularGaugeComponent>
                </div>
                {/* End Gauge Device */}

                {/* More Dropdown */}
                <div className="absolute top-3 end-3 group-hover:opacity-100 lg:opacity-0">
                  <div className="p-0.5 sm:p-1 inline-flex items-center bg-white border border-gray-200 lg:shadow rounded-lg dark:bg-neutral-800 dark:border-neutral-700">
                    {/* Share Icon */}
                    <div className="inline-block hs-tooltip">
                      <button
                        type="button"
                        className="hs-tooltip-toggle size-[25px] lg:size-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                        onClick={
                          title == "Input"
                            ? rnExportInputHandler
                            : rnExportOutputHandler
                        }
                      >
                        <svg
                          className="shrink-0 size-3 lg:size-4"
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
                          <circle cx={18} cy={5} r={3} />
                          <circle cx={6} cy={12} r={3} />
                          <circle cx={18} cy={19} r={3} />
                          <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                          <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                        </svg>
                      </button>
                      <span
                        className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                        role="tooltip"
                      >
                        Share {alt} {title}
                      </span>
                    </div>
                    {/* End Share Icon */}
                  </div>
                </div>
                {/* End More Dropdown */}
              </>
            </div>

            {/* Body */}
            <div className="flex items-center pb-3 gap-x-3">
              <div className="truncate grow">
                <p className="block text-sm font-semibold text-gray-800 truncate dark:text-neutral-200">
                  {title}
                </p>
                <p className="block px-2 text-xs text-gray-500 truncate lg:px-4 dark:text-neutral-500 text-wrap text-clip">
                  {alt}
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
