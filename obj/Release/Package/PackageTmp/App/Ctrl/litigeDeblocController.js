(function () {
    'use strict';
 
    var app = angular.module('appRouteClient')
    app.controller('litigeDeblocController', ['$rootScope', '$scope', '$http', '$stateParams', 'modalState', 'config', function ($rootScope,$scope, $http, $stateParams, modalState, config) {


        $scope.litigeDebloc = function () {

            $http({
                method: 'POST',
                url: config.url + '/Litige/DebloqLitige',
                data: $stateParams.iddisputehistory,
                headers: { 'Content-Type': 'application/json' },

            })
            .success(function (data, status, headers, config) {
                $rootScope.$broadcast('refresh');
                $scope.$dismiss();
            })
            .error(function (data, status, header, config) {
                $scope.$dismiss();
            });
        }
    }]);
 
}());