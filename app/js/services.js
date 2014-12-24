'use strict';

/* Services */

var weddingServices = angular.module('weddingServices', ['ngResource', 'config']);

weddingServices.factory('Gift', ['$resource',
    function ($resource) {
        return $resource('gifts/:giftId.json', {}, {
            query: {method: 'GET', params: {giftId: 'gifts'}, isArray: true}
        });
    }]);

weddingServices.factory('AccommodationResource', ['$resource', 'restHost', 'restPort', 'restPath',
    function ($resource, restHost, restPort, restPath) {
        return $resource('http://' + restHost + ':' + restPort + '/' + restPath + '/accommodations', {}, {
            query: {method: 'GET'}
        });
    }]);

weddingServices.factory('ContactResource', ['$resource', 'restHost', 'restPort', 'restPath',
    function ($resource, restHost, restPort, restPath) {
        return $resource('http://' + restHost + ':' + restPort + '/' + restPath + '/contact', {}, {
            send: {method: 'POST'}
        });
    }]);

weddingServices.factory('ReplyResource', ['$resource', 'restHost', 'restPort', 'restPath',
    function ($resource, restHost, restPort, restPath) {
        return $resource('http://' + restHost + ':' + restPort + '/' + restPath + '/reply', {}, {
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

weddingServices.factory('CurrentWeather', ['$resource', function ($resource) {
    return $resource('http://api.openweathermap.org/data/2.5/weather?id=3026141&units=metric&lang=fr');
}]);