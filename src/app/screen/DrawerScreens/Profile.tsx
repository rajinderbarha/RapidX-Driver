import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  ScrollView,
} from "react-native";
import { Avatar, Button } from "@rneui/base";
import Icon from "react-native-vector-icons/FontAwesome";
import { launchImageLibrary } from "react-native-image-picker";
import { useNavigation } from "@react-navigation/native";
import { ProfileContext } from "../../../store/ProfileContext";
import { UpdateDriver } from "../../../../util/localAPIs";
import ProfileInitial from "../../components/ProfileInitial";
import OrangeButton from "../../../ui/OrangeButton";
import { colors } from "../../../../constants/colors";


const {height, width} = Dimensions.get('screen')

export default function ProfileScreen() {
  

  const navigation = useNavigation<any>();

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

  const onUpdate = (updatedProfile: any) => {
    console.log("Updated Profile:", updatedProfile);
  };

  const selectProfilePicture = () => {
    const options: any = {
      mediaType: "photo", // This is required
      maxWidth: 300, // Optional: Resizes the selected image
      maxHeight: 300, // Optional: Resizes the selected image
      quality: 0.8, // Optional: Image quality (0 to 1)
      includeBase64: false, // Optional: If true, returns the base64 string of the image
    };

    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("ImagePicker Error: ", response.errorCode);
      } else {
        const source = { uri: response.assets[0].uri };
        setPicture(source.uri);
      }
    });
  };

  const handleUpdate = async () => {
    const updatedProfile = {
      phoneNumber,
      firstName,
      lastName,
      email,
    };
    if (firstName && lastName && phoneNumber) {
      await UpdateDriver(updatedProfile);
      setIsProfileCompleted(true);
      navigation.navigate("Main");
    }else{
      Alert.alert('Complete your profile first')
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.container}>
      <View style={styles.header}>
      {picture ? (
            <Avatar
              rounded
              size="xlarge"
              source={{ uri: picture }}
              containerStyle={styles.avatar}
            >
              <Avatar.Accessory
                size={30}
                onPress={selectProfilePicture}
                style={styles.editIcon}
              />
            </Avatar>
          ) : (
            <View style={styles.avatarAlt}>
              <ProfileInitial name={firstName} /> 
              <Avatar.Accessory
                size={30}
                onPress={selectProfilePicture}
                style={styles.editIcon}
              />
            </View>
          )}
      </View>

      <View style={styles.details}>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.emailContainer}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <Text style={styles.unverifiedText}>Unverified</Text>
          </View>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Phone No</Text>
          <View style={styles.phoneContainer}>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              // onChangeText={setPhone}
              keyboardType="phone-pad"
              editable={false}
            />
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        </View>
      </View>
      <View style={{ marginTop: "40%" }}>
        <OrangeButton
          text="Save Changes"
          onPress={handleUpdate}
        />
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    
  },
  header: {
    alignItems: "center",
    paddingBottom: 20,
  },
  avatar: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  avatarAlt : {
    borderWidth: 2,
    borderColor: colors.primary,
    height : 100,
    width : 100,
    borderRadius : 50,
    alignItems : 'center',
    justifyContent : 'center'

  },
  editIcon: {
    backgroundColor: colors.primary,
  },
  details: {
    marginVertical: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 18,
    paddingVertical: 5,
  },
  emailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  unverifiedText: {
    color: "red",
    fontWeight: "600",
  },
  phoneContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  verifiedText: {
    color: "green",
    fontWeight: "600",
  },
  updateButton: {
    backgroundColor: "#f44336",
    borderRadius: 25,
    paddingVertical: 15,
  },
});
