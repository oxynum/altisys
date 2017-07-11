(function () {
    'use strict';
 
    var app = angular.module('appRouteAccueil')
    app.controller('accueilTopBarController', ['$rootScope', '$scope', '$http', '$stateParams', 'notificationService', 'cookieService', 'widgetConfigService', function ($rootScope, $scope, $http, $stateParams, notificationService, cookieService, widgetConfigService) {
        
        $scope.titrePage = "Ma page d'accueil";
        $scope.cookieName = 'Huy';
        $scope.widgets = [];
        var options = cookieService.get('widgets-list-page-1');
        if(options)
        {
            $scope.widgets = options;
        }

        $scope.addWidget = function (widget)
        {
            widgetConfigService.addWidget($scope.cookieName, $stateParams.page, widget);
            $rootScope.$broadcast('new-widget-added');
        }
        

    }]);
 
}());