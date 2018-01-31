var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
feedbackContent : { type : String },
userId          : { type : String },
userName        : { type : String },
email           : { type:String, lowercase:true, required:true},

})

module.exports = mongoose.model('Feedback', FeedbackSchema);