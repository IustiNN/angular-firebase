/* global app:true */
/* exported app */
'use strict';

/**
 * @ngdoc overview
 * @name angularFirebaseApp
 * @description
 * # angularFirebaseApp
 *
 * Main module of the application.
 */
 var app = angular
 .module('angularFirebaseApp', [
  'ngAnimate',
  'firebase',
  'ngAria',
  'ngCookies',
  'ngMessages',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch'
  ])
 .constant('FIREBASE_URL', 'https://dazzling-heat-502.firebaseio.com/')
 .config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  })
  .when('/about', {
    templateUrl: 'views/about.html',
    controller: 'AboutCtrl'
  }) 
  .when('/contact', {
    templateUrl: 'views/contact.html',
    controller: 'ContactCtrl'
  })
  .when('/posts/:postId', {
    templateUrl: 'views/showpost.html',
    controller: 'PostViewCtrl'
  })
  .when('/contact', {
    templateUrl: 'views/contact.html',
    controller: 'ContactCtrl'
  })
  .when('/posts', {
    templateUrl: 'views/posts.html',
    controller: 'PostsCtrl'
  })
  .when('/register', {
    templateUrl: 'views/register.html',
    controller: 'AuthCtrl'
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'AuthCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
});
