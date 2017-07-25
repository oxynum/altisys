'use strict';
var app = angular.module('appMain.Environment.conf', []);

app.constant("config", {
    "url": "http://localhost:60146/api/version",
    "urlV1": "http://localhost:60033/",
    "baseUrl": "http://localhost:60112/index.main.html"
});
