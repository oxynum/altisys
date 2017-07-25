(function () {
    'use strict';

    var app = angular.module('appRouteClient');
  
    app.controller('courrierDataGridController', ['$rootScope', '$scope', '$http', 'uiGridConstants', 'gridConfService', '$stateParams', 'config', function ($rootScope, $scope, $http, uiGridConstants, gridConfService, $stateParams, config) {
        

        // Fonction grid factorisée


        var defs = {};
        
        defs.columnDefsAppend = [
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
            $rootScope.$broadcast('CourrierRowsSelected', rows);
            console.log(rows);
        }


        $scope.$on('SelectFactures', function (event, ids) {
            if (ids) {
                for (var i = 0 ; i < $scope.gridOptions.data.length; i++) {
                    if (ids[$scope.gridOptions.data[i].FID]) {
                        $scope.gridApi.selection.selectRow($scope.gridOptions.data[i]);
                    }
                }
            }
        });
        
    }])

}())