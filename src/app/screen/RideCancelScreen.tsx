import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { colors } from "../../../constants/colors";
import OrangeButton from "../../ui/OrangeButton";
import { RideContext } from "../../store/RideContext";
import { LocationContext } from "../../store/LocationContext";
import { useNavigation } from "@react-navigation/native";

export default function RideCancelScreen() {
  const [reason, setReason] = useState("");
  const { reset } = useContext(RideContext);

  const reasons = [
    { label: "Can't find rider", value: "Can't find rider" },
    { label: "Vehicle issue", value: "Vehicle issue" },
    { label: "No car seat", value: "No car seat" },
    { label: "Personal issue", value: "Personal issue" },
    { label: "Rider behavior", value: "Rider behavior" },
  ];

  // const { setRideIsBooked, setDriver } = useContext(RideContext);
  // const { reset } = useContext(LocationContext);
  const navigation = useNavigation<any>();

  const handleCancelRide = () => {
    if (!reason) {
      Alert.alert("Please select a reason for cancelling the ride.");
      return;
    }
    // Handle the ride cancellation logic here
    Alert.alert("Ride cancelled", `reason : ${reason}`);
    // setRideIsBooked(false);
    // reset();
    // setDriver(null);
    reset();
    navigation.navigate("Main");
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <Image
            style={{ height: 100, width: 100, marginBottom: 40 }}
            source={require("../../../assets/data/cancel.png")}
          />
        </View>
        <Text lineBreakMode="middle" style={styles.subHeaderText}>
          Please select a reason for {"\n"} cancelling the ride
        </Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(value) => setReason(value)}
            items={reasons}
            placeholder={{
              label: "Select",
              value: null,
            }}
            style={pickerSelectStyles}
          />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <OrangeButton
          text="Done"
          onPress={handleCancelRide}
          style={{ width: "100%" }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 7,
    alignItems: "center",
    // justifyContent: "center",
    padding: 16,
    // backgroundColor: "red",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subHeaderText: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "bold",
  },
  pickerContainer: {
    width: "100%",
    paddingHorizontal: 16,
    margin: 32,
    backgroundColor: colors.primary,
    // borderWidth : 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  button: {
    width: "100%",
    padding: 16,
    backgroundColor: "#FF5722",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    bottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 8,
    height: 60,
    // borderWidth: 2,
    // borderColor: "purple",
    // borderRadius: 8,
    color: "white",
    paddingRight: 30, // to ensure the text is never behind the icon
    // backgroundColor : colors.primary,
  },
});
