moduleCommon.controller('homeController', ['$scope', '$location', 'toolService', 'sessionService',
    function ($scope, $location, toolService, oSessionService) {

        $scope.validlog = true;
        $scope.ruta = $location.path();
        $scope.isActive = toolService.isActive;

        if (oSessionService.getUserName() !== "") {
            $scope.nombre = oSessionService.getUserName();
            $scope.validlog = true;
        } else {
          $location.url('/usuario/login');  
            
        }
        
        $scope.logout = function () {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=logout'
            }).then(function () {
                $location.url('/');
            });
        }
    }]);