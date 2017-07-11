(function (app) {
    'use strict';

    app.factory('widgetFactory', function ($rootScope, cookieService) {
        var widgets = [{
            sizeY: 3,
            sizeX: 2,
            label: "Mes relances",
            controller: "widgetGridActionController",
            templateUrl: './Views/_template/Widgets/widget.gridAction.html'
        },
                    {
                        sizeY: 4,
                        sizeX: 1,
                        label: "Top échus",
                        controller: "widgetGetEchusController",
                        templateUrl: './Views/_template/GridSimpleView.html'
                    },
                    {
                        sizeY: 4,
                        sizeX: 1,
                        label: "Top échus >150",
                        controller: "widgetGetEchusController150",
                        templateUrl: './Views/_template/GridSimpleView.html'
                    },
                   {
                       sizeY: 4,
                       sizeX: 1,
                       label: "Top litiges",
                       controller: "widgetGetLitigesController",
                       templateUrl: './Views/_template/GridSimpleView.html'
                   }];
        
        return {
            get: function (index) {
                return widgets[index];
            },
            getAll: function()
            {
                return widgets;
            }
        }
    });

})(angular.module('appMain'));
