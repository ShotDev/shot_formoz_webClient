'use strict';

angular.module('shotFormozWebClientApp')
  .controller('BandsController', [
      "$scope"
      , "$rootScope"
      , "$location"
      , "$http"
      , "Facebook"
      , "user"
    , function ($scope, $rootScope, $location, $http,  Facebook, user){
    	$scope.init = function () {
    	  if(user){
    	   	$http.get('/bands').success(function (allBands) {
		   	    console.log('get bands from server',allBands);
		   	    user.bands.forEach( function (band){
		   	      var index = allBands.indexOf(band);
		   	      if(index >=0 )
		   	      	allBands[index].selected = 1;
		   	    })
                $scope.bands = allBands;
            });
    	  }else{
   	      	$location.path('/login');
   	      }	
		   
		};
		$scope.bandClick = function (band){
			
			if(band.selected)
				band.selected = -1;
			else
				band.selected = 1;
			console.log('band', band, band.selected?'band selected':'band not selected'); 
		};
    	
 }]);
