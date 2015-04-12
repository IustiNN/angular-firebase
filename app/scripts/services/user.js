'use strict';

app.factory('User', function ($firebaseArray) {
  var ref = new Firebase('https://dazzling-heat-502.firebaseio.com/');
  var users = $firebaseArray(ref.child('users'));
  var User = {
  	all: users,
  	create: function (user) {
      return users.$add(user);
    },
    get: function (userId) {
    	console.log($firebaseArray(ref.child('users').child(userId)));
      return $firebaseArray(ref.child('users').child(userId));
    },
    delete: function (user) {
      user.delete(user);
    }
  };

  return User;
});