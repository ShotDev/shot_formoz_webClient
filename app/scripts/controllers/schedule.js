'use strict';

angular.module('shotFormozWebClientApp')
  .controller('ScheduleController', [
      "$scope"
      , "$http"
      , "user"
    , function ($scope, $http, user) {
      $scope.HOURS = [ 5, 6, 7, 8, 9, 10, 11 ];

      $http.get(baseUrl + "/users/" + user.id + "/bands")
        .success(function(bands) {
          console.log(bands);
          $scope.bands = bands;
        });
  }]);
