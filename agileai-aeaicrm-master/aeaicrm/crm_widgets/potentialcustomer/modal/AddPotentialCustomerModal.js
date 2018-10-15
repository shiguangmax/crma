angular.module('${menuCode}')
.controller("${widgetCode}Ctrl",function($scope,AppKit,$filter){
	$scope.closeModal = function() {
		AppKit.closeModal();
	};
	
	$scope.loadAddPotentialCustomerInfoData = function(){
		var today = new Date();
		$scope.addCustomer.orgUpdateTime = $filter('date')(today, 'yyyy-MM-dd HH:mm:ss');
		$scope.addCustomer.orgCreateTime = $filter('date')(today, 'yyyy-MM-dd HH:mm:ss');  
	}
	$scope.loadAddPotentialCustomerInfoData();
});