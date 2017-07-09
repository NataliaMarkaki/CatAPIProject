(function () {
'use strict';
angular.module('ct.cuteApp.component.services.storeAnimalsLocalStorage')
/*@ngInject*/
.factory('storeAnimals', function () {

  var LIKED_ANIMALS_DB_NAME = 'ct.cuteApp.likedAnimals';
  var DISLIKED_ANIMALS_DB_NAME = 'ct.cuteApp.dislikedAnimals';

  return {
    like: like,
    dislike: dislike
  };

  function like(animal) {
    sanitizeAnimal(animal);
    var likedAnimalsDB = localStorage.getItem(LIKED_ANIMALS_DB_NAME);
    var likedAnimals = likedAnimalsDB ? JSON.parse(likedAnimalsDB) : [];
    likedAnimals.push(animal);
    localStorage.setItem(LIKED_ANIMALS_DB_NAME, JSON.stringify(likedAnimals));
  }

  function dislike(animal) {
    sanitizeAnimal(animal);
    var dislikedAnimalsDB = localStorage.getItem(DISLIKED_ANIMALS_DB_NAME);
    var dislikedAnimals = dislikedAnimalsDB ? JSON.parse(dislikedAnimalsDB) : [];
    dislikedAnimals.push(animal);
    localStorage.setItem(DISLIKED_ANIMALS_DB_NAME, JSON.stringify(dislikedAnimals));
  }

  function sanitizeAnimal(animal) {
    if (!(animal && animal.image)) {
      throw new Error('Invalid arguments');
    }
  }
});

})();
