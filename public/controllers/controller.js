myApp.controller('AppCtrl', ['$scope', '$http', 'MembershipApp',
  function($scope, $http, MembershipApp) {
    $scope.data = MembershipApp.getData();
    console.log($scope.data);
    $scope.customStyle = {};
    $scope.customStyle.colorClass = $scope.data.fontColor;

    $scope.getCheese = function(){
      MembershipApp.cheese();
    }

    $scope.changeOverlay = function(){
      $scope.customStyle.overlayClass = "overlay";
    }

    $scope.changeBackColor = function(){
      MembershipApp.turnBlack();
    }

    let setDefault = function(){
      MembershipApp.setDefault();
    }

    setDefault();

    $scope.addMember = function(){
        MembershipApp.addMember($scope.data.member);
    };

    $scope.addPromocode = function(){
      MembershipApp.addPromocode($scope.data.promocodeText);
    };

    $scope.openModal = function(){
      $scope.data.isOpen = true;
    }

    $scope.closeModal = function(){
      $scope.isOpen = false;
    }

}]);
