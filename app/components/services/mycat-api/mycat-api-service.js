/* global $:false */
(function ($) {
'use strict';
angular.module('ct.cuteApp.component.services.mycatApi')

/*@ngInject*/
.factory('mycatApi', function ($resource, THE_CAT_API_URL) {
  return {
    animals: getAnimals()
  };

  function getAnimals() {
    return $resource(THE_CAT_API_URL, { cmd: '@cmd' }, {
      getImages: {
        method: 'GET',
        params: {
          cmd: 'get',
          format: 'html',
          results_per_page: 20 // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
        },
        isArray: true,
        transformResponse: function (data) {
          return $(data)
            .map(function () {
              return $(this).find('img').attr('src');
            }).filter(function (url) {
              return !!url;
            })
            .toArray();
        }
      }
    });
  }
});
})($);
