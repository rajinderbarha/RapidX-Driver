import "react-native-gesture-handler";
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
    </Stack.Navigator>
  
  );
}

export default function App() {
  return (
    <SafeAreaView style={{flex : 1, backgroundColor : 'white'}}>
      <StatusBar style="dark"/>
    <NavigationContainer>
        <AuthenticatedStack />
    </NavigationContainer>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 50,
    width: 100,
    resizeMode: "contain",
  },
});
