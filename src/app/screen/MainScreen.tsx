import { StyleSheet, Text, View } from "react-native";
import MainHeader from "../components/HEADER/MainHeader";
import Map from "../components/Map/Map";
import { useRef, useState } from "react";
import MapView from "react-native-maps";
import MyLocationButton from "../../ui/MyLocationButton";

export default function MainScreen(){
    const [buttonBottomPosition, setButtonBottomPosition] = useState(20);
    const mapRef = useRef<MapView>(null);


    function myLocationButtonHandler() {
        // if (location && mapRef.current) {
        //   mapRef.current.animateToRegion({
        //     latitude: location.coords.latitude,
        //     longitude: location.coords.longitude,
        //     latitudeDelta: 0.0222,
        //     longitudeDelta: 0.0221,
        //   });
        //   console.log(location);
        // }
      }

  return (
    <View style={styles.container}>
    <View style={styles.headerContainer}>
      <MainHeader />
    </View>
    <View style={styles.mapContainer}>
      <Map
        markerType={"pickUp"}
        location={null}
        reff={mapRef}
      />
    </View>
    <MyLocationButton
      onPress={myLocationButtonHandler}
      style={{ bottom: buttonBottomPosition }}
    />
  </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#5c5858",
    },
    headerContainer: {
      position: "absolute",
      top: 10,
      left: 0,
      right: 0,
      zIndex: 20,
    },
    mapContainer: {
      flex: 1,
    },
  });
  