
(function () {
    'use strict';

    var app = angular.module('appRouteClient')
    app.controller('reportNewFormController', ['$rootScope', '$scope', 'reportService', 'reportVarService', '$location', '$http', 'config'
        , function ($rootScope, $scope, reportService, reportVarService, $location, $http, config
            ) {

            console.log('reportNewFormController');

            $scope.reportFamily = {
                selected: null,
                availableOptions: [ //bouchon
                    { id: '1', name: 'Client' },
                    { id: '2', name: 'BAG' },
                    { id: '3', name: 'Litige' },
                    { id: '4', name: 'Promesse' },
                    { id: '5', name: 'Echéancier' },
                    { id: '6', name: 'Portefeuille' },
                    { id: '7', name: 'Risque' },
                    { id: '8', name: 'DSO' },
                    { id: '9', name: 'Encaissements' }
                ]
            };
            $scope.template = {
                selected: null,
                availableOptions: []
                    //[ //bouchon
                //    { id: '1', name: 'Template Client 1 (fid, soc, ncpt)' },
                //    { id: '2', name: 'Template Client 2 (soc, ncpt)' },
                //    { id: '3', name: 'Template Litige (fid, soc, ncpt, idlit)' },
                //    { id: '4', name: 'Template Promesse (fid, soc, ncpt, idprom)' },
                //]
            };

            //get reportFamily
            //$http({
            //    method: 'GET',
            //    url: config.url + '/Report/GetFamilleCourrier'
            //})
            // .success(function (data) {
            //     console.log(data);
            //     $scope.reportFamily.availableOptions = data;
            // })


            //get Template
            $http({
                method: 'GET',
                url: config.url + '/Report/GetReportTemplates'
            })
             .success(function (data) {
                 console.log(data);
                 $scope.template.availableOptions = data;
             })



            $scope.DisplayDesigner = function () {

                console.log('DisplayDesigner');

                //redirect
                reportService.clear();
                reportVarService.clear();

                //assign report name
                reportService.set(null, $scope.reportName, null,$scope.reportFamily.selected.id, true);
                $location.path('/reportDesignerV2').search({ idTemplate: $scope.template.selected });

            }


            $scope.reportFamilyChange = function () {
                console.log('reportFamilyChange')
                console.log($scope.reportFamily.selected.id);
            }

            $scope.templateChange = function () {
                console.log('templateChange');
                console.log($scope.template.selected);
            }

        }]);

}());