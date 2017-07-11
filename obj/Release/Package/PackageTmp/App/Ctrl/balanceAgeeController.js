(function () {
    'use strict';
 
    var app = angular.module('appRouteAccueil')
    app.controller('balanceAgeeController', ['$rootScope', '$scope', '$http', '$stateParams', 'config', function ($rootScope, $scope, $http, $stateParams, config) {
        $scope.progressBA = '';
        function getPercentOf90(age)
        {
            var result = 0;
            if (age && age < 90)
            {
                result = age / 90 * 100;
            }
            if (age && age >90) {
                result = 100;
            }
            return result;
        }


        $scope.GetBalanceAgee = function () {

            $http({
                method: 'GET',
                url: config.url + '/Client/GetBalanceAgee/' + $stateParams.societe + '/' + $stateParams.numcomptable
            })
            .success(function (data) {
                if (data) {
                    $scope.balanceAgeeLitige = data.find(function (b) { return b.Type == 'litige'; });
                    $scope.balanceAgeePromesse = data.find(function (b) { return b.Type == 'promesse'; });
                    $scope.balanceAgeeEcheancier = data.find(function (b) { return b.Type == 'echeancier'; });

                    if ($scope.balanceAgeeLitige)
                        $scope.balanceAgeeLitige.Age100 = getPercentOf90($scope.balanceAgeeLitige.Age);
                    if ($scope.balanceAgeePromesse)
                        $scope.balanceAgeePromesse.Age100 = getPercentOf90($scope.balanceAgeePromesse.Age);
                    if ($scope.balanceAgeeEcheancier)
                        $scope.balanceAgeeEcheancier.Age100 = getPercentOf90($scope.balanceAgeeEcheancier.Age);

                    $scope.progressLitige = $scope.balanceAgeeLitige.Age100;

                    $scope.progressPromesse = $scope.balanceAgeePromesse.Age100;

                    $scope.progressEcheancier = $scope.balanceAgeeEcheancier.Age100;

                }

            });
        }

        $scope.GetBalanceAgee();

        $scope.$on('refresh', function () {
            $scope.GetBalanceAgee();
        });

    }]);

 
}());