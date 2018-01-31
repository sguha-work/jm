'use strict';

var User = require('../models/user.js');
var messages = require('../config/messages.js');
var profileDB = require('../db/profiledb.js');

////////////////////////////////////////////////////////////////////////////////
// Exported functions
////////////////////////////////////////////////////////////////////////////////
const profileController = {};

profileController.followUser = function (req, res) {
    profileDB.followUser(req.body, function (err, data) {
        if (err) { res.json(err) }
        else {
            res.json(data);
        }
    })
} 

profileController.withdrawUser = function (req, res) {
    profileDB.withdrawUser(req.body, function (err, data) {
        if (err) { res.json(err) }
        else {
            res.json(data);
        }
    })
}

profileController.followAll = function (req, res) {
    var follow = req.body;
    profileDB.followAll(follow, function (err, data) {
        if (err) { res.json(err) }
        else {
            res.json(data);
        }
    })
} 



module.exports = profileController;
    


