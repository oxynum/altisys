'use strict';

var app = angular.module('appMain');

app.directive("scrollToClient", ['$window', '$document', function ($window, $document) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            angular.element($window).bind("scroll", function() {
                if ($window.pageYOffset > $document[0].getElementById('main').offsetTop - 143) {

                    if (!scope.boolChangeClass) {
                        scope.boolChangeClass = true;
                    }
                    if (!scope.boolClientFilter && !scope.btnClicked) {
                        scope.boolClientFilter = true;
                    }  

                } 
                else {

                    if (scope.boolChangeClass) {
                        scope.boolChangeClass = false;
                    }
                    if (scope.boolClientFilter) {
                        scope.boolClientFilter = false;
                    }
                    if (scope.btnClicked) {
                        scope.btnClicked = false;
                    }    

                }
                scope.$apply();
            });
        }

    }
}]);