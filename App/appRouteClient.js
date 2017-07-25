(function () {
    //angular.module('appRouteClient', ['ui.bootstrap']);
    var app = angular.module('appRouteClient', ['ui.router', 'ui.bootstrap']);




    app.config(function ($stateProvider, modalStateProvider, $urlRouterProvider, $compileProvider, $httpProvider, $locationProvider) {

        if (!$httpProvider.defaults.headers.post)
            $httpProvider.defaults.headers.post = {};

        $httpProvider.defaults.headers.post["Content-Type"] = "application/json";
        $compileProvider.debugInfoEnabled(false);

        $stateProvider
    .state('client', {
        abstract: true,
        url: "/client/:societe/:numcomptable",
        templateUrl: '/Views/Client/client.html',
        resolve: { isAuthenticated: isAuthenticated }
    }) // nested client state + views
    .state('client.views', {
        url: '',
        views: {
            'clientTopBarView@client': {
                templateUrl: '/Views/Client/client.TopBarView.html'
            },
            'clientActionHistoView@client': {
                templateUrl: '/Views/Client/client.ActionHistoView.html',
                controller: 'actionSimpleDataGridcontroller'
            },
            'clientBillingView@client': {
                templateUrl: '/Views/Client/client.BillingView.html'
            },
            'clientFilterView@client': {
                templateUrl: '/Views/Client/client.FilterView.html'
            },
            'clientDataGridView@client': {
                templateUrl: '/Views/Client/client.DataGridView.html',
                controller: 'clientdatagridcontroller'
            }
        }
    })
        .state('login', {
            url: '/login',
            templateUrl: '/Views/User/login.html',
        })
        
        .state('courrierlot', {
            abstract: true,
            url: "/courrierlot",
            templateUrl: '/Views/CourrierLot/courrierLot.html',
            resolve: { isAuthenticated: isAuthenticated }
        }) // nested paper state + views
      .state('courrierlot.views', {
          url: '',
          views: {
              'courrierlotAsideRaiseBox@courrierlot': {
                  templateUrl: '/Views/CourrierLot/courrierlot.AsideRaiseBox.html'
              },
              'courrierlotAsideRaiseForm@courrierlot': {
                  templateUrl: '/Views/CourrierLot/courrierlot.AsideRaiseForm.html'
              },
              'courrierlotDataGridView@courrierlot': {
                  templateUrl: '/Views/CourrierLot/courrierlot.DataGridView.html'
              },
              'courrierlotTopBarView@courrierlot': {
                  templateUrl: '/Views/CourrierLot/courrierlot.TopBarView.html'
              }
          }
      })
        
        .state('campagnelot', {
            abstract: true,
            url: "/campagnelot",
            templateUrl: '/Views/CampagneLot/campagneLot.html',
            resolve: { isAuthenticated: isAuthenticated }
        }) // nested paper state + views
      .state('campagnelot.views', {
          url: '',
          views: {
              'campagnelotAsideRaiseBox@campagnelot': {
                  templateUrl: '/Views/CampagneLot/campagnelot.AsideRaiseBox.html'
              },
              'campagnelotAsideRaiseForm@campagnelot': {
                  templateUrl: '/Views/CampagneLot/campagnelot.AsideRaiseForm.html'
              },
              'campagnelotDataGridView@campagnelot': {
                  templateUrl: '/Views/CampagneLot/campagnelot.DataGridView.html'
              },
              'campagnelotTopBarView@campagnelot': {
                  templateUrl: '/Views/CampagneLot/campagnelot.TopBarView.html'
              }
          }
      });

        modalStateProvider.state('afficheRelances', {
            size: 'lg',
            url: '/afficheRelances',
            parent: 'courrierlot.views',
            templateUrl: '/Views/DocumentManager/documentsRelance.html',
            backdrop: false,
            resolve: { isAuthenticated: isAuthenticated }
        });
        modalStateProvider.state('afficheRelance', {
            size: 'lg',
            url: '/afficheRelance/:id',
            parent: 'courrierlot.views',
            templateUrl: '/Views/DocumentManager/documentRelance.html',
            backdrop: false,
            resolve: { isAuthenticated: isAuthenticated }
        });
        modalStateProvider.state('afficheCampagne', {
            size: 'lg',
            url: '/afficheCampagne/:id',
            parent: 'campagnelot.views',
            templateUrl: '/Views/DocumentManager/documentCampagne.html',
            backdrop: false,
            resolve: { isAuthenticated: isAuthenticated }
        });

        modalStateProvider.state('litige', {
            size: 'lg',
            url: '/litige/:societe/:numcomptable',
            parent: 'client.views',
            templateUrl: '/Views/Litige/litige.html',
            views: {
                'litigeDataGridCreateView@': {
                    templateUrl: '/Views/Litige/litige.DataGridCreateView.html'
                }
            },
            backdrop: false,
            resolve: { isAuthenticated: isAuthenticated }
        });

        modalStateProvider.state('litigeFromPromesse', {
            size: 'lg',
            url: '/litigeFromPromesse/:idecheancier',
            parent: 'client.views',
            templateUrl: '/Views/Litige/litigeFromPromesse.html',
            views: {
                'litigeDataGridCreateView@': {
                    templateUrl: '/Views/Litige/litige.DataGridCreateView.html'
                }
            },
            backdrop: false,
            resolve: { isAuthenticated: isAuthenticated }
        });

        modalStateProvider.state('litigeFromEcheancier', {
            size: 'lg',
            url: '/litigeFromEcheancier/:idecheancier',
            parent: 'client.views',
            templateUrl: '/Views/Litige/litigeFromEcheancier.html',
            views: {
                'litigeDataGridCreateView@': {
                    templateUrl: '/Views/Litige/litige.DataGridCreateView.html'
                }
            },
            backdrop: false,
            resolve: { isAuthenticated: isAuthenticated }
        });

        modalStateProvider.state('litigeDebloc', {
            size: 'lg',
            url: '/litige/:iddisputehistory',
            parent: 'client.views',
            templateUrl: '/Views/Litige/litigeDebloc.html',
            backdrop: false,
            resolve: { isAuthenticated: isAuthenticated }
        });

        modalStateProvider.state('deletePromesse', {
            size: 'lg',
            url: '/promesseDelete/:idecheancier',
            parent: 'client.views',
            templateUrl: '/Views/Promesse/promesseDelete.html',
            backdrop: false
        });

        modalStateProvider.state('deleteEcheancier', {
            size: 'lg',
            url: '/echeancierDelete/:idecheancier',
            parent: 'client.views',
            templateUrl: '/Views/Echeancier/echeancierDelete.html',
            backdrop: false,
            resolve: { isAuthenticated: isAuthenticated }
        });

        modalStateProvider.state('advanceSearch', {
            windowClass: 'app-modal-xl',
            url: '/advanceSearch',
            parent: 'client.views',
            templateUrl: '/Views/AdvanceSearch/AdvanceSearch.html',
            backdrop: false,
            resolve: { isAuthenticated: isAuthenticated }
        });

        modalStateProvider.state('identite', {
            size: 'lg',
            url: '/identite/:societe/:numcomptable',
            parent: 'client.views',
            templateUrl: '/Views/Identite/identite.html',
            backdrop: false,
            resolve: { isAuthenticated: isAuthenticated }
        });

        modalStateProvider.state('infoFinanciere', {
            size: 'lg',
            url: '/infoFinanciere/:societe/:numcomptable',
            parent: 'client.views',
            templateUrl: '/Views/InfoFinanciere/infoFinanciere.html',
            backdrop: false,
            resolve: { isAuthenticated: isAuthenticated }
        });



        modalStateProvider.state('action', {
            size: 'lg',
            url: '/action/:societe/:numcomptable',
            parent: 'client.views',
            templateUrl: '/Views/Action/action.html',
            backdrop: false,
            resolve: { isAuthenticated: isAuthenticated }
        });


        modalStateProvider.state('blocnote', {
            size: 'lg',
            url: '/blocnote/:societe/:numcomptable',
            parent: 'client.views',
            templateUrl: '/Views/Blocnote/blocnote.html',
            backdrop: false,
            resolve: { isAuthenticated: isAuthenticated }
        });

        modalStateProvider.state('actionAdd', {
            url: '/actionAdd/:societe/:numcomptable',
            parent: 'client.views',
            templateUrl: '/Views/Action/actionAdd.html',
            backdrop: false,
            resolve: { isAuthenticated: isAuthenticated }
        });


        modalStateProvider.state('echeancier', {
            size: 'lg',
            url: '/echeancier/:societe/:numcomptable',
            parent: 'client.views',
            templateUrl: '/Views/Echeancier/echeancier.html',
            views: {
                'echeancierDataGridCreateView@': {
                    templateUrl: '/Views/Echeancier/echeancier.DataGridCreateView.html'
                }
            },
            backdrop: false,
            resolve: { isAuthenticated: isAuthenticated }
        });


        modalStateProvider.state('echeancierFromPromesse', {
            size: 'lg',
            url: '/echeancierFromPromesse/:idecheancier',
            parent: 'client.views',
            templateUrl: '/Views/Echeancier/echeancierFromPromesse.html',
            views: {
                'echeancierDataGridCreateView@': {
                    templateUrl: '/Views/Echeancier/echeancier.DataGridCreateView.html'
                }
            },
            backdrop: false,
            resolve: { isAuthenticated: isAuthenticated }
        });

        modalStateProvider.state('plan', {
            size: 'lg',
            url: '/plan/:idecheancier',
            parent: 'client.views',
            templateUrl: '/Views/Plan/Plan.html',
            backdrop: false,
            resolve: { isAuthenticated: isAuthenticated }
        });


        modalStateProvider.state('echeancierUpdate', {
            size: 'lg',
            url: '/echeancierUpdate/:societe/:numcomptable/:idecheancier',
            parent: 'client.views',
            templateUrl: '/Views/Echeancier/echeancierUpdate.html',
            views: {
                'echeancierDataGridCreateView@': {
                    templateUrl: '/Views/Echeancier/echeancier.DataGridCreateView.html'
                }
            },
            backdrop: false,
            resolve: { isAuthenticated: isAuthenticated }
        });
        
        modalStateProvider.state('contact', {
            size: 'lg',
            url: '/contact/:societe/:numcomptable',
            parent: 'client.views',
            templateUrl: '/Views/Contact/contact.html',
            backdrop: false,
            resolve: { isAuthenticated: isAuthenticated }
        });


        modalStateProvider.state('ged', {
            windowClass: 'app-modal-xl',
            url: '/ged/:societe/:numcomptable',
            parent: 'client.views',
            templateUrl: '/Views/Ged/fileManager.html',
            backdrop: true,
            resolve: { isAuthenticated: isAuthenticated }
        });

        modalStateProvider.state('clientRappel', {
            size: 'lg',
            url: '/clientRappel/:societe/:numcomptable',
            parent: 'client.views',
            templateUrl: '/Views/Client/clientRappel.html',
            backdrop: false,
            resolve: { isAuthenticated: isAuthenticated }
        })

        modalStateProvider.state('clientEtape', {
            size: 'lg',
            url: '/clientEtape/:societe/:numcomptable',
            parent: 'client.views',
            templateUrl: '/Views/Client/clientEtape.html',
            backdrop: false,
            resolve: { isAuthenticated: isAuthenticated }
        })

        modalStateProvider.state('contactSelect', {
            url: '/contactselect/:societe/:numcomptable',
            parent: 'client.views',
            templateUrl: '/Views/Contact/contactSelect.html',
            backdrop: false,
            resolve: { isAuthenticated: isAuthenticated }
        })
        modalStateProvider.state('validate', {
            url: '/validate/:societe/:numcomptable',
            parent: 'client.views',
            templateUrl: '/Views/Validate/Validate.html',
            backdrop: false,
            resolve: { isAuthenticated: isAuthenticated }
        })

        modalStateProvider.state('etape', {
            url: '/etape/:societe/:numcomptable',
            parent: 'client.views',
            templateUrl: '/Views/Etape/etape.html',
            backdrop: false,
            resolve: { isAuthenticated: isAuthenticated }
        })

        modalStateProvider.state('promesse', {
            size: 'lg',
            url: '/promesse/:societe/:numcomptable',
            parent: 'client.views',
            templateUrl: '/Views/Promesse/promesse.html',
            views: {
                'promesseDataGridCreateView@': {
                    templateUrl: '/Views/Promesse/promesse.DataGridCreateView.html'
                }
            },
            backdrop: false,
            resolve: { isAuthenticated: isAuthenticated }
        })

        modalStateProvider.state('courrier', {
            size: 'lg',
            url: '/courrier/:societe/:numcomptable',
            parent: 'client.views',
            templateUrl: '/Views/Courrier/courrier.html',
            views: {
                'courrierDataGridView@': {
                    templateUrl: '/Views/Courrier/courrier.DataGridView.html'
                }
            },
            backdrop: false,
            resolve: { isAuthenticated: isAuthenticated }
        })
        modalStateProvider.state('courrierV2', {
            size: 'lg',
            url: '/courrierV2/:societe/:numcomptable',
            parent: 'client.views',
            templateUrl: '/Views/Courrier/courrierV2.html',
            views: {
                'courrierDataGridView@': {
                    templateUrl: '/Views/Courrier/courrier.DataGridView.html'
                }
            },
            backdrop: false,
            resolve: { isAuthenticated: isAuthenticated }
        })

        modalStateProvider.state('promesseUpdate', {
            size: 'lg',
            url: '/promesseUpdate/:societe/:numcomptable/:idecheancier',
            parent: 'client.views',
            templateUrl: '/Views/Promesse/promesseUpdate.html',
            views: {
                'promesseDataGridCreateView@': {
                    templateUrl: '/Views/Promesse/promesse.DataGridCreateView.html'
                }
            },
            backdrop: false,
            resolve: { isAuthenticated: isAuthenticated }
        })

        modalStateProvider.state('widgetSettings', {
            size: 'md',
            url: '/WidgetSettings',
            parent: 'accueil.views',
            templateUrl: '/Views/_template/Widgets/widget.settings.html',
            backdrop: true,
            params: { widget: null },
            resolve: {
                isAuthenticated: isAuthenticated,
                widget: function ($stateParams)
                {
                    return $stateParams.widget;
                }
            }
        })


        modalStateProvider.state('balanceAgeeDetaillee', {
            url: '/balanceAgee/:societe/:numcomptable',
            parent: 'client.views',
            templateUrl: '/Views/BalanceAgee/balanceAgeeDetaillee.html',
            backdrop: false,
            resolve: { isAuthenticated: isAuthenticated }
        });
    })
    
})();