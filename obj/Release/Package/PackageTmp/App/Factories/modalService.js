    'use strict';
var app = angular.module('appRouteClient');
var appPopin = angular.module('appPopin');

app.provider('modalState', modalState);
appPopin.provider('modalState', modalState);
function modalState($stateProvider) {
    var provider = this;
    this.$get = function () {
        return provider;
    }
    this.state = function (stateName, options) {
        var modalInstance;
        $stateProvider.state(stateName, {
            animation: false,
            url: options.url,
            parent: options.parent,
            controller: options.controller,
            views: options.views,
            params:options.params,
            onEnter: function ($uibModal, $state) {
                modalInstance = $uibModal.open(options);
                modalInstance.result['finally'](function () {
                    modalInstance = null;
                    if ($state.$current.name === stateName) {
                        $state.go(options.parent);
                    }
                });
            },
            backdrop: options.backdrop,
            resolve:options.resolve,
            windowClass: options.windowClass,
            onExit: function() {
                if (modalInstance) {
                    modalInstance.close();
                }
            }
        });
    };
}



