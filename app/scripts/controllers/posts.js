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
    $scope.post = {'url': 'http://', 'title': ''};

   $scope.submitPost = function () {
      Post.create($scope.post).then(function(ref) {
        console.log('Created post:' + $scope.post + 'At: ' + Firebase.ServerValue.TIMESTAMP);
        $location.path('/posts/' + ref.name());
        $scope.post = {url: 'http://', title: ''};
      });
  };
    $scope.deletePost = function (post) {
      Post.delete(post);
    };
    $scope.posts = posts;


  }]);
