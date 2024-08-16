import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface IconPropsType {
  name: any;
  size: number;
  color: string;
  onPress : ()=>void
}

export default function IconButton({ name, size, color, onPress }: IconPropsType) {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <Ionicons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
}

// const styles = StyleSheet.create({
//   btn: {
//     height: 40,
//     width: 40,
//     borderRadius: 25,
//     backgroundColor : '#ffffff',
//     elevation: 5 ,
//     alignItems : 'center',
//     justifyContent : 'center'
//   },
// });
