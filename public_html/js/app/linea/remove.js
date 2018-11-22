'use strict'

moduleLinea.controller("lineaRemoveController", ['$scope', '$http', '$routeParams', '$window','sessionService',
    function ($scope, $http, $routeParams, $window,oSessionService) {

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