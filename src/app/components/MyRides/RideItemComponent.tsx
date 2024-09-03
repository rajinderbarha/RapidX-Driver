import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { separateAddress } from "../../../../util/getShortAddress";

interface RideItemProps {
  pickupAddress: string;
  dropAddress: string;
  pickupDateTime: string;
  dropDateTime: string;
  total: string | number;
}

export default function RideItemComponent({
  pickupAddress,
  dropAddress,
  pickupDateTime,
  dropDateTime,
  total,
}: RideItemProps) {
  // const truncateAddress = (address: string, maxLength = 48) => {
  //   return address.length > maxLength
  //     ? address.slice(0, maxLength) + "..."
  //     : address;
  // };

  const pickupText = separateAddress(pickupAddress);
  const dropText = separateAddress(dropAddress);

  return (
    <View style={styles.rootContainer}>
      <View style={{ flexDirection: "row" }}>
        <View style={[styles.imageContainer]}>
          <Image
            source={require("../../../../assets/data/greenCircle.png")}
            style={styles.circleImage}
          />
          <View style={styles.verticalLine}></View>
          <Image
            source={require("../../../../assets/data/redCircle.png")}
            style={styles.circleImage}
          />
        </View>
        <View style={styles.locationContainer}>
          <View style={[styles.locations]}>
            <Text style={styles.label}>{pickupText.primary}</Text>
            <Text>{pickupText.secondary}</Text>
            <Text style={styles.label}>{pickupDateTime}</Text>
          </View>
          <View style={[styles.locations]}>
            <Text style={styles.label}>{dropText.primary}</Text>
            <Text>{dropText.secondary}</Text>
            <Text style={styles.label}>{dropDateTime}</Text>
          </View>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.price}>${total}</Text>
        <Text style={[styles.status, { color: "#50D83D" }]}>Status</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    borderWidth: 0.5,
    borderColor: "#ccccccf6",
    backgroundColor: "white",
    flexDirection: "column",
    // height: 230,
    alignSelf: "center",
    // borderRadius: 22,
    // overflow: "hidden",
    // elevation: 7,
    marginTop: 2,
    // position: "absolute",
    top: 0,
    width: "95%",
    zIndex: 100,
  },

  rootContainerr: {
    borderWidth: 0.5,
    borderColor: "#ccccccf6",
    backgroundColor: "#ffffff",
    alignSelf: "center",
    marginTop: 10,
    width: "95%",
    // zIndex: 1, // reduced zIndex to a normal range
    // position: "relative", // changed to relative to avoid stacking issues
  },
  // other styles remain the same

  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 33,
  },
  locationContainer: {
    flex: 5,
    padding: 10,
    paddingLeft: 0,
  },
  verticalLine: {
    height: "40%",
    borderLeftWidth: 1,
    width: 4,
    marginLeft: 3,
    borderStyle: "dotted",
  },
  locations: {
    flex: 1,
    gap: 4,
    paddingTop: 15,
  },
  circleImage: {
    width: 20,
    height: 20,
  },
  inputs: {
    borderBottomWidth: 2,
    marginLeft: 4,
    borderColor: "#cccccc",
    color: "black",
  },
  inputBackground: {
    backgroundColor: "white",
  },
  label: {
    fontSize: 16,
  },
  pressed: {
    opacity: 0.5,
  },
  detailsContainer: {
    // backgroundColor: "red",
    borderTopWidth: 1,
    borderTopColor: "#cccccc9c",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 50,
    paddingVertical: 5,
  },
  price: {
    fontSize: 17,
    fontWeight: "bold",
  },
  status: {
    fontWeight: "500",
  },
});
