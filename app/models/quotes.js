var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuotesSchema = new Schema({
    quote : { type:String },
    author: { type: String }
   });

   module.exports = mongoose.model('Quote', QuotesSchema);