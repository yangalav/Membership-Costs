angular.module('AppService', [])
.factory('MembershipApp', function($http) {
  let data = {
    member: '',
    members: [],
    prices: { memberPrice: 179, familyPrice: 50, total: 179 },
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
    console.log(data.members.length);
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
        .success(function(promoData) {
          for(let promoObj of promoData){
            if(promocode === promoObj.code){
              console.log(data.prices);
              data.prices.memberPrice = promoObj.memberPrice;
              data.prices.familyPrice = promoObj.familyPrice;
              data.prices.total = (data.members.length * data.prices.familyPrice) + data.prices.memberPrice;
              turnBlack();
              setRemove();
              return;
            } else if(promocode !== promoObj.code){
              turnRed();
            }
          }
        })
        .error(function(promoData){
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
