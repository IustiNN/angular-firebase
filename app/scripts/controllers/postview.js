'use strict';

app.controller('PostViewCtrl', ['$scope', 'Post', '$routeParams', function ($scope, Post, $routeParams) {
	$scope.post = Post.get($routeParams.postId);
	console.log($scope.posts);
}]);