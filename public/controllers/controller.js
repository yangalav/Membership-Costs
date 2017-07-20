myApp.controller('AppCtrl', ['$scope', '$http',
  function($scope, $http) {
    $scope.members = [];
    $scope.member = '';
    $scope.isLess = true;
    $scope.promocode = "Promo Code";
    $scope.customStyle = {};

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
      }
    };

    $scope.addPromocode = function(){
      if($scope.isRemove){
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
                setRemove();
                turnBlack();
              } else {
                turnRed();
              }
            }
          })
          .error(function(data){
            console.log("ERROR");
          });
      }
    };

    let turnRed = function(){
      $scope.customStyle.colorClass = "red";
    }

    let turnBlack = function(){
      $scope.customStyle.colorClass = "black";
    }

    $scope.alert = function(){
      alert("CLICKED!");
    }

}]);
