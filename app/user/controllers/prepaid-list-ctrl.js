// 设置 controller
'use strict';

var PrepaidListCtrl = function ($log, $rootScope, ngUser) {
  var vm = this;
  vm.coinList = [
    {coin: 600, rmb: 0.99},
    {coin: 2000, rmb: 9.9},
    {coin: 5000, rmb: 99},
    {coin: 12500, rmb: 199},
    {coin: 25000, rmb: 999},
    {coin: 50000, rmb: 9999},

  ];

  $rootScope.getGrabRecord = function () {
    ngUser.myGrabRecord(2, 1, function (res) {
      vm.dollsConins = res.result;
      // alert(JSON.stringify(res.result));
    }, function (error) {
      $log.debug('myGrabRecord error', error);
    });
  }

  $rootScope.getGrabRecord();
};

PrepaidListCtrl.$inject = ['$log', '$rootScope', 'ngUser'];

angular.module('main.user')
  .controller('PrepaidListCtrl', PrepaidListCtrl);
