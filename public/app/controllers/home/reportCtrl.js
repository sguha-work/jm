app.controller('reportCtrl',['$scope', '$rootScope','authService','$timeout','$location','$http','CONSTANT','authService','homePageService','toastr','feedbackService',
function ($scope, $rootScope, authService, $timeout, $location, $http, CONSTANT, authService, homePageService, toastr,feedbackService) {
   
    $scope.reports = [];
    $scope.ids = [];
    $scope.selectAll = false;
    $scope.post = {};
    $scope.feedbackList = [];
    $scope.feedbackIds = [];



    $scope.getCurrentUser = function(){
        authService.getUser().then(function (data){
                $scope.now_user = data.data.user;
            })
            .then(function(){
                $scope.getAllReports();
            })
    }
    $scope.getCurrentUser();


    $scope.getAllReports = function(){
        homePageService.getReports()
        .then(function(response){
            $scope.reports = response.data.data;
            console.log($scope.reports);
        })
        .catch(function(err){
            console.log(err);
        })
    }
    $scope.getAllReports();

    $scope.addReportToArray = function(checked, id){
        if(checked){
            $scope.ids.push(id);
        }else{
            angular.forEach($scope.ids, function(element, index){
                if(element == id){
                    $scope.ids.splice(index,1);
                }
           });
        }
    }

    $scope.deleteReports = function(){
        if($scope.ids.length){
            homePageService.deleteReports($scope.ids)
            .then(function (response) {
                $scope.getAllReports();
            })
            .catch(function(error){
                toastr.error(error);
            });
        }
    }

    $scope.selectAllReports = function(){
        $scope.ids = [];
        angular.forEach($scope.reports, function(element, index){
            $scope.ids.push(element._id);
            $scope.selectAll = true;
        });
    }

    $scope.unSelectAllReports = function(){
        $scope.ids = [];
        $scope.selectAll = false;
    }

    $scope.viewPost = function(post){
        $scope.post.postTitle = post.postTitle;
        $scope.post.postContent = post.postContent;
      }

      $scope.getAllFeedback = function(){
        feedbackService.getfeedback()
        .then(function(response){
            $scope.feedbackList = response.data.data;
            // console.log($scope.feedbackList);
        })
        .catch(function(err){
            console.log(err);
        })
    }
    $scope.getAllFeedback(); 
    
    $scope.addFeedbackToArray = function(checked, id){
        if(checked){
            $scope.feedbackIds.push(id);
        }else{
            angular.forEach($scope.feedbackIds, function(element, index){
                if(element == id){
                    $scope.feedbackIds.splice(index,1);
                }
           });
        }
    }

    $scope.deleteFeedback = function(){
        if($scope.feedbackIds.length){
            feedbackService.deleteFeedback($scope.feedbackIds)
            .then(function (response) {
                $scope.getAllFeedback();
            })
            .catch(function(error){
                toastr.error(error);
            });
        }
    }

    $scope.selectAllFeedback = function(){
        $scope.feedbackIds = [];
        angular.forEach($scope.feedbackList, function(element, index){
            $scope.feedbackIds.push(element._id);
            $scope.selectAll1 = true;
        });
    }

    $scope.unSelectAllFeedback = function(){
        $scope.feedbackIds = [];
        $scope.selectAll1 = false;
    }


}]) 
