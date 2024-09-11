import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { LocalAuthContext } from "../src/store/LocalAuthContext";

// const SERVERURL = 'http://localhost:8000'
const SERVERURL = 'https://rw6v05jh-8000.inc1.devtunnels.ms'

interface updatingUserProps {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  email: string | null;
}

export default async function AuthenticatePhoneNumber(
  phone: string,
  setIsNewUser: (value: any) => void,
  setIsProfileCompleted: (value: any) => void
) {
  const URL =  SERVERURL+"/api/drivers/signup";

  try {
    const response = await axios.post(URL, { phone_number: phone });

    if (response.data && response.data.driver) {
      const responseData = response.data;
      const driverData = response.data.driver;
      const receivedToken = response.data.token;
      const driverId = driverData._id
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

export async function fetchToken() {
  try {
    const storedToken = await AsyncStorage.getItem("token");
    if (storedToken) {
      console.log("got token");
      return storedToken;
    }
  } catch (error) {
    console.log("error fetching token : ", error);
  }
}

export async function fetchDriverId() {
  try {
    const driverId = await AsyncStorage.getItem("driverId");
    if (driverId) {
      console.log("got Id");
      return driverId;
    }
  } catch (error) {
    console.log("error fetching driverId : ", error);
  }
}

export async function UpdateDriver({
  phoneNumber,
  firstName,
  lastName,
  email,
}: updatingUserProps) {
  const URL =  SERVERURL+"/api/drivers/update-driver-details";
  const gender = "Male";
  console.log('URL', URL)
  try {
    const response = await fetch(URL, {
      method: "PUT",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZGU4YzgyYWEzZWVmNGMzZDkwZDYxYSIsImlhdCI6MTcyNTg2MDk5NCwiZXhwIjoxNzI4NDUyOTk0fQ.7KMcbiOnOrHnXvXCzW4fKY4uVKnJ_GCgZmsdKizM1QA",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
        first_name: firstName,
        last_name: lastName,
        email,
        gender,
      }),
    });
    if (!response.ok) {
      // Handle HTTP errors
      const errorText = await response.text();
      console.error(
        `HTTP error! Status: ${response.status}, Message: ${errorText}`
      );
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const updatedProfileData = { firstName, lastName, email, phoneNumber };

    await AsyncStorage.setItem(
      "profileData",
      JSON.stringify(updatedProfileData)
    ).then(() => {
      console.log("updated profile in async storage");
    });

    console.log("Updated Profile");
  } catch (error: any) {
    // Log detailed error information
    console.error("Error in mapData: ", error.message);
    console.error("Stack trace: ", error.stack);
  }
}

// export async function UpdateDriverDocuments(formData: FormData) {
//   const URL =
//     "https://rw6v05jh-8000.inc1.devtunnels.ms/api/drivers/update-driver-details";

//   try {
//     const response = await fetch(URL, {
//       method: "PUT",
//       headers: {
//         Authorization:

//         // 'Content-Type': 'multipart/form-data', // Do not manually set this for FormData
//       },
//       body: formData, // formData should be passed as the body
//     });

//     if (!response.ok) {
//       // Handle HTTP errors
//       const errorText = await response.text();
//       console.error(
//         `HTTP error! Status: ${response.status}, Message: ${errorText}`
//       );
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     // Assuming a JSON response
//     const data = await response.json();
//     console.log("data", data);
//     return data;
//   } catch (error: any) {
//     // Log detailed error information
//     console.error("Error in UpdateDriverDocuments: ", error.message);
//     console.error("Stack trace: ", error.stack);
//     throw error; // Re-throw the error after logging it
//   }
// }
// https://rw6v05jh-8000.inc1.devtunnels.ms
export async function UpdateDriverDocuments(formData: FormData, phoneNumber : string) {
  const URL =
    SERVERURL+"/api/drivers/update-driver-details";

    formData.append("phone_number", phoneNumber)

  try {
    const response = await fetch(URL, {
      method: "PUT",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzczMjFjNjA4MjUzYWM0ZDJmZmU4OSIsImlhdCI6MTcyNDM5MjI2NiwiZXhwIjoxNzI2OTg0MjY2fQ.l3rhePkvc9wMpftkw2tBinTbv8xAdNUG6LaNQEdF6pI",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `HTTP error! Status: ${response.status}, Message: ${errorText}`
      );
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response data:", data);
    return data;
  } catch (error: any) {
    console.error("Error in UpdateDriverDocuments:", error.message);
    console.error("Stack trace:", error.stack);
    throw error;
  }
}

export async function logout() {
  try {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("profileData");
    await AsyncStorage.removeItem("driverId");
  } catch (error) {
    console.error("Error logging out:", error);
  }
}
