angular.module('${menuCode}')
.controller("${widgetCode}Ctrl",function($scope,AppKit,$ionicActionSheet,$timeout){
	//搜索
	$scope.searchSaleName = function(){
		$scope.saleName='{"saleName":"'+$scope.AssignSearchWord+'"}';
		var url = '/aeaicrm/services/ProCustomer/rest/find-sale-list/'+$scope.saleName;
		AppKit.getJsonApi(url).success(function(rspJson){
			$scope.saleList = rspJson;
		});	
	}
});