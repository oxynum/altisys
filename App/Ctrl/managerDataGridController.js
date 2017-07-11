(function () {
    'use strict';

    var app = angular.module('appRouteClient');
  
    app.controller('managerDataGridController', ['$rootScope', '$scope', '$http', 'uiGridConstants', 'gridConfService', '$stateParams', 'config', function ($rootScope, $scope, $http, uiGridConstants, gridConfService, $stateParams, config) {
    
        ///* ------------Init -------------*/
        $scope.gridMode = 'ALL';
        //$scope.ALL = '<button class="btn btn-primary" ui-sref="promesseUpdate({societe:\'##\', numcomptable:\'##\',idecheancier:##})">TEST</button>';
        //$scope.NQ = '<button class="btn btn-primary" ui-sref="promesseUpdate({societe:\'##\', numcomptable:\'##\',idecheancier:##})">TEST</button>';
        $scope.PROMESSE = '<button class="btn btn-primary" ui-sref="promesseUpdate({societe:\'' + $stateParams.societe + '\', numcomptable:\'' + $stateParams.numcomptable + '\',idecheancier:row.entity.FILTER})">Update</button>';
        //$scope.LITIGE = '<button class="btn btn-primary" ui-sref="promesseUpdate({societe:\'##\', numcomptable:\'##\',idecheancier:##})">TEST</button>';
        //$scope.ECHEANCIER = '<button class="btn btn-primary" ui-sref="promesseUpdate({societe:\'##\', numcomptable:\'##\',idecheancier:##})">TEST</button>';


        /* ------------ Events -------------*/

        $scope.$on('scopurlChange', function (event, url) {
            $scope.scopurl = url;
        });
        $scope.$on('portefeuilleSelectGrid', function (event, mode) {
            $scope.gridMode = mode;
            //if ($scope.needData[mode])
            //    $scope.refreshGrid(mode);
        });
        // TODO : SESSIONVARIABLE
        $scope.filter = '1=1';
        $scope.sort = '1';

        $scope.excel = function () {

            $http({
                method: 'GET',
                url: config.url + '/Client/ExportToExcel/' + $scope.filter + '/30' + '/' + $scope.sort
            })
             .success(function (data) {
                 var downloadPath = "http://localhost:60146/UploadedDocuments/export.xlsx";
                 $scope.downloadFile(downloadPath);
             });
        }

        $scope.downloadFile = function (downloadPath) {
            window.open(downloadPath, '_blank', '');
        }
    }])

}())