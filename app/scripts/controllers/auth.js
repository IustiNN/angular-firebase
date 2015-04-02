'use strict';

app.controller('AuthCtrl', ['$scope', '$firebaseArray', 'Auth', '$location',
  function($scope, Auth, $location, $firebaseArray) {
      $scope.message = null;
      $scope.error = null;
      $scope.auth = Auth;
      
// any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
    });




$scope.createUser = function() {
    Auth.$createUser({
      email: $scope.email,
      password: $scope.password,
      username: $scope.username
    }).then(function(userData) {
      $scope.message = 'User created with uid: ' + userData.uid;
      console.log($scope.message);
      // authenticate so we have permission to write to Firebase
      // redirect to the account page
      $location.path('/posts');
      return $scope.auth.$authWithPassword({ email: $scope.email, password: $scope.password });
    }).catch(function(error) {
      $scope.error = error;
      console.log($scope.error);      
    });
  };

$scope.createProfile = function () {
  var profile = {
    username: $scope.username,
    md5_hash: $scope.md5_hash
  };

  var profileRef = $firebaseArray(ref.child('profile'));
  return profileRef.$set(user.uid, profile);
};


$scope.changePassword = function() {
  Auth.$changePassword({
  email: 'my@email.com',
  oldPassword: 'mypassword',
  newPassword: 'otherpassword'
}).then(function() {
  console.log('Password changed successfully!');
}).catch(function(error) {
  console.error('Error: ', error);
});
};

$scope.loginUser = function () {
  Auth.$authWithPassword({
    email: $scope.email,
    password: $scope.password
  }).then(function() {
    console.log('Logged in as: from login method');
       $location.path('/posts');

  }).catch(function(error) {
    $scope.wrongPass = true;
    console.error('Authentication failed:', error);
  });
};

$scope.logoutUser = function () {
  Auth.$unauth();
};


return Auth;
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

}]);