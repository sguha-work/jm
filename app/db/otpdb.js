
var otp = require('../models/otp.model.js');
const otpDB = {};

otpDB.storeOTP = (function (otpObject) {
    return new Promise(function (resolve, reject) {
        // removing all other otp with same forEmail and then inserting
        otp.remove({ forEmail: otpObject.forEmail }, function (error, data) {
            if (error) {
                reject(error);
            } else {
                otpObject.save(function (error) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            }
        });
    });
});

module.exports = otpDB;