app.factory('AuthInterceptors', function($window){
    var AuthInterceptors = {};

    AuthInterceptors.request = function(config){
        if($window.localStorage.getItem('token')){
            config.headers['x-access-token'] = $window.localStorage.getItem('token');
        }
        return config;
    }

    return AuthInterceptors;
})