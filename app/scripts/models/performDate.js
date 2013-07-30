(function() {

var PerformDate = function(dateString) {
  this.name = dateString;
  this._stages = [];
};

PerformDate.prototype.getStages = function() {
  return this._stages;
};

PerformDate.prototype.addStage = function(stage) {
  this._stages.push(stage);
  stage.assignDate(this);
};

angular.module("shotFormozWebClientApp").value("PerformDate", PerformDate);
}());
