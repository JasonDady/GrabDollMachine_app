'use strict';
angular.module('ddj', [
  'gettext',
  'main',
  'main.user',
  'main.devices',
  'lbServices',
  'ls.LiveSet',
  'ls.ChangeStream',
  'ngCookies',
  'angular-lodash',
  'ngWebSocket'
])
  .config(['LoopBackResourceProvider', '$httpProvider', function (LoopBackResourceProvider, $httpProvider) {
    LoopBackResourceProvider.setUrlBase('http://47.97.16.13:4000/api');
    $httpProvider.defaults.timeout = 30 * 1000;
  }])
  .config(['$logProvider', function ($logProvider) {
    $logProvider.debugEnabled(true);
  }])
  .run(['gettextCatalog', function (gettextCatalog) {
    gettextCatalog.currentLanguage = 'zh_CN';
    // var deviceInfo = '';
    // deviceInfo = '网页可见区域宽：' + document.body.clientWidth + '\n'
    //            + '网页可见区域高：' + document.body.clientHeight + '\n'
    //            + '网页可见区域宽(包括边线的宽)：' + document.body.offsetWidth + '\n'
    //            + '网页可见区域高(包括边线的宽)：' + document.body.offsetHeight + '\n'
    //            + '网页正文全文宽：' + document.body.scrollWidth + '\n'
    //            + '网页正文全文高：' + document.body.scrollHeight + '\n'
    //            + '网页被卷去的高：' + document.body.scrollTop + '\n'
    //            + '网页被卷去的左：' + document.body.scrollLeft + '\n'
    //            + '网页正文部分上：' + window.screenTop + '\n'
    //            + '网页正文部分左：' + window.screenLeft + '\n'
    //            + '屏幕分辨率的高：' + window.screen.height + '\n'
    //            + '屏幕分辨率的宽：' + window.screen.width + '\n'
    //            + '屏幕可用工作区高度：' + window.screen.availHeight + '\n'
    //            + '屏幕可用工作区宽度：' + window.screen.availWidth;
    // console.log(deviceInfo);
    // alert(deviceInfo);
  }])
  .run(['$log', '$rootScope', '$state', 'AppUser', function ($log, $rootScope, $state, AppUser) {
    $rootScope.$on('$stateChangeStart', function (event, toState) {
      $rootScope.routeName = toState.name;
      $log.debug('stateChangeStart To state: ' + JSON.stringify(toState));
      if (toState.authenticate && !AppUser.isAuthenticated()) {
        // User isn’t authenticated
        $state.go('main.user.login');
        event.preventDefault();
      }
    });
    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
      $log.debug('stateChangeSuccess To state: ' + JSON.stringify(toState));
    })
  }]);
