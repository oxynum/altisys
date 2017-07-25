(function (app) {
    'use strict';

    app.factory('reportService', function () {

        var _report = {
            id: null,
            name: null,
            value: null,
            familyId: null,
            toSaveInDB: null
        };

        return {
            set: function (id, name, value, familyId, toSaveInDB) {
                _report.id = id; 
                _report.name = name; 
                _report.value = value;;
                _report.familyId = familyId;
                _report.toSaveInDB = toSaveInDB;
            },
            get: function () {
                return _report;
            },
            clear: function () {
                _report = {
                    id: null,
                    name: null,
                    value: null,
                    familyId: null,
                    toSaveInDB: null
                }
            }
        };
    });
})(angular.module('appMain'));

