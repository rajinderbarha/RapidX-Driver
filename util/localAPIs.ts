import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default async function AuthenticatePhoneNumber(
    phoneNumber: string,
    setIsNewUser: (value: any) => void,
    setIsProfileCompleted: (value: any) => void
  ) {
    const URL = "https://rw6v05jh-8000.inc1.devtunnels.ms/api/drivers/signup/";
  
    try {
      const response = await axios.post(URL, { phoneNumber });
      console.log("Response data:", response.data);
      if (response.data && response.data.user) {
        const responseData = response.data;
        const userData = response.data.user;
        const receivedToken = response.data.token;
        const isNewUser = userData?.is_new_user;
  
        if (isNewUser) {
          setIsNewUser(true);
          setIsProfileCompleted(false);
        } else {
          setIsProfileCompleted(true);
        }
  
        if (receivedToken) {
          await AsyncStorage.setItem("token", receivedToken).then(() =>
            console.log("token added")
          );
  
          return responseData;
        } else {
          console.log("Token not found in the response.");
        }
      }
    } catch (error) {
      console.log("error in authentication : ", error);
    }
  }