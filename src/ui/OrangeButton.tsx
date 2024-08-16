import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, ViewStyle } from "react-native";
import { colors } from "../../constants/colors";

const { width, height } = Dimensions.get('window');
interface ButtonProps {
  style?: ViewStyle;
  iconName: any;
  text: string;
  onPress: () => void;
}



export default function OrangeButton({ onPress, text, style }: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container]}>
      <View style={[styles.btn, style]}>
        <Text style={styles.text}>{text}</Text>
        <View style={styles.iconContainer}>
          <Ionicons name="arrow-forward" size={18} color="white" />
        </View>
      </View>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: width * 0.05, // Add padding based on screen width
     // Add some margin at the bottom
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the content within the button
    padding: 10,
    backgroundColor : colors.primary,
    borderRadius: 50,
    height: 55,
  },
  text: {
    fontSize: width * 0.048, // Adjust font size based on screen width
    fontWeight: '600',
    color: 'white',
    // marginRight: 10, // Space between text and icon
    textAlign: 'center', // Center the text horizontally
    flex: 1, // Allow text to take remaining space
  },
  iconContainer: {
    height: 32,
    width: 32,
    backgroundColor: '#ffffff3a',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex : 11
  },
});
