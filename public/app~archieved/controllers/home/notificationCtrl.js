app.controller('notificationCtrl',['$scope', '$http', 'CONSTANT','$rootScope','toastr', '$timeout', 'homePageService',
function($scope, $http, CONSTANT,$rootScope,toastr,$timeout, homePageService){

    $scope.notifications = [];
    $scope.postsArray = [];
    $scope.showNotifications = true;
    var getRelativePath = function(path){
        var index = path.indexOf('app');
        return path.substring(index);
    }
    
    $scope.getAllNotifications = function(){
        homePageService.getAllNotifications({"userId" : $rootScope.current_user._id })
        .then(function(response){
            angular.forEach(response.data.lists, function(element, index){
                element.userDetail.profilePic = getRelativePath(element.userDetail.profilePic);
            });
            $scope.notifications = response.data.lists;
        })
        .catch(function(reject){
            console.log(reject);
        })
    }();

    $scope.getPostDetails = function(id){
        homePageService.getparticularPost({"id":id})
        .then(function(response){
            $scope.postsArray = response.data.data;
            $scope.showNotifications = false;
        })
        .catch(function(reject){
            console.log(reject);
        })
    }

    $scope.viewNotifications = function(){
        $scope.showNotifications = true;
    }

}])