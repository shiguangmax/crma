angular.module('${menuCode}')
.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
	    return $sce.trustAsHtml(text);
	};
}])
.controller("${widgetCode}Ctrl",function($scope,AppKit,$stateParams,$state){
	//加载周期定义列表
	$scope.loadWorkReviewData = function(){
		var url = '/aeaicrm/services/TaskReview/rest/list/';
		AppKit.getJsonApi(url).success(function(rspJson){
			$scope.cycleList = rspJson;
		});	
	}
	$scope.loadWorkReviewData();
	//获取被选中的周期定义id值
	$scope.changeTaskReviewId = function(tcId,tcBegin,tcEnd){
		$state.go("tab.sale-list",{"tcId":tcId,"tcBegin":tcBegin,"tcEnd":tcEnd}); 
	}
});