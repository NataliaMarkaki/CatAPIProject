(function () {
'use strict';
angular.module('ct.cuteApp.pages.mycuties')

.component('ctMycutiesComponent', {
  templateUrl: 'pages/mycuties/mycuties.html',
  controller: MyCutiesController,
  controllerAs: 'MyCutiesCtrl',
  bindings: {}
});

function MyCutiesController(getAnimals) {

  var ctrl = this;

  ctrl.likedAnimals = getAnimals.liked();
  ctrl.dislikedAnimals = getAnimals.disliked();

}

})();
