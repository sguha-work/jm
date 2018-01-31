var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LikeSchema = new Schema({
    userId : { type:String },
    userName : { type:String },
   },{ _id : false });

   module.exports = mongoose.model('Like', LikeSchema);