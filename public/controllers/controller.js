myApp.controller('AppCtrl', ['$scope', '$http', 'MembershipApp',
  function($scope, $http, MembershipApp) {
    $scope.data = MembershipApp.getData();

    let setDefault = function(){
      MembershipApp.setDefault();
    }

    $scope.changeBackColor = function(){
      MembershipApp.turnBlack();
    }

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
      $scope.data.isOpen = false;
    }

}]);
