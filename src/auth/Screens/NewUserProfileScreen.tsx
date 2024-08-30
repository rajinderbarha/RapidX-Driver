import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import CheckBox from "react-native-check-box";
import OrangeButton from "../../ui/OrangeButton";
import { useAuth } from "../../store/AuthenticationContext";
import { useNavigation } from "@react-navigation/native";
import { ProfileContext } from "../../store/ProfileContext";
import { UpdateDriver } from "../../../util/localAPIs";
import { Alert } from "react-native";
import storeUserProfileData from "../../../util/driverData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingCircle from "../../app/components/OnScreenModals/LoadingCircle";
import { colors } from "../../../constants/colors";
import LoadingCircleComponent from "../../app/components/OnScreenModals/LoadingCircle";

export default function NewUserProfileScreen() {
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation<any>();
  const { setIsAuthenticated, setIsApproved } = useAuth();
  const {
    setIsProfileCompleted,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phoneNumber,
    setPicture,
    picture
  } = useContext(ProfileContext);
const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    const updatedProfile = {
      phoneNumber,
      firstName,
      lastName,
      email,
    };
    if (firstName && lastName && phoneNumber) {
      setLoading(true)
      await UpdateDriver(updatedProfile);
      await storeUserProfileData({phoneNumber, firstName, lastName ,email}).then(()=>setLoading(false))
      navigation.navigate("UpdateDetails");
    }else{
      Alert.alert('Complete your profile first')
    }
  };

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const profileData = await AsyncStorage.getItem('profileData');
        if (profileData) {
          const parsedProfileData = JSON.parse(profileData);
          setEmail(parsedProfileData.email);
          setFirstName(parsedProfileData.firstName);
          setLastName(parsedProfileData.lastName);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }

    fetchProfileData();
    // dependencies - setEmail, setFirstName, setLastName, setPhoneNumber
  }, []);


  return (
    <View style={styles.container}>
      <LoadingCircleComponent  color={colors.primary} isVisible={loading}  text="updating"/>
      <View>
        <Text style={styles.title}>REGISTER</Text>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.subtitle}>Enter your details</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <Icon name="person-outline" size={20} style={styles.icon} />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
          <Icon name="person-outline" size={20} style={styles.icon} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="+91"
            value={phoneNumber}
            keyboardType="phone-pad"
            editable = {false}
          />
          <Icon
            name="checkmark-circle"
            size={20}
            style={styles.icon}
            color="green"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Icon name="mail-outline" size={20} style={styles.icon} />
        </View>

        {/* <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Icon name="eye-off-outline" size={20} style={styles.icon} />
      </View> */}

        <View style={styles.checkboxContainer}>
          <CheckBox
            isChecked={isChecked}
            onClick={() => setIsChecked(!isChecked)}
            checkedCheckBoxColor="green"
          />
          <Text style={styles.checkboxText}>
            By continuing, I confirm I have read the
            <Text style={styles.link}> Terms and conditions </Text>
            and
            <Text style={styles.link}> Privacy Policy</Text>
          </Text>
        </View>
      </View>
      <View>
        <OrangeButton
          text="Next"
          onPress={() => {
            handleUpdate()
            // navigation.navigate('UpdateDetails')
            // setIsApproved(true);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingVertical: 40,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "left",
    marginBottom: 20,
    marginLeft: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    color : 'black'
  },
  icon: {
    marginLeft: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 14,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "orange",
    padding: 15,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginRight: 10,
  },
});
