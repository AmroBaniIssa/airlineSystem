"use strict";
require("dotenv").config();
const port = process.env.PORT || 3030;

const ioServer = require("socket.io")(port);
const msgQueue = {
  tasks: {

  }
};

ioServer.on("connection", (socket) => {
  console.log("connected ", socket.id);
  
  /// ==========================================  event 2 ==============================================================================
  socket.on('newFlight',()=>{
    setInterval(()=>{
        ioServer.emit('startFlight',true)
    },10000)
  })

  // socket.on('new-flight', (flightDetails) => {
  //     console.log(`New flight scheduled. Details:`, flightDetails);
  //     ioServer.emit('new-flight-Scheduled',flightDetails)
  //   });


  /// ====================================  event 4 ================================================================================
    socket.on('new-flight', (flightDetails) => {
      console.log('i got your message')
      console.log(`New flight scheduled. Details:`, flightDetails);
      const id = uuid();

      msgQueue.tasks[id] = flightDetails;
      socket.emit('added', flightDetails);
      family.emit('task', {
          id: id,
          payload: msgQueue.tasks[id]
      })
  });

  socket.on('get_all', () => {
    console.log('msgQueue v1', msgQueue)
    Object.keys(msgQueue.tasks).forEach((id) => {
        socket.emit('task', {
            id: id,
            payload: msgQueue.tasks[id]
        })
    })
});

/// ========================================== event 8 =================================================================
  socket.on("Arrived", (task) => {
    delete msgQueue.tasks[task.id];
    console.log('msgQueue v2', msgQueue)
    ioServer.emit("flight-arrival", payload);
  });
});

const airline = ioServer.of("/airline");

airline.on("connection", (socket) => {
  console.log("*************32**********")


  /// ======================================== event 6 ================================================================
  socket.on("took-off", (payload) => {
    console.log("************35***********")

    payload.event = "took-off";
    console.log(payload);
    airline.emit('tooked-off',payload)
  });
  
});
console.log("hi")