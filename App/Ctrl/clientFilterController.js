(function () {
    'use strict';
 
    var app = angular.module('appRouteClient');
    app.controller('clientFilterController', ['$rootScope', '$scope', '$http', '$location', 'config', function ($rootScope, $scope, $http, $location,config) {

        
        $scope.location = $location;
        $scope.$watch('location.search()', function () {
            $scope.npiece = $location.search().npiece;
        }, true);
        
        
            $http({
                method: 'GET',
                url: config.url+'/Client/GetClientFilterView/'
            })
             .success(function (data) {
                 $scope.Filter = {};
                 $scope.Filter.Criteres = data;
                 if ($scope.npiece != "") {
                     $scope.Filter.NPiece = $scope.npiece;
                     $scope.ClientFilterClick();
                 }

             });


            $scope.ClientFilterClick = function () {
            $rootScope.$broadcast('ClientFilterClick', $scope.Filter.NPiece, $scope.Filter.SelectedCritere, $scope.Filter.De, $scope.Filter.A);
        }

    }]);
    

}()); 