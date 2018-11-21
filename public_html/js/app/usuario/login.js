'use strict'

moduleUsuario.controller('usuarioLoginController', ['$scope', '$http', 'toolService', '$location', "sessionService",
    function ($scope, $http, toolService, $location, oSessionService) {


        $scope.validlog = false;
        $scope.faillog = false;
//        $scope.pass=forge_sha256($scope.pass);

        $scope.log = function () {
           
            $http({
              
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=login&user=' + $scope.login + '&pass=' + $scope.pass,

            }).then(function (response) {
                console.log(response);
                $scope.status = response.data.status;
                if (response.data.status == 401) {
                     $scope.faillog = true;
                } else {
                    $location.path('/home');
                    $scope.validlog = true;
                    oSessionService.setUserName(response.data.message.login);
                    $scope.nombre = oSessionService.getUserName();

                }
            }), function (response) {
                console.log(response);
                $scope.validlog = false;

            }
        }

        $scope.isActive = toolService.isActive;
    }]
        );
