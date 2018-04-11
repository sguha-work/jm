'use strict';

var User = require('../models/user.js');
var messages = require('../config/messages.js');
var userDB = require('../db/userdb.js');
var mailer = require('../helpers/mailer.js');
var otpService = require('../services/otp.service.js');
//var userSchema = mongoose('User').schema;
// var os = require('os');
// var nodemailer = require('nodemailer');
////////////////////////////////////////////////////////////////////////////////
// Exported functions
////////////////////////////////////////////////////////////////////////////////
const userController = {


};

userController.all = function (req, res) {
    var token = req.body.token;
    userDB.validateToken(token, function (err, data) {
        if (err) { res.json(err); }
        else if (!data.success) {
            res.json({ success: false });
        }
        else {
            userDB.getAllusers(data.user.role, function (err, response) {
                if (err) { res.json(err); }
                else {
                    res.json(response);
                }
            })
        }
    })
}

userController.allUserAccounts = function (req, res) {
    var user = new User();
    User.find({ 'role': 'user' }, 'firstName lastName email role', (function (err, data) {
        if (err) {
            res.send("Error :", err);
        }
        else {
            res.send(data);
        }
    }));
}

userController.getById = function (req, res) {
    var id = req.body.id;
    User.find({ "_id": id }, 'firstName lastName email profilePic penName shortBio dateOfBirth location favourites privacyPolicy', (function (err, data) {
        if (err) {
            res.send("Error :", err);
        }
        else {
            res.send(data);
        }
    }));
}

userController.remove = function (req, res) {
    var id = req.body.id;
    User.remove({ "_id": id }, (function (err, data) {
        if (err) {
            res.send("Error :", err);
        }
        else {
            res.json({ "status": "success" });
        }
    }));
}

userController.update = function (req, res) {
    User.findOneAndUpdate({ _id: req.body._id }, req.body, function (err, data) {
        if (err) {
            res.send("Error :", err);
        }
        else {
            res.send({ "status": "success" });
        }
    });
}

/** 
 * This method sends an otp to given mail address to reset the password
*/
userController.sendResetPasswordOTP = (function (request, response) {
    return new Promise(function (resolve, reject) {
        var email = request.body.email;
        otpService.getPasswordResetOTP(email).then(function (otpObject) {console.log("otp object", otpObject);
            mailer.sendPasswordResetOTPViaMail(otpObject).then(function (success) {
                resolve(success);
            }).catch(function () {
                console.log("error");
                reject();
            });
        }).catch(function () {
            console.log("error");
            reject();
        });
    });

});

userController.add = function (req, res) {
    if (req.body.firstName == null || req.body.firstName == "" ||
        req.body.lastName == null || req.body.lastName == "" ||
        req.body.email == null || req.body.email == "" ||
        req.body.password == null || req.body.password == "") {
        res.send("Ensure Every Fields are given");
    }
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.password = user.generateHash(req.body.password);
    user.email = req.body.email;


    userDB.addUser(user, function (err, data) {
        if (err) {
            res.json(messages.errors.technical);
        } else if (data.success) {
            res.json(messages.success.user_created);
        } else {
            res.json(messages.errors.user_exists);
        }
    });
};

userController.updateprofile = function (req, res) {
    userDB.updateProfile(req.body, function (err, response) {
        console.log("*******"); console.log(err); console.log(response);
        if (err) {
            res.json(err);
        } else {
            res.json(response);
        }
    })
}

userController.search = function (req, res) {
    var username = req.body.username;
    var Query = User.find({ 'username': { "$regex": username, "$options": 'i' } });
    Query.select('-password');
    Query.select('-__v');

    Query.exec(function (err, user) {
        if (!err) {
            return res.send({ 'statusCode': 200, 'statusText': 'OK', 'data': user });
        } else {
            return res.send({ 'statusCode': 500, 'statusText': 'ERROR', 'err': err });
        }
    });
}

userController.sendMulticlientMail = function (req, res) {
    userDB.findallUserEmails(function (err, data) {
        var results_data = data.data.map(function (i) {
            return i['email'];
        });
        mailer.welcomeMail(results_data.toString(), function (err, data) {
            if (err) {
                res.send(err);
            } else {
                res.send({ status: "success" });
            }
        })
        // res.send(results_data);
    })
}

userController.createUser = function (req, res) {
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.password = user.generateHash(req.body.password);
    user.original_password = req.body.password;
    user.email = req.body.email;

    if (req.body.firstName == null || req.body.firstName == "" ||
        req.body.lastName == null || req.body.lastName == "" ||
        req.body.email == null || req.body.email == "" ||
        req.body.password == null || req.body.password == "") {
        res.send("Ensure Every Fields are given");
    }
    userDB.createUser(user, function (err, data) {
        if (err) {
            res.json(messages.errors.technical);
        } else if (data.success) {
            res.json(messages.success.user_created);
        } else {
            res.json(messages.errors.user_exists);
        }
    });
};


userController.disableUser = function (req, res) {
    userDB.disable(req.body.id, function (err, data) {
        if (err) { res.json(err); }
        else {
            res.json(data);
        }
    })
}

userController.enableUser = function (req, res) {
    userDB.enable(req.body.id, function (err, data) {
        if (err) { res.json(err); }
        else {
            res.json(data);
        }
    })
}

userController.checkIfEmailIdExists = (function (request, response) {
    userDB.getUserByEmail(req.body.email, function (error, data) {
        if (error == null) {
            response.json({ success: true });
        } else {
            response.json(error);
        }
    });
});

userController.getAndSendPasswordAsEmail = (function (request, response) {
    userDB.getUserByEmail(req.body.email, function (error, data) {
        if (error == null) {
            var email = data.data.email;
            var password = data.data.password;
        } else {
            response.json(error);
        }
    });
});

userController.getTotalNumberOfUser = (function (request, response) {
    userDB.getTotalNumberOfUser(function (error, data) {
        if (error == null) {
            response.json(data);
        } else {
            response.json(error);
        }
    });
});

userController.getRandomProfiles = (function (request, response) {
    userDB.getRandomProfiles(function (error, data) {
        if (error == null) {
            response.json(data);
        } else {
            response.json(error);
        }
    });
});


module.exports = userController;



