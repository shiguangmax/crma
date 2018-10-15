angular.module('${menuCode}')
.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
	    return $sce.trustAsHtml(text);
	};
}])
.controller("${widgetCode}Ctrl",function($scope,AppKit,$ionicActionSheet,$stateParams){
	
	$scope.entryInfo = function(){
		var url = '/aeaicrm/services/Customers/rest/get-cust-order-entry/'+$stateParams.entryId;
		AppKit.getJsonApi(url).success(function(rspJson){
			$scope.orderEntryInfo = rspJson;
		});	
	};
	
});