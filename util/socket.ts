import { io } from "socket.io-client";

interface Location {
    lat: number;
    lng: number;
}

const socket = io("https://rw6v05jh-8000.inc1.devtunnels.ms/");

export default socket;

// export function driverLocationUpdate(location: Location, driverId : string) {
//     socket.emit('driver-location-updated', {
//         driverId: driverId,
//         location: location,  // Use the location parameter
//     });
//     console.log('driverLocation Updated')
// }
