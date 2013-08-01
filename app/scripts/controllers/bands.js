'use strict';

angular.module('shotFormozWebClientApp')
  .controller('BandsController', [
      "$scope"
      , "$rootScope"
      , "$location"
      , "$http"
      , "Facebook"
      , "user"
      , "$cookieStore"
    , function ($scope, $rootScope, $location, $http, Facebook, user, $cookieStore){
    	$scope.init = function () {
    	  if ( ! $cookieStore.get("userId") ) {
    	  	$location.path("/login");
          }else {
          	 console.log('$cookieStore.get("userId")',$cookieStore.get("userId"));
		   	
      	  	if(!user.bands){

	    	   $http.get('/users/'+$cookieStore.get("userId")+'/bands')
	   	      		.success(function (userBands) {
			   	    	user.bands = userBands;
			   	    	console.log('user.bands',user.bands);
		   	
			   	    	getAllBands();
			   	    }); 
    	  	}else{
    	  		getAllBands();
    	  	}
   	      
	      	
   	      	
   	  	  }
		   
		};
		$scope.bandClick = function (theBand){
			if(theBand.selected)
			{
				theBand.selected = false;
				var index = user.bands.indexOf(theBand);
				user.bands.splice(index, 1);
			}	
			else{
				theBand.selected = true;
				user.bands.push(theBand);
			}
				
			console.log('band', theBand.name, theBand.selected); 
			
		};
		$scope.submitBandList = function (){
  		if(user.bands.lengh==0){
  
  		}else{
  		   var bandList = new Array();
         var userId = $cookieStore.get("userId");
  		   user.bands.forEach(function (theBand){
  		   		bandList.push(theBand.id);
  		   }); 
  
  		   console.log('/users/'+ userId +'/bands'); 
  		   $http({
  	            url: '/users/'+ userId +'/bands',
  	            method: "POST",
  	            data: {band_ids:bandList}
          	}).success(function (data, status, headers, config) {
          		user.bands = data; // assign  $scope.persons here as promise is resolved here
              $location.path("/schedule");
            }).error(function (data, status, headers, config) {
              $location.path("/login");
            });

		}
		}
		function getAllBands(){
			$http.get('/bands').success(function (allBands) {
		   	   user.bands.forEach( function (band){
		   	      var index = allBands.indexOf(band);
		   	      if(index >=0 )
		   	      	allBands[index].selected = true;
		   	    })
                $scope.bands = allBands;
            });	
		}
    	
 }]);
