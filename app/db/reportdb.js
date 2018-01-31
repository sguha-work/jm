var Report = require('../models/report.js');
var messages = require('../config/messages.js');

const reportDB = {};

reportDB.saveReport = function (post, done) {
    var report =  new Report();
    report.repoter = post.report.reporter;
    report.reportee = post.poster;
    report.reporteeMail = post.posterEmail;
    report.reportPostId = post._id;
    report.reporteeId = post.userId;
    report.postContent = post.postContent;
    report.save(function(err){
      if (err) { return done(err); }
      else {
          return done(null, { success:true, "message":"report added" });
        }
    });
};

reportDB.getAllReports = function(done){
  Report.find({}, function(err, data){
    if(err){ done(err) }
    else{
      done(null, {success:true, "data":data});
    }
  })
}

reportDB.deleteReports = function(ids, done){
  Report.remove({ "_id":{ $in: ids } },function(err, response){
    if(err){ done(err); }
    else{
      done(null, { success:true, "message":"delete successful" });
    }
  });
}

module.exports = reportDB;