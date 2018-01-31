app.directive('header', function () {
    return {
        restrict: 'A',
        replace: true,
        scope: {user: '='},
        templateUrl: "app/view/pages/home/header.html",
        controller: 'pageCtrl'
    }
});