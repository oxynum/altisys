(function () {
    'use strict';
 
    var app = angular.module('appRouteAccueil')
    app.controller('loginController', ['$rootScope', '$scope', '$http', '$stateParams', 'membershipService', '$location', 'cookieService', 'notificationService', 'config', function ($rootScope, $scope, $http, $stateParams, membershipService, $location, cookieService, notificationService, config) {
        $scope.user = {};
        $scope.submit = function()
        {
            membershipService.login($scope.user, loginCompleted);
            //    function (r) {
            //    $http({
            //        method: 'GET',
            //        url: 'http://localhost:60033/LoginSimple.aspx?username=' + $stateParams.username
            //    });
            //    var repo = cookieService.get('repository') || '{}';
            //    $rootScope.repository = JSON.parse(repo);
            //    if (!$rootScope.repository.loggedUser)
            //        $rootScope.repository.loggedUser = {};
            //    $rootScope.repository.loggedUser.username = $scope.user.username;
            //    cookieService.set('repository', JSON.stringify($rootScope.repository));
            //    $scope.$dismiss();
            //    $location.path('/agenda');
            //});

        }

        function loginCompleted(result) {
            if (result.data.success) {

                //console.log('url:' + config.urlV1 + 'LoginSimple.aspx?username=' + $scope.user.username + '&pwd=' + $scope.user.password);
                // V1 auth
                $http({
                    method: 'GET',
                    url: config.urlV1 + 'LoginSimple.aspx?username=' + $scope.user.username + '&pwd=' + $scope.user.password
                })
                 .success(function (data) {
                     console.log('V1 LoginSimple OK');
                 })
                .error(function (data, status, header, config) {
                    console.log('V1 LoginSimple KO');
                });

                membershipService.saveCredentials($scope.user);



                //Load user info
                $http({
                    method: 'GET',
                    url: config.url + '/User/GetUserInfo/' + $scope.user.username
                })
                 .success(function (data) {
                     console.log(JSON.stringify(data));
                     cookieService.set('userInfo', data);
                 })
                .error(function (data, status, header, config) {
                    //alert('fail');
                });





                // TODO : SESSIONVARIABLE
                notificationService.displaySuccess('Bonjour ' + $scope.user.username);

                if ($rootScope.previousState)
                    $location.path($rootScope.previousState);
                else
                    $location.path('/accueil/1');
            }
            else {
                console.log('login failed');
                notificationService.displayError('Echec de connexion. Veuillez réessayer.');
            }
        }

        // TODO : SESSIONVARIABLE
        $scope.titrePage = "Ma page d'accueil";

        
        
    }]);
 
}());