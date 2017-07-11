(function () {
    'use strict';
 
    var app = angular.module('appRouteClient');
    app.controller('clientScenarioInfoController', ['$rootScope', '$scope', '$http', '$stateParams', 'config', function ($rootScope, $scope, $http, $stateParams,config) {

        $scope.switch = function () {
            $scope.isCollapsed = !$scope.isCollapsed;
        };
        
        $scope.GetClientScenarioInfo = function () {

            $http({
                method: 'GET',
                url: config.url+'/Client/GetClientScenarioInfo/' + $stateParams.societe + '/' + $stateParams.numcomptable + '/'
            })
                .success(function (data) {
                    $scope.ClientScenario = data;
                });
        }
        $scope.GetClientScenarioInfo();
        
        $scope.GetFullClientEtape = function () {
            $http({
                method: 'GET',
                url: config.url+'/Client/GetFullClientEtape/' + $stateParams.societe + '/' + $stateParams.numcomptable + '/'
            })
                .success(function (data) {
                    $scope.etapes = data;
                    $scope.etapes.count = $scope.etapes.length;
                });
        }
        $scope.GetFullClientEtape();

        $scope.$on('actionAdded', function () {
            $scope.GetFullClientEtape();
            $scope.GetClientScenarioInfo();
        });
        $scope.$on('etapeAdded', function () {
            $scope.GetFullClientEtape();
        });
        
        $scope.isCurrent = function(niveau, etape)
        {
            if ($scope.ClientScenario.niv_relance == niveau && etape == 0)
                return true;
            return false;
        }
    }]);
    
    
}()); 