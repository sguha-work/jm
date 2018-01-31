'use strict';

var Category = require('../models/category.js');
var messages = require('../config/messages.js');
var categoryDB = require('../db/categorydb.js');

const categoryController = {};

categoryController.add = function(req, res){
    var category = new Category();
    category.categoryName = req.body.categoryName;
    category.categoryUrl =  req.body.categoryUrl;
    categoryDB.addCategory(category, function(err, data){
        if(err){
            res.json(err);
        }else {
            res.json(data);
        }
    })
}

categoryController.update =  function(req, res){
    var category = req.body;
    categoryDB.updateCategory(category, function(err, data){
        if(err){
            res.json(err);
        }
        else {
            res.json(data);
        }
    })
}

categoryController.all = function(req, res){
    categoryDB.findAll(function(err, data){
        if(err){
            res.json(err);
        }else {
            res.json(data);
        }
    }) 
}

categoryController.remove = function(req,res){
    var id = req.body._id;
   categoryDB.removeCategory(id, function(err, data){
        if(err){
            res.send("Error :", err);
        }
        else{
            res.json({"status":"success"});
        } 
    })
}

categoryController.getById =  function(req, res){
    var id = req.body._id;
    categoryDB.getCategoryById(id,function(err,data){
        if(err){
            res.json(err);
        }
        else {
            res.json(data);
        }
    }) 
}

module.exports = categoryController;