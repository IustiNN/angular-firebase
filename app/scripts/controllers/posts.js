'use strict';

/**
 * @ngdoc function
 * @name angularFirebaseApp.controller:PostsCtrl
 * @description
 * # PostsCtrl
 * Controller of the angularFirebaseApp
 */
app
  .controller('PostsCtrl', function ($scope) {
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
        $scope.posts.push($scope.post);
        $scope.post = {
            url: 'http://',
            title: ''
        };
    };

    //delete a post
    $scope.deletePost = function (index) {
      $scope.posts.splice(index, 1);
    };
  });
