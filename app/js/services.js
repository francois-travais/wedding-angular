'use strict';

/* Services */

var weddingServices = angular.module('weddingServices', ['ngResource']);

weddingServices.factory('Gift', ['$resource',
    function ($resource) {
        return $resource('gifts/:giftId.json', {}, {
            query: {method: 'GET', params: {giftId: 'gifts'}, isArray: true}
        });
    }]);

weddingServices.factory('AccommodationResource', ['$resource',
    function ($resource) {
        return $resource('http://localhost:5000/rest/accommodations', {}, {
            query: {method: 'GET'}
        });
    }]);

weddingServices.factory('ContactResource', ['$resource',
    function ($resource) {
        return $resource('http://localhost:5000/rest/contact', {}, {
            send: {method: 'POST'}
        });
    }]);

weddingServices.factory('ReplyResource', ['$resource',
    function ($resource) {
        return $resource('http://localhost:5000/rest/reply', {}, {
            send: {method: 'POST'}
        });
    }]);

weddingServices.factory('MapIconMarker', function () {
    var icon = function (iconUrl) {
        return {
            iconUrl: iconUrl,
            iconSize: [32, 37], // size of the icon
            iconAnchor: [16, 37], // point of the icon which will correspond to marker's location
            popupAnchor: [0, -30]
        };
    };
    return {icon: icon};
});
