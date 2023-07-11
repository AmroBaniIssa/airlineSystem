"use strict";
require("dotenv").config();
const port = process.env.PORT || 3030;
const io = require("socket.io-client");
const { FULL } = require("sqlite3");
let host = `http://localhost:${port}/`;
const systemConnection = io.connect(host);
let host2 = `http://localhost:${port}/airline`;

const airlineConnection = io.connect(host2);

socket.emit('get_all');

// systemConnection.on("new-flight-Scheduled", handleFlight);

/// =========================================== event 5 ======================================================
systemConnection.on("task", handleFlight);


function handleFlight(task) {
  const flight = task;
  console.log('i got it.');
  setTimeout(() => {
    console.log(`Flight ${flight.Details.flightID} is taking off.`);
    airlineConnection.emit("took-off", flight);
  }, 4000);
}


/// ========================================= event 7 ========================================================
airlineConnection.on("tooked-off", handelTookOff);

function handelTookOff(payload) {
  console.log("***********************")
  const flight = payload;
  setTimeout(() => {
    console.log(`Flight ${flight.Details.flightID} has arrived.`);
    systemConnection.emit("Arrived", flight);
  }, 7000);
}
