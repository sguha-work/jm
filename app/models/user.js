var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var randomstring = require("randomstring");
var Facebook = require('./facebook.js');
var facebookSchema = Facebook.schema;
var googleSchema = require('./google.js').schema;
var topicSchema = require('./topics.js').schema;
var followingSchema = require('./following.js').schema;
var messages = require('../config/messages.js');
var mailer = require('../helpers/mailer.js');

var userSchema = new Schema({
    realmId     : { type:String },
    username    : { type:String, lowercase:true},
    password    : { type:String },
    firstName   : { type:String, required:true },
    lastName    : { type:String, required:true }, 
    email       : { type:String, lowercase:true, required:true, unique:true},
    status      : { type:String },
    profilePic  : {type:String},
    isNewUser   : { type:Boolean },
    facebook    : [ facebookSchema ],
    fb_acc_token: { type:String },
    google      : [ googleSchema ],
    topics      : [ topicSchema ],
    penName     : { type:String },
    shortBio    : { type:String },
    dateOfBirth : { type:Date },
    privacyPolicy: { type:String },
    language    : { type:String },
    location    : { type:String },
    active : { type:Boolean, required:true, default:false },
    temporaryToken : { type:String, required:true },
    followers    : [ ],
    following    : [ followingSchema ],
    role : { type: String },
    featuredContent : { type: Boolean },
    deleteUser : { type: Boolean },
    featureList : []
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// userSchema.pre('save', function(next){
//     this.realmId = new mongoose.mongo.ObjectId();
//     mailer.sendMail(this.email, this.username, function(err, status){
//         if(err){
//             return next(err);
//         }else{
//             next();
//         }
//     });
    
// });

module.exports = mongoose.model('User', userSchema);

