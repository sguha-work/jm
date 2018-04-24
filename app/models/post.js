var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosastic = require('mongoosastic');
var bcrypt = require('bcrypt-nodejs');
var likeSchema = require('./likes').schema;
var commentSchema = require('./comments').schema;
var ratingSchema = require('./ratings').schema;

var PostSchema = new Schema({
    postContent: { type: String, required: false },
    userId: { type: String, required: false },
    userEmail: { type: String, required: false },
    systemInfo: { type: Schema.Types.Mixed, required: false },
    postImage: { type: String, required: false },
    hastags: { type: String, required: false },
    postTitle: { type: String, required: false },
    postLanguage: { type: String, required: false },
    postBackGround: { type: String, required: false },
    postType: { type: String, required: false },
    postTopic: { type: String, required: false },
    postLastModificationTime: { type: String, required: false },
    isDraft: { type: Boolean, required: false },
    rating: { type: Number, required: false },
    lastModified: { type: String, required: false },
    isTrashed: { type: Boolean, required: false },
});

PostSchema.plugin(mongoosastic);

module.exports = mongoose.model('Post', PostSchema);

