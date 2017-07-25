
(function () {
    'use strict';

    var app = angular.module('appRouteClient')
    app.controller('courrierV2Controller', ['$rootScope', '$scope', '$http', '$stateParams'
        , 'modalState', '$location', 'config', 'reportService','reportVarService'
        , function ($rootScope, $scope, $http, $stateParams
            , modalState, $location, config, reportService, reportVarService
            ) {
            $scope.scopsociete = $stateParams.societe;
            $scope.scopnumcomptable = $stateParams.numcomptable;

            console.log('Courrier V2');

            $scope.reports = {
                model: null,
                availableOptions: [
                    //{ id: '0', name: 'ReportAltisys.js' },
                    //{ id: '1', name: 'SimpleList.js' },
                    //{ id: '2', name: 'MultiColumnList.js' },
                    //{ id: '3', name: 'HighlightCondition.js' },
                    //{ id: '4', name: 'SiteStatistics.js' },
                    //{ id: '5', name: 'SmartphoneBestsellersInQ12015.js' },
                    //{ id: '6', name: 'UsersAppleIpad.js' },
                    //{ id: '7', name: 'Images.js' },
                    //{ id: '8', name: 'MasterDetail.js' },
                    //{ id: '9', name: 'OnlineStoreSales.js' },
                    //{ id: '10', name: 'ParametersSelectingCountry.js' },
                    //{ id: '11', name: 'SideBySideListWithContainers.js' },
                    //{ id: '12', name: 'ReportAltisys.js' }
                ],
                societe: $stateParams.societe,
                numcomptable: $stateParams.numcomptable
            };
                                
            $http({
                method: 'GET',
                url: config.url + '/Report/GetCourriers/1' 
            })
             .success(function (data) {
                 console.log(data);
                 $scope.reports.availableOptions = data;
             })



        $scope.$on('CourrierRowsSelected', function (event, rows) {

            var fid = [];

            if (rows) {
                for (var i = 0; i < rows.length; i++) {
                    fid.push(rows[i].FID);
                    //console.log('rows[' + i + '].FID:' + rows[i].FID);
                    //console.log('rows[' + i + '].Npiece:' + rows[i].Npiece);                    
                }
                reportVarService.set('fid', fid);
                reportVarService.set('societe', $scope.scopsociete);
                reportVarService.set('numcomptable', $scope.scopnumcomptable);
            }
        });


        $scope.DisplayCourrier = function () {
            //redirect
            $location.path('/reportViewerV2').search({ societe: window.encodeURIComponent($scope.scopsociete), numcomptable: window.encodeURIComponent($scope.scopnumcomptable) });
            }             

       
        $scope.reportChange = function () {
            console.log('reportChange');
            console.log('model:'+$scope.reports.model);
            console.log($scope.reports.availableOptions[$scope.reports.model]);
            //set report service
            reportService.set($scope.reports.model, $scope.reports.availableOptions[$scope.reports.model], null, 1, null); //familyId = 1 (client)

        }

        }]);
 
    }());