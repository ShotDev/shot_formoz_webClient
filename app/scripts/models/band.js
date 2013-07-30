(function() {

var Band = function(bandData) {
  this.name = bandData.name;
  if ( ! bandData.start_time || ! bandData.end_time) {
    throw new Error("start_time and end_time must be given to create a band.");
  }
  this.startTime = new Date(bandData.start_time);
  this.endTime = new Date(bandData.end_time);
};
  
angular.module("shotFormozWebClientApp").value("Band", Band);
}());
