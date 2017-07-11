(function () {
    'use strict';
 
    var app = angular.module('appRouteClient')
    app.controller('clientRappelController', ['$scope', '$http', '$stateParams', 'config', '$filter', function ($scope, $http, $stateParams, config, $filter) {

        $http({
            method: 'GET',
            url: config.url+'/Client/GetClientRappelView/' + $stateParams.societe + '/' + $stateParams.numcomptable + '/'
        })
         .success(function (data) {
             $scope.Rappel = data;
             
             $scope.date = new Date();
             $scope.Rappel.RecallDate = new Date($scope.date.setDate($scope.date.getDate() + 1)); //tomorrow

             $scope.Rappel.Title = data.RaisonSociale;
             $scope.Rappel.Societe = $stateParams.societe;
             $scope.Rappel.Numcomptable = $stateParams.numcomptable;
             $scope.Rappel.RecallHour = new Date();
             $scope.Rappel.RecallHour.setMilliseconds(0);
             $scope.Rappel.RecallHour.setSeconds(0);
            });



        $scope.AddRappel = function () {
            console.log('AddRappel');
            $http({
                method: 'POST',
                url: config.url+'/Client/AddRappel',
                data: JSON.stringify($scope.Rappel),
                headers: { 'Content-Type': 'application/json; charset=UTF-8' }
            })
                 .success(function (data, status, headers, config) {
                     console.log('success');
                     $scope.$dismiss();
                 })
                 .error(function (data, status, header, config) {
                     console.log('error');
                     $scope.$dismiss();
                 });
        }


        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };

        $scope.popup1 = {
            opened: false
        };
        $scope.openTime = function () {
            console.log('openTime');
            $scope.popupTime.opened = true;
        };

        $scope.popupTime = {
            opened: false
        };
        

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