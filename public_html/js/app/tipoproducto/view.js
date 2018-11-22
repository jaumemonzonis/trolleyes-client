'use strict'

moduleTipoproducto.controller("tipoproductoViewController", ['$scope', '$http', '$routeParams', '$window','sessionService',
    function ($scope, $http, $routeParams, $window,oSessionService) {

        $scope.ob = "tipoproducto";

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



        $scope.volver = function () {
            $window.history.back();
        };
       
    }

]);