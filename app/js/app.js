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

weddingApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/gifts', {
                templateUrl: 'partials/gift-list.html',
                controller: 'GiftListCtrl'
            }).
            when('/home', {
                templateUrl: 'partials/home.html',
                controller: 'HomeCtrl'
            }).
            when('/accommodation', {
                templateUrl: 'partials/accommodation.html',
                controller: 'AccommodationCtrl'
            }).
            when('/contact', {
                templateUrl: 'partials/contact.html',
                controller: 'ContactCtrl'
            }).
            otherwise({
                redirectTo: '/home'
            });
    }]);
