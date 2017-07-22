angular.module('AppService', [])
.factory('MembershipApp', function($http) {
  let data = {
    members: [],
    prices: {},
    fontColor: null,
    isApply: true,
    isRemove: false
  }

  let cheese = function() {
    console.log("PROVOLONE");
  }

  let getData = function() {
    return data;
  }

  let setPrices = function(prices) {
    data.prices.memberPrice = 179;
    data.prices.familyPrice = 50;
    data.prices.total = (data.members.length * data.prices.familyPrice) + data.prices.memberPrice;
  }

  let turnRed = function(){
    data.fontColor = "red";
  }

  let turnBlack = function(){
    data.fontColor = "black";
  }



  let addPromocode = function(promocode) {
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

  let addMember = function(member) {
    data.members.push(member);
    data.prices.total += data.prices.familyPrice;
  }

  return { cheese, addMember, getData, setPrices, addPromoCode };
});
