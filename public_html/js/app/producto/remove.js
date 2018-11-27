'use strict'

moduleProducto.controller("productoRemoveController", ['$scope', '$http', '$routeParams', '$window', 'sessionService',
    function ($scope, $http, $routeParams, $window, oSessionService) {

        $scope.ob = "producto";
            $scope.tabla = true;
        $scope.msgopcioneliminar = true;
        
     if (oSessionService.getUserName() !== "") {
            $scope.loggeduser = oSessionService.getUserName();
            $scope.loggeduserid = oSessionService.getId();
            $scope.logged = true;
        }

        if (!$routeParams.id) {
            $scope.id = 1;
        } else {
            $scope.id = $routeParams.id;
        }

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=' + $scope.ob + '&op=get&id=' + $scope.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataUsuarios = response.data.message;
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
        });


       $scope.eliminar = function (accion) {
            if (accion === "eliminar") {
                $http({
                    method: 'GET',
                    url: 'http://localhost:8081/trolleyes/json?ob=' + $scope.ob + '&op=remove&id=' + $scope.id
                }).then(function (response) {
                    $scope.eliminarok = true;
                    $scope.msgopcioneliminar = false;
                    $scope.eliminarerror = false;
                    $scope.tabla = false;
                    $scope.status = response.status;
                    $scope.ajaxDatoTipousuario = response.data.message;
                }, function (response) {
                    $scope.ajaxDatoTipousuario = response.data.message || 'Request failed';
                    $scope.status = response.status;
                });
            } else {
                $scope.eliminarerror = true;
                $scope.msgopcioneliminar = false;
                $scope.eliminarok = false;
                $scope.tabla = true;
            }

        };


        $scope.volver = function () {
            $window.history.back();
        }
        
    }

]);
