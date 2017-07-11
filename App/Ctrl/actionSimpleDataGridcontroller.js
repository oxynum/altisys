(function () {
    'use strict';
 
    var app = angular.module('appRouteClient')
    app.controller('actionSimpleDataGridcontroller', ['$scope', '$http', '$stateParams', 'uiGridConstants', 'gridConfService', 'config', function ($scope, $http, $stateParams, uiGridConstants, gridConfService, config) {
        
        $scope.GetActions = function () {
            $http.get(config.url + '/Action/GetDataObjectSimple/' + $stateParams.societe + '/' + $stateParams.numcomptable + '/')
                .success(function (data) {
                    $scope.actions = data.Results;
                    $scope.actions.isFirst = "";
                    $scope.actions[0].isFirst = "red";
                    $scope.textLimit = 50;
                    //alert(JSON.stringify(data.Results));
                })
                .error(function (data, status, header, config) {
                    //alert('actionSimpleDataGridcontroller fail');
                });
        }

        $scope.GetActions();
        $scope.$on('actionAdded', function () {
            $scope.GetActions();
        });
    }]);
}());