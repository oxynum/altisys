
(function () {
    'use strict';

    var app = angular.module('appRouteClient')
    app.controller('templateEditFormController', ['$rootScope', '$scope', 'reportService', 'reportVarService', '$location', '$http', 'config'
        , function ($rootScope, $scope, reportService, reportVarService, $location, $http, config
            ) {

            console.log('templateEditFormController');

            $scope.template = {
                selected: null,
                availableOptions: []
            };


            //get Courriers
            $http({
                method: 'GET',
                url: config.url + '/Report/GetReportTemplates'
            })
             .success(function (data) {
                 console.log(data);
                 $scope.template.availableOptions = data;
             })



            $scope.DisplayDesigner = function () {
                console.log('DisplayDesigner: ' + $scope.template.selected + ' ' + $scope.template.availableOptions[$scope.template.selected]);

                //redirect
                reportService.clear();
                reportVarService.clear();
                $location.path('/reportDesignerV2').search({ idTemplate: $scope.template.selected, status:'dirty' });
            }

            $scope.reportChange = function () {
                console.log('reportChange')
                console.log($scope.report.selected);
            }

        }]);

}());