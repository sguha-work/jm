app.service('feedbackService', function($window, $http, CONSTANT){
    
        var feedbackservice = {};
    
        feedbackservice.addFeedback = function(feedbackData){
            return $http.post( CONSTANT.API_BASE_URL+'addfeedback',feedbackData)
            .then(function(data){
                return data;
            }) 
        }
    
        feedbackservice.updateFeedback = function(feedbackData){
            return $http.put(CONSTANT.API_BASE_URL+'updatefeedback',feedbackData)
            .then(function(data){
                return data;
            })
        }
    
        feedbackservice.getFeedbackById = function(feedbackData){
            return $http.post(CONSTANT.API_BASE_URL+'getfeedbackbyid',feedbackData)
            .then(function(data){
                return data;
            })
        }
        
        feedbackservice.deleteFeedback = function(ids){
            return $http({
                url: CONSTANT.API_BASE_URL + 'deletefeedback',
                method: "DELETE",
                data: { "ids": ids },
                headers: { 'Content-Type': 'application/json' }
              }).then(function(data){
                  return data;
              })
        }

        feedbackservice.getfeedback = function(){
            return $http.get(CONSTANT.API_BASE_URL+'getfeedback').then(function(data){
                return data;
            })
        }

        return feedbackservice;
    })