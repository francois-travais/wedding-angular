'use strict';

/* App Module */

var weddingApp = angular.module('weddingApp', [
    'ngRoute',
    'leaflet-directive',
    'ui.bootstrap',
    'config',
    'weddingControllers',
    'weddingServices',
    'weddingDirectives',
    'weddingFilters'
]);

weddingApp.config(['$routeProvider', 'basepath',
    function ($routeProvider, basepath) {
        $routeProvider.
            when(basepath + '/gifts', {
                templateUrl: 'partials/gift-list.html',
                controller: 'GiftListCtrl'
            }).
            when(basepath + '/home', {
                templateUrl: 'partials/home.html',
                controller: 'HomeCtrl'
            }).
            when(basepath + '/accommodation', {
                templateUrl: 'partials/accommodation.html',
                controller: 'AccommodationCtrl'
            }).
            when(basepath + '/contact', {
                templateUrl: 'partials/contact.html',
                controller: 'ContactCtrl'
            }).
            otherwise({
                redirectTo: basepath + '/home'
            });
    }]);
