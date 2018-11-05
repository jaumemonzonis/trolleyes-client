'use strict'

moduleProducto.controller('productoPlistController', ['$scope', '$http', '$location', 'toolService', '$routeParams',
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


        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=producto&op=getcount'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataProductosNumber = response.data.message;
            $scope.totalPages = Math.ceil($scope.ajaxDataProductosNumber / $scope.rpp);
            $scope.list = [];
            for (var i = 1; i <= $scope.totalPages; i++) {
                $scope.list.push(i);
            }
        }, function (response) {
            $scope.ajaxDataProductosNumber = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=producto&op=getpage&rpp=' + $scope.rpp + '&page=' + $scope.page
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataProducto = response.data.message;
        }, function (response) {
            $scope.ajaxDataProducto = response.data.message || 'Request failed';
            $scope.status = response.status;
        });
        $scope.isActive = toolService.isActive;


        $scope.vnpp = function(){
            $http({
                method: 'GET',
                url: `http://localhost:8081/trolleyes/json?ob=producto&op=getpage&rpp=${$scope.selectedItem}&page=1`
            }).then(function (response) {
                $location.url(`producto/plist/${$scope.selectedItem}/1`);
                $scope.status = response.status;
                $scope.ajaxDataProducto = response.data.message;
            }, function (response) {
                $scope.ajaxDataProducto = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        }
        
        $scope.sort = function(keyname){
		$scope.sortKey = keyname; 
		$scope.reverse = !$scope.reverse;
        }
        $scope.isActive = toolService.isActive;
        
  }

]);