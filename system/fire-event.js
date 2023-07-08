'use strict';
require('dotenv').config();
const port = process.env.PORT || 3030;
const io = require('socket.io-client');
let host = `http://localhost:${port}/`;
const systemConnection = io.connect(host);


systemConnection.emit('newFlight');