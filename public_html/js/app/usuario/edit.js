"use strict";

moduleUsuario.controller("usuarioEditController", [
  "$scope",
  "$http",
  "$routeParams",
  "toolService",
  "$window",
  function ($scope, $http, $routeParams, toolService,$window) {
      
       $scope.ob="usuario";


        if (!$routeParams.id) {
            $scope.id = 1;
        } else {
            $scope.id = $routeParams.id;
        }    
             
    $http({
      method: "GET",
       url: 'http://localhost:8081/trolleyes/json?ob='+$scope.ob+'&op=get&id=' + $scope.id
    }).then(function (response) {
      console.log(response);
      $scope.id = response.data.message.id;
      $scope.dni = response.data.message.dni;
      $scope.nombre = response.data.message.nombre;
      $scope.ape1 = response.data.message.ape1;
      $scope.ape2 = response.data.message.ape2;
      $scope.login = response.data.message.login;
      $scope.pass = 'pass';
      $scope.obj_tipoUsuario_desc = response.data.message.obj_tipoUsuario.desc;
      $scope.obj_tipoUsuario_id = response.data.message.obj_tipoUsuario.id;
    }), function (response) {
      console.log(response);
    };

$scope.isActive = toolService.isActive;

    $scope.update = function () {
       $scope.visualizar=false;
       $scope.error=false;
      var json = {
        id: $scope.id,
        dni: $scope.dni,
        nombre: $scope.nombre,
        ape1: $scope.ape1,
        ape2: $scope.ape2,
        login: $scope.login,
        pass: $scope.pass,
        id_tipoUsuario:  $scope.obj_tipoUsuario_id
      }
      $http({
        method: 'GET',
        header: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        url: 'http://localhost:8081/trolleyes/json?ob='+$scope.ob+'&op=update',
        params: { json: JSON.stringify(json) }
      }).then(function (response) {
        console.log(response);
        $scope.visualizar=true;       
      }), function (response) {
        console.log(response);
         $scope.error=true;
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