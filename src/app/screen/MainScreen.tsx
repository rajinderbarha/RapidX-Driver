import { StyleSheet, Text, View, AppState } from "react-native";
import MainHeader from "../components/HEADER/MainHeader";
import Map from "../components/Map/Map";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
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
import io from "socket.io-client";
import { ProfileContext } from "../../store/ProfileContext";
import socket from "../../../util/socket";

const newSocket = socket;

const { height } = Dimensions.get("screen");
export default function MainScreen() {
  const [buttonBottomPosition, setButtonBottomPosition] = useState(20);
  const mapRef = useRef<MapView>(null);
  const { location } = useContext(LocationContext);
  const {
    rideConfirmed,
    nearDropLocation,
    isRideFinished,
    setIncomingRide,
    setRiderDetails,
    riderDetails
  } = useContext(RideContext);
  const { driverId } = useContext(ProfileContext);
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();

  console.log('rider :', riderDetails)
  // const [sockets, setSocket] = useState<any>();
  // const [rideRequest, setRideRequest] = useState(null);
  // const [isAccepted, setIsAccepted] = useState(false);
  // const [driverLocation, setDriverLocation] = useState<any>(null);
  // const [rideStatus, setRideStatus] = useState(null);

  // const rideDetails = {
  //   __v: 0,
  //   _id: "66e1413b3c005be03fa7a8ac",
  //   createdAt: "2024-09-11T07:05:31.414Z",
  //   distance: 15,
  //   dropAddress:
  //     "1517, Sector 69, Sahibzada Ajit Singh Nagar, Punjab 140301, India",
  //   duration: 20,
  //   extra_distance: 0,
  //   fares: 210,
  //   pickupAddress:
  //     "1844, To Kakhnour Chanjeri Machli Chunni Rd, Phase 5, Sector 59, Sahibzada Ajit Singh Nagar, Punjab 160059, India",
  //   status: "requested",
  //   updatedAt: "2024-09-11T07:05:31.414Z",
  //   user_destination: {
  //     latitude: 30.694002646587197,
  //     longitude: 76.71721715480089,
  //   },
  //   user_email: "",
  //   user_first_name: "Vv",
  //   user_id: "66e138c763b268e077150692",
  //   user_origin: { latitude: 30.718360263439823, longitude: 76.71129919588566 },
  //   waiting_time: 0,
  // };

  console.log("driver Id =", driverId);

  useEffect(() => {
    // const newSocket = socket;
    // setSocket(newSocket);

    // Emit event when driver comes online
    newSocket.emit(
      "driver-online",
      {
        driverId: driverId,
        location: {
          longitude: location?.coords.longitude, // Driver's starting longitude
          latitude: location?.coords.latitude, // Driver's starting latitude
        },
      },
      console.log("socket on")
    );

    // Handle incoming ride request
    newSocket.on("ride-request", (rideDetails: any) => {
      console.log("Ride request received:", rideDetails);
      setRiderDetails({
        userName: rideDetails.user_first_name,
        distance : rideDetails.distance,
        dropAddress : rideDetails.dropAddress,
        duration : rideDetails.duration,
        pickupAddress : rideDetails.pickupAddress,
        user_destination : rideDetails.user_destination,
        ride_id : rideDetails._id,
        user_origin : rideDetails.user_origin
      });
      setIncomingRide(true);
    });

    // Handle driver location updates from the server
    // newSocket.on('driver-location-updated', (location) => {
    //     console.log("Driver location updated:", location);
    //     setDriverLocation(location);
    // });

    // // Handle ride cancellation
    // newSocket.on('ride-cancelled', (data) => {
    //     console.log(`Ride ${data.rideId} was cancelled by ${data.cancelled_by}`);
    //     alert(`Ride has been cancelled by ${data.cancelled_by}.`);
    //     setRideRequest(null); // Reset the ride request state
    //     setIsAccepted(false); // Reset acceptance status
    // });

    // // Handle ride status updates
    // newSocket.on('ride-status-updated', (data) => {
    //     console.log(`Ride status updated: ${data.status}`);
    //     setRideStatus(data.status);

    //     if (data.status === 'completed') {
    //         alert('Ride has been completed!');
    //         setIsAccepted(false); // Reset the state after ride completion
    //     }
    // });

    // return () => {
    //     // Clean up event listeners and socket connection on component unmount
    //     // newSocket.off('ride-request');
    //     // newSocket.off('driver-location-updated');
    //     // newSocket.off('ride-cancelled');
    //     // newSocket.off('ride-status-updated');
    //     newSocket.disconnect();
    // };
  }, []);

  useEffect(() => {}, [socket]);

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
