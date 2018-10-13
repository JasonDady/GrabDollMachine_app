// 抓取成功 controller
'use strict';

var fetchDetailCtrl = function ($rootScope, $state, $stateParams, $ionicHistory, $log, ngUser, mainService) {
  var vm = this;
  vm.exchangeGameCurrency = exchangeGameCurrency;
  vm.confirmDeliveryAddress = confirmDeliveryAddress;
  vm.detail = $stateParams.fetchDetail;

  function exchangeGameCurrency() {
    ngUser.exchangeGameCurrency(vm.detail.id, function (res) {
      mainService.alertMsg('', '兑换金币成功！');
      $rootScope.getMyGrabRecord();
      $ionicHistory.goBack();
      $log.debug('exchangeGameCurrency success: ', res);
    }, function (error) {
      mainService.alertMsg('', '兑换金币失败！');
      $log.debug('exchangeGameCurrency error: ', error);
    });
  }

  function confirmDeliveryAddress() {
    var addressId = '';
    mainService.confirmMsg('温馨提示', '确定邮寄娃娃？', null, function (conf) {
      if (conf) {
        // 先判断是否创建地址
        ngUser.getAddress(function (res) {
          if (res.length > 0) {
            angular.forEach(res, function (item) {
              if (item.isDefault === true) {
                addressId = item.id;
                return;
              }
            });
            ngUser.confirmDeliveryAddress(addressId, vm.detail.id, function (res) {
              mainService.alertMsg('', '邮寄娃娃创建订单成功！');
              $rootScope.getMyGrabRecord();
              $ionicHistory.goBack();
              $log.debug('ngUser.confirmDeliveryAddress success: ', res);
            }, function (error) {
              mainService.alertMsg('', '邮寄娃娃创建订单失败，请联系管理员！');
              $ionicHistory.goBack();
              $log.debug('ngUser.confirmDeliveryAddress error: ', error);
            });
          } else {
            // 跳转到创建地址界面
            mainService.alertMsg('', '您没有添加任何收货地址，请创建收货地址后再试！');
            $state.go('main.user.address');
          }
        }, function (error) {
          $log.debug('getAddress error', error);
        });
      }
    });
  }

};

fetchDetailCtrl.$inject = ['$rootScope', '$state', '$stateParams', '$ionicHistory', '$log', 'ngUser', 'Main'];

angular.module('main.user')
  .controller('fetchDetailCtrl', fetchDetailCtrl);
