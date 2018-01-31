var Birthday = require('../models/birthday.js');
var messages = require('../config/messages.js');

const birthdayDB = {};

birthdayDB.addBirthday = function (birthdayData, done) {
  birthdayData.save().then((err) => {
      if (err) { return done(err); }
      else {
          return done(null, messages.success.user_created);
        }
    })
      .catch((err) => {
        return done(null, messages.errors.required_missing);
      });
};

birthdayDB.updateBirthday = function (birthdayData, done) {
  Birthday.findOneAndUpdate({_id:birthdayData._id}, birthdayData, function (err, data) {
    if(err){
        return done(null, { success:false , "error": err});
    }
    else{
      return done(null, { success:true , "message": "successfully updated" });
    }
  });
}

birthdayDB.getbirthdayById = function (id, done) {
  Birthday.find({"_id":id},(function(err,data){
          if(err){
            return done(null, { success:false , "error": err});
          }
          else{
            return done(null, { success:true , "data": data });
          }
      }));
}

birthdayDB.getbirthdayByCurrentDate = function (done) {

  Birthday.find({ "dob": new Date() },(function(err,data){
          if(err){
            return done(null, { success:false , "error": err});
          }
          else{
            return done(null, { success:true , "data": data });
          }
      }));
}
   
birthdayDB.removeBirthday = function(id, done){
  Birthday.remove({ "_id": id }, function(err, data){
      if(err){
        return done(null, { success:false , "error": err});
      }
      else{
        return done(null, { success:true , "message": "successfully deleted" });
      } 
  })
 
}

module.exports = birthdayDB;