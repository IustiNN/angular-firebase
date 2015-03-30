'use strict';

app. factory('Post', ['$resource', function ($resource) {

    return $resource('https://dazzling-heat-502.firebaseio.com/posts/:id.json');
}]);