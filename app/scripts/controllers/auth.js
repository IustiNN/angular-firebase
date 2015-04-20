'use strict';

app.controller('AuthCtrl', ['$scope', 'Auth', 'User', '$location',
  function($scope, Auth, $location, User) {
      $scope.message = null;
      $scope.error = null;
      $scope.Auth = Auth;
      $scope.user = Auth.user;

      // if ($scope.user) {
      //   $location.path('/');
      // }

      // $scope.currentPath = $location.path();
      // console.log($scope.currentPath);
      Auth.user = {};

  // any time auth status updates, add the user data to scope
    Auth.$onAuth(function(authData) {
      $scope.authData = authData;
      if (authData) {
        console.log('Logged in as:', authData.uid);
        console.log('sa vedem: ' + Auth.user);
      } else {
        console.log('Logged out');
      }
    });

  $scope.createUser = function() {
      $scope.message = null;
      $scope.error = null;
      Auth.$createUser({
        email: $scope.user.email,
        password: $scope.user.password
      }).then(function(userData) {
        $scope.message = 'User created with uid: ' + userData.uid;
        return $scope.createProfile();
      }).catch(function(error) {
        $scope.error = error;
      });
    };

    $scope.createProfile = function () {
      var profile = {
        username: $scope.user.username,
        email: $scope.user.email,
        password: $scope.user.password
      };
      return User.create(profile);
    };



    $scope.login = function() {
      Auth.$authWithPassword({
        email: $scope.user.email,
        password: $scope.user.password
      },{rememberMe: true}).then(function(authData) {
        console.log('Logged in as:', authData.uid);
        $location.path('/posts');
      }).catch(function(error) {
        console.error('Authentication failed:', error);
      });
    };
    $scope.loginFacebook = function() {
      Auth.$authWithOAuthPopup('facebook').then(function(authData) {
        console.log('Logged in as:', authData.uid);
        $location.path('/posts');
      }, { remember: 'sessionOnly',
    scope: 'email,user_likes'}).catch(function(error) {
        console.error('Authentication failed:', error);
      });
    };

    $scope.logout = function() {
      Auth.unauth();
    };

}]);
