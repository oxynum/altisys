(function () {
    'use strict';

    var app = angular.module('appRouteAccueil');
  
    app.controller('campagneLotDataGrid', ['$rootScope', '$scope', '$http', 'uiGridConstants', 'gridConfService', '$window', 'listClientService', '$location', 'config', 'cookieService', function ($rootScope, $scope, $http, uiGridConstants, gridConfService, $window, listClientService, $location, config, cookieService) {
        $scope.gridMode = 'CAMPAGNELOT';
        function cellTemplate() {
            return '<div class="personal-drop dropdown"><a class="btn-burger"><span>&nbsp;</span></a><ul class="drop"><li><a ui-sref="afficheCampagne({id:row.entity.FILTER})">Voir le courrier</a></li><li><a href="" ng-click="grid.appScope.ClientRowClick(row)">Voir la fiche client</a></li><li><a href="" ng-click="grid.appScope.ValidRowClick(row)">Traiter cette relance</a></li></ul></div>';
        }
        $scope.cellTemplate = cellTemplate();

        var defs = {};
        defs.hasSelection = true;
        defs.gridOptions = {};
        defs.gridOptions.enableRowSelection = true;
        defs.gridOptions.enableSelectAll = true;
        defs.gridOptions.enableSelectionBatchEvent = true;
        defs.gridOptions.paginationPageSizes = [25, 50, 100, 1000];
        defs.columnDefsAppend = [
                    {
                        nomchamp: 'FILTER',
                        isvisible: false
                    },
                    {
                        nomchamp: 'SOC',
                        isvisible: false
                    },
                    {
                        nomchamp: 'NUM',
                        isvisible: false
                    }
        ];

        if ($scope.cellTemplate) {
            //console.log('$scope.cellTemplate:' + $scope.cellTemplate);
            defs.columnDefsAppend.push({
                nomchamp: 'Actions',
                isvisible: true,
                cellTemplate: $scope.cellTemplate
            });
        }

        $scope.refreshGrid = function () {
            gridConfService.simpleConf$columnDefs$specificDefs($scope, config.url + '/CampagneLot/GetDataObject/' + $scope.userFilter + '/' + $scope.SelectedType + '|' + $scope.SelectedSociete + '|' + $scope.SelectedScenario + '|' + $scope.SelectedNiveau + '|' + $scope.Multisearch + '/', 190, defs);
         };
        
        $scope.userFilter = '';

        if (cookieService.get('userInfo')) {
            var userInfo = cookieService.get('userInfo');
            $scope.userFilter = userInfo.Filter;
        }

        $scope.SelectedType = '';
        $scope.SelectedSociete = '';
        $scope.SelectedScenario = '';
        $scope.SelectedNiveau = '';
        $scope.Multisearch = '';

        gridConfService.simpleConf$columnDefs$specificDefs($scope, config.url + '/CampagneLot/GetDataObject/' + $scope.userFilter + '/' + $scope.SelectedType + '|' + $scope.SelectedSociete + '|' + $scope.SelectedScenario + '|' + $scope.SelectedNiveau + '|' + $scope.Multisearch + '/', 190, defs);

        /* ------------ Events -------------*/
        $scope.$on('CampagneLotFilterClick', function (event, SelectedType, SelectedSociete, SelectedScenario, SelectedNiveau, Multisearch) {
            $scope.SelectedType = SelectedType;
            $scope.SelectedSociete=SelectedSociete;
            $scope.SelectedScenario=SelectedScenario;
            $scope.SelectedNiveau=SelectedNiveau;
            $scope.Multisearch = Multisearch;

            $scope.refreshGrid();
        });


        //send an event through the application scope
        $scope.rowsSelected = function (rows) {
            var ids = [];
            for (var i = 0; i < rows.length; i++) {
                var item = rows[i].FILTER;
                ids.push(item);
            }
            $scope.ids = ids;
            $rootScope.$broadcast('CampagneLotIds', ids);
            //console.log(JSON.stringify(ids));
        }
        
        $scope.Valid = function () {
            console.log('Valid:' + JSON.stringify($scope.ids));
            $http({
                method: 'POST',
                url: config.url + '/CampagneLot/ValidRelance',
                data: JSON.stringify($scope.ids),
                headers: { 'Content-Type': 'application/json' },

            })
            .success(function (data, status, headers, config) {
                $scope.refreshGrid();
                $rootScope.$broadcast('CampagneValidated');
            })
            .error(function (data, status, header, config) {

            });
        };

        $scope.ClientRowClick = function (row) {
            $location.path('/client/' + row.entity.SOC + '/' + row.entity.NUM);
        };

        $scope.ValidRowClick = function (row) {
            var id = [];
            console.log('ValidRowClick:' + row.entity.FILTER);
            id.push(row.entity.FILTER);
            console.log('id:' + JSON.stringify(id));
            $http({
                method: 'POST',
                url: config.url + '/CampagneLot/ValidRelance',
                data: JSON.stringify(id),
                headers: { 'Content-Type': 'application/json' },

            })
           .success(function (data, status, headers, config) {
               $scope.refreshGrid();
               $rootScope.$broadcast('CampagneValidated');
           })
        };

    }])

}())