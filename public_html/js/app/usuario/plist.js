'use strict'

moduleUsuario.controller('usuarioPlistController', ['$scope', '$http', '$location', 'toolService', '$routeParams',
    function ($scope, $http, $location, toolService, $routeParams) {
        $scope.totalPages = 1;
        if (!$routeParams.rpp) {
            $scope.rpp = 10;
        } else {
            $scope.rpp = $routeParams.rpp;
        }

        if (!$routeParams.page) {
            $scope.page = 1;
        } else {
            if ($routeParams.page >= 1) {
                $scope.page = $routeParams.page;
            } else {
                $scope.page = 1;
            }
        }
        
        if (!$routeParams.campo) {
            $scope.campo = 'id';
        } else {
            $scope.campo = $routeParams.campo;
        }
        
        if(!$routeParams.orden){
            $scope.orden = 'asc';
        }else{
            $scope.orden = $routeParams.orden;
        }

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=getcount'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataUsuariosNumber = response.data.message;
            $scope.totalPages = Math.ceil($scope.ajaxDataUsuariosNumber / $scope.rpp);
            $scope.list = [];
            for (var i = 1; i <= $scope.totalPages; i++) {
                $scope.list.push(i);
            }
        }, function (response) {
            $scope.ajaxDataUsuariosNumber = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=getpage&rpp=' + $scope.rpp + '&page=' + $scope.page + '&orden=' + $scope.orden + '&campo=' + $scope.campo
        }).then(function (response) {
            $location.url(`usuario/plist/` + $scope.rpp + `/` + $scope.page + `/` + $scope.campo + `/` + $scope.orden);
            $scope.status = response.status;
            $scope.ajaxDataUsuarios = response.data.message;
        }, function (response) {
            $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
            $scope.status = response.status;
        });
        
        
        $scope.isActive = toolService.isActive;


        $scope.vnpp = function(){
            $http({
                method: 'GET',
                url: `http://localhost:8081/trolleyes/json?ob=usuario&op=getpage&rpp=${$scope.selectedItem}&page=1`
            }).then(function (response) {
                $location.url(`usuario/plist/${$scope.selectedItem}/1`);
                $scope.status = response.status;
                $scope.ajaxDataUsuarios = response.data.message;
            }, function (response) {
                $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        }
        
            $scope.order = function(campo,orden){
            $http({
                method: 'GET',
                url: `http://localhost:8081/trolleyes/json?ob=usuario&op=getpage&rpp=${$scope.rpp}&page=${$scope.page}&campo=${campo}&order=${orden}`
            }).then(function (response) {
                $location.url(`usuario/plist/${$scope.rpp}/${$scope.page}/${campo}/${orden}`);
                $scope.status = response.status;
                $scope.ajaxDataUsuarios = response.data.message;
            }, function (response) {
                $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        }
        
  }

]);
