(function () {
    'use strict';
 
    var app = angular.module('appRouteClient')
    app.controller('infoFinancierecontroller', ['$scope', '$sce', '$http', '$stateParams', 'config', function ($scope, $sce, $http, $stateParams,config) {

        $http({
            method: 'GET',
            url: config.url+'/Client/GetInfoFinanciereView/' + $stateParams.societe + '/' + $stateParams.numcomptable
        })
         .success(function (data) {
             console.log(data)
             $scope.infoFinanciere = $sce.trustAsHtml(data);
             

         })
            .error(function (data, status, header, config) {
            });

    }]);

}());