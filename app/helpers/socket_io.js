exports = module.exports = function(io){

    var events = require('events');
    var eventEmitter = new events.EventEmitter();

    

    io.on('connection', function(socket) {
        console.log("connection established");
        var listner1 = function listner1() {
            socket.emit("event2", "hi");
         };

         eventEmitter.addListener('connection', listner1);

        socket.on('event1', function (data) {
          console.log("data",data);
        });
        
      });
      
    io.on('disconnect', function(socket) {
        console.log("connection disconnected");
    });

    
  }