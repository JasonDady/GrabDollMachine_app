// 设置 controller
'use strict';

var settingCtrl = function ($rootScope, mainService) {
  var vm = this;
  vm.logout = logout;

  function logout() {
    mainService.confirmMsg('温馨提示', '确定退出该账户？', null, function (conf) {
      if (conf) {
        mainService.logout();
        $rootScope.jump('main.user.login');
      }
    });
  }
};

settingCtrl.$inject = ['$rootScope', 'Main'];

angular.module('main.user')
  .controller('settingCtrl', settingCtrl);
