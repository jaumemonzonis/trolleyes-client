'use strict'

moduleUsuario.controller('usuarioRemoveController', ['$scope', '$http', '$location', 'toolService', '$routeParams','sessionService', "$window",
    function ($scope, $http, $location, toolService, $routeParams,oSessionService, $window) {

        $scope.ob = "usuario";

        if (!$routeParams.id) {
            $scope.id = 1;
        } else {
            $scope.id = $routeParams.id;
        }
           if (oSessionService.getUserName() !== "") {
            $scope.nombre = oSessionService.getUserName();
            $scope.validlog = true;
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

        $scope.visualizar = false;
        $scope.error = false;

        $scope.remove = function () {
            $http({
                method: "GET",
                url: 'http://localhost:8081/trolleyes/json?ob=' + $scope.ob + '&op=remove&id=' + $scope.id

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
  

    }

]);