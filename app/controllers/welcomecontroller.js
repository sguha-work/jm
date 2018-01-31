'use strict';

var WelcomeMessage = require('../models/welcomeMessage.js');
var messages = require('../config/messages.js');
var welcomeDB =  require('../db/welcomedb.js');

const welcomeController = {};

welcomeController.add = function(req, res){

    var welcome = new WelcomeMessage();
    welcome.message = req.body.message;
    welcome.messageImageUrl = req.body.messageImageUrl;
    welcomeDB.addWelcomeMessage(welcome, function(err, data){
        if(err){
            res.json(err);
        }else {
            res.json(data);
        }
    })
}

welcomeController.update = function(req, res){
    var welcome = req.body;
   welcomeDB.updateWelcomeMessage(welcome, function(err, data){
        if(err){
         res.json(err);
        }else{
         res.json(data);
        }
    })
}

welcomeController.getById = function(req,res){
    var id = req.body._id;
    welcomeDB.getByWelcomeId(id, function(err,data){
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    })
}

welcomeController.remove = function(req, res){
    var id = req.body._id;
    welcomeDB.removeWelcomeMessage(id, function(err, data){
        if(err){
            res.json(err);
        }else {
            res.json(data);
        }
    })
}

welcomeController.all = function(req, res){
    welcomeDB.findAll(function(err,data){
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }
    })  

}