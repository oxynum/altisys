
(function () {
    'use strict';

    var app = angular.module('appRouteClient')
    app.controller('promessecontroller', ['$rootScope', '$scope', '$http', '$stateParams', 'config'
        , 'modalState', '$location'
        , function ($rootScope,$scope, $http, $stateParams,config
            , modalState, $location
            ) {
            $scope.scopsociete = $stateParams.societe;
            $scope.scopnumcomptable = $stateParams.numcomptable;
        $http({
            method: 'GET',
            url: config.url+'/Promesse/GetPromesseCreateView/' + $stateParams.societe + '/' + $stateParams.numcomptable
        })
         .success(function (data) {
             $scope.PromesseCreate = data;
             $scope.PromesseCreate.factures = data.Factures;
             $scope.PromesseCreate.echeancier = data.Echeancier;
             $scope.PromesseCreate.echeancier.DatePremiereEcheance = new Date();
             $scope.PromesseCreate.typepaiements = data.TypePaiements;
             $scope.PromesseCreate.colonnes = data.Colonnes;
             $scope.PromesseCreate.courriers = data.Courriers;
             $scope.PromesseCreate.idPieces = [];
             $scope.PromesseCreate.npieces = [];
             $scope.PromesseCreate.mtsoldes = [];
             $scope.Courrier = {};
             $scope.Courrier.idPieces = [];
             $scope.Courrier.npieces = [];
             $scope.Courrier.societe = $stateParams.societe;
             $scope.Courrier.numcomptable = $stateParams.numcomptable;
             $scope.Courrier.IdModele = 0;
         });
           

        $scope.$on('PromesseRowsSelected', function (event, rows) {

            $scope.Courrier.idPieces = [];
            $scope.Courrier.npieces = [];
            $scope.PromesseCreate.idPieces = [];
            $scope.PromesseCreate.npieces = [];
            $scope.PromesseCreate.mtsoldes = [];
            $scope.PromesseCreate.echeancier.MontantTotal = 0;
            if (rows) {
                for (var i = 0; i < rows.length; i++) {
                    $scope.Courrier.idPieces.push(rows[i].FIDpiece);
                    $scope.Courrier.npieces.push(rows[i].Npiece);
                    $scope.PromesseCreate.idPieces.push(rows[i].FIDpiece);
                    $scope.PromesseCreate.npieces.push(rows[i].Npiece);
                    $scope.PromesseCreate.mtsoldes.push(rows[i].Mtsolde);
                    $scope.PromesseCreate.echeancier.MontantTotal += rows[i].Mtsolde;
                }
            }
        });


        $scope.DisplayCourrier = function () {

            console.log('$scope.Courrier.IdModele:' + $scope.Courrier.IdModele)

            $http({
                method: 'POST',
                // TODO : SESSIONVARIABLE
                url: config.urlV1 + 'Handlers/InitHandler.aspx',
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: $scope.Courrier,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

            })
            .success(function (data, status, headers, config) {
                //$scope.$dismiss();
                console.log('Init Handler Succeded');
                //redirect
                $location.path('/pageV1MaxHeight/' + window.encodeURIComponent('~/Authenticated/MailManagement/WebUI/MailEdition.aspx') + '/' + $stateParams.societe + '/' + $stateParams.numcomptable);
            })
            .error(function (data, status, header, config) {
                $scope.$dismiss();
            });
        }


            $scope.AddPromesse = function () {
                AddPromesseModel();
            }

            function AddPromesseModel() {

                $http({
                    method: 'POST',
                    url: config.url+'/Promesse/PostPromesseCreateView',
                    data: JSON.stringify($scope.PromesseCreate),
                    headers: { 'Content-Type': 'application/json' },
                    
                })
                .success(function (data, status, headers, config) {
                    if ($scope.Courrier.IdModele === 0) {
                        $rootScope.$broadcast('refresh');
                        $scope.$dismiss();
                    }
                    else {
                        $scope.DisplayCourrier();
                    }
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