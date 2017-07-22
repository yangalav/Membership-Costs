angular.module('AppService', [])
.factory('MembershipApp', function($http) {
  let data = {
    member: '',
    members: [],
    prices: {},
    fontColor: null,
    isLess: true,
    isApply: true,
    isRemove: false,
    isOpen: false,
    promocodeText: '',
    hasFamily: false
  };

  let cheese = function() {
    console.log("PROVOLONE");
  };

  let getData = function() {
    return data;
  };

  let setDefault = function() {
    data.prices.memberPrice = 179;
    data.prices.familyPrice = 50;
    data.prices.total = (data.members.length * data.prices.familyPrice) + data.prices.memberPrice;
    console.log(data.prices.total);
  };

  let turnRed = function(){
    data.fontColor = "red";
  };

  let turnBlack = function(){
    data.fontColor = "black";
  };

  let setApply = function(){
    data.isApply = true;
    data.isRemove = false;
  };

  let setRemove = function(){
    data.isApply = false;
    data.isRemove = true;
  };

  let addPromocode = function(promocode) {
    if(data.isRemove){
      turnBlack();
      data.promocodeText = '';
      setDefault();
      setApply();
    } else {
      $http.get('data/promo.json')
        .success(function(data) {
          for(let promo of data){
            if(promocode === promo.code){
              data.prices.memberPrice = promo.memberPrice;
              data.prices.familyPrice = promo.familyPrice;
              data.prices.total = (data.members.length * data.prices.familyPrice) + data.prices.memberPrice;
              turnBlack();
              setRemove();
              return;
            } else if(promocode !== promo.code){
              turnRed();
            }
          }
        })
        .error(function(data){
          console.log("ERROR");
        });
    }
  }

  let addMember = function(member) {
    if(data.member) {
      data.members.push(member);
      data.prices.total += data.prices.familyPrice;
      data.member = '';
      data.hasFamily = true;

      if(data.members.length === 3){
        data.isLess = false;
      }
      closeModal();
    }
  }

  let closeModal = function(){
    data.isOpen = false;
  }

  return {
    cheese,
    addMember,
    getData,
    setDefault,
    addPromocode,
    turnRed,
    turnBlack,
    setApply,
    setRemove,
    closeModal
  };

});
