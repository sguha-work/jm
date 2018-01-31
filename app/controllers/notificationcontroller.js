'use strict';

var Notifications = require('../models/notification.js');
var messages = require('../config/messages.js');
var notificationDB = require('../db/notificationdb.js');

const notificationController = {};

notificationController.add = function(req, res){
    notificationDB.addNotification(notification, function(err, data){
        if(err){
            res.json(err);
        }else {
            res.json(data);
        }
    })
}

notificationController.update =  function(req, res){
    var notification = req.body;
    notificationDB.updateNotification(notification, function(err, data){
        if(err){
            res.json(err);
        }
        else {
            res.json(data);
        }
    })
}

notificationController.all = function(req, res){
    notificationDB.findAll(req.body.userId, function(err, data){
        if(err){
            res.json(err);
        }else {
            res.json(data);
        }
    }) 
}

notificationController.overview = function(req, res){
    notificationDB.findAll(req.body.userId, function(err, data){
        if(err){
            res.json(err);
        }else {
            res.json({success:true, "notifications": data.lists.length });
        }
    }) 
}



notificationController.remove = function(req,res){
    var id = req.body._id;
   notificationDB.removeNotification(id, function(err, data){
        if(err){
            res.send("Error :", err);
        }
        else{
            res.json({"status":"success"});
        } 
    })
}

notificationController.getById =  function(req, res){
    var id = req.body._id;
    notificationDB.getNotificationById(id,function(err,data){
        if(err){
            res.json(err);
        }
        else {
            res.json(data);
        }
    }) 
}

module.exports = notificationController;