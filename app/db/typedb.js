var Type = require('../models/types.js');
var messages = require('../config/messages.js');

const typeDB = {};



typeDB.findAll = function (done) {
  return new Promise(function (resolve, reject) {
    Type.find({}, function (err, result) {
      if (err) {
        reject({ "success": false, "data": err });
      } else {
        resolve({ "success": true, "data": result });
      }
    });
  });

}

module.exports = typeDB;