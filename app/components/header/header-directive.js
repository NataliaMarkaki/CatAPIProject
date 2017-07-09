(function () {
'use strict';
angular.module('ct.cuteApp.components.header')

.directive('ctHeader', function () {
  return {
    restrict: 'E',
    templateUrl: 'components/header/header.html',
    bindToController: true,
    controller: HeaderController,
    controllerAs: 'headerCtrl'
  };
});

function HeaderController() {
  this.navheader = {
    logo: 'CUTEME',
    navlist: [
        { name: 'Cuteme', class: 'cuteme' },
        { name: 'MyCuties', class: 'mycuties' }
    ]
  };
}

})();
