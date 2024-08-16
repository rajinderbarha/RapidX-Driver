import React from "react";
import { StyleSheet, View, Image } from "react-native";
import MapView from "react-native-maps";
import AddMarker from "./AddMarker";
import AddMapViewDirections from "./MapViewDirections";
import MapViewComponent from "./MapViewComponent";

interface MapProps {
  location: {
    latitude: number;
    longitude: number;
  } | null;
  reff: React.RefObject<MapView>;
  markerType: string;
}

export default function Map({ reff, markerType }: MapProps) {
  return (
    <MapViewComponent reff={reff} markerType={markerType}>
      {/* Placeholder for directions */}
      <AddMapViewDirections
        color="blue"
        reff={reff}
        origin={{ latitude: 0, longitude: 0 }}
        destination={{ latitude: 0, longitude: 0 }}
      />

      {/* Placeholder for markers */}
      <AddMarker
        color={"#1979e7"}
        location={{ latitude: 0, longitude: 0 }}
        image={<Image style={styles.markerImage} source={require("../../../../assets/bike.png")} />}
      />

      <AddMarker
        color={"red"}
        location={{ latitude: 0, longitude: 0 }}
        image={<Image style={styles.markerImage} source={require("../../../../assets/bike.png")} />}
      />

      {/* Additional marker example */}
      <AddMarker
        color="brown"
        location={{ latitude: 0, longitude: 0 }}
        image={<Image style={styles.markerImage} source={require("../../../../assets/bike.png")} />}
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
