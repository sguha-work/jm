var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FaceBookSchema = new Schema({
    email : { type:String },
    id : { type:String },
    name : { type:String },
    picture : { type:String },
    gender: { type:String },
    birthday :{ type:String },
    first_name: { type:String },
    last_name: { type:String },
    link: { type:String },
    locale: { type:String },
    friends:[{}]
 });

   module.exports = mongoose.model('Facebook', FaceBookSchema);