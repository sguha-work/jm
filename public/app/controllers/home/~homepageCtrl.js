app.controller('homepageCtrl',['$scope','$rootScope','CONSTANT','$http','$window','authService',
'toastr','homePageService',
function ($scope, $rootScope, CONSTANT,  $http, $window, authService, toastr, homePageService) {
    $scope.postsArray = [];
    $scope.showedit = true;
    $scope.users = {};
    $scope.favourites = [];
    $scope.prepost ={};
    $scope.showFirst = true;
    $scope.post = {};
$scope.url="app/view/images/bgimg1.jpg"
$scope.setBgImg=function(url){
  $scope.url=url;
}
  
  $('.embolden').click(function(){
    document.execCommand('bold');
  });
  $('.italic').click(function(){
      document.execCommand('italic');
  });
  $('.underline').click(function(){
      document.execCommand('underline');
  });

    $scope.value = "HI";
    var current_role = $rootScope.current_user.role;
    $scope.getAllUserPosts = function(){
        if($rootScope.current_user){
        var post = { "id" : $rootScope.current_user._id, "following" : $rootScope.current_user.following };
        homePageService.getAllUserPosts(post)
          .then(function(response) {
            $scope.postsArray = response.data;
            post.comments = response.data.comments;
            $scope.getRandomQuote();
          })
          .catch(function(response) {
            
          })
      }
      }
      $scope.getAllUserPosts();

      $scope.goNext = function(){
        if($scope.showTick){
          $scope.showFirst = false;
          $scope.url="app/view/images/bgimg1.png";
        }else{
          toastr.error("Please select any one category");
        }
         
      }

      $scope.goPrevious = function(){
        $scope.showFirst = true;
     }

      $scope.postStatus = function(post){
        var content = document.getElementById("content_post");
        content.removeAttribute("id");
        content.style.backgroundImage = 'url('+$scope.url+')';
        post.postContent = $(content).clone().wrapAll("<div/>").parent().html();
        //var content = document.getElementById("content_post");
        post.userId = $rootScope.current_user._id;
        post.poster = $rootScope.current_user.firstName +" "+ $rootScope.current_user.lastName;
        post.posterImage = $rootScope.current_user.profilePic;
        post.posterRole = $rootScope.current_user.role;
        post.postType = $scope.showTick;
      authService.postStatus(post)
        .then(function(response) {
          $scope.getAllUserPosts();
        })
        .then(function(response) {
          $scope.post = {};
          $scope.showFirst = true;
        })
        .catch(function(response) {
          
        })
      }

     

      $scope.showComment = function(post){
        post.showCommentBox = true; 
      }

      $scope.hideComment = function(post){
        post.comment = "";
        post.showCommentBox = false; 
      }
    
      $scope.postComment = function(post){
        post.comments = { "userId" : post.userId, "commentBody" : post.comment },
        homePageService.postComment(post)
          .then(function (response) {
            post.comments = response.data.comments;
            post.comment = "";
          })
          .catch(function (response) {
        })
      }
      $scope.myFunction = function() {
        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
    }

    $scope.getRatings = function(post,value){
      post.ratings = { "userId" : post.userId, "rating" : +(value.control.defaultValue) },
      homePageService.getRatings(post)
        .then(function (response) {
          console.log(response);  
        post.ratingValue = +(value.control.defaultValue);
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    $scope.showMenu = function(id){
        document.getElementById(id).classList.toggle("show");
    }
    
    $scope.removePost = function(postId){
      homePageService.removePost(postId)
      .then(function(response) {
          $scope.getAllUserPosts();
          console.log(response.data);
      }, function(rejection) {
          console.log(rejection.data);
      });
  }
  $scope.submitReport = function(post){
    post.report = {};
    post.report.reporter = $rootScope.current_user.email;
    post.report.reportMsg = post.reportContent;
    homePageService.submitReport(post)
      .then(function (response) {
        console.log(response);  
      })
      .catch(function (error) {
        console.log(error);
      })

  }

  $scope.editPost = function(post){
    $scope.showedit = false;
    $scope.post.postTopic = post.postTopic;
    $scope.post.postTitle = post.postTitle;
    $scope.post.hastags = post.hastags;
    $scope.post.postContent = post.postContent;
    $scope.post.postLanguage = post.postLanguage;

  }

  $scope.viewPost = function(post){
    $scope.post.postTitle = post.postTitle;
    $scope.post.postContent = post.postContent;
    $scope.post.hastags = post.hastags;
    $scope.post.postType = post.postType;
    $scope.post.rating = post.rating;
    $scope.post.comments = post.comments;
    $scope.post.dateAndTime = post.dateAndTime
  }

  $scope.getUsers = function(){
        homePageService.getUsers()
        .then(function(response) {
            if(response.data){
              $scope.users = response.data;
            }
        })
        .catch(function (error) {
          console.log(error);
        })
    
  }
    $scope.getUsers();

    $scope.edit_user =function(user){
      user.editUser = true;
      user.showUpdate = true;
      user.disFeature=true;
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

   $scope.getFavourites = function(){
    homePageService.getFavourites()
      .then(function (response) {
        if(response.data.success){
          console.log(response);
            $scope.favourites = response.data.data; 
        }else{
              console.log("err");
            }
        })
        .catch(function (error) {
          console.log(error);
        })
  
      }

      $scope.getRandomQuote = function(){
        homePageService.getRandomQuote()
          .then(function (response) {
            if(response.data.success){
                $scope.randomQuote = response.data.data; 
                $scope.getFavourites();
            }else{
                  console.log("err");
                }
            })
            .catch(function (error) {
              console.log(error);
            })
      
          }

      $scope.saveAsDraft = function(post){
        var content = document.getElementById("content_post");
        content.removeAttribute("id");
        content.style.backgroundImage = 'url('+$scope.url+')';
        post.postContent = $(content).clone().wrapAll("<div/>").parent().html();
        if(post.hastags){
          post.hastags = post.hastags.split(/[ ,]+/).filter(Boolean);
        }
        post.userId = $rootScope.current_user._id;
        post.poster = $rootScope.current_user.firstName +" "+ $rootScope.current_user.lastName;
        post.posterImage = $rootScope.current_user.profilePic;
        post.postType = $scope.showTick;        
        homePageService.saveAsDraft(post)
          .then(function(response) {
            $scope.post ={};
            $scope.showFirst = true;
            toastr.success('post saved as draft');
          })
          .catch(function(response) {
            
          })
      }

      $scope.closeDialog = function(){
        $scope.post = {};
        $scope.showFirst = true;
      }

      $scope.selectCategrory = function(id){
        $scope.showTick = id;
      }

      $scope.saveBookMark = function(post){
        var postData = {};
        postData.id = post._id;
        postData.bookmark_obj = { "userId": $rootScope.current_user._id };
        homePageService.saveBookMark(postData)
        .then(function(response) {
          post.showBookMark = true;
          toastr.success('post bookmarked');
        })
        .catch(function(err) {
          
        });
      }

      $scope.removeBookMark = function(post){
        var postData = {};
        postData.id = post._id;
        postData.bookmark_obj = { "userId": $rootScope.current_user._id };
        homePageService.removeBookMark(postData)
        .then(function(response) {
          post.showBookMark = false;
          toastr.success('Bookmark removed');
        })
        .catch(function(err) {
          
        });
      }

      $scope.contentLength = function(){
        var content = document.getElementById('content_post');
        if(content.innerHTML.length > 160 ){
          $("#content_post").css('background-image', 'none');
          $("#content_post").css('color', 'black');
        }
        //console.log(content.innerHTML);
      }

    // Close the dropdown if the user clicks outside of it
    window.onclick = function(event) {
      if (!event.target.matches('.dropbtn')) {
    
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    }
    $scope.openPrevModel = function(){
      angular.element('#modalsharepost').modal('hide');
     
      angular.element('#modalshare').modal('show');
      
      
    }

    $scope.options = {
      language: 'en',
      allowedContent: true,
      entities: false,
      removePlugins :'elementspath,save,font'
    };

    $scope.countOf = function(text) {
      var s = text ? text.split(/\s+/) : 0; // it splits the text on space/tab/enter
      return s ? s.length-1 : 0;
  };
  
    $scope.$on('search_data', function(event, args) {
        $scope.postsArray = [];
        $scope.postsArray = args;
    });

      // socket.on("event2", function(response){
      //   alert(response);
      // })
}]) 
