import React, { PropsWithChildren } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView from "react-native-maps";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

interface MapProps {
  reff: React.RefObject<MapView>;
  markerType: string;
  children: React.ReactNode;
}

const defaultRegion = {
  latitude: 30.705085033867647,
  longitude: 76.71419969935869,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

export default function MapViewComponent({
  reff,
  markerType,
  children,
}: PropsWithChildren<MapProps>) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={defaultRegion}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={false}
        ref={reff}
        showsBuildings={false}
        moveOnMarkerPress={false}
      >
        {children}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
