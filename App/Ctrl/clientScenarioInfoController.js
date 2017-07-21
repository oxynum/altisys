(function () {
    'use strict';
 
    var app = angular.module('appRouteClient');
    app.controller('clientScenarioInfoController', ['$rootScope', '$scope', '$http', '$stateParams', 'config', '$window', function ($rootScope, $scope, $http, $stateParams,config, $window) {

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
        };

        $scope.addEtape = false;
        $scope.showAddEtape = function(){
            $scope.addEtape = !$scope.addEtape;
        };

        $scope.deplacement = 0;
        $scope.nextStep = function(){
            var width = $window.innerWidth;
            if(width <= 1065){
                var nbClicAllowed = $scope.etapes.count-3;
            }
            else if (width <= 1200) {
                var nbClicAllowed = $scope.etapes.count-6;
            }
            else{
                var nbClicAllowed = $scope.etapes.count-9;
            }
            if ($scope.deplacement > -63*nbClicAllowed && $scope.etapes.count>=10) {
                $scope.deplacement -= 63;
            }
        };
        $scope.prevStep = function(){
            if ($scope.deplacement < 0 && $scope.etapes.count>=10) {
                $scope.deplacement += 63;
            }
        };

        $(window).on('resize', function(){
            if (window.innerWidth <= 1065) {
                $('.slide-bar .action-btn').html("");
            }
            else{
                $('.slide-bar .action-btn').html("Valider l'action");
            }
        });

    }]);
    
    
}()); 