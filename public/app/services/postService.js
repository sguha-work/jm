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

    var getSystemInfo = (function() {
        var systemInfo = {};
        systemInfo.browser = navigator.userAgent;
        systemInfo.language = navigator.language;
        systemInfo.platform = navigator.platform;
        systemInfo.deviceMemorySizeInGB = navigator.deviceMemory;
        systemInfo.appName = navigator.appName + " " + navigator.appCodeName+" "+navigator.appVersion;
        return systemInfo;
    });
    postService.saveAsDraft = (function (postTitle, postType,postTopic, postLanguage,postBackGroundColor, postContent, postImage, hashtags, userId, userEmail) {
        return new Promise(function (resolve, reject) {
            var postObject = {};
            postObject.postContent = postContent;
            postObject.userId = userId;
            postObject.userEmail = userEmail;
            postObject.systemInfo = getSystemInfo();
            postObject.postImage = postImage;
            postObject.hastags = hashtags;
            postObject.postTitle = postTitle;
            postObject.postLanguage = postLanguage;
            postObject.postBackGroundColor = postBackGroundColor;
            postObject.postType = postType;
            postObject.postTopic = postTopic;
            postObject.isDraft = true;
            postObject.lastModified = Date.now();
            postObject.isTrashed = false;
            postObject.rating = 0;
            $http.post(CONSTANT.API_BASE_URL + 'post/add', postObject)
                .then(function (response) {console.log(response);
                    if(response.data.success) {
                        resolve();
                    } else {
                        reject(response.message);
                    }
                })
                .catch(function (response) {
                    reject();
                })
        });

    });

    return postService;

})