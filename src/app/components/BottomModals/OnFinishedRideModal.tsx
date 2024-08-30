import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, Pressable, View, Image } from "react-native";
import { Avatar, Button, Icon } from "@rneui/base";
import CustomBottomModal from "./CustomBottomModal";
import OrangeButton from "../../../ui/OrangeButton";
import { RideContext } from "../../../store/RideContext";
import { LocationContext } from "../../../store/LocationContext";
import { colors } from "../../../../constants/colors";
import getShortAddress from "../../../../util/getShortAddress";

interface iconProps {
  name: string;
  type: string;
}

const OnFinishedRideModal = ({ onChange, isFocused }: any) => {
  const navigation = useNavigation<any>();

  // const { pickupAddress, dropAddress, fare } = useContext(LocationContext);
  const { setReachedPickupLocation, riderDetails, setIsRideFinished } =
    useContext(RideContext);

  const snapPoints = ["10%", "30%"];

  const tripRoute = [
    { name: "Douglas Crescent Road", sub: "Venie" },
    { name: "Logan Avenue", sub: "Aura" },
  ];

  const pickupAddress = getShortAddress(riderDetails?.pickupAddress);
  const dropAddress = getShortAddress(riderDetails?.dropAddress);



  const fare = 0;

  const driver = {
    _id: "66b9f461091131eca3542607",
    phone_number: 91869562417,
    name: "Rajinder Singh",
    createdAt: "2024-08-12T11:39:13.827Z",
    updatedAt: "2024-08-12T11:48:46.691Z",
    __v: 0,
    email: "sunnygrover463@gmail.com",
    gender: "male",
    profile_picture:
      "https://res.cloudinary.com/dr1b4ezct/image/upload/v1723463325/driver_profile_pictures/azrw5nqox5pmvuzkyhir.jpg",
    rating: 5,
    vehicle_image:
      "https://res.cloudinary.com/dr1b4ezct/image/upload/v1723463326/vehicle_images/umgeyneoslouganaswt2.jpg",
    vehicle_plate: "PB 65 L 1504",
    vehicle_type: "bike",
  };

  function AddIcon({ name, type }: iconProps) {
    return (
      <Icon
        name={name}
        type={type}
        color={colors.primary}
        size={20}
        containerStyle={styles.iconContainer}
      />
    );
  }

  function ReachedPickupHandler() {
    setReachedPickupLocation(true);
  }

  //   const handleRideCompletion = () => {
  //     setRideIsCompleted(true);
  //   };

  return (
    <CustomBottomModal
      onChange={onChange}
      isFocused={isFocused}
      snapPoints={snapPoints}
    >
      <View style={styles.container}>
        <View style={styles.routeInfo}>
          <View style={styles.routeDetails}>
            <AddIcon name="pin" type="ionicon" />
            <Text style={styles.routeText}>
              {pickupAddress.primary}
            </Text>
            <AddIcon name="direction" type="entypo" />

            <Text style={styles.routeText}>
              {dropAddress.primary}
            </Text>
          </View>
          <View style={styles.rideDetails}>
            <View style={{ flexDirection: "row" }}>
              <AddIcon name="location" type="entypo" />
              <Text style={styles.detailText}>{riderDetails?.distance} Km</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <AddIcon name="time" type="ionicon" />
              <Text style={styles.detailText}>{riderDetails?.duration}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <AddIcon name="hand-coin" type="material-community" />
              <Text style={styles.detailText}>$45.20</Text>
            </View>
          </View>
        </View>
        <OrangeButton
          text="Finished Ride"
          onPress={() => {
            setIsRideFinished(true);
          }}
          style={{ height: 52 }}
        />
      </View>
    </CustomBottomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#bd0606',
    // padding: 20,
    width: "100%",
  },

  routeInfo: {
    flex: 0.7,
    flexDirection: "column",
    padding: 15,
    // backgroundColor: "yellow",
    // marginTop : 10
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginBottom: 20,
  },
  routeDetails: {
    flex: 1,
    flexDirection: "row",
    // alignItems : 'center',
    justifyContent: "center",
    // gap : 10
  },
  iconContainer: {
    marginBottom: 10,
  },
  routeText: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  rideDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  detailText: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default OnFinishedRideModal;
