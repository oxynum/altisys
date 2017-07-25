(function (app) {
    'use strict';

    app.factory('reportVarService', function () {

        var _reportVars = {
            fid: null,
            societe: null,
            numcomptable: null
        };

        return {
            set:function(name, value){   
                switch(name){
                    case 'fid': _reportVars.fid = value; break;
                    case 'societe': _reportVars.societe = value; break;
                    case 'numcomptable': _reportVars.numcomptable = value; break;
                }
                //console.log('_reportVars');
                //console.log(JSON.stringify(_reportVars));
                //console.log('_reportVars.fid:' + _reportVars.fid);
            },
            get: function (name) {
                return this.get$One(name);
            },
            get$One: function (name) {
                if (name === undefined) {
                    return _reportVars;
                }
                else {
                    var value = {};
                    switch (name) {
                        case 'fid': value = _reportVars.fid; break;
                        case 'societe': value = _reportVars.societe; break;
                        case 'numcomptable': value = _reportVars.numcomptable; break;
                    }
                    return value;
                }
            },
            clear: function () {
                _reportVars = {
                    fid: null,
                    societe: null,
                    numcomptable: null
                }
            }
        };
    });
})(angular.module('appMain'));

