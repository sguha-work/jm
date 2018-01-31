app.controller('socialCtrl',function($scope, $http, $rootScope, authService, $location, $routeParams){
    if($routeParams){
        if(authService.setToken($routeParams.id)){
            $location.path('/home');
        }else{
            $location.path('/');
        }
    }
    if($location.hash() == '_=_') $location.hash(null);
});
    