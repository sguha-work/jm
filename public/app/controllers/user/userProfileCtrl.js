app.controller('userProfileCtrl', ['$scope', 'CONSTANT', '$http',
    '$routeParams', 'authService',
    '$rootScope', '$location', '$timeout', 'toastr',
    function ($scope, CONSTANT, $http, $routeParams, authService, $rootScope, $location, $timeout,
        toastr) {

        $scope.profile = {};
        $scope.profile.email = $rootScope.current_user.email;
        $scope.selectedFrnds = [];
        $scope.following = [];
        $scope.selectedTopic = [];
        $scope.profile.privacyPolicy = "public";

        var checkAndReplaceForInvalidImage = (function (userObject) {
            var s = document.createElement("IMG");
            s.src = userObject.profilePic
            $("img[src='" + userObject.profilePic + "']").hide();
            s.onerror = function () {
                console.log("file with " + userObject.profilePic + " invalid");
                userObject.profilePic = null;
                $("img[src='" + userObject.profilePic + "']").show();
            }
            s.onload = function () {
                $("img[src='" + userObject.profilePic + "']").show();

            }
        });

        var getUserProfileById = function (id) {
            $http({
                url: CONSTANT.API_BASE_URL + 'getUserById',
                method: "POST",
                data: { id: id },
                headers: { 'Content-Type': 'application/json' }
            })
                .then(function (response) {
                    console.log(response);
                    $scope.userProfile = response.data[0];
                    if ($scope.userProfile.profilePic.indexOf("/") !== -1 && $scope.userProfile.profilePic.indexOf("http://") === -1 && $scope.userProfile.profilePic.indexOf("https://") === -1) {
                        var pic = "app/view/images/profile_pictures/" + $scope.userProfile.profilePic.split("/").pop();
                        $scope.userProfile.profilePic = pic;
                    }
                    checkAndReplaceForInvalidImage($scope.userProfile);
                },
                    function (response) { // optional
                        console.log(response);
                    });

        }

        getUserProfileById($routeParams.id);



    }])
