angular.module('${menuCode}')
.controller("${widgetCode}Ctrl",function($scope,AppKit,$ionicActionSheet,$timeout){
	//搜索
	$scope.searchSaleName = function(){
		$scope.saleName={"saleName":$scope.searchWord};
		var url = '/aeaicrm/services/ProCustomer/rest/find-sale-list';
		AppKit.postJsonApi(url,JSON.stringify($scope.saleName)).then(function(response){
			AppKit.hideMask();
			$scope.saleList = response.data;
		});
	}
});