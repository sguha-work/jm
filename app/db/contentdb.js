var ContentType = require('../models/contentType.js');
var messages = require('../config/messages.js');

var contentDB = {};

contentDB.addContent = function (contentData, done) {
    contentData.save().then((err) => {
        if (err) { return done(err); }
        else {
            return done(null, messages.success.content_created);
          }
      })
        .catch((err) => {
          return done(null, messages.errors.required_missing);
        });
  };
  
  contentDB.updateContent = function (contentData, done) {
    ContentType.findOneAndUpdate({_id:contentData._id}, contentData, function (err, data) {
      if(err){
          return done(null, { success:false , "error": err});
      }
      else{
        return done(null, { success:true , "message": "successfully updated" });
      }
    });
  }
  
  contentDB.getContentById = function (id, done) {
    ContentType.find({"_id":id},(function(err,data){
            if(err){
              return done(null, { success:false , "error": err});
            }
            else{
              return done(null, { success:true , "data": data });
            }
        }));
  }
  
     
  contentDB.removeContent = function(id, done){
    ContentType.remove({ "_id": id }, function(err, data){
        if(err){
          return done(null, { success:false , "error": err});
        }
        else{
          return done(null, { success:true , "message": "successfully deleted" });
        } 
    })
   
  }
  contentDB.findAll = function(done){
    ContentType.find({},function(err, data){
        if(err){
            return done(null,{ success:false , "error":err});
        }else {
            return done(null, { success:true , "data": data}); 
        }
    });  
};
  module.exports = contentDB;