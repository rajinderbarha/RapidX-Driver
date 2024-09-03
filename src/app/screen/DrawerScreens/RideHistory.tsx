import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import RideItemComponent from "../../components/MyRides/RideItemComponent";

const rideDetailsArray = [
  {
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

    billDetail: {
      subtotal: 50.0,
      tax: 0.0,
      totalAmount: 50.0,
      paymentMethod: "Credit card",
    },
  },
  {
    id: "2",
    rideInfo: {
      pickupLocation: {
        location: "Maple Street, Downtown",
        dateTime: "Tue 30, July 10:00AM",
      },
      dropLocation: {
        location: "Pine Avenue, Midtown",
        dateTime: "Tue 30, July 10:25AM",
      },
    },

    billDetail: {
      subtotal: 35.0,
      tax: 2.5,
      totalAmount: 37.5,
      paymentMethod: "UPI",
    },
  },
];

export default function RideHistoryScreen() {
  const navigation = useNavigation<any>();
  return (
    <View style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
      <FlatList
        data={rideDetailsArray}
        renderItem={({ item }) => {
          console.log("Rendering item:", item);
          return (
            <View style={{ flex: 1, marginVertical: 10 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Ride Details", item)}
              >
                <RideItemComponent
                  dropAddress={item.rideInfo.dropLocation.location}
                  pickupAddress={item.rideInfo.pickupLocation.location}
                  dropDateTime={item.rideInfo.dropLocation.dateTime}
                  pickupDateTime={item.rideInfo.pickupLocation.dateTime}
                  total={item.billDetail.totalAmount}
                />
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10 }} // Add padding for visibility
      />
    </View>
  );
}
