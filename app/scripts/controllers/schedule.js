'use strict';

angular.module('shotFormozWebClientApp')
  .controller('ScheduleController', [
      "$scope"
      , "$http"
      , "$cookieStore"
      , "PerformDate"
      , "Stage"
      , "Band"
      , "$location"
    , function ($scope, $http, $cookieStore, PerformDate, Stage, Band, $location) {

      if ( ! $cookieStore.get("userId") ) {
        $location.path("/login");
        return;
      }

      $scope.performDates = [];
      $http.get(baseUrl + "/users/" + $cookieStore.get("userId") + "/bands")
        .success(function(bandInfos) {
          var bands = [];
          _.each(bandInfos, function(bandInfo) {
            bands.push(new Band(bandInfo));
          });

          $scope.performDates = Band.groupByPerformDateAndStage(bands);
          $scope.currentPerformDate = $scope.performDates[0];
        });
  }]);
