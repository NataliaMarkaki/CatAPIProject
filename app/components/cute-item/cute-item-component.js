(function () {
'use strict';
angular.module('ct.cuteApp.components.cuteItem')

.component('ctCuteItemComponent', {
  templateUrl: 'components/cute-item/cute-item.html',
  controller: CuteItemController,
  controllerAs: 'cuteItemCtrl',
  bindings: {
    animal: '<',
    vote: '@'
  }
});

function CuteItemController() {

  var LIKED_ANIMAL_COLOR = 'label-success';
  var DISLIKED_ANIMAL_COLOR = 'label-danger';

  var ctrl = this;

  ctrl.$onInit = onInit;

  /////////////////////////////////////////////////////////////

  function onInit() {
    getAnimal();
  }


  function getAnimal() {
    if (ctrl.vote !== 'dislike') {
      ctrl.voteColor = LIKED_ANIMAL_COLOR;
      ctrl.voteLabel = 'LIKED';
    }
    else {
      ctrl.voteColor = DISLIKED_ANIMAL_COLOR;
      ctrl.voteLabel = 'DISLIKED';
    }
    if (!ctrl.animal.title) {
      ctrl.animal.title = 'No Name Given';
    }
  }

}
})();
