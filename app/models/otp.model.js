var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var otpSchema = new Schema({
    forEmail: { type: String, required: true },
    otp: { type: Number, required: true },
    validTill: { type: Number, required: true },
});
module.exports = mongoose.model('otp', otpSchema);