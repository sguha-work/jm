app.directive('report', function () {
    return {
        restrict: 'A',
        replace: true,
        scope: {user: '='},
        templateUrl: "app/view/pages/home/report.html",
        controller: 'reportCtrl'
    }
});