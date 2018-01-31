angular.module('subjectControllers', [])

.controller('subCtrl',function($scope, $http, Facebook, socket){

//var socket = io.connect('http://localhost:3200', {reconnect: true});


var expanded = false;   
$scope.assignFavArray = [];
$scope.quotes = [];
$scope.showLoder = false;
$scope.favourates = ['Science','Social', 'Travel', 'Geography'];

$scope.rating = 0;
$scope.ratings = [{
    current: 5,
    max: 10
}, {
    current: 3,
    max: 5
}];

$scope.getSelectedRating = function (rating) {
    console.log(rating);
}

$scope.regSubject = function(subject){

    $http({
        url: CONSTANT.API_BASE_URL+'addSubject',
        method: "POST",
        data: subject,
        headers: {'Content-Type': 'application/json'}
    })
    .then(function(response) {
            console.log("user data sent");
           
    }, 
    function(response) { // optional
        console.log("some error occured");
    });

    }

    $scope.login = function() {
        // From now on you can use the Facebook service just as Facebook api says 
        Facebook.login(function(response) {
          // Do something with response. 
        });
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
   
      $scope.me = function() {
        Facebook.api('/me', function(response) {
          $scope.user = response;
        });
    }

    $scope.file_changed = function(element) {
      
           $scope.$apply(function(scope) {
               var photofile = element.files[0];
               var reader = new FileReader();
               reader.onload = function(e) {
                  // handle onload
                  $scope.img = photofile;
                  //$('#profile-img-tag').attr('src', photofile);
               };
               reader.readAsDataURL(photofile);
           });
      };
      $scope.getRoandomQuote = function(){
        $scope.showLoder = true;
        $http({
          url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1',
          method: "GET",
          // X-Mashape-Key: 'ETpPy2gysmmsh1cVBpHaSI28S0KUp1mImWsjsnKYPxsJc1CeMx',
          headers: {'Content-Type': 'application/json',
                    'X-Mashape-Key':'yWEhMMRPfnmshwzgHep8JeSCxj4Wp1RtkmBjsn56EvW56rFUKW'}
      })
      .then(function(response) {
          if(response.data){
              $scope.quotes = response.data;
              $scope.showLoder = false;
          }
              console.log("Data Received");
      }, 
      function(response) { // optional
          console.log("some error occured");
      });
      }
      $scope.getRoandomQuote();

      $scope.showCheckboxes = function() {
        var checkboxes = document.getElementById("checkboxes");
        if (!expanded) {
          checkboxes.style.display = "block";
          expanded = true;
        } else {
          checkboxes.style.display = "none";
          expanded = false;
        }
      };
      $scope.assignFavourates = function(event, favourate){
        if(event){
          $scope.assignFavArray.push(favourate);
          console.log($scope.assignFavArray);
        }
        else{
          $scope.assignFavArray.forEach(function(element, index) {
            if(element == favourate){
              $scope.assignFavArray.splice(index,1);
              console.log($scope.assignFavArray);
              return;
            }
          }, this);
        }
      }

      $scope.emitEvent = function(){
        socket.emit('event1', { my: 'data' });
      }

      socket.on('event2', function(Data){
        alert("data");
      });
})

