app.controller('categoryCtrl',function($scope, $http, CONSTANT,categoryService){

    $scope.addCateory = function(categoryData){
        categoryService.addCategory(categoryData)
        .then(function(response) {
            if(response.data.success){
                toastr.success('Category Created!');
                $timeout(function(){
                    $rootScope.showLoader = false;
                  //  $location.path('/');
                }, 100)
            }else{
                $rootScope.showLoader = false;
                toastr.error(response.data.error);
            }
            
    }, 
    function(response) { // optional
        console.log("some error occured");
    });
    }

   $scope.updateCategory = function(categoryData){
     categoryService.updateCategory(categoryData)
     .then(function(response){
        if(response.data.success){
            toastr.success('Category Updated!');
            $timeout(function(){
                $rootScope.showLoader = false;
              //  $location.path('/');
            }, 100)
        }else{
            $rootScope.showLoader = false;
            toastr.error(response.data.error);
        }
        
}, 
function(response) { // optional
    console.log("some error occured");
});   
      
    }

    $scope.removeCategory =  function(categoryData){
        categoryService.deleteCategory(categoryData) 
        .then(function(response){
            if(response.data.success){

            }else{
           
        }
        });
    }    
    
    $scope.getById =  function(categoryData){
        categoryService.getCategoryById(categoryData) 
        .then(function(response){
            if(response.data.success){

            }else {

            }
        });
     }   
     
     $scope.findAll =  function(){
        
     }    
})