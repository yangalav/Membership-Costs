myApp.controller('AppCtrl', ['$scope', '$http', 'MembershipApp',
  function($scope, $http, MembershipApp) {
    $scope.data = MembershipApp.getData();
    console.log($scope.data);
    $scope.members = [];
    $scope.member = '';
    $scope.isLess = true;
    $scope.isOpen = false;
    $scope.customStyle.colorClass = $scope.data.fontColor;
    $scope.isApply = $scope.data.isApply;
    $scope.isRemove = $scope.data.isRemove;
    $scope.hasFamily = false;
    $scope.promocode = $scope.data.promocodeText;
    $scope.customStyle = {};

    $scope.getCheese = function(){
      MembershipApp.cheese();
    }

    $scope.turnRed = function(){
      $scope.customStyle.colorClass = "red";
    }

    $scope.turnBlack = function(){
      $scope.customStyle.colorClass = "black";
    }

    $scope.changeOverlay = function(){
      $scope.customStyle.overlayClass = "overlay";
    }

    $scope.changeBackColor = function(){
      $scope.turnBlack();
    }

    let setDefault = function(){
      MembershipApp.setPrices($scope.data.prices);
    }

    let setApply = function(){
      $scope.isApply = true;
      $scope.isRemove = false;
    }

    let setRemove = function(){
      $scope.isApply = false;
      $scope.isRemove = true;
    }

    setDefault();
    setApply();

    $scope.addMember = function(){
      if($scope.member) {
        MembershipApp.addMember($scope.member);
        $scope.member = '';
        $scope.hasFamily = true;

        if($scope.data.members.length === 3){
          $scope.isLess = false;
        }
        $scope.closeModal();
      }
    };

    $scope.addPromocode = function(){
      if($scope.isRemove){
        $scope.turnBlack();
        $scope.promocode = '';
        setDefault();
        setApply();
      } else {
        MembershipApp.addPromocode($scope.promocode);
        $http.get('data/promo.json')
          .success(function(data) {
            for(let promocode of data){
              if($scope.promocode === promocode.code){
                $scope.memberPrice = promocode.memberPrice;
                $scope.familyPrice = promocode.familyPrice;
                $scope.total = ($scope.members.length * $scope.familyPrice) + $scope.memberPrice;
                $scope.turnBlack();
                setRemove();
                return;
              } else if($scope.promocode !== promocode.code){
                $scope.turnRed();
              }
            }
          })
          .error(function(data){
            console.log("ERROR");
          });
      }
    };

    $scope.openModal = function(){
      $scope.isOpen = true;
    }

    $scope.closeModal = function(){
      $scope.isOpen = false;
    }

}]);
