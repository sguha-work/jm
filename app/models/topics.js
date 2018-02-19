var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopicSchema = new Schema({
    topicName : { type:String },
    topicImage : { type:String },
    description : { type:String }
   });

   module.exports = mongoose.model('Topic', TopicSchema);