import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Modal from "react-native-modal";

interface RideRequestModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  requestDetails: {
    name: string;
  };
}

export default function RatingModal({
  isVisible,
  onConfirm,
  onCancel,
  requestDetails,
}: RideRequestModalProps) {

  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      
    >
      <View style={styles.modalContent}>
        <Image
          source={require("../../../../assets/data/undraw.png")}
          style={styles.image}
        />
        <Text style={styles.confirmText}>Confirm?</Text>
        <Text style={styles.requestText}>
          You got a ride request from {requestDetails.name}.{"\n"}Please pick
          him up from his request location.
          {"\n"}Please go quick.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelButtonText}>✘</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
            <Text style={styles.confirmButtonText}>Confirm Request ➔</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 287,
    height: 213,
    marginBottom: 20,
  },
  confirmText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  requestText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  cancelButton: {
    backgroundColor: "red",
    borderRadius: 40,
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    height : 50,
    width : 50,
    alignItems : 'center',
    justifyContent : 'center',
    marginRight : 20
  },
  cancelButtonText: {
      color: "white",
      fontSize: 20,
  },
  confirmButton: {
    backgroundColor: "green",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems : 'center',
    justifyContent : 'center',
  },
  confirmButtonText: {
    color: "white",
    fontSize: 18,
  },
});
