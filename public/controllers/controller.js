myApp.controller('AppCtrl', ['$scope', '$http',
  function($scope, $http) {
    $scope.haha = "cheeseburger";
    $scope.members = [];
    $scope.member = '';
    $scope.total = 179;
    $scope.isLess = true;
    $scope.promocode = "Promo Code";

    $scope.addMember = function(){
      console.log('submitting');
      if($scope.member) {
        $scope.members.push(this.member);
        $scope.member = '';
        $scope.total += 50;

        if($scope.members.length === 3){
          $scope.isLess = false;
        }
      }
    };

    $scope.addPromocode = function(){
      $http.get('data/promo.json').success(function(data) {
        for(let promocode of data){
          if($scope.promocode === promocode.code){
            console.log("here ", promocode);
          }
        }
      })
      .error(function(data){
        console.log("ERROR");
      });
    };



}]);
