var app = angular.module('appMain');

app.directive('pictoScenarioDirective', ['$compile', '$templateRequest', function ($compile, $templateRequest) {

    var linker = function (scope, element, attrs) {
        $templateRequest(attrs.url).then(function (template) {
            element.html(template);
            $compile(element.contents())(scope);
        });

    };

    return {
        restrict: "E",
        replace: true,
        link: linker,
        scope: {
            
        }
    };
}]);