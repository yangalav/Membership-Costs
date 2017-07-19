myApp.controller('AppCtrl', ['$scope',
  function($scope) {
    $scope.haha = "cheeseburger";
    $scope.members = [];
    $scope.member = '';
    $scope.total = 179;

    $scope.addMember = function(){
      console.log('submitting');
      if($scope.member) {
        $scope.members.push(this.member);
        $scope.member = '';
        $scope.total += 50;
      }
    };

}]);
