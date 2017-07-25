
(function () {
    'use strict';

    var app = angular.module('appRouteClient')
    app.controller('reportManagementController', ['$rootScope', '$scope', 'reportService', 'reportVarService'
        , function ($rootScope, $scope, reportService, reportVarService
            ) {

            console.log('reportManagementController');

            reportService.clear();
            reportVarService.clear();

        }]);

}());