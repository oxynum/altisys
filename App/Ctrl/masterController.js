(function () {
    'use strict';

    var app = angular.module('appMain')
    app.controller('masterController', ['$rootScope', '$scope', '$http', 'storageService', 'cookieService', function ($rootScope, $scope, $http, storageService, cookieService) {
        var vm = this;
        //$scope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        //    var state = toState.name.toLowerCase();;
        //    if (toState.name.indexOf('.') != -1) {
        //        state = toState.name.split('.')[0];
        //    }
        //    console.log(state.toLowerCase());

        //    if (state == 'agenda' || state == 'accueil' || state == 'portefeuille' || state == 'pagev1' || state == 'pagev1maxheight' || state == 'login') {
        //        vm.path = state;
        //    }
        //    else {
        //        vm.path = 'traitement';
        //    }

        //    console.log(vm.path);
        //});

    }]);


}());