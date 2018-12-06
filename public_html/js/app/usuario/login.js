"use strict";

moduleUsuario.controller("usuarioLoginController", [
    "$scope",
    "$http",
    "$routeParams",
    "toolService",
    "sessionService",
    "$window",
    function ($scope, $http, $routeParams, toolService, oSessionService, $location, $window) {


        $scope.volver = function () {
            $window.history.back();
        }
        
        $scope.logged = false;
        $scope.failedlogin = false;

        $scope.logging = function () {

            var login = $scope.login;
            //var pass = forge_sha256($scope.pass);
            var pass = $scope.pass;


 $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=login&user=' + login + '&pass=' + pass
            }).then(function (response, data) {
                if (response.data.message.id == 0) {
                    $scope.failedlogin = true;
                } else {
                    $scope.logged = true;
                    $scope.failedlogin = false;
                    oSessionService.setSessionActive();
                    oSessionService.setUserName(response.data.message.nombre + " " + response.data.message.ape1);
                    $scope.loggeduser = oSessionService.getUserName();
                    $scope.loggeduserid = oSessionService.setId(response.data.message.id);

                }

            }, function (response) {

            });
        }







        $scope.isActive = toolService.isActive;


    }
]);
