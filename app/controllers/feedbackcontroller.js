'use strict';

var Feedback = require('../models/feedback.js');
var messages = require('../config/messages.js');
var feedbackDB = require('../db/feedbackdb.js');

const feedbackController = {};

feedbackController.add = function(req, res){
    var feedback = new Feedback();
    feedback.feedbackContent = req.body.feedbackContent;
    feedback.userId =  req.body.userId;
    feedback.userName =  req.body.userName;
    feedback.email    =req.body.email;
    feedbackDB.addFeedback(feedback, function(err, data){
        if(err){
            res.json(err);
        }else {
            res.json(data);
        }
    })
}

feedbackController.update =  function(req, res){
    var feedback = req.body;
    feedbackDB.updateFeedback(feedback, function(err, data){
        if(err){
            res.json(err);
        }
        else {
            res.json(data);
        }
    })
}

feedbackController.all = function(req, res){
    feedbackDB.findAll(function(err, data){
        if(err){
            res.json(err);
        }else {
            res.json(data);
        }
    }) 
}

feedbackController.remove = function(req,res){
    var id = req.body._id;
    feedbackDB.removeFeedback(id, function(err, data){
        if(err){
            res.send("Error :", err);
        }
        else{
            res.json({"status":"success"});
        } 
    })
}


feedbackController.getById =  function(req, res){
    var id = req.body._id;
    feedbackDB.getFeedbackById(id,function(err,data){
        if(err){
            res.json(err);
        }
        else {
            res.json(data);
        }
    }) 
}

module.exports = feedbackController;