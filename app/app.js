'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'myApp.maintenance'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/maintenance'});
}]);
