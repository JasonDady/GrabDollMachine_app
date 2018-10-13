// 设置 controller
'use strict';

var PrepaidCtrl = function ($rootScope, $ionicHistory, $stateParams, AppUser, mainService) {
  var vm = this;
  var userId = mainService.getLocalStorage('$LoopBack$currentUserId');
  vm.payType = 0;
  vm.selectedPrepaid = $stateParams.prepaidItem;
  vm.selectPayType = selectPayType;
  vm.pay = pay;

  function selectPayType(payType) {
    vm.payType = payType;
  }

  function pay() {
    if (vm.payType === 0) { //微信支付
      AppUser.prototype$genPayArgs({id: Number(userId)}, {totalFee: Number($stateParams.prepaidItem.rmb)}, function (res) {
        var params = {
          'partnerid': res.payInfo.partnerid, // merchant id
          'prepayid': res.payInfo.prepayid, // prepay id returned from server
          'noncestr': res.payInfo.noncestr, // nonce string returned from server
          'timestamp': res.payInfo.timestamp, // timestamp
          'sign': res.payInfo.sign // signed string
        };
        /* eslint-disable no-undef*/
        Wechat.sendPaymentRequest(params, function () {
        /* eslint-enable no-undef*/
          $rootScope.getGrabRecord();
          $ionicHistory.goBack();
        }, function () {
          mainService.alertMsg('', '支付失败！');
        });

      }, function (reason) {
        alert('Failed: ' + JSON.stringify(reason));
      });
    } else {
      // mainService.alertMsg('', '暂不支持支付宝支付！');
    }
  }
};

PrepaidCtrl.$inject = ['$rootScope', '$ionicHistory', '$stateParams', 'AppUser', 'Main'];

angular.module('main.user')
  .controller('PrepaidCtrl', PrepaidCtrl);
