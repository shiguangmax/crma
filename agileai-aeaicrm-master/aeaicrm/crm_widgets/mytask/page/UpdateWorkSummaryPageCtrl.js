angular.module('${menuCode}')
.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
	    return $sce.trustAsHtml(text);
	};
}])
.controller("${widgetCode}Ctrl",function($scope,AppKit,$stateParams,$state){
	$scope.taskReviewDescJson = {"taskReviewDesc":""}
	$scope.loadWorkSummaryInfoData = function(){
		$scope.taskReviewId = $stateParams.taskReviewId;
		$scope.taskReviewDescJson.taskReviewDesc = $stateParams.taskReviewDesc;
	}
	$scope.loadWorkSummaryInfoData();
	
	$scope.saveSummaryInfo = function(){
		$scope.taskReviewDesc = $scope.taskReviewDescJson.taskReviewDesc
		var url = '/aeaicrm/services/MyTasks/rest/save-summary-info/'+$stateParams.taskReviewId+'/'+$scope.taskReviewDescJson.taskReviewDesc;
		AppKit.getJsonApi(url).success(function(rspJson){
			if ("success" == rspJson){
				AppKit.successPopup({"title":"保存成功!"});
			}else{
				AppKit.errorPopup({"title":"保存失败!"});
			}
		});	
	}
});