'use strict';

angular.module('shotFormozWebClientApp')
  .controller('ScheduleController', [
      "$scope"
      , "$http"
      , "user"
      , "PerformDate"
      , "Stage"
      , "Band"
    , function ($scope, $http, user, PerformDate, Stage, Band) {
      $scope.performDates = [];

      $http.get(baseUrl + "/users/" + user.id + "/bands")
        .success(function(bandInfos) {
          var bands = [];
          _.each(bandInfos, function(bandInfo) {
            bands.push(new Band(bandInfo));
          });

          $scope.performDates = Band.groupByPerformDateAndStage(bands);
          $scope.currentPerformDate = $scope.performDates[0];
        });
  }]);
