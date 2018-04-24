/*
post.userId = $rootScope.current_user._id;
    post.poster = $rootScope.current_user.firstName + " " + $rootScope.current_user.lastName;
    post.posterImage = $rootScope.current_user.profilePic;
    $http.post(CONSTANT.API_BASE_URL + 'savedraft', post)
      .then(function (response) {
        $scope.getAllUserPosts();
      })
      .catch(function (response) {

      })
*/

app.service('postService', function ($window, $http, CONSTANT) {

    var postService = {};


    postService.saveAsDraft = (function (postTitle, postType, postLanguage, postContent, postImage, hashtags, userid, userEmail) {
        var postObject = {};
        postObject.postContent = postContent;
        postObject.userId = userId;
        postObject.userEmail = userEmail;
        post.systemInfo = systemInfo;
        postObject.postImage = postImage;
        postObject.hastags = hashtags.split(/[ ,]+/).filter(Boolean);
        postObject.postTitle = postTitle;
        postObject.postLanguage = postLanguage;
        postObject.postType = postType;
        postObject.isDraft = true;
        postObject.lastModified = Date.now();
        postObject.isTrashed = false;
        return new Promise(function (resolve, reject) {
            $http.post(CONSTANT.API_BASE_URL + 'post/add', post)
                .then(function (response) {
                    resolve();
                })
                .catch(function (response) {
                    reject();
                })
        });

    });

    return postService;

})