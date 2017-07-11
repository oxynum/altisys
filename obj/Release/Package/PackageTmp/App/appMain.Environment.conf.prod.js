'use strict';
var app = angular.module('appMain.Environment.conf', []);

app.constant("config", {
    "url": "http://polluxvm01:8080/api/version",
    "urlV1": "http://polluxvm01:8081/",
    "baseUrl": "http://polluxvm01/index.main.html"
});
    