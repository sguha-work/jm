var Feedback = require('../models/feedback.js');
var messages = require('../config/messages.js');
var User = require('../models/user.js');

const feedbackDB = {};
const userDB={};

feedbackDB.addFeedback = function (feedbackData, done){
    feedbackData.save(function(err){
        if (err) { return done(err); }
        else {
            return done(null, { success:true , "message": "successfully created" });
          }
      })
    };
    feedbackDB.updateFeedback =  function(feedbackData, done) {
        Feedback.findOneAndUpdate({_id:feedbackData._id}, feedbackData, function (err, data) {
            if(err){
                return done(null, { success:false , "error": err});
            }
            else{
              return done(null, { success:true , "message": "successfully updated" });
            }
          });
    };

    feedbackDB.getFeedbackById =  function (id, done){
        Feedback.find({"_id":id},(function(err,data){
            if(err){
              return done(null, { success:false , "error": err});
            }
            else{
              return done(null, { success:true , "data": data });
            }
        }));
    };

    feedbackDB.removeFeedback =  function (id, done){
        Feedback.remove({"_id":id},(function(err, data){
            if(err) {
                return done(null, { success:false , "error":err});
            }
            else {
                return done(null, { success:true , "data": data});
            }
        }));
    };

    // userDB.getAllUser = function(following, done){
    //       list = [];
    //       function asyncLoop(i, cb) {
    //           if (i < following.length) {
    //               User.find({'_id': following[i].followingUserId , "isDraft": false }).exec(function (err, o) {
    //                 debugger;
    //                 console.log(o);
    //                   list.push(o);
    //                   asyncLoop(i+1, cb);
    //               });
    //           } else {
    //               cb();
    //           }
    //       }
    //       asyncLoop(0, function() {
    //           done(null, {'lists':list});
    //       });
        
    // }

    feedbackDB.findAll =  function(done){
        Feedback.find({},(function(err,data){
            if(err){
                return done(null,{ success:false , "error":err});
            }
            else {
                // postDB.getAllFollowingPosts(following, function(err, following_posts){
                //     if(err) { return done(err); }
                //     else{
                //       posts = admin_posts.lists.concat(user_posts.data);
                //       posts = posts.concat(following_posts.lists);
                //       done(null, posts);
                //     }
                //   })
            return done(null, { success:true , "data": data}); 
            }
        }));
    };

    module.exports = feedbackDB;