'use strict';

var Favourite = require('../models/favourites.js');
var messages = require('../config/messages.js');
var favouriteDB = require('../db/favouritedb.js');
////////////////////////////////////////////////////////////////////////////////
// Exported functions
////////////////////////////////////////////////////////////////////////////////
const favController = {};

favController.getById = function (req, res) {
    favouriteDB.getFavById(req.id, function(err, data){
        if(err){
            return res.json(err);
            }
            else{
            return res.json(data);
            }
    })
}

favController.remove = function(req, res){
    var id = req.body._id;
    favouriteDB.removeFav(id, function(err, data){
        if(err){
            res.send("Error :", err);
        }
        else{
            res.json({"status":"success"});
        } 
    })
}

favController.update = function (req, res) {
    var Favourite = req.body;
    favouriteDB.updateFav(Favourite, function (err, data) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(data);
        }
    });
}

favController.add = function (req, res) {
    var favourite = new Favourite();
    
    favourite.favourite = req.body.favourite;
    favourite.favouriteImage = req.body.favouriteImage;
    favourite.description = req.body.description;
    
    favouriteDB.addFav(favourite, function (err, data) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(data);
        }
    })
}


favController.all = function (req, res) {
    favouriteDB.getAll(function (err, data) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(data);
        }
    })
}

favController.search = function(req, res){
    favouriteDB.searchFav(req.body.name, function(err, favourite){
        if(err) { res.json(err); }
        else{
            res.json(favourite);
        }
    });
};
        
module.exports = favController;
    


