"use strict";


moduleFactura.controller('facturaNewController', ['$scope', '$http', '$location', 'toolService', '$routeParams', '$window', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, $window, sessionService) {
      if (sessionService.getUserName() !== "") {
            $scope.loggeduser = sessionService.getUserName();
            $scope.loggeduserid = sessionService.getId();
            $scope.logged = true;
            $scope.tipousuarioID = sessionService.getTypeUserID();
        }
        $scope.ob = "factura";
        $scope.id = null;
        //$scope.id_usuario = "320";

        $scope.isActive = toolService.isActive;

        $scope.update = function () {
            $scope.visualizar = false;
            $scope.error = false;
            var json = {
                id: null,
                 fecha: $scope.myDate,
                iva: $scope.iva,
                id_usuario: $scope.obj_usuario_id
            };

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
        };
       

    }
]);
