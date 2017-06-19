
    angular.module('newsClientApp')
        .controller('LoginController', ['$scope', '$rootScope', 'loginService', '$http', 'store', '$location', function ($scope, $rootScope, loginService, $http, store, $location) {
            $scope.user = {
                username: null,
                password: null
            };

            $scope.login = function () {
                loginService.login($scope.user.username, $scope.user.password)
                  .then(function (result, status, headers, config) {
                    // Saves token to local storage and redirects to "employees" page
                    console.log(result.data.access_token);
                    store.set('access_token', result.data.access_token);
                    $location.path('/add');
                });
            };

    } ]);

