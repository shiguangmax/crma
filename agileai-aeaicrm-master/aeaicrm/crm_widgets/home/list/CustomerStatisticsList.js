angular.module('${menuCode}')
.controller("${widgetCode}Ctrl",function($scope,AppKit,$ionicActionSheet,$timeout,$state){
	var url = '/map/services/DataProvider/rest/static-data/SimpleListJson';
	AppKit.getJsonApi(url).success(function(rspJson){
		$scope.listInfo = rspJson.listinfo;
	});	
	
	//跳转我的客户详情页
	$scope.jumpMyCustomersInfoPage = function(custId) {
		$state.go("tab.home-my-customer-infomation",{"id": custId});  
	}
	
});