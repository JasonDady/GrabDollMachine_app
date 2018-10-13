'use strict';
angular.module('main.user', [
  // TODO: load other modules selected during generation
])
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('main/devices/list');
  $stateProvider
  // this state is placed in the <ion-nav-view> in the main/templates/menu.html
    .state('main.user', {
      url: '/user',
      abstract: true,
      controller: 'userCtrl as uc',
      template: '<ion-view><ion-nav-view></ion-nav-view></ion-view>'
    })
    // 登录
    .state('main.user.login', {
      url: '/login',
      templateUrl: 'user/templates/login.html',
    })
    // 用户协议
    .state('main.user.agreement', {
      url: '/agreement',
      templateUrl: 'user/templates/agreement.html',
    })
    // 设置
    .state('main.user.setting', {
      url: '/setting',
      controller: 'settingCtrl as sc',
      templateUrl: 'user/templates/setting.html',
    })
    // 我的奖品
    .state('main.user.prize', {
      url: '/prize',
      controller: 'prizeCtrl as pc',
      templateUrl: 'user/templates/prize.html',
    })
    // 我的娃娃币
    .state('main.user.dollsCoin', {
      url: '/dollsCoin',
      controller: 'dollsCoinCtrl as dcc',
      templateUrl: 'user/templates/dollsCoin.html',
    })
    // 抓取记录
    .state('main.user.fetchingRecords', {
      url: '/fetchingRecords',
      controller: 'fetchingRecordsCtrl as frc',
      templateUrl: 'user/templates/fetchingRecords.html',
    })
    // 抓取成功状态
    .state('main.user.fetchDetail', {
      url: '/fetchDetail',
      controller: 'fetchDetailCtrl as fdc',
      templateUrl: 'user/templates/fetchDetail.html',
      params: {
        fetchDetail: ''
      }
    })
    // 充值
    .state('main.user.prepaidList', {
      url: '/prepaidList',
      controller: 'PrepaidListCtrl as plc',
      templateUrl: 'user/templates/prepaidList.html',
      cache: false
    })
    // 充值
    .state('main.user.prepaid', {
      url: '/prepaid',
      controller: 'PrepaidCtrl as pc',
      templateUrl: 'user/templates/prepaid.html',
      params: {
        prepaidItem: ''
      }
    })
    // 我的地址
    .state('main.user.address', {
      url: '/address',
      cache: false,
      controller: 'AddressCtrl as ac',
      templateUrl: 'user/templates/address.html',
    })
    // 编辑我的地址
    .state('main.user.editAddress', {
      url: '/editAddress',
      controller: 'EditAddressCtrl as eac',
      templateUrl: 'user/templates/editAddress.html',
      params: {
        type: '',
        address: ''
      }
    })
    // 关于
    .state('main.user.aboutUs', {
      url: '/about',
      templateUrl: 'user/templates/aboutUs.html',
    })
    // 常见问题
    .state('main.user.problem', {
      url: '/problem',
      templateUrl: 'user/templates/problem.html',
    })
    // 玩法介绍
    .state('main.user.introduce', {
      url: '/introduce',
      templateUrl: 'user/templates/introduce.html',
    });
}]);
