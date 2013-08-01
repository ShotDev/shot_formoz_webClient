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

      var dateIndex;

      $scope.performDates = [];
      $http.get(baseUrl + "/users/" + $cookieStore.get("userId") + "/bands")
        .success(function(bandInfos) {
          var bands = [];
          _.each(bandInfos, function(bandInfo) {
            bands.push(new Band(bandInfo));
          });

          $scope.performDates = Band.groupByPerformDateAndStage(bands);
          dateIndex = 0;
        });

      $scope.getCurrentPerformDate = function() {
        return $scope.performDates[dateIndex];
      };

      $scope.moveIndexBackward = function() {
        if ( dateIndex == 0 ) {
          return;
        }
        dateIndex --;
      };

      $scope.moveIndexForward = function() {
        if ( dateIndex == $scope.performDates.length - 1 ) {
          return;
        }
        dateIndex ++;
      };

      $scope.hasPreviousDate = function() {
        return dateIndex > 0;
      };

      $scope.hasNextDate = function() {
        return dateIndex < ($scope.performDates.length - 1);
      };
      
  }]);
