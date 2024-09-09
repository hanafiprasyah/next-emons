"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

const Marker = ({ lat, lot, name, content, signal = false }) => {
  // marker state
  const [markerRef, marker] = useAdvancedMarkerRef();

  // popup info state
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  /**
   * Running: #37cc21 *
   * Disconnected: #cc2310 * (DEFAULT)
   */
  const [colorPin, setColorPin] = useState("#cc2310");

  // clicking the marker will toggle the infowindow
  const handleMarkerClick = useCallback(
    () => setInfoWindowShown((isShown) => !isShown),
    []
  );

  // if the maps api closes the infowindow, we have to synchronize our state
  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  useEffect(() => {
    if (signal) {
      setColorPin("#37cc21");
    } else {
      setColorPin("#cc2310");
    }
  }, [signal]);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: lat, lng: lot }}
        clickable={true}
        onClick={handleMarkerClick}
        title={name}
        draggable={false}
      >
        <Pin background={colorPin} glyphColor={"#000"} borderColor={"#000"} />
      </AdvancedMarker>
      {infoWindowShown && (
        <InfoWindow anchor={marker} onClose={handleClose}>
          <h2 className="font-bold text-sky-700 text-md">{name}</h2>
          <p className="text-sm font-normal text-gray-800">{content}</p>
        </InfoWindow>
      )}
    </>
  );
};

export default Marker;
