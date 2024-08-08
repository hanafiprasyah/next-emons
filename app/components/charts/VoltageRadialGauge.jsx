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
          <CircularGaugeComponent
            id={id}
            key={key}
            animationDuration={750}
            alt={alt}
            allowImageExport={true}
            ref={(g) => (gaugeInstance = g)}
            title={title}
            titleStyle={{
              color: "#fff",
              fontStyle: "medium",
              fontFamily: "quicksand",
            }}
            margin={{
              left: 16,
              right: 16,
              top: 16,
              bottom: 16,
            }}
            background="transparent"
            tooltip={{
              type: ["Pointer"],
              enable: true,
              enableAnimation: true,
              annotationSettings: { template: "<div>CircularGauge</div>" },
              rangeSettings: { fill: "blue" },
            }}
          >
            <Inject services={[Annotations, GaugeTooltip, ImageExport]} />
            <AxesDirective>
              <AxisDirective
                minimum={180}
                maximum={340}
                hideIntersectingLabel={true}
                labelStyle={{
                  hiddenLabel: "Last",
                  position: "Inside",
                  format: `{value} v`,
                  offset: 1,
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
                  height: 8,
                  width: 2,
                  position: "Inside",
                  offset: 5,
                }}
                minorTicks={{
                  interval: 5,
                  color: "#fff",
                  height: 4,
                  width: 2,
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
                    color="#e8e833"
                    start={0}
                    end={218}
                    radius="60%"
                    roundedCornerRadius={4}
                  ></RangeDirective>
                  <RangeDirective
                    color="#1bd155"
                    start={218}
                    end={224}
                    radius="60%"
                    roundedCornerRadius={4}
                  ></RangeDirective>
                  <RangeDirective
                    color="#e84a35"
                    start={224}
                    end={320}
                    radius="60%"
                    roundedCornerRadius={4}
                  ></RangeDirective>
                  <RangeDirective
                    color="#e84a35"
                    start={315}
                    end={450}
                    radius="60%"
                    roundedCornerRadius={4}
                  ></RangeDirective>
                </RangesDirective>
                <PointersDirective>
                  <PointerDirective
                    value={value}
                    animation={{ enable: true, duration: 500 }}
                    radius="75%"
                    markerHeight={5}
                    markerWidth={5}
                    pointerWidth={10}
                    linearGradient={{
                      startValue: "0%",
                      endValue: "100%",
                      colorStop: [
                        { color: "#fff", offset: "0%", opacity: 0.9 },
                        { color: "#fff", offset: "80%", opacity: 0.9 },
                      ],
                    }}
                    cap={{
                      radius: 9,
                      color: "white",
                      border: {
                        color: "#fff",
                        width: 0,
                      },
                    }}
                    needleTail={{
                      length: "14%",
                      linearGradient: {
                        startValue: "0%",
                        endValue: "100%",
                        colorStop: [
                          { color: "#fff", offset: "0%", opacity: 0.9 },
                          { color: "#fff", offset: "60%", opacity: 0.9 },
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
                    content={`<div><div><span> ${value} V</span></div></div>`}
                  />
                </AnnotationsDirective>
              </AxisDirective>
            </AxesDirective>
          </CircularGaugeComponent>
          {/* Export Button */}
          <button
            type="button"
            onClick={
              title == "Input" ? rnExportInputHandler : rnExportOutputHandler
            }
            className="inline-flex items-center px-3 py-2 mt-0 mb-4 md:mt-1.5 text-xs font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          >
            Export {alt} {title}
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
                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
              />
            </svg>
          </button>
        </>
      )}
    </>
  );
};

export default Default;
