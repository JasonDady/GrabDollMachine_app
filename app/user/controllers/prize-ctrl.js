// 奖品 controller
'use strict';

var prizeCtrl = function ($log, $rootScope, ngUser) {
  var vm = this;


  $rootScope.getMyGrabRecord = function () {
    ngUser.myGrabRecord(2, 1, function (res) {
      $log.debug('myGrabRecord success: ', res)
      vm.dollsConins = res.result;
    }, function (error) {
      $log.debug('myGrabRecord error: ', error);
    });
  };

  $rootScope.getMyGrabRecord();

};

prizeCtrl.$inject = ['$log', '$rootScope', 'ngUser'];

angular.module('main.user')
  .controller('prizeCtrl', prizeCtrl);
