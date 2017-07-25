(function () {
    'use strict';

    var app = angular.module('appRouteClient');

    app.controller('planController', ['$scope', '$http', 'uiGridConstants', 'gridConfService', '$stateParams', 'config', function ($scope, $http, uiGridConstants, gridConfService, $stateParams, config) {
       

        $scope.gridMode = 'PLAN';

        var defs = {};
        defs.columnDefs = [
                    {
                        'nomchamp': 'Num_echeance',
                        'isvisible': true
                    },
                    {
                        'nomchamp': 'Date_echeance',
                        'isvisible': true
                    },
                    {
                        'nomchamp': 'Mt_restant_du',
                        'isvisible': true
                    },
                    {
                        'nomchamp': 'Mt_echeance',
                        'isvisible': true
                    },
                    {
                        'nomchamp': 'Mt_amortissement',
                        'isvisible': true
                    },
                    {
                        'nomchamp': 'Mt_interet',
                        'isvisible': true
                    },
                    {
                        'nomchamp': 'B_modifie',
                        'isvisible': true
                    },
                    {
                        'nomchamp': 'B_compta',
                        'isvisible': true
                    },
                    {
                        'nomchamp': 'Mt_frais',
                        'isvisible': true
                    },
                    {
                        'nomchamp': 'Taux_interet_ech',
                        'isvisible': true
                    }
        ];

        gridConfService.simpleConf$columnDefs$specificDefs($scope, config.url + '/Echeancier/GetPlanObject/' + $stateParams.idecheancier + '/', 40, defs);



    }])

}())