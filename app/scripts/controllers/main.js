/*global Firebase*/
'use strict';

/**
 * @ngdoc function
 * @name angularFirebaseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularFirebaseApp
 */
angular.module('angularFirebaseApp')
  .controller('MainCtrl', function ($scope, $timeout) {
    var rootRef = new Firebase('https://dazzling-heat-502.firebaseio.com/'),
    // https://dazzling-heat-502.firebaseio.com/message
    	childRef = rootRef.child('message');

    childRef.on('value', function(snapshot) {
    	$timeout(function() {
    		var snapshotVal = snapshot.val();
    	console.log(snapshotVal);
    	$scope.message - snapshotVal;
	    });
    	
    })
    	
    $scope.$watch('message.text', function(newValue) {
    	console.log(newValue);	
    });
    $scope.setMessage = function() {
    	childRef.set({
    		user: 'Bob',
    		text: 'Hello World!'
    	})
    }

    $scope.updateMessage = function() {
    	childRef.update({
    		text: 'Bye bye!',
    		age: 13
    	})
    }

    $scope.deleteMessage = function() {
    	childRef.remove();
    }
  });
