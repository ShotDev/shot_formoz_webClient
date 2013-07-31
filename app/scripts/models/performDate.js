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

PerformDate.prototype.getStartTime = function() {
  var earliestPerformTime = _.min(this._stages, function(stage) {
    return stage.getEarliestTime();
  }).getEarliestTime();

  return new Date(
    earliestPerformTime.getFullYear()
    , earliestPerformTime.getMonth() 
    , earliestPerformTime.getDate()
    , earliestPerformTime.getHours()
  );
};

angular.module("shotFormozWebClientApp").value("PerformDate", PerformDate);
}());
