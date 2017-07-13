'use strict';

var app = angular.module('appMain');

app.directive("scrollToClient", ['$window', '$document', function ($window, $document) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            angular.element($window).bind("scroll", function() {
                if ($window.pageYOffset > 500 && scope.boolChangeClass === false) {
                    scope.boolChangeClass = true;
                } 
                else if ($window.pageYOffset > 0 && scope.boolChangeClass === true){
                    scope.boolChangeClass = true;
                }
                else {
                    scope.boolChangeClass = false;
                }
                scope.$apply();
            });
        }

    }
}]);