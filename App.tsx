import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import WelcomeScreen from "./src/auth/Screens/WelcomeScreen";
import AuthScreen from "./src/auth/Screens/AuthScreen";
import { NavigationContainer } from "@react-navigation/native";
import NewUserProfileScreen from "./src/auth/Screens/NewUserProfileScreen";
import MainScreen from "./src/app/screen/MainScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomDrawerContent from "./src/app/components/CustomDrawerContent";
import RideDetailsScreen from "./src/app/screen/DrawerScreens/RideDetails";
import YourEarningsScreen from "./src/app/screen/DrawerScreens/YourEarnings";
import RideHistoryScreen from "./src/app/screen/DrawerScreens/RideHistory";
import LegalAndTermsScreen from "./src/app/screen/DrawerScreens/LegalAndTerms";
import ContactUsScreen from "./src/app/screen/DrawerScreens/ContactUs";
import ProfileScreen from "./src/app/screen/DrawerScreens/Profile";
import LocationContextProvider from "./src/store/LocationContext";
import { useContext, useState } from "react";
import RideRequestModal from "./src/app/components/OnScreenModals/RideRequestModal";
import RideContextProvide, { RideContext } from "./src/store/RideContext";
import RideCancelScreen from "./src/app/screen/RideCancelScreen";
import CurrentRideDetailsScreen from "./src/app/screen/CurrentRideDetailsScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ cardStyle: { backgroundColor: "#ffffff" } }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Auth1"
        component={AuthScreen}
        options={{
          title: "",
          headerLeft: () => (
            <Image
              style={styles.logo}
              source={require("./assets/data/rapidxLogo.png")}
            />
          ),
        }}
      />
      <Stack.Screen
        name="NewUser"
        component={NewUserProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{ cardStyle: { backgroundColor: "#ffffff" } }}
    >
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Ride Cancel" component={RideCancelScreen}/>
      <Stack.Screen name="Current Ride Details" component={CurrentRideDetailsScreen} options={{presentation : 'modal'}}/>
    </Stack.Navigator>
  );
}

function DrawerStack() {

  
    const rideDetails = {
      user_name : 'Vishal',
      user_origin: {
        longitude: 76.7794,
        latitude: 30.7333,
      },
      user_destination: {
        longitude: 76.7906,
        latitude: 30.7049,
      },
      _id: "66b9b5b36a231a558018d851",
      user_id: "66b1c305d27b9a0a022c6005",
      distance: 10,
      duration: 8,
      dropAddress: "MPR8+QCJ, Himalaya Marg, Sector 69, Sahibzada Ajit Singh Nagar, Punjab 140308, India",
      pickupAddress: "PP6C+FHR, Phase 3B-1, Sector 60, Sahibzada Ajit Singh Nagar, Punjab 160059, India",
      fares: 136,
      status: "accepted",
      createdAt: "2024-08-12T07:11:47.600Z",
      updatedAt: "2024-08-12T12:30:39.218Z",
      __v: 0,
    }
 


  const [isVisible, setIsVisible] = useState(true);
const {setRiderDetails, setRideConfirmed} = useContext(RideContext)

  const handleConfirm = () => {
    setRiderDetails({
      name : rideDetails.user_name,
      dropLocation : rideDetails.user_destination,
      pickupLocation : rideDetails.user_origin
    })
    setRideConfirmed(true)
    setIsVisible(false);
    
  };

  const handleCancel = () => {
    setIsVisible(false);
    // Handle ride cancellation logic here
  };


  return (
    <>
    <RideRequestModal isVisible={isVisible} onConfirm={handleConfirm} onCancel={handleCancel} requestDetails={{name : 'vishal'}}/>
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >

      <Drawer.Screen
        name="Home"
        component={AuthenticatedStack}
        options={{ headerShown: false }}
      />
      <Drawer.Screen name="RideDetails" component={RideDetailsScreen} />
      <Drawer.Screen name="YourEarnings" component={YourEarningsScreen} />
      <Drawer.Screen name="RideHistory" component={RideHistoryScreen} />
      <Drawer.Screen name="LegalAndTerms" component={LegalAndTermsScreen} />
      <Drawer.Screen name="ContactUs" component={ContactUsScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
    </>
  );
}

function Navigation() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="dark" backgroundColor="#ac81818c" />
      <NavigationContainer>
        <DrawerStack />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LocationContextProvider>
        <RideContextProvide>
        <Navigation />
        </RideContextProvide>
      </LocationContextProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 50,
    width: 100,
    resizeMode: "contain",
  },
});
