var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FollowerSchema = new Schema({
    followerId : { type:String },
    followerName : { type:String }
   },{ _id : false });

   module.exports = mongoose.model('Follower', FollowerSchema);