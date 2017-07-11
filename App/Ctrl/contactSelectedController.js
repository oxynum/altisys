(function () {
    'use strict';
 
    var app = angular.module('appRouteClient');
    app.controller('contactSelectedController', ['$scope', '$http', '$stateParams', 'config', function ($scope, $http, $stateParams,config) {
        
        $scope.$on('ClientInfo', function (event, Client) {
            $scope.NbContact = Client.NbContacts;
        });

        $http({
            method: 'GET',
            url: config.url+'/Contact/GetContactSelected/' + $stateParams.societe + '/' + $stateParams.numcomptable + '/'
        })
         .success(function (data) {
             $scope.Contact = data;
             $scope.Contact.Name = data.Contact;
             $scope.Contact.Tel1 = data.Tel1;
             $scope.Contact.Disponible = "";
             if ($scope.Contact.Name)
             {
                 $scope.Contact.Disponible = "Disponible";
             }
             
         })
        .error(function (data) {
            console.log('contactSelectedController: error');
        });

    }]);
 
}());