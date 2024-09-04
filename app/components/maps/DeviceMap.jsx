"use client";

import React, { useState, useEffect } from "react";
import { world_map } from "./data-map";
import { cluster_map } from "./data-cluster";
import {
  MapsComponent,
  LayersDirective,
  LayerDirective,
  MarkersDirective,
  MarkerDirective,
  Marker,
  Inject,
  Zoom,
  MapsTooltip,
  Point,
  Highlight,
  ImageExport,
} from "@syncfusion/ej2-react-maps";

export default function DeviceMap() {
  // local Value
  const [localTenant, setLocalTenant] = useState("");

  // Used to set the /tool/dataside API
  const [dataLoc, setDataLoc] = useState([]);
  const [selectLoc, setSelectLoc] = useState([]);
  // const [selectLoc, setSelectLoc] = useState([10, 'Siloam Cibubur']);

  // Used to set the /tool/dataLocation API
  const [dataDev, setDataDev] = useState([]);
  const [selectDev, setSelectDev] = useState([]);
  // const [selectDev, setSelectDev] = useState([102, 'Ruang ICU Lt 3']);

  var mapsInstance;

  function clickHandler() {
    // mapsInstance.print();
    mapsInstance.export("PNG", "Maps");
  }

  // Function to fetch the /tool/dataside API
  const fetchSite = async (
    tenant,
    locationid,
    lane,
    status,
    value,
    side,
    start_trancation_date,
    end_trancation_date
  ) => {
    const response = await fetch("/api/tools/site/getsite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://45.13.132.175/",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers":
          "Content-Type, Accept, Origin, X-Requested-With",
        tenant: tenant,
        token: process.env.AUTH_TOKEN,
      },
      body: JSON.stringify({
        locationid: locationid ?? 0,
        lane: lane ?? "",
        status: status ?? "",
        value: value ?? "",
        side: side ?? "",
        start_trancation_date: start_trancation_date ?? "",
        end_trancation_date: end_trancation_date ?? "",
        tenant: tenant ?? "",
      }),
    });

    return response.json();
  };

  // Function to fetch the /tool/dataLocation API
  const fetchDevice = async (
    tenant,
    locationid,
    lane,
    status,
    value,
    side,
    start_trancation_date,
    end_trancation_date
  ) => {
    const response = await fetch("/api/tools/location/getlocation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://45.13.132.175/",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers":
          "Content-Type, Accept, Origin, X-Requested-With",
        tenant: tenant,
        token: process.env.AUTH_TOKEN,
      },
      body: JSON.stringify({
        locationid: locationid ?? 0,
        lane: lane ?? "",
        status: status ?? "",
        value: value ?? "",
        side: side ?? "0",
        start_trancation_date: start_trancation_date ?? "",
        end_trancation_date: end_trancation_date ?? "",
        tenant: tenant ?? "",
      }),
    });

    return response.json();
  };

  useEffect(() => {
    // Get local tenant item
    const currentUser = localStorage.getItem("tenant");
    if (localStorage.length != 0) {
      setLocalTenant(`${currentUser.toString()}`);
    }

    // TODO: fetch the site data
    fetchSite(
      currentUser,
      0,
      "",
      "",
      "",
      "",
      "2023-01-01 00:00:00",
      "2024-12-30 23:59:00"
    ).then((dataSite) => {
      if (process.env.NODE_ENV === "development") {
        console.log(dataSite.site["data"]);
      }

      if (dataSite.message == "OK") {
        setDataLoc(dataSite.site["data"]);
      }

      if (selectLoc.length != 0) {
        // TODO: fetch the device (location) [if selected]
        fetchDevice(
          currentUser,
          0,
          "",
          "",
          "",
          selectLoc.length === 0
            ? "0"
            : JSON.stringify(selectLoc[0]).toString(),
          "2023-01-01 00:00:00",
          "2024-12-30 23:59:00"
        ).then((dataLocation) => {
          if (process.env.NODE_ENV === "development") {
            console.log(dataLocation.loc["data"]);
          }

          if (dataLocation.message == "OK") {
            setDataDev([]);
            setDataDev(dataLocation.loc["data"]);
          }
        });
      } else {
        // TODO: fetch the device (location) [if NOT selected]
        fetchDevice(
          currentUser,
          0,
          "",
          "",
          "",
          "0",
          "2023-01-01 00:00:00",
          "2024-12-30 23:59:00"
        ).then((dataLocation) => {
          if (process.env.NODE_ENV === "development") {
            console.log(dataLocation.loc["data"]);
          }

          if (dataLocation.message == "OK") {
            setDataDev(dataLocation.loc["data"]);
          }
        });
      }
    });
  }, [selectLoc]);

  return (
    <>
      {dataDev.length === 0 ? (
        <div>
          <span className="inline-flex items-center px-2 py-1 text-xs text-gray-800 bg-gray-100 rounded-full gap-x-1 dark:bg-neutral-500/20 dark:text-neutral-400">
            <svg
              className="shrink-0 size-3"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
              <line x1="12" x2="12" y1="2" y2="12"></line>
            </svg>
            Loading the map
          </span>
        </div>
      ) : (
        <>
          {/* <button type="button" onClick={clickHandler}>
            Print
          </button> */}
          <MapsComponent
            id="maps"
            allowImageExport={true}
            ref={(g) => (mapsInstance = g)}
            zoomSettings={{
              enable: true,
              enablePanning: true,
              doubleClickZoom: false,
              mouseWheelZoom: false,
              shouldZoomInitially: true,
              enableSelectionZooming: true,
              maxZoom: 20,
              toolbarSettings: {
                buttonSettings: {
                  toolbarItems: ["ZoomIn", "ZoomOut", "Reset"],
                },
              },
            }}
            theme="TailwindDark"
            margin={{
              bottom: 0,
              left: 20,
              right: 20,
              top: 20,
            }}
          >
            <Inject
              services={[Marker, MapsTooltip, Zoom, Highlight, ImageExport]}
            />
            <LayersDirective>
              <LayerDirective
                shapeData={world_map}
                animationDuration={800}
                shapeSettings={{ fill: "#00619e" }}
              >
                <MarkersDirective>
                  <MarkerDirective
                    latitudeValuePath={"lat"}
                    longitudeValuePath={"lot"}
                    enableDrag={false}
                    visible={true}
                    border={{ width: 0.5, color: "#FFF" }}
                    height={20}
                    width={20}
                    fill="#16a34a"
                    animationDuration={500}
                    tooltipSettings={{
                      visible: true,
                      valuePath: "name",
                      duration: 3000,
                      format: "<b>${name}</b>",
                    }}
                    highlightSettings={{
                      enable: true,
                      opacity: 0.6,
                      fill: "#FFF",
                      border: { color: "white", width: 1 },
                    }}
                    dataSource={dataDev}
                  ></MarkerDirective>
                </MarkersDirective>
              </LayerDirective>
            </LayersDirective>
          </MapsComponent>
        </>
      )}
    </>
  );
}
