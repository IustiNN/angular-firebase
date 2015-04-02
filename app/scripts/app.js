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
   .run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the home page
      if (error === 'AUTH_REQUIRED') {
        $location.path('/main');  
      }
    });
}])
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
  .when('/account', {
    // the rest is the same for ui-router and ngRoute...
    controller: 'AccountCtrl',
    templateUrl: 'views/account.html',
    resolve: {
      // controller will not be loaded until $requireAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      'currentAuth': ['Auth', function(Auth) {
        // $requireAuth returns a promise so the resolve waits for it to complete
        // If the promise is rejected, it will throw a $stateChangeError (see above)
        return Auth.$requireAuth();
      }]
    }
  })
  .otherwise({
    redirectTo: '/'
  });
});

