app.factory("GPlusAuthService", function ($q, $window) {
    var signIn;
    signIn = function () {
        var defered = $q.defer();
        $window.signinCallback = function (response) {
            $window.signinCallback = undefined;
            defered.resolve(response);
        };

        gapi.auth.signIn({
            clientid: "104628895635-v3f65f12tqsnsme0acdceer5q9accrju.apps.googleusercontent.com",
            cookiepolicy: "single_host_origin",
            requestvisibleactions: "http://schemas.google.com/AddActivity",
            scope: "https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read",
            callback: "signinCallback"

        }) 
        return defered.promise;
    };
    return { signIn: signIn }


});