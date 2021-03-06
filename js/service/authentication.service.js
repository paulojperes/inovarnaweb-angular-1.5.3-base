﻿
    angular
        .module('appClientAPI.services')
        .factory('AuthenticationService', Service);

    function Service($http, $localStorage, $q) {
        var service = {};

        service.Login = signin;
        service.Logout = logout;

        return service;

        function signin(username, password, callback) {
            $http.post('http://localhost/www/apiTeste/autentica/', { username: username, password: password })
                .success(function (response) {                    
                    
                    // login successful if there's a token in the response
                    if (response.token) {
                        // store username and token in local storage to keep user logged in between page refreshes
                        setToken( { username: username, token: response.token } );

                        // add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;

                        // execute callback with true to indicate successful login
                        callback(true);

                    } else {
                        // execute callback with false to indicate failed login
                        callback(false);
                    }
                });
        }  

        function getToken(){
            return $localStorage.currentUser;            
        }  

        function setToken($token){
            $localStorage.currentUser = $token;
        }   

        function logout() {
            // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
            $q.when();
        }
    }
