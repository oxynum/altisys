(function (app) {
	'use strict';

	app.directive('altisysWidget', function () {
		return {
			restrict: 'E',
			scope: {},
			templateUrl: function (el, attrs) {
			    return (angular.isDefined(attrs.template)) ? attrs.template : './Views/_template/widget.gridAction.html';
			},
			controller: "@",
			name: "controllerName"
		}
	});

})(angular.module('appMain'));
