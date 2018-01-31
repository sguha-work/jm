var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReportSchema = new Schema({
    repoter : { type:String },
    reportPostId : { type:String },
    reportee : { type:String },
    reporteeMail : { type:String },
    reporteeId : { type:String },
    postContent : { type:String }
   });

   module.exports = mongoose.model('Report', ReportSchema);