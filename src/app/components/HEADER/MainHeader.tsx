import React, { useContext } from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../../../ui/IconButton";
import { useNavigation } from "@react-navigation/native";
import { RideContext } from "../../../store/RideContext";
import * as Notification from "expo-notifications";

export default function MainHeader() {
  const navigation = useNavigation<any>();
  const { setIncomingRide, isSocketConnected, setIsSocketConnected } =
    useContext(RideContext);

  async function sendNotification() {
    await Notification.scheduleNotificationAsync({
      content: {
        title: "notification",
        body: "hi",
      },
      trigger: {
        seconds: 1,
      },
    });
    console.log("notification sent");
  }

  return (
    <View style={styles.root}>
      <View style={styles.btn}>
        <IconButton
          name="menu"
          size={28}
          color="grey"
          onPress={() => navigation.toggleDrawer()}
        />
      </View>
      <Pressable
        style={({ pressed }) => [styles.input, pressed && styles.pressedInput]}
        onPress={() => console.log("Location pressed")}
      >
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={22} color="green" />
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.pickupAddress}
          >
            Select a location
          </Text>
        </View>
        <View style={styles.iconButtonContainer}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }} // Custom track color
            thumbColor={isSocketConnected ? "green" : "red"} // Custom thumb color
            ios_backgroundColor="#3e3e3e" // iOS background color
            // onValueChange={() => {
            //   setIsSocketConnected(!isSocketConnected);
            // }} // Function to handle value change
            value={isSocketConnected} // Current switch value

          />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  input: {
    height: 43,
    backgroundColor: "#ffffff",
    width: "87%",
    borderRadius: 25,
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 9,
    flexDirection: "row",
    marginLeft: 10,
    paddingHorizontal: 10,
    overflow: "hidden",
  },
  pressedInput: {
    backgroundColor: "#c9c3c3",
  },
  btn: {
    height: 39,
    width: 39,
    borderRadius: 25,
    backgroundColor: "#ffffff",
    elevation: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  locationContainer: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
    alignItems: "center",
  },
  pickupAddress: {
    color: "grey",
    fontWeight: "600",
    fontSize: 16,
    maxWidth: "85%",
  },
  iconButtonContainer: {
    width: 28,
    borderRadius: 15,
  },
});
