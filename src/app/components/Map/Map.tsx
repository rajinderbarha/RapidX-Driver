import React, { useContext } from "react";
import { StyleSheet, View, Image } from "react-native";
import MapView from "react-native-maps";
import AddMarker from "./AddMarker";
import AddMapViewDirections from "./MapViewDirections";
import MapViewComponent from "./MapViewComponent";
import { LocationContext } from "../../../store/LocationContext";
import { RideContext } from "../../../store/RideContext";
import GifImage from "./GifImage";

interface MapProps {
  location: {
    latitude: number;
    longitude: number;
  } | null;
  reff: React.RefObject<MapView>;
  markerType: string;
}

export default function Map({ reff, markerType }: MapProps) {
  const { location } = useContext(LocationContext);
  const { rideConfirmed, riderDetails, reachedPickupLocation } =
    useContext(RideContext);

    function currentDestination(): { latitude: number; longitude: number } | null {
      if (riderDetails) {
        if (reachedPickupLocation) {
          return {
            latitude: riderDetails.user_destination.latitude,
            longitude: riderDetails.user_destination.longitude,
          };
        } else {
          return {
            latitude: riderDetails.user_origin.latitude,
            longitude: riderDetails.user_origin.longitude,
          };
        }
      }
      return null;
    }

const destination = currentDestination()

  return (
    <MapViewComponent reff={reff} markerType={markerType}>
      {/* Placeholder for directions */}
      {location && rideConfirmed && riderDetails && destination &&(
        <AddMapViewDirections
          color="blue"
          reff={reff}
          origin={{
            latitude: location?.coords.latitude,
            longitude: location?.coords.longitude,
          }}
          destination={destination}
        />
      )}

      {riderDetails && (
        <AddMarker
          color={"#1979e7"}
          location={{
            latitude: riderDetails.user_origin.latitude,
            longitude: riderDetails.user_origin.longitude,
          }}
          image={
            <GifImage
              // style={styles.markerImage}
              source={require("../../../../assets/data/greenPulsee.gif")}
            />
          }
        />
      )}

{riderDetails && (
        <AddMarker
          color={"red"}
          location={{
            latitude: riderDetails.user_destination.latitude,
            longitude: riderDetails.user_destination.longitude,
          }}
          image={
            <GifImage
              // style={styles.markerImage}
              source={require("../../../../assets/data/redPulsee.gif")}
            />
          }
        />
      )}

      {/* Additional marker example */}
      <AddMarker
        color="brown"
        location={{ latitude: 0, longitude: 0 }}
        image={
          <Image
            style={styles.markerImage}
            source={require("../../../../assets/bike.png")}
          />
        }
      />
    </MapViewComponent>
  );
}

const styles = StyleSheet.create({
  markerImage: {
    width: 50,
    height: 50,
  },
});
