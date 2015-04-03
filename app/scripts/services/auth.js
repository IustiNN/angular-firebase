'use strict';
app.factory('Auth', ['$firebaseAuth', function($firebaseAuth) {
  var ref = new Firebase('https://dazzling-heat-502.firebaseio.com/');
  var auth = $firebaseAuth(ref);
  
  var Auth = {

    createUser : function(user) {
      return auth.$createUser({
        password: user.pass,
        email: user.email
      }).then(function(authData) {
         console.log('User ' + authData.uid + ' created successfully!');
        return auth.$authWithPassword({
          email: 'my@email.com',
          password: 'mypassword'
        });
      }).then(function(authData) {
        console.log('Logged in as:', authData.uid);
      }).catch(function(error) {
        console.error('Error: ', error);
      });
    },

    checkLogin : auth.$onAuth(function(authData) {
    if (authData) {
      console.log('Logged in as:', authData.uid);
      return authData;
    } else {
      console.log('Logged out');
    }
  }),

    loginUser : function (user) {
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

  return Auth;


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