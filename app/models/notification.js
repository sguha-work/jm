var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotificationSchema = new Schema({
    postId : { type:String },
    poster:  { type:String },
    posterId: { type:String },
    notificationType: { type:String },
    notificationTime : { type:Date },
    notificationBody : { type: String },
    postee : { type:String },
    isSeen : { type:Boolean }
   });

   module.exports = mongoose.model('Notification', NotificationSchema);