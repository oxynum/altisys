(function () {
    'use strict';
 
    var app = angular.module('appRouteClient')
    app.controller('blocNoteController', ['$scope', '$http', '$stateParams', 'uiGridConstants', 'gridConfService', '$filter', 'config', function ($scope, $http, $stateParams, uiGridConstants, gridConfService, $filter, config) {


        $http({
            method: 'GET',
            url: config.url + '/Client/GetBlocNoteView/' + $stateParams.societe + '/' + $stateParams.numcomptable
        })
         .success(function (data) {
             $scope.BlocNote = data;
             $scope.BlocNote.societe = data.Societe;
             $scope.BlocNote.numcomptable = data.Numcomptable;
             $scope.BlocNote.TypeBlocNotes = data.TypeBlocNotes;
             $scope.BlocNote.TypeBlocNotesAdd = data.TypeBlocNotesAdd;
             $scope.BlocNote.Users = data.Users;
             $scope.BlocNote.Note = data.Note;
             $scope.BlocNote.typeBlocNoteSelectedAdd = data.typeBlocNoteSelectedAdd;
             $scope.BlocNote.Dates = data.Dates;
             $scope.BlocNote.TypeBlocNoteSelected = data.typeBlocNoteSelected;
             $scope.BlocNote.UserSelected = data.UserSelected;
             $scope.BlocNote.DateSelected = data.DateSelected;
             $scope.BlocNote.DateDebutSelected = new Date($filter('date')(data.DateDebutSelected, "yyyy-MM-dd", "UTC"));
             $scope.BlocNote.DateFinSelected = new Date($filter('date')(data.DateFinSelected, "yyyy-MM-dd", "UTC"));
             

         })
            .error(function (data, status, header, config) {
                //alert('fail');
            });


        $scope.FiltreBlocNote = function () {

            gridConfService.simpleConf$columnDefs($scope, config.url + '/Client/GetBlocNoteObject/' + $scope.BlocNote.societe + '|' + $scope.BlocNote.numcomptable + '|' + $scope.BlocNote.TypeBlocNoteSelected + '|' + $scope.BlocNote.UserSelected + '|' + $scope.BlocNote.DateSelected + '|' + $filter('date')($scope.BlocNote.DateDebutSelected, "yyyy-MM-dd", "UTC") + '|' + $filter('date')($scope.BlocNote.DateFinSelected, "yyyy-MM-dd", "UTC") + '/', 240);

        }

        $scope.DateSelectedChanged = function () {
            $http({
                method: 'POST',
                url: config.url + '/Client/PostDate',
                data: JSON.stringify($scope.BlocNote.DateSelected),
                headers: { 'Content-Type': 'application/json' },

            })
            .success(function (data, status, headers, config) {
                if (data.DateSelected == "1") {
                    $scope.BlocNote.DateDebutSelected = data.DateDebutSelected != null ? new Date($filter('date')(data.DateDebutSelected, "yyyy-MM-dd", "UTC")) : $scope.BlocNote.DateDebutSelected;
                    $scope.BlocNote.DateFinSelected = new Date($filter('date')(data.DateFinSelected, "yyyy-MM-dd", "UTC"));
                }
            })
            .error(function (data, status, header, config) {
            });
        }

        $scope.gridMode = 'BlocNote';
        // Fonction grid factorisée
        gridConfService.simpleConf$columnDefs($scope, config.url + '/Client/GetBlocNoteObject/' + $stateParams.societe + '|' + $stateParams.numcomptable + '|||||' + '/', 240);




        $scope.AddNote = function () {
            $http({
                method: 'POST',
                url: config.url + '/Client/AddNote',
                data: JSON.stringify($scope.BlocNote),
                headers: { 'Content-Type': 'application/json' },

            })
            .success(function (data, status, headers, config) {
                $scope.FiltreBlocNote();
            })
            .error(function (data, status, header, config) {
            });
        };

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