import React, { useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { Avatar, Button, Icon } from "@rneui/base";
import { colors } from "../../../constants/colors";
import OrangeButton from "../../ui/OrangeButton";
import { useNavigation } from "@react-navigation/native";
import { RideContext } from "../../store/RideContext";
import getShortAddress from "../../../util/getShortAddress";
import { ProfileContext } from "../../store/ProfileContext";
import ProfileInitial from "../components/ProfileInitial";

const CurrentRideDetailsScreen = () => {
  const navigation = useNavigation<any>()
  const {setReachedPickupLocation, nearPickupLocation, riderDetails} = useContext(RideContext)
  const {picture, firstName, lastName} = useContext(ProfileContext)

  function reachedPickupPointHandler(){
    if(!nearPickupLocation){
      Alert.alert("You need to get closer to the passanger")
      return
    }
    navigation.navigate('Main');
    setReachedPickupLocation(true)
  };
  
  
  const pickupAddress = getShortAddress(riderDetails?.pickupAddress)
  const dropAddress = getShortAddress(riderDetails?.dropAddress)


  return (
    <ScrollView style={styles.container}>
      {/* User Information */}
      <View style={styles.profileSection}>
        <View style={styles.userInfo}>
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
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{firstName} {lastName}</Text>
            <View style={styles.ratingContainer}>
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <Icon
                    key={i}
                    name="star"
                    type="font-awesome"
                    color="#FFA500"
                    size={18}
                  />
                ))}
            </View>
          </View>
        </View>
        <View style={styles.balanceSection}>
          <Text style={styles.balanceText}>$2026</Text>
          <Text style={styles.subText}>Available balance</Text>
         
        </View>
      </View>

      {/* Ride Options */}
      <View style={styles.rideOptions}>
        {/* <Button
          title="Available Rides"
          type="outline"
          buttonStyle={styles.rideOptionButton}
        /> */}
        <Button
          title="Current Ride"
          type="solid"
          buttonStyle={styles.rideOptionButtonSelected}
        />
        {/* <Button
          title="Ride History"
          type="outline"
          buttonStyle={styles.rideOptionButton}
        /> */}
      </View>

      {/* Ride Details */}
      <View style={styles.rideDetails}>
        <View style={styles.bikeInfo}>
        <View style={[styles.avatarAlt, {height : 65, width : 65, marginRight : 10}]}>
              <ProfileInitial name={riderDetails? riderDetails.userName : '?'} /> 
              
            </View>
          <View>
            <Text style={styles.arrivalText}>Your passanger is waiting </Text>
            <Text style={styles.subText}>{pickupAddress.primary}</Text>
          </View>
          <TouchableOpacity style={styles.callButton}>
            <Icon name="phone" type="font-awesome" color="green" size={20} />
          </TouchableOpacity>
        </View>

        {/* Trip Route */}
        <View style={styles.tripRoute}>
          <Text style={styles.sectionTitle}>Trip Route</Text>
          <View style={styles.routePoint}>
            <Icon name="circle" type="font-awesome" color="green" size={12} />
            <View style={styles.routeDetails}>
              <Text style={styles.routeText}>{pickupAddress.primary}</Text>
              <Text style={styles.subText}>{pickupAddress.secondary}</Text>
            </View>
          </View>
          <View style={styles.routePoint}>
            <Icon name="circle" type="font-awesome" color="orange" size={12} />
            <View style={styles.routeDetails}>
              <Text style={styles.routeText}>{dropAddress.primary}</Text>
              <Text style={styles.subText}>{dropAddress.secondary}</Text>
            </View>
          </View>
        </View>

        {/* Total Amount and Cancel Ride */}
        <View style={styles.amountSection}>
          <Text style={styles.amountText}>Total Amount</Text>
          <Text style={styles.amountText}>$50.00</Text>
        </View>
      </View>
      <View style = {{ height : 200, alignItems : 'center', justifyContent : 'space-around'}}>
        <OrangeButton  text="Reached PickUp Point" onPress={reachedPickupPointHandler} style={{backgroundColor : '#0c4704'}}/>
        <OrangeButton
          onPress={() => {navigation.navigate('Ride Cancel')}}
          text="Cancel Ride"
          style={{ bottom: 10 }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  profileSection: {
    // flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
    borderColor : colors.primary,
    borderWidth : 0.5,
    height : '20%'
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex : 1,
    // backgroundColor : 'red'
  },
  userDetails: {
    marginLeft: 16,
    // backgroundColor : 'yellow',
    flex : 1,
    height : '80%',
    justifyContent : 'center',
    gap : 3
  },
  userName: {
    fontSize: 21,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    marginTop: 4,
  },
  balanceSection: {
    alignItems: "flex-end",
  },
  balanceText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
  },
  topUpButton: {
    marginTop: 8,
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
  },
  topUpButtonText: {
    fontSize: 14,
  },
  rideOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  rideOptionButton: {
    paddingHorizontal: 16,
  },
  rideOptionButtonSelected: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
  },
  rideDetails: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  bikeInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  bikeImage: {
    width: 60,
    height: 60,
    borderRadius : 30 ,
    marginRight: 16,
    borderWidth : 1,
    borderColor : '#ccc'
    // backgroundColor : 'grey'
  },
  arrivalText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bikeDetails: {
    fontSize: 14,
    color: "#555",
  },
  callButton: {
    marginLeft: "auto",
    backgroundColor: "#eee",
    padding: 8,
    borderRadius: 30,
  },
  tripRoute: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  routePoint: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  routeDetails: {
    marginLeft: 12,
  },
  routeText: {
    fontSize: 16,
  },
  amountSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  amountText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 30,
  },
  avatar: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  avatarAlt : {
    borderWidth: 2,
    borderColor: colors.primary,
    height : 75,
    width : 75,
    borderRadius : 50,
    alignItems : 'center',
    justifyContent : 'center'

  },
});

// Styles remain the same

export default CurrentRideDetailsScreen;
