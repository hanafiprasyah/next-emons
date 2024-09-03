"use client";
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

import React from "react";

export default function DeviceMap() {
  var mapsInstance;
  function clickHandler() {
    // mapsInstance.print();
    mapsInstance.export("PNG", "Maps");
  }

  return (
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
            animationDuration={500}
            shapeSettings={{ fill: "#00619e" }}
          >
            <MarkersDirective>
              <MarkerDirective
                latitudeValuePath={"latitude"}
                longitudeValuePath={"longitude"}
                // colorValuePath={"color"}
                visible={true}
                border={{ width: 0.5, color: "#FFF" }}
                height={20}
                width={20}
                fill="#16a34a"
                animationDuration={0}
                tooltipSettings={{
                  visible: true,
                  valuePath: "name",
                  duration: 3000,
                  format:
                    "<b>${name}</b></b><br/>Device Installed: <b>${deviceInstalled}</b>",
                }}
                highlightSettings={{
                  enable: true,
                  fill: "blue",
                  border: { color: "white", width: 1 },
                }}
                dataSource={cluster_map}
              ></MarkerDirective>
            </MarkersDirective>
          </LayerDirective>
        </LayersDirective>
      </MapsComponent>
    </>
  );
}
