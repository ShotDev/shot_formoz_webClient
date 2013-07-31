(function() {

var Stage = function(name) {
  this._bands = [];
  this.name = name;
};

Stage.prototype.getBands = function() {
  return this._bands;
};

Stage.prototype.addBand = function(band) {
  Stage.cacheSpans = null;
  this._bands.push(band);

  this._bands = _.sortBy(this._bands, function(band) {
    return band.startTime;
  });
};

Stage.prototype.getEarliestTime = function() {
  var earliestBand = _.min(this._bands, function(band) {
    return band.startTime;
  });

  return earliestBand.startTime;
};

Stage.prototype.assignDate = function(date) {
  Stage.cacheSpans = null;
  this.date = date;
};


Stage.cacheSpans = null;
Stage.prototype.getTimeSpans = function() {
  if ( Stage.cacheSpans ) {
    return Stage.cacheSpans;
  }

  
  var start = this.date.getStartTime()
    , spans = [];

  for (var i = 0; i < this._bands.length; i += 1) {
    var band = this._bands[i]
      , previousBand = this._bands[ i - 1 ];

    pushEmptySpan(band, previousBand);
    pushBandSpan(band);
  };

  Stage.cacheSpans = spans;
  return spans;

  function pushEmptySpan (band, previousBand) {
    spans.push({
      type: "empty"
      , name: ""
      , span: getSpanBetween(band, previousBand)
      , startTime: ""
      , endTime: ""
    }); 
  }
  function getSpanBetween (band, previousBand) {
    var previousEndTime = previousBand ? previousBand.endTime : start;

    return ( band.startTime - previousEndTime ) / ( 1000 * 60 * 10 );
  }
  function pushBandSpan (band) {
    spans.push({
      type: "band"
      , name: band.name
      , span: ( band.endTime - band.startTime ) / ( 1000 * 60 * 10 )
      , startTime: getTimeString(band.startTime)
      , endTime: getTimeString(band.endTime)
    });
  }
  function getTimeString (date) {
    var hour = date.getHours() == 0 ? "00" : date.getHours()
      , minute = date.getMinutes() == 0 ? "00" : date.getMinutes();

    return hour + ":" + minute;
  }
};


angular.module("shotFormozWebClientApp").value("Stage", Stage);
}());
