"use strict";

moduleLinea.controller("lineaNewController", [
    "$scope",
    "$http",
    "$routeParams",
    "toolService",
    "$window",
    'sessionService',
    function ($scope, $http, $routeParams, toolService, $window,sessionService) {

        $scope.ob = "linea";
        $scope.id = null;
        
        if (sessionService.getUserName() !== "") {
            $scope.loggeduser = sessionService.getUserName();
            $scope.loggeduserid = sessionService.getId();
            $scope.logged = true;
            $scope.tipousuarioID = sessionService.getTypeUserID();
        }


        $scope.isActive = toolService.isActive;

        $scope.update = function () {
            $scope.visualizar = false;
            $scope.error = false;
            var json = {
                cantidad: $scope.cantidad,
                id_factura: $scope.obj_factura_id,
                id_producto:  $scope.obj_producto_id
            };

            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: 'http://localhost:8081/trolleyes/json?ob=' + $scope.ob + '&op=create',
                params: {json: JSON.stringify(json)}
            }).then(function (response) {
                console.log(response);
                $scope.visualizar = true;
            }), function (response) {
                console.log(response);
                $scope.error = true;
            }
        }

        $scope.volver = function () {
            $window.history.back();
        };
        
    }
]);
