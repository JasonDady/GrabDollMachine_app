// 设备观看controller
'use strict';

var DeviceWatchCtrl = function ($log, $state, $rootScope, $stateParams, $timeout, $interval, $websocket, mainService, ngUser, ngDevice) {
  var vm = this;
  var catchInt = null;
  var playerFront, playerSide;
  var ct0, ct1;
  // var dataStream = null;
  var isEnableCatch = false;
  var userId = mainService.getLocalStorage('$LoopBack$currentUserId');

  vm.isControl = false;
  vm.deviceId = $stateParams.deviceId;
  vm.show = false;
  vm.front = false;
  vm.cancelMove = false;
  vm.showRes = false;
  vm.countDown = 30;
  vm.retryCountDown = 5;
  vm.showCt = true;
  vm.tipNoCoin = false;

  vm.toggleCam = toggleCam;
  vm.dollCatch = dollCatch;
  vm.startDollCatch = startDollCatch;
  vm.gotoprepaidList = gotoprepaidList;
  vm.moveClaws = moveClaws;
  vm.releaseBtn = releaseBtn;
  vm.onceagain = onceagain;
  vm.tryagainlater = tryagainlater;
  vm.queryDeviceWinningGrabRecord = queryDeviceWinningGrabRecord;

  $rootScope.initJsmpeg = function () {
    // var clientFront = new WebSocket('ws://47.97.16.13:8086/');
    // var clientSide = new WebSocket('ws://47.97.16.13:8085/');

    var clientFront = new WebSocket($stateParams.device.frontCameraUrl);
    var clientSide = new WebSocket($stateParams.device.sideCameraUrl);
    var canvasFront = document.getElementById('videoCanvasFront');
    var canvasSide = document.getElementById('videoCanvasSide');
    playerFront = new window.jsmpeg(clientFront, {canvas: canvasFront});
    playerSide = new window.jsmpeg(clientSide, {canvas: canvasSide});
  }

  $rootScope.closeJsmpeg = function () {
    playerFront.stop();
    playerSide.stop();
  }

  var dataStream = $websocket('ws://47.97.16.13:4011');

  dataStream.onOpen(function () {
    dataStream.send({userId: userId, deviceId: vm.deviceId, isOnline: true});
    $log.debug('send userid: ' + userId + 'deviceId: ' + vm.deviceId);
  });

  dataStream.onClose(function (event) {
    console.log('connection closed', event);
    dataStream.send({userId: userId, deviceId: vm.deviceId, isOnline: false});
  });

  dataStream.onMessage(function (message) {
    $log.debug('dataStream.onMessage', message.data);
    var msg = JSON.parse(message.data);
    vm.status = msg.device.status;
    if (vm.status === 1) {
      vm.showCt = true;
    } else {
      vm.showCt = false;
    }
    vm.onlineNum = msg.userOnline;
    if (msg.device.status === 1) {
      isEnableCatch = false;
    } else {
      isEnableCatch = true;
    }

    if (vm.isControl === true && msg.device.status === 2 && msg.device.winningState === 0 ) { //未抓住
      vm.retryCountDown = 5;
      vm.showRes = true;
      vm.winningState = 0;
      ct0 = $interval(function () {
        if (vm.retryCountDown <= 0) {
          vm.retryCountDown = 0;
          vm.showRes = false;
          vm.isControl = false;
          $interval.cancel(ct0);
        } else {
          vm.retryCountDown--;
        }
      }, 1000);
    } else if (vm.isControl === true && msg.device.status === 2 && msg.device.winningState === 1) { //抓住
      vm.retryCountDown = 5;
      vm.showRes = true;
      vm.winningState = 1;
      ct1 = $interval(function () {
        if (vm.retryCountDown <= 0) {
          vm.retryCountDown = 0;
          vm.showRes = false;
          vm.isControl = false;
          $interval.cancel(ct1);
        } else {
          vm.retryCountDown--;
        }
      }, 1000);
    }
  });


  $rootScope.initDeviceWS = function () {

  }

  $rootScope.closeDeviceWS = function () {
    dataStream.send({userId: userId, deviceId: vm.deviceId, isOnline: false});
    dataStream.close(true);
  }

  function gameCurrency() {
    ngUser.getUserInfo(function (res) {
      vm.gameCurrency = res.gameCurrency;
    }, function (error) {
      $log.debug('getUserInfo error', error);
    });
  }

  function toggleCam() {
    vm.front = !vm.front;
  }

  function startDollCatch() {
    vm.countDown = 30;
    ngUser.getUserInfo(function (res) {
      vm.gameCurrency = res.gameCurrency;

      if ($stateParams.device.price > vm.gameCurrency) {
        vm.tipNoCoin = true;
        vm.isControl = false;
        return;
      }

      if (isEnableCatch === false) {
        mainService.alertMsg('', '当前娃娃机正在游戏中！');
        vm.isControl = false;
        return;
      }

      // vm.isControl = true;
      var ct = $interval(function () {
        if (vm.countDown <= 0) {
          vm.countDown = 0;
          // dollCatch(5);
          $interval.cancel(ct);
        } else {
          vm.countDown--;
        }
      }, 1000);

      ngUser.startDevice(vm.deviceId, function (res) {
        isEnableCatch === true;
        vm.isControl = true;
        gameCurrency();
        $log.debug('startDevice success', res);
      }, function (error) {
        isEnableCatch === false;
        vm.isControl = false;
        $log.debug('startDevice error', error);
      });

    }, function (error) {
      $log.debug('getUserInfo error', error);
    });

  }

  function dollCatch(type) {
    ngUser.controlDevice(type, vm.deviceId, function (res) {
      $log.debug('controlDevice success', res);
    }, function (error) {
      $log.debug('controlDevice error', error);
    })
  }

  function moveClaws(type) {
    if (catchInt) {
      $interval.cancel(catchInt);
      catchInt = null;
    }
    catchInt = $interval(function () {
      ngUser.controlDevice(type, vm.deviceId, function (res) {
        $log.debug('controlDevice success', res);
      }, function (error) {
        $log.debug('controlDevice error', error);
      })
    }, 1000);
  }

  function releaseBtn() {
    $interval.cancel(catchInt);
    vm.cancelMove = true;
  }

  function tryagainlater() {
    vm.showRes = false;
    vm.isControl = false;
    $interval.cancel(ct0);
    $interval.cancel(ct1);
  }

  function onceagain() {
    vm.showRes = false;
    $interval.cancel(ct0);
    $interval.cancel(ct1);
    vm.isControl = true;
    startDollCatch();
  }

  function gotoprepaidList() {
    $rootScope.closeJsmpeg();
    $state.go('main.user.prepaidList');
  }

  function queryDeviceWinningGrabRecord() {
    ngDevice.queryDeviceWinningGrabRecord(vm.deviceId, function (res) {
      vm.successList = res.result;
      vm.show = true;
      $log.debug('queryDeviceWinningGrabRecord success: ', res);
    }, function (error) {
      vm.show = false;
      mainService.alertMsg('', '未获取到当前娃娃机抓取记录！');
      $log.debug('queryDeviceWinningGrabRecord error: ', error);
    });
  }

  $rootScope.getGameCurrency = function () {
    gameCurrency();
  }

  function init() {
    gameCurrency();
    $rootScope.initJsmpeg();
    $rootScope.initDeviceWS();
    if (window.plugins && window.plugins.toast && window.plugins.toast.showWithOptions) {
      window.plugins.toast.showWithOptions({
        message: '当前网络环境不理想，请谨慎上机！',
        duration: 'short',
        position: 'bottom',
        addPixelsY: -160
      });
    }
  }

  init();

};

DeviceWatchCtrl.$inject = ['$log', '$state', '$rootScope', '$stateParams', '$timeout', '$interval', '$websocket', 'Main', 'ngUser', 'ngDevice'];

angular.module('main.devices')
  .controller('DeviceWatchCtrl', DeviceWatchCtrl);
