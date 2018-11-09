'use strict'

moduleUsuario.controller("usuarioRemoveController", ['$scope', '$http', '$routeParams', '$window',
    function ($scope, $http, $routeParams ,$window) {


        if (!$routeParams.id) {
            $scope.id = 1;
        } else {
            $scope.id = $routeParams.id;
        }

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=get&id=' + $scope.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataUsuarios = response.data.message;
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
        });
        
  

        $scope.remove = function () {
            $http({
               method: "GET",
               url: `http://localhost:8081/trolleyes/json?ob=usuario&op=remove&id=${$scope.id}`
               
            }).then(function (response) {
                console.log(response);
               
            })
        }
        
        
          $scope.volver = function () {
            $window.history.back();
            }
        
    }

]);