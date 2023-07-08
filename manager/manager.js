"use strict";
require("dotenv").config();
const port = process.env.PORT || 3030;
const io = require("socket.io-client");
let host = `http://localhost:${port}/`;
const systemConnection = io.connect(host);
const uuid = require("uuid");
const { faker } = require("@faker-js/faker");

systemConnection.on('startFlight', handleFlight);

function handleFlight() {
    // console.log("xoxoxoxoxoxoxoxooxoxoxoxox")
  setInterval(() => {
    const Flight = {
      event: "new-flight",
      time: faker.date.future({ refDate: "2023-07-08T00:00:00.000Z" }),
      Details: {
        airLine: "Royal Jordanian Airlines",
        destination: faker.location.country(),
        pilot: faker.person.fullName(),
        flightID: uuid.v4(),
      },
    };

    console.log("A new flight with ID ", Flight.Details.flightID);
    systemConnection.emit("new-flight", Flight);
  }, 10000);

  socket.on("flight-arrival", flightArrived);
  function flightArrived(pilotName) {
    console.log(
      `Appreciation message to pilot ${pilotName}: Thank you for safely landing the flight.`
    );
  }
}
