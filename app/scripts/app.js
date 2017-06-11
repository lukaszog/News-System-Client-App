'use strict';

/**
 * @ngdoc overview
 * @name newsClientApp
 * @description
 * # newsClientApp
 *
 * Main module of the application.
 */
angular
  .module('newsClientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'RESTService',
    'ngTagsInput'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'NewsController',
        controllerAs: 'newsdashboard'
      })
      .when('/displaynews/:id',{
        templateUrl: 'views/display.html',
        controller: 'NewsDisplayController',
        controllerAs: 'displaydash'
      })
      .when('/tag/:id',{
        templateUrl: 'views/main.html',
        controller: 'NewsController',
        controllerAs: 'newsdashboard'
      })
      .when('/add', {
        templateUrl: 'views/add.html',
        controller: 'NewsController',
        controllerAs: 'newsdashboard'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(['$qProvider', function ($qProvider) {
  $qProvider.errorOnUnhandledRejections(false);
}]);
