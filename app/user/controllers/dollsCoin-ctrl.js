// 我的娃娃币 controller
'use strict';

var dollsCoinCtrl = function ($log, ngUser) {
  var vm = this;

  ngUser.myGrabRecord(0, 1, function (res) {
    $log.debug('dollsCoin myGrabRecord success: ', res)
    vm.dollsConins = res.result;
  }, function (error) {
    $log.debug('dollsCoin myGrabRecord error: ', error)
  });
};

dollsCoinCtrl.$inject = ['$log', 'ngUser'];

angular.module('main.user')
  .controller('dollsCoinCtrl', dollsCoinCtrl);
