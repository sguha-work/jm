var Notifications = require('../models/notification.js');
var User = require('../models/user.js');
var messages = require('../config/messages.js');
var events = require('events');
var eventEmitter = new events.EventEmitter();
const notificationDB = {};

notificationDB.addNotification = function (postData, done){
    var notificationData = new Notifications();
    notificationData.postId = postData._id;
    notificationData.poster = postData.poster;
    notificationData.posterId = postData.userId;
    notificationData.notificationType = postData.notificationType;
    notificationData.notificationTime = new Date();
    notificationData.postee = postData.comments.userId;
    notificationData.notificationBody = postData.comments.commentBody;
    notificationData.isSeen = false;


    notificationData.save(function(err){
        if (err) { return done(err); }
        else {
            eventEmitter.emit('connection');
            return done(null, messages.success.notification_created);
          }
      })
    };
    notificationDB.updateNotification =  function(notificationData, done) {
        Notifications.findOneAndUpdate({_id:notificationData._id}, notificationData, function (err, data) {
            if(err){
                return done(null, { success:false , "error": err});
            }
            else{
              return done(null, { success:true , "message": "successfully updated" });
            }
          });
    };

    notificationDB.getNotificationById =  function (id, done){
        Notifications.find({"_id":id},(function(err,data){
            if(err){
              return done(null, { success:false , "error": err});
            }
            else{
              return done(null, { success:true , "data": data });
            }
        }));
    };

    notificationDB.removeNotification =  function (id, done){
        Notifications.remove({"_id":id},(function(err, data){
            if(err) {
                return done(null, { success:false , "error":err});
            }
            else {
                return done(null, { success:true , "data": data});
            }
        }));
    };

    notificationDB.findAll =  function(userId, done){
        Notifications.find({ "isSeen" : false, "posterId": userId},(function(err,data){
            if(err){
                return done(null,{ success:false , "error":err});
            }
            else{
                list = [];
                function asyncLoop(i, cb) {
                    if (i < data.length) {
                        User.findOne({ "_id":data[i].postee },'firstName lastName email profilePic').exec(function (err, o) {
                          if(o.length !=0){
                            list.push({ "userDetail": o, "notificationDetail": data[i] });
                          }  
                          asyncLoop(i+1, cb);
                        });
                    } else {
                        cb();
                    }
                }
                asyncLoop(0, function() {
                    done(null, { success:true, 'lists':list});
                });
              };
        }));
    };

    module.exports = notificationDB;