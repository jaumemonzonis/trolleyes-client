'use strict';



moduleService.service('sessionService', ['$location', function ($location) {
        var isSessionActive = false;
        var userName = "";
        var idUserLogged = "";
        var typeUserID = "";

        return {
            getUserName: function () {
                return userName;
            },
            setId: function (id) {
                idUserLogged = id;
            },
            getId: function () {
                return idUserLogged;
            },
            setUserName: function (name) {
                userName = name;
            },
            isSessionActive: function () {
                return isSessionActive;
            },
            setSessionActive: function () {
                isSessionActive = true;
            },
            setTypeUserID: function (id) {
                typeUserID = id;
            },
            getTypeUserID: function () {
                return typeUserID;
            },
            setSessionInactive: function () {
                isSessionActive = false;
                userName = "";
                idUserLogged = "";
            
            }
        }

    }]);