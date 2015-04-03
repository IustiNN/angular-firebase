'use strict';
app.factory('Auth', ['$firebaseAuth', function($firebaseAuth) {
  var ref = new Firebase('https://dazzling-heat-502.firebaseio.com/');
  var auth = $firebaseAuth(ref);
  
  var Auth = {
    isLogged : false,
    createUser : function(user) {
      return auth.$createUser({
        email: user.email,
        password: user.pass
      });
    },

    checkLogin : auth.$onAuth(function(authData) {
    if (authData) {
      console.log('Logged in as:', authData.uid);
      Auth.isLogged = true;
      return authData;
    } else {
      // this.isLogged = false;
      console.log('Logged out');
    }
  }),

    loginUser : function (user) {
     return auth.$authWithPassword({
     email: user.email,
     password: user.password
   },{rememberMe: true}).then(function() {
      Auth.isLogged = true;
   });
  },

  logoutUser : function () {
    this.isLogged = false;
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