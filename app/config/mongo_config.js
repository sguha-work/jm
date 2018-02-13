var mongoose = require('mongoose');
const mongo_connect = {}
var logger = require('winston');


mongo_connect.connectLocal = function () {
  mongoose.connect('mongodb://localhost/jiyaDB', { useMongoClient: true }, function (err) {
    if (err) {
      console.log(err);
    }
    else {
      logger.info('database connected');
    }
  });
}
mongo_connect.connectMlab = function () {
  mongoose.connect('mongodb://jiyatech:achilleshector*1@ds137435.mlab.com:37435/jiyatech', { useMongoClient: true }, function (err) {
    if (err) {
      console.log(err);
    }
    else {
      logger.info('database connected');
    }
  });
}

module.exports = mongo_connect;