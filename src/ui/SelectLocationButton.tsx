import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";
import { colors } from "../../constants/colors";


interface SelectLocationButtonProps {
  style?: ViewStyle;
  iconName: any;
  text: string;
  onPress: () => void;
}

export default function SelectLocationButton({
  style,
  iconName,
  text,
  onPress,
}: SelectLocationButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      accessible={true}
      accessibilityLabel={text}
    >
      <View style={[styles.btn, style]}>
        <MaterialIcons name={iconName} size={26} color="black" />
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: "64%",
    borderWidth: 1,
    borderColor: colors.primary,
    marginHorizontal: "18%",
    padding: 14,
    borderRadius: 50,
    flexDirection: "row",
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
  },
});
