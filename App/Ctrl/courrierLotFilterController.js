
(function () {
    'use strict';

    var app = angular.module('appRouteAccueil')
    app.controller('courrierLotFilterController', ['$rootScope', '$scope', '$http', '$stateParams', 'config', '$location'
            , function ($rootScope,$scope, $http, $stateParams, config, $location
            ) {
                $http({
                    method: 'GET',
                    url: config.url + '/CourrierLot/GetCourrierLotFilterView/'
                })
                 .success(function (data) {
                     $scope.Filter = data;
                     $scope.Filter.Societes = data.Societes;
                     $scope.Filter.Scenarios = data.Scenarios;
                     $scope.Filter.SelectedSociete = '';
                     $scope.Filter.SelectedScenario = '';
                     $scope.Filter.SelectedNiveau = '';
                     $scope.Filter.SelectedType = data.SelectedType;
                     $scope.Filter.Multisearch = data.Multisearch;

                     if ($location.search().action == 'LETTRE')
                     {
                         $scope.Filter.SelectedType = 'lettres';
                     }
                     if ($location.search().action == 'MAIL') {
                         $scope.Filter.SelectedType = 'mails';
                     }
                     if ($location.search().action == 'FAX') {
                         $scope.Filter.SelectedType = 'Fax';
                     }
                     if ($location.search().action == 'SMS') {
                         $scope.Filter.SelectedType = 'SMS';
                     }
                     $scope.CourrierLotFilterClick();
                 });


                $scope.refreshCompteurs = function () {

                $http({
                    method: 'GET',
                    url: config.url + '/CourrierLot/GetCompteurs/'
                })
                 .success(function (data) {
                     console.log('GetCompteurs:' + data);
                     $scope.Cpt = data;
                     var total = data[0] + data[1] + data[2] + data[3];
                     console.log('total:' + total);

                     $scope.Cpt0ClassRatio = "circle cyan-blue";
                     $scope.Cpt1ClassRatio = "circle sky-blue";
                     $scope.Cpt2ClassRatio = "circle blue";
                     $scope.Cpt3ClassRatio = "circle r-blue";

                     if (data[0] > 0 && total > 0) {
                         var ratio = data[0] / total * 100;
                         if (ratio > 70)
                             $scope.Cpt0ClassRatio += " big";
                         else if (ratio > 30 && ratio <= 70)
                             $scope.Cpt0ClassRatio += " medium";
                         else
                             $scope.Cpt0ClassRatio += " tiny";
                     }
                     else
                         $scope.Cpt0ClassRatio += " tiny";
                     if (data[1] > 0 && total > 0) {
                         var ratio = data[1] / total * 100;
                         if (ratio > 70)
                             $scope.Cpt1ClassRatio += " big";
                         else if (ratio > 30 && ratio <= 70)
                             $scope.Cpt1ClassRatio += " medium";
                         else
                             $scope.Cpt1ClassRatio += " tiny";
                     }
                     else
                         $scope.Cpt1ClassRatio += " tiny";
                     if (data[2] > 0 && total > 0) {
                         var ratio = data[2] / total * 100;
                         if (ratio > 70)
                             $scope.Cpt2ClassRatio += " big";
                         else if (ratio > 30 && ratio <= 70)
                             $scope.Cpt2ClassRatio += " medium";
                         else
                             $scope.Cpt2ClassRatio += " tiny";
                     }
                     else
                         $scope.Cpt2ClassRatio += " tiny";

                     if (data[3] > 0 && total > 0) {
                         var ratio = data[3] / total * 100;
                         if (ratio > 70)
                             $scope.Cpt3ClassRatio += " big";
                         else if (ratio > 30 && ratio <= 70)
                             $scope.Cpt3ClassRatio += " medium";
                         else
                             $scope.Cpt3ClassRatio += " tiny";
                     }
                     else
                         $scope.Cpt3ClassRatio += " tiny";


                 });
            }

            $scope.refreshCompteurs();

                /* ------------ Events -------------*/
            $scope.$on('CourrierLotValidated', function (event) {
                $scope.refreshCompteurs();
            });

            //$scope.Filter.SelectedScenario = '';

            //if ($scope.Filter.SelectedScenario) {
            //    console.log('$scope.Filter.SelectedScenario:' + $scope.Filter.SelectedScenario);

            //    $http({
            //        method: 'GET',
            //        url: config.url + '/CourrierLot/GetNiveauxFilterView/' + $scope.Filter.SelectedScenario
            //    })
            //     .success(function (data) {
            //         $scope.Filter.Niveaux = data;
            //     });
            //}
            
            $scope.SMSClick = function () {
                $scope.Filter.SelectedType = 'sms';
                $rootScope.$broadcast('CourrierLotFilterClick', $scope.Filter.SelectedType, $scope.Filter.SelectedSociete, $scope.Filter.SelectedScenario, $scope.Filter.SelectedNiveau, $scope.Filter.Multisearch);
            }
            $scope.FaxClick = function () {
                $scope.Filter.SelectedType = 'fax';
                $rootScope.$broadcast('CourrierLotFilterClick', $scope.Filter.SelectedType, $scope.Filter.SelectedSociete, $scope.Filter.SelectedScenario, $scope.Filter.SelectedNiveau, $scope.Filter.Multisearch);
            }

            $scope.MailClick = function () {
                $scope.Filter.SelectedType = 'mails';
                $rootScope.$broadcast('CourrierLotFilterClick', $scope.Filter.SelectedType, $scope.Filter.SelectedSociete, $scope.Filter.SelectedScenario, $scope.Filter.SelectedNiveau, $scope.Filter.Multisearch);
            }

            $scope.LettreClick = function () {
                $scope.Filter.SelectedType = 'lettres';
                $rootScope.$broadcast('CourrierLotFilterClick', $scope.Filter.SelectedType, $scope.Filter.SelectedSociete, $scope.Filter.SelectedScenario, $scope.Filter.SelectedNiveau, $scope.Filter.Multisearch);
            }

            $scope.CourrierLotFilterClick = function () {
                $rootScope.$broadcast('CourrierLotFilterClick', $scope.Filter.SelectedType, $scope.Filter.SelectedSociete, $scope.Filter.SelectedScenario, $scope.Filter.SelectedNiveau, $scope.Filter.Multisearch);
            }


        }]);

}());