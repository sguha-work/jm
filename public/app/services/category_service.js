app.service('categoryService', function($window, $http, CONSTANT){

    var categoryservice = {};

    categoryservice.addCategory = function(categoryData){
        return $http.post( CONSTANT.API_BASE_URL+'addcategory',categoryData)
        .then(function(data){
            return data;
        }) 
    }

    categoryservice.updateCategory = function(categoryData){
        return $http.put(CONSTANT.API_BASE_URL+'updatecategory',categoryData)
        .then(function(data){
            return data;
        })
    }

    categoryservice.getCategoryById = function(categoryData){
        return $http.post(CONSTANT.API_BASE_URL+'getcategorybyid',categoryData)
        .then(function(data){
            return data;
        })
    }
    categoryservice.deleteCategory = function(categoryData){
        return $http.delete(CONSTANT.API_BASE_URL+'deletecategory',categoryData)
        .then(function(data){
            return data;
        })
    }
})