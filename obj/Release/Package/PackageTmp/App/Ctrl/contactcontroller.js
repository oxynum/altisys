(function () {
    'use strict';

    var app = angular.module('appRouteClient');

    app.controller('contactcontroller', ['$scope', '$http', 'uiGridConstants', 'gridConfService', '$stateParams', 'config', function ($scope, $http, uiGridConstants, gridConfService, $stateParams,config) {
       
        function cellTemplate() {
            return '<div class="personal-drop dropdown"><a class="btn-burger"><span>&nbsp;</span></a><ul class="drop"><li><a ui-sref="contactUpdate({id:row.entity.FID})">Modifier</a></li><li><a ui-sref="deleteContact({id:row.entity.FID})">Supprimer</a></li><li><a ui-sref="Duplicate({id:row.entity.FID})">Dupliquer</a></li><li><a ui-sref="Add({societe:\'' + $stateParams.societe + '\', numcomptable:\'' + $stateParams.numcomptable + '\'})">Ajouter</a></li></ul></div>';
        }
        $scope.cellTemplate = cellTemplate();


        var defs = {};
        defs.columnDefsAppend = [
                    {
                        'nomchamp': 'FID',
                        'isvisible': false
                    }
        ];

        defs.gridOptions = {};
        defs.gridOptions.paginationPageSizes = [25, 50, 100, 1000];

        if ($scope.cellTemplate) {
            //console.log('$scope.cellTemplate:' + $scope.cellTemplate);
            defs.columnDefsAppend.push({
                nomchamp: 'Actions',
                isvisible: true,
                cellTemplate: $scope.cellTemplate
            });
        }
        gridConfService.simpleConf$columnDefs$specificDefs($scope, config.url + '/Contact/GetDataObject/' + $stateParams.societe + '/' + $stateParams.numcomptable + '/', 250, defs);




    }])

}())