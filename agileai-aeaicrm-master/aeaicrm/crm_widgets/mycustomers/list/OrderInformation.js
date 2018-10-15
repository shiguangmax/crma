angular.module('${menuCode}')
.controller("${widgetCode}Ctrl",function($scope,AppKit,$ionicActionSheet,$stateParams,$state){

	$scope.orderinfo();
	
	$scope.openModal = function(entryId,type) {
		if(type=="showDetails"){
			$state.go('tab.order-entry-information', {"entryId": entryId});
		}
	};
});