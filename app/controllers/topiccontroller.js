'use strict';

var Topic = require('../models/topics.js');
var messages = require('../config/messages.js');
var topicDB = require('../db/topicdb.js');

const topicController = {};

topicController.add = function(req, res){
    var topic = new Topic();
    topic.topicName = req.body.topicName;
    topicDB.addTopic(topic, function(err, data){
        if(err){
            res.json(err);
        }else {
            res.json(data);
        }
    })
}

topicController.update =  function(req, res){
    var topic = req.body;
    topicDB.updateTopic(topic, function(err, data){
        if(err){
            res.json(err);
        }
        else {
            res.json(data);
        }
    })
}

topicController.all = function(req, res){
    topicDB.findAll().then(function(data) {
        res.json(data);
    }).catch(function(data) {
        res.json(data);
    }); 
}

topicController.remove = function(req,res){
    var id = req.body._id;
   topicDB.removeTopic(id, function(err, data){
        if(err){
            res.send("Error :", err);
        }
        else{
            res.json({"status":"success"});
        } 
    })
}

topicController.getById =  function(req, res){
    var id = req.body._id;
    topicDB.getTopicById(id,function(err,data){
        if(err){
            res.json(err);
        }
        else {
            res.json(data);
        }
    }) 
}

module.exports = topicController;