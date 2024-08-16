import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSpring,
} from "react-native-reanimated";
import { colors } from "../../constants/colors";

const LoadingBar = () => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withSpring(1, { damping: 1, stiffness: 50, mass: 1 }), // Spring configuration
      -1, // Repeat indefinitely
      false // Do not reverse
    );
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scaleX: progress.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bar, animatedStyle]}>
        <Progress.Bar
          progress={1}
          width={200}
          height={10}
          color= {colors.primary}
          borderWidth={0}
          unfilledColor="transparent"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bar: {
    width: 200,
  },
});

export default LoadingBar;
