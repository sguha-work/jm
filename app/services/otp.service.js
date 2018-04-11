'use strict';
var OTP = require('../models/otp.model.js');
var otpDB = require('../db/otpdb.js');

const otpService = {};

var generateOTP = (function() {
    return new Promise(function(resolve, reject) {
        var number = Math.floor(100000 + Math.random() * 900000);
        resolve(number);
    });
})

otpService.getPasswordResetOTP = (function(email) {console.log("email "+email);
    return new Promise(function(resolve, reject) {
        if(typeof email === "undefined" || email.trim() === "") {
            reject();
        }
        generateOTP().then(function(number) {
            var otpObject = new OTP();
            otpObject.otp = number;
            otpObject.validTill = Date.now() + 1200000000;
            otpObject.forEmail = email;
            otpDB.storeOTP(otpObject).then(function() {
                resolve(otpObject);
            }).catch(function(error) {
                reject(error);
            });
            
        });
    });
    
});

module.exports = otpService;