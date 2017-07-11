(function () {
    'use strict';
 
    var app = angular.module('appRouteAccueil')
    app.controller('balanceAgeeDetailleeController', ['$rootScope', '$scope', '$http', '$stateParams', 'config', function ($rootScope, $scope, $http, $stateParams, config) {

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

        function getPercentOf90_180(age)
        {
            var result = 0;
            if (age && age >= 90 && age <= 180)
            {
                result = ((age / 90) - 1) * 100;
            }
            if (age && age >180) {
                result = 100;
            }
            return result;
        }

        function getPercentOf180_10000(age)
        {
            var result = 0;
            if (age && age >= 180 && age <= 270)
            {
                result = ((age / 180)-1) * 100;
            }
            if (age && age >270) {
                result = 100;
            }
            return result;
        }


        $scope.GetBalanceAgee_0_90 = function () {

            $http({
                method: 'GET',
                url: config.url + '/Client/GetBalanceAgee/' + $stateParams.societe + '/' + $stateParams.numcomptable + '/0/90'
            })
            .success(function (data) {
                if (data) {
                    $scope.balanceAgeeLitige_0_90 = data.find(function (b) { return b.Type == 'litige'; });
                    $scope.balanceAgeePromesse_0_90 = data.find(function (b) { return b.Type == 'promesse'; });
                    $scope.balanceAgeeEcheancier_0_90 = data.find(function (b) { return b.Type == 'echeancier'; });

                    if ($scope.balanceAgeeLitige_0_90)
                        $scope.balanceAgeeLitige_0_90.Age100 = getPercentOf90($scope.balanceAgeeLitige_0_90.Age);
                    if ($scope.balanceAgeePromesse_0_90)
                        $scope.balanceAgeePromesse_0_90.Age100 = getPercentOf90($scope.balanceAgeePromesse_0_90.Age);
                    if ($scope.balanceAgeeEcheancier_0_90)
                        $scope.balanceAgeeEcheancier_0_90.Age100 = getPercentOf90($scope.balanceAgeeEcheancier_0_90.Age);

                    $scope.progressLitige_0_90 = $scope.balanceAgeeLitige_0_90.Age100;

                    $scope.progressPromesse_0_90 = $scope.balanceAgeePromesse_0_90.Age100;

                    $scope.progressEcheancier_0_90 = $scope.balanceAgeeEcheancier_0_90.Age100;

                    if ($scope.balanceAgeeLitige_0_90.Montant)
                        $scope.MontantTotal += $scope.balanceAgeeLitige_0_90.Montant;
                    if ($scope.balanceAgeePromesse_0_90.Montant)
                        $scope.MontantTotal += $scope.balanceAgeePromesse_0_90.Montant;
                    if ($scope.balanceAgeeEcheancier_0_90.Montant)
                        $scope.MontantTotal += $scope.balanceAgeeEcheancier_0_90.Montant;
                }

            });
        }

        $scope.GetBalanceAgee_90_180 = function () {

            $http({
                method: 'GET',
                url: config.url + '/Client/GetBalanceAgee/' + $stateParams.societe + '/' + $stateParams.numcomptable + '/90/180'
            })
            .success(function (data) {
                if (data) {
                    $scope.balanceAgeeLitige_90_180 = data.find(function (b) { return b.Type == 'litige'; });
                    $scope.balanceAgeePromesse_90_180 = data.find(function (b) { return b.Type == 'promesse'; });
                    $scope.balanceAgeeEcheancier_90_180 = data.find(function (b) { return b.Type == 'echeancier'; });

                    if ($scope.balanceAgeeLitige_90_180)
                        $scope.balanceAgeeLitige_90_180.Age100 = getPercentOf90_180($scope.balanceAgeeLitige_90_180.Age);
                    if ($scope.balanceAgeePromesse_90_180)
                        $scope.balanceAgeePromesse_90_180.Age100 = getPercentOf90_180($scope.balanceAgeePromesse_90_180.Age);
                    if ($scope.balanceAgeeEcheancier_90_180)
                        $scope.balanceAgeeEcheancier_90_180.Age100 = getPercentOf90_180($scope.balanceAgeeEcheancier_90_180.Age);

                    $scope.progressLitige_90_180 = $scope.balanceAgeeLitige_90_180.Age100;

                    $scope.progressPromesse_90_180 = $scope.balanceAgeePromesse_90_180.Age100;

                    $scope.progressEcheancier_90_180 = $scope.balanceAgeeEcheancier_90_180.Age100;

                    if ($scope.balanceAgeeLitige_90_180.Montant)
                        $scope.MontantTotal += $scope.balanceAgeeLitige_90_180.Montant;
                    if ($scope.balanceAgeePromesse_90_180.Montant)
                        $scope.MontantTotal += $scope.balanceAgeePromesse_90_180.Montant;
                    if ($scope.balanceAgeeEcheancier_90_180.Montant)
                        $scope.MontantTotal += $scope.balanceAgeeEcheancier_90_180.Montant;
                }

            });
        }

        $scope.GetBalanceAgee_180_10000 = function () {

            $http({
                method: 'GET',
                url: config.url + '/Client/GetBalanceAgee/' + $stateParams.societe + '/' + $stateParams.numcomptable + '/180/10000'
            })
            .success(function (data) {
                if (data) {
                    $scope.balanceAgeeLitige_180_10000 = data.find(function (b) { return b.Type == 'litige'; });
                    $scope.balanceAgeePromesse_180_10000 = data.find(function (b) { return b.Type == 'promesse'; });
                    $scope.balanceAgeeEcheancier_180_10000 = data.find(function (b) { return b.Type == 'echeancier'; });

                    if ($scope.balanceAgeeLitige_180_10000)
                        $scope.balanceAgeeLitige_180_10000.Age100 = getPercentOf180_10000($scope.balanceAgeeLitige_180_10000.Age);
                    if ($scope.balanceAgeePromesse_180_10000)
                        $scope.balanceAgeePromesse_180_10000.Age100 = getPercentOf180_10000($scope.balanceAgeePromesse_180_10000.Age);
                    if ($scope.balanceAgeeEcheancier_180_10000)
                        $scope.balanceAgeeEcheancier_180_10000.Age100 = getPercentOf180_10000($scope.balanceAgeeEcheancier_180_10000.Age);

                    $scope.progressLitige_180_10000 = $scope.balanceAgeeLitige_180_10000.Age100;

                    $scope.progressPromesse_180_10000 = $scope.balanceAgeePromesse_180_10000.Age100;

                    $scope.progressEcheancier_180_10000 = $scope.balanceAgeeEcheancier_180_10000.Age100;

                    if ($scope.balanceAgeeLitige_180_10000.Montant)
                        $scope.MontantTotal += $scope.balanceAgeeLitige_180_10000.Montant;
                    if ($scope.balanceAgeePromesse_180_10000.Montant)
                        $scope.MontantTotal += $scope.balanceAgeePromesse_180_10000.Montant;
                    if ($scope.balanceAgeeEcheancier_180_10000.Montant)
                        $scope.MontantTotal += $scope.balanceAgeeEcheancier_180_10000.Montant;
                }

            });
        }

        $scope.GetBalanceAgee_0_90();
        $scope.GetBalanceAgee_90_180();
        $scope.GetBalanceAgee_180_10000();

        $scope.MontantTotal = 0;


    }]);

 
}());