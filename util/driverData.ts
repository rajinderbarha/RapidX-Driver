import AsyncStorage from "@react-native-async-storage/async-storage"

interface profileDataInterface{
    firstName : string
    lastName : string
    email : string | undefined
    phoneNumber : string
}


export default async function storeUserProfileData(profileData : profileDataInterface ){
    try{
        const profileDataString = JSON.stringify(profileData)
        await AsyncStorage.setItem('profileData', profileDataString )
    }catch(error){
        console.log('error in storing profile data', error)
    }

};
