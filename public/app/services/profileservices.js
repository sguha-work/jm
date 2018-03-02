app.service('profileService', function($window, $http,CONSTANT){
    
        var profileservice = {};
    
        profileservice.getUserById = function(id){
          return $http({
                url: CONSTANT.API_BASE_URL + 'getuserbyid',
                method: "POST",
                data: { id: id },
                headers: { 'Content-Type': 'application/json' }
            }).then(function(data){
                return data;
            })
        }

        profileservice.updateUser = (function(user) {
            return $http({
                url: CONSTANT.API_BASE_URL + 'updateuser',
                method: "POST",
                data: user,
                headers: { 'Content-Type': 'application/json' }
            }).then(function(data){
                return data;
            });
        });

        profileservice.getUserRating = function(id){
            return $http({
                url: CONSTANT.API_BASE_URL + 'getavg',
                method: "POST",
                data: { id: id },
                headers: { 'Content-Type': 'application/json' }
              }).then(function(data){
                  return data;
              })
          }

          profileservice.getDrafts = function(id){
            return $http({
                url: CONSTANT.API_BASE_URL + 'getalldrafts',
                method: "POST",
                data: { id: id },
                headers: { 'Content-Type': 'application/json' }
              }).then(function(data){
                  return data;
              })
          }

          profileservice.deleteDrafts = function(id_array){
            return $http({
                url: CONSTANT.API_BASE_URL + 'deletedrafts',
                method: "DELETE",
                data: { "ids": id_array },
                headers: { 'Content-Type': 'application/json' }
              }).then(function(data){
                  return data;
              })
          }
          
        return profileservice;
    
    })