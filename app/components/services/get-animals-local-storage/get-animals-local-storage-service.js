(function () {
'use strict';
angular.module('ct.cuteApp.component.services.getAnimalsLocalStorage')
/*@ngInject*/
.factory('getAnimals', function () {

  var LIKED_ANIMALS_DB_NAME = 'ct.cuteApp.likedAnimals';
  var DISLIKED_ANIMALS_DB_NAME = 'ct.cuteApp.dislikedAnimals';

  return {
    liked: liked,
    disliked: disliked
  };

  function liked() {
    var likedAnimalsDB = localStorage.getItem(LIKED_ANIMALS_DB_NAME);
    return likedAnimalsDB ? JSON.parse(likedAnimalsDB) : [];
  }

  function disliked() {
    var dislikedAnimalsDB = localStorage.getItem(DISLIKED_ANIMALS_DB_NAME);
    return dislikedAnimalsDB ? JSON.parse(dislikedAnimalsDB) : [];
  }
});
})();
