// 抓取记录 controller
'use strict';

var fetchingRecordsCtrl = function ($log, ngUser) {
  var vm = this;

  ngUser.myGrabRecord(0, 0, function (res) {
    $log.debug('myGrabRecord success: ', res)
    vm.dataList = res.result;
    // vm.dataList = [];
  }, function (error) {
    $log.debug('myGrabRecord error: ', error);
  });
};

fetchingRecordsCtrl.$inject = ['$log', 'ngUser'];

angular.module('main.user')
  .controller('fetchingRecordsCtrl', fetchingRecordsCtrl);
