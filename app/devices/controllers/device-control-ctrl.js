// 设备控制controller
'use strict';

var DeviceControlCtrl = function ($log, $stateParams, ngDevice, mainService, ngUser) {
  var vm = this;
  vm.deviceId = $stateParams.deviceId;
  vm.dollCatch = dollCatch;

  function dollCatch(type) {
    // var alertMsg = ['向左移动', '向右移动', '向前移动', '向后移动', '抓取'];
    // mainService.alertMsg('操作提示', alertMsg[type - 1]);
    // ngDevice.sendCommand('f4817d9d31f6', {'buttonState': type}, function (success) {
    //   $log.debug('success: ' + success);
    // }, function (error) {
    //   $log.debug('error: ' + error);
    // });
    ngUser.controlDevice(type, 'f408015c9d321b', function (res) {
      $log.debug('controlDevice success', res);
    }, function (error) {
      $log.debug('controlDevice error', error);
    })
  }

};

DeviceControlCtrl.$inject = ['$log', '$stateParams', 'ngDevice', 'Main', 'ngUser'];

angular.module('main.devices')
  .controller('DeviceControlCtrl', DeviceControlCtrl);
