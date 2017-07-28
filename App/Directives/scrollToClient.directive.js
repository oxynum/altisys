'use strict';

var app = angular.module('appMain');

app.directive("scrollToClient", ['$window', '$document', function ($window, $document) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            angular.element($window).bind("scroll", function() {
                
                //[ELEMENTS]
                var billingContainer = $document[0].querySelector(".billing-block > div");
                var billingBoxes = $document[0].querySelectorAll(".billing-block .boxes-wrap .box-custom");

                //[SCROLL FUNCTION]

                // Wrapping
                if ($window.pageYOffset > $document[0].getElementById('main').offsetTop - 135) {
                    if (!scope.boolChangeClass) {
                        scope.boolChangeClass = true;
                    }
                    if( scope.boolChangeClass){
                        billingContainer.style.height = '170px';
                        for(var i = 0; i<billingBoxes.length; i++){
                            billingBoxes[i].style.height = '160px';
                        }                    
                    }
                    if (!scope.boolClientFilter && !scope.btnClicked) scope.boolClientFilter = true;
                } 
                // Unwrapping
                else {
                    if (scope.boolChangeClass) {
                        billingContainer.style.height = '465px';
                        for(var i = 0; i<billingBoxes.length; i++){
                            billingBoxes[i].style.height = '235px';
                        }
                        scope.boolChangeClass = false;
                    }
                    if (scope.boolClientFilter) scope.boolClientFilter = false;
                    if (scope.btnClicked) scope.btnClicked = false;
                }

                scope.$apply();
            });
        }

    }
}]);