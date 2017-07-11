(function () {
    'use strict';
 
    var app = angular.module('appRouteClient')
    app.controller('documentRelanceController', ['$rootScope', '$scope', '$http', '$stateParams', 'config', '$sce', function ($rootScope, $scope, $http, $stateParams, config, $sce) {

        console.log('$stateParams.id:' + $stateParams.id);

        $http({
            method: 'GET',
            url: config.url + '/CourrierLot/GetDoc/' + $stateParams.id,
            responseType: 'arraybuffer'
        })
        .success(function (response) {
            console.log('response.byteLength:' + response.byteLength);
            // TODO : SESSIONVARIABLE
             var file = new Blob([response], { type: 'application/pdf' });

            //if IE else OTHERS
            if(window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(file);
                $scope.$dismiss();
            }
            else {
                var fileURL = URL.createObjectURL(file);
                console.log('createObjectURL:' +fileURL);
                 $scope.content = $sce.trustAsResourceUrl(fileURL);
                 //window.open(fileURL); 
            }
         })
         .error(function (response) {
          console.log('error response:' + response);
         });
    
    }]);

 
}());