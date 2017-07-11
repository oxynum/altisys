'use strict';
var app = angular.module('appMain.Environment.conf', []);

// app.constant("config", {
//     "url": "http://polluxvm01:8080/api/version",
//     "urlV1": "http://polluxvm01:8081/",
//     "baseUrl": "http://polluxvm01/index.main.html"
// });
app.constant("config", {
    "url": "http://159.180.240.236:8182/api/version",
    "urlV1": "http://159.180.240.236:8183/",
    "baseUrl": "http://159.180.240.236:8181/index.main.html"
});
/* External access */
/* app.constant("config", {
    "url": "http://159.180.240.236:8182/api/version",
    "urlV1": "http://192.168.0.6:8081/",
    "baseUrl": "http://192.168.0.6/index.main.html"
});*/