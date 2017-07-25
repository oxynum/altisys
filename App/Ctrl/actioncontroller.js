(function () {
    'use strict';
 
    var app = angular.module('appRouteClient')
    app.controller('actioncontroller', ['$scope', '$http', '$stateParams', 'uiGridConstants', 'gridConfService', '$filter', 'config', function ($scope, $http, $stateParams, uiGridConstants, gridConfService, $filter, config) {


        $http({
            method: 'GET',
            url: config.url + '/Action/GetActionCreateView/' + $stateParams.societe + '/' + $stateParams.numcomptable
        })
         .success(function (data) {
             $scope.Action = data;
             $scope.Action.societe = data.Societe;
             $scope.Action.numcomptable = data.Numcomptable;
             $scope.Action.actions = data.Actions;
             $scope.Action.typeactions = data.TypeActions;
             $scope.Action.Dates = data.Dates;
             $scope.Action.TypeActionSelected = data.TypeActionSelected;

             $scope.Action.ActionSelected = data.Actions[data.ActionSelected];

             $scope.Action.DateSelected = data.DateSelected;

             $scope.Action.DateDebutSelected = new Date($filter('date')(data.DateDebutSelected, "yyyy-MM-dd", "UTC"));
             $scope.Action.DateFinSelected = new Date($filter('date')(data.DateFinSelected, "yyyy-MM-dd", "UTC"));
             

         })
            .error(function (data, status, header, config) {
                //alert('fail');
            });


        var defs = {};
        defs.columnDefs = [
                    {
                        'nomchamp': 'Dateaction',
                        'isvisible': true
                    },
                    {
                        'nomchamp': 'Codeetat',
                        'isvisible': true
                    },
                    {
                        'nomchamp': 'Agentrecouvrement',
                        'isvisible': true
                    },
                    {
                        'nomchamp': 'Agentencaisseur',
                        'isvisible': true
                    },
                    {
                        'nomchamp': 'Notes',
                        'isvisible': true
                    },
                    {
                        'nomchamp': 'email',
                        'isvisible': true
                    }
        ];
        $scope.FiltreAction = function () {

            gridConfService.simpleConf$columnDefs$specificDefs($scope, config.url + '/Action/GetDataObject/' + $scope.Action.societe + '|' + $scope.Action.numcomptable + '|' + $scope.Action.TypeActionSelected + '|' + $scope.Action.ActionSelected + '|' + $scope.Action.DateSelected + '|' + $filter('date')($scope.Action.DateDebutSelected, "yyyy-MM-dd", "UTC") + '|' + $filter('date')($scope.Action.DateFinSelected, "yyyy-MM-dd", "UTC") + '/', 40, defs);

        }
        

        $scope.TypeActionSelectedChanged = function () {
            $http({
                method: 'POST',
                url: config.url + '/Action/PostCodeAction',
                data: JSON.stringify($scope.Action.TypeActionSelected),
                headers: { 'Content-Type': 'application/json' },
                    
            })
            .success(function (data, status, headers, config) {
                $scope.Action.actions = data.Actions;
                $scope.Action.ActionSelected = data.Actions[data.ActionSelected];
            })
            .error(function (data, status, header, config) {
            });
        }
        $scope.DateSelectedChanged = function () {
            $http({
                method: 'POST',
                url: config.url + '/Action/PostDate',
                data: JSON.stringify($scope.Action.DateSelected),
                headers: { 'Content-Type': 'application/json' },

            })
            .success(function (data, status, headers, config) {
                if (data.DateSelected == "1") {
                    $scope.Action.DateDebutSelected = data.DateDebutSelected != null ? new Date($filter('date')(data.DateDebutSelected, "yyyy-MM-dd", "UTC")) : $scope.Action.DateDebutSelected;
                    $scope.Action.DateFinSelected = new Date($filter('date')(data.DateFinSelected, "yyyy-MM-dd", "UTC"));
                }
            })
            .error(function (data, status, header, config) {
            });
        }

        $scope.gridMode = 'ACTION';
        // Fonction grid factorisée
        gridConfService.simpleConf$columnDefs$specificDefs($scope, config.url + '/Action/GetDataObject/' + $stateParams.societe + '|' + $stateParams.numcomptable + '|||||' + '/', 40, defs);


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