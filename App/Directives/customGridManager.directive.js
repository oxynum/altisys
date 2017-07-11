var app = angular.module('appMain');

app.directive('customGridManager', ['$compile', '$templateRequest', function($compile, $templateRequest) {

    var ALL = './Views/_template/GridSimpleView.html';
    var NQ = './Views/_template/GridSimpleView.html';
    var PROMESSE = './Views/_template/GridSimpleView.html';
    var LITIGE = './Views/_template/GridSimpleView.html';
    var ECHEANCIER = './Views/_template/GridSimpleView.html';

    var getTemplate = function (url) {
        var templateUrl = '';

        switch (url) {
            case 'ALL':
                templateUrl = ALL;
                break;
            case 'NQ':
                templateUrl = NQ;
                break;
            case 'PROMESSE':
                templateUrl = PROMESSE;
                break;
            case 'LITIGE':
                templateUrl = LITIGE;
                break;
            case 'ECHEANCIER':
                templateUrl = ECHEANCIER;
                break;
        }

        return templateUrl;
    };

    var linker = function (scope, element, attrs) {
        $templateRequest(getTemplate(attrs.gridMode)).then(function (template) {
            element.html(template);
            $compile(element.contents())(scope);
        });
        
    };

    return {
        restrict: "E",
        replace: true,
        link: linker,
        scope: {
            gridMode: '@',
            columnCommand: '='
        },
        controller: ['$rootScope', '$scope', '$location', 'uiGridConstants', 'gridConfService', '$stateParams', '$http', 'notificationService', '$httpParamSerializer', 'config', function ($rootScope, $scope, $location, uiGridConstants, gridConfService, $stateParams, $http, notificationService, $httpParamSerializer,config) {
            /* ------------Init -------------*/
            $scope.init = undefined;
            $scope.needData = [];
            $scope.needData['ALL'] = true;
            $scope.needData['PROMESSE'] = true;
            $scope.needData['LITIGE'] = true;
            $scope.needData['ECHEANCIER'] = true;
            $rootScope.FilterUrl= '';

            var listeInfo = [];
            listeInfo['ALL'] = [config.url+'/Client/GetDataObjectPortefeuille/ALL/', 30, null, null];
            listeInfo['NQ'] = [config.url+'/Client/GetDataObjectPortefeuille/NQ/', 30, null, null];
            listeInfo['PROMESSE'] = [config.url+'/Client/GetDataObjectPortefeuille/PROMESSE/', 30, null, null];
            listeInfo['LITIGE'] = [config.url+'/Client/GetDataObjectPortefeuille/LITIGE/', 30, null, null];
            listeInfo['ECHEANCIER'] = [config.url+'/Client/GetDataObjectPortefeuille/ECHEANCIER/', 30, null, null];
            var defs = {};
            defs.gridOptions = {};
            defs.gridOptions.paginationPageSizes = [25, 50, 100, 1000];
            defs.columnDefsAppend = [
                        {
                            nomchamp: 'FILTER',
                            isvisible: false
                        }
            ];

            if ($scope.columnCommand) {
                defs.columnDefsAppend.push({
                    nomchamp: 'Update',
                    isvisible: true,
                    cellTemplate: $scope.columnCommand
                });

            }


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

            function rowTemplate() {
                return '<div ng-click="grid.appScope.rowClick(row)" >' +
                             '  <div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell></div>' +
                             '</div>';
            }
            $scope.rowTemplate = rowTemplate();
            $scope.rowClick = function (row) {
                $location.path('/client/' + row.entity.SOC + '/' + row.entity.NUM);
            };

            /*---------------Functions----------------*/
            $scope.refreshGrid = function (mode) {
                gridConfService.expandableConf($scope, listeInfo[mode][0] + '##paging-params##' + $rootScope.FilterUrl, listeInfo[mode][1], listeInfo[mode][2], listeInfo[mode][3], defs);
                $scope.needData[$scope.gridMode] = false;
                $rootScope.$broadcast('scopurlChange', listeInfo[mode][0] + '##paging-params##' + $rootScope.FilterUrl);
            }

            $scope.rowSelectionChanged = function (row) {
                /*------code here------*/
            }

            /* ------------ Events -------------*/
            $scope.$on('portefeuilleSelectGrid', function (event, mode) {

                if ($scope.needData[mode])
                {
                    $scope.getData();
                    $scope.refreshGrid(mode);
                }

            });

            $scope.$on('portefeuilleFilterClick', function (event, SelectedSociete, SelectedGestionnaire, SelectedCommercial, SelectedAge, Client) {


                $rootScope.var = {};
                $rootScope.var.event = event;
                $rootScope.var.SelectedSociete = SelectedSociete;
                $rootScope.var.SelectedGestionnaire = SelectedGestionnaire;
                $rootScope.var.SelectedCommercial = SelectedCommercial;
                $rootScope.var.SelectedAge = SelectedAge;
                $rootScope.var.Client = Client;

                $scope.getData();

                $scope.refreshGrid($scope.gridMode);
                
            });

            $scope.getData = function(){
                $rootScope.FilterUrl = '';
                var params = {};
                if ($rootScope.var)
                {
                    if ($rootScope.var.SelectedSociete) {
                        params.SelectedSociete = $rootScope.var.SelectedSociete;
                    }
                    if ($rootScope.var.SelectedGestionnaire) {
                        params.SelectedGestionnaire = $rootScope.var.SelectedGestionnaire;
                    }
                    if ($rootScope.var.SelectedCommercial) {
                        params.SelectedCommercial = $rootScope.var.SelectedCommercial;
                    }
                    if ($rootScope.var.SelectedAge) {
                        params.SelectedAge = $rootScope.var.SelectedAge;
                    }
                    if ($rootScope.var.Client) {
                        params.Client = $rootScope.var.Client;
                    }
                    if ($httpParamSerializer(params)) {
                        $rootScope.FilterUrl = '?' + $httpParamSerializer(params);
                    }
                }

            };



            $scope.$on('needRefreshData', function (event, needRefreshData) {
                $scope.needData[$scope.gridMode] = needRefreshData;
            });

            /* ------------On Load -------------*/
            if (!$scope.init)
            {
                $scope.refreshGrid($scope.gridMode);
                $scope.init = true;
            }
            
        }]
    };
}]);