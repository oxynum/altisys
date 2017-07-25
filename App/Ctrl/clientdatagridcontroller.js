(function () {
    'use strict';

    var app = angular.module('appRouteClient');
  
    app.controller('clientdatagridcontroller', ['$rootScope', '$scope', '$http', 'uiGridConstants', 'gridConfService', '$stateParams', 'config', function ($rootScope, $scope, $http, uiGridConstants, gridConfService, $stateParams,config) {
    
        ///* ------------Init -------------*/
        $scope.gridMode = 'ALL';
        //$scope.ALL = '<button class="btn btn-primary" ui-sref="promesseUpdate({societe:\'##\', numcomptable:\'##\',idecheancier:##})">TEST</button>';
        //$scope.NQ = '<button class="btn btn-primary" ui-sref="promesseUpdate({societe:\'##\', numcomptable:\'##\',idecheancier:##})">TEST</button>';
        $scope.PROMESSE = '<div class="personal-drop dropdown"><a class="btn-burger"><span>&nbsp;</span></a><ul class="drop in-array"><li><a ui-sref="promesseUpdate({societe:\'' + $stateParams.societe + '\', numcomptable:\'' + $stateParams.numcomptable + '\',idecheancier:row.entity.FILTER})">Update</a></li><li><a ui-sref="deletePromesse({idecheancier:row.entity.FILTER})">Supprimer</a></li><li><a ui-sref="litigeFromPromesse({idecheancier:row.entity.FILTER})">Litige</a></li><li><a ui-sref="echeancierFromPromesse({idecheancier:row.entity.FILTER})">Echeancier</a></li></ul></div>';

        $scope.ECHEANCIER = '<div class="personal-drop dropdown"><a class="btn-burger"><span>&nbsp;</span></a><ul class="drop in-array"><li><a ui-sref="echeancierUpdate({societe:\'' + $stateParams.societe + '\', numcomptable:\'' + $stateParams.numcomptable + '\',idecheancier:row.entity.FILTER})">Update</a></li><li><a ui-sref="plan({idecheancier:row.entity.FILTER})">Plan</a></li><li><a ui-sref="deleteEcheancier({idecheancier:row.entity.FILTER})">Supprimer</a></li><li><a ui-sref="litigeFromEcheancier({idecheancier:row.entity.FILTER})">Litige</a></li></ul></div>';

        $scope.LITIGE = '<div class="personal-drop dropdown"><a class="btn-burger"><span>&nbsp;</span></a><ul class="drop in-array"><li><a ui-sref="litigeDebloc({iddisputehistory:row.entity.FILTER})">Debloquer</a></li></ul></div>';

        /* ------------ Events -------------*/

        $scope.$on('clientSelectGrid', function (event, mode) {
            $scope.gridMode = mode;
            //if ($scope.needData[mode])
            //    $scope.refreshGrid(mode);
        });

        


        //$scope.$on('needRefreshData', function (event, needRefreshData) {
        //    $scope.needData[$scope.gridMode] = needRefreshData;
        //});

        //    /* ------------On Load -------------*/
        //$scope.refreshGrid($scope.gridMode);

    }])

}())