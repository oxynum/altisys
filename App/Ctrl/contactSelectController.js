(function () {
    'use strict';
 
    var app = angular.module('appRouteClient');
    app.controller('contactSelectController', ['$scope', '$http', '$stateParams', 'config', function ($scope, $http, $stateParams,config) {
      
        $http({
            method: 'GET',
            url: config.url+'/Contact/GetDataObjectSimple/' + $stateParams.societe + '/' + $stateParams.numcomptable + '/'
        })
         .success(function (data, status, headers, config) {
             $scope.contacts = data.Results
             $scope.rowCount = data.Rowcount;
         })
        .error(function (data, status, header, config) {
        $scope.$dismiss();
        });


        $scope.selectContact = function (contactId) {
            
            $scope.contactId = contactId;
            //TODO SDR load new contact to call by id
            console.log(contactId);
            $scope.$dismiss();
        }

    }]);
 
}());