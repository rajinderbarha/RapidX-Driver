import { createContext, PropsWithChildren, useState } from "react";

interface RideContextInterface {
  riderDetails: {
    name: string;
    pickupLocation: {
      latitude: number;
      longitude: number;
    };
    dropLocation: {
      latitude: number;
      longitude: number;
    };
  } | null;
  setRiderDetails: (details: {
    name: string;
    pickupLocation: {
      latitude: number;
      longitude: number;
    };
    dropLocation: {
      latitude: number;
      longitude: number;
    };
  }) => void;
  rideConfirmed: boolean;
  setRideConfirmed: (prev: any) => void;
  cancelRide: boolean | null;
  setCancelRide: (prev: any) => void;
  reachedPickupLocation: boolean | null;
  setReachedPickupLocation: (prev: any) => void;
  nearPickupLocation: boolean | null;
  setNearPickupLocation: (prev: any) => void;
  reset : ()=>void
}

export const RideContext = createContext<RideContextInterface>({
  riderDetails: null,
  setRiderDetails: () => {},
  cancelRide: null,
  setCancelRide: () => {},
  rideConfirmed: false,
  setRideConfirmed: () => {},
  reachedPickupLocation: false,
  setReachedPickupLocation: () => {},
  nearPickupLocation: null,
  setNearPickupLocation : ()=>{},
  reset : ()=>{}
});

export default function RideContextProvide({ children }: PropsWithChildren) {
  const [rideConfirmed, setRideConfirmed] = useState(false);
  const [cancelRide, setCancelRide] = useState(null);
  const [reachedPickupLocation, setReachedPickupLocation] = useState(null);
  const [nearPickupLocation, setNearPickupLocation] = useState(null);

  const [riderDetails, setRiderDetails] =
    useState<RideContextInterface["riderDetails"]>(null);

  function reset() {
    setRideConfirmed(false);
    setReachedPickupLocation(null);
    setRiderDetails(null);
  }

  const value = {
    reset,
    riderDetails,
    setRiderDetails,
    rideConfirmed,
    setRideConfirmed,
    cancelRide,
    setCancelRide,
    reachedPickupLocation,
    setReachedPickupLocation,
    nearPickupLocation,
    setNearPickupLocation
    
  };
  return <RideContext.Provider value={value}>{children}</RideContext.Provider>;
}
