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

var searchPostNameWithKeyWord = ((keyWord) => {
    return new Promise((resolve, reject) => {
        resolve([]);
    });
});
var searchPostContentWithKeyWord = ((keyWord) => {
    return new Promise((resolve, reject) => {
        resolve([]);
    });
});
searchController.search = ((request, response) => {
    var resultObject = {};
    var keyToSearch = request.query.key;//req.query
    // searching user
    var searchUserPromise = new Promise((resolve, reject) => {
        searchUserWithKeyWord(keyToSearch).then((data) => {
            resultObject.user = data;
            resolve();
        }).catch(() => {
            resultObject.user = [];
            resolve();
        });
    });
    
    // searching postname
    var searchPostNamePromise = new Promise((resolve, reject) => {
        searchPostNameWithKeyWord(keyToSearch).then((data) => {
            resultObject.postWithName = data;
            resolve();
        }).catch(() => {
            resultObject.postWithName = [];
            resolve();
        });
    });

    // searching postcontent
    var searchPostContentPromise = new Promise((resolve, reject) => {
        searchPostContentWithKeyWord(keyToSearch).then((data) => {
            resultObject.postWithContent = data;
            resolve();
        }).catch(() => {
            resultObject.postWithContent = [];
            resolve();
        });
    });

    Promise.all([searchUserPromise, searchPostNamePromise, searchPostContentPromise]).then(() => {
        response.json({"success": true, "data":resultObject});
    }).catch(() => {
        response.json({"success": false, "data":null});
    });

});


module.exports = searchController;



