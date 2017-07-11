(function () {

    var app = angular.module('appRouteAccueil', ['ui.router','ui.bootstrap']);     

      app.config(function ($stateProvider, $urlRouterProvider, $compileProvider, $httpProvider, $locationProvider) {
          $compileProvider.debugInfoEnabled(false);

          $stateProvider
              .state('agenda', {
                  abstract: true,
                  url: "/agenda",
                  templateUrl: '/Views/Agenda/agenda.html',
                  resolve: { isAuthenticated: isAuthenticated }
              }) // nested paper state + views
          .state('agenda.views', {
              url: '',
              views: {
                  'agendaAsideRaiseBox@agenda': {
                      templateUrl: '/Views/agenda/agenda.AsideRaiseBox.html'
                  },
                  'agendaAsideRaiseForm@agenda': {
                      templateUrl: '/Views/agenda/agenda.AsideRaiseForm.html'
                  },
                  'agendaDataGridView@agenda': {
                      templateUrl: '/Views/agenda/agenda.DataGridView.html'
                  },
                  'agendaTopBarView@agenda': {
                      templateUrl: '/Views/agenda/agenda.TopBarView.html'
                  }
              }
          })

       .state('accueil', {
           abstract: true,
           url: "/accueil/:page",
           templateUrl: '/Views/Accueil/accueil.html',
           controller: 'accueilController',
           resolve: { isAuthenticated: isAuthenticated }
       })// nested views
          .state('accueil.views', {
              url: '',
              views: {
                  'accueilTopBarView@accueil': {
                      templateUrl: '/Views/Accueil/accueil.TopBarView.html'
                  }
              }
          })
          .state('pageV1', {
              url: "/pageV1/:urlreferer",
              templateUrl: '/Views/PageV1/pageV1.html'
          })

          .state('pagev1maxheight', {
              url: "/pageV1MaxHeight/:urlreferer/:societe/:numcomptable",
              templateUrl: '/Views/PageV1/pageV1MaxHeight.html'
          })

          .state('Widget', {
              url: "/Widget/:username/:urlreferer",
              templateUrl: '/Views/PageV1/pageV1.html'
          })


          .state('reportViewer', {
              url: '/reportViewer',
              templateUrl: '/Views/Report/viewer.html',
              resolve: { isAuthenticated: isAuthenticated }
          })
          .state('reportDesigner', {
              url: '/reportDesigner',
              templateUrl: '/Views/Report/designer.html',
              resolve: { isAuthenticated: isAuthenticated }
          })

          .state('reportViewerV2', {
              abstract: true,
              url: '/reportViewerV2',
              templateUrl: '/Views/Report/viewerV2.html',
              resolve: { isAuthenticated: isAuthenticated }
          })// nested state + views
          .state('reportViewerV2.views', {
              url: '',
              views: {
                  'reportView@reportViewerV2': {
                      templateUrl: '/Views/Report/viewerV2.ReportView.html'
                  },
                  'topBarView@reportViewerV2': {
                      templateUrl: '/Views/Report/viewerV2.TopBarView.html'
                  }
              }
          })


          .state('reportDesignerV2', {
              abstract: true,
              url: '/reportDesignerV2',
              templateUrl: '/Views/Report/designerV2.html',
              resolve: { isAuthenticated: isAuthenticated }
          })// nested state + views
          .state('reportDesignerV2.views', {
              url: '',
              views: {
                  'reportView@reportDesignerV2': {
                      templateUrl: '/Views/Report/designerV2.ReportView.html'
                  },
                  'topBarView@reportDesignerV2': {
                      templateUrl: '/Views/Report/designerV2.TopBarView.html'
                  }
              }
          })

          .state('templateDesignerV2', {
              abstract: true,
              url: '/templateDesignerV2',
              templateUrl: '/Views/Report/designerV2Template.html',
              resolve: { isAuthenticated: isAuthenticated }
          })// nested state + views
          .state('templateDesignerV2.views', {
              url: '',
              views: {
                  'reportView@templateDesignerV2': {
                      templateUrl: '/Views/Report/designerV2Template.ReportView.html'
                  },
                  'topBarView@templateDesignerV2': {
                      templateUrl: '/Views/Report/designerV2Template.TopBarView.html'
                  }
              }
          })

          .state('admin', {
              abstract: true,
              url: '/admin',
              templateUrl: '/Views/Admin/admin.html',
              resolve: { isAuthenticated: isAuthenticated }
          })// nested state + views
          .state('admin.views', {
              url: '',
              views: {
                  'adminView@admin': {
                      templateUrl: '/Views/Admin/admin.AdminView.html'
                  },
                  'topBarView@admin': {
                      templateUrl: '/Views/Admin/admin.TopBarView.html'
                  }
              }
          })
          .state('report', {
              abstract: true,
              url: '/report',
              templateUrl: '/Views/Admin/Report/report.html',
              resolve: { isAuthenticated: isAuthenticated }
          })// nested state + views
          .state('report.views', {
              url: '',
              views: {
                  'managementView@report': {
                      templateUrl: '/Views/Admin/Report/report.ManagementView.html'
                  },
                  'topBarView@report': {
                      templateUrl: '/Views/Admin/Report/report.TopBarView.html'
                  }
              }
          })

        .state('reportNew', {
            abstract: true,
            url: '/reportNew',
            templateUrl: '/Views/Admin/Report/ReportNew/reportNew.html',
            resolve: { isAuthenticated: isAuthenticated }
        })// nested state + views
          .state('reportNew.views', {
              url: '',
              views: {
                  'formView@reportNew': {
                      templateUrl: '/Views/Admin/Report/ReportNew/reportNew.Form.html'
                  },
                  'topBarView@reportNew': {
                      templateUrl: '/Views/Admin/Report/ReportNew/reportNew.TopBarView.html'
                  }
              }
          })

        .state('reportEdit', {
            abstract: true,
            url: '/reportEdit',
            templateUrl: '/Views/Admin/Report/ReportEdit/reportEdit.html',
            resolve: { isAuthenticated: isAuthenticated }
        })// nested state + views
          .state('reportEdit.views', {
              url: '',
              views: {
                  'formView@reportEdit': {
                      templateUrl: '/Views/Admin/Report/ReportEdit/reportEdit.Form.html'
                  },
                  'topBarView@reportEdit': {
                      templateUrl: '/Views/Admin/Report/ReportEdit/reportEdit.TopBarView.html'
                  }
              }
          })

        .state('templateNew', {
            abstract: true,
            url: '/templateNew',
            templateUrl: '/Views/Admin/Report/TemplateNew/templateNew.html',
            resolve: { isAuthenticated: isAuthenticated }
        })// nested state + views
          .state('templateNew.views', {
              url: '',
              views: {
                  'formView@templateNew': {
                      templateUrl: '/Views/Admin/Report/TemplateNew/templateNew.Form.html'
                  },
                  'topBarView@templateNew': {
                      templateUrl: '/Views/Admin/Report/TemplateNew/templateNew.TopBarView.html'
                  }
              }
          })


        .state('templateEdit', {
            abstract: true,
            url: '/templateEdit',
            templateUrl: '/Views/Admin/Report/TemplateEdit/templateEdit.html',
            resolve: { isAuthenticated: isAuthenticated }
        })// nested state + views
          .state('templateEdit.views', {
              url: '',
              views: {
                  'formView@templateEdit': {
                      templateUrl: '/Views/Admin/Report/TemplateEdit/templateEdit.Form.html'
                  },
                  'topBarView@templateEdit': {
                      templateUrl: '/Views/Admin/Report/TemplateEdit/templateEdit.TopBarView.html'
                  }
              }
          })
          ;

      })
    
})();