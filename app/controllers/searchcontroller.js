'use strict';

var UserController = require('../controllers/usercontroller.js');
// var messages = require('../config/messages.js');
// var userDB = require('../db/userdb.js');
// var mailer = require('../helpers/mailer.js');
// var otpService = require('../services/otp.service.js');

const searchController = {};

var searchUserWithKeyWord = (function(keyWord) {
    return new Promise(function(resolve, reject) {
        UserController.searchByKeyword(keyWord).then((data) => {
            resolve(data);
        }).catch(() => {
            reject();
        });
    });
});

var searchPostNameWithKeyWord = (function(keyWord) {
    return new Promise(function(resolve, reject) {
        resolve([]);
    });
});
var searchPostContentWithKeyWord = (function(keyWord) {
    return new Promise(function(resolve, reject) {
        resolve([]);
    });
});
searchController.search = (function(request, response) {
    var resultObject = {};
    var keyToSearch = request.query.key;//req.query
    // searching user
    var searchUserPromise = new Promise(function(resolve, reject) {
        searchUserWithKeyWord(keyToSearch).then((data) => {
            resultObject.user = data;
            resolve();
        }).catch(function() {
            resultObject.user = [];
            resolve();
        });
    });
    
    // searching postname
    var searchPostNamePromise = new Promise(function(resolve, reject) {
        searchPostNameWithKeyWord(keyToSearch).then(function(data) {
            resultObject.postWithName = data;
            resolve();
        }).catch(function() {
            resultObject.postWithName = [];
            resolve();
        });
    });

    // searching postcontent
    var searchPostContentPromise = new Promise(function(resolve, reject) {
        searchPostContentWithKeyWord(keyToSearch).then(function(data) {
            resultObject.postWithContent = data;
            resolve();
        }).catch(function() {
            resultObject.postWithContent = [];
            resolve();
        });
    });

    Promise.all([searchUserPromise, searchPostNamePromise, searchPostContentPromise]).then(function() {
        response.json({"success": true, "data":resultObject});
    }).catch(function() {
        response.json({"success": false, "data":null});
    });

});


module.exports = searchController;



