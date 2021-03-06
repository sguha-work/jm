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
    var postObject = new Post();
    postObject.postContent = req.body.postContent;
    postObject.userId = req.body.userId;
    postObject.userEmail = req.body.userEmail;
    postObject.systemInfo = req.body.systemInfo;
    postObject.systemInfo.host = req.hostname;
    postObject.systemInfo.origin = req.origin;
    postObject.postImage = req.body.postImage;
    postObject.hastags = req.body.hastags;
    postObject.postTitle = req.body.postTitle;
    postObject.postLanguage = req.body.postLanguage;
    postObject.postBackGroundColor = req.body.postBackGroundColor;
    postObject.postType = req.body.postType;
    postObject.postTopic = req.body.postTopic;
    postObject.isDraft = req.body.isDraft;
    postObject.lastModified = req.body.lastModified;
    postObject.isTrashed = req.body.isTrashed;
    postObject.rating = req.body.rating;
    postDB.addPost(postObject).then(function (data) {
        res.json({ "success": true, "messege": data });
    }).catch(function (error) {
        res.json({ "success": false, "messege": error });
    });
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

/**
 * Search post name by key word
 */
postController.searchPostNameWithKeyword = ((keyWord) => {
    return new Promise((resolve, reject) => {
        var Query;
        Query = Post.find({ 'postTitle': { "$regex": keyWord, "$options": 'i' }, "isDraft": false }, { 'systemInfo': 0 });
        Query.exec( (err, dataFromDatabase) => {
            if (!err) {
                resolve(dataFromDatabase);
            } else {
                reject();
            }
        });
    });
});

/**
 * Search post content by keyword
 */
postController.searchPostContentWithKeyWord = ((keyWord) => {
    return new Promise((resolve, reject) => {
        var Query;
        Query = Post.find({ 'postContent': { "$regex": keyWord, "$options": 'i' }, "isDraft": false }, { 'systemInfo': 0 });
        Query.exec( (err, dataFromDatabase) => {
            if (!err) {
                resolve(dataFromDatabase);
            } else {
                reject();
            }
        });
    });
});


module.exports = postController;



