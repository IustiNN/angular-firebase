'use strict';

/**
 * @ngdoc function
 * @name angularFirebaseApp.controller:PostsCtrl
 * @description
 * # PostsCtrl
 * Controller of the angularFirebaseApp
 */
app
  .controller('PostsCtrl',['$scope', 'Post', function ($scope, Post) {
    var posts = Post.all;
    $scope.post = {url: 'http://', 'title': ''};

   $scope.submitPost = function () {
      Post.create($scope.post).then(function() {
        $scope.post = {url: 'http://', 'title': ''};
      });
  };
    $scope.deletePost = function (post) {
      return posts.$remove(post);
    };
    $scope.posts = posts;
  }]);
