myApp.controller('AppCtrl', ['$scope', '$http',
  function($scope, $http) {
    $scope.members = [];
    $scope.member = '';
    $scope.isLess = true;
    $scope.isOpen = false;
    $scope.promocode = '';
    $scope.customStyle = {};

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
      $scope.memberPrice = 179;
      $scope.familyPrice = 50;
      $scope.total = ($scope.members.length * $scope.familyPrice) + $scope.memberPrice;
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
      console.log('submitting');
      if($scope.member) {
        $scope.members.push(this.member);
        $scope.member = '';
        $scope.total += $scope.familyPrice;

        if($scope.members.length === 3){
          $scope.isLess = false;
        }
        $scope.closeModal();
      }
    };

    $scope.addPromocode = function(){
      if($scope.isRemove){
        $scope.promocode = '';
        setDefault();
        setApply();
      } else {
        $http.get('data/promo.json')
          .success(function(data) {
            for(let promocode of data){
              if($scope.promocode === promocode.code){
                $scope.memberPrice = promocode.memberPrice;
                $scope.familyPrice = promocode.familyPrice;
                $scope.total = ($scope.members.length * $scope.familyPrice) + $scope.memberPrice;
                $scope.turnBlack();
                setRemove();
              } else {
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
