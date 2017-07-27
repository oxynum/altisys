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
                        setTimeout(function(){
                            $('.billing-block .fix-on-scroll').css('height', '170px');
                            $('.billing-block .boxes-wrap .box-custom').css('height', '160px');
                        }, 100);
                    }
                    if (!scope.boolClientFilter && !scope.btnClicked) {
                        scope.boolClientFilter = true;
                    }  

                } 
                else {

                    if (scope.boolChangeClass) {
                        $('.billing-block .fix-on-scroll').css('height', '465px');
                        $('.billing-block .boxes-wrap .box-custom').css('height', '235px');
                        setTimeout(function(){
                            scope.boolChangeClass = false;
                        }, 200);
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