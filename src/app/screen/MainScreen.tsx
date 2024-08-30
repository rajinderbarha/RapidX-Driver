import { StyleSheet, Text, View } from "react-native";
import MainHeader from "../components/HEADER/MainHeader";
import Map from "../components/Map/Map";
import { useCallback, useContext, useRef, useState } from "react";
import MapView from "react-native-maps";
import MyLocationButton from "../../ui/MyLocationButton";
import { LocationContext } from "../../store/LocationContext";
import { RideContext } from "../../store/RideContext";
import OnBookedRideModal from "../components/BottomModals/OnFinishedRideModal";
import { Dimensions } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import SelectLocationButton from "../../ui/SelectLocationButton";
import OrangeButton from "../../ui/OrangeButton";
import OnFinishedRideModal from "../components/BottomModals/OnFinishedRideModal";
import RatingModal from "../components/OnScreenModals/RatingModal";

const { height } = Dimensions.get("screen");
export default function MainScreen() {
  const [buttonBottomPosition, setButtonBottomPosition] = useState(20);
  const mapRef = useRef<MapView>(null);
  const { location } = useContext(LocationContext);
  const { rideConfirmed, nearDropLocation , isRideFinished} = useContext(RideContext);
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();

  const handleModalChange = useCallback((index: any) => {
    const modalHeight = index === 0 ? 0.3 : 0.6; // Update according to your snap points
    setButtonBottomPosition(modalHeight * height + 20); // Adjust button position based on modal height
  }, []);

  function myLocationButtonHandler() {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0221,
      });
      console.log(location);
    }
  }

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <MainHeader />
        </View>
        <View style={styles.mapContainer}>
          <Map markerType={"pickUp"} location={null} reff={mapRef} />
          {rideConfirmed && (
            <OrangeButton
              onPress={() => {
                navigation.navigate("Current Ride Details");
              }}
              text="Current Ride Details"
              style={{
                position: "absolute",
                bottom: 80, // Adjust this based on where you want it
                left: 20,
                right: 20,
                zIndex: 10, // You can reduce this value
                // elevation: 5, // Lower this if necessary
                pointerEvents: "box-none", // Ensure button interactions work,
                // width : '80%',
                // alignSelf : 'center',
                marginHorizontal: "15%",
              }}
            />
          )}
          {nearDropLocation && (
            <OnFinishedRideModal
              onChange={handleModalChange}
              isFocused={isFocused}
            />
          )}
       <RatingModal isVisible={isRideFinished} />
        </View>
        <MyLocationButton
          onPress={myLocationButtonHandler}
          style={{ bottom: buttonBottomPosition }}
        />
      </View>
    </BottomSheetModalProvider>
  );
}

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
