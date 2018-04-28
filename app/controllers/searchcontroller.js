'use strict';

var User = require('../models/user.js');
var messages = require('../config/messages.js');
var userDB = require('../db/userdb.js');
var mailer = require('../helpers/mailer.js');
var otpService = require('../services/otp.service.js');

const searchController = {};

var searchUserWithKeyWord = (function(keyWord) {
    return new Promise(function(resolve, reject) {

    });
});

var searchPostNameWithKeyWord = (function(keyWord) {
    return new Promise(function(resolve, reject) {
        
    });
});
var searchPostContentWithKeyWord = (function(keyWord) {
    return new Promise(function(resolve, reject) {
        
    });
});
searchController.search = (function(request, response) {
    var resultObject = {};
    var keyWordForSearch = request.body.key;
    // searching user
    var searchUserPromise = new Promise(function(resolve, reject) {
        searchUserWithKeyWord(keyWordForSearch).then(function(data) {
            resultObject.user = data;
            resolve();
        }).catch(function() {
            resultObject.user = [];
            resolve();
        });
    });
    
    // searching postname
    var searchPostNamePromise = new Promise(function(resolve, reject) {
        searchPostNameWithKeyWord(keyWordForSearch).then(function(data) {
            resultObject.postWithName = data;
            resolve();
        }).catch(function() {
            resultObject.postWithName = [];
            resolve();
        });
    });

    // searching postname
    var searchPostContentPromise = new Promise(function(resolve, reject) {
        searchPostContentWithKeyWord(keyWordForSearch).then(function(data) {
            resultObject.postWithContent = data;
            resolve();
        }).catch(function() {
            resultObject.postWithContent = [];
            resolve();
        });
    });

    Promise.all([searchUserPromise, searchPostNamePromise, searchPostContentPromise]).then(function() {
        response.json({"success": false, "data": resultObject});
    }).catch(function() {
        response.json({"success": false, "data": null});
    });

});
// userController.search = function (req, res) {
//     var username = req.body.username;
//     var Query = User.find({ 'username': { "$regex": username, "$options": 'i' } });
//     Query.select('-password');
//     Query.select('-__v');

//     Query.exec(function (err, user) {
//         if (!err) {
//             return res.send({ 'statusCode': 200, 'statusText': 'OK', 'data': user });
//         } else {
//             return res.send({ 'statusCode': 500, 'statusText': 'ERROR', 'err': err });
//         }
//     });
// }



module.exports = searchController;



