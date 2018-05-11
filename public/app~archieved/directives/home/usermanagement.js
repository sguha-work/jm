app.directive('usermanagement', function () {
    return {
        restrict: 'A',
        replace: true,
        scope: {user: '='},
        templateUrl: "app/view/pages/home/usermanagement.html",
        controller: 'userManagementCtrl'
    }
});