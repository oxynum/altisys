(function () {
    'use strict';
 
    var app = angular.module('appRouteAccueil')
    app.controller('pageV1Controller', ['$scope', '$http', '$stateParams', '$sce', '$location', 'config', function ($scope, $http, $stateParams, $sce, $location, config) {
       
        console.log('config.urlV1:' + config.urlV1);
        console.log('$stateParams.urlreferer:' + $stateParams.urlreferer);
        $scope.urlV1 = $sce.trustAsResourceUrl(config.urlV1 + 'Handlers/RedirectHandler.aspx?urlreferer=' + $stateParams.urlreferer);

        $scope.Return = function () {
            $location.path('/client/' + $stateParams.societe + '/' + $stateParams.numcomptable);
        }


        
    }]);

 
}());