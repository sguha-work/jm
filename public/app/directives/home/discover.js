app.directive('discover', function () {
    return {
        restrict: 'A', 
        replace: true,
        templateUrl: "app/view/pages/home/discover.html",
        controller: 'discoverCtrl'
    }
});