'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router'
])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/main/user/login');
    $stateProvider
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'main/templates/menu.html',
      controller: 'MenuCtrl as menu'
    })
      .state('main.debug', {
        url: '/debug',
        templateUrl: 'main/templates/debug.html',
        controller: 'DebugCtrl as ctrl'
      });
  }]);
