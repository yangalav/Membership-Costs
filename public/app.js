'use strict';

let myApp = angular.module('myApp', ['appRoutes', 'AppService']);

angular.module('AppCtrl', [
  'myApp',
]);
