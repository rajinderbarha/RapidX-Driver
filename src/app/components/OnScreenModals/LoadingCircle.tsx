import React from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  Text,
} from "react-native";
import { colors } from "../../../../constants/colors";


interface xx {
    
  isVisible: boolean,
  color : string,
  text: string
}

export default function LoadingCircleComponent(
  {color, isVisible  ,text} : xx
) {
  if (isVisible) {
    return (
        <View style={styles.overlay}>
        <View style={styles.container}>
          <ActivityIndicator size={"large"} color={color} />
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    );
  }else{
    return null
  }
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        zIndex: 999, // Ensure it's on top of other content
      },
      container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'white',
      },
      text: {
        marginTop: 10,
        fontSize: 16,
        color: '#3498db',
      },
});
