"use client";

import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const GoogleMapComponent = (props) => {
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

  // State to handle dynamic color for markers
  const [markerColors, setMarkerColors] = useState({});

  // Map container style
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

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
    // Simulating API data fetch and setting initial marker colors
    if (dataDev.length > 0) {
      const initialColors = {};
      dataDev.forEach((location) => {
        initialColors[location.id] = "red"; // Initial color is red
      });
      setMarkerColors(initialColors);
    }
  }, [dataDev]);

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

  // Function to toggle marker color
  const toggleMarkerColor = (locationId) => {
    setMarkerColors((prevColors) => ({
      ...prevColors,
      [locationId]: prevColors[locationId] === "red" ? "blue" : "red",
    }));
  };

  // Custom marker icon
  const getMarkerIcon = (color) => ({
    path: google.maps.SymbolPath.CIRCLE,
    scale: 10,
    fillColor: color,
    fillOpacity: 1,
    strokeWeight: 2,
    strokeColor: "black",
  });

  return (
    <LoadScript
      id="google-maps"
      region="Asia"
      authReferrerPolicy="origin"
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      loadingElement={
        <div
          className="animate-spin inline-block size-3 border-[2px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      }
      onError={
        <div
          class="mt-2 bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500"
          role="alert"
          tabindex="-1"
          aria-labelledby="hs-soft-color-danger-label"
        >
          <span id="hs-soft-color-danger-label" class="font-bold">
            Danger
          </span>{" "}
          This page does not load Google Maps correctly!
        </div>
      }
    >
      <GoogleMap
        center={{ lat: -6.345678637232396, lng: 106.8737572296187 }}
        clickableIcons={true}
        mapContainerStyle={containerStyle}
        zoom={20}
      >
        {props.isMarkerShown &&
          dataDev.map((location, index) => (
            <Marker
              key={index}
              clickable={true}
              draggable={false}
              position={{
                lat: location.lat,
                lng: location.lot,
              }}
              label={location.name}
              icon={getMarkerIcon(markerColors[location.id] || "red")}
              onClick={() => toggleMarkerColor(location.id)}
            />
          ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
