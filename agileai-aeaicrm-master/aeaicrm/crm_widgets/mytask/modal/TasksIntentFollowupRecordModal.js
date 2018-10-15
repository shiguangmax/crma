angular.module('${menuCode}')
.controller("${widgetCode}Ctrl",function($scope,AppKit){
	$scope.closeModal = function() {
		AppKit.closeModal();
	};
	
	$scope.loadMyTasksIntentVisitingRecordData = function(){
		var url = '/aeaicrm/services/MyTasks/rest/get-intention-visit-info/'+$scope.visitId;
		AppKit.getJsonApi(url).success(function(rspJson){
			$scope.visitingInfo = rspJson;
		});	
	}
	$scope.loadMyTasksIntentVisitingRecordData();
});