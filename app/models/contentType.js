var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContentTypeSchema = new Schema({
    contentName : { type : String},
    contentImageUrl : { type : String}
});

module.exports = mongoose.model('ContentType', ContentTypeSchema);