(function () {
'use strict';

angular.module('ct.cuteApp.pages.mycuties', [])
/*@ngInject*/
.config(function ($stateProvider) {
  $stateProvider.state('mycuties', {
    url: '/my-cuties',
    component: 'ctMycutiesComponent'
  });
});

})();
