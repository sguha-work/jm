app.controller('pageCtrl',['$scope', '$rootScope','authService','$timeout','$location','$http','CONSTANT',
function ($scope, $rootScope, authService, $timeout, $location, $http, CONSTANT) {
    if($rootScope.current_user.role == 'admin' || $rootScope.current_user.role == 'super_admin'){
        $scope.showUserManagement = true;
    }else{
        $scope.showUserManagement = false;
    }
    var icon_path = "app/view/images/icons/";
    var page_path = 'app/view/pages/home/';
    $scope.load_path = page_path+'homepage.html';
    $rootScope.showPage = 'home';
    $scope.sideNav_items = [
        { "name":"discover", "image":"discover_n" },
        { "name":"invite", "image":"invite_n" },
        { "name":"writing-competetion", "image":"writing_comp_n" },
        { "name":"profile", "image":"profile_n" },
        { "name":"notification", "image":"notification_n" },
        { "name":"feedback", "image":"feedback_n" },
        { "name":"settings", "image":"settings_n" },
        { "name":"report", "image":"report_n" },
        { "name":"help", "image":"help_n" }
    ]
    
    $scope.navigateTo = function (_element) {
        if (_element == 'logout') {
            $rootScope.showLoader = true;
            authService.logout();
            $timeout(function () {
                $location.path('/');
                $rootScope.showLoader = false;
                toastr.success('Successfully signed out!');
            }, 1500)
        } 
        // else if(_element == 'profile'){
        //     $location.path("/editprofile/"+$rootScope.current_user._id);
        // }
        else{
        $rootScope.showPage = _element;
        //add active class
        var li = document.getElementById(_element);
        li.childNodes[0].childNodes[0].childNodes[0].childNodes[0].src = icon_path + _element + "_selected.png";
        $scope.load_path = 'app/view/pages/home/discover.html'; 
        //remove active class
        var active = document.getElementsByClassName("active");
        active[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].src = icon_path + active[0].id + "_n.png";
        active[0].classList.remove("active");
        li.classList.add("active");
        }
        
    }
    $scope.searchPost = function(text){
        $http({
            method: 'POST',
            url: CONSTANT.API_BASE_URL+'searchpost',
            data: { searchText: text },
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            }
        })
        .then(function(response) {
            console.log(response.data);
            $rootScope.$broadcast('search_data', response.data);
        }, function(rejection) {
            console.log(rejection.data);
        });
    } 


    $scope.getPartial = function (el) {
        if(el){
            return 'app/view/pages/home/'+el+'.html';
        }else{
            return 'app/view/pages/home/homepage.html';
        }
        
    }
    $scope.viewNotifications = function(){
        $scope.notifications = 0;
    }

    var getNotifications = function(){
        $http({
            method: 'POST',
            url: CONSTANT.API_BASE_URL+'getnotifyoverview',
            data: {  "userId" : $rootScope.current_user._id  },
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            }
        })
        .then(function(response) {
            console.log(response.data);
            $scope.notifications = response.data.notifications;
        }, function(rejection) {
            console.log(rejection.data);
        });
    }();
}]) 
