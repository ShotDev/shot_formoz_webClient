(function() {

var Stage = function(name) {
  this._bands = [];
  this.name = name;
};

Stage.prototype.getBands = function() {
  return this._bands;
};

Stage.prototype.addBand = function(band) {
  this._bands.push(band);
};

Stage.prototype.getEarliestTime = function() {
  var earliestBand = _.min(this._bands, function(band) {
    return band.startTime;
  });

  return earliestBand.startTime;
};

Stage.prototype.assignDate = function(date) {
  this.date = date;
};

Stage.prototype.getTimeSpans = function() {
  var start = this.date.getStartTime()
    , spans = [];

  for (var i = 0; i < this._bands.length; i += 1) {
    var band = this._bands[i]
      , previousBand = this._bands[ i - 1 ];

    pushEmptySpan(band, previousBand);
    pushBandSpan(band);
  };

  return spans;
  function pushEmptySpan (band, previousBand) {
    spans.push({
      type: "empty"
      , name: ""
      , span: getSpanBetween(band, previousBand)
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
    });
  }
};


angular.module("shotFormozWebClientApp").value("Stage", Stage);
}());
