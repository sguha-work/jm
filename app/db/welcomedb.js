var WelcomeMessage = require('../models/welcomeMessage.js');
var messages = require('../config/messages.js');

const welcomeDB = {};

welcomeDB.getMessage = function(done){
    const date = new Date().getHours();
    var message = date < 12 ? 'Good Morning' : date < 18 ? 'Good Afternoon' : 'Good Night';
    var Query = WelcomeMessage.find({ 'message' : { "$regex": message, "$options": 'i' } });
        
        Query.exec(function (err, message_data) {
            if (err) {
                return done(null, { success:false, "error":err });
            } else {
                return done(null, { success:true, "data": message_data });
            }
        });
    }

    welcomeDB.addWelcomeMessage = function(welcomeData, done){
        welcomeData.save().then((err) => {
            if (err) { return done(err); }
            else {
                return done(null, messages.success.message_created);
              }
          })
            .catch((err) => {
              return done(null, messages.errors.required_missing);
            });
    }

    welcomeDB.updateWelcomeMessage =  function(welcomeData, done){
        WelcomeMessage.findOneAndUpdate({_id:welcomeData._id},welcomeData, function(err, data){
            if(err){
                return done(null, { success:false , "error": err});
            }else {
                return done(null, { success:true , "message": "successfully updated" });
            }
        });
    };

    welcomeDB.getByWelcomeId =  function(id, done){
        WelcomeMessage.find({"_id":id}, function(err, data){
            if(err){
                return done(null, { success:false , "error": err});
            }else {
                return done(null, { success:true , "data": data });
            }
        });
    };

    welcomeDB.removeWelcomeMessage = function(id, done){
        WelcomeMessage.remove({"_id":id},(function(err, data){
            if(err) {
                return done(null, { success:false , "error":err});
            }
            else {
                return done(null, { success:true , "data": data});
            }
        }));  
    };
    welcomeDB.findAll = function(done){
        WelcomeMessage.find({},function(err, data){
            if(err){
                return done(null,{ success:false , "error":err});
            }else {
                return done(null, { success:true , "data": data}); 
            }
        });  
    };

    module.exports = welcomeDB;