"use strict";

moduleTipousuario.controller('tipousuarioNewController', ['$scope', '$http', '$location', 'toolService', '$routeParams', '$window','sessionService',
    function ($scope, $http, $location, toolService, $routeParams, $window, oSessionService) {

        $scope.ob = "tipousuario";
        $scope.id = null;
        
        if (oSessionService.getUserName() !== "") {
            $scope.nombre = oSessionService.getUserName();
            $scope.validlog = true;
        }
        $scope.isActive = toolService.isActive;

        $scope.update = function () {
            $scope.visualizar = false;
            var json = {
                id: null,
                desc: $scope.desc
            }
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