app.controller('feedbackCtrl',['$scope', '$http', 'CONSTANT','feedbackService','$rootScope','toastr', '$timeout',
function($scope, $http, CONSTANT,feedbackService,$rootScope,toastr,$timeout){


    $scope.feedback = {};
    $scope.feedback.userId = $rootScope.current_user._id;

    
        $scope.addFeedback = function(feedback){
            feedbackService.addFeedback(feedback)
            .then(function(response) {
                if(response.data.success){
                    $scope.feedback = response.data;
                    toastr.success(response.data.message);
                    $timeout(function(){
                        $rootScope.showLoader = false;
                      //  $location.path('/');
                    }, 100)
                }else{
                    $rootScope.showLoader = false;
                    toastr.error(response.data.error);
                }
                
        }, 
        function(response) { // optional
            console.log("some error occured");
        });
        }
    

        
       $scope.updateFeedback = function(feedbackData){
        feedbackService.updateFeedback(feedbackData)
         .then(function(response){
            if(response.data.success){
                toastr.success('Feedback Updated!');
                $timeout(function(){
                    $rootScope.showLoader = false;
                  //  $location.path('/');
                }, 100)
            }else{
                $rootScope.showLoader = false;
                toastr.error(response.data.error);
            }
            
    }, 
    function(response) { // optional
        console.log("some error occured");
    });   
          
        }
    
        $scope.removeFeedback =  function(feedbackData){
            feedbackService.deleteFeedback(feedbackData) 
            .then(function(response){
                if(response.data.success){
    
                }else{
               
            }
            });
        }    
        
        $scope.getById =  function(feedbackData){
            feedbackService.getFeedbackById(feedbackData) 
            .then(function(response){
                if(response.data.success){
    
                }else {
    
                }
            });
         }   
         
           
    }])