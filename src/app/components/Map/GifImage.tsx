import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function GifImage({source}:any) {
  return (
    <View style={styles.container}>
      <View style={styles.innerCircle} />
      <Image
        style={styles.markerImage}
        source={source}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  innerCircle: {
    height: 10,
    width: 10,
    backgroundColor: 'white',
  },
  markerImage: {
    width: 50,
    height: 50,
    position: 'absolute',
    resizeMode: 'contain',
  },
});
