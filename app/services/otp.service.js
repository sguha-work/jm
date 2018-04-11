'use strict';
const otpService = {};

var generateOTP = (function() {
    return new Promise(function(resolve, reject) {
        var number = Math.floor(100000 + Math.random() * 900000);
        resolve(number);
    });
})

otpService.getPasswordResetOTP = (function(email) {
    return new Promise(function(resolve, reject) {
        if(typeof email === "undefined" || email.trim() === "") {
            reject();
        }
        generateOTP().then(function(number) {
            var otpObject = {
                otp: number,
                isValid: true,
                validTill: Date.now() + 1200000000,
                forEmail: email
            };
            resolve(otpObject);
        });
    });
    
});

module.exports = otpService;