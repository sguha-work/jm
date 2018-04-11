'use strict';
var OTP = require('../models/otp.model.js');
var otpDB = require('../db/otpdb.js');

const otpService = {};

var generateOTP = (function () {
    return new Promise(function (resolve, reject) {
        var number = Math.floor(100000 + Math.random() * 900000);
        resolve(number);
    });
})

otpService.getPasswordResetOTP = (function (email) {
    return new Promise(function (resolve, reject) {
        if (typeof email === "undefined" || email.trim() === "") {
            reject({ "error": "No email id specified" });
        }
        generateOTP().then(function (number) {
            var otpObject = new OTP();
            otpObject.otp = number;
            otpObject.validTill = Date.now() + 1200000000;
            otpObject.forEmail = email;
            otpDB.storeOTP(otpObject).then(function () {
                resolve(otpObject);
            }).catch(function (error) {
                reject(error);
            });

        });
    });

});

otpService.getOTPFromDB = (function (email) {
    return new Promise(function (resolve, reject) {
        OTP.find({"forEmail": email}, function(error, data) {console.log("data", data);
            if(error) {
                reject(error);
            } else {
                if(data.length > 1) {
                    resolve(data[data.length]);
                } else {
                    resolve(data[0]);
                }
                
            }
        });
    });
});

module.exports = otpService;