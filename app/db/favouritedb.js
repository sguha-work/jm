var Favourite = require('../models/favourites.js');
var messages = require('../config/messages.js');

const favouriteDB = {};

favouriteDB.addFav = function (favouriteData, done) {
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

favouriteDB.updatefavourite = function (favouriteData, done) {
  Favourite.findOneAndUpdate({_id:favouriteData._id}, favouriteData, function (err, data) {
    if(err){
        return done(null, { success:false , "error": err});
    }
    else{
      return done(null, { success:true , "message": "successfully updated" });
    }
  });
}

favouriteDB.getfavouriteById = function (id, done) {
  Favourite.find({"_id":id},(function(err,data){
          if(err){
            return done(null, { success:false , "error": err});
          }
          else{
            return done(null, { success:true , "data": data });
          }
      }));
}
   
favouriteDB.removefavourite = function(id, done){
  Favourite.remove({"_id": id }, function(err, data){
      if(err){
        return done(null, { success:false , "error": err});
      }
      else{
        return done(null, { success:true , "message": "successfully deleted" });
      } 
  })
 
}

favouriteDB.findRandom = function (done) {
  Favourite.count().exec(function (err, count) {
    var random = Math.floor(Math.random() * count)
    Favourite.findOne().skip(random).exec(
      function (err, result) {
        if (err) {
          return done(null, { success: false, "error": err });
        } else {
          return done(null, { success: true, "data": result });
        }
      })
  })
}

favouriteDB.getAll = function(done){
  Favourite.find({}, function (err, result) {
      if (err) {
        return done(err);
      } else {
        return done(null, { success: true, "data": result });
      }
    });
}

favouriteDB.searchFav = function(name, done){
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

module.exports = favouriteDB;