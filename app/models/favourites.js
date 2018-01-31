var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FavouriteSchema = new Schema({
    favourite : { type:String },
    favouriteImage : { type:String },
    description : { type:String }
   });

   module.exports = mongoose.model('Favourite', FavouriteSchema);