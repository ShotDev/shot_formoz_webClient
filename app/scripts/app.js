'use strict';

var app = angular.module('shotFormozWebClientApp', [])
  .config(function ($routeProvider,$locationProvider) {
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

  };

  // Load the SDK asynchronously
  (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
   }(document));
});
app.factory('Facebook', function($rootScope, $q) {

    return {
      login: function() {

        var resp = $q.defer();

        FB.login(function(response) {
          setTimeout(function() {
            $rootScope.$apply(function() {
              resp.resolve(response.authResponse);
            });
          },1);
        });

        $rootScope.Facebook.token = resp.promise;


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
