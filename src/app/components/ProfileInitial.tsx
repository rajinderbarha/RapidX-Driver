import { StyleSheet, Text, View } from "react-native";

interface props {
    name : string
}

export default function ProfileInitial({name} : props){
  return (
    <View style = {styles.initialContainer}>
        <Text style = {styles.initialText}>{name[0].toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    initialContainer: {
        // flex : 1,
        width: '100%',
        height: '100%',
        borderRadius: 200,
        backgroundColor: "#d5dbe2", // Blue background
        justifyContent: "center",
        alignItems: "center",
      },
      initialText: {
        color: "#070707",
        fontSize: 40,
        fontWeight: "bold",
      },
});