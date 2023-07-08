"use strict";
require("dotenv").config();
const port = process.env.PORT || 3030;

const ioServer = require("socket.io")(port);

ioServer.on("connection", (socket) => {
  console.log("connected ", socket.id);
  socket.on('newFlight',()=>{
    setInterval(()=>{
    console.log("xoxoxoxoxoxoxoxooxoxoxoxox")

        ioServer.emit('startFlight',true)
    },1)
  })
  socket.on('new-flight', (flightDetails) => {
      console.log(`New flight scheduled. Details:`, flightDetails);
      ioServer.emit('new-flight-Scheduled',flightDetails)
    });

  socket.on("Arrived", (payload) => {
    ioServer.emit("flight-arrival", payload);
  });
});

const airline = ioServer.of("/airline");

airline.on("connection", (socket) => {
  // console.log(`Flight ${this.flight.flightId} is taking off.`, socket.id);
//   socket.on("new-flight", (flightDetails) => {
//     console.log(`New flight scheduled. Details:`, flightDetails);
//     airline.emit("new-flight-Scheduled", flightDetails);
//   });

  socket.on("took-off", (payload) => {
    payload.event = "took-off";
    console.log(payload);
    airline.emit('tooked-off',payload)
  });
});
