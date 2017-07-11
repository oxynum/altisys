(function () {
    'use strict';
 
    var app = angular.module('appRouteClient')
    app.controller('actionAddController', ['$rootScope', '$scope', '$http', '$stateParams', 'config', '$filter', function ($rootScope, $scope, $http, $stateParams, config, $filter) {
        

        $http({
            method: 'GET',
            url: config.url + '/ActionAdd/GetActionAddView/' + $stateParams.societe + '/' + $stateParams.numcomptable + '/'
        })
         .success(function (data) {
             $scope.ActionAdd = data;
             $scope.ActionAdd.typeActions = data.TypeActions;
             $scope.ActionAdd.notes = data.Notes;
             $scope.ActionAdd.dateRelance = data.DateRelance;
             
             //default radio button
             $scope.ActionAdd.radiaoAction = 'Reporter';

             $scope.date = new Date();
             $scope.ActionAdd.dateRelance = new Date($scope.date.setDate($scope.date.getDate() + 1));
         });
    

        $scope.GetNextAction = function () {
            console.log("GetNextAction");
            $http({
                method: 'GET',
                url: config.url + '/ActionAdd/GetNextAction/' + $stateParams.societe + '/' + $stateParams.numcomptable + '/'
            })
             .success(function (data) {
                    console.log(data);
                    $scope.ActionAdd.NextAction = data;
                    if (data.NextDate != null) {
                        $scope.ActionAdd.NextAction.NextDate = new Date($filter('date')(data.NextDate, "yyyy-MM-dd", "UTC"));
                    }
                });
        }


        $scope.AddAction = function () {
            $http({
                method: 'POST',
                url: config.url + '/Action/AddAction',
                data: JSON.stringify($scope.ActionAdd),
                headers: { 'Content-Type': 'application/json; charset=UTF-8' }
            })
                 .success(function (data, status, headers, config) {
                     $rootScope.$broadcast('actionAdded');
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