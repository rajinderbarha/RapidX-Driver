import React from "react";
import { Dimensions, GestureResponderEvent, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface MyLocationButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  style? : ViewStyle
}

export default function MyLocationButton({ onPress , style}: MyLocationButtonProps) {
  return (
    <TouchableOpacity style={StyleSheet.compose(styles.btn, style)} onPress={onPress}>
      <MaterialIcons name="my-location" size={30} color="blue" />
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  btn: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "white",
    position: "absolute",
   
    right: 20,
    elevation: 9,
    alignItems: "center",
    justifyContent: "center",
  },
});
