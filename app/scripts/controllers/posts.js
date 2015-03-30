'use strict';

/**
 * @ngdoc function
 * @name angularFirebaseApp.controller:PostsCtrl
 * @description
 * # PostsCtrl
 * Controller of the angularFirebaseApp
 */
app
  .controller('PostsCtrl', function ($scope, Post) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    //store posts
    $scope.posts = [];

    //post object
    $scope.post = {
        url: 'http://',
        title: ''
    };

    //insert new posts
    $scope.submitPost = function() {
        Post.save($scope.post, function (ref) {
      $scope.posts[ref.name] = $scope.post;
      $scope.post = {url: 'http://', title: ''};
});
        
    };

    //delete a post
    $scope.deletePost = function (postId) {
      Post.delete({id: postId}, function () {
        delete $scope.posts[postId];
      });
    };
  });
