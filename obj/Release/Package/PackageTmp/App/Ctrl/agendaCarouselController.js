(function () {
    'use strict';
 
    var app = angular.module('appRouteAccueil');
    app.controller('agendaCarouselController', ['$rootScope', '$scope', '$http', '$animate', 'fakeDataService','$timeout', function ($rootScope, $scope, $http, $animate, fakeDataService,$timeout) {
        //$animate.enabled(false);
        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        $scope.active = 1;
        var slides = $scope.slides = [];
        var currIndex = 0;

        $scope.addSlide = function () {
            var newWidth = 600 + slides.length + 1;
            slides.push({
                image: '//unsplash.it/' + newWidth + '/300',
                // TODO : SESSIONVARIABLE
                text:'Nice image',
                id: currIndex++
            });
        };

        for (var i = 0; i < 4; i++) {
            $scope.addSlide();
        }

        /* --------------Stats widget-----------------*/
        $scope.gridsterOptions = {
            margins: [20, 20],
            columns: 4,
            mobileModeEnabled: false,
            draggable: {
                handle: 'h3'
            },
            resizable: {
                enabled: true,
                handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],

                // optional callback fired when resize is started
                start: function (event, $element, widget) { },

                // optional callback fired when item is resized,
                resize: function (event, $element, widget) {
                    if (widget.chart.api) widget.chart.api.update();
                },

                // optional callback fired when item is finished resizing 
                stop: function (event, $element, widget) {
                    $timeout(function () {
                        if (widget.chart.api) widget.chart.api.update();
                    }, 400)
                }
            },
        };

        $scope.dashboard = {
            widgets: [{
                col: 0,
                row: 0,
                sizeY: 2,
                sizeX: 2,
                name: "Discrete Bar Chart",
                chart: {
                    options: fakeDataService.discreteBarChart.options(),
                    data: fakeDataService.discreteBarChart.data(),
                    api: {}
                }
            }, {
                col: 2,
                row: 0,
                sizeY: 2,
                sizeX: 2,
                name: "Candlestick Bar Chart",
                chart: {
                    options: fakeDataService.candlestickBarChart.options(),
                    data: fakeDataService.candlestickBarChart.data(),
                    api: {}
                }
            }, {
                col: 0,
                row: 2,
                sizeY: 2,
                sizeX: 3,
                name: "Line Chart",
                chart: {
                    options: fakeDataService.lineChart.options(),
                    data: fakeDataService.lineChart.data(),
                    api: {}
                }
            }, {
                col: 4,
                row: 2,
                sizeY: 1,
                sizeX: 1,
                name: "Pie Chart",
                chart: {
                    options: fakeDataService.pieChart.options(),
                    data: fakeDataService.pieChart.data(),
                    api: {}
                }
            }]
        };


    }]);

}()); 