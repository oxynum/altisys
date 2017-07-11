(function (app) {
    'use strict';
    app.controller('widgetGridActionController', ['$scope', '$http', '$location', 'config', 'cookieService', function ($scope, $http, $location, config, cookieService) {

        var filter = '';

        if (cookieService.get('userInfo')) {
            var userInfo = cookieService.get('userInfo');
            filter = userInfo.Filter;
        }
        console.log('filter:' + filter);
        $http.get(config.url + '/Widget/GetCompteurRelance' + '?userFilter=' + window.encodeURIComponent(filter))
        .success(function (data) {
            $scope.Relances = data.Results;
        })
        .finally(function () {
            
        });

        $scope.redirect = function (params) {
            $scope.action(params);
        }

        $scope.action = function (params) {
            $location.path('/agenda').search({ action: params });
        }

    }]);
})(angular.module('appMain'));
