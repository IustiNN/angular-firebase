'use strict';

app.factory('Auth', ['$firebaseAuth', function($firebaseAuth) {
  var ref = new Firebase('https://dazzling-heat-502.firebaseio.com/');
  
  return $firebaseAuth(ref); 
}
]);


  
  
 
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