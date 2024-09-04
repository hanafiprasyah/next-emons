"use client";

import React, { useState, useEffect } from "react";
import {
  MapsComponent,
  LayersDirective,
  LayerDirective,
  MarkersDirective,
  MarkerDirective,
  Inject,
  Zoom,
  Marker,
} from "@syncfusion/ej2-react-maps";

export default function OsmMap() {
  return (
    <MapsComponent
      zoomSettings={{
        enable: true,
        toolbarSettings: {
          buttonSettings: {
            toolbarItems: ["ZoomIn", "ZoomOut", "Reset"],
          },
        },
        zoomFactor: 4,
      }}
      centerPosition={{
        latitude: -2.2102129331700118,
        longitude: 120.06973976670227,
      }}
      margin={{
        bottom: 0,
        left: 20,
        right: 20,
        top: 20,
      }}
    >
      <Inject services={[Marker, Zoom]} />
      <LayersDirective>
        <LayerDirective urlTemplate="https://tile.openstreetmap.org/level/tileX/tileY.png">
          <MarkersDirective>
            <MarkerDirective
              visible={true}
              height={25}
              width={15}
              dataSource={[
                {
                  latitude: -6.339751116240491,
                  longtitude: 107.03895701470938,
                  name: "Siloam Cibubur",
                },
              ]}
            ></MarkerDirective>
          </MarkersDirective>
        </LayerDirective>
      </LayersDirective>
    </MapsComponent>
  );
}
