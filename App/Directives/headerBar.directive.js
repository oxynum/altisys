(function (app) {
    'use strict';

    app.directive('headerBar', headerBar);

    function headerBar() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: './Views/_template/headerBar.html',
            controller: ['$rootScope', '$scope', 'menuContextService', '$location', '$http', 'notificationService', '$filter', 'config', 'cookieService', 'membershipService', function ($rootScope, $scope, menuContextService, $location, $http, notificationService, $filter, config, cookieService, membershipService) {

                $scope.menuFavoriteName = 'favorite-client-url';
                $scope.menuMessageName = 'messages-recu';
                var options = menuContextService.get($scope.menuFavoriteName);


                $scope.favoriteNumber = 0;

                if (options) {
                        $scope.menuFavoriteOptions = options;
                        $scope.favoriteNumber = options.length - 3;
                        if ($scope.favoriteNumber < 0) {
                            $scope.favoriteNumber = 0;
                        }
                }

                $scope.mcAction = function (menuName, action, index) {
                    if (menuName == $scope.menuFavoriteName)
                    {
                        if (action == 'redirect') {
                            $location.path(menuContextService.getItem($scope.menuFavoriteName, index).url);
                        }
                        else if (action == 'remove') {
                            menuContextService.removeItem($scope.menuFavoriteName, index);
                            $scope.mcChanged($scope.menuFavoriteName, index);
                            $rootScope.$broadcast('FavoriteIndexCleared');
                            notificationService.displaySuccess("Fiche client supprimée de vos favoris");
                        }
                    }
                    else if (menuName == $scope.menuHistoName) {
                        if (action == 'redirect') {
                            $location.path(menuContextService.getItem($scope.menuHistoName, index).url);
                        }
                        else if (action == 'remove') {
                            menuContextService.removeItem($scope.menuHistoName, index);
                            $scope.mcChanged($scope.menuHistoName, index);
                            notificationService.displaySuccess("Fiche client supprimée de votre historique");
                        }
                    }
                    else if (menuName == $scope.menuMessageName) {
                        if (action == 'redirect') {
                            $location.path(menuContextService.getItem($scope.menuMessageName, index).url);
                            $scope.RemoveMessage(menuContextService.getItem($scope.menuMessageName, index).id);
                            menuContextService.removeItem($scope.menuMessageName, index);
                        }
                        else if (action == 'remove') {
                            menuContextService.removeItem($scope.menuMessageName, index);
                            $scope.mcChanged($scope.menuMessageName, index);
                            notificationService.displaySuccess("Message supprimé de vos messages");
                        }
                    }
                    
                }

                $scope.mcClear = function (menuName) {
                    if (menuName == $scope.menuFavoriteName)
                    {
                        $scope.menuFavoriteOptions = menuContextService.clearAll($scope.menuFavoriteName);
                        notificationService.displayInfo("Liste des favoris effacée");
                        $rootScope.$broadcast('FavoriteCleared');
                    }
                    else if (menuName == $scope.menuHistoName)
                    {
                        $scope.menuHistoOptions = menuContextService.clearAll($scope.menuHistoName);
                        notificationService.displayInfo("Historique effacé");
                    }
                    else if (menuName == $scope.menuMessageName) {
                        $scope.menuMessageOptions = menuContextService.clearAll($scope.menuMessageName);
                        $scope.GetCompteurMessage();
                        notificationService.displayInfo("Messages effacés");
                    }
                    
                }

                $scope.mcChanged = function (menuName, f) {
                    if (menuName == $scope.menuFavoriteName) {
                        $scope.menuFavoriteOptions = menuContextService.get($scope.menuFavoriteName);
                        $scope.favoriteNumber = $scope.menuFavoriteOptions.length - 3;
                        if ($scope.favoriteNumber < 0) {
                            $scope.favoriteNumber = 0;
                        }
                    }
                    else if (menuName == $scope.menuHistoName)
                        $scope.menuHistoOptions = menuContextService.get($scope.menuHistoName);
                    else if (menuName == $scope.menuMessageName)
                        $scope.GetCompteurMessage();
                }


                $scope.$on('favoriteClientUpdated', function (event) {
                    $scope.mcChanged($scope.menuFavoriteName, event.Favorite);
                });

                $scope.$on('histoClientUpdated', function (f) {
                    $scope.mcChanged($scope.menuHistoName, f);
                });

                $scope.menuHistoName = 'histo-client-url';
                var histoOptions = menuContextService.get($scope.menuHistoName);
                if (histoOptions)
                    $scope.menuHistoOptions = menuContextService.get($scope.menuHistoName);

                var _selected;

                $scope.selected = undefined;

                $scope.getTextCompletion = function (val) {
                    return $http.get(config.url+'/Client/GetAutoCompletion/' + val)
                        .then(function (response) {
                            var results = _(response.data)
                              .groupBy('Type')
                              .map(function (g) {
                                  g[0].firstInGroup = true;  // the first item in each group
                                  return g;
                              })
                              .flatten()
                              .value();
                            return results;
                    });
                };
                
                $scope.GetCompteurMessage = function () {
                    var message = cookieService.get('messages-recu-last-call');
                    if (message) {
                        $http({
                            method: 'GET',
                            url: config.url + '/Client/GetMessageCompteur?fromDate=' + cookieService.get('messages-recu-last-call')
                        })
                         .success(function (data) {

                             for (var i = 0; i < data.menuMessageOptions.length; i++) {
                                 var f = data.menuMessageOptions[i];
                                 menuContextService.addItem('messages-recu', f);
                             }
                             var dateNow = $filter('date')(new Date(), 'yyyy-M-d-H-m-s');
                             cookieService.set('messages-recu-last-call', dateNow);
                             var options = menuContextService.get($scope.menuMessageName);
                             if (options) {
                                 $scope.menuMessageOptions = options;
                                 $scope.messageNumber = options.length - 3;
                                 if ($scope.messageNumber < 0) {
                                     $scope.messageNumber = 0;
                                 }
                             }
                         })
                        .error(function (data, status, header, config) {
                            $scope.messageNumber = 0;
                        });
                    }
                    else
                    {
                        $scope.messageNumber = 0;
                        var dateNow = $filter('date')(new Date(1970,1,1), 'yyyy-M-d-H-m-s');
                        cookieService.set('messages-recu-last-call', dateNow);
                        $scope.GetCompteurMessage();
                    }
                }
                $scope.GetCompteurMessage();
                $scope.RemoveMessage = function (id) {
                    $http({
                        method: 'GET',
                        url: config.url +
                            '/Client/RemoveMessage/' + id
                    });
                }
                $scope.Search = function () {
                    //console.log($scope.selected.Key);
                    var key = $scope.selected.Key.split('|');
                    switch ($scope.selected.Type) {
                        case 'CLIENT': $location.path('/client/' + key[0] + '/' + key[1]); break;
                        case 'CONTACT': $location.path('/client/' + key[0] + '/' + key[1]); break;
                        case 'FACTURE': $location.path('/client/' + key[0] + '/' + key[1]).search({npiece: key[2]}); break;
                        default: $location.path('/client/' + key[0] + '/' + key[1]); break;
                    }
                }


                $scope.Report = function () {
                    $location.path('/pageV1/' + window.encodeURIComponent('~/Authenticated/MailManagement/WebUI/EditionState.aspx'));
                }
                $scope.ReportV2 = function () {
                    location.path('/admin');
                }

                $scope.Admin = function () {                    
                    $location.path('/pageV1/' + window.encodeURIComponent('~/Authenticated/Administration/WebUI/Administration.aspx'));
                }
                $scope.AdminV2 = function () {                    
                    //TODO route V2
                }
                //$scope.CourrierLot = function () {
                //    $location.path('/pageV1/' + window.encodeURIComponent('~/Authenticated/Customers/WebUI/AltiGSendRelance.aspx'));
                //}
                //$scope.CampagneLot = function () {
                //    $location.path('/pageV1/' + window.encodeURIComponent('~/Authenticated/Customers/WebUI/AltiGSendCmp.aspx'));
                //}

                $scope.User = function () {
                    $location.path('/pageV1/' + window.encodeURIComponent('~/Pages/Preferences.aspx'));
                }
                $scope.Disconnect = function () {
                    membershipService.removeCredentials();
                    $location.path('/login');

                    //sdr : remove get params into the URL
                    $location.url($location.path());
                }


                $scope.ngModelOptionsSelected = function (value) {
                    if (arguments.length) {
                        _selected = value;
                    } else {
                        return _selected;
                    }
                };

                $scope.modelOptions = {
                    debounce: {
                        default: 500,
                        blur: 250
                    },
                    getterSetter: true
                };


                //[SEARCHBAR WRAPPING : begin]
                  /**
                   * Function to show searchbar in header if it is hidden, and hide it if it is shown
                   */
                  $scope.toggleSearchbar = function(){
                      var searchBlock = $(".search-block");
                      searchBlock.toggleClass("wrapped");
                      searchBlock.toggleClass("unwrapped");
                  }
  
                  /**
                   * Function to hide searchbar on tablet, based on the window's width
                   */
                  function hideSearchOnTablet() {
                      var searchBlock = $(".search-block");
                      if ($(window).width() <= 992){
                          searchBlock.addClass("wrapped");
                      }
                      else {
                          searchBlock.removeClass("wrapped");
                          searchBlock.removeClass("unwrapped");
                      }
                  }
  
                  // Call function by default to hide it if we are on tablet
                  hideSearchOnTablet()
                  
                  // Call function each time window is resized (on desktop)
                  $(window).on('resize', function(event){
                      hideSearchOnTablet();
                  });
                //[SEARCHBAR WRAPPING : end]
            }]
        }
    }

})(angular.module('appMain'));