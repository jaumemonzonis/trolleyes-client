'use strict'

moduleUsuario.controller("usuarioEditController", ['$scope', '$http', 'toolService', '$routeParams',
    function ($scope, $http, toolService, $routeParams) {


        if (!$routeParams.id) {
            $scope.id = 1;
        } else {
            $scope.id = $routeParams.id;
        }

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=get&id=' + $scope.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.id = response.data.message.id;
            $scope.nombre = response.data.message.nombre;
            $scope.dni = response.data.message.dni;
            $scope.ape1 = response.data.message.ape1;
            $scope.ape2 = response.data.message.ape2;
            $scope.login = response.data.message.login;
            $scope.pass = response.data.message.pass;
            $scope.obj_tipoUsuario_desc= response.data.message.obj_tipoUsuario.desc;
             $scope.obj_tipoUsuario_id= response.data.message.obj_tipoUsuario.id;
            
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
        });


        $scope.submitForm = function () {

            // check to make sure the form is completely valid
            if ($scope.userForm.$valid) {
                alert('our form is amazing');
            }

        };


        $scope.isActive = toolService.isActive;
    }

]);