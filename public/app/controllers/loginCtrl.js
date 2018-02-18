app.controller('loginCtrl', function ($scope, $rootScope, $http, authService, CONSTANT, toastr, $timeout, $location) {

    $scope.forgetPasswordEmailFieldInvalid = true;
    $scope.$on('loginEvent', function () {
        alert("login event captured");
    });
    $scope.login = function (userData) {
        $rootScope.showLoader = true;
        authService.login(userData)
            .then(function (data) {
                if (data.data.success) {
                    $timeout(function () {
                        // $location.path('/home');
                        $location.path('/page');
                        $rootScope.showLoader = false;
                        toastr.success('Login Successful');
                    }, 1500)

                }
                else {
                    $timeout(function () {
                        $rootScope.showLoader = false;
                        toastr.error(data.data.error);
                    }, 500)
                }
            })
            .catch(function (data) {
                console.log(data)
            })
            .finally(function () {
                //$rootScope.showLoader = false;
            })

    }
    $scope.facebookLogin = function () {
        $http({
            url: CONSTANT.API_BASE_URL + 'auth/facebook',
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
                'Access-Control-Allow-Credentials': true
            }
        })
            .then(function (response) {
                console.log(response);

            },
                function (response) { // optional
                    console.log("some error occured");
                });

    }

    $scope.googleLogin = function () {
        $http({
            url: CONSTANT.API_BASE_URL + 'auth/google',
            method: "GET"
        })
            .then(function (response) {
                console.log(response);

            },
                function (response) { // optional
                    console.log("some error occured");
                });

    }

    $scope.signup = function (user) {
        $rootScope.showLoader = true;
        authService.signup(user)
            .then(function (response) {
                if (response.data.success) {
                    toastr.success('Account Created! Please check "' + user.email + '" and activate your profile');
                    $rootScope.showLoader = false;
                    $timeout(function () {

                        $location.path('/');
                    }, 100)
                } else {
                    $rootScope.showLoader = false;
                    toastr.error(response.data.error);
                }

            },
                function (response) { // optional
                    console.log("some error occured");
                });

    }

    $scope.checkValue = (function () {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regex.test(String($scope.forgetPasswordEmail).toLowerCase())) {
            $scope.forgetPasswordEmailFieldVerificationError = "";
            $scope.forgetPasswordEmailFieldInvalid = false;
            // need to check wheather the email exists in db
        } else {
            $scope.forgetPasswordEmailFieldVerificationError = "Given email id is not valid";
            $scope.forgetPasswordEmailFieldInvalid = true;
        }
    });

    $scope.showModal = (function () {
        $("#myModal").modal();
    });

    $scope.sendPassword = (function(event) {
        var email = $scope.forgetPasswordEmail;
        $(".modal-header button").trigger("click");
        event.preventDefault();
        authService.getAndSendPasswordAsEmail(email).then(function () {
            toaster.success("Please check "+email+" for the password recovery option");
        }, function() {
            toastr.error("Unable to fetch password of this email");
        });
    });

})