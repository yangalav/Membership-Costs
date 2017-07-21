angular.module('appRoutes', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider.state({
      name: 'myApp',
      url: '/',
      templateUrl: 'templates/myapp.html',
      controller: 'AppCtrl'
    });

    $urlRouterProvider.otherwise('/');
  }]);
