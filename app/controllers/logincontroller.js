'use strict';
var mongoose = require('mongoose');
var User = require('../models/user.js');
var userSchema = mongoose.model('User').schema; 
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');
var userDB = require("../db/userdb.js");
////////////////////////////////////////////////////////////////////////////////
// Exported functions
////////////////////////////////////////////////////////////////////////////////
const loginController = {
    
};

loginController.authenticate = function(req, res){
  var email = req.body.email;
  var password = req.body.password;
  if(email !="" && email !=null && password !="" && password!=null){
    userDB.authenticateUser(email, password, function(err, data){
      if(err){
        res.json(messages.errors.technical);
      }else {
        res.json(data);
      }
    })
     
  }else{
    res.json(messages.errors.required_missing);
  }
}

loginController.activate = function(req, res){
  var token = req.params.token;
  userDB.activateUser(token, function(err, data){
    if(err){
      res.json(err);
    }else{
      res.json(data);
    }
  })
}

module.exports = loginController;
    


