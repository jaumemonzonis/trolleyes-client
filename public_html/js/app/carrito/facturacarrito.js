'use strict'
//http://localhost:8081/json?ob=usuario&op=login&user=ddd&pass=pass
moduleFactura.controller('facturaCarritoController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, sessionService) {

         if (!$routeParams.id) {
            $scope.id = 1;
        } else {
            $scope.id = $routeParams.id;
        }
 
        
//       if (sessionService.getUserName() !== "") {
//            $scope.loggeduser = sessionService.getUserName();
//            $scope.loggeduserid = sessionService.getId();
//            $scope.logged = true;
//            $scope.tipousuarioID = sessionService.getTypeUserID();
//        }
     
        $scope.isActive = toolService.isActive;

            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=linea&op=getpagexusuario&rpp=10&page=1&idfactura='+$scope.id
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxDataUsuarios = response.data.message;
                var cant=0;
                var precio=0;
                var iva=0;
                var acum=0;
                $scope.total = null;
                
                if  (response.data.message.length!==null){
                 for (var i = 0; i < response.data.message.length; i++) {
                        cant = response.data.message[i].cantidad;
                        precio = response.data.message[i].obj_Producto.precio;
                        iva = response.data.message[i].obj_Factura.iva;
                    acum=acum+((((iva/100)*precio)+precio)*cant);
                    $scope.total = acum;
            }
        } 
                
            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
            });


  $scope.volver = function () {
             $location.url(`carrito/plist/`);
        }
       

    }
]);
