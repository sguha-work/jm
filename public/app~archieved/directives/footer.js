app.directive('footer', function () {
    return {
        restrict: 'A', 
        replace: true,
        templateUrl: "app/view/pages/home/footer.html",
        controller: 'footerCtrl'
    }
});