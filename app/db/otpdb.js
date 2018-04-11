
var otp = require('../models/otp.model.js');
const otpDB = {};

otpDB.storeOTP = (function(otpObject) {
    return new Promise(function(resolve, reject) {
        otpObject.save(function(error) { 
            if(error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
    
});

module.exports = otpDB;