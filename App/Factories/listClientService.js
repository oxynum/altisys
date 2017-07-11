
(function (app) {
    'use strict';

    app.factory('listClientService', ['$rootScope', '$http', 'cookieService', '$location', 'config', function ($rootScope, $http, cookieService, $location, config) {
        return {
            set: function (filter) {
                //console.log('listClientService:set');
                /* ---------------- init cookie "client suivant" -----------------*/
                $http({
                    method: 'GET',
                    url: config.url+'/Agenda/GetDataObject/' + filter
                })
                    .success(function (data, status, headers, config) {
                        var rows = data.Results
                        var client = [];
                        for (var i = 0; i < rows.length; i++) {
                            var item = { societe: rows[i].SOC, numcomptable: rows[i].NUM };
                            client.push(item);

                        }
                        //console.log('client:' + JSON.stringify(client));
                        cookieService.set('clients', client);
                    })

            },
            get: function () {
                var cookieClient = "";
                if (cookieService.get('clients')) { 
                    cookieClient = cookieService.removeItemAt('clients', 0);
                }
                if (cookieClient == "") {
                    /* ---------------- init "client suivant" -----------------*/
                    var userFilter = '';

                    if (cookieService.get('userInfo')) {
                        var userInfo = cookieService.get('userInfo');
                        userFilter = userInfo.Filter;
                    }

                    this.set(userFilter + '/CC1|Tous|Tous|Tous||true/0/50/1/ASC'); //TODO CC1 => Tous ?
                    cookieClient = cookieService.get('clients');
                }

                return cookieClient;
            }
        }
    }]);

})(angular.module('appMain'));
