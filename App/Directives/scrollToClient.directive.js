'use strict';

var app = angular.module('appMain');

app.directive("scrollToClient", ['$window', '$document', function ($window, $document) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            console.log("Je suis la");
            angular.element($window).bind("scroll", function() {
                if ($window.pageYOffset >= $document[0].getElementById('main').offsetTop-208) {
                    scope.boolChangeClass = true;
                    console.log('Yo');
                } else {
                    scope.boolChangeClass = false;
                    console.log('Plus yo');
                }
                scope.$apply();
            });
        }

    }
}]);