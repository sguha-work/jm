app.directive('draft', function () {
    return {
        restrict: 'A',
        replace: true,
        scope: {user: '='},
        templateUrl: "app/view/pages/home/draft.html",
        controller: 'draftCtrl'
    }
});