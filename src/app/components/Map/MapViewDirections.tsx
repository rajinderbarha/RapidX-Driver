import React, { useContext, useRef } from "react";
import { Dimensions } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import { RideContext } from "../../../store/RideContext";
import { LocationContext } from "../../../store/LocationContext";
import calculateDistance from "../../../../util/calculateDistance";
import { ProfileContext } from "../../../store/ProfileContext";
import { driverLocationUpdate } from "../../../../util/socket";

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
  reff: React.RefObject<any>;
  color: string;
}

export default function AddMapViewDirections({
  origin,
  destination,
  reff,
  color,
}: DirectionProps) {

  const {setNearPickupLocation, setNearDropLocation, reachedPickupLocation} = useContext(RideContext)
const {setDistance} = useContext(LocationContext)
const {driverId} = useContext(ProfileContext)


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
        const currentLocation = result.legs[0].start_location;
        const endLocation = result.legs[0].end_location;
        const distance = calculateDistance(currentLocation,endLocation);
        console.log('result : ', distance)
        driverLocationUpdate(currentLocation, driverId)
        setDistance(distance.toFixed(2))
        if(reachedPickupLocation && distance < 0.100){
          setNearDropLocation(true)
        }
        if( distance < 0.050){
          setNearPickupLocation(true)
        }
        reff.current?.fitToCoordinates(result.coordinates, {
          edgePadding: {
            right: width / 20,
            bottom: height / 35,
            left: width / 20,
            top: height / 25,
          },
        });
      }}
      onError={(errorMessage) => {
        console.log("GOT AN ERROR", errorMessage);
      }}
    />
  );
}
