// useMapBox.ts

import { useState } from "react";

async function getGeocode(address: string, access_token: string) {
  try {
    const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
      address
    )}&limit=1&proximity=ip&access_token=${access_token}`;
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error("Error fetching geocode:", error);
    throw error;
  }
}

async function getDistance(
  origin: string,
  destination: string,
  access_token: string
) {
  try {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin};${destination}?alternatives=false&geometries=geojson&overview=simplified&steps=false&access_token=${access_token}`;
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error("Error fetching distance:", error);
    throw error;
  }
}

export const useMapBox = () => {
  const fetchGeocode = async (address: string, order: "first" | "second") => {
    try {
      const formattedAddress = encodeURIComponent(address);
      const city = address
        .split(",")[2]
        ?.trim()
        .replace(/\bCity\b/g, "")
        .trim();

      const fetchCoordinates = async (address: string) => {
        const geocode = await getGeocode(
          address,
          process.env.NEXT_PUBLIC_MAPBOX_API_KEY
        );
        const cityFromGeocode =
          geocode?.features[0]?.properties.place_formatted || "";
        if (cityFromGeocode.includes(city)) {
          return geocode.features[0]?.geometry?.coordinates;
        }
        return null;
      };

      let finalGeocode =
        (await fetchCoordinates(formattedAddress)) ||
        (await fetchCoordinates(address.substring(address.indexOf(",") + 1)));

      if (finalGeocode) {
        const coordinate = finalGeocode.join(",");
        return coordinate;
      }
    } catch (error) {
      console.error("Error fetching geocode:", error);
    }
  };

  const fetchDistance = async (
    coordinateOne: string,
    coordinateTwo: string
  ) => {
    try {
      const formattedC1 = coordinateOne.replace(/,/g, "%2C");
      const formattedC2 = coordinateTwo.replace(/,/g, "%2C");

      const distance = await getDistance(
        formattedC1,
        formattedC2,
        process.env.NEXT_PUBLIC_MAPBOX_API_KEY
      );

      return distance?.routes[0].distance / 1000;
    } catch (error) {
      console.error("Error fetching distance:", error);
      throw error;
    }
  };

  return {
    fetchDistance,
    fetchGeocode,
  };
};
