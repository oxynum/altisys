(function (app) {
    'use strict';
    app.controller('widgetEchuController', ['$scope', '$http', '$location', 'config', function ($scope, $http, $location, config) {
        $scope.data = {};

        $http({
            method: 'GET',
            url: config.url+'/Widget/GetEchu' //TODO user filter
        })
        .success(function (data) {
            $scope.data.datatable = data.table;
            var table = [];
            for(var i=0;i<data.table.length;i++)
                table.push({
                    x: data.table[i].DataX, y: data.table[i].DataY, xCustom: {}
                })
            $scope.data.XY = {
                xLabel : '', yLabel :'', table
            }
        })
        .error(function (data, status, header, config) {
        });

        //dataTransfer($scope.data.datatable);

        // function dataTransfer datatable => XY TODO
        function dataTransfer(datatable) {
            $scope.data.XY = [];
            for (var i = 0; i < datatable.length; i++) {
                
                //var item = { datatable[i].dataX};
                //client.push(item);
                //$scope.data.XY.push(  

            }
        }

        $scope.data.XY = [
            {
                x : '1',
                xLabel:'X',
                xCustom: {css:'',toto:''},
                y: '1',
                yLabel:'Y',
                yCustom: { css: '', toto: '' },
            }
        ];


        $scope.action = function (params) {
            alert('action:' + params);
            //$location.path('/client/' + params.societe + '/' + params.numcomptable);
        }

    }]);
})(angular.module('appMain'));
