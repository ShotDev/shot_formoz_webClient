'use strict';

angular.module('shotFormozWebClientApp')
  .controller('ScheduleController', [
      "$scope"
      , "$http"
      , "user"
    , function ($scope, $http, user) {
      var date0802Start = new Date("2013-08-02 11:00:00")
        , date0802End = new Date("2013-08-03 04:00:00")
        , date0803Start = new Date("2013-08-03 11:00:00")
        , date0803End = new Date("2013-08-04 04:00:00")
        , date0804Start = new Date("2013-08-04 11:00:00")
        , date0804End = new Date("2013-08-05 04:00:00");

      $scope.HOURS = [ "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"
        , "21", "22", "23", "00", "02", "03", "04"];

      var bandStore = {
        "8/2": {}
        , "8/3": {}
        , "8/4": {}
      };
      $scope.schedule = {};

      $http.get(baseUrl + "/users/" + user.id + "/bands")
        .success(function(bands) {
          groupBands(bands);
          sortBandStore();

          scheduleBands();
        });

      function groupBands (bands) {
        _.each(bands, function(band) {
          bandStore[getDate(band)][band.stage] 
            = bandStore[getDate(band)][band.stage] || [];
          bandStore[getDate(band)][band.stage].push(band);
        });
      }

      function getDate (band) {
        var date = new Date(band.start_time);
        if ( date < date0803Start ) {
          return "8/2";
        } else if ( date >= date0804Start ) {
          return "8/4";
        } else {
          return "8/3";
        }
      }
      function sortBandStore () {
        _.each(bandStore, function(stagesOfDate) {
          _.each(stagesOfDate, function(bands, stage) {
            stagesOfDate[stage] = _.sortBy(bands, function(band) {
              return new Date(band.start_time);
            });
          });
        });
      }

      function scheduleBands () {
        $scope.schedule["8/2"] = createTimeSpan(date0802Start, date0802End, bandStore["8/2"]);
        $scope.schedule["8/3"] = createTimeSpan(date0803Start, date0803End, bandStore["8/3"]);
        $scope.schedule["8/4"] = createTimeSpan(date0804Start, date0804End, bandStore["8/4"]);
        console.log($scope.schedule);
        
        
      }

      function createTimeSpan (startDate, endDate, stageBandMap) {
        var stageTimeSpans = [];
        _.each(stageBandMap, function(bands, stageName) {
          var spans = {
            stage: stageName
            , timeSpans: []
          };
          stageTimeSpans.push(spans);

          for (var i = 0; i < bands.length; i += 1) {
            var band = bands[i], previousEndDate, currentStartDate, currentEndDate;
            
            if ( ! bands[ i - 1 ] ) {
              previousEndDate = startDate;
            } else {
              previousEndDate = new Date(bands[ i - 1 ].end_time);
            }
            currentStartDate = new Date(band.start_time);
            currentEndDate = new Date(band.end_time);

            // span between previous band
            spans.timeSpans.push({
              span: diffIn10Minutes(currentStartDate, previousEndDate)
              , name: ""
              , type: "empty"
              , getCSS: function() {
                return "height-" + this.span + "0 empty"
              }
            });
            // span of current band
            spans.timeSpans.push({
              span: diffIn10Minutes(currentEndDate, currentStartDate)
              , name: band.name
              , type: "band"
              , getCSS: function() {
                return "height-" + this.span + "0 band"
              }
            });

          };
        });
        return stageTimeSpans;
      }

      function diffIn10Minutes (later, earlier) {
        return ( later - earlier ) / (1000 * 60 * 10);
      }


  }]);
