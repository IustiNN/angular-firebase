'use strict';

app.controller('AuthCtrl', ['$scope', 'Auth', '$location',
  function($scope, Auth, $location) {
      $scope.message = null;
      $scope.error = null;
      // $scope.Auth = Auth;
      // $scope.user = Auth.user;
      $scope.authData = Auth.checkLogin();
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
      $location.path('/posts');
      return Auth.loginUser($scope.user);

    });
    };

    $scope.loginUser = function() {
      Auth.loginUser($scope.user).then(function(authData) {
     console.log('Logged in as:'+authData.password.email  +' from login method');
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


// app.controller('AuthCtrl', ['$scope', 'Auth', function ($scope, Auth) {
//     $scope.email = null;
//     $scope.password = null;
//     $scope.confirm = null;
//     $scope.createMode = false;
//     $scope.auth = Auth;


//     $scope.auth.$authWithPassword({
//       email: $scope.email,
//       password: $scope.password
//     }).then(function(authData) {
//       console.log('Logged in as:', authData.uid);
//     }).catch(function(error) {
//       console.error('Authentication failed:', error);
//     });
   // any time auth status updates, add the user data to scope
  //   $scope.auth.$onAuth(function(authData) {
  //     $scope.authData = authData;
  //   });

  // $scope.login = function(email, password) {
  //     $scope.err = null;
  //     $scope.auth.$authWithPassword({ email: email, password: password }, {rememberMe: true})
  //       .then(function(/* user */) {
  //         $location.path('/posts');
  //       }, function(err) {
  //         $scope.err = errMessage(err);
  //       });
  //   };


  //   $scope.createAccount = function() {
  //     $scope.err = null;
  //     if( assertValidAccountProps() ) {
  //       var email = $scope.email;
  //       var pass = $scope.password;
  //       // create user credentials in Firebase auth system
  //       $scope.auth.$createUser({email: email, password: pass})
  //         .then(function() {
  //           // authenticate so we have permission to write to Firebase
  //           return $scope.auth.$authWithPassword({ email: email, password: pass });
  //         })
  //         .then(function(/* user */) {
  //           // redirect to the account page
  //           $location.path('/posts');
  //         }, function(err) {
  //           $scope.err = errMessage(err);
  //         });
  //     }
  //   };

  //   function assertValidAccountProps() {
  //     if( !$scope.email ) {
  //       $scope.err = 'Please enter an email address';
  //     }
  //     else if( !$scope.password || !$scope.confirm ) {
  //       $scope.err = 'Please enter a password';
  //     }
  //     else if( $scope.createMode && $scope.password !== $scope.confirm ) {
  //       $scope.err = 'Passwords do not match';
  //     }
  //     return !$scope.err;
  //   } 

  //   function errMessage(err) {
  //     return angular.isObject(err) && err.code? err.code : err + '';
  //   }

  //   function firstPartOfEmail(email) {
  //     return ucfirst(email.substr(0, email.indexOf('@'))||'');
  //   }

  //   function ucfirst (str) {
  //     // inspired by: http://kevin.vanzonneveld.net
  //     str += '';
  //     var f = str.charAt(0).toUpperCase();
  //     return f + str.substr(1);
  //   }
