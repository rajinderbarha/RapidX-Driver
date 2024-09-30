// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import io from 'socket.io-client';

// const DriverHome = () => {
//   const [driverData, setDriverData] = useState(null);
//   const [rideRequest, setRideRequest] = useState(null);
//   const [rideDetails, setRideDetails] = useState(null);
//   const [userDetails, setUserDetails] = useState(null);
//   const [socket, setSocket] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [manualLatitude, setManualLatitude] = useState('');
//   const [manualLongitude, setManualLongitude] = useState('');
//   const [rideAccepted, setRideAccepted] = useState(false);
//   const [driverLocation, setDriverLocation] = useState(null);
//   const [userLocation, setUserLocation] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchDriverData = async () => {
//       try {
//         const token = localStorage.getItem('driverToken');
//         const driver = JSON.parse(localStorage.getItem('driverData'));

//         if (!token || !driver) {
//           router.push('/login');
//         } else {
//           setDriverData(driver);
//           setLoading(false);

//           // Connect to socket server
//           const socketConnection = io('http://localhost:8000', {
//             query: { driverId: driver._id },  // Send driver ID as query param
//           });
//           setSocket(socketConnection);

//           // Emit driver connection event
//           socketConnection.emit('driverConnected', { driverId: driver._id });

//           // Listen for new ride requests
//           socketConnection.on('rideRequest', (data) => {
//             console.log('Received ride request:', data);
//             setRideRequest(data);
//           });

//           // Listen for ride confirmation
//           socketConnection.on('rideConfirmed', (data) => {
//             console.log('Ride confirmed for driver:', data);
//             setRideDetails(data.rideDetails);
//             setUserDetails(data.userDetails);
//           });
//           socketConnection.on('userLocationUpdate', ({ userLocation }) => {
//             console.log('Received user location update:', userLocation);
//             setUserLocation(userLocation); // Update user location
//           });
  
//           // Listen for driver location updates
//           socketConnection.on('driverLocationUpdate', ({ driverLocation }) => {
//             setDriverLocation(driverLocation); // Set driver's own location
//           });
//           // Handle socket errors
//           socketConnection.on('error', (err) => {
//             console.error('Socket error:', err);
//             setError('Socket connection error');
//           });

//           // Clean up on component unmount
//           return () => {
//             if (socketConnection) socketConnection.disconnect();
//           };
//         }
//       } catch (err) {
//         console.error('Error fetching driver data:', err);
//         setError('Failed to load driver data.');
//         setLoading(false);
//       }
//     };

//     fetchDriverData();
//   }, [router]);

//   const handleAcceptRide = () => {
//     if (rideRequest && socket) {
//       console.log('Sending acceptRide event:', { rideId: rideRequest.rideId, driverId: driverData._id });
//       socket.emit('acceptRide', { rideId: rideRequest.rideId, driverId: driverData._id });

//       setManualLatitude('');
//       setManualLongitude('');


//       // Indicate that the ride has been accepted
//       setRideAccepted(true);

//       // Emit driver's initial location
//       updateLocation();

//       // Reset the state after accepting
//       setRideRequest(null);
//       setRideDetails(null);
//       setUserDetails(null);
//     }
//   };

//   const handleRejectRide = () => {
//     if (rideRequest && socket) {
//       console.log('Sending rejectRide event:', { rideId: rideRequest.rideId, driverId: driverData._id });
//       socket.emit('rejectRide', { rideId: rideRequest.rideId, driverId: driverData._id });
//       // Reset the state after rejecting
//       setRideRequest(null);
//     }
//   };

//   const cancelRide = (rideId, cancelledBy) => {
//     if (rideDetails && socket) {
//       console.log('Sending cancelRide event:', { rideId, cancelledBy });
//       socket.emit('cancelRide', { rideId, cancelledBy });
//       // Reset the state after cancellation
//       setRideDetails(null);
//       setUserDetails(null);
//     }
//   };

//   useEffect(() => {
//     if (socket) {
//       socket.on('rideCancelled', (data) => {
//         console.log(data.message);
//         console.log('Ride was cancelled by:', data.cancelledBy);
//         alert(`Ride was cancelled by ${data.cancelledBy}`);
//         // Reset the state after ride cancellation
//         setRideDetails(null);
//         setUserDetails(null);
//       });
//     }
//   }, [socket]);

//   const updateLocation = () => {
//     if (manualLatitude && manualLongitude) {
//       const newLocation = {
//         coordinates: [parseFloat(manualLongitude), parseFloat(manualLatitude)],
//       };
//       // Emit location update to server
//       console.log('Updating driver location:', newLocation);
//       // Update local driverData
//       setDriverData(prev => ({ ...prev, location: newLocation }));
//       // Emit this new location to the server
//       if (socket) {
//         socket.emit('driverLocationUpdate', { driverId: driverData._id, location: newLocation });
//       }
//     } else {
//       alert('Please enter valid latitude and longitude values.');
//     }
//   };


//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <div>
//       <h1>Driver Dashboard</h1>
//       {driverData ? (
//         <>
//           <p><strong>Phone Number:</strong> {driverData.phone_number}</p>
//           <p><strong>ID:</strong> {driverData._id}</p>
//           <p><strong>SOCKET ID:</strong> {driverData.socket_id || 'N/A'}</p>
//           <p><strong>Name:</strong> {driverData.first_name} {driverData.last_name}</p>
//           <p><strong>Location:</strong> {driverData.location?.coordinates?.join(', ') || 'Location not available'}</p>
//           <p><strong>Status:</strong> {driverData.is_new_user ? 'New Driver' : 'Existing Driver'}</p>



//           {rideRequest ? (
//             <div>
//               <h2>New Ride Request</h2>
//               <p><strong>Ride ID:</strong> {rideRequest.rideId}</p>
//               <p><strong>Pickup Address:</strong> {rideRequest.pickupAddress}</p>
//               <p><strong>Drop-off Address:</strong> {rideRequest.dropAddress}</p>
//               <button onClick={handleAcceptRide}>Accept Ride</button>
//               <button onClick={handleRejectRide}>Reject Ride</button>
//             </div>
//           ) : rideDetails && userDetails ? (
//             <div>
//               <h2>Ride Details</h2>
//               <p><strong>Ride ID:</strong> {rideDetails._id}</p>
//               <p><strong>Pickup Address:</strong> {rideDetails.pickupAddress}</p>
//               <p><strong>Drop-off Address:</strong> {rideDetails.dropAddress}</p>
//               <p><strong>Distance:</strong> {rideDetails.distance} km</p>
//               <p><strong>Duration:</strong> {rideDetails.duration} minutes</p>
//               <h2>Location Updates</h2>
//               <p><strong>Driver Location:</strong> {driverLocation ? `${driverLocation.latitude}, ${driverLocation.longitude}` : 'Not available'}</p>
//               <p><strong>User Location:</strong> {userLocation ? `${userLocation.latitude}, ${userLocation.longitude}` : 'Not available'}</p>
//               <h2>Manual Location Input (for testing)</h2>
//               <input
//                 type="text"
//                 placeholder="Enter Latitude"
//                 value={manualLatitude}
//                 onChange={(e) => setManualLatitude(e.target.value)}
//               />
//               <input
//                 type="text"
//                 placeholder="Enter Longitude"
//                 value={manualLongitude}
//                 onChange={(e) => setManualLongitude(e.target.value)}
//               />
//               <button onClick={updateLocation}>Update Location</button>
//               <h2>User Details</h2>
//               <p><strong>User Id:</strong> {userDetails._id}</p>
//               <p><strong>Name:</strong> {userDetails.firstName} {userDetails.lastName}</p>
//               <p><strong>Phone Number:</strong> {userDetails.phoneNumber}</p>
//               <p><strong>Email:</strong> {userDetails.email}</p>
//               <p><strong>User Location:</strong> {userDetails.location}</p>
//               <button onClick={() => cancelRide(rideDetails._id, 'driver')} style={{ backgroundColor: 'red', color: 'white' }}>
//                 Cancel Ride
//               </button>
//             </div>
//           ) : (
//             <p>No new ride requests</p>
//           )}
//         </>
//       ) : (
//         <p>Unable to fetch driver information.</p>
//       )}
//     </div>
//   );
// };

// export default DriverHome;
