'use strict';
angular.module('main')
.service('Main', ['$log', '$timeout', '$ionicPopup', '$cordovaDialogs', '$window', 'AppUser', function ($log, $timeout, $ionicPopup, $cordovaDialogs, $window, AppUser) {

  return {
    alertMsg: alertMsg,
    confirmMsg: confirmMsg,
    setLocalStorage: setLocalStorage,
    getLocalStorage: getLocalStorage,
    removeLocalStorage: removeLocalStorage,
    clearLocalStorage: clearLocalStorage,
    logout: logout
  }

  function alertMsg(title, message, button) {
    title = title ? title : '温馨提醒';
    button = button ? button : '确定';
    // $cordovaDialogs.alert(message, title, button).then(function () {
    //   if (successCb) {
    //     return successCb();
    //   }
    // });

    $ionicPopup.alert({
      title: title,
      okText: button,
      okType: 'button-energized',
      template: message
    });
  }

  function confirmMsg(title, message, buttonArray, successCb) {
    buttonArray = buttonArray ? buttonArray : ['确定', '取消'];
    $cordovaDialogs.confirm(message, title, buttonArray).then(function (buttonIndex) {
      if (buttonIndex === 1) {
        if (successCb) {
          return successCb(buttonIndex);
        }
      }
    });
  }

  function setLocalStorage(key, value) {
    if (value) {
      if (typeof(value) === 'object') {
        value = JSON.stringify(value);
      }
    }
    $window.localStorage[key] = value;
  }

  function getLocalStorage(key, defaultValue) {
    return $window.localStorage[key] || defaultValue;
  }

  function removeLocalStorage(key) {
    return $window.localStorage.removeItem(key);
  }

  function clearLocalStorage() {
    removeLocalStorage('$LoopBack$accessTokenId');
    removeLocalStorage('$LoopBack$currentUserId');
    removeLocalStorage('$LoopBack$rememberMe');
    removeLocalStorage('hasLogined');
    removeLocalStorage('mobile');
    removeLocalStorage('currentUserData');
  }

  function logout() {
    AppUser.logout(function () {
      clearLocalStorage();
    });
  }

}]);
