(function () {
    'use strict';

    var app = angular.module('appMain')
    app.controller('widgetSettingsController', ['$rootScope', '$scope', '$http', '$stateParams', 'cookieService', function ($rootScope, $scope, $http, $stateParams, cookieService) {
        
        $scope.widget = $stateParams.widget;

        $scope.submit = function (widget) {
            // TODO save
        };

    }]);


}());