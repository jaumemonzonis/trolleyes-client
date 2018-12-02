'use strict'

moduleCarrito.controller('carritoCarritoController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',"$window",
    function ($scope, $http, $location, toolService, $routeParams, oSessionService, $window) {

       

        $scope.alert = false;

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=carrito&op=show'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxData = response.data.message;
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxData = response.data.message || 'Request failed';
        });


        function show() {
            
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=carrito&op=show'
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxData = response.data.message;
            
                
            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxData = response.data.message || 'Request failed';
            });
        }



        $scope.add = function (id) {

            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=carrito&op=add&prod=' + id
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxDataAdd = response.data.message;
                show();
             
            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxDataAdd = response.data.message || 'Request failed';
            });
        };

        $scope.reduce = function (id) {

            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=carrito&op=reduce&prod=' + id
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxDataReduce = response.data.message;
                show();
            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxDataReduce = response.data.message || 'Request failed';
            });
        };
    
     
        $scope.empty = function () {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=carrito&op=empty'
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxDataEmpty = response.data.message;
               
                 show();
                 $scope.alert = true;
            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxDataEmpty = response.data.message || 'Request failed';
            });
            
        };


        if (oSessionService.getUserName() !== "") {
            $scope.loggeduser = oSessionService.getUserName();
            $scope.loggeduserid = oSessionService.getId();
            $scope.logged = true;
        }

        $scope.isActive = toolService.isActive;

    $scope.volver = function () {
            $window.history.back();
        }

    }



]);
