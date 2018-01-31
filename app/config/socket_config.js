exports = module.exports = function(app){
    
    var http = require('http').Server(app);
    var io = require('socket.io')(http);
    module.export.io = io;
}



