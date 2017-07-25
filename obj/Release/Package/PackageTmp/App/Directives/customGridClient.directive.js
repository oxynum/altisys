var app = angular.module('appMain');

app.directive('customGridClient', ['$compile', '$templateRequest', function($compile, $templateRequest) {

    var ALL = './Views/_template/GridSimpleView.html';
    var NQ = './Views/_template/GridSimpleView.html';
    var PROMESSE = './Views/_template/GridHierarchical.html';
    var LITIGE = './Views/_template/GridHierarchical.html';
    var ECHEANCIER = './Views/_template/GridHierarchical.html';

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
            $scope.needData['NQ'] = true;
            $scope.needData['PROMESSE'] = true;
            $scope.needData['LITIGE'] = true;
            $scope.needData['ECHEANCIER'] = true;
            $scope.scopsociete = $stateParams.societe;
            $scope.scopnumcomptable = $stateParams.numcomptable;
            $rootScope.FilterUrl= '';

            var listeInfo = [];
            listeInfo['ALL'] = [config.url+'/Client/GetDataObjectFactures/', 60, null, null];
            listeInfo['NQ'] = [config.url+'/Client/GetDataObjectFacturesNQ/', 60, null, null];
            listeInfo['PROMESSE'] = [config.url+'/Client/GetDataObjectPromesse/', 230, config.url+'/Client/GetDataObjectPromesseFactures/', 80];
            listeInfo['LITIGE'] = [config.url+'/Client/GetDataObjectLitige/', 220, config.url+'/Client/GetDataObjectLitigeFactures/', 221];
            listeInfo['ECHEANCIER'] = [config.url+'/Client/GetDataObjectEcheance/', 231, config.url+'/Client/GetDataObjectEcheanceFactures/', 80];

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
                //console.log('$scope.columnCommand:' + $scope.columnCommand);
                defs.columnDefsAppend.push({
                    nomchamp: 'Actions',
                    isvisible: true,
                    cellTemplate: $scope.columnCommand
                });

            }



            /*---------------Functions----------------*/
            $scope.refreshGrid = function (mode) {
                gridConfService.expandableConf($scope, listeInfo[mode][0] + $stateParams.societe + '/' + $stateParams.numcomptable + '/##paging-params##' + $rootScope.FilterUrl, listeInfo[mode][1], listeInfo[mode][2], listeInfo[mode][3], defs);
                $scope.needData[$scope.gridMode] = false;
            }

            $scope.rowSelectionChanged = function (row) {
                /*------code here------*/
            }

            /* ------------ Events -------------*/
            $scope.$on('clientSelectGrid', function (event, mode) {

                if ($scope.needData[mode])
                {
                    $scope.getData();
                    $scope.refreshGrid(mode);
                }

            });
            $scope.$on('refresh', function () {

                $scope.getData();
                $scope.refreshGrid($scope.gridMode);
            });


            $scope.$on('ClientFilterClick', function (event, NPiece, SelectedCritere, De, A) {
                $rootScope.var = {};
                $rootScope.var.event = event;
                $rootScope.var.NPiece = NPiece;
                $rootScope.var.SelectedCritere = SelectedCritere;
                $rootScope.var.De = De;
                $rootScope.var.A = A;
                $scope.getData();

                $scope.refreshGrid($scope.gridMode);
                
            });

            $scope.getData = function(){
                $rootScope.FilterUrl = '';
                var params = {};
                if ($rootScope.var.NPiece) {
                    params.npiece = $rootScope.var.NPiece;
                }
                if ($rootScope.var.SelectedCritere) {
                    params.selectedcritere = $rootScope.var.SelectedCritere;
                }
                if ($rootScope.var.De) {
                    params.de = $rootScope.var.De;
                }
                if ($rootScope.var.A) {
                    params.a = $rootScope.var.A;
                }
                if ($httpParamSerializer(params)) {
                    $rootScope.FilterUrl = '?' + $httpParamSerializer(params);
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