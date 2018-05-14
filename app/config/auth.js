// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth': {
        'clientID': '122572941785432', // your App ID
        'clientSecret': '785ab03bb568c85724401ad3e801c2b1', // your App Secret
        //'callbackURL'   : 'http://localhost:3200/auth/facebook/callback'
        'callbackURL': 'https://jiyatech.au-syd.mybluemix.net/auth/facebook/callback'

    },

    'twitterAuth': {
        'consumerKey': 'your-consumer-key-here',
        'consumerSecret': 'your-client-secret-here',
        //'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
        'callbackURL': 'https://jiyatech.au-syd.mybluemix.net/auth/twitter/callback'
    },

    'googleAuth': {
        'clientID': '104628895635-v3f65f12tqsnsme0acdceer5q9accrju.apps.googleusercontent.com',
        'clientSecret': 'QluB5WevyUCrSAiVdhf4rHrP',
        //'callbackURL'   : 'http://localhost:3200/auth/google/callback'
        'callbackURL': 'https://jiyatech.au-syd.mybluemix.net/auth/google/callback'
    }

};