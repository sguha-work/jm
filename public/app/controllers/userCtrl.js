app.controller('regCtrl',function($scope, $http, CONSTANT,userRegService){
    
$scope.$on('$viewContentLoaded', function() {
    $scope.getUser();  
    });

$scope.regUser = function(user){
    userRegService.regUser(user)
        .then(function(data){
            if(data.data.success){
                $timeout(function(){
                    //$location.path('/home');
                    //$rootScope.showLoader = false;
                    //toastr.success('Login Successful');
                },1500)
                
            }
            else{
                $timeout(function(){
                   // $rootScope.showLoader = false;
                    toastr.error(data.data.error);
                },500)
            }
        })
        .catch(function(data){
            console.log(data)
        })
        .finally(function(){
            //$rootScope.showLoader = false;
        })
    }

// $scope.regUser = function(user){
//     userRegService.getUser(user,function(response){
//         if(response.data){

//         }
//     })
    // $http({
    //     url: CONSTANT.API_BASE_URL+'addUser',
    //     method: "POST",
    //     data: user,
    //     headers: {'Content-Type': 'application/json'}
    // })
    // .then(function(response) {
    //         console.log("user data sent");
    //         $scope.getUser();
    // }, 
    // function(response) { // optional
    //     console.log("some error occured");
    // });

//}

$scope.getUser = function(){

    // $http({
    //     url: CONSTANT.API_BASE_URL+'getAllUser',
    //     method: "GET"
    //     //headers: {'Content-Type': 'application/json'}
    // })
    userRegService.getUser(function(response){
        if(response.data){
            $scope.usersValues = response.data;  
        
        }
    })
    // .then(function(response) {
    //     if(response.data){
    //         $scope.usersValues = response.data; 
    //     }
    //         console.log("Data Received");
    // }, 
    // function(response) { // optional
    //     console.log("some error occured");
    // });

} 

$scope.deleteUser = function(id){

    $http({
        method: 'DELETE',
        url: CONSTANT.API_BASE_URL+'deleteUser',
        data: {
            id: id
        },
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        }
    })
    .then(function(response) {
        $scope.getUser();
        console.log(response.data);
    }, function(rejection) {
        console.log(rejection.data);
    });
}

$scope.getUserById = function(id){
    
        $http({
            url: CONSTANT.API_BASE_URL+'getUserById',
            method: "POST",
            data:{ id: id },
            headers: {'Content-Type': 'application/json'}
        })
        .then(function(response) {
            if(response.data){
                $scope.user = response.data[0]; 
                $scope.user.password = "";
            }
                console.log("Data Received");
        }, 
        function(response) { // optional
            console.log("some error occured");
        });
    
    } 


$scope.updateUser = function(user){
        
            $http({
                url: CONSTANT.API_BASE_URL+'updateUser',
                method: "POST",
                data:user,
                headers: {'Content-Type': 'application/json'}
            })
            .then(function(response) {
                if(response.data){
                    $scope.user={}; 
                    $scope.getUser();
                }
            }, 
            function(response) { // optional
                console.log("some error occured");
            });
        
        } 
$scope.search = function(searchText){
    var username = {
        "username": searchText
    }
    $http({
        url: CONSTANT.API_BASE_URL+'search',
        method: "POST",
        data:username,
        headers: {'Content-Type': 'application/json'}
    })
    .then(function(response) {
        if(response.data){
            console.log(response.data);
        }
    }, 
    function(response) { // optional
        console.log("some error occured");
    });

} 
    

})

