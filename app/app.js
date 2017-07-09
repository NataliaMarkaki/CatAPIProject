(function () {
'use strict';

angular.module('cuteApp', [
  'ui.router',
  'ngResource',
  'ct.cuteApp.components.header',
  'ct.cuteApp.components.cuteItem',
  'ct.cuteApp.component.services.mycatApi',
  'ct.cuteApp.component.services.storeAnimalsLocalStorage',
  'ct.cuteApp.component.services.getAnimalsLocalStorage',
  'ct.cuteApp.pages.cuteme',
  'ct.cuteApp.pages.mycuties'
])

.value('THE_CAT_API_URL', 'http://thecatapi.com/api/images/:cmd')

.config(function ($urlRouterProvider) {
  $urlRouterProvider.otherwise('/cuteme');
})
/*@ngInject*/
.controller('mainController', function ($scope) {
  $scope.message = 'Hello World!';
});

})();
