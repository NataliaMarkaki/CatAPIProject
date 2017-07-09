(function () {
'use strict';
angular.module('ct.cuteApp.pages.cuteme')

.component('ctCutemeComponent', {
  templateUrl: 'pages/cuteme/cuteme.html',
  controller: CutemeController,
  controllerAs: 'cuteMeCtrl',
  bindings: {}
});

function CutemeController(mycatApi, storeAnimals, $q) {

  var ctrl = this;

  ctrl.$onInit = onInit;

  /////////////////////////////////////////////////////////////

  function onInit() {
    ctrl.animal = undefined;
    ctrl.animalsImages = [];
    getNextAnimal();
  }

  function getNextAnimal() {
    var fetchedImages = $q.resolve();
    if (ctrl.animalsImages.length === 0) {
      fetchedImages = mycatApi.animals.getImages().$promise
        .then(function (result) {
          ctrl.animalsImages = result;
        });
    }
    return fetchedImages
      .then(function () {
        var animalImage = ctrl.animalsImages.pop();
        ctrl.animal = {
          image: animalImage,
          title: ''
        };
        return ctrl.animal;
      });
  }


  ctrl.like = function () {
    storeAnimals.like(ctrl.animal);
    getNextAnimal();
  };

  ctrl.dislike = function () {
    storeAnimals.dislike(ctrl.animal);
    getNextAnimal();
  };

  ctrl.skip = function () {
    getNextAnimal();
  };
}

})();
