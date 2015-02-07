'use strict';

var config = angular.module('config', []);
config.constant('restHost', 'localhost');
config.constant('restProtocol', 'http');
config.constant('restPort', 5000);
config.constant('restPath', 'v1');