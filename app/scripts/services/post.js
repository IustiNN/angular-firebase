'use strict';

app.factory('Post', function ($firebaseArray) {
  var ref = new Firebase('https://dazzling-heat-502.firebaseio.com/');
  var posts = $firebaseArray(ref.child('posts'));
  var Post = {
  	all: posts,
  	create: function (post) {
      return posts.$add(post);
    },
    get: function (postId) {
    	console.log($firebaseArray(ref.child('posts').child(postId)));
      return $firebaseArray(ref.child('posts').child(postId));
    },
    delete: function (post) {
      posts.$remove(post);
    }
  };
  return Post;
});
