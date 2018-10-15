angular.module('${menuCode}')
.controller("${widgetCode}Ctrl",function($scope,AppKit){
	$scope.closeModal = function() {
		AppKit.closeModal();
	};
	
	$scope.loadMyTasksPotentialVisitingRecordData = function(){
		var url = '/aeaicrm/services/MyTasks/rest/get-strange-visit-info/'+$scope.visitId;
		AppKit.getJsonApi(url).success(function(rspJson){
			$scope.visitingInfo = rspJson;
		});	
	}
	$scope.loadMyTasksPotentialVisitingRecordData();
});