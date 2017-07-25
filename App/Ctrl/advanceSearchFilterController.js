
(function () {
    'use strict';

    var app = angular.module('appRouteAccueil')
    app.controller('advanceSearchFilterController', ['$rootScope', '$scope', '$http', '$stateParams', 'config', 'cookieService'
       , function ($rootScope, $scope, $http, $stateParams, config, cookieService
              ) {

            $scope.Filter = {};

            $http({
                method: 'GET',
                url: config.url + '/AdvanceSearch/GetAdvanceSearchFilterView/'
            })
             .success(function (data) {
                 $scope.Filter = data;
                 $scope.Filter.Gestionnaires = data.Gestionnaires;
                 $scope.Filter.Ages = data.Ages;
                 $scope.Filter.Qualifications = data.Qualifications;
                 $scope.Filter.SelectedGestionnaire = data.Gestionnaires[data.SelectedGestionnaire];
                 $scope.Filter.SelectedAge = data.Ages[data.SelectedAge];
                 $scope.Filter.SelectedQualification = data.Qualifications[data.SelectedQualification];
                 $scope.Filter.Multisearch = data.Multisearch;
             });


            $http({
                method: 'GET',
                url: config.url + '/AdvanceSearch/GetAdvanceSearchCritereFilterView/'
            })
             .success(function (data) {                
                 $scope.Criteres = data;
                 $scope.Criteres.SelectedCritere = ""
                 $scope.Criteres.De = "";
                 $scope.Criteres.A = "";
             });

            
            $scope.AdvanceSearchFilterClick = function () {
                $rootScope.$broadcast('AdvanceSearchFilterClick', $scope.Filter.SelectedGestionnaire, $scope.Filter.SelectedAge, $scope.Filter.SelectedQualification, $scope.Filter.Multisearch, $scope.Criteres.SelectedCritere, $scope.Criteres.De, $scope.Criteres.A);
                $scope.SetSaveName();
                $scope.SaveClick();
            }
            $scope.SaveClick = function () {
                
                console.log('addItemFIFO');
                cookieService.addItemFIFO('AdvanceSearch', "{'SelectedGestionnaire':'" + $scope.Filter.SelectedGestionnaire + "','SelectedAge':'" + $scope.Filter.SelectedAge + "','SelectedQualification':'" + $scope.Filter.SelectedQualification + "','Multisearch':'" + $scope.Filter.Multisearch + "','SelectedCritere':'" + $scope.Criteres.SelectedCritere + "','De':'" + $scope.Criteres.De + "','A':'" + $scope.Criteres.A + "','SaveLabel':'" + $scope.Filter.SaveLabel + "'}");
                
                $scope.GetAdvanceSearches();
            }
            
            $scope.SetSaveName = function () {

                var name = "";
                if ($scope.Filter.Multisearch)
                    name += $scope.Filter.Multisearch + "_" ;
                if ($scope.Filter.SelectedGestionnaire)
                    name += $scope.Filter.SelectedGestionnaire + "_";
                if ($scope.Filter.SelectedAge)
                    name += $scope.Filter.SelectedAge + "_";
                if ($scope.Filter.SelectedQualification)
                    name += $scope.Filter.SelectedQualification + "_";
                if ($scope.Criteres.SelectedCritere)
                    name += $scope.Criteres.SelectedCritere + "_";
                if ($scope.Criteres.De)
                    name += $scope.Criteres.De + "_";
                if ($scope.Criteres.A)
                    name += $scope.Criteres.A + "_";

                $scope.Filter.SaveLabel = name.slice(0, -1);
                console.log('name:' + name);
            }

            $scope.GetAdvanceSearches = function () {
                $scope.AdvanceSearches = cookieService.get('AdvanceSearch');
            }
            

            $scope.ChangeFilter = function (item) {

                $scope.Filter.SelectedGestionnaire = item.SelectedGestionnaire;
                $scope.Filter.SelectedAge = item.SelectedAge;
                $scope.Filter.SelectedQualification = item.SelectedQualification;
                $scope.Filter.Multisearch = item.Multisearch;
                $scope.Criteres.SelectedCritere = item.SelectedCritere;
                $scope.Criteres.De = item.De;
                $scope.Criteres.A = item.A;
                $scope.Filter.SaveLabel = item.SaveLabel;

                $rootScope.$broadcast('AdvanceSearchFilterClick', $scope.Filter.SelectedGestionnaire, $scope.Filter.SelectedAge, $scope.Filter.SelectedQualification, $scope.Filter.Multisearch, $scope.Criteres.SelectedCritere, $scope.Criteres.De, $scope.Criteres.A);
            }

            $scope.DeleteFilter = function (item) {
                var items = cookieService.get('AdvanceSearch');
                        for (var i = 0; i < items.length; i++) {
                            if (items[i].SaveLabel === item.SaveLabel) {
                                cookieService.removeItemAt('AdvanceSearch', i);
                            }
                        }
                $scope.GetAdvanceSearches();

            }
            
            $scope.GetAdvanceSearches();

        }]);

}());