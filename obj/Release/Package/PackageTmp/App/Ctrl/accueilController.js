(function () {
    'use strict';
 
    var app = angular.module('appRouteAccueil')
    app.controller('accueilController', ['$rootScope', '$scope', '$http', '$stateParams', '$timeout', 'menuContextService', 'notificationService', '$location', 'widgetConfigService', 'widgetFactory', '$state', function ($rootScope, $scope, $http, $stateParams, $timeout, menuContextService, notificationService, $location, widgetConfigService, widgetFactory, $state) {
        
        $scope.titrePage = "Ma page d'accueil";
        $scope.cookieName = 'Huy';

        $scope.clickNext = function()
        {
            
            if (parseInt($stateParams.page) == 5)
            {
                $scope.selectedDashboardId = 0;
                $location.path('/accueil/1');
            }
                
            else
            {
                $scope.selectedDashboardId = (parseInt($stateParams.page) + 1)-1;
                $location.path('/accueil/' + (parseInt($stateParams.page) + 1));
            }
                
        }

        $scope.clickPrevious = function () {
            if (parseInt($stateParams.page) == 1)
            {
                $scope.selectedDashboardId = 4;
                $location.path('/accueil/5');
            }
            else
            {
                $scope.selectedDashboardId = (parseInt($stateParams.page) - 1)-1;
                $location.path('/accueil/' + (parseInt($stateParams.page) - 1));
            }
                
        }

        $scope.menuName = 'widgets-list-page-' + $stateParams.page;
        var options = menuContextService.get($scope.menuName);
        if (options)
            $scope.menuContextWidgets = menuContextService.get($scope.menuName);

        $scope.mcAction = function (action, index) {
            if (action == 'redirect') {
                widgetConfigService.addWidget($scope.cookieName, parseInt($stateParams.page), widgetFactory.get(index));
                $scope.dashboards = widgetConfigService.get($scope.cookieName);
                $scope.dashboard = $scope.dashboards[$scope.selectedDashboardId];
            }
            else if (action == 'remove') {
                menuContextService.removeItem($scope.menuName, index);
                $scope.mcChanged(index);
            }
        }

        $scope.mcClear = function () {
            $scope.menuContextWidgets = menuContextService.clearAll($scope.menuName);
            
        }

        $scope.mcChanged = function (f) {
            $scope.menuContextWidgets = menuContextService.get($scope.menuName);
        }

        $scope.gridsterOptions = {
            rowHeight:120,
            margins: [2, 2],
            columns: 2,
            draggable: {
                handle: 'h3, .box-header'
            }
        };

        
        var dashboards = [
            {
                id: '1',
                label: 'Home',
                widgets: [
                    {
                        col: 0,
                        row: 0,
                        sizeY: 3,
                        sizeX: 2,
                        label: "Mes relances",
                        controller: "widgetGridActionController",
                        templateUrl: './Views/_template/Widgets/widget.gridAction.html'
                    },
                    {
                        col: 0,
                        row: 3,
                        sizeY: 3,
                        sizeX: 1,
                        label: "Top échus",
                        controller: "widgetGetEchusController",
                        templateUrl: './Views/_template/GridWidgetView.html'
                    },
                    {
                        col: 1,
                        row: 3,
                        sizeY: 3,
                        sizeX: 1,
                        label: "Top échus >150",
                        controller: "widgetGetEchusController150",
                        templateUrl: './Views/_template/GridWidgetView.html'
                    },
                   {
                        col: 0,
                        row: 6,
                        sizeY: 3,
                        sizeX: 1,
                        label: "Top DSO",
                        controller: "widgetDSOController",
                        templateUrl: './Views/_template/LineChart.html'
                   },
                   {
                       col: 1,
                       row: 6,
                       sizeY: 3,
                       sizeX: 1,
                       label: "Top litiges",
                       controller: "widgetGetLitigesController",
                       templateUrl: './Views/_template/GridWidgetView.html'
                   }
                ]
            },
            {
                id: '2',
                label: 'Page 2',
                widgets: [
                    {
                        col: 0,
                        row: 0,
                        sizeY: 3,
                        sizeX: 1,
                        label: "Top promesses",
                        controller: 'widgetGetPromessesController',
                        templateUrl: './Views/_template/GridWidgetView.html'
                    },
                    {
                        col: 0,
                        row: 3,
                        sizeY: 3,
                        sizeX: 1,
                        label: "Top échus >90",
                        controller: "widgetGetEchusController90",
                        templateUrl: './Views/_template/GridWidgetView.html'
                    },
                    {
                        col: 1,
                        row: 3,
                        sizeY: 2,
                        sizeX: 1,
                        label: 'Relances en lot par type',
                        controller: 'widgetRelanceParTypeController',
                        templateUrl: './Views/_template/Widgets/widget.bubble.html'
                    }
                ]
            }
        ];
        //widgetConfigService.set($rootScope.repository.loggedUser.name, dashboards);
        //$scope.dashboards = widgetConfigService.get($rootScope.repository.loggedUser.name);
        widgetConfigService.set($scope.cookieName, dashboards);
        $scope.dashboards = widgetConfigService.get($scope.cookieName);

        $scope.clear = function () {
            $scope.dashboard.widgets = [];
        };

        $scope.addWidget = function (widget) {
            widgetConfigService.addWidget($scope.cookieName, $stateParams.page, widget);
            $scope.dashboards = widgetConfigService.get($scope.cookieName);
            $scope.dashboard = $scope.dashboards[$scope.selectedDashboardId];
        };

        $scope.$watch('selectedDashboardId', function (newVal, oldVal) {
            $scope.dashboard = $scope.dashboards[newVal-1];
        });

        // init dashboard
        $scope.selectedDashboardId = $stateParams.page ? parseInt($stateParams.page) : 0;

        //------ Custom Function ------------
        $scope.remove = function (widgetName) {
            widgetConfigService.removeWidget($scope.cookieName, $stateParams.page, widgetName);
            $scope.dashboards = widgetConfigService.get($scope.cookieName);
            $scope.dashboard = $scope.dashboards[$stateParams.page-1];
            
        };

        $scope.openSettings = function (widget) {
            $state.go('widgetSettings', { widget: widget });
        };

        $scope.$on('new-widget-added', function () {
            $scope.dashboards = widgetConfigService.get($scope.cookieName);
            $scope.dashboard = $scope.dashboards[$stateParams.page-1];
        });

    }]);
 
}());