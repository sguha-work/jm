module.exports = {
    'errors':{
        'user_exists'     :{
            "success" : false,
            "error"   : "User Already Exists"
        }, 
        'user_not_found'  :{
            "success" : false,
            "error"   : "User not found"
        },
        'required_missing': {
            "success" : false,
            "error"   : "Ensure Every Fields are given"
        },
        'technical':{
            "success" : false,
            "error"   : "Technical Error Occured"
        },
        'invalid_password'  :{
            "success" : false,
            "error"   : "Invalid Password"
        }, 
        'user_inactive'  :{
            "success" : false,
            "error"   : "Account not activated.Please check your email for activation link"
        },
        'link_expired'  :{
            "success" : false,
            "error"   : "Activation Link Expired"
        }
       
    },
    'success':{ 
        'user_created' :{
            "success" : true,
            "message" : "User Successfully created"
        },
        'user_auth' :{
            "success" : true,
            "message" : "User Authenticated"
        },
        'category_created' :{
            "success" : true,
            "message" : "Category Successfully created"
        },
        'message_created' :{
            "success" : true,
            "message" : "Welcome Message Successfully created"
        },
        'feedback_created' :{
            "success" : true,
            "message" : "Feedback Successfully created"
        },
        'content_created' :{
            "success" : true,
            "message" : "Content Type Successfully created"
        }
    }
};   
    
    