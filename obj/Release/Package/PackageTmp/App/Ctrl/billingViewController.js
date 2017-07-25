(function () {
    'use strict';

    var app = angular.module('appRouteClient');
    app.controller('billingViewController', ['$rootScope', '$scope', '$http', '$stateParams', 'storageService', 'config', function ($rootScope, $scope, $http, $stateParams, storageService, config) {

            $scope.selectGrid = function(gridMode)
            {
                $rootScope.$broadcast('clientSelectGrid', gridMode);
            }
        
            $scope.GetCompteur = function() {

                $http({
                    method: 'GET',
                    url: config.url + '/client/GetFactureCompteurByClient/' + $stateParams.societe + '/' + $stateParams.numcomptable
                })
                 .success(function (data) {
                     $scope.factureCompteurs = data;
                 });

                $scope.$on('refresh', function () {
                    $scope.GetCompteur();
                });
            }
            $scope.GetCompteur();
        // Info client
            $http({
                method: 'GET',
                url: config.url + '/Client/GetClientInfo/' + $stateParams.societe + '/' + $stateParams.numcomptable + '/'
            })
            .success(function (data) {
                $scope.Client = data;
                $rootScope.$broadcast('ClientInfo', $scope.Client);
            });

        }]);

}());