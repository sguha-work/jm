app.directive('homepage', function () {
    return {
        restrict: 'A',
        replace: true,
        scope: {user: '='},
        templateUrl: "app/view/pages/home/homepage.html",
        controller: 'homepageCtrl'
    }
});