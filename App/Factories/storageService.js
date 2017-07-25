
(function (app) {
    'use strict';

    app.factory('storageService', function ($rootScope, $localStorage) {
        return {
            set: function (key, value) {
                $localStorage[key] = value;
            },
            get: function (key) {
                return $localStorage[key];
            },
            remove: function (key) {
                $window.localStorage.removeItem(key);
            },
            clear: function () {
                $window.localStorage.clear();
            }
            //,
            //setObject: function (key, value) {
            //    $localStorage[key] = JSON.stringify(value);
            //},
            //getObject: function (key, defaultValue) {
            //    if ($localStorage[key] != undefined) {
            //        return JSON.parse($localStorage[key]);
            //    } else {
            //        return defaultValue || false;
            //    }
            //},
        }
    });

})(angular.module('appMain'));
