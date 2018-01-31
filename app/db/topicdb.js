var Topic = require('../models/topic.js');
var messages = require('../config/messages.js');

const topicDB = {};

topicDB.addTopic = function (topicData, done){
    topicData.save().then((err) => {
        if (err) { return done(err); }
        else {
            return done(null, { success:true, "message":"Topic created" });
          }
      })
        .catch((err) => {
          return done(null, messages.errors.required_missing);
        });
    };
    topicDB.updateTopic =  function(topicData, done) {
        Topic.findOneAndUpdate({_id:topicData._id}, topicData, function (err, data) {
            if(err){
                return done(null, { success:false , "error": err});
            }
            else{
              return done(null, { success:true , "message": "successfully updated" });
            }
          });
    };

    topicDB.getTopicById =  function (id, done){
        Topic.find({"_id":id},(function(err,data){
            if(err){
              return done(null, { success:false , "error": err});
            }
            else{
              return done(null, { success:true , "data": data });
            }
        }));
    };

    topicDB.removeTopic =  function (id, done){
        Topic.remove({"_id":id},(function(err, data){
            if(err) {
                return done(null, { success:false , "error":err});
            }
            else {
                return done(null, { success:true , "data": data});
            }
        }));
    };

    topicDB.findAll =  function(done){
        Topic.find({},(function(err,data){
            if(err){
                return done(null,{ success:false , "error":err});
            }
            else {
                return done(null, { success:true , "data": data}); 
            }
        }));
    };

    module.exports = topicDB;