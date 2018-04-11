var express = require('express');
var app = express();
var http = require('http');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var router = express.Router();
var path = require('path');
var flash = require('connect-flash');
var logger = require('winston');
var server = http.createServer(app);
var io = require('socket.io').listen(server); 
var cors = require('cors');
var mongo_connect = require('./app/config/mongo_config.js');


app.use(morgan('dev'));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(expressSession({
    secret: 'work hard',
    resave: false,
    saveUninitialized: true,
    cookie : { secure : false }
  }));
app.use(flash());
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({ extended: true , limit:'50mb'}));
app.use(express.static(__dirname+'/public'));
mongoose.Promise = require('bluebird');
//mongo_connect.connectLocal();
mongo_connect.connectMlab();


app.use(cors());
var appRoutes = require('./app/routes/api.js')(router, passport)
app.use("/api", appRoutes);
var social = require('./app/config/passport.js')(app, passport);


app.route('/*').get(function(req, res) { 
    return res.sendFile(path.join(__dirname+'/public/app/view/index.html')); 
});

io.on('connection', function(socket) {
  socket.on('event1', function (data) {
    console.log("data",data);
  });
  socket.emit("event2", "hi");
});

server.listen(process.env.PORT || 3200, function(){
  console.log("server started");
  console.log("visit http://localhost:"+(process.env.PORT || 3200));
});

// app.listen(process.env.PORT || 3200, function(){
//     console.log("server started");
// });