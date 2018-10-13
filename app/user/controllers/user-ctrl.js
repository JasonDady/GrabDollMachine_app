// 登录 controller
'use strict';

var userCtrl = function ($scope, $state, $interval, $log, mainService, ngUser) {
  var vm = this;
  vm.mobile = '';
  vm.verificationCode = '';
  vm.verificationCodeText = '获取验证码';
  vm.loginType = 1; //默认使用微信登录
  vm.loginLabel = ['微信一键登录', '使用手机号登录'];
  vm.toggleLogin = toggleLogin;
  vm.getVerifyCode = getVerifyCode;
  vm.loginByMobile = loginByMobile;
  vm.loginByWeixin = loginByWeixin;

  var sec = 0,
    countDown = null;

  function toggleLogin() {
    vm.loginType = Math.abs(vm.loginType - 1);
  }

  function getVerifyCode() {
    if (sec > 0) {
      mainService.alertMsg('温馨提示', '请勿重复点击');
      return;
    }

    ngUser.validateMobile(vm.mobile, function () {
      sec = 59;
      vm.verificationCodeText = sec + '秒后重试';
      sec--;

      countDown = $interval(function () {
        if (sec === 0) {
          vm.verificationCodeText = '获取验证码';
          $interval.cancel(countDown);
        } else {
          vm.verificationCodeText = sec + '秒后重试';
          sec--;
        }
      }, 1000);

      ngUser.getVerificationCode(vm.mobile, function (result) {
        $log.debug('result: ' + JSON.stringify(result));
      }, function (err) {
        vm.verificationCodeText = '获取验证码';
        $interval.cancel(countDown);

        if (err && err.data && err.data.error && err.data.error.message) {
          mainService.alertMsg('温馨提示', err.data.error.message);
        } else {
          mainService.alertMsg('温馨提示', '获取验证码失败');
        }

        $log.debug('error: ' + err);
      });
    }, function () {
      mainService.alertMsg('温馨提示', '请输入正确的手机号');
    });
  }

  function loginByMobile() {
    ngUser.validateMobile(vm.mobile, function () {
      ngUser.validateCheckCode(vm.verificationCode, function () {
        var mobile = vm.mobile,
          verificationCode = vm.verificationCode;
        ngUser.setPhoneNumber(mobile);
        ngUser.setVerificationCode(verificationCode);
        ngUser.loginByMobile(mobile, verificationCode, function () {
          $state.go('main.devices.list');
        }, function (err) {
          if (err.message) {
            mainService.alertMsg('温馨提示', err.message);
          } else {
            mainService.alertMsg('温馨提示', err.data.error.message);
          }
          // success
          $log.debug('login err', err);
        });
      }, function () {
        $log.debug('loginByMobile validateCheckCode: 请输入正确的验证码');
        mainService.alertMsg('温馨提示', '请输入正确的验证码');
      });
    }, function () {
      $log.debug('loginByMobile validateMobile: 请输入正确的手机号2');
      mainService.alertMsg('温馨提示', '请输入正确的手机号');
    });
  }

  function loginByWeixin() {
    /* eslint-disable no-undef*/
    Wechat.isInstalled(function (installed) {
      /* eslint-enable no-undef*/
      $log.debug('Wechat installed: ' + (installed ? 'Yes' : 'No'));
      if (installed) {
        var scope = 'snsapi_userinfo';
        var state = '_' + (+new Date());
        /* eslint-disable no-undef*/
        Wechat.auth(scope, state, function (response) {
          /* eslint-enable no-undef*/
          // you may use response.code to get the access token.
          var code = response.code;
          $log.debug('code:' + code + ' response: ' + JSON.stringify(response));
          ngUser.loginByOpenWeixin(code, function () {
            // success
            $state.go('main.devices.list');
            $log.debug('login ok');
            // $log.debug('isLogin:' + ngMy.isLogin());
            // if (vm.paramNext) {
            //   $ionicHistory.currentView($ionicHistory.clearHistory());
            //   $state.go(vm.paramNext);
            // } else {
            //   window.history.back();
            //   // $ionicHistory.goBack();
            // }
          }, function (err) {
            mainService.alertMsg('登录失败，请重新尝试！');
            // success
            $log.debug('login err', err);
          });
        },
        function (reason) {
          $log.debug('Failed: ' + reason);
        });
      } else {
        mainService.alertMsg('', '您的手机未安装微信!');
      }
    }, function (reason) {
      $log.debug('Failed: ' + reason);
    });
  }

};

userCtrl.$inject = ['$scope', '$state', '$interval', '$log', 'Main', 'ngUser'];

angular.module('main.user')
  .controller('userCtrl', userCtrl);
