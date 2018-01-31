var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
categoryName : { type : String },
categoryUrl : { type : String }

})

module.exports = mongoose.model('Category', CategorySchema);