'use strict';

/**
 * @ngdoc function
 * @name angularFirebaseApp.controller:PostsCtrl
 * @description
 * # PostsCtrl
 * Controller of the angularFirebaseApp
 */
app
  .controller('PostsCtrl',['$scope', '$location', 'Post', function ($scope, $location, Post) {
    var posts = Post.all;
    $scope.post = {'url': 'http://', 'title': '', 'timestamp': Firebase.ServerValue.TIMESTAMP};

   $scope.submitPost = function () {
      Post.create($scope.post).then(function(ref) {
        console.log('Created post:' + $scope.post + 'At: ' + Firebase.ServerValue.TIMESTAMP);
        $location.path('/posts/' + ref.name());
      });
  };
    $scope.deletePost = function (post) {
      return posts.$remove(post);
    };
    $scope.posts = posts;


  }]);
