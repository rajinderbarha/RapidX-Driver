import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

// const SERVERURL = 'http://localhost:8000'
const SERVERURL = "https://rw6v05jh-8000.inc1.devtunnels.ms";

export default async function phoneAuthentication(
  phone: string,
) {
  // const URL =  SERVERURL+"/api/drivers/signup-without-otp";
  const URL = SERVERURL + "/api/drivers/signup";

  try {
    const response = await axios.post(URL, { phone_number: phone });

   return response.data;
  } catch (error) {
    console.log("error in authentication : ", error);
  }
}

export async function verifyOtp(
  phone_number: string,
  otp: string,
  setIsNewUser: (value: any) => void,
  setIsProfileCompleted: (value: any) => void
) {
  const URL = SERVERURL + "/api/drivers/signup/verify";
  try {
    const response = await axios.post(URL, { phone_number, otp });
    if (response.data && response.data.driver) {
      const responseData = response.data;
      const driverData = response.data.driver;
      const receivedToken = response.data.token;
      const driverId = driverData._id;
      const isNewUser = driverData?.is_new_user;

      if (isNewUser) {
        setIsNewUser(true);
        setIsProfileCompleted(false);
      } else {
        setIsProfileCompleted(true);
      }

      console.log("Response data:", response.data);

      if (receivedToken && driverId) {
        await AsyncStorage.setItem("token", receivedToken).then(() =>
          console.log("token added")
        );
        await AsyncStorage.setItem("driverId", driverId).then(() =>
          console.log("Id added")
        );
        return responseData;
      } else {
        console.log("Token or Id not found in the response.");
      }
    }
  } catch (error) {
    console.log("error in authentication : ", error);
  }
}
