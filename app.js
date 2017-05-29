(function () {
  'use strict' ;
    angular.module('NameCalculator',[])
  .controller('NameCalculatorController',function ($scope) {
$scope.name="";
$scope.totalValue=0;

$scope.AsciiFunction = function(string){
  var total=0;
  for(var i = 0;i< string.length ;i++)
  total += string.charCodeAt(i);
  $scope.totalValue=total;
}
});

})();
