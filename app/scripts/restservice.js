'use strict';

var path = '';

(function (window) {
  {
    var unknown = '-';

    // screen
    var screenSize = '';
    if (screen.width) {
      var width = (screen.width) ? screen.width : '';
      var height = (screen.height) ? screen.height : '';
      screenSize += '' + width + " x " + height;
    }

    // browser
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browser = navigator.appName;
    var version = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;

    // Opera
    if ((verOffset = nAgt.indexOf('Opera')) != -1) {
      browser = 'Opera';
      version = nAgt.substring(verOffset + 6);
      if ((verOffset = nAgt.indexOf('Version')) != -1) {
        version = nAgt.substring(verOffset + 8);
      }
    }
    // Opera Next
    if ((verOffset = nAgt.indexOf('OPR')) != -1) {
      browser = 'Opera';
      version = nAgt.substring(verOffset + 4);
    }
    // Edg;
    else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
      browser = 'Microsoft Edge';
      version = nAgt.substring(verOffset + 5);
    }
    // MSIE
    else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
      browser = 'Microsoft Internet Explorer';
      version = nAgt.substring(verOffset + 5);
    }
    // Chrome
    else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
      browser = 'Chrome';
      version = nAgt.substring(verOffset + 7);
    }
    // Safari
    else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
      browser = 'Safari';
      version = nAgt.substring(verOffset + 7);
      if ((verOffset = nAgt.indexOf('Version')) != -1) {
        version = nAgt.substring(verOffset + 8);
      }
    }
    // Firefox
    else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
      browser = 'Firefox';
      version = nAgt.substring(verOffset + 8);
    }
    // MSIE 11+
    else if (nAgt.indexOf('Trident/') != -1) {
      browser = 'Microsoft Internet Explorer';
      version = nAgt.substring(nAgt.indexOf('rv:') + 3);
    }
    // Other browsers
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
      browser = nAgt.substring(nameOffset, verOffset);
      version = nAgt.substring(verOffset + 1);
      if (browser.toLowerCase() == browser.toUpperCase()) {
        browser = navigator.appName;
      }
    }
    // trim the version string
    if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

    majorVersion = parseInt('' + version, 10);
    if (isNaN(majorVersion)) {
      version = '' + parseFloat(navigator.appVersion);
      majorVersion = parseInt(navigator.appVersion, 10);
    }

    // mobile version
    var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

    // cookie
    var cookieEnabled = (navigator.cookieEnabled) ? true : false;

    if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
      document.cookie = 'testcookie';
      cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
    }

    // system
    var os = unknown;
    var clientStrings = [
      {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
      {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
      {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
      {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
      {s:'Windows Vista', r:/Windows NT 6.0/},
      {s:'Windows Server 2003', r:/Windows NT 5.2/},
      {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
      {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
      {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
      {s:'Windows 98', r:/(Windows 98|Win98)/},
      {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
      {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
      {s:'Windows CE', r:/Windows CE/},
      {s:'Windows 3.11', r:/Win16/},
      {s:'Android', r:/Android/},
      {s:'Open BSD', r:/OpenBSD/},
      {s:'Sun OS', r:/SunOS/},
      {s:'Linux', r:/(Linux|X11)/},
      {s:'iOS', r:/(iPhone|iPad|iPod)/},
      {s:'Mac OS X', r:/Mac OS X/},
      {s:'Mac OS', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
      {s:'QNX', r:/QNX/},
      {s:'UNIX', r:/UNIX/},
      {s:'BeOS', r:/BeOS/},
      {s:'OS/2', r:/OS\/2/},
      {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
    ];
    for (var id in clientStrings) {
      var cs = clientStrings[id];
      if (cs.r.test(nAgt)) {
        os = cs.s;
        break;
      }
    }

    var osVersion = unknown;

    if (/Windows/.test(os)) {
      osVersion = /Windows (.*)/.exec(os)[1];
      os = 'Windows';
    }

    switch (os) {
      case 'Mac OS X':
        osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
        break;

      case 'Android':
        osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
        break;

      case 'iOS':
        osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
        osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
        break;
    }

    // flash (you'll need to include swfobject)
    /* script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js" */
    var flashVersion = 'no check';
    if (typeof swfobject != 'undefined') {
      var fv = swfobject.getFlashPlayerVersion();
      if (fv.major > 0) {
        flashVersion = fv.major + '.' + fv.minor + ' r' + fv.release;
      }
      else  {
        flashVersion = unknown;
      }
    }
  }

  window.jscd = {
    screen: screenSize,
    browser: browser,
    browserVersion: version,
    browserMajorVersion: majorVersion,
    mobile: mobile,
    os: os,
    osVersion: osVersion,
    cookies: cookieEnabled,
    flashVersion: flashVersion
  };
}(this));

angular.module('RESTService', [])
.controller('NewsController', function($http, $scope, $routeParams, $location, NewsModel){

  var newsdashboard = this;
  var comm = this;
  var data = new Date().toLocaleString();
  $scope.tagdisplay = false;

  var url = "http://freegeoip.net/json/";
  $http.get(url).then(function(response) {
    console.log(response.data.ip);
    $scope.ip = response.data.ip;
    $scope.latitude = response.data.latitude;
    $scope.longitude = response.data.longitude;

    var userinfo = {
      "screen": jscd.screen,
      "os":jscd.os,
      "mobile":jscd.mobile,
      "flash":jscd.flashVersion,
      "cookies":jscd.cookies,
      "fulluseragent": navigator.userAgent,
      "ip": $scope.ip,
      "latitude": $scope.latitude,
      "longitude": $scope.longitude
    };
    postUserInfo(userinfo);
  });

  function postUserInfo(userinfo) {
    path = 'userinfo/';
    NewsModel.create(angular.extend(userinfo)).then(function (result) {

    })
  }

  function getNews(){
    path = 'getNews/';
    NewsModel.all().then(function(result){
      newsdashboard.news = result.data;
      console.log(newsdashboard.news);
    })
  }

  function getNewsByTag() {
    $scope.tagdisplay = true;
    $scope.tagname = $routeParams.id;
    path = 'getNewsByTag/'+$routeParams.id;
    NewsModel.all().then(function (result) {
      newsdashboard.news = result.data;
      console.log(newsdashboard.news.length)
      $scope.item_size = newsdashboard.news.length;
    })
  }
  newsdashboard.news = [];

  if($location.path().substr(0,4) === "/tag"){
    console.log("Wyswietlamy po tagu")
    getNewsByTag();
  }else {
    getNews();
  }

  function createNews(news){
    path = 'getNews/';
    NewsModel.create(angular.extend({},
      {data: data},news)).then(function (result){
      initCreateForm();
      newsdashboard.news = result.data;

      $scope.showData = true;
      $scope.resultMessage = result.data;

      console.log("Info: " + newsdashboard.news.message);
      console.log(news)

      if(newsdashboard.news.message == "Error")
      {
        $scope.showData = true;
      }
      else
      {
        $scope.showData = false;
        $scope.showOk = true;
      }

    })
  }

  function initCreateForm(){
    comm.newComm = { title: '', text: '', author: '', categoryList: ''};
  }

  newsdashboard.createNews = createNews;


})
  .controller('NewsDisplayController',
    function($scope, $routeParams, NewsModel){

      var displaydash = this;
      var newsId = $routeParams.id;

      console.log($routeParams.id);


        path = 'getNewsById/'+newsId;
        NewsModel.getNewsById().then(function (result){
          //displaydash.news = result.data;
          $scope.news = result.data;
          console.log("Zwracam: " +  $scope.news);
        })

    })
  .controller('CommentController',
    function($scope, $routeParams, NewsModel){

      var newsId = $routeParams.id;
      path = 'getCommetnsByNewsId/'+newsId;

      var comm = this;

      var data = new Date().toLocaleString();

      $scope.createComm = function(comment){
        console.log("Tworze komentarz");
        console.log(comment);
        NewsModel.createComment(angular.extend({},
          {data: data, newsId: newsId}, comment)).then(function (result){
          initCreateComm();
          $scope.getComments();

        })
      }
      function initCreateComm(){
        comm.newComm = { comment: '', author: ''};
      }

      $scope.getComments = function() {
        NewsModel.getCommentById().then(function (result) {
          $scope.comments = result.data;
          console.log($scope.comments);
        });
      };
      $scope.getComments();
    })
  .constant('ENDPOINT_URI', 'http://localhost:8080/api/news/')
  .service('NewsModel', function($http, ENDPOINT_URI){

    var service = this;


    function getUrl(){
      return ENDPOINT_URI + path;
    }

    service.all = function(){
      console.log("robie get na newsy" + getUrl());
      return $http.get(getUrl());
    };

    service.getNewsById = function(){
      return $http.get(getUrl());
    };

    service.getCommentById = function(){
      return $http.get(getUrl());
    };

    service.create = function(news){
      console.log("jestetm" + getUrl());
      return $http.post(getUrl(),news);
    };

    service.createUserInfo = function (userinfo) {
      return $http.post(getUrl(), userinfo);
    }

    service.createComment = function(comment){
      return $http.post(getUrl(),comment);
    };


  });
