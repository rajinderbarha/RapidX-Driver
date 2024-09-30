// socket.on("driverReachedUser", ({ rideId, driverId }) => {
//     const rideRoom = `ride_${rideId}`;
//     io.to(rideRoom).emit("driverReachedUser", { rideId, driverId, message: "Driver has reached your location" });
//     console.log(`Driver ${driverId} reached pickup location for ride ${rideId}`);
//   });

//   ///// USER PICKED UP BY DRIVER 
//   socket.on("userPickedUp", ({ rideId, driverId }) => {
//     const rideRoom = `ride_${rideId}`;
//     io.to(rideRoom).emit("rideStarted", { rideId, driverId, message: "Ride started" });
//     io.to(rideRoom).emit("rideStatusUpdate", { status: "userPickedUp" });
//     console.log(`Ride ${rideId} started with driver ${driverId}`);
//   });


//   ///// DRIVER & USER  REACHED DROP OFF LOCATION 
//   socket.on("reachedDestination", ({ rideId, driverId }) => {
//     const rideRoom = `ride_${rideId}`;
//     io.to(rideRoom).emit("rideCompleted", { rideId, message: "Driver has reached the destination" });
//     console.log(`Driver ${driverId} reached the destination for ride ${rideId}`);
//   });

//   ///// PAYMENT INITIATED 
//   socket.on("initiatePayment", async ({ rideId, userId, paymentAmount }) => {
//     const rideRoom = `ride_${rideId}`;
//     // Emit to the user the payment link or gateway
//     io.to(rideRoom).emit("paymentRequest", { message: "Please proceed with the payment", amount: paymentAmount });
//     console.log(`Payment initiated for ride ${rideId}`);
//   });

//   ///// PAYMENT COMPLETED
//   socket.on("paymentCompleted", async ({ rideId, userId, paymentId }) => {
//     const rideRoom = `ride_${rideId}`;
//     // Update the ride status to 'completed'
//     const ride = await Ride.findByIdAndUpdate(rideId, { status: "completed", payment_id: paymentId }, { new: true });
//     if (ride) {
//       io.to(rideRoom).emit("rideCompleted", { message: "Ride and payment completed", rideDetails: ride });
//       console.log(`Ride ${rideId} completed with payment`);
//     } else {
//       socket.emit("rideCompletionError", { message: "Error completing ride" });
//     }
//   });


//   // FOR DRIVER FEEDBACK 
//   socket.on("driverFeedback", async ({ rideId, userId, rating, feedback }) => {
//     const ride = await Ride.findById(rideId);
//     if (ride) {
//       // Update driver's rating based on feedback
//       const driver = await Driver.findById(ride.driver_details._id);
//       driver.rating = (driver.rating + rating) / 2; // Update driver's rating
//       await driver.save();
//       console.log(`User ${userId} gave driver ${driver._id} a rating of ${rating}`);
//     }
//   });