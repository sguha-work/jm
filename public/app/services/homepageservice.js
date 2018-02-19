app.service('homePageService', function($window, $http,CONSTANT){
    
        var homepageservice = {};
        
        homepageservice.getAllUserPosts = function(post){
            return $http.post(CONSTANT.API_BASE_URL+'gettimelineposts', post).then(function(data){
                return data;
            })
        }

        homepageservice.getparticularPost = function(post){
            return $http.post(CONSTANT.API_BASE_URL+'getonepost', post).then(function(data){
                return data;
            })
        }
        
        homepageservice.postComment = function(post){
            return $http.post(CONSTANT.API_BASE_URL + 'commentpost', post).then(function(data){
                return data;
            })
        }

        homepageservice.getRatings = function(post){
            return $http.post(CONSTANT.API_BASE_URL + 'ratepost', post).then(function(data){
                return data;
            })
        }

        homepageservice.getRatings = function(post){
            return $http.post(CONSTANT.API_BASE_URL + 'ratepost', post).then(function(data){
                return data;
            })
        }

        homepageservice.removePost = function(postId){
            return $http({
                method: 'DELETE',
                url: CONSTANT.API_BASE_URL+'deletepost',
                data: { id: postId },
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            }).then(function(data){
                return data;
            });
        }

        homepageservice.submitReport = function(post){
            return $http.post(CONSTANT.API_BASE_URL + 'reportabuse', post).then(function(data){
                return data;
            })
        }


        homepageservice.getUsers = function(){
            return $http({
                url: CONSTANT.API_BASE_URL+'getallusers',
                method: "POST",
                data: { "token": $window.localStorage.getItem('token') },
                headers: {'Content-Type': 'application/json'}
            }).then(function(data){
                return data;
            })
        }

        homepageservice.update_user = function(user){
            return  $http({
                url: CONSTANT.API_BASE_URL+'updateuser',
                method: "POST",
                data : user,
                headers: {'Content-Type': 'application/json'}
            }).then(function(data){
                return data;
            })
        }

        homepageservice.getFavourites = function(){
            return $http({
                url: CONSTANT.API_BASE_URL + 'getTopics',
                method: "GET",
            }).then(function(data){
                return data;
            })
        }
        
        homepageservice.getRandomQuote = function(){
            return  $http({
                url: CONSTANT.API_BASE_URL + 'findrandomquote',
                method: "GET",
            }).then(function(data){
                return data;
            })
        }

        homepageservice.saveAsDraft = function(post){
            return $http.post(CONSTANT.API_BASE_URL+'savedraft', post).then(function(data){
                return data;
            })
        }

        homepageservice.getFilteredPosts = function(category){
            return $http.post(CONSTANT.API_BASE_URL+'getfilterposts', category).then(function(data){
                return data;
            })
        }
        
        homepageservice.getReports = function(){
            return $http.get(CONSTANT.API_BASE_URL+'getreports').then(function(data){
                return data;
            })
        }
        
        homepageservice.deleteReports = function(ids){
            return $http({
                url: CONSTANT.API_BASE_URL + 'deletereports',
                method: "DELETE",
                data: { "ids": ids },
                headers: { 'Content-Type': 'application/json' }
              }).then(function(data){
                  return data;
              })
        }

        homepageservice.saveBookMark = function(post){
            return $http.post(CONSTANT.API_BASE_URL+'bookmarkpost', post).then(function(data){
                return data;
            })
        }

        homepageservice.removeBookMark = function(post){
            return $http.post(CONSTANT.API_BASE_URL+'removebookmark', post).then(function(data){
                return data;
            })
        }

        homepageservice.createUser = function(user){
            return $http.post(CONSTANT.API_BASE_URL+'createuser', user).then(function(data){
                return data;
            })
        }

        homepageservice.disableUser = function(id_obj){
            return $http.post(CONSTANT.API_BASE_URL+'disableuser', id_obj).then(function(data){
                return data;
            })
        }

        homepageservice.enableUser = function(id_obj){
            return $http.post(CONSTANT.API_BASE_URL+'enableuser', id_obj).then(function(data){
                return data;
            })
        }

        homepageservice.getFavouritePosts = function(fav_content_List){
            var fav_list = [];
            
            angular.forEach(fav_content_List, function(value, key){
                fav_list.push(value.favourite);
             });

             return $http.post(CONSTANT.API_BASE_URL+'getfavposts', { "fav" : fav_list }).then(function(data){
                return data;
            });
        }
        

        homepageservice.getAllNotifications = function(id_obj){
            return $http.post(CONSTANT.API_BASE_URL+'getnotifications', id_obj).then(function(data){
                return data;
            });
        }

        
       return homepageservice;
        
    })