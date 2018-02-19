var Topic = require('../models/topics.js');
var messages = require('../config/messages.js');

const topicDB = {};

topicDB.addFav = function (favouriteData, done) {
  favouriteData.save().then((err) => {
      if (err) { return done(err); }
      else {
          return done(null, messages.success.user_created);
        }
    })
      .catch((err) => {
        return done(null, messages.errors.required_missing);
      });
};

topicDB.updatefavourite = function (favouriteData, done) {
  Topic.findOneAndUpdate({_id:favouriteData._id}, favouriteData, function (err, data) {
    if(err){
        return done(null, { success:false , "error": err});
    }
    else{
      return done(null, { success:true , "message": "successfully updated" });
    }
  });
}

topicDB.getfavouriteById = function (id, done) {
  Topic.find({"_id":id},(function(err,data){
          if(err){
            return done(null, { success:false , "error": err});
          }
          else{
            return done(null, { success:true , "data": data });
          }
      }));
}
   
topicDB.removefavourite = function(id, done){
  Topic.remove({"_id": id }, function(err, data){
      if(err){
        return done(null, { success:false , "error": err});
      }
      else{
        return done(null, { success:true , "message": "successfully deleted" });
      } 
  })
 
}

topicDB.findRandom = function (done) {
  Topic.count().exec(function (err, count) {
    var random = Math.floor(Math.random() * count)
    Topic.findOne().skip(random).exec(
      function (err, result) {
        if (err) {
          return done(null, { success: false, "error": err });
        } else {
          return done(null, { success: true, "data": result });
        }
      })
  })
}

topicDB.getAll = function(done){
  Topic.find({}, function (err, result) {
      if (err) {
        return done(err);
      } else {
        return done(null, { success: true, "data": result });
      }
    });
}

topicDB.findAll = function(done){
  Topic.find({}, function (err, result) {
      if (err) {
        return done(err);
      } else {
        return done(null, { success: true, "data": result });
      }
    });
}

topicDB.searchFav = function(name, done){
  var Query = Favourite.find({ 'favourite' : { "$regex": new RegExp(name, "i") } });
   
   Query.exec(function (err, favourite) {
     console.log(favourite);
       if (!err) {
           return done(null,{ 'success': true, 'data': favourite });
       } else {
           return done(err);
       }
   });
}

module.exports = topicDB;