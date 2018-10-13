'use strict';
angular
  .module('main.devices')
  .service('ngDevice', ngDevice);

ngDevice.$inject = ['$log', 'Device'];

function ngDevice($log, Device) {
  return {
    getDevices: getDevices,
    sendCommand: sendCommand,
    queryDeviceWinningGrabRecord: queryDeviceWinningGrabRecord
  }

  function getDevices(successCb, errorCb) {
    Device.find(function (success) {
      $log.debug('getDevices: ' + JSON.stringify(success));
      if (successCb) {
        successCb(success);
      }
    }, function (error) {
      $log.debug('getDevices error: ' + error);
      if (errorCb) {
        errorCb(error);
      }
    })

  }

  function sendCommand(deviceId, command, successCb, errorCb) {
    Device.prototype$sendCommand({id: deviceId}, {command: JSON.stringify(command)}, successCb, errorCb);
  }

  function queryDeviceWinningGrabRecord(deviceId, successCb, errorCb) {
    Device.prototype$queryDeviceWinningGrabRecord({id: deviceId}, successCb, errorCb);
  }
}
