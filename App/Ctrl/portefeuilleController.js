(function () {
    'use strict';
 
    var app = angular.module('appRoutePortefeuille');
    app.controller('portefeuilleController', ['$rootScope', '$scope', '$http'
        //, 'modalService', 'storageService'
        , function ($rootScope, $scope, $http
        //, modalService, storageService
        ) {
            $scope.toggleCollapsedAction = function(){
                $rootScope.isCollapsed = !$rootScope.isCollapsed;
            };
            console.log('portefeuilleController');

    }]);
    
    angular.module('appRoutePortefeuille').controller('modalController', ['$scope', function ($scope) {
    }]);

 
}()); 