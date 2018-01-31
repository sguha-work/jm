var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosastic = require('mongoosastic');
var bcrypt = require('bcrypt-nodejs');
var likeSchema = require('./likes').schema;
var commentSchema = require('./comments').schema;
var ratingSchema = require('./ratings').schema; 

var PostSchema = new Schema({
    userId : { type:String },
    postContent : { type:String },
    postType : { type:String },
    poster : { type:String },
    posterImage : { type:String },
    postLanguage : { type:String },
    postCategory    : { type:String , es_indexed:true},
    dateAndTime    : { type:Date },
    likes    : [ likeSchema ],
    comments  : [ commentSchema ],
    rating :  [ ratingSchema ],
    hastags    : [ ],
    keywords    : { type:String },
    favourates    : { type:String , es_indexed:true},
    isDraft : { type:Boolean },
    postTitle    : { type:String },
    postTopic    : { type:String , es_indexed:true},
    posterRole   : { type:String },
    bookMarks : []
   });

   PostSchema.plugin(mongoosastic);

   module.exports = mongoose.model('Post', PostSchema);

