describe('example', function(){

  it('exists', function(){
    expect('Good luckwefef').toBeTruthy();
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


   describe('.addMember()', function() {

     it('should exist', function() {
       expect(MembershipApp.addMember).toBeDefined();
     });
   });

});
