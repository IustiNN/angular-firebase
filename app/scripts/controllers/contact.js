'use strict';

/**
 * @ngdoc function
 * @name angularFirebaseApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the angularFirebaseApp
 */
angular.module('angularFirebaseApp')
  .controller('ContactCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
