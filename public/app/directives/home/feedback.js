app.directive('feedback', function () {
    return {
        restrict: 'A', 
        replace: true,
        templateUrl: "app/view/pages/home/feedback.html",
        controller: 'feedbackCtrl'
    }
});