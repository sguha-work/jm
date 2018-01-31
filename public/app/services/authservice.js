app.service('authService', function($window, $http, CONSTANT){
    var authservice = {};

    authservice.signup = function(user){
        return $http.post( CONSTANT.API_BASE_URL+'signup',user).then(function(data){
            return data;
        })
    }

    authservice.login = function(loginData){
        return $http.post('/api/authenticate', loginData).then(function(data){
            if(data.data.token){
                $window.localStorage.setItem('token', data.data.token);
            }else{
                $window.localStorage.removeItem('token');
            }
            return data;
         })
    }
    authservice.setToken =function(token){
        if(token){
            $window.localStorage.setItem('token', token);
            return true;
        }else{
            return false;
        }
    }
    authservice.isLoggedIn = function(){
        if($window.localStorage.getItem('token')){
            return true;
        }else{
            return false;
        }
    }

    authservice.logout = function(){
        $window.localStorage.removeItem('token');
         
    } 

    authservice.getUser = function(){
        if($window.localStorage.getItem('token')){
            return $http.post('/api/me');
        }else{
            $q.reject({ message: 'User has no token '});
        }
    }

    //***********************Home Controller Reated Services*******************/

    authservice.getAllUserPosts = function(post) {
        return $http.post(CONSTANT.API_BASE_URL+'alluserPosts',post).then(function(response){
            return response;
        })
    }

    authservice.postStatus = function(post){
        return $http.post(CONSTANT.API_BASE_URL+'addpost', post).then(function(data){
            return data;
        })
    }

 return authservice;
})