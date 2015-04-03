'use strict';

app.controller('AuthCtrl', ['$scope', 'Auth', '$location',
  function($scope, Auth, $location) {
      $scope.message = null;
      $scope.error = null;
      // $scope.Auth = Auth;
      // $scope.user = Auth.user;
      $scope.authData = Auth.checkLogin();
      // $scope.sharedValue = sharedProperties.getObject.status;
      if ($scope.user) {
        $location.path('/');
      }
  // any time auth status updates, add the user data to scope
  //   Auth.$onAuth(function(authData) {
  //     $scope.authData = authData;

  // console.log(Auth.user);
  //     console.log(authData);
  //   });
  
    $scope.createUser = function() {
      Auth.createUser($scope.user).then(function(userData) {
      $scope.message = 'User created with uid: ' + userData.uid + 'and ' + userData.password.email;
      console.log($scope.message);
      // authenticate so we have permission to write to Firebase
      // redirect to the account page
      // $location.path('/posts');
      // return Auth.loginUser($scope.user);

    });
    };

    $scope.loginUser = function() {
      Auth.loginUser($scope.user).then(function() {
     console.log('Logged in as:'+ $scope.user.email  +' from login method');
     console.log($scope.user);
     $location.path('/posts');

   }).catch(function(error) {
     console.error('Authentication failed:', error);
   });
    };

    $scope.logoutUser = function() {
      Auth.logoutUser();
    };



}]);

