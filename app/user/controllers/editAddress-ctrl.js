// 我的娃娃币 controller
'use strict';

var EditAddressCtrl = function ($stateParams, $log, $state, $rootScope, ngUser, mainService) {
  var type = $stateParams.type;
  var vm = this;
  vm.type = type;
  vm.isDefault = true;
  vm.saveAddress = saveAddress;
  vm.setDefault = setDefault;

  function saveAddress() {
    if (!judgeAddress(vm.username, vm.mobile, vm.address)) {
      return;
    }
    ngUser.validateMobile(vm.mobile, function () {
      if (type === 'add') {
        ngUser.addAddressInfo(vm.username, vm.mobile, vm.address, vm.isDefault, function (res) {
          $log.debug('addAddressInfo success', res);
          $state.go('main.user.address');
        }, function (error) {
          $log.debug('addAddressInfo error', error);
        });
      } else {
        ngUser.editAddressInfo(vm.username, vm.mobile, vm.addressId, vm.address, vm.isDefault, function (res) {
          $log.debug('editAddressInfo success', res);
          $state.go('main.user.address');
        }, function (error) {
          $log.debug('editAddressInfo error', error);
        });
      }
    }, function (error) {
      mainService.alertMsg('', '请输入正确的手机号码！');
      $log.debug('validateMobile error', error);
    });
  }

  function judgeAddress(username, mobile, address) {
    if (username === '' || username === null || username === undefined) {
      mainService.alertMsg('', '收货人不能为空！');
      return false;
    } else if (mobile === '' || mobile === null || mobile === undefined) {
      mainService.alertMsg('', '联系电话不能为空！');
      return false;
    } else if (address === '' || address === null || address === undefined) {
      mainService.alertMsg('', '联系地址不能为空！');
      return false;
    }
    return true;
  }

  function setDefault() {
    vm.isDefault = !vm.isDefault;
  }

  function init() {
    if (type === 'edit') {
      vm.username = $stateParams.address.username;
      vm.mobile = $stateParams.address.mobile;
      vm.address = $stateParams.address.address;
      vm.addressId = $stateParams.address.id;
      vm.isDefault = $stateParams.address.isDefault;
    } else {
      ngUser.getAddress(function (res) {
        if (res.length > 0) {
          vm.showDefault = true;
        } else {
          vm.showDefault = false;
        }
      }, function (error) {
        $log.debug('getAddress error', error);
      });
    }
  }

  init();
};

EditAddressCtrl.$inject = ['$stateParams', '$log', '$state', '$rootScope', 'ngUser', 'Main'];

angular.module('main.user')
  .controller('EditAddressCtrl', EditAddressCtrl);
