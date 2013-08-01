'use strict';
angular.module('shotFormozWebClientApp')
  .controller('LoginController', [
      "$scope"
      , "$rootScope"
      , "$location"
      , "$http"
      , "Facebook"
      , "user"
      , "$cookieStore"

    , function ($scope, $rootScope, $location, $http,  Facebook, user, $cookieStore) {
        $scope.init = function (){
          if($rootScope.Facebook.token)
          {
            if(!user.bands)
              Facebook.login();
            else
              redirect();
          } 
        };

        $scope.login = function(){
          if(Facebook.token && user)
          {
            if(user.bands)
              $location.path('/schedule');
            else
              $location.path('/bands');  
          }
          else  
            Facebook.login();
        };
        function redirect(){
           if(user.bands.length == 0 )
              $location.path('/band');
            else
              $location.path('/schedule');
        }
        $rootScope.$on("fb_statusChange", function (event, args) {
          $rootScope.fb_status = args.status;
          
        });
        $rootScope.$on("fb_get_login_status", function () {
          Facebook.getLoginStatus();
        });
        $rootScope.$on("fb_login_failed", function () {
          console.log("fb_login_failed");
        });
        $rootScope.$on("fb_logout_succeded", function () {
          console.log("fb_logout_succeded");
          $rootScope.id = "";
        });
        $rootScope.$on("fb_logout_failed", function () {
          console.log("fb_logout_failed!");
        });
        
        $rootScope.$on("fb_connected", function (event, args) {
          var params = {};

          function authenticateViaFacebook(parameters) {
            //posts user FB data to a server that will check them
            $http.post('/users/login', parameters).success(function (userResponse) {
                user.id = userResponse.id;
                user.bands = userResponse.bands;
                $cookieStore.put("userId", userResponse.id);

                if(userResponse.bands.length == 0 ) {
                  //redirect to band if user do not have band
                  $location.path('/band');
                } else {
                  //redirect to schedule if user have band
                  $location.path("/schedule");
                }
            });
          }
          if (args.userNotAuthorized === true) {
            //if the user has not authorized the app, we must write his credentials in our database
            console.log("user is connected to facebook but has not authorized our app");
            
            params = {
                      'facebook_id':args.facebook_id,
                      'facebook_token':Facebook.token
                    }; 
            console.log("user",params);          
            authenticateViaFacebook(params);
          }
          else {
                console.log("user is connected to facebook and has authorized our app");
                //the parameter needed in that case is just the users facebook id
                params = {
                          'facebook_id':args.facebook_id,
                          'facebook_token':Facebook.token
                        };
                console.log("user",params);
                $scope.facebook_token =  Facebook.token;
                $scope.facebook_id =  args.facebook_id;
                authenticateViaFacebook(params);
          }
        });
  }]);
