'use strict';

app.controller('AuthCtrl', ['$scope', '$firebaseAuth', '$firebaseArray', 'user', '$location',
  function($scope, $firebaseAuth, $firebaseArray ,$location, user) {
    if (user) {
      $location.path('/');
    }
      var ref= new Firebase('https://dazzling-heat-502.firebaseio.com/');
      $scope.message = null;
      $scope.error = null;
      var Auth = $firebaseAuth(ref);

      $scope.Auth = Auth;

      // if ($scope.user) {
      //   $location.path('/');
      // }

      $scope.currentPath = $location.path();
      console.log($scope.currentPath);

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

    var profile = {
      email: $scope.email,
      pass: $scope.pass,
      username: $scope.username
    };
  $scope.createUser = function() {
      $scope.message = null;
      $scope.error = null;
      Auth.$createUser({
        email: $scope.email,
        password: $scope.password
      }).then(function(authData) {
        $scope.message = 'User created with uid: ' + authData.uid;
        return createProfile(profile, authData);
      }).catch(function(error) {
        $scope.error = error;
      });
    };

    function createProfile(authData, profile){
      var User = $firebaseArray(ref.child('users'));
      return User.$set(authData.uid, profile);
    }


    $scope.login = function() {
      Auth.$authWithPassword({
        email: $scope.email,
        password: $scope.password
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