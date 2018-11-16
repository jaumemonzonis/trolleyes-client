'use strict'

moduleFactura.controller('facturaPlistController', ['$scope', '$http', '$location', 'toolService',
        function ($scope, $http, $location, toolService) {
            $scope.ruta = $location.path();
            $scope.var1 = "Hola mundo";
            $scope.var2 = "Hola qué tal";
            $scope.mostrar = false;
            $scope.activar = true;
            $scope.ajaxData = "";
            $scope.toggle = function () {
                $scope.mostrar = !$scope.mostrar;
            }
            $scope.enable = function () {
                $scope.activar = !$scope.activar;
            }
            $scope.usuarios = function () {
                $http({
                    method: 'GET',
                    //withCredentials: true,
                    url: 'http://localhost:8081/trolleyes/json?ob=factura&op=getpage&rpp=10&page=1'
                }).then(function (response) {
                    $scope.status = response.status;
                    $scope.ajaxDataUsuarios = response.data.message;
                }, function (response) {
                    $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
                    $scope.status = response.status;
                });
            }
            $http({
                method: 'GET',
                //withCredentials: true,
                url: 'http://localhost:8081/trolleyes/json?ob=factura&op=get&id=1'
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxData = response.data.message;
            }, function (response) {
                $scope.ajaxData = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
            $scope.isActive = toolService.isActive;
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