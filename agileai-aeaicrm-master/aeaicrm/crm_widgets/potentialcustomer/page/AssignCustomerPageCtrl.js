angular.module('${menuCode}')
.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
	    return $sce.trustAsHtml(text);
	};
}])
.controller("${widgetCode}Ctrl",function($scope,AppKit,$stateParams,$state,$ionicHistory){
	$scope.saleName='{"saleName":""}';
	$scope.loadSaleListData = function(){
		var url ='/aeaicrm/services/ProCustomer/rest/find-sale-list/';
		AppKit.postJsonApi(url,JSON.stringify($scope.saleName)).then(function(response){
			if (null != response.data){
				AppKit.hideMask();
				$scope.saleList = response;
				$scope.userId=$scope.saleList.userId;
			}
		});
	}
	$scope.loadSaleListData();
	
	$scope.userId = "";
	$scope.changeUserId = function(userId){
		$scope.userId=userId;
	}
	
	$scope.searchWord = '{"orgState":"","orgClassification":"","orgLabels":""}';
	$scope.assignPotentialCustomer = function(){
		var url = '/aeaicrm/services/ProCustomer/rest/assign-cust-info/'+$stateParams.orgId+'/'+$scope.userId;
		AppKit.getJsonApi(url).success(function(rspJson){
			if ("success" == rspJson){
				AppKit.successPopup({"title":"分配成功!"});
				$ionicHistory.goBack(-2);
				/*$state.go("tab.potential-customer-list",{"searchWord": $scope.searchWord});*/
			}else{
				AppKit.errorPopup({"title":"分配失败!"});
			}
		});	
	}
});