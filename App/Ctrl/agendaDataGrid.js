(function () {
    'use strict';

    var app = angular.module('appRouteAccueil');
    app.controller('agendaDataGrid', ['$rootScope', '$scope', '$http', 'uiGridConstants', 'gridConfService', '$window', 'listClientService', '$location', 'config', 'cookieService', function ($rootScope, $scope, $http, uiGridConstants, gridConfService, $window, listClientService, $location, config, cookieService) {
        $scope.gridMode = 'AGENDA';
        function rowTemplate() {
            
            return '<div ng-click="grid.appScope.rowClick(row)"  style="color: {{row.entity.ColorCritere}}" >' +
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

        $scope.refreshGrid = function () {
            gridConfService.simpleConf$columnDefs$specificDefs($scope, config.url + '/Agenda/GetDataObject/' + $scope.userFilter + '/' + $scope.SelectedGestionnaire + '|' + $scope.SelectedAge + '|' + $scope.SelectedQualification + '|' + $scope.SelectedType + '|' + $scope.Multisearch + '|' + $scope.Dispo + '/', 40, defs);
            // TODO : SESSIONVARIABLE
            listClientService.set($scope.userFilter  + '/' + $scope.SelectedGestionnaire + '|' + $scope.SelectedAge + '|' + $scope.SelectedQualification + '|' + $scope.SelectedType + '|' + $scope.Multisearch + '|' + $scope.Dispo + '/0/50/1/ASC');//TODO retrieve filter from a cookie 
        };
        
        $scope.userFilter = '';

        if (cookieService.get('userInfo')) {
            var userInfo = cookieService.get('userInfo');
            $scope.userFilter = userInfo.Filter;
        }

        $scope.SelectedGestionnaire = '';
        $scope.SelectedAge = '';
        $scope.SelectedQualification = '';
        $scope.SelectedType = '';
        $scope.Multisearch = '';
        $scope.Dispo = '';
        gridConfService.simpleConf$columnDefs$specificDefs($scope, config.url + '/Agenda/GetDataObject/' + $scope.userFilter  + '/sansgestionnaire|' + $scope.SelectedAge + '|' + $scope.SelectedQualification + '|' + $scope.SelectedType + '|' + $scope.Multisearch + '|' + $scope.Dispo + '/', 40, defs);

        /* ------------ Events -------------*/
        $scope.$on('AgendaFilterClick', function (event,SelectedGestionnaire,SelectedAge,SelectedQualification,SelectedType,Multisearch,Dispo) {
            $scope.SelectedGestionnaire = SelectedGestionnaire;
            $scope.SelectedAge = SelectedAge;
            $scope.SelectedQualification = SelectedQualification;
            $scope.SelectedType = SelectedType;
            $scope.Multisearch = Multisearch;
            $scope.Dispo = Dispo;
            $scope.refreshGrid();
        });
        
    }])

}())