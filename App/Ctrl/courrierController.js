
(function () {
    'use strict';

    var app = angular.module('appRouteClient')
    app.controller('courrierController', ['$scope', '$http', '$stateParams'
        , 'modalState', '$location', 'config'
        , function ($scope, $http, $stateParams
            , modalState, $location, config
            ) {
            $scope.scopsociete = $stateParams.societe;
            $scope.scopnumcomptable = $stateParams.numcomptable;
        $http({
            method: 'GET',
            url: config.url + '/Promesse/GetCourrierView/' + $stateParams.societe + '/' + $stateParams.numcomptable
        })
         .success(function (data) {
             $scope.courriers = data.Courriers;
             $scope.Courrier = {};
             $scope.Courrier.idPieces = [];
             $scope.Courrier.npieces = [];
             $scope.Courrier.societe = $stateParams.societe;
             $scope.Courrier.numcomptable = $stateParams.numcomptable;
         });
           

        $scope.$on('CourrierRowsSelected', function (event, rows) {

            $scope.Courrier.idPieces = [];
            $scope.Courrier.npieces = [];
            if (rows) {
                for (var i = 0; i < rows.length; i++) {
                    $scope.Courrier.idPieces.push(rows[i].Idpiece);
                    $scope.Courrier.npieces.push(rows[i].Npiece);
                }
            }
        });



        $scope.DisplayCourrier = function () {
            
            console.log('$scope.Courrier.IdModele:' + $scope.Courrier.IdModele)

                $http({
                    method: 'POST',
                    url: config.urlV1 + 'Handlers/InitHandler.aspx',
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: $scope.Courrier,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    
                })
                .success(function (data, status, headers, config) {
                    //redirect
                    $location.path('/pageV1MaxHeight/' + window.encodeURIComponent('~/Authenticated/MailManagement/WebUI/MailEdition.aspx') + '/' + $stateParams.societe + '/' + $stateParams.numcomptable);
                })
                .error(function (data, status, header, config) {
                    $scope.$dismiss();
                });
            }             

       


        }]);
 
    }());