
(function () {
    'use strict';

    var app = angular.module('appRouteClient')
    app.controller('promesseV2Controller', ['$rootScope', '$scope', '$http', '$stateParams', 'config', 'modalState', '$location', 'reportService', 'reportVarService', function ($rootScope, $scope, $http, $stateParams, config, modalState, $location, reportService, reportVarService) {

        $scope.scopsociete = $stateParams.societe;
        $scope.scopnumcomptable = $stateParams.numcomptable;

        $scope.reports = {
            model: null,
            availableOptions: []
        };

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

             $scope.reports.availableOptions = data.Courriers;

             $scope.PromesseCreate.idPieces = [];
             $scope.PromesseCreate.npieces = [];
             $scope.PromesseCreate.mtsoldes = [];
             $scope.Courrier = {};
             $scope.Courrier.idPieces = [];
             $scope.Courrier.npieces = [];
             $scope.Courrier.societe = $stateParams.societe;
             $scope.Courrier.numcomptable = $stateParams.numcomptable;
         });
           

        $scope.$on('PromesseRowsSelected', function (event, rows) {

            $scope.Courrier.idPieces = [];
            $scope.Courrier.npieces = [];
            $scope.PromesseCreate.idPieces = [];
            $scope.PromesseCreate.npieces = [];
            $scope.PromesseCreate.mtsoldes = [];
            $scope.PromesseCreate.echeancier.MontantTotal = 0;

            var fid = [];

            if (rows) {
                for (var i = 0; i < rows.length; i++) {
                    $scope.Courrier.idPieces.push(rows[i].FIDpiece);
                    $scope.Courrier.npieces.push(rows[i].Npiece);
                    $scope.PromesseCreate.idPieces.push(rows[i].FIDpiece);
                    $scope.PromesseCreate.npieces.push(rows[i].Npiece);
                    $scope.PromesseCreate.mtsoldes.push(rows[i].Mtsolde);
                    $scope.PromesseCreate.echeancier.MontantTotal += rows[i].Mtsolde;

                    fid.push(rows[i].FID);
                    console.log('rows[i].FIDpiece');
                    console.log(rows[i].FIDpiece);
                    console.log('rows[i].FID');
                    console.log(rows[i].FID);
                }

                reportVarService.set('fid', fid);
                reportVarService.set('societe', $scope.scopsociete);
                reportVarService.set('numcomptable', $scope.scopnumcomptable);
            }
        });

        $scope.DisplayCourrier = function () {
            //redirect
            $location.path('/reportViewerV2').search({ societe: window.encodeURIComponent($scope.scopsociete), numcomptable: window.encodeURIComponent($scope.scopnumcomptable) });
        }


        $scope.reportChange = function () {
            console.log('reportChange');
            console.log('model:' + $scope.reports.model);
            console.log($scope.reports.availableOptions[$scope.reports.model]);
            //set report service
            reportService.set($scope.reports.model, $scope.reports.availableOptions[$scope.reports.model], null, 4, null); //familyId = 4 (promesse)

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
                    $scope.DisplayCourrier();
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