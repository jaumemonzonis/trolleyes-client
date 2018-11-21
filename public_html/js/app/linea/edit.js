"use strict";

moduleLinea.controller("lineaEditController", [
    "$scope",
    "$http",
    "$routeParams",
    "toolService",
    "$window",
    'sessionService',
    function ($scope, $http, $routeParams, toolService, $window,oSessionService) {

        $scope.ob = "linea";
        if (oSessionService.getUserName() !== "") {
            $scope.nombre = oSessionService.getUserName();
            $scope.validlog = true;
        }


        if (!$routeParams.id) {
            $scope.id = 1;
        } else {
            $scope.id = $routeParams.id;
        }

        $http({
            method: "GET",
            url: 'http://localhost:8081/trolleyes/json?ob=' + $scope.ob + '&op=get&id=' + $scope.id
        }).then(function (response) {
            console.log(response);
            $scope.status = response.status;
            $scope.id = response.data.message.id;
            $scope.cantidad = response.data.message.cantidad;

            $scope.obj_producto_id = response.data.message.obj_Producto.id;
            $scope.obj_producto_desc = response.data.message.obj_Producto.desc;
            $scope.obj_factura_id = response.data.message.obj_Factura.id;
            $scope.obj_factura_desc = response.data.message.obj_Factura.desc;

        }), function (response) {
            console.log(response);
        };

        $scope.isActive = toolService.isActive;

        $scope.update = function () {
            $scope.visualizar = false;
            $scope.error = false;
            var json = {
                id: $scope.id,
                cantidad: $scope.cantidad,
                id_factura: $scope.obj_factura_id,
                id_producto: $scope.obj_producto_id
            }
            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: 'http://localhost:8081/trolleyes/json?ob=' + $scope.ob + '&op=update',
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
        }
        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=check'
        }).then(function (response) {
            $scope.estado = response.data.status;
            $scope.nombre = response.data.message["login"];

        }, function (response) {
            $scope.ajaxData = response.data.message || 'Request failed';
            $scope.estado = response.status;
        });
    }
]);
