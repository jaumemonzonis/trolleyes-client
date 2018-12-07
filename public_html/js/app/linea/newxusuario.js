"use strict";


moduleLinea.controller('lineanewxusuarioController', ['$scope', '$http', '$location', 'toolService', '$routeParams', '$window', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, $window, sessionService) {
        if (sessionService.getUserName() !== "") {
            $scope.loggeduser = sessionService.getUserName();
            $scope.loggeduserid = sessionService.getId();
            $scope.logged = true;
            $scope.tipousuarioID = sessionService.getTypeUserID();
        }
        
        if (!$routeParams.id) {
            $scope.id_factura= 0;  
        } else {
            $scope.id_factura= $routeParams.id;
        }
        
        $scope.ob = "linea";
        $scope.id = null;

        $scope.isActive = toolService.isActive;
        
          $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=factura&op=get&id=' + $scope.id_factura
        }).then(function (response) {
            $scope.status = response.status;
            $scope.idfactura = response.data.message.id;
          
        }, function (response) {
            $scope.status = response.status;
            
        });

        $scope.update = function () {
            $scope.visualizar = false;
            $scope.error = false;
            var json = {
               cantidad: $scope.cantidad,
               id_factura: $scope.id_factura,
               id_producto:  $scope.obj_producto_id
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
