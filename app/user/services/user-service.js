'use strict';
angular
  .module('main.user')
  .factory('ngUser', ngUser);

ngUser.$inject = ['$log', '$rootScope', 'LoopBackAuth', 'CheckCode', 'Main', 'AppUser'];

function ngUser($log, $rootScope, LoopBackAuth, CheckCode, mainService, AppUser) {
  var userInfo = {
    username: '',
    phoneNumber: '',
    verificationCode: ''
  };

  return {
    setPhoneNumber: setPhoneNumber,
    setVerificationCode: setVerificationCode,
    validateMobile: validateMobile,
    validateCheckCode: validateCheckCode,
    getVerificationCode: getVerificationCode,
    loginByMobile: loginByMobile,
    refreshToken: refreshToken,
    loginBeOverdue: loginBeOverdue,
    loginByOpenWeixin: loginByOpenWeixin,
    genPayArgs: genPayArgs,
    myGrabRecord: myGrabRecord,
    addAddressInfo: addAddressInfo,
    deleteAddressInfo: deleteAddressInfo,
    editAddressInfo: editAddressInfo,
    getAddress: getAddress,
    controlDevice: controlDevice,
    startDevice: startDevice,
    getUserInfo: getUserInfo,
    exchangeGameCurrency: exchangeGameCurrency,
    confirmDeliveryAddress: confirmDeliveryAddress,
    queryDeviceStatus: queryDeviceStatus
  };

  function setPhoneNumber(phoneNumber) {
    userInfo.phoneNumber = phoneNumber;
  }

  function setVerificationCode(verificationCode) {
    userInfo.verificationCode = verificationCode;
  }

  //1开头，第二位可能是3/4/5/7/8等的任意一个，在加上后面的\d表示数字[0-9]的9位，总共加起来11位结束
  function validateMobile(mobile, successCb, errorCb) {
    var regex = /^0?(13[0-9]|15[0-9]|17[0135678]|18[0-9]|14[57])[0-9]{8}$/;
    if (regex.test(mobile)) {
      successCb();
    } else {
      errorCb();
    }
  }

  //4位数字
  function validateCheckCode(mobile, successCb, errorCb) {
    var regex = /^\d{4}$/;
    if (regex.test(mobile)) {
      successCb();
    } else {
      errorCb();
    }
  }

  function getVerificationCode(mobile, successCb, errorCb) {
    $log.debug('mobile: ' + mobile);
    CheckCode.getVerifyCode({mobile: mobile}, function (res) {
      $log.debug('getVerificationCode result :' + JSON.stringify(res));
      if (successCb) {
        return successCb(res);
      }
    }, function (err) {
      $log.debug('Unable to getVerificationCode:' + JSON.stringify(err));
      if (errorCb) {
        return errorCb(err);
      }
    });
  }

  function loginByMobile(mobile, code, successCb, errorCb) {
    mainService.setLocalStorage('$LoopBack$mobile', mobile);
    AppUser.loginByMobile({
      mobile: mobile,
      code: code
    }, function (accessToken) {
      $log.debug('loginByMobile accessToken :' + JSON.stringify(accessToken));
      mainService.setLocalStorage('ttl', accessToken.ttl);
      mainService.setLocalStorage('created', accessToken.created);
      LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
      LoopBackAuth.rememberMe = true;
      LoopBackAuth.save();
      setUserInfo();

      if (successCb) {
        return successCb(accessToken);
      }
    }, function (err) {
      mainService.removeLocalStorage('$LoopBack$mobile');
      $log.debug('Unable to loginByMobile:' + err);
      if (errorCb) {
        return errorCb(err);
      }
    });
  }

  function loginByOpenWeixin(code, successCb, errorCb) {
    if (AppUser.isAuthenticated()) {
      LoopBackAuth.clearUser();
    }
    AppUser.loginByWechat({
      code: code
    }, function (accessToken) {
      // alert(JSON.stringify(accessToken));
      $log.debug('Wechat logged in for user:', accessToken);
      mainService.setLocalStorage('ttl', accessToken.ttl);
      mainService.setLocalStorage('created', accessToken.created);
      LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.userInfo);
      LoopBackAuth.rememberMe = true;
      LoopBackAuth.save();
      setUserInfo();
      $log.debug('accessToken.id: ' + accessToken.id + '; accessToken.userId: ' + accessToken.userId + '; LoopBackAuth.currentUserId: ' + LoopBackAuth.currentUserId);
      if (successCb) {
        return successCb();
      }
    }, function (res) {
      $log.debug('Unable to login appserver:', res);
      if (errorCb) {
        return errorCb('LOGIN_APPSERVER_FAILED');
      }
    });
  }

  function refreshToken(successCb, errorCb) {
    if (!AppUser.isAuthenticated()) {
      if (errorCb) {
        errorCb(new Error('Not Logged in yet'));
      }
      return;
    }
    AppUser.prototype$refresh_token({
      id: LoopBackAuth.currentUserId
    }, function (accessToken) {
      $log.debug('刷新Token:' + JSON.stringify(accessToken));
      mainService.setLocalStorage('ttl', accessToken.ttl);
      mainService.setLocalStorage('created', accessToken.created);
      LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
      LoopBackAuth.rememberMe = true;
      LoopBackAuth.save();
      setUserInfo();
      if (successCb) {
        return successCb();
      }
    }, function (err) {
      $log.debug('刷新Token Error:' + JSON.stringify(err));
      if (errorCb) {
        return errorCb(err);
      }
    });
  }

  function setUserInfo() {
    // alert(JSON.stringify(LoopBackAuth.currentUserData));
    if (LoopBackAuth.currentUserData) {
      //微信端操作
      if (LoopBackAuth.currentUserData && LoopBackAuth.currentUserData.nickname) {
        LoopBackAuth.currentUserData.nickName = LoopBackAuth.currentUserData.nickname;
      }
      if (LoopBackAuth.currentUserData && LoopBackAuth.currentUserData.headimgurl) {
        LoopBackAuth.currentUserData.avatar = LoopBackAuth.currentUserData.headimgurl;
      }
      return mainService.setLocalStorage('currentUserData', JSON.stringify(LoopBackAuth.currentUserData));
    } else {
      return;
    }
  }

    /**
   * 登录是否过期
   */
  function loginBeOverdue() {
    var ttl = mainService.getLocalStorage('ttl');
    var created = mainService.getLocalStorage('created');
    if (LoopBackAuth.accessTokenId && ttl && created) {
      var newDate = Date.now();
      var oDate = new Date(created).getTime();
      var expires = Math.ceil((newDate - oDate) / 1000);
      $log.debug('expires: ' + expires + ' ,newDate : ' + newDate + ' ,oDate: ' + oDate);
      if (expires >= ttl - 60 * 60) { //正式 60 * 60 测试 1209600 + 60
        mainService.confirmMsg('您的登录已过期!', '重新登录', null, function (res) {
          if (res) {
            mainService.logout();
            $rootScope.jump('main.user.login');
          }
        });
        return true;
      }
    }
    return false;
  }

  function genPayArgs() {
    AppUser.prototype$genPayArgs({id: 2}, {totalFee: 0.01}, function (success) {
      alert('Success');
      alert(JSON.stringify(success));
    }, function (reason) {
      alert('Failed: ' + JSON.stringify(reason));
    });
  }

  function myGrabRecord(status, isShowUserInfo, successCb, errorCb) {
    AppUser.prototype$myGrabRecord({id: LoopBackAuth.currentUserId, status: status, isShowUserInfo: isShowUserInfo}, function (res) {
      if (successCb) {
        successCb(res);
      }
    }, function (error) {
      if (errorCb) {
        errorCb(error);
      }
    });
  }

  function addAddressInfo(name, mobile, address, isDefault, successCb, errorCb) {
    AppUser.prototype$addAddressInfo({id: LoopBackAuth.currentUserId}, {username: name, mobile: mobile, address: address, isDefault: isDefault}, function (res) {
      if (successCb) {
        successCb(res);
      }
    }, function (error) {
      if (errorCb) {
        errorCb(error);
      }
    });
  }

  function deleteAddressInfo(addressId, successCb, errorCb) {
    AppUser.prototype$deleteAddressInfo({id: LoopBackAuth.currentUserId}, {addressId: addressId}, function (res) {
      if (successCb) {
        successCb(res);
      }
    }, function (error) {
      if (errorCb) {
        errorCb(error);
      }
    });
  }

  function editAddressInfo(username, mobile, addressId, address, isDefault, successCb, errorCb) {
    AppUser.prototype$editAddressInfo({id: LoopBackAuth.currentUserId}, {addressId: addressId, username: username, mobile: mobile, address: address, isDefault: isDefault}, function (res) {
      if (successCb) {
        successCb(res);
      }
    }, function (error) {
      if (errorCb) {
        errorCb(error);
      }
    });
  }

  function getAddress(successCb, errorCb) {
    AppUser.address({id: LoopBackAuth.currentUserId}, {}, function (res) {
      if (successCb) {
        successCb(res);
      }
    }, function (error) {
      if (errorCb) {
        errorCb(error);
      }
    });
  }

  function controlDevice(buttonState, deviceId, successCb, errorCb) {
    AppUser.prototype$sendCommandButtonState({id: LoopBackAuth.currentUserId}, {buttonState: buttonState, deviceId: deviceId}, function (success) {
      if (successCb) {
        successCb(success);
      }
    }, function (error) {
      if (errorCb) {
        errorCb(error);
      }
    });
  }

  function startDevice(deviceId, successCb, errorCb) {
    AppUser.prototype$startDevice({id: LoopBackAuth.currentUserId}, {deviceId: deviceId}, function (success) {
      if (successCb) {
        successCb(success);
      }
    }, function (error) {
      if (errorCb) {
        errorCb(error);
      }
    });
  }

  function getUserInfo(successCb, errorCb) {
    AppUser.prototype$getUserInfo({id: LoopBackAuth.currentUserId}, function (res) {
      if (successCb) {
        successCb(res);
      }
    }, function (error) {
      if (errorCb) {
        errorCb(error);
      }
    });
  }

  function exchangeGameCurrency(orderId, successCb, errorCb) {
    AppUser.prototype$exchangeGameCurrency({id: LoopBackAuth.currentUserId}, {orderId: orderId}, function (res) {
      if (successCb) {
        successCb(res);
      }
    }, function (error) {
      if (errorCb) {
        errorCb(error);
      }
    });
  }

  function confirmDeliveryAddress(addressId, orderId, successCb, errorCb) {
    AppUser.prototype$confirmDeliveryAddress({id: LoopBackAuth.currentUserId}, {addressId: addressId, orderId: orderId}, function (res) {
      if (successCb) {
        successCb(res);
      }
    }, function (error) {
      if (errorCb) {
        errorCb(error);
      }
    });
  }

  function queryDeviceStatus(deviceId, successCb, errorCb) {
    AppUser.prototype$queryDeviceStatus({id: LoopBackAuth.currentUserId}, {deviceId: deviceId}, function (res) {
      if (successCb) {
        successCb(res);
      }
    }, function (error) {
      if (errorCb) {
        errorCb(error);
      }
    });
  }

}
