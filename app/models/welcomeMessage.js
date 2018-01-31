var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WelcomeMessageSchema = new Schema({
    message : { type:String },
    messageImageUrl : { type:String }
});
module.exports = mongoose.model('WelcomeMessage', WelcomeMessageSchema);