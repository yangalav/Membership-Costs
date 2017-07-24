describe('example', function(){

  it('exists', function(){
    expect('it exists').toBeTruthy();
  });

});

describe('MembershipApp factory', function(){
   var MembershipApp;

   beforeEach(angular.mock.module('AppService'));

   beforeEach(inject(function(_MembershipApp_) {
     MembershipApp = _MembershipApp_;
   }));

   it('should exist', function() {
     expect(MembershipApp).toBeDefined();
   });

});

describe('AppCtrl controller', function(){
  var $controller;

  beforeEach(angular.mock.module('AppCtrl'));

  beforeEach(inject(function(_$controller_, _$httpBackend_) {
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;
  }));

  it('should exist', function() {
    var $scope =  {};
    var controller = $controller('AppCtrl', { $scope: $scope });
    expect(controller).toBeDefined();
  });

  describe('$scope.addMember', function() {
    it('should add a family member to membership', function(){
      var $scope =  {};
      var controller = $controller('AppCtrl', { $scope: $scope });
      $scope.data.members = ['Bob', 'Sarah'];
      $scope.data.member = 'Kelly';
      $scope.addMember();
      expect($scope.data.members).toEqual(['Bob', 'Sarah', 'Kelly']);
    });
  });

});
