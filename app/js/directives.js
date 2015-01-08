'use strict';

/* Directives */
var weddingDirectives = angular.module('weddingDirectives', []);


weddingDirectives.directive('fixedTop', function ($window) {
    function controller($scope, $element, $attrs) {

        angular.element($window).on('scroll', function () {
            if ($window.scrollY > 100) {
                if (!$element[0].classList.contains("sticky-top")) {
                    $element[0].classList.add("sticky-top");
                }
            } else {
                if ($element[0].classList.contains("sticky-top")) {
                    $element[0].classList.remove("sticky-top");
                }
            }
        });
    }

    return {
        restrict: 'A',
        controller: controller
    };
});

weddingDirectives.directive('stickLeft', function ($window) {
    function controller($scope, $element, $attrs) {
        angular.element($window).on('scroll', function () {
            if ($window.scrollY > parseInt($attrs['stickLeft'])) {
                if (!$element[0].classList.contains("sticky")) {
                    $element[0].classList.add("sticky");
                }
            } else {
                if ($element[0].classList.contains("sticky")) {
                    $element[0].classList.remove("sticky")
                }
            }
        });
    }

    return {
        restrict: 'A',
        controller: controller
    };
});


weddingDirectives.directive('counter', ['$interval', function ($interval) {
    function link(scope, element, attrs) {
        var timeoutId;
        //var targetDate = new Date(2015, 8, 29, 16, 0);
        var targetDate = scope.date;

        function updateTime() {
            var now = new Date();
            var s = -now.getTimezoneOffset() * 60 + (targetDate.getTime() - now.getTime()) / 1000;
            var d = Math.floor(s / 86400);
            scope.days = d;
            s -= d * 86400;

            var h = Math.floor(s / 3600);
            scope.hours = h;
            s -= h * 3600;

            scope.minutes = Math.floor(s / 60);
        }

        element.on('$destroy', function () {
            $interval.cancel(timeoutId);
        });

        // start the UI update process; save the timeoutId for canceling
        timeoutId = $interval(function () {
            updateTime(); // update DOM
        }, 1000);
    }

    return {
        restrict: 'E',
        templateUrl: 'partials/components/counter.html',
        scope: {
            date: '='
        },
        replace: true,
        link: link
    };
}]);

weddingDirectives.directive('weather', ['CurrentWeather', function (CurrentWeather) {
    function controller($scope, $element, $attrs) {
        CurrentWeather.get().$promise.then(function (response) {
            console.log(response);
            var weather = response.weather[0];
            $scope.icon = 'http://openweathermap.org/img/w/' + weather.icon + '.png'
            $scope.wind = response.wind;
            $scope.description = weather.description;
            $scope.temperature = (response.main.temp).toFixed(0);
            $scope.humidity = response.main.humidity;
            $scope.pressure = response.main.pressure;
            $scope.clouds = response.clouds.all;
        })
    }

    return {
        restrict: 'E',
        templateUrl: 'partials/components/weather.html',
        scope: {
        },
        replace: true,
        controller: controller
    };
}]);