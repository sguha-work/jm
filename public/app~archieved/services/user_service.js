app.service('userRegService', function ($window, $http, CONSTANT) {

    var userservice = {};

    userservice.regUser = function (user) {
        return $http.post(CONSTANT.API_BASE_URL + 'addUser', user).then(function (data) {
            return data;
        })
    }

    userservice.getUser = function () {
        return $http.get(CONSTANT.API_BASE_URL + 'getAllUser').then(function (data) {

            return data;
        })
    }

    userservice.getTotalNumberOfUser = (function () {
        return $http.get(CONSTANT.API_BASE_URL + 'getTotalNumberOfUser').then(function (data) {
            return data;
        })
    });

    userservice.getRandomProfiles = (function () {
        return $http.get(CONSTANT.API_BASE_URL + 'getRandomProfiles').then(function (data) {
            return data;
        })
    });

    return userservice;
})