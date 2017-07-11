(function () {
    'use strict';
 
    var app = angular.module('appRouteAccueil')
    app.controller('agendacontroller', ['$rootScope', '$scope', '$http', '$stateParams', 'config', function ($rootScope, $scope, $http, $stateParams, config) {
        $http({
            method: 'GET',
            // TODO : SESSIONVARIABLE
            url: config.url+'/Agenda/GetActionHisto/100/CV000291'
        })
         .success(function (data) {
             $scope.actions = data.Actions;
             $scope.typeactions = data.TypeActions;
             $scope.colonnes = data.Colonnes;
         });
    }]);

 
}());