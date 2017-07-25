(function () {
    'use strict';

    var app = angular.module('appRouteClient');
  
    app.controller('promesseDataGridController', ['$rootScope', '$scope', '$http', 'uiGridConstants', 'gridConfService', '$stateParams', 'config', function ($rootScope, $scope, $http, uiGridConstants, gridConfService, $stateParams,config) {
        

        // Fonction grid factorisée
        var defs = {};
        defs.columnDefsAppend = [
                    {
                        'nomchamp': 'FIDpiece',
                        'isvisible': false
                    },
                    {
                        'nomchamp': 'FID',
                        'isvisible': false
                    }
        ];
        defs.hasSelection = true;
        defs.gridOptions = {};
        defs.gridOptions.enableRowSelection = true;
        defs.gridOptions.enableSelectAll = true;
        defs.gridOptions.enableSelectionBatchEvent = true;
        defs.gridOptions.paginationPageSizes = [25, 50, 100, 1000];
        defs.gridOptions.paginationPageSize = 1000;

        gridConfService.simpleConf$columnDefs$specificDefs($scope, config.url + '/Promesse/GetDataObjectFacture/' + $stateParams.societe + '/' + $stateParams.numcomptable + '/', 60, defs);

        //send an event through the application scope
        $scope.rowsSelected = function (rows) {
            $rootScope.$broadcast('PromesseRowsSelected', rows);
            console.log(rows);
        }

        $scope.gridCompleted = false;
        $scope.ids = [];
        
        $scope.$on('DataGridCompleted', function (event) {

            $scope.gridCompleted = true;
            $scope.SelectFactures();
        });
        
        $scope.SelectFactures = function () {
            if ($scope.gridCompleted) {
                if ($scope.ids) {
                    for (var i = 0 ; i < $scope.gridOptions.data.length; i++) {
                        $scope.gridApi.grid.modifyRows($scope.gridOptions.data);
                        if ($scope.ids[$scope.gridOptions.data[i].FID]) {
                            $scope.gridApi.selection.selectRow($scope.gridOptions.data[i]);
                        }
                    }
                }
            }
        }

        $scope.$on('SelectFactures', function (event, ids) {
            $scope.ids = ids;
            $scope.SelectFactures();
        });
        
    }])

}())