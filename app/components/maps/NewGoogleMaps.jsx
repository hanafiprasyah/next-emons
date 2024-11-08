"use client";

import React, { useState, useEffect } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import dynamic from "next/dynamic";
import { useOnlineStatus } from "@/lib/hook/connection-hook";

const DynamicMarkerWithInfo = dynamic(() => import("./Marker"), {
  ssr: false,
});

const Default = ({
  mapData,
  mapError,
  mapLoading,
  deviceStatus,
  tenantRef,
}) => {
  // State to store selected device
  const [selectedDevice, setSelectDevice] = useState({
    lat: null,
    lot: null,
  });

  // Used to set map on loading state
  const [isMapLoading, setIsMapLoading] = useState(true);

  // TODO: Set devices location when data is available
  useEffect(() => {
    if (mapData) {
      setSelectDevice({
        lat: mapData?.loc.data[0].lat,
        lot: mapData?.loc.data[0].lot,
      });
    } else {
      setSelectDevice({
        lat: null,
        lot: null,
      });
      return;
    }

    // Cleanup function to reset state on unmount
    return () => {
      setSelectDevice({ lat: null, lot: null });
    };
  }, [mapData]);

  if (mapError) {
    return (
      <span className="text-sm text-white text-wrap text-clip">
        {`${mapError}`}
      </span>
    );
  }

  if (mapLoading) {
    return (
      <div
        className="animate-spin inline-block size-3 border-[2px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <APIProvider
      version="weekly"
      authReferrerPolicy="origin"
      region="ID"
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      onLoad={() =>
        !mapData || (!selectedDevice.lat && !selectedDevice.lot)
          ? setIsMapLoading(true)
          : setIsMapLoading(false)
      }
    >
      <Map
        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}
        renderingType="RASTER"
        // -0.6470361141413117, 115.40106170003429 => Center of Indonesia's Map
        defaultCenter={{
          lat: !selectedDevice?.lat
            ? -0.6470361141413117
            : parseFloat(selectedDevice?.lat),
          lng: !selectedDevice?.lot
            ? 115.40106170003429
            : parseFloat(selectedDevice?.lot),
        }}
        defaultZoom={mapData?.loc["data"].length > 1 ? 13.2 : 21.2}
        disableDefaultUI={true}
        clickableIcons={true}
        zoomControl={true}
        fullscreenControl={true}
        className="w-full h-[calc(100dvh-168px)] overflow-hidden rounded-md shadow-md md:shadow-lg lg:rounded-lg"
      >
        {mapData
          ? mapData?.loc["data"].map((location, index) =>
              location.parent != 0 ? (
                <DynamicMarkerWithInfo
                  key={`${location.code}-${index}`}
                  locationid={location.code}
                  tenantRef={tenantRef}
                  signal={deviceStatus}
                  lat={parseFloat(location.lat)}
                  lot={parseFloat(location.lot)}
                  markerLabel={location.name}
                  title={location.name}
                />
              ) : null
            )
          : null}
      </Map>
    </APIProvider>
  );
};

export default Default;
