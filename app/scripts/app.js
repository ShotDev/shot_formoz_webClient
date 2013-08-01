'use strict';

var app = angular.module('shotFormozWebClientApp', ["ngCookies"])
  .config(function ($routeProvider,$httpProvider) {
    $routeProvider
      .when("/login", {
        templateUrl: "views/login.html"
        , controller: "LoginController"
      })
      .when("/bands", {
        templateUrl: "views/bands.html"
        , controller: "BandsController"
      })
      .when("/schedule", {
        templateUrl: "views/schedule.html"
        , controller: "ScheduleController"
      })
      .otherwise({
        redirectTo: '/bands'
      });
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });

app.run(function ($rootScope, Facebook) {
    // Additional JS functions here
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '591995264185706', // App ID
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });
    FB.Event.subscribe('auth.statusChange', function(response) {
      $rootScope.$broadcast("fb_statusChange", {'status': response.status});
    });
  };

  // Load the SDK asynchronously
  (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
   }(document));
  $rootScope.Facebook = Facebook;
});
app.factory('Facebook', function($rootScope, $q) {

    return {
      getLoginStatus:function () {
        FB.getLoginStatus(function (response) {
          $rootScope.$broadcast("fb_statusChange", {'status':response.status});
        }, true);
      },
      login: function() {
         FB.getLoginStatus(function (response) {
          console.log("FB.getLoginStatus",response);
            
                switch (response.status) {
                    case 'connected':
                        $rootScope.Facebook.token = response.authResponse.accessToken;
                        $rootScope.$broadcast('fb_connected', {facebook_id:response.authResponse.userID});
                        break;
                    case 'not_authorized' || 'unknown':
                        // 'not_authorized' || 'unknown': doesn't seem to work
                        FB.login(function (response) {
                            if (response.authResponse) {
                                $rootScope.Facebook.token = response.authResponse.accessToken;
                                $rootScope.$broadcast('fb_connected', {
                                    facebook_id:response.authResponse.userID,
                                    userNotAuthorized:true
                                });
                            } else {
                                $rootScope.$broadcast('fb_login_failed');
                            }
                        }, {scope:'read_stream, publish_stream, email'});
                        break;
                    default:
                        FB.login(function (response) {
                            if (response.authResponse) {
                                $rootScope.Facebook.token = resp.promise;
                                $rootScope.$broadcast('fb_connected', {facebook_id:response.authResponse.userID});
                                $rootScope.$broadcast('fb_get_login_status');
                            } else {
                                $rootScope.$broadcast('fb_login_failed');
                            }
                        });
                        break;
                }
            }, true);
      },
      logout: function() {

        var resp = $q.defer();

        FB.logout(function(response) {
          setTimeout(function() {
            $rootScope.$apply(function() {
              resp.resolve(response.authResponse);
            });
          },1);
        });

        $rootScope.Facebook.token = null;   

      }
    }
  })
