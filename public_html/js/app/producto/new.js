"use strict";

moduleProducto.controller("productoNewController", [
    "$scope",
    "$http",
    "$routeParams",
    "toolService",
    'sessionService',
    function ($scope, $http, $routeParams, toolService, sessionService) {

        $scope.edited = true;
        $scope.logged = false;

        if (!$routeParams.id) {
            $scope.id = 1;
        } else {
            $scope.id = $routeParams.id;
        }
        $scope.obj_tipoProducto = {
            id: null,
            desc: null
        }
        $scope.mostrar = false;
        $scope.activar = true;
        $scope.ajaxData = "";



//        $http({
//            method: "GET",
//            url: 'http://localhost:8081/trolleyes/json?ob=producto&op=get&id=' + $scope.id
//        }).then(function (response) {
//            console.log(response);
////            $scope.status = response.status;
//            $scope.id = response.data.message.id;
//            $scope.codigo = response.data.message.codigo;
//            $scope.desc = response.data.message.desc;
//            $scope.existencias = response.data.message.existencias;
//            $scope.precio = response.data.message.precio;
//            $scope.foto = response.data.message.foto;
//            $scope.obj_tipoProducto = {
//                id: response.data.message.obj_tipoProducto.id,
//                desc: response.data.message.obj_tipoProducto.desc
//            }
//
//        }), function (response) {
//            console.log(response);
//        };

        $scope.isActive = toolService.isActive;

        $scope.update = function () {

            var json = {
                id: null,
                codigo: $scope.codigo,
                desc: $scope.desc,
                existencias: $scope.existencias,
                precio: $scope.precio,
                foto: $scope.foto,
                id_tipoProducto: $scope.obj_tipoProducto.id
            }

            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: 'http://localhost:8081/trolleyes/json?ob=producto&op=create',
                params: {json: JSON.stringify(json)}
            }).then(function () {
                $scope.edited = false;
            })
        }

        $scope.tipoProductoRefresh = function (f, consultar) {
            var form = f;
            if (consultar) {
                $http({
                    method: 'GET',
                    url: 'http://localhost:8081/trolleyes/json?ob=tipoproducto&op=get&id=' + $scope.obj_tipoProducto.id
                }).then(function (response) {
                    $scope.obj_tipoProducto = response.data.message;
                    form.userForm.obj_tipoProducto.$setValidity('valid', true);
                }, function (response) {
                    //$scope.status = response.status;
                    form.userForm.obj_tipoProducto.$setValidity('valid', false);
                });
            } else {
                form.userForm.obj_tipoProducto.$setValidity('valid', true);
            }
        }

        $scope.back = function () {
            window.history.back();
        };
        $scope.close = function () {
            $location.path('/home');
        };
        $scope.plist = function () {
            $location.path('/' + $scope.ob + '/plist');
        };


        if (sessionService.getUserName() !== "") {
            $scope.loggeduser = sessionService.getUserName();
            $scope.loggeduserid = sessionService.getId();
            $scope.logged = true;
            $scope.tipousuarioID = sessionService.getTypeUserID();
        }


    }
]);
