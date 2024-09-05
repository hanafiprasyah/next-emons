"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
  useAdvancedMarkerRef,
  Pin,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

const Default = () => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoWindowShown, setInfoWindowShown] = useState(false);

  // clicking the marker will toggle the infowindow
  const handleMarkerClick = useCallback(
    () => setInfoWindowShown((isShown) => !isShown),
    []
  );

  // if the maps api closes the infowindow, we have to synchronize our state
  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  return (
    <APIProvider
      version="weekly"
      authReferrerPolicy="origin"
      region="ID"
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      onLoad={() => (
        <div
          className="animate-spin inline-block size-3 border-[2px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      )}
    >
      <Map
        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}
        renderingType="RASTER"
        defaultCenter={{ lat: -6.339751116240491, lng: 107.03895701470938 }}
        defaultZoom={30}
      >
        <>
          <AdvancedMarker
            ref={markerRef}
            position={{ lat: -6.339751116240491, lng: 107.03895701470938 }}
            onClick={handleMarkerClick}
            draggable={false}
          >
            <Pin
              background={"#FBBC04"}
              glyphColor={"#000"}
              borderColor={"#000"}
            />
          </AdvancedMarker>
          {infoWindowShown && (
            <InfoWindow anchor={marker} onClose={handleClose}>
              <h2 className="font-bold text-rose-500 text-md">Title</h2>
              <p className="text-sm font-normal text-gray-800">
                Some arbitrary html to be rendered into the InfoWindow.
              </p>
            </InfoWindow>
          )}
        </>
      </Map>
    </APIProvider>
  );
};

export default Default;
