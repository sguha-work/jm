var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    userId : { type:String },
    userName : { type:String },
    commentBody : { type:String },
    },{ _id : false });

module.exports = mongoose.model('Comment', CommentSchema);

