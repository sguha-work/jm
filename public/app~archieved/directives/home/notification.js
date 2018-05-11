app.directive('notification', function () {
    return {
        restrict: 'A', 
        replace: true,
        templateUrl: "app/view/pages/home/notification.html",
        controller: 'notificationCtrl'
    }
});