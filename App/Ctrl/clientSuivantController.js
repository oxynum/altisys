(function () {
    'use strict';
 
    var app = angular.module('appRouteClient')
    app.controller('clientSuivantController', ['$rootScope', '$scope', '$location', '$stateParams', 'cookieService','listClientService', '$window', 'menuContextService', 'storageService', 'notificationService', function ($rootScope, $scope, $location, $stateParams, cookieService, listClientService, $window, menuContextService, storageService, notificationService) {
        
        $scope.inFavorite = 0;
        $scope.societe = $stateParams.societe;
        $scope.numcomptable = $stateParams.numcomptable;


        $scope.$on('ClientInfo', function (event, Client) {
            $scope.Raisonsociale = Client.Raisonsociale;
            $scope.addToHisto();
            IsFavorite(); //display fav icon status
        });

        $scope.$on('FavoriteCleared', function (event) {
            $scope.inFavorite = 0;
        });

        $scope.$on('FavoriteIndexCleared', function (event) {
            IsFavorite(); //display fav icon status
        });

        $scope.addToHisto = function () {
            var baseUrl = storageService.get('base-url');
            var f = "{label:'" + $scope.Raisonsociale + "', url:'/client/" + $stateParams.societe + "/" + $stateParams.numcomptable + "'}";
            menuContextService.addItem('histo-client-url', f);
            $rootScope.$broadcast('histoClientUpdated', f);
        };
        

        $scope.switchFavorites = function () {
            var baseUrl = storageService.get('base-url');
            var f = (new Function("return {label:'" + $scope.Raisonsociale + "', url:'/client/" + $stateParams.societe + "/" + $stateParams.numcomptable + "'};"))(); 
            if (!$scope.inFavorite || $scope.inFavorite == 0)
            {
                menuContextService.addItem('favorite-client-url', f);
                $scope.inFavorite = 1;
                $rootScope.$broadcast('favoriteClientUpdated', { Action: 'add', Favorite: f });
                notificationService.displaySuccess("Fiche client " + ($scope.Raisonsociale ? $scope.Raisonsociale : '') + ' ajoutée aux favoris');
            }
            else
            {
                menuContextService.removeItem('favorite-client-url', f);
                $scope.inFavorite = 0;
                $rootScope.$broadcast('favoriteClientUpdated', { Action: 'remove', Favorite: f });
                notificationService.displaySuccess("Fiche client " + ($scope.Raisonsociale ? $scope.Raisonsociale : '') + ' retirée des favoris');
            }
        }

        function IsFavorite() {
            var fav = JSON.stringify(menuContextService.get('favorite-client-url'));
            fav = fav.replace(/\\/g, ''); //Remove all occurrences of \\
            if (fav.search($scope.Raisonsociale) != -1) //found
                $scope.inFavorite = 1;
            else
                $scope.inFavorite = 0;

        }

        //Static list (bouchon)
        //$scope.InitCookieClient = function () {
        //    $scope.cookieClient = [
        //        { societe: '100', numcomptable: 'C0000029' },
        //        { societe: '100', numcomptable: 'C0000031' },
        //        { societe: '500', numcomptable: 'C0005369' },
        //        { societe: '500', numcomptable: 'C0009125' },
        //        { societe: '100', numcomptable: 'C0000057' },
        //        { societe: '100', numcomptable: 'C0000065' },
        //        { societe: '100', numcomptable: 'C0000110' },
        //        { societe: '100', numcomptable: 'C0000118' },
        //        { societe: '100', numcomptable: 'C0000121' },
        //        { societe: '500', numcomptable: 'CV000379' },
        //        { societe: '500', numcomptable: 'C0011216' }
        //    ]
        //    cookieService.set('clients', JSON.stringify($scope.cookieClient));
        //}

        $scope.ClientSuivant = function () {
            var cookie = listClientService.get();
            if (cookie != "") {
                //console.log("Passage au client : " + cookie[0].societe + " " + cookie[0].numcomptable);
                $location.path('/client/' + cookie[0].societe + '/' + cookie[0].numcomptable);
            }

        }
    }]);

}());