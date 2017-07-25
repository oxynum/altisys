(function () {
    'use strict';
 
    var app = angular.module('appRouteClient')
    app.controller('documentsRelanceController', ['$rootScope', '$scope', '$http', '$stateParams', 'config', '$sce', function ($rootScope, $scope, $http, $stateParams, config, $sce) {
        
        
        $scope.$on('CourrierLotIds', function (event, ids) {
            console.log('CourrierLotIds:' + ids)
            $scope.ids = ids;

        });

        $http({
            method: 'POST',
            url: config.url + '/CourrierLot/GetDocs',
            data: "[175585,175586]",//JSON.stringify($scope.ids),
            headers: { 'Content-Type': 'application/json' },
            responseType: 'arraybuffer'
        })
.success(function (response) {
    console.log('response.byteLength:' + response.byteLength);
    var file = new Blob([response], { type: 'application/pdf' });
    var fileURL = URL.createObjectURL(file);
    $scope.content = $sce.trustAsResourceUrl(fileURL);
    //window.open(fileURL); 
});
    
    }]);

 
}());