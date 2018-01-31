var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RatingSchema = new Schema({
    userId : { type:String },
    rating : { type:Number }
   },{ _id : false });

   module.exports = mongoose.model('Rating', RatingSchema);