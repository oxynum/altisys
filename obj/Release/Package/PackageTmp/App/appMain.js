'use strict';
var app = angular.module('appMain', ['ui.router', 'angular-loading-bar', 'ui.bootstrap', 'ui.bootstrap.contextMenu', 'nvd3ChartDirectives', 'ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.pagination', 'ui.grid.selection', 'ui.grid.grouping', 'ui.grid.expandable', 'appRouteAccueil', 'appRouteClient', 'appRoutePortefeuille', 'ngStorage', 'ngCookies', 'base64', 'angularValidator', 'gridster', 'angularFileUpload', 'appMain.Environment.conf']);


app.run(['$rootScope', '$http', '$state', 'storageService', '$stateParams', 'cookieService', 'config', 'widgetFactory', '$sce', function ($rootScope, $http, $state, storageService, $stateParams, cookieService, config, widgetFactory, $sce) {

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

    });

    $rootScope.urlV1 = $sce.trustAsResourceUrl(config.urlV1 + 'Handlers/PingHandler.aspx');

    // Base URL
    storageService.set('base-url', config.baseUrl);

     //get User Info
    $rootScope.repository = cookieService.get('repository') || {};
    if ($rootScope.repository.loggedUser) {
        $http.defaults.headers.common['Authorization'] = $rootScope.repository.loggedUser.authdata;

    }
    //else {
    //    $rootScope.repository.loggedUser = {};
    //    $rootScope.repository.loggedUser.name = 'huyTest';
    //}

    //TODO get Lang + ProfilID after authentification

    $http({
        method: 'GET',
        url: config.url + '/Configuration/GetListColumns/FR/1' // lang + ProfilID
    })
        .success(function (data) {
            //console.log(data);
            storageService.set('grid.column.config', data);
        });

    var defaultGridDefs = {};
    defaultGridDefs.gridOptions = {};
    defaultGridDefs.gridOptions.paginationPageSizes = [25, 50, 100]; 
    defaultGridDefs.gridOptions.paginationPageSize = 25;
    defaultGridDefs.gridOptions.useExternalPagination = true;
    defaultGridDefs.gridOptions.useExternalSorting = true;
    defaultGridDefs.gridOptions.enableSelectAll = false;
    defaultGridDefs.gridOptions.enableFullRowSelection = false;
    defaultGridDefs.gridOptions.selectionRowHeaderWidth = 35;
    defaultGridDefs.gridOptions.enableGroupHeaderSelection = false;
    defaultGridDefs.gridOptions.enableRowSelection = false;
    defaultGridDefs.gridOptions.showGridFooter = false;
    defaultGridDefs.gridOptions.enablePaginationControls = true;
    defaultGridDefs.gridOptions.enableSelectionBatchEvent = false;
    defaultGridDefs.hasSelection = false;
    defaultGridDefs.paginationOptions = {
        pageNumber: 1,
        pageSize: 25,
        sort: null
    };

    storageService.set('grid.defs.default', defaultGridDefs);
    var widgets = widgetFactory.getAll();
    
    cookieService.newFIFO('widgets-list-page-1', 20, widgets);
}]);


isAuthenticated.$inject = ['membershipService', '$rootScope', '$location', '$window'];

function isAuthenticated(membershipService, $rootScope, $location, $window) {
    if (!membershipService.isUserLoggedIn()) {
        $rootScope.previousState = $location.path();
        $location.path('/login');
    }
}




