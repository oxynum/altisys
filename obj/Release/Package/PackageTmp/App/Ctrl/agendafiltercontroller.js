
(function () {
    'use strict';

    var app = angular.module('appRouteAccueil')
    app.controller('agendafiltercontroller', ['$rootScope', '$scope', '$http', '$stateParams', 'config', '$location'
            , function ($rootScope,$scope, $http, $stateParams, config, $location
            ) {
            $http({
                method: 'GET',
                url: config.url + '/Agenda/GetAgendaFilterView/'
            })
             .success(function (data) {
                 $scope.Filter = data;
                 $scope.Filter.Gestionnaires = data.Gestionnaires;
                 //$scope.Filter.TypeDebiteurs = data.TypeDebiteurs;
                 $scope.Filter.Ages = data.Ages;
                 $scope.Filter.Qualifications = data.Qualifications;
                 //$scope.Filter.Types = data.Types;
                 $scope.Filter.SelectedGestionnaire = data.Gestionnaires[data.SelectedGestionnaire];
                 //$scope.Filter.SelectedTypeDebiteur = data.TypeDebiteurs[data.SelectedTypeDebiteur];
                 $scope.Filter.SelectedAge = data.Ages[data.SelectedAge];
                 $scope.Filter.SelectedQualification = data.Qualifications[data.SelectedQualification];
                 $scope.Filter.SelectedType = data.SelectedType;
                 $scope.Filter.Multisearch = data.Multisearch;
                 $scope.Filter.Dispo = data.Dispo;
                 // TODO : SESSIONVARIABLE
                 if ($location.search().action == 'LETTRE')
                 {
                     $scope.Filter.SelectedType = 'lettres';
                 }
                 if ($location.search().action == 'TEL') {
                     $scope.Filter.SelectedType = 'tel';
                 }
                 if ($location.search().action == 'ALERTE') {
                     $scope.Filter.SelectedQualification = 'Alerte';
                 }
                 $scope.AgendaFilterClick();
             });


            $http({
                method: 'GET',
                url: config.url + '/Agenda/GetCompteurs/'
            })
             .success(function (data) {
                 console.log('GetCompteurs:' + data);
                 $scope.Cpt = data;
                 
                 var total = data[0] + data[1] + data[2];
                 console.log('total:' + total);

                 $scope.Cpt0ClassRatio = "circle r-blue";
                 $scope.Cpt1ClassRatio = "circle blue";
                 $scope.Cpt2ClassRatio = "circle sky-blue";

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

             });

            $scope.TelClick = function () {
                $scope.Filter.SelectedType = 'tel';
                $rootScope.$broadcast('AgendaFilterClick', $scope.Filter.SelectedGestionnaire, $scope.Filter.SelectedAge, $scope.Filter.SelectedQualification, $scope.Filter.SelectedType, $scope.Filter.Multisearch, $scope.Filter.Dispo);
            }

            $scope.MailClick = function () {
                $scope.Filter.SelectedType = 'mails';
                $rootScope.$broadcast('AgendaFilterClick', $scope.Filter.SelectedGestionnaire, $scope.Filter.SelectedAge, $scope.Filter.SelectedQualification, $scope.Filter.SelectedType, $scope.Filter.Multisearch, $scope.Filter.Dispo);
            }

            $scope.LettreClick = function () {
                $scope.Filter.SelectedType = 'lettres';
                $rootScope.$broadcast('AgendaFilterClick', $scope.Filter.SelectedGestionnaire, $scope.Filter.SelectedAge, $scope.Filter.SelectedQualification, $scope.Filter.SelectedType, $scope.Filter.Multisearch, $scope.Filter.Dispo);
            }

            $scope.AgendaFilterClick = function () {
                $rootScope.$broadcast('AgendaFilterClick', $scope.Filter.SelectedGestionnaire, $scope.Filter.SelectedAge, $scope.Filter.SelectedQualification, $scope.Filter.SelectedType, $scope.Filter.Multisearch, $scope.Filter.Dispo);
            }


        }]);

}());