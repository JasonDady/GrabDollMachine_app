// 我的地址 controller
'use strict';

var AddressCtrl = function ($log, ngUser, mainService) {
  var vm = this;
  vm.deleteAddress = deleteAddress;
  vm.setDefault = setDefault;

  function deleteAddress(item) {
    mainService.confirmMsg('温馨提示', '确定删除该地址？', null, function (conf) {
      if (conf) {
        ngUser.deleteAddressInfo(item.id, function (success) {
          $log.debug('delete address success', success);
          init();
        }, function (error) {
          $log.debug('delete address error', error);
        })
      }
    });
  }

  function setDefault(item) {
    if (item.isDefault === true) {
      return;
    }
    ngUser.editAddressInfo(item.username, item.mobile, item.id, item.address, !item.isDefault, function (res) {
      $log.debug('setDefault success', res);
      init();
    }, function (error) {
      $log.debug('setDefault error', error);
    });
  }

  function init() {
    ngUser.getAddress(function (res) {
      vm.addressList = res;
    }, function (error) {
      $log.debug('getAddress error', error);
    });
  }

  init();
};

AddressCtrl.$inject = ['$log', 'ngUser', 'Main'];

angular.module('main.user')
  .controller('AddressCtrl', AddressCtrl);
