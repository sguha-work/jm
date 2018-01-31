app.controller('mainCtrl', function($http, authService, $location, Facebook,$rootScope, $scope, $timeout, $location, toastr, $window,CONSTANT, $routeParams){
   
    $rootScope.showLoader = false;
    var current_user = {};
    var getRelativePath = function(path){
        var index = path.indexOf('app');
        return path.substring(index);
    }
    $rootScope.$on('$routeChangeStart', function(){
        if(authService.isLoggedIn()){
            authService.getUser().then(function (data){
                $rootScope.current_user = data.data.user;
                if($rootScope.current_user.profilePic!="" &&$rootScope.current_user.profilePic != null){
                    $rootScope.current_user.profilePic = getRelativePath($rootScope.current_user.profilePic);
                }
                if($rootScope.current_user.isNewUser){
                    $location.path('/profile');
                }
            });
        }
       
        if($location.hash() == '_=_') $location.hash(null);
       
    })

    function load(){  
        gapi.client.setApiKey('AIzaSyBDG-DcihR3EOETBJCkBjivZO2tA_33bN4');  
        }  
        window.onload = load;

    $scope.getFriendlistDetails = function(){
        if($rootScope.current_user){
        if($rootScope.current_user.facebook.length>0){
            $rootScope.current_user.facebook[0].friends.forEach(function(element) {
                Facebook.api('/'+element.id+'?fields=picture&&access_token='+$rootScope.current_user.fb_acc_token, function(response) {
                    element.picture = response.picture.data.url;
                });  
            }, this);
            
        }else if($rootScope.current_user.google.length>0){
          //  gapi.load()
            // $rootScope.current_user.google.forEach(function(element) {
                // $http({
                //     url: 'https://www.google.com/m8/feeds/contacts/default/full?max-results=999999&alt=json&oauth_token='+$rootScope.current_user.fb_acc_token,
                //     method: "GET",
                //     params: {
                //         format: 'jsonp',
                //         callback: 'JSON_CALLBACK'
                //     },
                    //headers:{'X-Requested-With': null}, //superfluous now
                    // content: {alt: 'json', access_token: params.access_token}
                    // headers: {
                    //     'Access-Control-Allow-Origin': '*',
                    //     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                    //     'Access-Control-Allow-Headers': 'X-Requested-With, X-Auth-Token, Content-Type, Content-Length, Authorization',
                    //     'Access-Control-Allow-Credentials': true 
                    //     }
            //     })
            //     .then(function(response) {
            //             console.log(response);
            //     }, 
            //     function(response) { // optional
            //         console.log("some error occured");
            //     });
            // }, this);
            var config = {
                'client_id': '104628895635-v3f65f12tqsnsme0acdceer5q9accrju.apps.googleusercontent.com',
                'scope': 'https://www.google.com/m8/feeds'
                };
                gapi.auth.authorize(config, function() {
                var token = gapi.auth.getToken();
                //console.log(token);
                $scope.fetch(token.access_token);  
                
                }); 
            
          }
        }
      }
      $scope.fetch = function(token){
          $.ajax({
              url: "https://www.google.com/m8/feeds/contacts/default/full?max-results=200&access_token=" + token + "&alt=json",
              dataType: "jsonp",
              success: function (data) {
                  if (data) {
                      var res = data.feed.entry;
                      var friends = [];
                      friends_data = {};
                      data.feed.entry.forEach(function(element) {
                          friends_data.name = element.title.$t;
                          friends_data.picture = element.link[0].href;
                          friends.push({ "name": element.title.$t,"picture": element.link[1].href+"?access_token="+token});
                      }, this);
                     console.log("google",friends);
                     $rootScope.google_friends = friends;    
                      //var emailList = getEmails(res); 
                      //$scope.selectedGuests = getEmails(res);
                      // display all your data in console
                      //console.log(JSON.stringify(res));
                  }
              }
          });
      }

    $scope.googleAuth = function(key) {
        gapi.client.init({
          'apiKey': 'YOUR_API_KEY',
          'discoveryDocs': ['https://people.googleapis.com/$discovery/rest'],
          'clientId': '104628895635-v3f65f12tqsnsme0acdceer5q9accrju.apps.googleusercontent.com',
          'scope': 'profile',
        }).then(function() {
          return gapi.client.people.people.get({
            'resourceName': 'people/me',
            'requestMask.includeField': 'person.names'
          });
        }).then(function(response) {
          console.log(response.result);
        }, function(reason) {
          console.log('Error: ' + reason.result.error.message);
        });
      };
   
    // $scope.getFriendlistDetails();
    $scope.$watch('current_user',function(){
        $scope.getFriendlistDetails();
    });

    $scope.login = function(userData){
        $rootScope.showLoader = true;
        authService.login(userData)
        .then(function(data){
            if(data.data.success){
                $timeout(function(){
                    // $location.path('/home');
                    $location.path('/page');
                    $rootScope.showLoader = false;
                    toastr.success('Login Successful');
                },1500)
                
            }
            else{
                $timeout(function(){
                    $rootScope.showLoader = false;
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

    $scope.facebook = function(){
        $window.location = $window.location.protocol+'//'+$window.location.host+'/auth/facebook';
    }

    $scope.google = function(){
        $window.location = $window.location.protocol+'//'+$window.location.host+'/auth/google';
    }

    $scope.facebookLogin = function(){
        $http({
            url: CONSTANT.API_BASE_URL+'auth/facebook',
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                'Access-Control-Allow-Headers': 'X-Requested-With, X-Auth-Token, Content-Type, Content-Length, Authorization',
                'Access-Control-Allow-Credentials': true 
                }
        })
        .then(function(response) {
                console.log(response);
                
        }, 
        function(response) { // optional
            console.log("some error occured");
        });
        
    }
    
    $scope.googleLogin = function(){
        $http({
            url: CONSTANT.API_BASE_URL+'auth/google',
            method: "GET"
         })
        .then(function(response) {
                console.log(response);
                
        }, 
        function(response) { // optional
            console.log("some error occured");
        });
        
    }
    $scope.fbLogin = function() {
        // From now on you can use the Facebook service just as Facebook api says 
        Facebook.login(function(response) {
            if(response.status === 'connected') {
                $window.localStorage.setItem('token',response.authResponse.accessToken);
                $scope.me(response);
              } else {
                //$scope.loggedIn = false;
                Facebook.logout();
              }
          },{scope: 'user_birthday', return_scopes: true});
      };
      
      $scope.getLoginStatus = function() {
        Facebook.getLoginStatus(function(response) {
          if(response.status === 'connected') {
            $scope.loggedIn = true;
          } else {
            $scope.loggedIn = false;
            
          }
        });
      };
   
      $scope.me = function(data) {
        Facebook.api('/me?fields=id,name,picture,friends,birthday,email,gender,hometown', function(response) {
            console.log("resData",response);
            $location.path('/home/'+response.id);
            $rootScope.fbUser = response;
        });
    }

    $scope.$on('event:google-plus-signin-success', function (event,authResult) {
       console.log("signin success");
        // Send login to server or save into cookie
      });
    $scope.$on('event:google-plus-signin-failure', function (event,authResult) {
    // Auth failure or signout detected
    });

    $scope.facebookInvite = function(){
        FB.ui({
            method: 'send',
            link: 'http://www.nytimes.com/interactive/2015/04/15/travel/europe-favorite-streets.html',
          });
    }

    $scope.postCont = function(){
        Facebook.ui({
            method: 'share_open_graph',
            action_type: 'og.likes',
            action_properties: JSON.stringify({
              object:'https://developers.facebook.com/docs/',
            })
          }, function(response){
            // Debug response (optional)
            console.log(response);
          });
    }
    $scope.feedCont = function(){
        Facebook.ui({
            method: 'feed',
            link: 'https://developers.facebook.com/docs/',
            caption: 'An example caption',
          }, function(response){});
    }
    
});