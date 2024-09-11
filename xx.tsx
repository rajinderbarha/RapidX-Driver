

// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import * as geolib from 'geolib';

// const SOCKET_URL = 'http://localhost:8000'; // Adjust to your server's address

// const App = () => {
//     const [socket, setSocket] = useState(null);
//     const [rideRequest, setRideRequest] = useState(null);
//     const [isAccepted, setIsAccepted] = useState(false);
//     const [driverLocation, setDriverLocation] = useState(null);
//     const [rideStatus, setRideStatus] = useState(null);

//     useEffect(() => {
//         const newSocket = io(SOCKET_URL);
//         setSocket(newSocket);
        
//         // Emit event when driver comes online
//         newSocket.emit('driver-online', {
//             driverId: '66cc06b180f6a4d3dfaf9c1c',
//             location: {
//                 longitude: 76.7790, // Driver's starting longitude
//                 latitude: 30.7330  // Driver's starting latitude
//             }
//         });

//         // Handle incoming ride request
//         newSocket.on('ride-request', (rideDetails) => {
//             console.log('Ride request received:', rideDetails);
//             setRideRequest(rideDetails);
//             setDriverLocation({
//                 longitude: 76.7790,
//                 latitude: 30.7330,
//             });
//         });

//         // Handle driver location updates from the server
//         newSocket.on('driver-location-updated', (location) => {
//             console.log("Driver location updated:", location);
//             setDriverLocation(location);
//         });

//         // Handle ride cancellation
//         newSocket.on('ride-cancelled', (data) => {
//             console.log(`Ride ${data.rideId} was cancelled by ${data.cancelled_by}`);
//             alert(`Ride has been cancelled by ${data.cancelled_by}.`);
//             setRideRequest(null); // Reset the ride request state
//             setIsAccepted(false); // Reset acceptance status
//         });

//         // Handle ride status updates
//         newSocket.on('ride-status-updated', (data) => {
//             console.log(`Ride status updated: ${data.status}`);
//             setRideStatus(data.status);

//             if (data.status === 'completed') {
//                 alert('Ride has been completed!');
//                 setIsAccepted(false); // Reset the state after ride completion
//             }
//         });

//         return () => {
//             // Clean up event listeners and socket connection on component unmount
//             newSocket.off('ride-request');
//             newSocket.off('driver-location-updated');
//             newSocket.off('ride-cancelled');
//             newSocket.off('ride-status-updated');
//             newSocket.disconnect();
//         };
//     }, []);

//     // Accept ride and start moving the driver
//     const acceptRide = () => {
//         if (socket && rideRequest && !isAccepted) {
//             const locationData = {
//                 longitude: 76.7794, // Simulating slight movement
//                 latitude: 30.7333,
//             };

//             socket.emit('ride-accept', {
//                 driverId: '66cc06b180f6a4d3dfaf9c1c',
//                 rideId: rideRequest._id,
//                 location: locationData,
//             });

//             console.log('Ride accepted by driver with id:66cc06b180f6a4d3dfaf9c1c');
//             setIsAccepted(true);
//         }
//     };

//     // Helper function to calculate the next step towards the target
//     const moveTowards = (currentLocation, targetLocation, stepSize) => {
//         const distanceToTarget = calculateDistance(currentLocation, targetLocation);
//         if (distanceToTarget < stepSize) {
//             return targetLocation; // Move directly to the target if within one step
//         }

//         const ratio = stepSize / distanceToTarget;
//         const newLongitude = currentLocation.longitude + (targetLocation.longitude - currentLocation.longitude) * ratio;
//         const newLatitude = currentLocation.latitude + (targetLocation.latitude - currentLocation.latitude) * ratio;

//         return {
//             longitude: newLongitude,
//             latitude: newLatitude,
//         };
//     };


//     // Calculate the distance between two coordinates
//     const calculateDistance = (coord1, coord2) => {
//         return geolib.getDistance(
//             { latitude: coord1.latitude, longitude: coord1.longitude },
//             { latitude: coord2.latitude, longitude: coord2.longitude }
//         );
//     };

//     // Handle ride cancellation
//     const cancelRide = () => {
//         if (socket && rideRequest) {
//             socket.emit('cancel-ride', {
//                 rideId: rideRequest._id,
//                 cancelled_by: 'driver',  // Change this depending on who cancels
//             });
//             console.log(`Cancel ride event emitted for ride ID: ${rideRequest._id}`);
//         }
//     };

//     // Simulate driver movement towards the user and then towards the destination
//     useEffect(() => {
//         const REACH_THRESHOLD = 50; // 50 meters threshold
//         if (isAccepted) {
//             const stepSize = 20; // Simulate movement step size

//             const locationInterval = setInterval(() => {
//                 if (driverLocation && rideRequest) {
//                     // Check if the driver has reached the user origin
//                     const distanceToUser = calculateDistance(driverLocation, rideRequest.user_origin);

//                     if (distanceToUser > REACH_THRESHOLD) {
//                         // Move towards user origin
//                         const nextLocation = moveTowards(driverLocation, rideRequest.user_origin, stepSize);
//                         setDriverLocation(nextLocation);

//                         socket.emit('driver-location-updated', {
//                             driverId: '66cc06b180f6a4d3dfaf9c1c',
//                             location: nextLocation,
//                         });

//                         console.log(`Updated location towards user: ${JSON.stringify(nextLocation)}`);
//                     } else {
//                         console.log('Driver has reached the user.');
//                         socket.emit('driver-reached-user', { rideId: rideRequest._id });

//                         // Check distance to destination once user is picked up
//                         const distanceToDestination = calculateDistance(driverLocation, rideRequest.user_destination);

//                         if (distanceToDestination > REACH_THRESHOLD) {
//                             const nextLocation = moveTowards(driverLocation, rideRequest.user_destination, stepSize);
//                             console.log(`Current Location: ${JSON.stringify(driverLocation)}`);
//                             console.log(`Next Location: ${JSON.stringify(nextLocation)}`);
//                             setDriverLocation(nextLocation);

//                             socket.emit('driver-location-updated', {
//                                 driverId: '66cc06b180f6a4d3dfaf9c1c',
//                                 location: nextLocation,
//                             });

//                             console.log(`Updated location towards destination: ${JSON.stringify(nextLocation)}`);
//                         } else {
//                             console.log('Driver has reached the destination.');
//                             clearInterval(locationInterval); // Stop updating location
//                             socket.emit('update-ride-status', { ride_id: rideRequest._id, status: 'completed' });
//                         }
//                     }
//                 }
//             }, 5000); // Update location every second

//             return () => clearInterval(locationInterval); // Cleanup interval
//         }
//     }, [isAccepted, socket, driverLocation, rideRequest]);



//     return (
//         <div>
//             <h1>Driver Simulation</h1>
//             {rideRequest ? (
//                 <div>
//                     <p>Pickup: {rideRequest.pickupAddress}</p>
//                     <p>Dropoff: {rideRequest.dropAddress}</p>
//                     {!isAccepted && <button onClick={acceptRide}>Accept Ride</button>}
//                     {isAccepted && (
//                         <div>
//                             <button onClick={cancelRide}>Cancel Ride</button>
//                         </div>
//                     )}
//                 </div>
//             ) : (
//                 <p>Waiting for ride request...</p>
//             )}
//             {driverLocation && (
//                 <div>
//                     <h2>Driver's Real-Time Location</h2>
//                     <p>Longitude: {driverLocation.longitude}</p>
//                     <p>Latitude: {driverLocation.latitude}</p>
//                 </div>
//             )}
//             {rideStatus && (
//                 <div>
//                     <p>Ride Status: {rideStatus}</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default App;
