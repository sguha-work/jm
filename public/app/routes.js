var routes = angular.module('appRoutes', ['ngRoute', 'facebook']).config(function ($routeProvider, $locationProvider, FacebookProvider, $httpProvider) {

    $routeProvider.when('/', {
        templateUrl: 'app/view/pages/login.html',
        controller: 'mainCtrl',
        authenticated: false
    })
        .when('/signup', {
            templateUrl: 'app/view/pages/signup.html',
            controller: 'loginCtrl',
            authenticated: false
        })

        .when('/home', {
            templateUrl: 'app/view/pages/home.html',
            controller: 'homeCtrl',
            authenticated: true
        })
        .when('/home/:id', {
            templateUrl: 'app/view/pages/home.html',
            controller: 'homeCtrl',
            authenticated: false
        })
        .when('/about', {
            templateUrl: 'app/view/pages/about.html',
            controller: 'subCtrl',
            controllerAs: 'subjects',
            authenticated: true
        })
        .when('/register', {
            templateUrl: 'app/view/pages/register.html',
            controller: 'regCtrl',
            controllerAs: 'register',
            authenticated: true
        })
        .when('/profile', {
            templateUrl: 'app/view/pages/user/profile.html',
            controller: 'profileCtrl',
            authenticated: true
        })
        .when('/social/:id', {
            templateUrl: 'app/view/pages/user/social.html',
            controller: 'socialCtrl',
            authenticated: false
        })
        .when('/activate/:token', {
            templateUrl: 'app/view/pages/user/activation.html',
            controller: 'activateCtrl',
            authenticated: false
        })
        .when('/editprofile/:id', {
            templateUrl: 'app/view/pages/user/edit_profile.html',
            controller: 'editProfileCtrl',
            authenticated: true
        })
        .when('/logout', {
            authenticated: true
        })
        .when('/test', {
            templateUrl: 'app/view/pages/user/test.html',
            controller: 'testCtrl',
            authenticated: false
        })
        .when('/page', {
            templateUrl: 'app/view/pages/home/index.html',
            controller: 'pageCtrl',
            authenticated: true
        })

        .when('/homepage', {
            templateUrl: 'app/view/pages/home/homepage.html',
            authenticated: true
        })
        // .when('/auth/facebook',{
        //     authenticated: false
        // })
        .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    FacebookProvider.init('122572941785432');
    $httpProvider.interceptors.push('AuthInterceptors');


});

routes.run(['$rootScope', 'authService', '$location', function ($rootScope, authService, $location) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (next.$$route.authenticated == true) {
            if (!authService.isLoggedIn()) {
                event.preventDefault();
                $location.path('/');
            }
        } else if (next.$$route.authenticated == false) {
            if (authService.isLoggedIn()) {
                event.preventDefault();
                $location.path('/home');
            }
        } else {
            console.log("Technical Error Occured");
        }
    });
}]);