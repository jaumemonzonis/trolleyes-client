'use strict'

moduleUsuario.controller('usuarioLoginController', ['$scope', '$http', 'toolService', '$location',
    function ($scope, $http, toolService, $location) {

      

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

        $scope.log = function () {
            $scope.error = false;
            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=login&user=' + $scope.login + '&pass=' + $scope.pass,

            }).then(function (response) {
                console.log(response);
                $scope.status = response.data.status;
                if ($scope.status == 200) {
                    $location.path('/home');
                } else {
                   $scope.error = true;
                }
            }), function (response) {
                console.log(response);
                $scope.ajaxDataUsuario = response.data.message || 'Request failed';
                $scope.status = response.status;
            }
        }

            $scope.isActive = toolService.isActive;
}]
    );