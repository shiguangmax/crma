angular.module('${menuCode}')
.controller("${widgetCode}Ctrl",function($scope,AppKit,$ionicActionSheet,$timeout,$stateParams,$state){
	
	$scope.orders();
	
	$scope.openModal = function(id,type) {
		if(type=="orderDetails"){
			$state.go('tab.order-information', {"id": id});
		}
		else if(type=="editOrder"){
			$state.go('tab.update-order-information', {"id": id});
		}
	};
	
	$scope.deleteOrder = function(id){
		  AppKit.confirm({operaType:'delete',action:function(){
				var url = "/aeaicrm/services/Customers/rest/delete-order-info/"+id;
				AppKit.getJsonApi(url).success(function(rspJson){
					$scope.orders();
				});
			}});
	}
	});	
	