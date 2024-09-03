import React, { useContext, useState } from "react";
import { View, StyleSheet, Alert, Pressable } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { Avatar, Icon, Text } from "@rneui/base";
import { colors } from "../../../constants/colors";
import LogoutModal from "./OnScreenModals/LogoutModal";
import { useNavigation } from "@react-navigation/native";
import { AuthStack } from "../../../App";
import { logout } from "../../../util/localAPIs";
import { LocalAuthContext } from "../../store/LocalAuthContext";
import { ProfileContext } from "../../store/ProfileContext";
import ProfileInitial from "./ProfileInitial";

export default function CustomDrawerContent(
  props: DrawerContentComponentProps
) {
  const [isAlertVisible, setAlertVisible] = useState(false);
  const navigation = useNavigation<any>();
  const { setToken } = useContext(LocalAuthContext);
  const { firstName, lastName, picture } = useContext(ProfileContext);

  function toggleAlert() {
    setAlertVisible(!isAlertVisible);
  }

  const handleSignOut = async () => {
    try {
      // await signOut();
      await logout();
      setToken("");

      Alert.alert("Signed out successfully");
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <>
      <DrawerContentScrollView {...props}>
        <Pressable
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <View style={styles.header}>
            <View>
            {picture ? (
            <Avatar
              rounded
              size="large"
              source={{ uri: picture }}
              containerStyle={styles.avatar}
            />
             
          
          ) : (
            <View style={styles.avatarAlt}>
              <ProfileInitial name={firstName ? firstName : '?'} /> 
              
            </View>
          )}
            </View>
            <View>
              <Text h4 style={styles.name}>
                {firstName} {lastName}
              </Text>
              <View style={styles.rating}>
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Icon
                      key={i}
                      name="star"
                      type="font-awesome"
                      color="#FFD700"
                      size={17}
                      style={{ marginRight: 5, marginTop: 5 }}
                    />
                  ))}
              </View>
            </View>
          </View>
        </Pressable>
        <DrawerItem
          label="Home"
          icon={() => (
            <Icon
              name="home"
              type="font-awesome"
              color={colors.primary00}
              style={styles.icons}
            />
          )}
          onPress={() => props.navigation.navigate("Home")}
        />
        <DrawerItem
          label="Ride History"
          icon={() => (
            <Icon
              name="motorcycle"
              type="font-awesome"
              color={colors.primary00}
              style={styles.icons}
            />
          )}
          onPress={() => props.navigation.navigate("RideHistory")}
        />
        
        <DrawerItem
          label="Your Earnings"
          icon={() => (
            <Icon
              name="wallet"
              type="ionicons"
              color={colors.primary00}
              style={styles.icons}
            />
          )}
          onPress={() => props.navigation.navigate("YourEarnings")}
        />

        <DrawerItem
          label="Legal & Terms"
          icon={() => (
            <Icon
              name="shield"
              type="font-awesome"
              color={colors.primary00}
              style={styles.icons}
            />
          )}
          onPress={() => props.navigation.navigate("LegalAndTerms")}
        />
        <DrawerItem
          label="Profile"
          icon={() => (
            <Icon
              name="user"
              type="font-awesome"
              color={colors.primary00}
              style={styles.icons}
            />
          )}
          onPress={() => props.navigation.navigate("Profile")}
        />
        <DrawerItem
          label="Contact Us"
          icon={() => (
            <Icon
              name="phone"
              type="font-awesome"
              color={colors.primary00}
              style={styles.icons}
            />
          )}
          onPress={() => props.navigation.navigate("ContactUs")}
        />
      </DrawerContentScrollView>
      <DrawerItem
        style={styles.logoutSection}
        label="Logout"
        icon={() => (
          <Icon name="sign-out" type="font-awesome" color={colors.primary00} />
        )}
        onPress={toggleAlert}
      />
      <LogoutModal
        isVisible={isAlertVisible}
        onClose={toggleAlert}
        onConfirm={handleSignOut}
      />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    // backgroundColor : 'red'
  },
  avatar: {
    marginBottom: 10,
    marginRight: 20,
    // height : 75,
    // width : 75,
    // overflow : 'hidden',
    // resizeMode : 'contain'

  },
  name: {
    fontWeight: "bold",
  },
  rating: {
    flexDirection: "row",
    marginTop: 5,
  },
  logoutSection: {
    borderTopWidth: 2,
    borderTopColor: "#ccc",
  },
  icons: {
    marginLeft: 10,
  },
  avatarAlt : {
    borderWidth: 2,
    borderColor: colors.primary,
    height : 75,
    width : 75,
    borderRadius : 50,
    alignItems : 'center',
    justifyContent : 'center',
    marginRight : 10
  },
});
