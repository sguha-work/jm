var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// var expressSession = require('express-session');
var User = require('../models/user.js');
var configAuth = require('./auth');
var jwt = require('jsonwebtoken');

module.exports = function(app, passport) {
    
    passport.serializeUser(function(user, done) {
        token = jwt.sign({ user : user}, 'jiyawebsite', {expiresIn:'2h'});
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
 // FACEBOOK ================================================================
    passport.use(new FacebookStrategy({
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        profileFields   :['id', 'displayName', 'picture.type(large)','email', 'gender', 'link', 'locale','birthday','last_name','first_name','friends', 'about']
    },
    function(token, refreshToken, profile, done) {
        var user = new User();
        var profile = profile._json;
        User.findOne({ email:profile.email }).exec(function(err, old_user){
            if (err)
                return done(err);
            if (old_user) {
                old_user.fb_acc_token = token;
                User.findOneAndUpdate({_id:old_user._id}, old_user, function (err, data) {
                    if(err){
                        return done(null, err);
                    }
                    else{
                        return done(null, old_user);
                    }
                  });
               // return done(null, old_user);
            } else {
                user.username = profile.name;
                user.email = profile.email;
                user.firstName = profile.first_name;
                user.lastName = profile.last_name;
                user.profilePic = profile.picture.data.url;
                user.fb_acc_token = token;
                user.temporaryToken = "NIL";
                user.active = true;
                user.isNewUser = true;
                user.facebook.push({ 
                                     id:profile.id,
                                     name : profile.name,
                                     email: profile.email,
                                     picture : profile.picture.data.url,
                                     gender: profile.gender,
                                     first_name:profile.first_name,
                                     last_name:profile.last_name,
                                     link:profile.link,
                                     locale:profile.locale,
                                     friends:profile.friends.data,
                                     birthday:profile.birthday
                                 });
                user.save().then(function(){
                    return done(null, user); 
                }).catch(function(err){
                    console.log(err);
                });
            }
        });
      //return done(null, profile);
     }
    ));

    //Facebook Routes
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email','user_friends', 'user_status','public_profile', 'user_about_me','user_birthday'] }));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect : '/' }),function(req, res){
        res.redirect('/social/'+token);
    });

    // GOOGLE ==================================================================
    passport.use(new GoogleStrategy({
        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
        },
        function(token, refreshToken, profile, done) {
            var user = new User();
            var profile = profile._json;
            User.findOne({ email:profile.email }).exec(function(err, old_user){
                if (err)
                    return done(err);
                if (old_user) {
                    old_user.fb_acc_token = token;
                    User.findOneAndUpdate({_id:old_user._id}, old_user, function (err, data) {
                        if(err){
                            return done(null, err);
                        }
                        else{
                            return done(null, old_user);
                        }
                      });
                    //return done(null, old_user);
                } else {
                    user.username = profile.name;
                    user.email = profile.email;
                    user.firstName = profile.given_name;
                    user.lastName = profile.family_name;
                    user.profilePic = profile.picture;
                    user.fb_acc_token = token;
                    user.temporaryToken = "NIL";
                    user.active = true;
                    user.isNewUser = true;
                    user.google.push({ 
                                         id:profile.id,
                                         name : profile.name,
                                         email: profile.email,
                                         picture : profile.picture,
                                         gender: profile.gender,
                                         first_name:profile.given_name,
                                         last_name:profile.family_name,
                                         link:profile.link,
                                         locale:profile.locale
                                     });
                    user.save().then(function(){
                        return done(null, user); 
                    }).catch(function(err){
                        console.log(err);
                    });
                }
            });
           // return done(null, profile);
        }));
        
        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email','https://www.googleapis.com/auth/contacts','https://www.googleapis.com/auth/user.addresses.read', 'https://www.googleapis.com/auth/user.birthday.read','https://www.googleapis.com/auth/plus.login',
        'https://www.google.com/m8/feeds/contacts/default/full?alt=json'] }));
        app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect : '/' }),function(req, res){
            res.redirect('/social/'+token);
        });

        app.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });
};



















