myApp.controller('AppCtrl', ['$scope', '$http',
  function($scope, $http) {
    $scope.haha = "cheeseburger";
    $scope.members = [];
    $scope.member = '';
    $scope.isLess = true;
    $scope.promocode = "Promo Code";

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
              }
            }
          })
          .error(function(data){
            console.log("ERROR");
          });
      }
    };



}]);
