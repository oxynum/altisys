﻿(function () {
    'use strict';
 
    var app = angular.module('appRouteClient')
    app.controller('echeancierDeleteController', ['$rootScope', '$scope', '$http', '$stateParams', 'modalState', 'config', function ($rootScope, $scope, $http, $stateParams, modalState, config) {


        $scope.DeleteEcheancier = function () {

            $http({
                method: 'POST',
                url: config.url + '/Echeancier/DeleteEcheancier',
                data: $stateParams.idecheancier,
                headers: { 'Content-Type': 'application/json' },

            })
            .success(function (data, status, headers, config) {
                $rootScope.$broadcast('refresh');
                $scope.$dismiss();
            })
            .error(function (data, status, header, config) {
                $scope.$dismiss();
            });
        }
    }]);
 
}());