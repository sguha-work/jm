'use strict';

var Post = require('../models/post.js');
var messages = require('../config/messages.js');
var postDB = require('../db/postdb.js');
var reportDB = require('../db/reportdb.js');
////////////////////////////////////////////////////////////////////////////////
// Exported functions
////////////////////////////////////////////////////////////////////////////////
const postController = {};

postController.all = function (req, res) {
    var post = new Post();
    Post.find({}, (function (err, data) {
        if (err) {
            res.send("Error :", err);
        }
        else {
            res.send(data);
        }
    }));
}

postController.getById = function (req, res) {
    var id = req.body.id;
    Post.find({ "_id": id }, (function (err, data) {
        if (err) {
            res.json({ success: false, "error": err });
        }
        else {
            res.json({ success: true, "data": data });
        }
    }));
}

postController.remove = function (req, res) {
    var id = req.body.id;
    postDB.removePost(id, function (err, data) {
        if (err) {
            res.send("Error :", err);
        }
        else {
            res.json({ "status": "success" });
        }
    })

}

postController.update = function (req, res) {
    Post.findOneAndUpdate({ _id: req.body._id }, req.body, function (err, data) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(data);
        }
    });
}

postController.getAllUserPosts = function (req, res) {
    postDB.getAllUserPosts(req.body.id, function (err, data) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(data);
        }
    })
}


postController.add = function (req, res) {
    var post = new Post();
    post.postContent = req.body.postContent;
    post.userId = req.body.userId;
    post.poster = req.body.poster;
    post.posterImage = req.body.posterImage;
    post.hastags = req.body.hastags.split(/[ ,]+/).filter(Boolean);
    post.postTitle = req.body.postTitle;
    post.postTopic = req.body.postTopic;
    post.postLanguage = req.body.postLanguage;
    post.posterRole = req.body.posterRole;
    post.postType = req.body.postType;
    post.isDraft = false;
    if (req.body.isDraft) {
        post.isDraft = req.body.isDraft;
    }
    post.dateAndTime = new Date();
    postDB.addPost(post, function (err, data) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(data);
        }
    })
}

postController.likePost = function (req, res) {
    postDB.likePost(req.body, function (err, data) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(data);
        }
    })
}

postController.bookMarkPost = function (req, res) {
    postDB.bookMark(req.body, function (err, data) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(data);
        }
    })
}

postController.removeBookMark = function (req, res) {
    postDB.removeBookMark(req.body, function (err, data) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(data);
        }
    })
}


postController.disLikePost = function (req, res) {
    postDB.disLikePost(req.body, function (err, data) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(data);
        }
    })
}

postController.commentPost = function (req, res) {
    postDB.commentPost(req.body, function (err, data) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(data);
        }
    })
}

postController.ratePost = function (req, res) {
    postDB.getPost(req.body, function (err, data) {
        if (err) { return res.json(err); }
        else {
            data.ratings = {};
            data.ratings = req.body.ratings;
            postDB.ratePost(data, req.body.ratings, function (err, data) {
                if (err) {
                    res.json(err);
                }
                else {
                    res.json(data);
                }
            })
        }
    })
}

postController.getAvgRating = function (req, res) {
    postDB.getAvgRating(req.body.id, function (err, data) {
        if (err) { return res.json(err); }
        else {
            res.json(data);
        }
    })
}

postController.reportAbuse = function (req, res) {
    postDB.reportAbuse(req.body, function (err, data) {
        if (err) { return res.json(err); }
        else {
            res.json(data);
        }
    })
}

// postController.saveAsdraft = function(req, res){
//     postDB.findDraft(function(err, data){
//         if (err) { return res.json(err); }
//         else if(!data.found) {
//             postDB.saveDraft(req, function(err, response){
//                 if (err) { return res.json(err); }
//                 else{ res.json(response); }
//             });
//         }else{
//             postDB.replaceDraft(data.post, req, function(err, response){
//                 if (err) { return res.json(err); }
//                 else{ res.json(response); }
//             })
//         }
//     })
// }


postController.saveAsdraft = function (req, res) {
    postDB.saveDraft(req, function (err, response) {
        if (err) { return res.json(err); }
        else { res.json(response); }
    });
}

postController.getAllUserDrafts = function (req, res) {
    postDB.getAllDrafts(req.body.id, function (err, data) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(data);
        }
    })
}

postController.getAllTimelinePosts = function (req, res) {
    postDB.getTimelinePosts(req.body.id, req.body.following, function (err, data) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(data);
        }
    })
}
postController.updateDraft = function (req, res) {
    postDB.updateUserDraft(req.body.id, req.body, function (err, data) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(data);
        }
    })

}
postController.searchPost = function (req, res) {
    postDB.search(req.body.searchText, function (err, data) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(data);
        }
    })
}

postController.deleteMultipleDrafts = function (req, res) {
    postDB.deleteDrafts(req.body.ids, function (err, data) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(data);
        }
    })
}

postController.getFilteredPosts = function (req, res) {
    postDB.getFilterPosts(req.body.category, function (err, data) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(data);
        }
    })
}

postController.getAllReports = function (req, res) {
    reportDB.getAllReports(function (err, data) {
        if (err) { res.json(err); }
        else {
            res.json(data);
        }
    })
}

postController.deleteReports = function (req, res) {
    reportDB.deleteReports(req.body.ids, function (err, data) {
        if (err) { res.json(err); }
        else {
            res.json(data);
        }
    })
}

postController.getFavPosts = function (req, res) {
    postDB.favouritePosts(req.body.fav, function (err, data) {
        if (err) { res.json(err); }
        else {
            res.json(data);
        }
    })
}



module.exports = postController;



