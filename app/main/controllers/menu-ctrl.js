'use strict';

function MenuCtrl($log, $state, $rootScope, $location, $ionicHistory, $ionicPlatform) {

  $log.log(
    'Hello from your Controller: MenuCtrl in module main:. This is your controller:',
    this);

  $rootScope.goBack = function () {
    var currentPath = $location.path();
    if (currentPath === '/main/devices/watch') {
      $ionicHistory.goBack();
      $rootScope.closeJsmpeg();
      $rootScope.closeDeviceWS();
    } else if (currentPath === '/main/user/prepaidList') {
      $ionicHistory.goBack();
      $rootScope.getGameCurrency();
      $rootScope.initJsmpeg();
      $rootScope.initDeviceWS();
    } else {
      $ionicHistory.goBack();
    }
  };

    /**
   *  跳转页面函数
   *  yelp
   * @param toUrl 路径
   * @param toParams 跳转函数
   */
  $rootScope.jump = function (route, toParams) {
    var params = toParams || {};
    $state.go(route, params);
  };

  $rootScope.exit = function () {
    ionic.Platform.exitApp();
  };

  // 硬件返回
  $ionicPlatform.registerBackButtonAction(function () {
    var exitPath = ['/main/user/login', '/main/devices/list'], // 需要exit退出的路由
      locationPath = $location.path();
    // var backStateName = $ionicHistory.backView().stateName;

    if (exitPath.indexOf(locationPath) !== -1) {
      if ($rootScope.backButtonPressedOnceToExit) {
        $rootScope.exit();
      } else {
        $rootScope.backButtonPressedOnceToExit = true;
        window.plugins.toast.showWithOptions({
          message: '再按一次退出程序',
          duration: 'short',
          position: 'bottom',
          addPixelsY: -160
        });
        setTimeout(function () {
          $rootScope.backButtonPressedOnceToExit = false;
        }, 2000);
      }
    } else {
      $rootScope.goBack();
    }
  }, 100, 'main');

}

MenuCtrl.$inject = ['$log', '$state', '$rootScope', '$location', '$ionicHistory', '$ionicPlatform'];

angular.module('main')
  .controller('MenuCtrl', MenuCtrl);
