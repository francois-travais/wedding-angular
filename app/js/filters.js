'use strict';

/* Filters */

var weddingFilters = angular.module('weddingFilters', []);

weddingFilters.filter('accomodationTypeFilter', ['MapIconMarker', function (MapIconMarker) {
    return function (array, expression, comparator, markers) {
        if (!angular.isArray(array)) return array;

        var matchs = [];
        angular.forEach(array, function (el) {
            var match = false;
            for (var i = 0; i < expression.length; i++) {
                if (expression[i].checked && ('' + el[comparator]).indexOf(expression[i].display) > -1) {
                    matchs.push(el);
                    match = true;
                    break;
                }
            }
            if (match) {
                markers[el.id] = {
                    'lat': el.coordinates[0],
                    'lng': el.coordinates[1],
                    'title': el.name,
                    'message': '<a href="' + el.url + '" target="_blank">' + el.name + '</a>'
                };
                if (el["icon"]) {
                    markers[el.id]["icon"] = MapIconMarker.icon(el.icon);
                }
            } else {
                delete markers[el.id];
            }
        });
        return matchs;
    };
}]);
