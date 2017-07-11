(function () {
    'use strict';
 
    var app = angular.module('appRouteClient')
    app.controller('echeancierUpdateController', ['$rootScope', '$scope', '$http', '$stateParams', 'modalState', '$filter', 'config', function ($rootScope, $scope, $http, $stateParams, modalState, $filter,config) {
        $scope.click = function ()
        {
            alert('dff');
        }
        $http({
            method: 'GET',
            url: config.url+'/Echeancier/GetEcheancierUpdateView/' + $stateParams.idecheancier
        })
         .success(function (data) {
             $scope.EcheancierCreate = data;
             $scope.EcheancierCreate.factures = data.Factures;
             $scope.EcheancierCreate.echeancier = data.Echeancier;
             $scope.EcheancierCreate.echeancier.DatePremiereEcheance = new Date($filter('date')(data.Echeancier.DatePremiereEcheance, "yyyy-MM-dd", "UTC"));
             $scope.EcheancierCreate.echeancier.DateAcompte = new Date($filter('date')(data.Echeancier.DateAcompte, "yyyy-MM-dd", "UTC"));
             $scope.EcheancierCreate.echeancier.DateFrais = new Date($filter('date')(data.Echeancier.DateFrais, "yyyy-MM-dd", "UTC"));
             $scope.EcheancierCreate.typepaiements = data.TypePaiements;
             $scope.EcheancierCreate.periodicites = data.Periodicites;
             $scope.EcheancierCreate.echeancier.IdPer = data.echeancier.IdPer;
             $scope.EcheancierCreate.id = [];
             $scope.EcheancierCreate.idPieces = [];
             $scope.EcheancierCreate.npieces = [];
             $scope.EcheancierCreate.mtsoldes = [];
             $scope.selectFactures($scope.EcheancierCreate.factures);
         });


        $scope.$on('EcheancierRowsSelected', function (event, rows) {

            $scope.EcheancierCreate.id = [];
            $scope.EcheancierCreate.idPieces = [];
            $scope.EcheancierCreate.npieces = [];
            $scope.EcheancierCreate.mtsoldes = [];
            $scope.EcheancierCreate.echeancier.MontantTotal = 0;
            if (rows) {
                for (var i = 0; i < rows.length; i++) {
                    $scope.EcheancierCreate.id.push(rows[i].FID);
                    $scope.EcheancierCreate.idPieces.push(rows[i].Idpiece);
                    $scope.EcheancierCreate.npieces.push(rows[i].Npiece);
                    $scope.EcheancierCreate.mtsoldes.push(rows[i].Mtsolde);
                    $scope.EcheancierCreate.echeancier.MontantTotal += rows[i].Mtsolde;
                }
            }
        });

        $scope.selectFactures = function (ids) {
            $rootScope.$broadcast('SelectFactures', ids);
        }

        $scope.UpdEcheancier = function () {
            UpdEcheancier();
        }

        function UpdEcheancier() {

            $http({
                method: 'POST',
                url: config.url+'/Echeancier/PostEcheancierUpdateView',
                data: JSON.stringify($scope.EcheancierCreate),
                headers: { 'Content-Type': 'application/json' },

            })
            .success(function (data, status, headers, config) {
                $rootScope.$broadcast('refresh');
                $scope.$dismiss();
            })
            .error(function (data, status, header, config) {
                alert($scope.selectedItems);
                $scope.$dismiss();
            });
        }

        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };

        $scope.popup1 = {
            opened: false
        };

        $scope.open2 = function () {
            $scope.popup2.opened = true;
        };

        $scope.popup2 = {
            opened: false
        };

        $scope.open3 = function () {
            $scope.popup3.opened = true;
        };

        $scope.popup3 = {
            opened: false
        };


        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();


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