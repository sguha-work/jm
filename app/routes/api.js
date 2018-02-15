var User = require('../models/user.js');
var Subjects = require('../models/subjects.js');
var Post = require('../models/post.js');
var Category = require('../models/category.js');
var userController = require('../controllers/usercontroller');
var postController = require('../controllers/postcontroller');
var loginController = require('../controllers/logincontroller');
var quoteController = require('../controllers/quotecontroller');
var favController = require('../controllers/favcontroller');
var bdayController = require('../controllers/bdaycontroller');
var profileController = require('../controllers/profilecontroller');
var categoryController = require('../controllers/categorycontroller');
var feedbackController = require('../controllers/feedbackcontroller');
var notificationController = require('../controllers/notificationcontroller');


var path = require('path');
var jwt = require('jsonwebtoken');

//routes
module.exports = function (router, passport) {

    router.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/public/app/view/index.html'));
    });

    router.get('/login', function (req, res) {
        res.render(path.join(__dirname + '/public/app/view/login.html'), { messages: req.flash('info') });
    });

    router.get('/signup', function (req, res) {
        // req.flash('info', 'Flash is back!');
        res.render(path.join(__dirname + '/public/app/view/signup.html'), { messages: req.flash('info') });
    });

    router.post('/signup', userController.add);

    router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/about', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));


    router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

    // handle the callback after facebook has authenticated the user
    router.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/about',
            failureRedirect: '/'
        }));

    router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    // the callback after google has authenticated the user
    router.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/about',
            failureRedirect: '/'
        }));

    //User Router
    router.post('/addUser', userController.add);
    router.post('/getallusers', userController.all);
    router.post('/getuserbyid', userController.getById);
    router.delete('/deleteUser', userController.remove);
    router.post('/updateuser', userController.update);
    router.post('/updateprofile', userController.updateprofile);
    router.post('/search', userController.search);
    router.get('/groupmail', userController.sendMulticlientMail);
    router.post('/createuser', userController.createUser);
    router.get('/getTotalNumberOfUser', userController.getTotalNumberOfUser);

    //Post router
    router.post('/alluserPosts', postController.getAllUserPosts);
    router.post('/getonepost', postController.getById);
    router.delete('/deletepost', postController.remove);
    router.post('/updatePost', postController.update);
    router.post('/addpost', postController.add);
    router.post('/likepost', postController.likePost);
    router.post('/dislikepost', postController.disLikePost);
    router.post('/commentpost', postController.commentPost);
    router.post('/ratepost', postController.ratePost);
    router.post('/getavg', postController.getAvgRating);
    router.post('/reportabuse', postController.reportAbuse);
    router.post('/gettimelineposts', postController.getAllTimelinePosts);
    router.post('/searchpost', postController.searchPost);
    router.post('/getfilterposts', postController.getFilteredPosts);
    router.post('/bookmarkpost', postController.bookMarkPost);
    router.post('/removebookmark', postController.removeBookMark);


    //drafts router  
    router.post('/savedraft', postController.saveAsdraft);
    router.post('/getalldrafts', postController.getAllUserDrafts);
    router.post('/updatedraft', postController.updateDraft);
    router.delete('/deletedrafts', postController.deleteMultipleDrafts);
    router.get('/getreports', postController.getAllReports);
    router.delete('/deletereports', postController.deleteReports);

    //Quote router
    router.post('/addquote', quoteController.add);
    router.get('/findrandomquote', quoteController.getRandomQuote);
    router.delete('/removequote', quoteController.remove);
    router.post('/updatequote', quoteController.update);
    router.get('/getquotebyid', quoteController.getById);

    //Favourite router
    router.post('/addfav', favController.add);
    router.delete('/removefav', favController.remove);
    router.post('/updatefav', favController.update);
    router.get('/getfavourites', favController.all);
    router.post('/searchfav', favController.search);
    router.post('/getfavposts', postController.getFavPosts);

    //Birthday router
    router.post('/addbday', bdayController.add);
    router.delete('/removebday', bdayController.remove);
    router.post('/updatebday', bdayController.update);
    router.get('/getbdaybyid', bdayController.getById);
    router.get('/getbday', bdayController.getByDOB);

    //Login router update add findRandom
    router.post('/authenticate', loginController.authenticate);
    router.put('/activate/:token', loginController.activate);

    //profile router 
    router.post('/followuser', profileController.followUser);
    router.post('/withdrawuser', profileController.withdrawUser);
    router.post('/followall', profileController.followAll);

    //category router
    router.post('/addcategory', categoryController.add);
    router.put('/updatecategory', categoryController.update);
    router.delete('/deletecategory', categoryController.remove);
    router.post('/getcategorybyid', categoryController.getById);
    router.get('/getcategories', categoryController.all);

    //feeback router
    router.post('/addfeedback', feedbackController.add);
    router.put('/updatefeedback', feedbackController.update);
    router.delete('/deletefeedback', feedbackController.remove);
    router.post('/getfeedbackbyid', feedbackController.getById);
    router.get('/getfeedback', feedbackController.all);

    router.post('/getnotifications', notificationController.all);
    router.post('/getnotifyoverview', notificationController.overview);

    router.use(function (req, res, next) {
        var token = req.body.token || req.body.query || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, 'jiyawebsite', function (err, decoded) {
                if (err) {
                    res.json({ status: 'error', message: 'Token Invalid' });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.json({ status: 'error', message: "No token provided" });
        }
    });
    router.post('/me', function (req, res) {
        res.send(req.decoded);
    })

    router.post('/addSubject', function (req, res) {
        var subjects = new Subjects();
        console.log("req", req.body);
        subjects.username = req.body.username;
        subjects.science = req.body.science;
        subjects.social = req.body.social;
        subjects.language = req.body.language;
        subjects.maths = req.body.maths;
        subjects.english = req.body.english;

        if (req.body.username == null || req.body.username == "" ||
            req.body.science == null || req.body.science == "" ||
            req.body.social == null || req.body.social == "" ||
            req.body.language == null || req.body.language == "" ||
            req.body.maths == null || req.body.maths == "" ||
            req.body.english == null || req.body.english == "") {
            res.send("Ensure Every Fields are given");
        }
        else {
            subjects.save(function (err) {
                if (err) {
                    res.send("Username or email already exists");
                }
                else {
                    res.send("User created");
                }
            });
        }
    });

    router.get('/getAllUserNames', function (req, res) {
        var usernames = [];
        User.find({}, { username: 1 }, (function (err, data) {
            if (err) {
                res.send("Error :", err);
            }
            else {
                res.send(data);
            }
        }));
    });

    //Posts Routing

    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {
        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            return next();
        // if they aren't redirect them to the home page
        res.redirect('/');
    }

    return router;
}
