var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TypeSchema = new Schema({
    type: { type: String },
    typeImage: { type: String }
});

module.exports = mongoose.model('Type', TypeSchema);