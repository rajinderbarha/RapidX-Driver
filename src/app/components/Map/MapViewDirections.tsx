import React, { useRef } from "react";
import { Dimensions } from "react-native";
import MapViewDirections from "react-native-maps-directions";

const GOOGLE_API_kEY = "AIzaSyCV2NRNl0uVeY37ID1gIoYgJexr9SBDn2Q";
const { width, height } = Dimensions.get("window");

interface DirectionProps {
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  reff: any;
  color: string;
}

export default function AddMapViewDirections({
  origin,
  destination,
  reff,
  color,
}: DirectionProps) {
  const directionsRef = useRef();

  return (
    <MapViewDirections
      origin={{
        latitude: origin.latitude,
        longitude: origin.longitude,
      }}
      destination={{
        latitude: destination.latitude,
        longitude: destination.longitude,
      }}
      strokeWidth={4}
      strokeColor={color}
      optimizeWaypoints={true}
      apikey={GOOGLE_API_kEY} // Replace with your actual API key
      timePrecision="now"
      onStart={(params) => {
        console.log(
          `Started routing between "${params.origin}" and "${params.destination}"`
        );
      }}
      onReady={(result) => {
        reff.current?.fitToCoordinates(result.coordinates, {
          edgePadding: {
            right: width / 20,
            bottom: height / 20,
            left: width / 20,
            top: height / 20,
          },
        });
      }}
      onError={(errorMessage) => {
        console.log("GOT AN ERROR", errorMessage);
      }}
    />
  );
}
