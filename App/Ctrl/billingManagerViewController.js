(function () {
    'use strict';

    var app = angular.module('appRouteClient');
    app.controller('billingManagerViewController', ['$rootScope', '$scope', '$http', '$stateParams', 'storageService', 'config', function ($rootScope, $scope, $http, $stateParams, storageService, config) {

            $scope.selectGrid = function(gridMode)
            {
                $rootScope.$broadcast('portefeuilleSelectGrid', gridMode);
            }

            $http({
                method: 'GET',
                url: config.url + '/client/GetFactureCompteur/'
            })
             .success(function (data) {
                 $scope.factureCompteurs = data;
             });


            $http({
                method: 'GET',
                url: config.url + '/Client/GetEchuNonEchu/'
            })
                 .success(function (data) {
                     $scope.echu = data['ECHU'];
                     $scope.nonechu = data['NONECHU'];
                 });

            
        }]);

}());