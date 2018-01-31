app.controller('activateCtrl',function($scope, $http, toastr, $rootScope, authService, $location, CONSTANT, $routeParams,$timeout){
    if($routeParams){
        $http({
            url: CONSTANT.API_BASE_URL+'activate/'+$routeParams.token,
            method: "PUT"
         })
        .then(function(response) {
           if(!response.data.success){
             toastr.error(response.data.error);
           }else{
            toastr.success("Account activated successfully. Login to continue.."); 
           $timeout(function(){
               $location.path('/');
            },1000)
        }
                
        }, 
        function(response) { // optional
            console.log("some error occured");
        });
    }
    if($location.hash() == '_=_') $location.hash(null);
});
    