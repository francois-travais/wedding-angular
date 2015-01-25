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

weddingDirectives.directive('weddingNumber', function () {
    function link(scope, element, attrs, ctrl) {
        ctrl.$parsers.push(function (viewValue) {
            return parseInt(viewValue);
        });

        ctrl.$formatters.push(function (value) {
            if (value) {
                value = parseInt(value);
            }
            return value;
        })
    }

    function controller($scope, $element, $attrs) {

    }

    return {
        require: '^ngModel',
        restrict: 'A',
        controller: controller,
        link: link
    };
});

weddingDirectives.directive('weddingMin', function () {
    function link(scope, element, attrs, ctrls) {
        var nbCtrl = ctrls[0], modelCtrl = ctrls[1];
        var minVal = parseInt(attrs.weddingMin);

        modelCtrl.$validators.weddingMin = function (modelValue, viewValue) {
            if (modelCtrl.$isEmpty(modelValue) || !minVal) {
                return true;
            }
            return modelValue >= minVal;
        };
    }

    return {
        require: ['weddingNumber', '^ngModel'],
        restrict: 'A',
        link: link
    };
});

weddingDirectives.directive('weddingMax', function () {
    function link(scope, element, attrs, ctrls) {
        var nbCtrl = ctrls[0], modelCtrl = ctrls[1];
        var maxVal = parseInt(attrs.weddingMax);

        modelCtrl.$validators.weddingMax = function (modelValue, viewValue) {
            if (modelCtrl.$isEmpty(modelValue) || !maxVal) {
                return true;
            }
            return modelValue <= maxVal;
        };
    }

    return {
        require: ['weddingNumber', '^ngModel'],
        restrict: 'A',
        link: link
    };
});

weddingDirectives.directive('giftListItem', ['GiftResource', function (GiftResource) {
    function link(scope, element, attrs) {

    }

    function controller($scope, $element, $attrs, $modal) {
        var step = 10;

        function init() {
            $scope.gift.to_book = 0;
        }
        init();

        $scope.available = function() {
            return $scope.gift.price - $scope.gift.booked;
        };

        $scope.isDisabled = function (form) {
            return !form.$dirty || form.$invalid;
        };

        $scope.hasError = function (form) {
            return form.$dirty && form.$invalid;
        };

        $scope.openConfirmModel = function (form) {
            if ($scope.isDisabled(form)) return;

            var modalInstance = $modal.open({
                templateUrl: 'partials/components/gift-book-modal.html',
                controller: 'GiftBookFormCtrl',
                scope: $scope
            });

            modalInstance.result.then(function () {
                console.info('Booking gift form of ' + $scope.gift.id + ' modal dismissed at: ' + new Date());
                GiftResource.get({id: $scope.gift.id}).$promise.then(function (gift) {
                    $scope.gift = gift.gift;
                    init();
                    form.$dirty = false;
                    console.log($scope.gift);
                })
            });
        };
    }

    return {
        restrict: 'E',
        templateUrl: 'partials/components/gift-list-item-form.html',
        scope: {
            gift: '=gift'
        },
        link: link,
        controller: controller
    };
}]);

weddingDirectives.directive('weddingMinus', function () {
    function link(scope, element, attrs, ctrl) {
        var step = 10;

        scope.minus = function() {
            if (ctrl.$viewValue >= step) {
                ctrl.$setViewValue(ctrl.$viewValue - step);
            }
        };
    }

    return {
        require: 'ngModel',
        restrict: 'A',
        link: link
    };
});

weddingDirectives.directive('weddingPlus', function () {
    function link(scope, element, attrs, ctrl) {
        var step = 10;
        var available = parseInt(attrs.weddingPlus);

        scope.plus = function() {
            if (available - ctrl.$viewValue >= step) {
                ctrl.$setViewValue(ctrl.$viewValue + step);
            } else {
                ctrl.$setViewValue(available);
            }
        };
    }

    return {
        require: 'ngModel',
        restrict: 'A',
        link: link
    };
});