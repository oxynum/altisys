(function () {
    'use strict';

    var app = angular.module('appRoutePortefeuille');
  
    app.controller('reaffectationDataGridController', ['$rootScope', '$scope', '$http', 'uiGridConstants', 'gridConfService', '$stateParams', 'config', function ($rootScope, $scope, $http, uiGridConstants, gridConfService, $stateParams, config) {
        

        var defs = {};
        defs.columnDefsAppend = [
                    {
                        'nomchamp': 'SOC',
                        'isvisible': false
                    },
                    {
                        'nomchamp': 'NUM',
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
        gridConfService.simpleConf$columnDefs$specificDefs($scope, $stateParams.url , 30, defs);


       

        $scope.rowsSelected = function (rows) {
            $rootScope.$broadcast('reaffectationRowsSelected', rows);
        }


        
    }])

}())