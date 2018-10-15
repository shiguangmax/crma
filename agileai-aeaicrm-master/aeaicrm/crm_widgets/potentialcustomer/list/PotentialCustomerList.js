angular.module('${menuCode}')
.controller("${widgetCode}Ctrl",function($scope,AppKit,$state){
	//下拉选
	$scope.changeSelect = function(){
		$scope.selectPotentialCustomerListData($scope.state,$scope.classificat,$scope.label);
	}
	//跳转详情页
	$scope.jumpInfoPage = function(id) {
		$state.go("tab.potentialcustomer-Info",{"orgId": id}); 
	}
	
});