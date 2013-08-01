(function() {

angular.module("shotFormozWebClientApp").factory("Band", ["PerformDate", "Stage"
  , function(PerformDate, Stage) {
  
  var Band = function(bandData) {
    this.name = bandData.name;
    if ( ! bandData.start_time || ! bandData.end_time) {
      throw new Error("start_time and end_time must be given to create a band.");
    }
    this.startTime = new Date(bandData.start_time);
    this.endTime = new Date(bandData.end_time);
    this.stage = bandData.stage;
  };

  Band.groupByPerformDateAndStage = function(bands) {
    var bandsGroupByDate = _.groupBy(bands, function(band) {
      return band.startTime.getDate();
    });
    var dates = [];

    _.each(bandsGroupByDate, function(bandsOfTheDay, date) {
      var performDate = new PerformDate("8/" + date);
      var bandsGroupByStage = _.groupBy(bandsOfTheDay, function(band) {
        return band.stage;
      });

      _.each(bandsGroupByStage, function(bandsOfTheStage, stageName) {
        var stage = new Stage(stageName);
        _.each(bandsOfTheStage, function(band) {
          stage.addBand(band);
        });
        performDate.addStage(stage);
      });
      
      dates.push(performDate);
    });


    return dates;
  }

  return Band;
} ]);
}());
