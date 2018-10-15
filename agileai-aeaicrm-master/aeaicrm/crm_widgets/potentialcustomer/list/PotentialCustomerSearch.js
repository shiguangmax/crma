angular.module('${menuCode}')
.controller("${widgetCode}Ctrl",function($scope,AppKit,$ionicActionSheet,$timeout,$state){
	$scope.search = function(){
		$scope.orgName=$scope.searchWord
		if("" == $scope.orgName){
			$scope.orgName = "''";
		}
		var url = '/aeaicrm/services/ProCustomer/rest/search-list/'+$scope.orgName;
		var promise = AppKit.getJsonApi(url);
		promise.success(function(rspJson){
			$scope.listInfo = rspJson.datas;
		});
	}
	
	//跳转详情页
	$scope.jumpInfoPage = function(id) {
		$state.go("tab.potentialcustomer-Info",{"infoId": id}); 
	}
});