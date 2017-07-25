
(function () {
    'use strict';

    var app = angular.module('appRouteClient')
    app.controller('templateNewFormController', ['$rootScope', '$scope', '$location'
        , function ($rootScope, $scope, $location
            ) {

            console.log('templateNewFormController');

            $scope.templateName = 'Template client 1 (societe, numcomptable, id factures)';

            $scope.DisplayDesigner = function () {
                console.log('DisplayDesigner');
                $location.path('/templateDesignerV2').search({ templateName: window.encodeURIComponent($scope.templateName)});

            }


        }]);

}());