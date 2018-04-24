app.controller('homeCtrl', function ($scope, CONSTANT, $rootScope, $http, Facebook, toastr, authService, $timeout, $location, Socialshare, homePageService, userRegService, postService) {

  if (!authService.isLoggedIn()) {
    $location.path('/');
  }

  var thehours = new Date().getHours();
  var themessage;
  var morning = ('Good morning');
  var afternoon = ('Good afternoon');
  var evening = ('Good evening');

  $scope.ratings = [{
    current: 1,
    max: 5
  }];

  var checkPostImageURL = (function (src) {
    return new Promise(function (resolve, reject) {
      if (typeof src === "undefined") {
        reject();
        return false;
      }
      var image = document.createElement('img');
      image.src = src;
      image.onerror = function () {
        reject();
      };
    });
  });

  if (thehours >= 0 && thehours < 12) {
    themessage = morning;

  } else if (thehours >= 12 && thehours < 17) {
    themessage = afternoon;

  } else if (thehours >= 17 && thehours < 24) {
    themessage = evening;
  }

  $('.greeting').append(themessage);

  $scope.postsArray = [];
  $scope.getAllUserPosts = function () {
    if ($rootScope.current_user) {
      var post = { "id": $rootScope.current_user._id };
      // $http.post(CONSTANT.API_BASE_URL+'alluserPosts', post)
      // authService.getAllUserPosts(post)
      //   .then(function (response) {
      //     $scope.postsArray = response.data;alert(1+JSON.stringify($scope.postsArray));
      //     post.comments = response.data.comments;
      //   })
      //   .catch(function (response) {

      //   })
      homePageService.getAllUserPosts(post).then(function (data) {
        $scope.postsArray = data.data.data;
        $timeout(function () {
          $(".w3-row-padding").each(function () {
            var p = $(this)[0];
            checkPostImageURL($("img", p).attr('src')).then().catch(function () {
              $("img", p).attr('src', '/app/view/images/no-image.jpg');
            });
          });
        }, 500);
      }).catch(function (error) {
        alert(JSON.stringify(error))
      });
    }
  }
  $scope.getAllUserPosts();
  $scope.getRoandomQuote = function () {
    $scope.showLoder = true;
    $http({
      url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1',
      method: "GET",
      // X-Mashape-Key: 'ETpPy2gysmmsh1cVBpHaSI28S0KUp1mImWsjsnKYPxsJc1CeMx',
      headers: {
        'Content-Type': 'application/json',
        'X-Mashape-Key': 'yWEhMMRPfnmshwzgHep8JeSCxj4Wp1RtkmBjsn56EvW56rFUKW'
      }
    })
      .then(function (response) {
        $scope.showLoder = false;
        if (response.data) {

          $scope.quotes = response.data;
        }
        console.log("Data Received");
      },
        function (response) { // optional
          console.log("some error occured");
        });
  }
  $scope.getRoandomQuote();

  $scope.showUserProfile = function (id) {
    $location.path("/userprofile/" + id);
  }

  $scope.editProfile = function () {
    $location.path("/editprofile/" + $rootScope.current_user._id);
  }

  $scope.postStatus = function (post) {
    post.userId = $rootScope.current_user._id;
    post.poster = $rootScope.current_user.firstName + " " + $rootScope.current_user.lastName;
    post.posterImage = $rootScope.current_user.profilePic;
    //$http.post(CONSTANT.API_BASE_URL+'addpost', post)
    homePageService.getAllUserPosts(post)
      .then(function (response) {
        $scope.getAllUserPosts();
      })
      .catch(function (response) {

      })
  }

  // $scope.getAllUserPosts = function () {
  //   var post = { "id": $rootScope.current_user._id };
  //   $http.post(CONSTANT.API_BASE_URL + 'alluserPosts', post)
  //     .then(function (response) {
  //       $scope.postsArray = response.data;
  //     })
  //     .catch(function (response) {

  //     })
  // }

  $scope.likePost = function (post) {
    var postData = {};
    postData.id = post._id;
    postData.likes = { "userId": $rootScope.current_user._id }
    $http.post(CONSTANT.API_BASE_URL + 'likepost', postData)
      .then(function (response) {
        post.likeCount = response.data.like_count;
        post.showLike = true;
      })
      .catch(function (response) {

      })
  }

  $scope.disLikePost = function (post) {
    var postData = {};
    postData.id = post._id;
    postData.likes = { "userId": $rootScope.current_user._id }
    $http.post(CONSTANT.API_BASE_URL + 'dislikepost', postData)
      .then(function (response) {
        post.likeCount = response.data.like_count;
        post.showLike = false;
      })
      .catch(function (response) {

      })
  }
  $scope.showComment = function (post) {
    post.showCommentBox = true;
  }

  $scope.postComment = function (post) {
    post.comments = { "userId": post.userId, "commentBody": post.comment },
      $http.post(CONSTANT.API_BASE_URL + 'commentpost', post)
        .then(function (response) {
          post.comments = response.data.comments;
          post.comment = "";
        })
        .catch(function (response) {

        })
  }

  $scope.ratepost = function (post) {
    post.ratings = { "userId": post.userId, "rating": post.comment },
      $http.post(CONSTANT.API_BASE_URL + 'commentpost', post)
        .then(function (response) {
          post.comments = response.data.comments;
          post.comment = "";
        })
        .catch(function (response) {

        })
  }

  $scope.removePost = function (postId) {
    $http({
      method: 'DELETE',
      url: CONSTANT.API_BASE_URL + 'deletepost',
      data: { id: postId },
      headers: {
        'Content-type': 'application/json;charset=utf-8'
      }
    })
      .then(function (response) {
        $scope.getAllUserPosts();
        console.log(response.data);
      }, function (rejection) {
        console.log(rejection.data);
      });
  }

  $scope.getSelectedRating = function (post, rating) {
    post.ratings = { "userId": post.userId, "rating": rating },
      $http.post(CONSTANT.API_BASE_URL + 'ratepost', post)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
  }

  $scope.logout = function () {
    $rootScope.showLoader = true;
    authService.logout();
    $timeout(function () {
      $location.path('/');
      $rootScope.showLoader = false;
      toastr.success('Successfully signed out!');
    }, 1500)
  }

  $scope.shareFb = function (postContent) {
    Socialshare.share({
      'provider': 'facebook',
      'attrs': {
        'socialshareText': postContent
      }
    })
  }

  $scope.shareTwitter = function (postContent) {
    Socialshare.share({
      'provider': 'twitter',
      'attrs': {
        'socialshareUrl': '',
        'socialshareText': postContent,
        'socialshareQuote': postContent
      }
    })
  }

  $scope.shareInsta = function () {
    Socialshare.share({
      'provider': 'facebook',
      'attrs': {
        'socialshareUrl': 'http://720kb.net'
      }
    })
  }

  $scope.sharePintrest = function (postContent) {
    Socialshare.share({
      'provider': 'pinterest',
      'attrs': {
        'socialshareUrl': 'http://720kb.net',
        'socialshareText': postContent
      }
    })
  }

  $scope.shareFb = function () {
    Socialshare.share({
      'provider': 'facebook',
      'attrs': {
        'socialshareUrl': 'http://720kb.net'
      }
    })
  }

  $scope.reportAbuse = function (post) {
    post.reportBox = !post.reportBox;
  }

  $scope.submitReport = function (post) {
    post.report = {};
    post.report.reporter = $rootScope.current_user.email;
    post.report.reportMsg = post.reportContent;
    $http.post(CONSTANT.API_BASE_URL + 'reportabuse', post)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })

  }

  // $scope.saveAsDraft = function (post) {
  //   post.userId = $rootScope.current_user._id;
  //   post.poster = $rootScope.current_user.firstName + " " + $rootScope.current_user.lastName;
  //   post.posterImage = $rootScope.current_user.profilePic;
  //   $http.post(CONSTANT.API_BASE_URL + 'savedraft', post)
  //     .then(function (response) {
  //       $scope.getAllUserPosts();
  //     })
  //     .catch(function (response) {

  //     })
  // }
  var enablePluginsForCKEditor = (function () {
    CKEDITOR.config.extraPlugins = "language";
    CKEDITOR.config.extraPlugins = "colorbutton";
    CKEDITOR.config.extraPlugins = "image2";
    CKEDITOR.config.removePlugins = 'easyimage';
  });
  /**
   * This function check and load the ck editor
   */
  $scope.loadCKEditor = (function () {
    // applying ck editor
    $("#txt_postWriter").animate({
      "height": "+=251"
    }, 500, function () {
      $("#txt_postWriter").parent().animate({
        "opacity": "0.5"
      }, 250, function () {
        enablePluginsForCKEditor();
        CKEDITOR.replace("txt_postWriter");
        $("#txt_postWriter").parent().animate({
          "opacity": "1"
        }, 250);
      });

    });
  });

  $scope.destroyCKEditor = (function () {
    var editorInstance = CKEDITOR.instances['txt_postWriter'];
    $("#txt_postWriter").parent().animate({
      "opacity": "0.5"
    }, 250, function () {
      editorInstance.destroy();
      $("#txt_postWriter").animate({
        "height": "-=251"
      }, 500, function () {
        $("#txt_postWriter").parent().animate({
          "opacity": "1"
        }, 250);
      })
    });
  });


  /**
   * This function save post as draft
   */
  $scope.saveAsDraft = (function () {
    var editorInstance = CKEDITOR.instances['txt_postWriter'];
    editorInstance.config.readOnly = true;
    postTitle = "";
    postType = "";
    postTopic = "";
    postLanguage = "";
    postContent = editorInstance.getData();
    postImage = $rootScope.current_user.profilePic
    postBackGround = "";
    hashtags = "";
    userId = $rootScope.current_user._id
    userEmail = $rootScope.current_user.email;
    postService.saveAsDraft(postTitle, postType, postTopic, postLanguage, postBackGround, postContent, postImage, hashtags, userId, userEmail).then(function (messege) {
      // post saved as draft
      toastr.success("Post saved as draft successfully");
      $scope.destroyCKEditor();
    }).catch(function (messege) {
      // post saving failed
      toastr.error("Post cannot be saved right now");
      $scope.destroyCKEditor();
    });

  });

  /**
   * This function save post to database and publish the post
   */
  $scope.saveAndPublishPost = (function () {
    $scope.destroyCKEditor();
  });

  var checkAndReplaceForInvalidImage = (function (userObject) {
    var s = document.createElement("IMG");
    s.src = userObject.profilePic
    $("img[src='" + userObject.profilePic + "']").hide();
    s.onerror = function () {
      console.log("file with " + userObject.profilePic + " invalid");
      userObject.profilePic = null;
      $("img[src='" + userObject.profilePic + "']").show();
    }
    s.onload = function () {
      $("img[src='" + userObject.profilePic + "']").show();

    }
  });

  var getRandomProfiles = (function () {
    userRegService.getRandomProfiles().then(function (data) {
      var userDataArray = [];
      for (var index in data.data) {
        var userObject = {};
        userObject.id = data.data[index]["_id"];
        if (typeof data.data[index].profilePic == "undefined") {
          userObject.profilePic = "app/view/images/avatarss.png";
        } else {
          userObject.profilePic = data.data[index].profilePic;
          if (userObject.profilePic.indexOf("/") !== -1 && userObject.profilePic.indexOf("http://") === -1 && userObject.profilePic.indexOf("https://") === -1) {
            var pic = "app/view/images/profile_pictures/" + userObject.profilePic.split("/").pop();
            userObject.profilePic = pic;
          }

        }
        checkAndReplaceForInvalidImage(userObject);
        userObject.name = data.data[index].firstName; console.log(userObject.profilePic);
        userDataArray.push(userObject);
      } console.log(data.data);
      $scope.randomProfiles = userDataArray;
    });
  });

  getRandomProfiles();

})

