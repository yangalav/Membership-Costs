myApp.controller('AppCtrl', ['$scope', '$http',
  function($scope, $http) {
    $scope.haha = "cheeseburger";
    $scope.members = [];
    $scope.member = '';
    $scope.memberPrice = 179;
    $scope.total = $scope.memberPrice;
    $scope.familyPrice = 50;
    $scope.isLess = true;
    $scope.promocode = "Promo Code";
    $scope.isApply = true;
    $scope.isRemove = false;

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
      $http.get('data/promo.json')
        .success(function(data) {
          for(let promocode of data){
            if($scope.promocode === promocode.code){
              $scope.memberPrice = promocode.memberPrice;
              $scope.familyPrice = promocode.familyPrice;
              $scope.total = ($scope.members.length * $scope.familyPrice) + $scope.memberPrice;
              $scope.isApply = false;
              $scope.isRemove = true;
            }
          }
        })
        .error(function(data){
          console.log("ERROR");
        });
    };



}]);
