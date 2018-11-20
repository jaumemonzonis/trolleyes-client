'use strict'

moduleUsuario.controller('usuarioLogoutController', ['$scope', '$http', 'toolService', 'sessionService','$location',
    function ($scope, $http, toolService, oSessionService, $location) {

        if (oSessionService.getUserName() !== "") {
            $scope.nombre = oSessionService.getUserName();
            $scope.validlog = true;
        }



        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=logout'
        }).then(function () {
            $scope.validlog = false;
            $scope.failog = true;
            oSessionService.setSessionInactive();
        });
        

        $scope.isActive = toolService.isActive;


        $scope.volver = function () {

            $location.path('/home');

        }

        

    }]);