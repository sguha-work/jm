app.service('userRegService', function($window, $http,CONSTANT){

    var userservice = {};

    userservice.regUser = function(user){
        return $http.post(CONSTANT.API_BASE_URL+'addUser',user).then(function(data){
            return data;
        })
    }
    
    userservice.getUser = function(){
        return  $http.get(CONSTANT.API_BASE_URL+'getAllUser').then(function(data){
           
            return data;
         })
    }

})