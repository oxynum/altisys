(function () {


    var app = angular.module('appRoutePortefeuille', ['ui.router','ui.bootstrap']);     

    app.config(function ($stateProvider, modalStateProvider, $urlRouterProvider, $compileProvider) {
         
        $compileProvider.debugInfoEnabled(false);
        $stateProvider
    .state('portefeuille', {
        abstract: true,
        url: "/portefeuille",
        templateUrl: '/Views/Portefeuille/portefeuille.html'
    }) // nested client state + views
    .state('portefeuille.views', {
        url: '',
        views: {
            'portefeuilleTopBarView@portefeuille': {
                templateUrl: '/Views/Portefeuille/portefeuille.TopBarView.html'
            },
            'portefeuilleBlockView@portefeuille': {
                templateUrl: '/Views/Portefeuille/portefeuille.BlockView.html'
            },
            'portefeuilleAsideFilterView@portefeuille': {
                templateUrl: '/Views/Portefeuille/portefeuille.AsideFilterView.html'
            },
            'portefeuilleDataGridView@portefeuille': {
                templateUrl: '/Views/Portefeuille/portefeuille.DataGridView.html'
            }
        }

    });

        modalStateProvider.state('reaffectation', {
            size: 'lg',
            url: '/reaffectation/:url',
            parent: 'portefeuille.views',
            templateUrl: '/Views/Portefeuille/reaffectation.html',
            views: {
                'reaffectationDataGridCreateView@': {
                    templateUrl: '/Views/Portefeuille/reaffectation.DataGridCreateView.html'
                }
            },
            backdrop: false
        });

      
    })
})();