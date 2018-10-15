angular.module('${menuCode}')
.controller("${widgetCode}Ctrl",function($scope,AppKit,$ionicActionSheet,$timeout,$stateParams,$state){
	
	$scope.orders();
	
	$scope.openModal = function(id,type) {
		if(type=="orderDetails"){
			$state.go('tab.task-order-information', {"id": id});
		}
	};
});	
	