
(function () {
    'use strict';

    var app = angular.module('appRouteAccueil')
    app.controller('portefeuillefiltercontroller', ['$rootScope', '$scope', '$http', '$stateParams', 'config'
        , function ($rootScope,$scope, $http, $stateParams,config
            ) {
            $http({
                method: 'GET',
                url: config.url+'/Client/GetPortefeuilleFilterView/'
            })
             .success(function (data) {
                 $scope.Filter = data;
                 $scope.Filter.Societes = data.Societes;
                 $scope.Filter.SelectedSociete = data.SelectedSociete;
                 $scope.Filter.SelectedGestionnaire = data.SelectedGestionnaire;
                 $scope.Filter.Gestionnaires = data.Gestionnaires;
                 $scope.Filter.SelectedCommercial = data.SelectedCommercial;
                 $scope.Filter.Commercials = data.Commercials;
                 $scope.Filter.SelectedAge = data.SelectedAge;
                 $scope.Filter.Ages = data.Ages;
                 $scope.Filter.Client = data.Client;

                 $scope.portefeuilleFilterClick();
                 

             });


            $scope.portefeuilleFilterClick = function () {
                $rootScope.$broadcast('portefeuilleFilterClick', $scope.Filter.SelectedSociete, $scope.Filter.SelectedGestionnaire, $scope.Filter.SelectedCommercial, $scope.Filter.SelectedAge, $scope.Filter.Client);
            }

        }]);

}());