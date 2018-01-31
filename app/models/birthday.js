var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BirthdaySchema = new Schema({
    dob : { type:Date },
    personName : { type:String },
    quote : { type:String }
   });

   module.exports = mongoose.model('Birthday', BirthdaySchema);