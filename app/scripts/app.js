'use strict';

angular.module('shotFormozWebClientApp', [])
  .config(function ($routeProvider) {
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
