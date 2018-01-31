app.directive('viewprofile', function () {
    return {
        restrict: 'A', 
        replace: true,
        templateUrl: "app/view/pages/home/viewprofile.html",
        controller: 'editProfileCtrl'
    }
});