'use strict';

var Quote = require('../models/quotes.js');
var messages = require('../config/messages.js');
var quoteDB = require('../db/quotedb.js');
////////////////////////////////////////////////////////////////////////////////
// Exported functions
////////////////////////////////////////////////////////////////////////////////
const quoteController = {};

quoteController.getById = function (req, res) {
    quoteDB.getQuoteById(req.id, function(err, data){
        if(err){
            return res.json(err);
            }
            else{
            return res.json(data);
            }
    })
}

quoteController.remove = function(req, res){
    var id = req.body._id;
    quoteDB.removeQuote(id, function(err, data){
        if(err){
            res.send("Error :", err);
        }
        else{
            res.json({"status":"success"});
        } 
    })
}

quoteController.update = function (req, res) {
    var quote = req.body;
    quoteDB.updateQuote(quote, function (err, data) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(data);
        }
    });
}

quoteController.add = function (req, res) {
    var quote = new Quote();
    quote.quote = req.body.quote
    quoteDB.addQuote(quote, function (err, data) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(data);
        }
    })
}


quoteController.getRandomQuote = function (req, res) {
    quoteDB.findRandom(function (err, data) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(data);
        }
    })
}

        
module.exports = quoteController;
    


