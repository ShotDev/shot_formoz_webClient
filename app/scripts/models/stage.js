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


angular.module("shotFormozWebClientApp").value("Stage", Stage);
}());
