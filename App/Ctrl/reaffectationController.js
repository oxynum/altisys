
(function () {
    'use strict';

    var app = angular.module('appRoutePortefeuille')
    app.controller('reaffectationController', ['$rootScope', '$scope', '$http', '$stateParams', 'config'
        , 'modalState', '$filter'
        , function ($rootScope,$scope, $http, $stateParams,config
            , modalState, $filter
            ) {
        $http({
            method: 'GET',
            url: config.url + '/Client/GetReaffectationCreateView/'
        })
         .success(function (data) {
             $scope.Filter = data;
             $scope.Filter.Gestionnaires = data.Gestionnaires;
             $scope.Filter.DateReaffectation = new Date($filter('date')(data.DateReaffectation, "yyyy-MM-dd", "UTC"));
             $scope.Filter.Clients = data.Clients;
             $scope.Filter.SelectedGestionnaire = data.SelectedGestionnaire;
         });
           

        $scope.$on('reaffectationRowsSelected', function (event, rows) {

            $scope.Filter.clients = [];
            if (rows) {
                for (var i = 0; i < rows.length; i++) {
                    $scope.Filter.clients.push(rows[i].SOC+'||'+rows[i].NUM);
                }
            }
        });



        $scope.AddReaffectation = function (){

                $http({
                    method: 'POST',
                    url: config.url + '/Client/AddReaffectation',
                    data: JSON.stringify($scope.Filter),
                    headers: { 'Content-Type': 'application/json' },
                    
                })
                .success(function (data, status, headers, config) {
                })
                .error(function (data, status, header, config) {
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