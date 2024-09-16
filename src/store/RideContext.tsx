import { createContext, PropsWithChildren, useState } from "react";

interface RideContextInterface {
  rideConfirmed: boolean;
  setRideConfirmed: (prev: any) => void;
  cancelRide: boolean | null;
  setCancelRide: (prev: any) => void;
  reachedPickupLocation: boolean | null;
  setReachedPickupLocation: (prev: any) => void;
  nearPickupLocation: boolean | null;
  setNearPickupLocation: (prev: any) => void;
  reset: () => void;
  nearDropLocation: boolean;
  setNearDropLocation: (value: boolean) => void;
  isRideFinished: boolean;
  setIsRideFinished: (value: boolean) => void;
  incomingRide: boolean;
  setIncomingRide: (value: boolean) => void;
  riderDetails: {
    userName: string;
    distance: string | number;
    dropAddress: string;
    duration: number;
    pickupAddress: string;
    user_destination: {
      latitude: number;
      longitude: number;
    };
    ride_id: string;
    user_origin: {
      latitude: number;
      longitude: number;
    } 
  } | null;
  setRiderDetails: (details: {
    userName: string;
    distance: string | number;
    dropAddress: string;
    duration: number;
    pickupAddress: string;
    user_destination: {
      latitude: number;
      longitude: number;
    };
   ride_id: string;
    user_origin: {
      latitude: number;
      longitude: number;
    } 
  } | null) => void;
  isSocketConnected : boolean;
  setIsSocketConnected : (state : boolean)=>void
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
  setNearPickupLocation: () => {},
  reset: () => {},
  nearDropLocation: false,
  setNearDropLocation: () => {},
  isRideFinished: false,
  setIsRideFinished: () => {},
  incomingRide : false,
  setIncomingRide : ()=>{},
  isSocketConnected : false,
  setIsSocketConnected : ()=>{}
  
});

export default function RideContextProvide({ children }: PropsWithChildren) {
  const [incomingRide, setIncomingRide] = useState(false);
  const [rideConfirmed, setRideConfirmed] = useState(false);
  const [cancelRide, setCancelRide] = useState(null);
  const [reachedPickupLocation, setReachedPickupLocation] = useState(null);
  const [nearPickupLocation, setNearPickupLocation] = useState(null);
  const [nearDropLocation, setNearDropLocation] = useState(false);
  const [isRideFinished, setIsRideFinished] = useState(false);
  const [riderDetails, setRiderDetails] =
    useState<RideContextInterface["riderDetails"]>(null);
    const [isSocketConnected, setIsSocketConnected] = useState(false);


  function reset() {
    setCancelRide(null);
    setRideConfirmed(false);
    setRiderDetails(null);
    setNearPickupLocation(null);
    setReachedPickupLocation(null);
    setIsRideFinished(false);
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
    setNearPickupLocation,
    nearDropLocation,
    setNearDropLocation,
    isRideFinished,
    setIsRideFinished,
    incomingRide,
    setIncomingRide,
    isSocketConnected,
    setIsSocketConnected
  };
  return <RideContext.Provider value={value}>{children}</RideContext.Provider>;
}
