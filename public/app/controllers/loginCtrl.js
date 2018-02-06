app.controller('loginCtrl', function ($scope, $rootScope, $http, authService, CONSTANT, toastr, $timeout, $location) {

    $scope.$on('loginEvent', function() {
        alert("login event captured");
    });
    $scope.login = function (userData) {
        // $http({
        //     url: CONSTANT.API_BASE_URL + 'login',
        //     method: "POST",
        //     data: user,
        //     headers: { 'Content-Type': 'application/json' }
        // })
        //     .then(function (response) {
        //         console.log("user data sent");

        //     },
        //     function (response) { // optional
        //         console.log("some error occured");
        //     });
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
        // $http({
        //     url: CONSTANT.API_BASE_URL+'signup',
        //     method: "POST",
        //     data: user,
        //     headers: {'Content-Type': 'application/json'}
        // })
        authService.signup(user)
            .then(function (response) {
                if (response.data.success) {
                    toastr.success('Account Created!');
                    $timeout(function () {
                        $rootScope.showLoader = false;
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

})