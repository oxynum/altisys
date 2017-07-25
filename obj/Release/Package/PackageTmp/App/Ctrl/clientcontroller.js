(function () {
    'use strict';
 
    var app = angular.module('appRouteClient');
    app.controller('clientcontroller', ['$rootScope', '$scope', '$http', '$stateParams'
        //, 'modalService', 'storageService'
        , function ($rootScope, $scope, $http, $stateParams
        //, modalService, storageService
        ) {
            $scope.toggleCollapsedAction = function(){
                            $rootScope.isCollapsed = !$rootScope.isCollapsed;
                        };
       
            $scope.scopsociete = $stateParams.societe;
            $scope.scopnumcomptable = $stateParams.numcomptable;

    }]);
}()); 