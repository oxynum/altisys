(function () {
    'use strict';
 
    var app = angular.module('appRouteClient')
    app.controller('identitecontroller', ['$scope', '$sce', '$http', '$stateParams', 'config', function ($scope, $sce, $http, $stateParams,config) {

        $http({
            method: 'GET',
            url: config.url+'/Client/GetIdentiteView/' + $stateParams.societe + '/' + $stateParams.numcomptable
        })
         .success(function (data) {
             console.log(data)
             $scope.IdentiteInfo = $sce.trustAsHtml(data);
             

         })
            .error(function (data, status, header, config) {
            });

    }]);

}());