(function (app) {
    'use strict';
    app.controller('widgetGetLitigesController', ['$scope', '$http', '$location', 'gridConfService', 'config', 'cookieService', function ($scope, $http, $location, gridConfService, config, cookieService) {

        var userFilter = ' ';
        var defs = {};
        defs.gridOptions = {};
        defs.gridOptions.enablePaginationControls = false;
        defs.gridOptions.columnDefs = [
                    {
                        'name': 'Societe',
                        'type': 'C'
                    },
                    {
                        'name': 'Numcomptable',
                        'type': 'C'
                    },
                    {
                        'name': 'Raison sociale',
                        'type': 'C'
                    },
                    {
                        'name': 'Montant',
                        'type': 'N',
                        'cellFilter': 'number: 2',
                        cellClass: 'grid-align-right'
                    }
        ];

        if (cookieService.get('userInfo')) {
            var userInfo = cookieService.get('userInfo');
            userFilter = userInfo.Filter;
        }


        function rowTemplate() {
            return '<div ng-click="grid.appScope.rowClick(row)" >' +
                         '  <div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell></div>' +
                         '</div>';
        }
        $scope.rowTemplate = rowTemplate();

        $scope.rowClick = function (row) {
            $location.path('/client/' + row.entity.Societe + '/' + row.entity.Numcomptable);
        };

        gridConfService.simpleConf$columnDefs$specificDefs($scope, config.url + '/Widget/getLitigeBloquant/##paging-params##/?userFilter=' + userFilter, null, defs);



        $scope.action = function (params) {
            alert('action:' + params);
            //$location.path('/client/' + params.societe + '/' + params.numcomptable);
        }

    }]);
})(angular.module('appMain'));
