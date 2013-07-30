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


angular.module("shotFormozWebClientApp").value("Stage", Stage);
}());
