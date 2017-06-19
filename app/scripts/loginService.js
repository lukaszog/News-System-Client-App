angular.module('newsClientApp').factory('loginService', ['$http', '$httpParamSerializer',
function ($http, $httpParamSerializer) {
    return {
        login : function(uname, pwd) {
          var data = {
              grant_type:"password",
              username: uname,
              password: pwd,
              client_id: "clientIdPassword"
          };
          var request = {
             method: 'POST',
             url: 'http://localhost:8080' + '/oauth/token',
             headers: {
                 "Authorization": "Basic " + btoa("clientIdPassword:secret"),
                 "Content-type": "application/x-www-form-urlencoded; charset=utf-8"
             },
             data: $httpParamSerializer(data)
           };
           return $http(request);
        }
    };
}]);

