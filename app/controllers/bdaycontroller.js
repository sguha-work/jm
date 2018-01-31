'use strict';

var Birthday = require('../models/birthday.js');
var messages = require('../config/messages.js');
var birthdayDB = require('../db/birthdaydb.js');
////////////////////////////////////////////////////////////////////////////////
// Exported functions
////////////////////////////////////////////////////////////////////////////////
const bdayController = {};

bdayController.getById = function (req, res) {
    birthdayDB.getbirthdayById(req.id, function(err, data){
        if(err){
            return res.json(err);
            }
            else{
            return res.json(data);
            }
    })
}

bdayController.getByDOB = function (req, res) {
    birthdayDB.getbirthdayByCurrentDate(function(err, data){
        if(err){
            return res.json(err);
            }
            else{
            return res.json(data);
            }
    })
}

bdayController.remove = function(req, res){
    var id = req.body._id;
    birthdayDB.removeBirthday(id, function(err, data){
        if(err){
            res.send("Error :", err);
        }
        else{
            res.json({"status":"success"});
        } 
    })
}

bdayController.update = function (req, res) {
    var birthday = req.body;
    birthdayDB.updateBirthday(birthday, function (err, data) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(data);
        }
    });
}

bdayController.add = function (req, res) {
    var birthday = new Birthday();
    
    birthday.dob = req.body.dob;
    birthday.personName = req.body.personName;
    birthday.quote = req.body.quote;
    
    birthdayDB.addBirthday(birthday, function (err, data) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(data);
        }
    })
}


bdayController.all = function (req, res) {
    birthdayDB.getall(function (err, data) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(data);
        }
    })
}

        
module.exports = bdayController;
    


