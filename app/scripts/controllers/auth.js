'use strict';

app.controller('AuthCtrl', ['$scope', 'Auth', '$location',
  function($scope, Auth, $location) {
      $scope.message = null;
      $scope.error = null;
      $scope.Auth = Auth;
      $scope.user = Auth.user;

      if ($scope.user) {
        $location.path('/');
      }

  // any time auth status updates, add the user data to scope
    Auth.$onAuth(function(authData) {
      $scope.authData = authData;
      if (authData) {
        console.log('Logged in as:', authData.uid);
      } else {
        console.log('Logged out');
      }
    });

  $scope.createUser = function() {
      $scope.message = null;
      $scope.error = null;

      Auth.$createUser({
        email: $scope.email,
        password: $scope.password
      }).then(function(userData) {
        $scope.message = 'User created with uid: ' + userData.uid;
      }).catch(function(error) {
        $scope.error = error;
      });
    };

    $scope.login = function() {
      Auth.$authWithPassword({
        email: $scope.email,
        password: $scope.password
      },{rememberMe: true}).then(function(authData) {
        console.log('Logged in as:', authData.uid);
      }).catch(function(error) {
        console.error('Authentication failed:', error);
      });
    };
    $scope.loginFacebook = function() {
      Auth.$authWithOAuthPopup('facebook').then(function(authData) {
        console.log('Logged in as:', authData.uid);
      }, { remember: 'sessionOnly',
  scope: 'email,user_likes'}).catch(function(error) {
        console.error('Authentication failed:', error);
      });
    };


}]);


