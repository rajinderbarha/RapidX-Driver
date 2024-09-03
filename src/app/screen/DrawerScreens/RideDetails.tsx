import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { Avatar, Button, Icon } from "@rneui/base";
import OrangeButton from "../../../ui/OrangeButton";
import { useRoute } from "@react-navigation/native";
import getShortAddress, {
  separateAddress,
} from "../../../../util/getShortAddress";

const RideDetailScreen = () => {
  // const item = useRoute<any>().params;

  const item = {
    id: "1",
    rideInfo: {
      pickupLocation: {
        location: "Douglas Crescent Road , Venie",

        dateTime: "Mon 29, July 3:40PM",
      },
      dropLocation: {
        location: "Logan Avenue , Aura",
        dateTime: "Mon 29, July 3:55PM",
      },
    },
    driver: {
      name: "Gorge Jacob",
      bikeType: "Mini",
      bikeNumber: "G5-567-JH",
      imageUri: "https://randomuser.me/api/portraits/men/41.jpg",
      userRating: 4.5,
      driverRating: 5,
    },
    billDetail: {
      subtotal: 50.0,
      tax: 0.0,
      totalAmount: 50.0,
      paymentMethod: "Credit card",
    },
  };

  const pickupAddress = item.rideInfo.pickupLocation.location;
  const dropAddress = item.rideInfo.dropLocation.location;

  const pickupText = separateAddress(pickupAddress);
  const dropText = separateAddress(dropAddress);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Ride Detail */}
      <View style={styles.section}>
        <Text style={styles.heading}>Ride Detail</Text>
        <View style={styles.rideDetail}>
          <View style={styles.ridePoint}>
            <Icon name="radio-button-checked" type="material" color="green" />
            <View style={styles.rideInfo}>
              <Text style={styles.location}>{pickupText.primary}</Text>
              <Text style={styles.subText}>{pickupText.secondary}</Text>
              <Text style={styles.subText}>
                {item.rideInfo.pickupLocation.dateTime}
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.ridePoint}>
            <Icon name="radio-button-checked" type="material" color="red" />
            <View style={styles.rideInfo}>
              <Text style={styles.location}>{dropText.primary}</Text>
              <Text style={styles.subText}>{dropText.secondary}</Text>
              <Text style={styles.subText}>
                {item.rideInfo.dropLocation.dateTime}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Feedback */}
      <View
        style={[
          styles.section,
          {
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
            backgroundColor: "#f0efef",
            padding: 20,
          },
        ]}
      >
        <Text style={styles.heading}>Feedback</Text>
        <View style={styles.feedback}>
          <Icon name="star" type="material" color="gold" />
          <Icon name="star" type="material" color="gold" />
          <Icon name="star" type="material" color="gold" />
          <Icon name="star" type="material" color="gold" />
          <Icon name="star" type="material" color="gold" />
        </View>
        <Text style={styles.subText}>Rider gave you 5 star rating</Text>
      </View>

      {/* Bill Detail */}
      <View style={[styles.section, { marginVertical: 20 }]}>
        <Text style={styles.heading}>Bill Detail</Text>
        <View style={styles.billDetail}>
          <View style={styles.billRow}>
            <Text style={styles.billText}>Subtotal</Text>
            <Text style={styles.billText}>${item.billDetail.subtotal}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billText}>Tax</Text>
            <Text style={styles.billText}>${item.billDetail.tax}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.totalAmount}>Total Amount</Text>
            <Text style={styles.totalAmount}>
              ${item.billDetail.totalAmount}
            </Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billText}>Payment</Text>
            <Text style={styles.billText}>{item.billDetail.paymentMethod}</Text>
          </View>
        </View>
      </View>

      {/* Get Invoice Button */}
      <OrangeButton text="Get Invoice" onPress={() => {}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  rideDetail: {
    backgroundColor: "#F9F9F9",
    padding: 15,
    borderRadius: 10,
  },
  ridePoint: {
    flexDirection: "row",
    alignItems: "center",
  },
  rideInfo: {
    marginLeft: 10,
  },
  location: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subText: {
    color: "gray",
  },
  line: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 15,
  },
  driverDetail: {
    flexDirection: "row",
    alignItems: "center",
  },
  driverInfo: {
    marginLeft: 15,
  },
  driverName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bikeInfo: {
    marginLeft: "auto",
    alignItems: "flex-end",
  },
  bikeType: {
    fontWeight: "bold",
  },
  feedback: {
    flexDirection: "row",
    marginBottom: 5,
  },
  billDetail: {
    backgroundColor: "#F9F9F9",
    padding: 15,
    borderRadius: 10,
  },
  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  billText: {
    fontSize: 16,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#FF6F00",
    borderRadius: 50,
    paddingVertical: 15,
  },
});

export default RideDetailScreen;
