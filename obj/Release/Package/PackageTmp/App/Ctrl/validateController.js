(function () {
    'use strict';
 
    var app = angular.module('appRouteClient');
    app.controller('validateController', ['$scope', '$http', '$stateParams', '$location', 'listClientService', 'config', function ($scope, $http, $stateParams, $location, listClientService,config) {
      
        $http({
            method: 'GET',
            url: config.url+'/Validate/GetQualifications/' + $stateParams.societe + '/' + $stateParams.numcomptable + '/'
        })
         .success(function (data, status, headers, config) {
             $scope.Qualifications = data;
             $scope.Qualifications.societe = $stateParams.societe;
             $scope.Qualifications.numcomptable = $stateParams.numcomptable;
             $scope.Qualifications.clientSuivant = false;
             $scope.Qualifications.Actions.length = data.Actions.length;
             $scope.Qualifications.Promesses.length = data.Promesses.length;
             $scope.Qualifications.Litiges.length = data.Litiges.length;
             $scope.Qualifications.Echeanciers.length = data.Echeanciers.length;

             if (data.Actions.length == 0 && data.Promesses.length == 0 && data.Litiges.length == 0 && data.Echeanciers.length == 0)
             {
                 $scope.Qualifications.Nothing = 1;
             }


             console.log('Actions:' + $scope.Qualifications.Actions);
         })
        .error(function (data, status, header, config) {
            $scope.$dismiss();
        });


        $http({
            method: 'GET',
            url: config.url+'/ActionAdd/GetNextAction/' + $stateParams.societe + '/' + $stateParams.numcomptable + '/'
        })
        .success(function (data) {            
            if (data.NextDate) {
                $scope.NextDate = data.NextDate;
            }
            else
            {
                $scope.NextDate = new Date();
            }

            console.log("GetNextAction:Success:" + $scope.NextDate);
        })
        .error(function (data, status, header, config) {
            console.log("GetNextAction:error");
        });


        $scope.Validate = function () {           
            console.log('Validate');
            $scope.Qualifications.NextDate = $scope.NextDate;
            $http({
                method: 'POST',
                url: config.url+'/Validate/IncreaseLevel',
                data: JSON.stringify($scope.Qualifications),
                headers: { 'Content-Type': 'application/json; charset=UTF-8' }
            })
                 .success(function (data, status, headers, config) {

                     var cookie = listClientService.get();
                     if (cookie != "") {
                         // TODO : SESSIONVARIABLE
                         console.log("Passage au client : " + cookie[0].societe + " " + cookie[0].numcomptable);
                         //$scope.$dismiss(); //TODO close 
                         $location.path('/client/' + cookie[0].societe + '/' + cookie[0].numcomptable);                         
                     }
                     else {
                         $scope.$dismiss();
                     }
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