var Category = require('../models/category.js');
var messages = require('../config/messages.js');

const categoryDB = {};

categoryDB.addCategory = function (categoryData, done){
    categoryData.save(function(err){
        if (err) { return done(err); }
        else {
            return done(null, messages.success.category_created);
          }
      })
    };
    categoryDB.updateCategory =  function(categoryData, done) {
        Category.findOneAndUpdate({_id:categoryData._id}, categoryData, function (err, data) {
            if(err){
                return done(null, { success:false , "error": err});
            }
            else{
              return done(null, { success:true , "message": "successfully updated" });
            }
          });
    };

    categoryDB.getCategoryById =  function (id, done){
        Category.find({"_id":id},(function(err,data){
            if(err){
              return done(null, { success:false , "error": err});
            }
            else{
              return done(null, { success:true , "data": data });
            }
        }));
    };

    categoryDB.removeCategory =  function (id, done){
        Category.remove({"_id":id},(function(err, data){
            if(err) {
                return done(null, { success:false , "error":err});
            }
            else {
                return done(null, { success:true , "data": data});
            }
        }));
    };

    categoryDB.findAll =  function(done){
        Category.find({},(function(err,data){
            if(err){
                return done(null,{ success:false , "error":err});
            }
            else {
                return done(null, { success:true , "data": data}); 
            }
        }));
    };

    module.exports = categoryDB;