import { createContext, PropsWithChildren, useEffect, useState } from "react";
import * as Location from "expo-location";

interface LocationContextType {
  location: Location.LocationObject | null;
  // pickedLocation: MarkerProps | null;
  // setPickedLocation: (location: MarkerProps | null) => void;
  // dropLocation: MarkerProps | null;
  // setDropLocation: (location: MarkerProps | null) => void;
  // pickupAddress: string;
  // setPickupAddress: (address: string) => void;
  // dropAddress: string;
  // setDropAddress: (address: string) => void;
  distance: string;
  setDistance: (distance: string) => void;
  // reset: () => void,
  // fare : number | null;
  // setFare : (fare : number)=> void;
}

interface MarkerProps {
  latitude: number;
  longitude: number;
}

export const LocationContext = createContext<LocationContextType>({
  location: null,
  // pickedLocation: null,
  // setPickedLocation: () => {},
  // dropLocation: null,
  // setDropLocation: () => {},
  // pickupAddress: "",
  // setPickupAddress: () => {},
  // dropAddress: "",
  // setDropAddress: () => {},
  distance: "",
  setDistance: () => {},
  // reset: () => {},
  // fare : 0 ,
  // setFare : ()=>{}
});

export default function LocationContextProvider({
  children,
}: PropsWithChildren) {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  // const [pickedLocation, setPickedLocation] = useState<MarkerProps | null>(null);
  // const [dropLocation, setDropLocation] = useState<MarkerProps | null>(null);
  // const [pickupAddress, setPickupAddress] = useState("");
  // const [dropAddress, setDropAddress] = useState("");
  const [distance, setDistance] = useState("");
  // const [fare, setFare] = useState(0);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);



  // const reset = () => {
  //   setPickedLocation(null);
  //   setDropLocation(null);
  //   setPickupAddress("");
  //   setDropAddress("");
  //   setDistance("");
  // };



  useEffect(() => {
    async function fetchLocation() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync();
        setLocation(currentLocation);
      } catch (error) {
        console.error("Error fetching location: ", error);
        setErrorMsg("Error fetching location");
      }
    }

    fetchLocation();
  }, []);

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    async function startWatchingPosition() {
      try {
        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.BestForNavigation,
            distanceInterval: 1,
            timeInterval: 1000,
          },
          (newLocation) => {
            setLocation(newLocation);
          }
        );
      } catch (error) {
        console.error("Error watching position: ", error);
        setErrorMsg("Error watching position");
      }
    }

    startWatchingPosition();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [errorMsg]);

  return (
    <LocationContext.Provider
      value={{
        location,
        // pickedLocation,
        // setPickedLocation,
        // dropLocation,
        // setDropLocation,
        // pickupAddress,
        // setPickupAddress,
        // dropAddress,
        // setDropAddress,
        distance,
        setDistance,
        // reset,
        // fare,
        // setFare
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}
