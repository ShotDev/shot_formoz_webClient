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
    return stage.getStartTime();
  }).getStartTime();

  return new Date(
    earliestPerformTime.getFullYear()
    , earliestPerformTime.getMonth() 
    , earliestPerformTime.getDate()
    , earliestPerformTime.getHours()
  );
};

PerformDate.prototype.getEndTime = function() {
  var lastPerformTime = _.max(this._stages, function(stage) {
    return stage.getEndTime();
  }).getEndTime();

  var lastPerformHour = new Date(
    lastPerformTime.getFullYear()
    , lastPerformTime.getMonth()
    , lastPerformTime.getDate()
    , lastPerformTime.getHours());

  return new Date(lastPerformHour.getTime() + 60 * 60 * 1000);

};

PerformDate.prototype.getHours = function() {
  var totalHours = [ "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"
      , "21", "22", "23", "00", "02", "03", "04"]
    , startTime = this.getStartTime()
    , startHour = startTime.getHours().toString()
    , startIndex = _.indexOf(totalHours, startHour);

  totalHours.splice(0, startIndex);
  return totalHours;
};

angular.module("shotFormozWebClientApp").value("PerformDate", PerformDate);
}());
