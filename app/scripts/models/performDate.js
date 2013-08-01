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
      , "21", "22", "23", "00", "01", "02", "03", "04"]
    , startTime = this.getStartTime()
    , endTime = this.getEndTime()
    , startHour = getHourString(startTime)
    , endHour = getHourString(endTime)
    , startIndex = _.indexOf(totalHours, startHour)
    , endIndex = _.indexOf(totalHours, endHour) == -1 
      ? totalHours.length - 1
      : _.indexOf(totalHours, endHour);

  return totalHours.splice(startIndex, endIndex - startIndex + 2);
};

function getHourString (date) {
  var hourString = date.getHours().toString();
  return hourString.length == 1 ? "0" + hourString : hourString;
}

angular.module("shotFormozWebClientApp").value("PerformDate", PerformDate);
}());
