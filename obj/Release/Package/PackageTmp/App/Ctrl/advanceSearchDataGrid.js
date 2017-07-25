(function () {
    'use strict';

    var app = angular.module('appRouteAccueil');
  
    app.controller('advanceSearchDataGrid', ['$rootScope', '$scope', '$http', 'uiGridConstants', 'gridConfService', '$window', '$location', 'config', function ($rootScope, $scope, $http, uiGridConstants, gridConfService, $window, $location, config) {
        $scope.gridMode = 'SEARCH';
        function rowTemplate() {
            return '<div ng-click="grid.appScope.rowClick(row)" >' +
                         '  <div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell></div>' +
                         '</div>';
        }
        $scope.rowTemplate = rowTemplate();
        $scope.rowClick = function (row) {
            $location.path('/client/' + row.entity.SOC + '/' + row.entity.NUM);
        };

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

        // TODO : SESSIONVARIABLE
        gridConfService.simpleConf$columnDefs$specificDefs($scope, config.url + '/AdvanceSearch/GetDataObject/CC1|Tous|Tous||||/', 30, defs);
        
  
        /* ------------ Events -------------*/
        $scope.$on('AdvanceSearchFilterClick', function (event, SelectedGestionnaire, SelectedAge, SelectedQualification, Multisearch, SelectedCritere, De, A) {
           
            gridConfService.simpleConf$columnDefs$specificDefs($scope, config.url + '/AdvanceSearch/GetDataObject/' + SelectedGestionnaire + '|' + SelectedAge + '|' + SelectedQualification + '|' + Multisearch + '|' + SelectedCritere + '|' + De + '|' + A + '/', 30, defs);
        });
        
    }])

}())