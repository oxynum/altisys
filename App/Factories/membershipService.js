﻿(function (app) {
    'use strict';

    app.factory('membershipService', membershipService);

    membershipService.$inject = ['apiService', 'notificationService', '$http', '$base64', 'cookieService', '$rootScope', 'config'];

    function membershipService(apiService, notificationService, $http, $base64, cookieService, $rootScope, config) {

        var service = {
            login: login,
            register: register,
            saveCredentials: saveCredentials,
            removeCredentials: removeCredentials,
            isUserLoggedIn: isUserLoggedIn
        }

        function login(user, completed) {
            apiService.post(config.url + '/Auth/authenticate', user,
            completed,
            loginFailed);
        }

        function register(user, completed) {
            apiService.post(config.url + '/Auth/register', user,
            completed,
            registrationFailed);
        }

        function saveCredentials(user) {
            var membershipData = $base64.encode(user.username + ':' + user.password);

            $rootScope.repository = {
                loggedUser: {
                    username: user.username,
                    authdata: membershipData
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + membershipData;
            cookieService.set('repository', $rootScope.repository);
        }

        function removeCredentials() {
            $rootScope.repository = {};
            cookieService.remove('repository');
            cookieService.remove('userInfo');
            $http.defaults.headers.common.Authorization = '';
        };

        function loginFailed(response) {
            notificationService.displayError(response.data);
        }

        function registrationFailed(response) {

            notificationService.displayError('Registration failed. Try again.');
        }

        function isUserLoggedIn() {
            return $rootScope.repository.loggedUser != null;
        }

        return service;
    }



})(angular.module('appMain'));