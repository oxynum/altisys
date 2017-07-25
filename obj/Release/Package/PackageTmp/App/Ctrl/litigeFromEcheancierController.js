(function () {
    'use strict';
 
    var app = angular.module('appRouteClient')
    app.controller('litigeFromEcheancierController', ['$rootScope', '$scope', '$http', '$stateParams', 'modalState', '$filter', 'config', function ($rootScope, $scope, $http, $stateParams, modalState, $filter, config) {

        $http({
            method: 'GET',
            url: config.url + '/Litige/GetLitigeFromPromesseCreateView/' + $stateParams.idecheancier
        })
         .success(function (data) {
             $scope.LitigeCreate = data;
             $scope.LitigeCreate.factures = data.Factures;
             $scope.LitigeCreate.facturesLitige = data.FacturesLitige;
             $scope.LitigeCreate.gestionnaires = data.Gestionnaires;
             $scope.LitigeCreate.typeslitige = data.TypesLitige;
             $scope.LitigeCreate.codeslitige = data.CodesLitige;
             $scope.LitigeCreate.priorites = data.Priorites;
             $scope.LitigeCreate.DMR = new Date($filter('date')(data.DMR, "yyyy-MM-dd", "UTC"));
             $scope.LitigeCreate.montant = data.Montant;
             $scope.LitigeCreate.priorite = data.Priorite;
             $scope.LitigeCreate.interlocuteur = data.Interlocuteur;
             $scope.LitigeCreate.commentaire = data.Commentaire;
             $scope.LitigeCreate.id_dispute_type = data.Id_dispute_type;
             $scope.LitigeCreate.idtypecom = data.Idtypecom;
             $scope.LitigeCreate.checkEmail = data.CheckEmail;
             $scope.LitigeCreate.idPieces = data.Idpieces;
             $scope.LitigeCreate.npieces = data.Npieces;
             $scope.LitigeCreate.mtsoldes = data.Mtsoldes;
             $scope.LitigeCreate.idecheancier = $stateParams.idecheancier;
             $scope.selectFactures($scope.LitigeCreate.factures);

         })
        .error(function (data, status, header, config) {
            console.log('fail');
        });


        $scope.selectFactures = function (ids) {
            $rootScope.$broadcast('SelectFactures', ids);
        }
        /* ------------ Events -------------*/

        //children scope that catch event 'LitigeRowsSelected' send by application scope
        $scope.$on('LitigeRowsSelected', function (event, rows) {
            console.log('rows.length: ' + rows.length);

            $scope.LitigeCreate.idPieces = [];
            $scope.LitigeCreate.npieces = [];
            $scope.LitigeCreate.mtsoldes = [];
            $scope.LitigeCreate.montant = 0;
            if (rows) {
                for (var i = 0; i < rows.length; i++) {
                    $scope.LitigeCreate.idPieces.push(rows[i].Idpiece);
                    $scope.LitigeCreate.npieces.push(rows[i].Npiece);
                    $scope.LitigeCreate.mtsoldes.push(rows[i].Mtsolde);

                    $scope.LitigeCreate.montant += rows[i].Mtsolde;
                }
                //Sample object FacturesLitigeDTO :
                //$scope.LitigeCreate.facturesLitige = "\"FacturesLitige\":[{\"IdPiece\":\"0062261712010\",\"Npiece\":\"320520006 1005\",\"Mtsolde\":542625.13}]";

                console.log('$scope.LitigeCreate.idPieces: ' + $scope.LitigeCreate.idPieces);
            }
        });

        
        $scope.AddLitige = function () {

           $http({
                method: 'POST',
                url: config.url + '/Litige/AddLitigeFromEcheancier',
                data: JSON.stringify($scope.LitigeCreate),
                headers: { 'Content-Type': 'application/json; charset=UTF-8' }
            })
                .success(function (data, status, headers, config) {
                    $rootScope.$broadcast('refresh');
                    $scope.$dismiss();
                })
                .error(function (data, status, header, config) {
                    console.log('error');
                    $scope.$dismiss();
                });
        }


        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };

        $scope.popup1 = {
            opened: false
        };


        $scope.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        function getDayClass(data) {
            var date = data.date,
              mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }
        }


    }]);
 
}());