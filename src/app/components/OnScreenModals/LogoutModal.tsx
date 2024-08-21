import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import Modal from "react-native-modal";
import OrangeButton from "../../../ui/OrangeButton";
import SelectLocationButton from "../../../ui/SelectLocationButton";

export default function LogoutModal({ isVisible, onClose, onConfirm }: any) {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>LogOut?</Text>
        <Text style={styles.modalText}>Are you sure you want to logout?</Text>
        <View style={styles.buttonContainer}>
            <View style = {styles.button}>
          <SelectLocationButton
            text="CANCEL"
            iconName={null}
            onPress={onClose}
            style={{
              height: 35,
              padding: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          </View>
          <View style = {[styles.button,{marginLeft : 18}]}>
          <OrangeButton
            text={"LOGOUT"}
            onPress={onConfirm}
            style={{ height: 35, padding: 0, width : 150, margin : 0 }}
            
          />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 21,
    fontWeight: "700",
    marginBottom: 10,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems : 'center',
    marginBottom: 20,
    // backgroundColor: "#007BFF",
    justifyContent : 'space-around',
    width : '100%',
    gap : 15
  },
  button: {
    // backgroundColor: "#007BFF",
    borderRadius: 5,
    marginRight : 14
  },
  buttonText: {
    color: "white",
  },
});
