var User = require('../models/user.js');
var messages = require('../config/messages.js');
var jwt = require('jsonwebtoken');
var async = require('async');

const profileDB = {};

profileDB.followUser = function(data, done){
  var following = {};
  User.findOne({"_id": data.userId }).exec(function(err, user){
    if(err){
      return done(err);
    }else{
      profileDB.findOneBySocialId(data.followingsocialId, function(err, user_obj){
        if(user_obj){
          following.followingUserId = user_obj.id;
          following.followingUserName = data.followingUserName;
          following.followingsocialId = data.followingsocialId;
          following.followingPicture = data.followingPicture;
          user.following.push(following);
          
          user.save(function(err){
            if(err) { return done(err); }
            else{
              return done(null, {success : true, "message":"following user successful" });
            }
          })
        }
      });
    }
  })
}     


profileDB.withdrawUser = function(data, done){
  var following = {};
  User.findOne({"_id": data.userId }).exec(function(err, user){
    if(err){
      return done(err);
    }else{
          user.following = checkAndRemove(user.following, data);
          user.save(function(err){
            if(err) { return done(err); }
            else{
              return done(null, {success : true, "message":"withdrawal of user successful" });
            }
          })
        }
      });
    }

profileDB.findOneBySocialId = function (id, done) {
  User.findOne({
    $or: [
      { facebook: { $elemMatch: { "id": id } } },
      { google: { $elemMatch: { "id": id } } },
    ]}, function (err, user_obj) {
    if (err) {
      return done(err);
    }else{
      return done(null, user_obj);
    }
  })
}

profileDB.followAll = function (data, done) {
  var following = [];
  User.findOne({ "_id": data.userId }).exec(function (err, user) {
    if (err) {
      return done(err);
    } else if (!user) {
      return done(null, { success: false, message: "No user found" });
    } else {
      createFollowingArray(data.friends, function(err, following_response){
        user.following = following_response;
        user.save(function (err) {
          if (err) { return done(err); }
          else {
            return done(null, { success: true, "message": "following user successful" });
          }
        })
      })
    }
  })
}

var createFollowingArray =function(friends, done){
  var following = [];
  var filesDone = friends.length;
  friends.forEach(function(element , index){
        profileDB.findOneBySocialId(element.id, function (err, user_obj) {
          if (user_obj) {
            following.push({
              "followingUserId": user_obj.id,
              "followingUserName": element.name,
              "followingsocialId": element.id,
              "followingPicture": element.picture
            });
          };
          filesDone = filesDone - 1;
          if(filesDone == 0){
            done(null, following);
          }
        });   
      });
  }


var checkAndRemove = function(userFollowing, user_obj) {
  var found = userFollowing.some(function (el) {
    return el.followingsocialId === user_obj.followingsocialId;
  });
  if (found) {
    userFollowing.forEach(function(element, index) {
      if(element.followingsocialId === user_obj.followingsocialId){
        userFollowing.splice(index, 1);
      }
    }, this);
    
  }
  return userFollowing;
}

module.exports = profileDB;