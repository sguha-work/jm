var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FollowingSchema = new Schema({
    followingUserId : { type:String },
    followingUserName : { type:String },
    followingPicture : { type:String },
    followingsocialId : { type:String }
   },{ _id : false });

   module.exports = mongoose.model('Following', FollowingSchema);