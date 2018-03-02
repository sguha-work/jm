app.controller('editProfileCtrl', ['$scope', 'CONSTANT', '$http',
    '$routeParams', 'Facebook', 'socket', 'authService',
    '$location', '$timeout', 'toastr', '$base64', 'profileService', '$rootScope',
    function ($scope, CONSTANT, $http, $routeParams, Facebook,
        socket, authService, $location, $timeout,
        toastr, $base64, profileService, $rootScope) {


        $scope.rating = {
            current: 1,
            max: 5
        };
        $scope.editMode = false;
        $scope.profile = {};
        $scope.draft = {};
        $scope.showFirst = true;

        $scope.saveProfile = (function () {
            console.log($scope.profile);
            profileService.updateUser($scope.profile).then(function () {
                toastr.success("Profile updation complete");
                $scope.editMode = false;
            }, function () {
                toastr.error("Profile updation failed");
                $scope.editMode = false;
            });
        });

        $scope.getUserProfileById = function (id) {
            profileService.getUserById(id)
                .then(function (response) {
                    $scope.profile = response.data[0];
                    if ($scope.profile.profilePic) {
                        $scope.profile.profilePic = getRelativePath($scope.profile.profilePic);
                    }
                    $scope.favouriteArray = response.data[0].favourites;
                    $scope.getUserDrafts(response.data[0]._id);
                    splitdate(new Date($scope.profile.dateOfBirth));
                })
                .catch(function (error) {
                    toastr.error(error);
                });

        }

        $scope.getUserRating = function (id) {
            profileService.getUserRating(id)
                .then(function (response) {
                    console.log(response);
                    $scope.rating.current = response.data.count;
                    $("#rating_div").addClass("disabledbutton");
                })
                .catch(function (error) {
                    toastr.error(error);
                });
        }


        $scope.getUserDrafts = function (id) {
            profileService.getDrafts(id)
                .then(function (response) {
                    $scope.profile.drafts = response.data.post;
                    $scope.getFavourites();
                })
                .catch(function (error) {
                    toastr.error(error);
                });
        }

        $scope.getFavourites = function () {
            $http({
                url: CONSTANT.API_BASE_URL + 'getfavourites',
                method: "GET",
            }).then(function (response) {
                if (response.data.success) {
                    console.log(response);
                    $scope.favourites = response.data.data;
                } else {
                    console.log("err");
                }
            },
                function (response) { // optional
                    console.log("some error occured");
                });

        }

        $scope.editPost = function (draft) {
            $scope.showedit = false;
            $scope.draft.postTopic = draft.postTopic;
            $scope.draft.postTitle = draft.postTitle;
            $scope.draft.hastags = draft.hastags;
            $scope.draft.postContent = draft.postContent;
            $scope.draft.postLanguage = draft.postLanguage;
            $scope.draft.id = draft._id;
        }

        $scope.updateDraft = function (post) {
            post.userId = $scope.profile._id;
            post.poster = $scope.profile.firstName + " " + $scope.profile.lastName;
            post.posterImage = $scope.profile.profilePic;

            $http({
                method: 'POST',
                url: CONSTANT.API_BASE_URL + 'updatedraft',
                data: post,
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            })
                .then(function (response) {
                    $scope.getUserDrafts();
                    console.log(response.data);
                }, function (rejection) {
                    console.log(rejection.data);
                });
        }


        $scope.removePost = function (draft) {
            $http({
                method: 'DELETE',
                url: CONSTANT.API_BASE_URL + 'deletepost',
                data: { id: draft.id },
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                }
            })
                .then(function (response) {
                    $scope.getUserDrafts();
                    console.log(response.data);
                }, function (rejection) {
                    console.log(rejection.data);
                });
        }

        $scope.countOf = function (text) {
            var s = text ? text.split(/\s+/) : 0; // it splits the text on space/tab/enter
            return s ? s.length - 1 : 0;
        };

        $scope.goNext = function () {
            $scope.showFirst = false;
        }

        $scope.goPrevious = function () {
            $scope.showFirst = true;
        }

        $scope.closeProfile = function () {
            $location.path("/home");
        }

        $scope.editProfile = function () {
            if ($scope.editMode) {
                $scope.editMode = false;
                toastr.success("Edit mode is off");
            } else {
                $scope.editMode = true;
                toastr.success("Edit mode is on");
            }

        }
        $scope.closeDialog = function () {
            $scope.draft = {};
            $scope.showFirst = true;
        }

        if ($routeParams.id) {
            $scope.getUserProfileById($routeParams.id);
            $scope.getUserRating($routeParams.id);

        } else {
            $scope.getUserProfileById($rootScope.current_user._id);
            $scope.getUserRating($rootScope.current_user._id);
        }

        $scope.openPrevModel = function () {
            angular.element('#modalsharepost').modal('hide');

            angular.element('#modalshare').modal('show');


        }

        //   $scope.options = {
        //     language: 'en',
        //     allowedContent: true,
        //     entities: false,
        //     removePlugins :'elementspath,save,font'
        //   };


        var splitdate = function (dateObj) {
            $scope.profile.month = dateObj.getUTCMonth() + 1; //months from 1-12
            $scope.profile.date = dateObj.getUTCDate();
            $scope.profile.year = dateObj.getUTCFullYear();
        }

        var getRelativePath = function (path) {
            var index = path.indexOf('app');
            return path.substring(index);
        }
    }])
