'use strict';

app.factory('User', function ($firebaseArray) {
  var ref = new Firebase('https://dazzling-heat-502.firebaseio.com/');
  var users = $firebaseArray(ref.child('users'));
  var User = {
  	all: users,
  	create: function (user) {
      return users.$add(user);
    },
    createProfile: function (user) {
      var profile = {
        username: user.username,
        md5_hash: user.md5_hash
      };

      var profileRef = $firebase(ref.child('profile'));
      return profileRef.$set(user.uid, profile);
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