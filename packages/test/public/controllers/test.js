'use strict';

angular.module('mean').controller('TestController', ['$scope', 'Global',
    function($scope, Global, Test) {
        $scope.global = Global;
        $scope.test = {
            name: 'test'
        };
    }
]);
