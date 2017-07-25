(function () {
    'use strict';

    var app = angular.module('appRouteAccueil');
    app.controller('viewerV2TopBarController', ['$rootScope', '$scope', '$http', '$location', 'config', 'reportService', function ($rootScope, $scope, $http, $location, config, reportService) {

        console.log('viewerV2TopBarController');
           
        $scope.scopsociete = $location.search().societe;
        $scope.scopnumcomptable = $location.search().numcomptable;

        $scope.altisysReport = reportService.get();
        console.log($scope.altisysReport.name);

        
        // Raison sociale client
        $http({
            method: 'GET',
            url: config.url + '/Client/GetClientRS/' + $scope.scopsociete + '/' + $scope.scopnumcomptable + '/'
        })
        .success(function (data) {
            $scope.scopclient = data;
            console.log('GetClientRS:' + data);
        });
        
    }]);
}());