
(function () {
    'use strict';

    var app = angular.module('appRouteClient')
    app.controller('reportEditFormController', ['$rootScope', '$scope', 'reportService', 'reportVarService', '$location', '$http', 'config'
        , function ($rootScope, $scope, reportService, reportVarService, $location, $http, config
            ) {

            console.log('reportEditFormController');

            $scope.report = {
                selected: null,
                availableOptions: []
            };


            //get Courriers
            $http({
                method: 'GET',
                url: config.url + '/Report/GetCourriers'
            })
             .success(function (data) {
                 console.log(data);
                 $scope.report.availableOptions = data;
             })

            $scope.DisplayDesigner = function () {
                console.log('DisplayDesigner: ' + $scope.report.selected + ' ' + $scope.report.availableOptions[$scope.report.selected] + ' ' + $scope.reportFamilyId);

                //redirect
                reportService.clear();
                reportVarService.clear();

                //assign report name
                reportService.set($scope.report.selected, $scope.report.availableOptions[$scope.report.selected], null, $scope.reportFamilyId, true);
                $location.path('/reportDesignerV2');
            }

            $scope.reportChange = function () {
                console.log('reportChange')
                console.log($scope.report.selected);

                //get GetFamilyId
                $http({
                    method: 'GET',
                    url: config.url + '/Report/GetFamilyId/' + $scope.report.selected
                })
                 .success(function (data) {
                     console.log(data);
                     $scope.reportFamilyId = data;
                 })
            }

        }]);

}());