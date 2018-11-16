"use strict";


moduleUsuario.controller('usuarioNewController', ['$scope', '$http', '$location', 'toolService', '$routeParams', '$window',
function ($scope, $http, $location, toolService, $routeParams, $window) {
      
  $scope.ob="usuario";
  $scope.id= null;
  $scope.pass = 'pass';
  $scope.id_tipoUsuario = 2;
  
$scope.isActive = toolService.isActive;

    $scope.update = function () {
       $scope.visualizar=false;
        $scope.error=false;
      var json = {
        id: null,
        dni: $scope.dni,
        nombre: $scope.nombre,
        ape1: $scope.ape1,
        ape2: $scope.ape2,
        login: $scope.login,
        pass: 'pass',
        id_tipoUsuario: 2
      };
      
      $http({
        method: 'GET',
        header: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        url: 'http://localhost:8081/trolleyes/json?ob='+$scope.ob+'&op=create',
        params: {json: JSON.stringify(json)}
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
            };
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
