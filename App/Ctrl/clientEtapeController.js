(function () {
    'use strict';
 
    var app = angular.module('appRouteClient')
    app.controller('clientEtapeController', ['$rootScope', '$scope', '$http', '$stateParams', 'config', function ($rootScope, $scope, $http, $stateParams,config) {


        console.log('clientEtapeController');


        $http({
            method: 'GET',
            url: config.url+'/Client/GetClientEtapeView/' + $stateParams.societe + '/' + $stateParams.numcomptable
        })
         .success(function (data) {
             $scope.EtapeCreate = data;

             $scope.EtapeCreate.Etape.Societe = $stateParams.societe;
             $scope.EtapeCreate.Etape.Numcomptable = $stateParams.numcomptable;
             $scope.EtapeCreate.TypeTraitements = data.TypeTraitements;
             $scope.EtapeCreate.TypeRelances = data.TypeRelances;
         });
    

        $scope.AddEtape = function () {

            console.log('AddEtape');
            $http({
                method: 'POST',
                url: config.url+'/Client/AddEtape',
                data: JSON.stringify($scope.EtapeCreate),
                headers: { 'Content-Type': 'application/json; charset=UTF-8' }
            })
                 .success(function (data, status, headers, config) {
                     $rootScope.$broadcast('etapeAdded');
                     $scope.$dismiss();
                 })
                 .error(function (data, status, header, config) {
                     console.log('error');
                     $scope.$dismiss();
                 });
        }


      
    }]);

 
}());