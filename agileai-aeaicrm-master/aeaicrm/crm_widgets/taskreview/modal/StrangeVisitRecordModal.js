angular.module('${menuCode}')
.controller("${widgetCode}Ctrl",function($scope,AppKit){
	$scope.closeModal = function() {
		AppKit.closeModal();
	};
	
	$scope.loadPotentialVisitingRecordData = function(){
		var url = '/aeaicrm/services/ProCustomer/rest/get-visit-info/'+$scope.visitId+'/'+$scope.visitCategory;
		AppKit.getJsonApi(url).success(function(rspJson){
			$scope.visitingInfo = rspJson;
		});	
	}
	$scope.loadPotentialVisitingRecordData();
});