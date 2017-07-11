(function () {
    'use strict';
 
    var app = angular.module('appRouteClient')
    app.controller('litigecontroller', ['$rootScope', '$scope', '$http', '$stateParams', 'modalState', 'config', '$location', '$filter', function ($rootScope, $scope, $http, $stateParams, modalState, config, $location,$filter) {

        $http({
            method: 'GET',
            url: config.url+'/Litige/GetLitigeCreateView/' +  $stateParams.societe + '/' + $stateParams.numcomptable + '/'
        })
         .success(function (data) {
            
             $scope.LitigeCreate = data;
             $scope.LitigeCreate.facturesLitige = data.FacturesLitige;
             $scope.LitigeCreate.gestionnaires = data.Gestionnaires;
             $scope.LitigeCreate.typeslitige = data.TypesLitige;
             $scope.LitigeCreate.codeslitige = "";
             $scope.LitigeCreate.priorites = data.Priorites;
             $scope.LitigeCreate.DMR =  new Date($filter('date')(data.DMR, "yyyy-MM-dd", "UTC"));
             $scope.LitigeCreate.montant = data.Montant;
             $scope.LitigeCreate.priorite = data.Priorite;
             $scope.LitigeCreate.interlocuteur = data.Interlocuteur;
             $scope.LitigeCreate.commentaire = data.Commentaire;
             $scope.LitigeCreate.id_dispute_type = data.Id_dispute_type;
             $scope.LitigeCreate.idtypecom = data.Idtypecom;
             $scope.LitigeCreate.checkEmail = data.CheckEmail;
             $scope.LitigeCreate.idPieces = data.FIDpiece;
             $scope.LitigeCreate.npieces = data.Npieces;
             $scope.LitigeCreate.mtsoldes = data.Mtsoldes;

             $scope.Courrier = {};
             $scope.Courrier.idPieces = [];
             $scope.Courrier.npieces = [];
             $scope.Courrier.societe = $stateParams.societe;
             $scope.Courrier.numcomptable = $stateParams.numcomptable;
             $scope.Courrier.IdModele = 0;

         })
        .error(function (data, status, header, config) {
            console.log('fail');
        });


        $scope.DisputeTypeSelectedChanged = function() {
            $http({
                method: 'GET',
                url: config.url + '/Litige/GetCodeLitigeCreateView/' + $scope.LitigeCreate.id_dispute_type + '/'
            })
             .success(function (data) {
               $scope.LitigeCreate.codeslitige = data;
             });
        }

        $scope.DisputeCodeSelectedChanged = function() {
            $http({
                method: 'GET',
                url: config.url + '/Litige/GetDMRLitige/' + $scope.LitigeCreate.idtypecom + '/'
            })
             .success(function (data) {
                    var nbJour = data;
                    var dateRelance = new Date();
                    dateRelance.setDate(dateRelance.getDate() + nbJour);
                    $scope.LitigeCreate.DMR = new Date($filter('date')(dateRelance, "yyyy-MM-dd", "UTC"));
                    console.log('$scope.LitigeCreate.DMR:' + $scope.LitigeCreate.DMR);
                });
        }
        /* ------------ Events -------------*/

        //children scope that catch event 'LitigeRowsSelected' send by application scope
        $scope.$on('LitigeRowsSelected', function (event, rows) {
            document.getElementById('submitbutton').disabled = true;
            console.log('rows.length: ' + rows.length);

            $scope.Courrier.idPieces = [];
            $scope.Courrier.npieces = [];
            $scope.LitigeCreate.idPieces = [];
            $scope.LitigeCreate.npieces = [];
            $scope.LitigeCreate.mtsoldes = [];
            $scope.LitigeCreate.montant = 0;
            if (rows) {
                for (var i = 0; i < rows.length; i++) {
                    $scope.Courrier.idPieces.push(rows[i].FIDPIECE);
                    $scope.Courrier.npieces.push(rows[i].FNPIECE);
                    $scope.LitigeCreate.idPieces.push(rows[i].FIDPIECE);
                    $scope.LitigeCreate.npieces.push(rows[i].FNPIECE);
                    $scope.LitigeCreate.mtsoldes.push(rows[i].FMTSOLDE);

                    $scope.LitigeCreate.montant += rows[i].FMTSOLDE;
                    document.getElementById('submitbutton').disabled = false;
                }
                //Sample object FacturesLitigeDTO :
                //$scope.LitigeCreate.facturesLitige = "\"FacturesLitige\":[{\"IdPiece\":\"0062261712010\",\"Npiece\":\"320520006 1005\",\"Mtsolde\":542625.13}]";

                console.log('$scope.LitigeCreate.idPieces: ' + $scope.LitigeCreate.idPieces);
            }
        });


        $scope.DisplayCourrier = function () {

            console.log('$scope.Courrier.IdModele:' + $scope.Courrier.IdModele)
            console.log('$scope.Courrier.IdLitige:' + $scope.Courrier.IdLitige)

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
        
        $scope.AddLitige = function () {

           $http({
                method: 'POST',
                url: config.url+'/Litige/AddLitige',
                data: JSON.stringify($scope.LitigeCreate),
                headers: { 'Content-Type': 'application/json; charset=UTF-8' }
            })
                .success(function (data, status, headers, config) {
                    $scope.Courrier.IdModele = data[0];
                    $scope.Courrier.IdLitige = data[1];
                    console.log('$scope.LitigeCreate.checkEmail:' + $scope.LitigeCreate.checkEmail);

                    if ($scope.Courrier.IdModele === 0 || !$scope.LitigeCreate.checkEmail) {
                        $rootScope.$broadcast('refresh');
                        $scope.$dismiss();
                    }
                    else {
                        $scope.DisplayCourrier();
                    }
                })
                .error(function (data, status, header, config) {
                    console.log('error');
                    $scope.$dismiss();
                });
        }


        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };

        $scope.popup1 = {
            opened: false
        };


        $scope.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        function getDayClass(data) {
            var date = data.date,
              mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }
        }


    }]);
 
}());