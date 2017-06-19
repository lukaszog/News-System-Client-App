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
    'ngTagsInput',
    'angular-storage',
    'angular-jwt'
  ])
  .config(function ($routeProvider, $httpProvider) {
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
        controllerAs: 'newsdashboard',
        auth: true
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .when('/logout', {
        template: ' ',
        controller: ['$scope', '$http', '$location', 'store', '$rootScope',
          function ($scope, $http, $location, store, $rootScope) {
            // Remove token from local storage
            store.remove('access_token');
            // Invalidate token on backend side
            $http.get('http://localhost:8080' + '/oauth/revoke-token');
            $rootScope.loggedIn = false;
            $location.path('/login');
          }
        ]
      })
      .otherwise({
        redirectTo: '/'
      });
      $httpProvider.interceptors.push('AuthenticationHttpInterceptor');

  })
  .service('AuthenticationHttpInterceptor', ['store','$rootScope', function(store, $rootScope) {
    this.request = function(config) {

      if(store.get('access_token')) {
        config.headers.Authorization = 'Bearer ' + store.get('access_token');
        $rootScope.loggedIn = true;
      }
      return config;
    };
  }]).run(function (store, $rootScope, $location, $route) {
  $rootScope.$on('$locationChangeStart', function (e, next, current) {
    var nextPath = $location.path();
    var nextRoute = $route.routes[nextPath];
    if(nextRoute && nextRoute.auth && !store.get('access_token')) {
      e.preventDefault();
      $location.path('/login');
    }
  });
})
  .config(['$qProvider', function ($qProvider) {
  $qProvider.errorOnUnhandledRejections(false);
}]);
