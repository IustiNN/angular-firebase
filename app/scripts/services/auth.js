'use strict';

app.factory('Auth', ['$firebaseAuth', '$scope', function($firebaseAuth, $scope) {
  var ref = new Firebase('https://dazzling-heat-502.firebaseio.com/');
  var auth = $firebaseAuth(ref);
  
  var Auth = {

    createUser : function(user) {
      return auth.$createUser({
        email: user.email,
        password: user.pass
      });
    },

    loginUser : function (user) {
    $scope.authData = null;
     return auth.$authWithPassword({
     email: user.email,
     password: user.password
   },{rememberMe: true});
  },

  logoutUser : function () {
   return auth.$unauth();
   // if(Auth.user && Auth.user.profile) {
   //   Auth.user.profile.$destroy();
   // }
   // angular.copy({}, Auth.user);
  }, 

    changePassword : function() {
     return auth.$changePassword({
       email: 'my@email.com',
       oldPassword: 'mypassword',
       newPassword: 'otherpassword'
     }).then(function() {
       console.log('Password changed successfully!');
     }).catch(function(error) {
       console.error('Error: ', error);
     });
   },
   user: {}
  };

  return {
    Auth,
    auth
  };


}]);





// var Auth = {};
// Auth.login = function(email, password) {
//   auth.login('password', {
//     email : email,
//     password : password
//   });
// };
// Auth.logout = function() {
//   auth.logout();
// };
// Auth.getBase = function() {
//   return ref;
// };

//   $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
//     console.log('logged in');
//     angular.copy(user, Auth.user);
//   });
//   $rootScope.$on('$firebaseSimpleLogin:logout', function() {
//     console.log('logged out');
//     angular.copy({}, Auth.user);
//   });


//   return Auth;
// }]);