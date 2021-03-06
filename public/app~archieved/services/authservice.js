app.service('authService', function ($window, $http, CONSTANT) {
    var authservice = {};

    authservice.signup = function (user) {
        return $http.post(CONSTANT.API_BASE_URL + 'signup', user).then(function (data) {
            return data;
        })
    }

    /**
     * call the api to receive password receive otp via mail
     */
    authservice.sendPasswordResetOTP = (function (email) {
        return new Promise(function (resolve, reject) {
            $http.post(CONSTANT.API_BASE_URL + 'sendResetPasswordOTP', { "email": email }).then(function () {
                // mail sent
                resolve();
            }, function () {
                // mail send error
                reject();
            });
        });
    });

    authservice.resetPassword = (function (email, otp, password) {
        return new Promise(function (resolve, reject) {
            $http.post(CONSTANT.API_BASE_URL + 'resetpassword', { "email": email, "otp": otp, "password": password }).then(function (response) {
                resolve(response);
            }, function (error) {
                reject(error);
            });
        });
    });

    authservice.login = function (loginData) {
        return $http.post('/api/authenticate', loginData).then(function (data) {
            if (data.data.token) {
                $window.localStorage.setItem('token', data.data.token);
            } else {
                $window.localStorage.removeItem('token');
            }
            return data;
        })
    }
    authservice.setToken = function (token) {
        if (token) {
            $window.localStorage.setItem('token', token);
            return true;
        } else {
            return false;
        }
    }
    authservice.isLoggedIn = function () {
        if ($window.localStorage.getItem('token') == "null" || $window.localStorage.getItem('token') == null) {
            return false;
        } else {
            return true;
        }
    }

    authservice.logout = function () {
        $window.localStorage.removeItem('token');

    }

    authservice.getUser = function () {
        if ($window.localStorage.getItem('token')) {
            return $http.post('/api/me');
        } else {
            $q.reject({ message: 'User has no token ' });
        }
    }

    //***********************Home Controller Reated Services*******************/

    // authservice.getAllUserPosts = function (post) {
    //     return $http.post(CONSTANT.API_BASE_URL + 'alluserPosts', post).then(function (response) {
    //         return response;
    //     })
    // }

    authservice.postStatus = function (post) {
        return $http.post(CONSTANT.API_BASE_URL + 'addpost', post).then(function (data) {
            return data;
        })
    }

    return authservice;
})