myApp.controller('AppCtrl', ['$scope', '$http', 'MembershipApp',
  function($scope, $http, MembershipApp) {
    //Grab default data from services
    $scope.data = MembershipApp.getData();

    //Set initial promo code placeholder color
    MembershipApp.turnTeal();

    //Resets prices back to default values
    let setDefault = function(){
      MembershipApp.setDefault();
    }

    //Turns promo code text back to original color from red
    $scope.changeBackColor = function(){
      MembershipApp.turnTeal();
    }

    //Adds family member to membership
    $scope.addMember = function(){
        MembershipApp.addMember($scope.data.member);
    };

    //Applies valid promo code to current membership costs
    $scope.addPromocode = function(){
      MembershipApp.addPromocode($scope.data.promocodeText);
    };

    //Opens modal
    $scope.openModal = function(){
      $scope.data.isOpen = true;
    }

    //Closes modal
    $scope.closeModal = function(){
      $scope.data.isOpen = false;
    }

}]);
