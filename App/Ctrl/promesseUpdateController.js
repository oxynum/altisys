
(function () {
    'use strict';

    var app = angular.module('appRouteClient')
    app.controller('promesseUpdateController', ['$rootScope', '$scope', '$http', '$stateParams', 'modalState', '$filter', 'config'
        , function ($rootScope,$scope, $http, $stateParams, modalState, $filter,config
            ) {
            $http({
                method: 'GET',
                url: config.url+'/Promesse/GetPromesseUpdateView/' + $stateParams.idecheancier
            })
             .success(function (data) {
                 $scope.PromesseCreate = data;
                 $scope.PromesseCreate.factures = data.Factures;
                 $scope.PromesseCreate.echeancier = data.Echeancier;
                 $scope.PromesseCreate.echeancier.commentaire = data.Echeancier.Commentaire;
                 $scope.PromesseCreate.echeancier.DatePremiereEcheance = new Date($filter('date')(data.Echeancier.DatePremiereEcheance, "yyyy-MM-dd", "UTC"));
                 $scope.PromesseCreate.typepaiements = data.TypePaiements;
                 $scope.PromesseCreate.courriers = data.Courriers;
                 $scope.PromesseCreate.id = [];
                 $scope.PromesseCreate.idPieces = [];
                 $scope.PromesseCreate.npieces = [];
                 $scope.PromesseCreate.mtsoldes = [];
                 $scope.selectFactures($scope.PromesseCreate.factures);
             });


            $scope.$on('PromesseRowsSelected', function (event, rows) {
                $scope.PromesseCreate.id = [];
                $scope.PromesseCreate.idPieces = [];
                $scope.PromesseCreate.npieces = [];
                $scope.PromesseCreate.mtsoldes = [];
                $scope.PromesseCreate.echeancier.MontantTotal = 0;
                if (rows) {
                    for (var i = 0; i < rows.length; i++) {
                        $scope.PromesseCreate.id.push(rows[i].FID);
                        $scope.PromesseCreate.idPieces.push(rows[i].FIDPIECE);
                        $scope.PromesseCreate.npieces.push(rows[i].FNPIECE);
                        $scope.PromesseCreate.mtsoldes.push(rows[i].FMTSOLDE);
                        $scope.PromesseCreate.echeancier.MontantTotal += rows[i].FMTSOLDE;
                    }
                }
            });

            $scope.selectFactures = function (ids) {
                $rootScope.$broadcast('SelectFactures',ids );
            }

            $scope.UpdPromesse = function () {
                UpdPromesse();
            }

            function UpdPromesse() {

                $http({
                    method: 'POST',
                    url: config.url+'/Promesse/PostPromesseUpdateView',
                    data: JSON.stringify($scope.PromesseCreate),
                    headers: { 'Content-Type': 'application/json' },

                })
                .success(function (data, status, headers, config) {
                    $rootScope.$broadcast('refresh');
                    $scope.$dismiss();
                })
                .error(function (data, status, header, config) {
                    $scope.$dismiss();
                });
            }


            $scope.open1 = function () {
                $scope.popup1.opened = true;
            };

            $scope.popup1 = {
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