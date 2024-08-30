"use client";

import React, { useEffect, useState } from "react";
import {
  CircularGaugeComponent,
  AxesDirective,
  AxisDirective,
  PointersDirective,
  PointerDirective,
  RangesDirective,
  RangeDirective,
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
    gaugeInstance.export("PNG", `${alt} input`);
  }
  function rnExportOutputHandler() {
    gaugeInstance.export("PNG", `${alt} output`);
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
              {value === 0 ? (
                <div className="flex justify-center my-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="text-gray-200 size-4 lg:size-5 opacity-60"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.412 15.655 9.75 21.75l3.745-4.012M9.257 13.5H3.75l2.659-2.849m2.048-2.194L14.25 2.25 12 10.5h8.25l-4.707 5.043M8.457 8.457 3 3m5.457 5.457 7.086 7.086m0 0L21 21"
                    />
                  </svg>
                </div>
              ) : (
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
                        top: 100,
                        bottom: 100,
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
                          minimum={180}
                          maximum={340}
                          hideIntersectingLabel={true}
                          labelStyle={{
                            hiddenLabel: "Last",
                            position: "Outside",
                            format: `{value} V`,
                            offset: 0,
                            font: {
                              color: "white",
                              size: "10px",
                              fontWeight: "Normal",
                            },
                          }}
                          startAngle={0}
                          endAngle={360}
                          direction="ClockWise"
                          radius="100%"
                          majorTicks={{
                            interval: 10,
                            color: "#00379e",
                            height: 10,
                            width: 3,
                            position: "Inside",
                            offset: 0,
                          }}
                          minorTicks={{
                            interval: 5,
                            color: "#fff",
                            height: 4,
                            width: 1,
                            position: "Inside",
                            offset: 5,
                          }}
                          lineStyle={{
                            width: 0,
                            color: "",
                          }}
                        >
                          <RangesDirective>
                            <RangeDirective
                              start={0}
                              end={218}
                              startWidth={2}
                              endWidth={10}
                              radius="74%"
                              linearGradient={{
                                startValue: "0%",
                                endValue: "100%",
                                colorStop: [
                                  {
                                    color: "#e8e833",
                                    offset: "90%",
                                    opacity: 0.9,
                                  },
                                  {
                                    color: "#1bd155",
                                    offset: "100%",

                                    opacity: 0.9,
                                  },
                                ],
                              }}
                              // roundedCornerRadius={4}
                            ></RangeDirective>
                            <RangeDirective
                              start={218.3}
                              end={224}
                              radius="74%"
                              linearGradient={{
                                startValue: "0%",
                                endValue: "100%",
                                colorStop: [
                                  {
                                    color: "#1bd155",
                                    offset: "0%",
                                    opacity: 0.9,
                                  },
                                  {
                                    color: "#1bd155",
                                    offset: "100%",

                                    opacity: 0.9,
                                  },
                                ],
                              }}
                              // roundedCornerRadius={4}
                            ></RangeDirective>
                            <RangeDirective
                              color="#e84a35"
                              start={224.3}
                              end={320}
                              radius="74%"
                              endWidth={10}
                              startWidth={2}
                              // roundedCornerRadius={4}
                            ></RangeDirective>
                            <RangeDirective
                              color="#e84a35"
                              start={320}
                              end={450}
                              radius="74%"
                              endWidth={10}
                              startWidth={10}
                              // roundedCornerRadius={4}
                            ></RangeDirective>
                          </RangesDirective>
                          <PointersDirective>
                            <PointerDirective
                              value={value}
                              animation={{ enable: true, duration: 500 }}
                              radius="60%"
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
                              content={`<div><div><span> ${value} V</span></div></div>`}
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
              )}
            </div>

            {/* Body */}
            <div className="flex items-center pb-3 gap-x-3">
              <div className="truncate grow">
                <p className="block text-sm font-semibold text-gray-800 truncate dark:text-neutral-200">
                  {value === 0 ? "Single Phase Device" : title}
                </p>
                <p className="block px-2 text-xs text-gray-500 truncate lg:px-4 dark:text-neutral-500 text-wrap text-clip">
                  {value === 0
                    ? `This ${alt} ${title} gauge meter will not be displayed if the device used is Single Phase`
                    : alt}
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
