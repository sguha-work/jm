app.controller('headerCtrl', ['$scope', '$rootScope','authService',
    function ($scope, $rootScope, authService) {

        var icon_path = "app/view/images/icons/";
        $scope.sideNav_items = [
            { "name": "discover", "image": "discover_n" },
            { "name": "invite", "image": "invite_n" },
            { "name": "writing-competetion", "image": "writing_comp_n" },
            { "name": "profile", "image": "profile_n" },
            { "name": "notification", "image": "notification_n" },
            { "name": "feedback", "image": "feedback_n" },
            { "name": "settings", "image": "settings_n" },
            { "name": "report", "image": "report_n" },
            { "name": "help", "image": "help_n" }
        ]

        $scope.navigateTo = function (_element) {
            if (_element == 'logout') {
                $rootScope.showLoader = true;
                authService.logout();
                $timeout(function () {
                    $location.path('/');
                    $rootScope.showLoader = false;
                    toastr.success('Successfully signed out!');
                }, 1500)
            } else {
                var li = document.getElementById(_element);
                li.childNodes[0].childNodes[0].childNodes[0].childNodes[0].src = icon_path + _element + "_selected.png";
                //remove active class
                var active = document.getElementsByClassName("active");
                active[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].src = icon_path + active[0].id + "_n.png";
                active[0].classList.remove("active");
                console.log(active);
                li.classList.add("active");
            }
        }
        
        
    }]) 
