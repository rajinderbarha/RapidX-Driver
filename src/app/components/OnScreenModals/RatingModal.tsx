import { AirbnbRating, Avatar, Icon } from "@rneui/base";
import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from "react-native";
import Modal from "react-native-modal";
import { colors } from "../../../../constants/colors";
import OrangeButton from "../../../ui/OrangeButton";
import { RideContext } from "../../../store/RideContext";

interface RideRequestModalProps {
  isVisible: boolean;
  // onConfirm: () => void;
  // onCancel: () => void;
  // requestDetails: {
  //   name: string;
  // };
}

export default function RatingModal({ isVisible }: RideRequestModalProps) {
const driver = {
  rating : 5,
  name : 'vv'
}
const {reset} = useContext(RideContext)
  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      {/* <View style={styles.root}> */}
       <View style={styles.container}>
      
        <View style={styles.ratingContainer}>
          <Text style={styles.questionText}>How was your Trip?</Text>
          <AirbnbRating
            count={5}
            defaultRating={0}
            size={30}
            showRating={false}
            selectedColor="yellow"
            starContainerStyle={styles.ratingInput}
          />
        </View>
        <TextInput
          style={styles.commentInput}
          placeholder="Comment"
          multiline
        />

        <OrangeButton
          text="Send"
          onPress={() => reset()}
        />
      </View>
      {/* </View> */}
    </Modal>
  );
}

const styles = StyleSheet.create({
  root:{
    // flex : 1,
    // backgroundColor : 'white',
    // alignItems : 'center',
    // justifyContent : 'center'
  },
  container: {
    // flex: 1,
    padding: 20,
    // backgroundColor : 'red',
    width: "100%",
    // backgroundColor : 'white',
    justifyContent : 'space-between',
    gap : 10
  },
  driverInfo: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: colors.primary,
    width: "100%",
    paddingBottom: 20,
  },
  driverImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  ratingContainer: {
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 15,
  },
  driverName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  rating: {
    marginTop: 5,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  ratingInput: {
    marginBottom: 20,
  },
  commentInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    marginHorizontal: 20,
    color: "black",
    height: 80,
  },
  sendButton: {
    backgroundColor: "#FF4500",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
