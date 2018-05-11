app.controller('draftCtrl',['$scope', '$rootScope','authService','$timeout','$location','$http','CONSTANT',
'profileService','toastr',
function ($scope, $rootScope, authService, $timeout, $location, $http, CONSTANT, profileService, toastr) {
   
    $scope.ids = [];
    $scope.post = {};
    $scope.selectAll = false;
    $scope.getCurrentUser = function(){
        authService.getUser().then(function (data){
                $scope.now_user = data.data.user;
            })
            .then(function(){
                $scope.getUserDrafts($scope.now_user._id);
            })
    }
    $scope.getCurrentUser();

    $scope.getUserDrafts = function (id) {
        profileService.getDrafts(id)
            .then(function (response) {
                $scope.drafts = response.data.post;
                console.log($scope.drafts)
            })
            .catch(function(error){
                toastr.error(error);
            });
    }

    $scope.addDraftToArray = function(checked, id){
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


    $scope.deleteDrafts = function(){
        if($scope.ids.length){
            profileService.deleteDrafts($scope.ids)
            .then(function (response) {
                $scope.getUserDrafts($scope.now_user._id);
            })
            .catch(function(error){
                toastr.error(error);
            });
        }
    }

    $scope.selectAllDrafts = function(checked){
        if(checked){
            $scope.ids = [];
            angular.forEach($scope.drafts, function(element, index){
                $scope.ids.push(element._id);
                $scope.selectAll = true;
            });
        }else{
            $scope.ids = [];
            $scope.selectAll = false;
        }
    }

    

    $scope.viewPost = function(post){
        //$scope.post.postTitle = post.postTitle;
        //$scope.post.postContent = post.postContent;
        $scope.post = post
    }
    
}]) 
