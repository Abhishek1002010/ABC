(function(){
  'use strict';
  angular.module('dir',[ ])
  .controller('NarrowItDownController',narrow)
  .service('MenuCategoriesService',MenuCategoriesService)
.directive('found',found);
narrow.$inject=['MenuCategoriesService','$scope'];
  function narrow(MenuCategoriesService,$scope){
    var menu=this;
//$scope.x=5;
    menu.l=[];
    menu.search= function(txt){

        var promise = MenuCategoriesService.getMenuCategories();

        promise.then(function (response) {
          menu.categories = response.data;
        })
        .catch(function (error) {
          console.log("Something went terribly wrong.");
        });
        for(var x=0;x<menu.categories.menu_items.length;x++){
          if(menu.categories.menu_items[x].name.indexOf(txt)>=0 || menu.categories.menu_items[x].description.indexOf(txt)>=0)
        {
        var q={
          name : menu.categories.menu_items[x].name,
          des : menu.categories.menu_items[x].description,
          sn : menu.categories.menu_items[x].short_name,
        };

         menu.l.push(q);
        }
      }
console.log(menu.l);
    };
    menu.rem=function(index){
      menu.l.splice(index,1);
    };

  }
  function found(){

    var ddo={
      //template:'Short Name: {{m.sn}} <button  ng-click="narrow.rem($index);">Narrow It Down For Me!</button>  <br> Name : {{m.name}} <br> Description : {{m.des}}'
templateUrl:'abc.html',
scope:{
  list:"=mylist",
  item:"=item",
}
  };
return ddo;
  }
  MenuCategoriesService.$inject = ['$http'];
  function MenuCategoriesService($http) {
    var service = this;

    service.getMenuCategories = function () {
      var response = $http({
        method: "GET",
    url : ("https://davids-restaurant.herokuapp.com/menu_items.json")
      });
console.log(response.url);
      return response;
    };
  }


})();
