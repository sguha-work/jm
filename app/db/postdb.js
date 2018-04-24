var Post = require('../models/post.js');
var Report = require('../models/report.js');
var messages = require('../config/messages.js');
var jwt = require('jsonwebtoken');
var userDb = require('./userdb.js');
var reportDB = require('./reportdb.js');
var notificationDB = require('./notificationdb');
var mailer = require('../helpers/mailer.js');

const postDB = {};

// postDB.addPost = function (postData, done) {
//    postData.save().then(() => {
//         return done(null, messages.success.success);
//       })
//       .catch((err) => {
//         return done(null, err);
//       });
// };

postDB.addPost = (function (postData) {
  return new Promise(function (resolve, reject) {
    postData.save(function (err) {console.log("error", err);
      if (err) {
        reject(err);
      }
      else {
        // postData.on('es-indexed', function (err, res) {
        //   if (err) {
        //     console.log("error 2"); 
        //     return done(err); 
        //   }
        //   else {
        resolve(messages.success.success);
        //}});

      }
    })
  });

});

postDB.getPost = function (postData, done) {
  Post.find({ "_id": postData._id }).exec(function (err, data) {
    if (err) {
      return done(err);
    }
    else {
      return done(null, data[0]);
    }
  });
};

postDB.getAllUserPosts = function (id, done) {
  Post.find({ "isDraft": false }).sort({ 'dateAndTime': -1 }).exec(function (err, data) {
    if (err) {
      return done(err);
    }
    else {
      return done(null, { success: true, "data": data });
    }
  });
}


postDB.getAllAdminPosts = function (done) {
  userDb.findallAdmins(function (err, response) {
    if (err) { return done(err); }
    else {
      list = [];
      function asyncLoop(i, cb) {
        if (i < response.data.length) {
          Post.find({ 'userId': response.data[i].following.followingUserId, "isDraft": false }).exec(function (err, o) {
            if (o.length != 0) {
              list.push(o);
            }
            asyncLoop(i + 1, cb);
          });
        } else {
          cb();
        }
      }
      asyncLoop(0, function () {
        done(null, { 'lists': list });
      });
    };
  });
  // Post.find({ "role":"admin", "isDraft": false }).sort({'dateAndTime':-1}).exec(function(err, data){
  //         if(err){
  //           return done(err);
  //         }
  //         else{
  //            return done(null, { success:true, "data": data });
  //         }
  //     });
}

postDB.getAllFollowingPosts = function (following, done) {

  list = [];
  function asyncLoop(i, cb) {
    if (typeof following !== "undefined" && following && i < following.length) {
      Post.find({ 'userId': following[i].followingUserId, "isDraft": false }).exec(function (err, o) {
        console.log(o);
        list.push(o);
        asyncLoop(i + 1, cb);
      });
    } else {
      cb();
    }
  }
  asyncLoop(0, function () {
    done(null, { 'lists': list });
  });

}


postDB.getTimelinePosts = function (id, following, done) {
  var posts = [];
  postDB.getAllAdminPosts(function (err, admin_posts) {
    if (err) { return done(err); }
    else {
      postDB.getAllUserPosts(id, function (err, user_posts) {
        if (err) { return done(err); }
        else {
          postDB.getAllFollowingPosts(following, function (err, following_posts) {
            if (err) { return done(err); }
            else {
              posts = admin_posts.lists.concat(user_posts.data);

              function asyncLoop(i, cb) {
                if (i < following_posts.lists.length) {
                  posts = posts.concat(following_posts.lists[i]);
                  asyncLoop(i + 1, cb);
                }
                else {
                  cb();
                }
              }
              asyncLoop(0, function () {
                done(null, posts);
              });
            }
          })
        }
      })
    }
  })
}

postDB.likePost = function (postData, done) {
  Post.findOne({ "_id": postData.id }).exec(function (err, post) {
    if (err) {
      return done(err);
    } else if (!post) {
      return done(null, messages.errors.technical);
    } else {
      post.likes = checkAndAdd(post.likes, postData.likes);
      post.save().then((data) => {
        return done(null, { success: true, "like_count": data.likes.length });
      })
        .catch((err) => {
          return done(null, messages.errors.required_missing);
        });
    }
  })
}

postDB.disLikePost = function (postData, done) {
  Post.findOne({ "_id": postData.id }).exec(function (err, post) {
    if (err) {
      return done(err);
    } else if (!post) {
      return done(null, messages.errors.technical);
    } else {
      post.likes = checkAndRemove(post.likes, postData.likes);
      post.save().then((data) => {
        return done(null, { success: true, "like_count": data.likes.length });
      })
        .catch((err) => {
          return done(null, messages.errors.required_missing);
        });
    }
  })
}


postDB.commentPost = function (postData, done) {
  Post.findOne({ "_id": postData._id }, function (err, post) {
    if (err) {
      return done(err);
    } else if (!post) {
      return done(null, messages.errors.technical);
    } else {
      post.comments.push(postData.comments);
      post.save().then((data) => {
        postData.notificationType = "comment";
        postData.notificationBody = postData.comments.commentBody;
        notificationDB.addNotification(postData, function (err, response) {
          if (err) { return done(err); }
          else {
            return done(null, { success: true, "comments": data.comments });
          }
        })
      })
        .catch((err) => {
          return done(null, messages.errors.required_missing);
        });
    }
  })
}

postDB.ratePost = function (postData, ratings, done) {
  Post.findOne({ "_id": postData._id }, function (err, post) {
    if (err) {
      return done(err);
    } else if (!post) {
      return done(null, messages.errors.technical);
    } else {
      postDB.findRating(postData, ratings, function (err, response) {
        if (err) {
          return done(err);
        } else {
          return done(null, response);
        }
      })
    }
  })
}

postDB.findRating = function (postData, ratings, done) {
  Post.findOne({ rating: { $elemMatch: { "userId": ratings.userId } } }, function (err, data) {
    if (err) {
      return done(err);
    } else if (!data) {
      postData.rating.push(ratings);
      postData.save().then((data) => {
        return done(null, { success: true, "isNew": true, "comments": data.comments });
      })
        .catch((err) => {
          return done(err);
        });
    } else {
      Post.update({ 'rating.userId': ratings.userId }, {
        '$set': {
          'rating.$.rating': ratings.rating
        }
      }, function (err) {
        if (err) {
          return done(err);
        }
        return done(null, { success: true, "isNew": false });
      })
    }
  })
}

postDB.getAvgRating = function (userId, done) {
  Post.aggregate([
    { $unwind: "$rating" },
    { $match: { "rating.userId": userId } },
    { $group: { _id: null, avgRate: { $avg: "$rating.rating" } } }
  ], function (err, result) {
    if (err) {
      return done(err);
    } else {
      if (typeof result == "undefined" || !result.length) {
        return done(null, { success: true, "count": 0 });
      }
      if (typeof result[0].avgRate === "undefined") {
        result[0].avgRate = 0;
      }
      return done(null, { success: true, "count": result[0].avgRate });
    }
  });
}

postDB.removePost = function (id, done) {
  Post.remove({ "_id": id }, (function (err, data) {
    if (err) {
      return done(err);
    }
    else {
      return done(null, { "status": "success", "success": true });
    }
  }));
}

postDB.reportAbuse = function (post, done) {
  userDb.findOneById(post.userId, function (err, user) {
    if (err) { return done(err); }
    else {
      post.posterEmail = user.email;
      reportDB.saveReport(post, function (err, data) {
        if (err) { done(err) }
        else {
          mailer.reportMail(post, function (err, response) {
            if (err) { return done(err); }
            else {
              return done(null, response);
            }
          })
        }
      })
    }
  })
}
postDB.findDraft = function (done) {
  Post.findOne({ "isDraft": true }, function (err, post) {
    if (err) {
      return done(err);
    } else if (!post) {
      return done(null, { "found": false, message: "No drafts found" });
    } else {
      return done(null, { "found": true, "post": post });
    }
  })
}

postDB.getAllDrafts = function (id, done) {
  Post.find({ 'userId': id, "isDraft": true }, function (err, post) {
    if (err) {
      return done(err);
    } else if (!post) {
      return done(null, { "found": false, message: "No drafts found" });
    } else {
      return done(null, { "found": true, "post": post });
    }
  })
}

postDB.saveDraft = function (data, done) {
  var post = new Post();
  post.postTitle = data.body.postTitle;
  post.postContent = data.body.postContent;
  post.hastags = data.body.hastags;
  post.userId = data.body.userId;
  post.poster = data.body.poster;
  post.posterImage = data.body.posterImage;
  post.isDraft = true;
  post.dateAndTime = new Date();
  post.postType = data.body.postType;
  postDB.addPost(post, function (err, data) {
    if (err) {
      done(err);
    }
    else {
      done(null, { success: true, message: "save successful" });
    }
  })
}

postDB.replaceDraft = function (old_post, data, done) {
  postDB.removePost(old_post._id, function (err, response) {
    if (err) { done(err); }
    else if (response.success) {
      postDB.saveDraft(data, function (err, new_response) {
        if (err) { done(err); }
        else {
          done(null, { success: true, message: "draft replaced" });
        }
      })
    }
  })
}

postDB.favouritePosts = function (fav_list, done) {
  Post.find({ "postTopic": { $in: fav_list } }, { limit: 20 }, function (err, data) {
    if (err) { return done(err); }
    else {
      return done(null, { success: true, "data": data });
    }
  });
}

postDB.updateUserDraft = function (id, data, done) {
  data.isDraft = false;
  Post.findOneAndUpdate({ _id: id }, data, function (err, data) {
    if (err) {
      done(err);
    }
    else {
      done(null, { success: true, "data": data });
    }
  });
}

postDB.search = function (querystring, done) {
  Post.search({
    query_string: {
      query: querystring
    }
  }, function (err, results) {
    if (err) { return done(err); }
    else {
      var results_data = results['hits']['hits'].map(function (i) {
        return i['_source'];
      });
      return done(null, results_data);
    }
  });
}

postDB.deleteDrafts = function (ids, done) {
  Post.remove({ "_id": { $in: ids } }, (function (err, data) {
    if (err) {
      return done(err);
    }
    else {
      return done(null, { "success": true, "data": data });
    }
  }));
}

postDB.getFilterPosts = function (category, done) {
  Post.find({ "postType": category }, function (err, data) {
    if (err) { return done(err); }
    else {
      return done(null, { "success": true, "data": data });
    }
  });
}

postDB.bookMark = function (postData, done) {
  Post.findOne({ "_id": postData.id }).exec(function (err, post) {
    if (err) {
      return done(err);
    } else if (!post) {
      return done(null, messages.errors.technical);
    } else {
      post.bookMarks = checkAndAdd(post.bookMarks, postData.bookmark_obj);
      post.save().then((data) => {
        return done(null, { success: true, "message": "bookmark successful", "bookmarks": data.bookMarks.length });
      })
        .catch((err) => {
          return done(null, { success: false, "message": err });
        });
    }
  })
}

postDB.removeBookMark = function (postData, done) {
  Post.findOne({ "_id": postData.id }).exec(function (err, post) {
    if (err) {
      return done(err);
    } else if (!post) {
      return done(null, messages.errors.technical);
    } else {
      post.bookMarks = checkAndRemove(post.bookMarks, postData.bookmark_obj);
      post.save().then((data) => {
        return done(null, { success: true, "message": "bookmark successful", "bookmarks": data.bookMarks.length });
      })
        .catch((err) => {
          return done(null, { success: false, "message": err });
        });
    }
  })
}




var checkAndAdd = function (likeArray, likeObj) {
  var found = likeArray.some(function (el) {
    return el.userId === likeObj.userId;
  });
  if (!found) { likeArray.push(likeObj); }

  return likeArray;
}

var checkAndRemove = function (likeArray, likeObj) {
  var found = likeArray.some(function (el) {
    return el.userId === likeObj.userId;
  });
  if (found) {
    likeArray.forEach(function (element, index) {
      if (element.userId === likeObj.userId) {
        likeArray.splice(index, 1);
      }
    }, this);

  }
  return likeArray;
}





module.exports = postDB;