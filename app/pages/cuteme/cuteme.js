(function () {
'use strict';

angular.module('ct.cuteApp.pages.cuteme', [])
/*@ngInject*/
.config(function ($stateProvider) {
  $stateProvider.state('cuteme', {
    url: '/cuteme',
    component: 'ctCutemeComponent'
  });
});

})();
