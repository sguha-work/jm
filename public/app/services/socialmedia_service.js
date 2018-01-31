app.service('socialService', function($window, $http){
    var socialservice = {};

    socialservice.googleApi = function(){

        gapi.client.setApiKey('AIzaSyBDG-DcihR3EOETBJCkBjivZO2tA_33bN4');  
        var config = {
            'client_id': '104628895635-v3f65f12tqsnsme0acdceer5q9accrju.apps.googleusercontent.com',
            'scope': 'https://www.google.com/m8/feeds'
            };
            gapi.auth.authorize(config, function() {
            var token = gapi.auth.getToken();
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
                            friends_data.picture = element.link[1].href;
                            friends.push(friends_data);
                        }, this);
                       console.log("google",friends);
                       return friends;
                        //var emailList = getEmails(res); 
                        //$scope.selectedGuests = getEmails(res);
                        // display all your data in console
                        //console.log(JSON.stringify(res));
                    }
                }
            });
            
            }); 
    }

    socialservice.googleApiLoad = function(){
        gapi.client.setApiKey('AIzaSyBDG-DcihR3EOETBJCkBjivZO2tA_33bN4');  
    }
    
  

    
 return socialservice;
})