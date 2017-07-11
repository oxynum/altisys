(function (app) {
	'use strict';

	app.directive('loadDirective', ['$compile',function ($compile) {
	    return {
	        restrict: 'A',
	        scope: {
	            loadDirective: "=",
                controller:"@"
	        },
	        link: function ($scope, $element, $attr) {
	            var value = $attr.loadDirective;
	            var c = $attr.controller;
	            var tpl = $attr.template;
	            if (value) {
	                $element.html("<" + value + " template=\"" + tpl + "\" controller-name=\"" + c + "\"></" + value + ">");
	                $compile($element.contents())($scope);
	            }
	        },
	        replace: true
	    };
	}]);

})(angular.module('appMain'));
