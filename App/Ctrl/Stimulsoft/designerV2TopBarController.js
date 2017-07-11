(function () {
    'use strict';

    var app = angular.module('appRouteAccueil');
    app.controller('designerV2TopBarController', ['$rootScope', '$scope', '$http', '$location', 'config', 'reportService', function ($rootScope, $scope, $http, $location, config, reportService) {

        console.log('designerV2TopBarController');
           
        $scope.scopsociete = $location.search().societe;
        $scope.scopnumcomptable = $location.search().numcomptable;

        $scope.altisysReport = reportService.get();

        console.log('$scope.altisysReport.name!==null');
        console.log($scope.altisysReport.name !== null);
        
        if (angular.isDefined($scope.scopsociete) && angular.isDefined($scope.scopnumcomptable)) {
            // Raison sociale client
            $http({
                method: 'GET',
                url: config.url + '/Client/GetClientRS/' + $scope.scopsociete + '/' + $scope.scopnumcomptable + '/'
            })
            .success(function (data) {
                $scope.scopclient = data;
                console.log('GetClientRS:' + data);
            });
        }
        
    }]);
}());