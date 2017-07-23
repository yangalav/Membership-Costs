angular.module('AppService', [])
.factory('MembershipApp', function($http) {
  let data = {
    member: '',
    members: [],
    prices: { memberPrice: 179, familyPrice: 50, total: 179 },
    isLess: true,
    isApply: true,
    isRemove: false,
    isOpen: false,
    promocodeText: '',
    hasFamily: false,
    customStyle: {}
  };


  let getData = function() {
    return data;
  };

  //Helper function to calculate total cost
  let getTotal = function(length, famPrice, membPrice){
    return (length * famPrice) + membPrice;
  }

  let setDefault = function() {
    data.prices.memberPrice = 179;
    data.prices.familyPrice = 50;
    data.prices.total = getTotal(data.members.length, data.prices.familyPrice, data.prices.memberPrice);
  };

  let turnRed = function(){
    data.customStyle.colorClass = "red";
  };

  let turnTeal = function(){
    data.customStyle.colorClass = "teal";
  };

  //Sets promo code submit button to 'Apply'
  let setApply = function(){
    data.isApply = true;
    data.isRemove = false;
  };

  //Changes promo code button to 'Remove' once promo code is applied
  let setRemove = function(){
    data.isApply = false;
    data.isRemove = true;
  };

  let addPromocode = function(promocode) {
    if(data.isRemove){
      turnTeal();
      data.promocodeText = '';
      setDefault();
      setApply();
    } else {
      $http.get('data/promo.json')
        .success(function(promoData) {
          for(let promoObj of promoData){
            if(promocode === promoObj.code){
              data.prices.memberPrice = promoObj.memberPrice;
              data.prices.familyPrice = promoObj.familyPrice;
              data.prices.total = getTotal(data.members.length, data.prices.familyPrice, data.prices.memberPrice);
              turnTeal();
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

  return {
    addMember,
    getData,
    setDefault,
    getTotal,
    addPromocode,
    turnRed,
    turnTeal,
    setApply,
    setRemove
  };

});
