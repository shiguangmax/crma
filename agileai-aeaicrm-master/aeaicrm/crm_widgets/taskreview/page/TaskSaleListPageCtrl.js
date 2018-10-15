angular.module('${menuCode}')
.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
	    return $sce.trustAsHtml(text);
	};
}])
.controller("${widgetCode}Ctrl",function($scope,AppKit,$stateParams,$state){
	$scope.saleName={"saleName":""};
	$scope.loadSaleListData = function(){
		var url ='/aeaicrm/services/ProCustomer/rest/find-sale-list';
		AppKit.postJsonApi(url,JSON.stringify($scope.saleName)).then(function(response){
			AppKit.hideMask();
			$scope.saleList = response.data;
		});
	}
	$scope.loadSaleListData();
	
	//获取userId，条转任务审查列表
	$scope.changeUserId = function(userId,userName){
		$state.go("tab.taskreview-list",{"tcId":$stateParams.tcId,"tcBegin":$stateParams.tcBegin,"tcEnd":$stateParams.tcEnd,"userId":userId,"userName":userName}); 
	}
});