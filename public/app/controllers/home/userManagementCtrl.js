app.controller('userManagementCtrl',['$scope', 'authService','$timeout','$location','$http','CONSTANT',
'homePageService','toastr',
function ($scope, authService, $timeout, $location, $http, CONSTANT, homePageService, toastr) {
   

    //$scope.example8model = [];
    
    // $scope.example8data = [ {featureContent: true, label: "featureContent"}, 
    //                         {deleteUser: true, label: "deleteUser"}, 
    //                       ];
    // $scope.example8settings = { checkBoxes: true };
    $scope.sample=["featuredContent","deleteUser"];
//     $scope.user={};
// $scope.user.featureList=[];
    // $scope.vegetables = [ label: "featureContent"}, 
    //                         {deleteUser: true, label: "deleteUser"}, 
    //                       ];

//     $scope.extraSettings = {
//     externalIdProp: ''
//   };
    $scope.user_data = {};
    $scope.users = [];
    $scope.getCurrentUser = function(){
        authService.getUser().then(function (data){
                $scope.now_user = data.data.user;
            })
            .then(function(){
                $scope.getUsers();
            })
    }
    
    $scope.getCurrentUser();
    
    $scope.getUsers = function(){
        $scope.users = [];
        homePageService.getUsers()
        .then(function(response) {
            if(response.data){
                
                    angular.forEach(response.data, function(element, i){
                        if(element.featureList == undefined){
                            element.featureList=[];
                            $scope.users.push(element);
                        }else{
                            $scope.users.push(element);
                        }
                            console.log($scope.users);
                    });
              //$scope.users = response.data;
            }
        })
        .catch(function (error) {
          console.log(error);
        })
    
     }
    
    // $scope.$watch('featureList',function(){
    //         $scope.getFriendlistDetails();
    //     });

    $scope.edit_user =function(user){
        user.editUser = true;
        user.showUpdate = true;
        user.disFeature = true;
      }
  
     $scope.update_user = function(user){
      homePageService.update_user(user)
      .then(function(response) {
          if(response.status == 200){
            $scope.getUsers();
          }
      })
      .catch(function (error) {
        console.log(error);
      })
     }

     $scope.deleteUser = function(user){
            $http({
                method: 'DELETE',
                url: CONSTANT.API_BASE_URL+'deleteUser',
                data: {
                    id: user._id
                },
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            })
            .then(function(response) {
                $scope.getUsers();
                console.log(response.data);
            }, function(rejection) {
                console.log(rejection.data);
            });
        }

        $scope.createUser = function(user){
            if($scope.now_user.role == "super_admin"){
                homePageService.createUser(user)
                .then(function(response) {
                    if(response.status == 200){
                      $scope.getUsers();
                    }
                })
                .catch(function (error) {
                  console.log(error);
                })
               }else{
                   toastr.error("permission Denied");
               }
            }

            $scope.disableUser = function(id){
                if($scope.now_user.role == "super_admin"){
                    homePageService.disableUser({"id":id})
                    .then(function(response) {
                        if(response.status == 200){
                          $scope.getUsers();
                        }
                    })
                    .catch(function (error) {
                      console.log(error);
                    })
                   }else{
                       toastr.error("permission Denied");
                   }
                }
            
                $scope.enableUser = function(id){
                    if($scope.now_user.role == "super_admin"){
                        homePageService.enableUser({"id":id})
                        .then(function(response) {
                            if(response.status == 200){
                              $scope.getUsers();
                            }
                        })
                        .catch(function (error) {
                          console.log(error);
                        })
                       }else{
                           toastr.error("permission Denied");
                       }
                    }
            
}]) 
