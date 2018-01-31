'use strict';

var ContentType = require('../models/contentType.js');
var messages = require('../config/messages.js');
var contentDB = require('../db/contentdb.js');
////////////////////////////////////////////////////////////////////////////////
// Exported functions
////////////////////////////////////////////////////////////////////////////////
const contentController = {};

contentController.getById = function (req, res) {
    contentDB.getContentById(req.id, function(err, data){
        if(err){
            return res.json(err);
            }
            else{
            return res.json(data);
            }
    })
}

contentController.remove = function(req, res){
    var id = req.body._id;
    contentDB.removeContent(id, function(err, data){
        if(err){
            res.send("Error :", err);
        }
        else{
            res.json({"status":"success"});
        } 
    })
}

contentController.update = function (req, res) {
    var ContentType = req.body;
    contentDB.updateContent(ContentType, function (err, data) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(data);
        }
    });
}

contentController.add = function (req, res) {
    var content = new ContentType();
    
    content.contentName = req.body.contentName;
    content.contentImageUrl = req.body.contentImageUrl;
    
    contentDB.addContent(content, function (err, data) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(data);
        }
    })
}


contentController.all = function (req, res) {
    contentDB.findAll(function (err, data) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(data);
        }
    })
}

        
module.exports = contentController;
    


