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
import { fetchToken } from "./util/localAPIs";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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

        // const profileData = await AsyncStorage.getItem('profileData');
        // console.log('profileData', profileData)
        // if (profileData) {
        //   const parsedProfileData = JSON.parse(profileData);
        //   console.log(parsedProfileData)
        //   setEmail(parsedProfileData.email);
        //   setFirstName(parsedProfileData.firstName);
        //   setLastName(parsedProfileData.lastName);
        //   setPhoneNumber(parsedProfileData.phoneNumber);
        //   console.log('got Profile async')
        // }
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
      <Stack.Screen name="Ride Cancel" component={RideCancelScreen} />
      <Stack.Screen
        name="Current Ride Details"
        component={CurrentRideDetailsScreen}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
}

function DrawerStack() {
  const rideDetails = {
    userName: "Vishal",
    user_origin: {
      longitude: 76.7793878,
      latitude: 30.7333196,
    },
    user_destination: {
      longitude: 76.7906,
      latitude: 30.7049,
    },
    user_id: "66b1c305d27b9a0a022c6005",
    distance: 10,
    duration: 8,
    dropAddress:
      "MPR8+QCJ, Himalaya Marg, Sector 69, Sahibzada Ajit Singh Nagar, Punjab 140308, India",
    pickupAddress:
      "PP6C+FHR, Phase 3B-1, Sector 60, Sahibzada Ajit Singh Nagar, Punjab 160059, India",
  };

  const [isVisible, setIsVisible] = useState(true);
  const { setRiderDetails, setRideConfirmed, incomingRide, setIncomingRide } =
    useContext(RideContext);

  const handleConfirm = () => {
    setRiderDetails(rideDetails);
    setRideConfirmed(true);
    setIncomingRide(false);
  };

  const handleCancel = () => {
    setIncomingRide(false);
    // Handle ride cancellation logic here
  };

  return (
    <>
      <RideRequestModal
        isVisible={incomingRide}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        requestDetails={{ name: "vishal" }}
      />
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
  const { isAuthenticated, isApproved } = useAuth();
  const { token, setToken } = useContext(LocalAuthContext);
  const { isProfileCompleted } = useContext(ProfileContext);

  useEffect(() => {
    async function fetchingToken() {
      const storedToken = await fetchToken();
      if (storedToken) {
        setToken(storedToken);
      }
    }
    fetchingToken();
  }, [token]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="dark" backgroundColor="#ac81818c" />
      <NavigationContainer>
        {!token ? (
          <AuthStack />
        ) : isProfileCompleted ? (
          <DrawerStack />
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
