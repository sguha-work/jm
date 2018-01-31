var Quote = require('../models/quotes.js');
var messages = require('../config/messages.js');

const quoteDB = {};

quoteDB.addQuote = function (quoteData, done) {
  quoteData.save().then((err) => {
      if (err) { return done(err); }
      else {
          return done(null, messages.success.user_created);
        }
    })
      .catch((err) => {
        return done(null, messages.errors.required_missing);
      });
};

quoteDB.updateQuote = function (quoteData, done) {
  Quote.findOneAndUpdate({_id:quoteData._id}, quoteData, function (err, data) {
    if(err){
        return done(null, { success:false , "error": err});
    }
    else{
      return done(null, { success:true , "message": "successfully updated" });
    }
  });
}

quoteDB.getQuoteById = function (id, done) {
  Quote.find({"_id":id},(function(err,data){
          if(err){
            return done(null, { success:false , "error": err});
          }
          else{
            return done(null, { success:true , "data": data });
          }
      }));
}
   
quoteDB.removeQuote = function(id, done){
  Quote.remove({"_id": id }, function(err, data){
      if(err){
        return done(null, { success:false , "error": err});
      }
      else{
        return done(null, { success:true , "message": "successfully deleted" });
      } 
  })
 
}

quoteDB.findRandom = function (done) {
  Quote.count().exec(function (err, count) {
    var random = Math.floor(Math.random() * count)
    Quote.findOne().skip(random).exec(
      function (err, result) {
        if (err) {
          return done(null, { success: false, "error": err });
        } else {
          return done(null, { success: true, "data": result });
        }
      })
  })
}




module.exports = quoteDB;