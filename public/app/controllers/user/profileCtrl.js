app.controller('profileCtrl', ['$scope', 'CONSTANT', '$http',
    '$routeParams', 'Facebook', 'socket', 'authService',
    '$rootScope', '$location', '$timeout', 'toastr', '$base64',
    '$window', 'socialService', 'userRegService',
    function ($scope, CONSTANT, $http, $routeParams, Facebook,
        socket, authService, $rootScope, $location, $timeout,
        toastr, $base64, $window, socialService, userRegService) {

        $scope.profile = {};
        $scope.profile.email = $rootScope.current_user.email;
        $scope.selectedFrnds = [];
        $scope.following = [];
        $scope.selectedFav = [];
        $scope.profile.privacyPolicy = "public";

        $scope.totalNumberOfUser = "";

        var getTotalNumberOfUser = (function () {
            userRegService.getTotalNumberOfUser().then(function (data) {
                $scope.totalNumberOfUser = isNaN(data.data) ? "0" : data.data;
            });
        });

        getTotalNumberOfUser();

        var getRandomProfiles = (function () {
            userRegService.getRandomProfiles().then(function (data) {
                var userDataArray = [];
                for (var index in data.data) {
                    var userObject = {};
                    if (typeof data.data[index].profilePic == "undefined") {
                        userObject.profilePic = "app/view/images/avatarss.png";
                    } else {
                        userObject.profilePic = data.data[index].profilePic;
                    }
                    userObject.name = data.data[index].firstName;
                    userDataArray.push(userObject);
                }
                $scope.randomProfiles = userDataArray;
            });
        });

        getRandomProfiles();

        $scope.isAllRequirementFulfilled = (function () {
            //!acceptAgreement && profile.birthday=='' && profile.penName==''
            if ($scope.profile.name && $scope.profile.name != '' && $scope.profile.shortBio && $scope.profile.shortBio != '' && typeof $scope.profile.birthday != 'undefined' && $scope.acceptAgreement) {
                return true;
            } else {
                return false;
            }
        });
        $scope.getCurrentUser = function () {
            if (authService.isLoggedIn()) {
                authService.getUser().then(function (data) {
                    $scope.profile_user = data.data.user;
                    if ($scope.profile_user.facebook.length > 0) {
                        $scope.profile.birthday = data.data.user.facebook[0].birthday;
                        $scope.profile.name = data.data.user.facebook[0].name;
                        $scope.profile.profilePic = data.data.user.facebook[0].picture;
                        $scope.fbLogin();
                    } else if ($scope.profile_user.google.length > 0) {
                        $scope.profile.name = data.data.user.google[0].name;
                        $scope.profile.profilePic = data.data.user.google[0].picture;
                        socialService.googleApi();
                        $timeout(function () {
                            $scope.fbLogin();
                        }, 1500)
                    }
                });
            };
        }
        $scope.getCurrentUser();

        $scope.getUserProfileById = function (id) {
            $http({
                url: CONSTANT.API_BASE_URL + 'getUserById',
                method: "POST",
                data: { id: id },
                headers: { 'Content-Type': 'application/json' }
            })
                .then(function (response) {
                    console.log(response);
                },
                    function (response) { // optional
                        console.log(response);
                    });

        }

        if ($routeParams.id) {
            $scope.getUserProfileById($routeParams.id);
        }

        $scope.selectAll = function (event) {
            if ($scope.selectedFrnds.length == $scope.friends.length) {
                $scope.selectedFrnds = [];
            } else {
                $scope.selectedFrnds = [];
                $scope.friends.forEach(function (frnd) {
                    $scope.selectedFrnds.push(frnd.id);
                })
            }
        }



        $scope.submitProfile = function (profile_details) {
            console.log(profile_details);
            profile_details.profilePic = $base64.encode('a string');
            profile_details.dateOfBirth = returnDate(profile_details);
            profile_details.profilePic = $scope.base64_img;
            profile_details.favourites = $scope.favourites;
            profile_details.id = $rootScope.current_user._id;
            $rootScope.showLoader = true;
            $http({
                url: CONSTANT.API_BASE_URL + 'updateprofile',
                method: "POST",
                data: profile_details,
                headers: { 'Content-Type': 'application/json' }
            }).then(function (response) {
                $timeout(function () {
                    $rootScope.showLoader = false;
                    authService.setToken(response.data.token);
                    $location.path('/home');
                    $rootScope.showLoader = false;
                    toastr.success('Profile updated successfully');
                }, 1500)
            },
                function (response) {
                    $rootScope.showLoader = false;
                    $location.path("/home");
                });
        }

        $scope.openFileBrowser = function () {
            $("#imageOpen").trigger("click");
        }

        $scope.changeImage = (function () {
            $("#imageOpen").trigger("click");
        });

        $scope.followJiyan = function (friend) {
            $http({
                url: CONSTANT.API_BASE_URL + 'followuser',
                method: "POST",
                data: {
                    "userId": $scope.profile_user._id,
                    "followingsocialId": friend.id,
                    "followingUserName": friend.name,
                    "followingPicture": friend.picture
                },
                headers: { 'Content-Type': 'application/json' }
            })
                .then(function (response) {
                    if (response.data.success) {
                        friend.follow = true;
                    }
                },
                    function (response) { // optional
                        console.log("some error occured");
                    });
        }

        $scope.followAll = function () {
            var follow = {};
            if ($scope.friends.length > 0) {
                follow.userId = $scope.profile_user._id;
                follow.friends = $scope.friends;

                $http({
                    url: CONSTANT.API_BASE_URL + 'followall',
                    method: "POST",
                    data: follow,
                    headers: { 'Content-Type': 'application/json' }
                })
                    .then(function (response) {
                        if (response.data.success) {
                            console.log(response);
                        }
                    },
                        function (response) { // optional
                            console.log("some error occured");
                        });
            }
        }

        $scope.withdrawJiyan = function (friend) {
            $http({
                url: CONSTANT.API_BASE_URL + 'withdrawuser',
                method: "POST",
                data: {
                    "userId": $scope.profile_user._id,
                    "followingsocialId": friend.id
                },
                headers: { 'Content-Type': 'application/json' }
            })
                .then(function (response) {
                    if (response.data.success) {
                        friend.follow = false;
                    }
                },
                    function (response) { // optional
                        console.log("some error occured");
                    });
        }



        $scope.fbLogin = function () {
            if ($scope.profile_user.facebook.length > 0) {
                $scope.getLoginStatus();
            } else if ($scope.profile_user.google.length > 0) {
                $scope.friends = $rootScope.google_friends;
            } else {
                toastr.success("Moving to next step as no Facebook or Gmail friends found");
                $timeout(function () {
                    $("#btn_getFavourite").trigger("click");
                }, 3000);
            }

        };

        $scope.getLoginStatus = function () {
            Facebook.getLoginStatus(function (response) {
                if (response.status === 'connected') {
                    $scope.loggedIn = true;
                    $scope.me(response);
                } else {
                    $scope.loggedIn = false;

                }
            });
        };

        $scope.me = function (data) {
            Facebook.api('/me?fields=id,name,picture,friends,birthday,email,gender,hometown,about', function (response) {
                $scope.friends = response.friends.data;
                $scope.friends.forEach(function (element) {
                    Facebook.api('/' + element.id + '?fields=picture.type(large)&&access_token=' + $rootScope.current_user.fb_acc_token, function (response) {
                        element.picture = response.picture.data.url;
                    });
                }, this);
            });

        }

        $scope.selected = {};

        $scope.getFavourites = function () {
            $rootScope.showLoader = true;
            $http({
                url: CONSTANT.API_BASE_URL + 'getfavourites',
                method: "GET",
            })
                .then(function (response) {

                    if (response.data.success) {
                        $scope.favourites = response.data.data;
                        $timeout(function () {
                            showList();
                            $rootScope.showLoader = false;
                        }, 1500);


                    } else {
                        console.log("err");
                    }

                },
                    function (response) { // optional
                        console.log("some error occured");
                        $scope.favourites = [];
                        $rootScope.showLoader = false;
                    });
        }
        //helpers
        $scope.fileReader = function (element) {
            var files = element.files[0];
            $scope.$apply();
            var reader = new FileReader();
            reader.onload = function () {
                $scope.base64_img = reader.result;
                $scope.$apply();
            }
            reader.readAsDataURL(element.files[0]);
        }

        $scope.selectFavourites = function (favourite) {
            if ($scope.selectedFav.length > 0) {
                for (var i = 0; i < $scope.selectedFav.length; i++) {
                    if ($scope.selectedFav[i]._id == favourite._id) {
                        $scope.selectedFav.splice(i, 1);
                        favourite.selected = false;
                        return false;
                    }
                }
                $scope.selectedFav.push(favourite);
                favourite.selected = true;
            } else {
                $scope.selectedFav.push(favourite);
                favourite.selected = true;
            }
            console.log($scope.selectedFav);
        }

        $scope.selectFriend = function (frnd) {
            if ($scope.selectedFrnds.length > 0) {
                if ($scope.selectedFrnds.indexOf(frnd.id) >= 0) {
                    $scope.selectedFrnds.splice($scope.selectedFrnds.indexOf(frnd.id), 1);
                } else {
                    $scope.selectedFrnds.push(frnd.id);
                }
            } else {
                $scope.selectedFrnds.push(frnd.id);
            }

        }

        $scope.searchfav = function (text) {
            if (text != null && text != "") {
                $http({
                    url: CONSTANT.API_BASE_URL + 'searchfav',
                    data: { name: text },
                    method: "POST",
                })
                    .then(function (response) {

                        if (response.data.success) {
                            $scope.favourites = response.data.data;
                            showList();

                        } else {
                            console.log("err");
                        }

                    },
                        function (response) { // optional
                            console.log("some error occured");
                        });
            }
        }

        var returnDate = function (obj) {
            return new Date(obj.month + "/" + obj.date + "/" + obj.year);
        }

        var showList = function () {
            window.prettyPrint && prettyPrint();
            $('.windowWidh').text($(window).width());
            var slider = $('#responsive').lightSlider({
                item: 6,
                slideMove: 2,
                loop: false,
                cssEasing: 'cubic-bezier(0.25, 0, 0.25, 1)',
                speed: 600,
                controls: false,
                pager: false,
                responsive: [
                    {
                        breakpoint: 800,
                        settings: {
                            item: 3,
                            slideMove: 1,
                            slideMargin: 6,
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            item: 2,
                            slideMove: 1
                        }
                    }
                ],

                onSliderLoad: function () {
                    $('#responsive').removeClass('cS-hidden');
                }
            });

            $('#goToPrevSlide').click(function () {
                slider.goToPrevSlide();
            });
            $('#goToNextSlide').click(function () {
                slider.goToNextSlide();
            });

        };


    }])
