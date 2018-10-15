angular.module('${menuCode}')
.controller("${widgetCode}Ctrl",function($scope,AppKit,$ionicActionSheet,$timeout,$stateParams,$state){

	$scope.deleteOrderEntry = function(id){
		  AppKit.confirm({operaType:'delete',action:function(){
				var url = "/aeaicrm/services/Customers/rest/delete-order-entry-info/"+id;
				AppKit.getJsonApi(url).success(function(rspJson){
					$scope.orderinfo();
				});
			}});
	};
	
	$scope.openModal = function(id,type){
		if(type=="showDetails"){
			$state.go('tab.order-entry-information', {"entryId": id});
		}else if(type=="editEntry"){
			$scope.orderId = $stateParams.id;
			$scope.entryId = id;
			AppKit.createModal("${menuCode}","EditOrderEntry",$scope);
		}
	};
});