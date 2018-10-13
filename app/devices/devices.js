'use strict';
angular.module('main.devices', [])
  .config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('main.devices', {
        url: '/devices',
        abstract: true,
        template: '<ion-view><ion-nav-view></ion-nav-view></ion-view>',
        authenticate: true
      })
      // 设备列表
      .state('main.devices.list', {
        url: '/list',
        templateUrl: 'devices/templates/device-list.html',
        controller: 'DeviceListCtrl as dlc',
        authenticate: true
      })
      // 设备观看
      .state('main.devices.watch', {
        url: '/watch',
        templateUrl: 'devices/templates/device-watch.html',
        controller: 'DeviceWatchCtrl as dwc',
        authenticate: true,
        // cache: false,
        params: {
          deviceId: '',
          device: ''
        }
      })
      // 设备控制
      .state('main.devices.control', {
        url: '/control',
        templateUrl: 'devices/templates/device-control.html',
        controller: 'DeviceControlCtrl as dcc',
        authenticate: true,
        params: {
          deviceId: '',
        }
      });
  }]);
