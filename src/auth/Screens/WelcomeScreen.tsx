import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import OrangeButton from "../../ui/OrangeButton";

export default function WelcomeScreen() {
  const navigation = useNavigation() as any;

  function toAuthScreen() {
    navigation.replace('Auth1')
  }

  return (
    <View style={styles.root}>
      <View style={styles.imageContainer}>
        <Image source={require('../../../assets/data/rapidxLogo.png')} style={styles.logo} />
      </View>
      <View style={styles.imageContainer}>
        <Image source={require('../../../assets/data/locations.png')} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>TRAVEL WITH SAFETY</Text>
        <OrangeButton iconName={''} onPress={toAuthScreen} text={"Let's Go"} />
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    width: width * 0.6,  // Adjusting width according to screen size
    height: height * 0.15, // Adjusting height according to screen size
    resizeMode: 'contain',
  },
  image: {
    width: width * 0.9,
    height: height * 0.4,
    resizeMode: 'contain',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 20,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});
