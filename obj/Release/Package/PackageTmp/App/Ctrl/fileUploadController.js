(function () {
    'use strict';

    var app = angular.module('appRouteClient')
    app.controller('fileUploadController', ['$scope', '$http', '$stateParams', 'FileUploader', 'config', function ($scope, $http, $stateParams, FileUploader,config) {
        $scope.mode = 'EDIT';
        $scope.file = [];

        $scope.refreshList = function()
        {
            $http({
                method: 'GET',
                url: config.url+'/File/GetListFiles/' + $stateParams.societe + '/' + $stateParams.numcomptable
            })
             .success(function (data) {
                 $scope.docs = data;
             })
             .error(function (data, status, header, config) {
             });
        }
        
        $scope.refreshList();

        $scope.deleteItem = function (fileItem)
        {
            var id = $scope.file[fileItem.file.name].ID;
            $http({
                method: 'GET',
                url: config.url+'/File/Delete/' + id
            })
             .success(function (data) {
                 fileItem.remove();
                 $scope.refreshList();
             })
             .error(function (data, status, header, config) {
             });
        }

        var uploader = $scope.uploader = new FileUploader({
            // TODO : SESSIONVARIABLE
            url: config.url+'/File/Upload'
        });

        // FILTERS

        // a sync filter
        uploader.filters.push({
            name: 'syncFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                console.log('syncFilter');
                return this.queue.length < 10;
            }
        });

        // an async filter
        uploader.filters.push({
            name: 'asyncFilter',
            fn: function (item /*{File|FileLikeObject}*/, options, deferred) {
                console.log('asyncFilter');
                setTimeout(deferred.resolve, 1e3);
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function (fileItem) {
            console.info('onAfterAddingFile', fileItem);
            $scope.file[fileItem.file.name] = {};
            $scope.file[fileItem.file.name].name = fileItem.file.name;
        };
        uploader.onAfterAddingAll = function (addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function (item) {
            console.info('onBeforeUploadItem', item);
            $scope.mode = 'READ';
        };
        uploader.onProgressItem = function (fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function (progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function (fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function (fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function (fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function (fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
            
            var doc = {
                Societe: $stateParams.societe,
                Numcomptable: $stateParams.numcomptable,
                Libelle: $scope.file[fileItem.file.name].name,
                Note: '',
                // TODO : SESSIONVARIABLE
                Chemin: '~/UploadDocuments/' + fileItem.file.name,
                DateCreation:undefined,
                DateModification:undefined
            }
            $http({
                method: 'POST',
                url: config.url+'/File/Insert',
                data: JSON.stringify(doc),
                headers: { 'Content-Type': 'application/json; charset=UTF-8' }
            })
                .success(function (data, status, headers, config) {
                    console.log('success');
                    $scope.file[fileItem.file.name].ID = data.ID;
                    $scope.refreshList();
                })
                .error(function (data, status, header, config) {
                    console.log('error');
                    $scope.mode = 'EDIT';
                });
        };
        uploader.onCompleteAll = function () {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);

    }]);

}());