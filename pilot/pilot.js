"use strict";
require("dotenv").config();
const port = process.env.PORT || 3030;
const io = require("socket.io-client");
const { FULL } = require("sqlite3");
let host = `http://localhost:${port}/`;
const systemConnection = io.connect(host);
let host2 = `http://localhost:${port}/airline`;

const airlineConnection = io.connect(host2);

systemConnection.on("new-flight-Scheduled", handleFlight);

function handleFlight(flightDetails) {
  const flight = flightDetails;
  setTimeout(() => {
    console.log(`Flight ${flight.Details.flightID} is taking off.`);
    airlineConnection.emit("took-off", flight);
  }, 4000);
}

airlineConnection.on("tooked-off", handelTookOff);

function handelTookOff(payload) {
  console.log("***********************")
  const flight = payload;
  setTimeout(() => {
    console.log(`Flight ${flight.Details.flightID} has arrived.`);
    airlineConnection.emit("Arrived", flight);
  }, 2000);
}
