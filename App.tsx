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
import LocationContextProvider, { LocationContext } from "./src/store/LocationContext";
import { useContext, useEffect, useState } from "react";
import RideRequestModal from "./src/app/components/OnScreenModals/RideRequestModal";
import RideContextProvide, { RideContext } from "./src/store/RideContext";
import RideCancelScreen from "./src/app/screen/RideCancelScreen";
import CurrentRideDetailsScreen from "./src/app/screen/CurrentRideDetailsScreen";
import AuthenticationContextProvider, {
  useAuth,
} from "./src/store/AuthenticationContext";
import UpdateDetailsScreen from "./src/auth/Screens/Updatedetails";
import ProfileContextProvider, {
  ProfileContext,
} from "./src/store/ProfileContext";
import LocalAuthProvider, {
  LocalAuthContext,
} from "./src/store/LocalAuthContext";
import { fetchDriverId, fetchToken } from "./util/localAPIs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import socket from "./util/socket";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowAlert: true,
  }),
});

export function AuthStack() {
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
    </Stack.Navigator>
  );
}

function ApprovalStack() {
  const { setPhoneNumber, setEmail, setFirstName, setLastName } =
    useContext(ProfileContext);

  useEffect(() => {
    async function fetchProfileData() {
      try {
        await AsyncStorage.getItem("phoneNumber").then((phoneNumber) => {
          console.log(phoneNumber);
          if (phoneNumber) {
            setPhoneNumber(phoneNumber);
            console.log("setPhoneAsync");
          } else {
            console.log("no Phone found");
          }
        });

        const profileData = await AsyncStorage.getItem("profileData");
        console.log("profileData", profileData);
        if (profileData) {
          const parsedProfileData = JSON.parse(profileData);
          console.log(parsedProfileData);
          setEmail(parsedProfileData.email);
          setFirstName(parsedProfileData.firstName);
          setLastName(parsedProfileData.lastName);
          setPhoneNumber(parsedProfileData.phoneNumber);
          console.log("got Profile async");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }

    fetchProfileData();
    // dependencies - setEmail, setFirstName, setLastName, setPhoneNumber
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NewUser"
        component={NewUserProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateDetails"
        component={UpdateDetailsScreen}
        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

 function AuthenticatedStack() {
  const { setEmail, setFirstName, setLastName, setPhoneNumber, driverId } =
    useContext(ProfileContext);
  const { riderDetails, setRideConfirmed, incomingRide, setIncomingRide, setRiderDetails } =
    useContext(RideContext);
    const {location} = useContext(LocationContext)

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const profileData = await AsyncStorage.getItem("profileData");
        if (profileData) {
          const parsedProfileData = JSON.parse(profileData);
          setEmail(parsedProfileData.email);
          setFirstName(parsedProfileData.firstName);
          setLastName(parsedProfileData.lastName);
          setPhoneNumber(parsedProfileData.phoneNumber);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }

    fetchProfileData();
    // dependencies - setEmail, setFirstName, setLastName, setPhoneNumber
  }, []);

  const handleConfirm = () => {
    setRideConfirmed(true);
    setIncomingRide(false);
    socket.emit('acceptRide', {
      rideId: riderDetails?.ride_id,
      driverId: driverId,
      driver_current_location : {
        longitude : location?.coords.longitude,
        latitude : location?.coords.latitude
      }
    })
    console.log('Ride accepted by driver with id:', driverId);
  };

  const handleReject = () => {
    setIncomingRide(false);
    // Handle ride cancellation logic here
    setRideConfirmed(false)
    setRiderDetails(null)
    socket.emit('rejectRide', {
      rideId: riderDetails?.ride_id,
      driverId: driverId,
  });
  console.log(`Reject ride event emitted for ride ID: ${riderDetails?.ride_id}`);
  };

  return (
    <>
      <RideRequestModal
        isVisible={incomingRide}
        onConfirm={handleConfirm}
        onReject={handleReject}
      />
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{ cardStyle: { backgroundColor: "#ffffff" } }}
      >
        <Stack.Screen
          name="Main"
          component={DrawerStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Ride Cancel" component={RideCancelScreen} />
        <Stack.Screen
          name="Current Ride Details"
          component={CurrentRideDetailsScreen}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen name="Ride Details" component={RideDetailsScreen} />
      </Stack.Navigator>
    </>
  );
}

function DrawerStack() {
  return (
    <>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Home"
          component={MainScreen}
          options={{ headerShown: false }}
        />

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
  const { isAuthenticated, isApproved } = useAuth();
  const { token, setToken } = useContext(LocalAuthContext);
  const { isProfileCompleted, driverId, setDriverId } =
    useContext(ProfileContext);

  useEffect(() => {
    async function fetchingToken() {
      const storedToken = await fetchToken();
      if (storedToken) {
        setToken(storedToken);
      }
    }
    async function fetchingDriverId() {
      const DRIVERID = await fetchDriverId();
      if (DRIVERID) {
        setDriverId(DRIVERID);
      }
    }
    fetchingToken();
    fetchingDriverId();
  }, [token, driverId]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="dark" backgroundColor="#ac81818c" />
      <NavigationContainer>
        {/* <AuthenticatedStack /> */}

        {!token ? (
          <AuthStack />
        ) : isProfileCompleted ? (
          <AuthenticatedStack />
        ) : (
          <ApprovalStack />
        )}
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthenticationContextProvider>
        <LocalAuthProvider>
          <ProfileContextProvider>
            <LocationContextProvider>
              <RideContextProvide>
                <Navigation />
              </RideContextProvide>
            </LocationContextProvider>
          </ProfileContextProvider>
        </LocalAuthProvider>
      </AuthenticationContextProvider>
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
