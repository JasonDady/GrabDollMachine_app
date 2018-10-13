// 设备列表controller
'use strict';

var DeviceListCtrl = function ($scope, ngDevice, ngUser) {
  var vm = this;
  vm.devices = [];
  vm.getDevices = getDevices;


  $scope.options = {
    loop: false,
    effect: 'fade',
    speed: 500,
  }

  $scope.$on('$ionicSlides.sliderInitialized', function (event, data) {
    $scope.slider = data.slider;
  });

  $scope.$on('$ionicSlides.slideChangeStart', function () {
    console.log('Slide change is beginning');
  });

  $scope.$on('$ionicSlides.slideChangeEnd', function (event, data) {
    $scope.activeIndex = data.slider.activeIndex;
    $scope.previousIndex = data.slider.previousIndex;
  });

  function getDevices() {
    // ngUser.queryDeviceStatus();
    ngDevice.getDevices(function (res) {
      if (res) {
        vm.devices = res;
        angular.forEach(res, function (item) {
          ngUser.queryDeviceStatus(item.deviceId, function () {}, function () {});
        });
        if (vm.devices.length > 0) {
          vm.devices.sort(function () {
            return 0.5 - Math.random();
          })
        }
      }
    }, function () {
      vm.devices = [];
    });
  }

  function init() {
    getDevices();
  }

  init();

};

DeviceListCtrl.$inject = ['$scope', 'ngDevice', 'ngUser'];

angular.module('main.devices')
  .controller('DeviceListCtrl', DeviceListCtrl);
