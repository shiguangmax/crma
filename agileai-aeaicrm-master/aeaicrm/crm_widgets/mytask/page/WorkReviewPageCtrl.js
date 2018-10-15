angular.module('${menuCode}')
.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
	    return $sce.trustAsHtml(text);
	};
}])
.controller("${widgetCode}Ctrl",function($scope,AppKit,$stateParams,$state){
	$scope.taskReviewId = "";
	$scope.tcPeriod = "";
	//加载周期定义列表
	$scope.loadWorkReviewData = function(){
		AppKit.isLogin().success(function(data, status, headers, config){
			if (data.result=='true'){
				$scope.userLogin = "isLogin";
				AppKit.secuityOperation("aeaicrm",{"backURL":"/map/repository/genassets/${navCode}/index.cv#/tab/home",
					"success":function(){
						var url = '/aeaicrm/services/MyTasks/rest/work-check-list/';
						AppKit.getJsonApi(url).success(function(rspJson){
							$scope.cycleList = rspJson.datas;
							$scope.cycleList.splice(0,1);
						});	
					}
				})
			}
		})
	}
	$scope.loadWorkReviewData();
	
	//获取被选中的周期定义id值
	$scope.changeTaskReviewId = function(taskReviewId,tcPeriod){
		$scope.taskReviewId=taskReviewId;
		$scope.tcPeriod=tcPeriod;
		$scope.selectCycle();
	}
	
	//跳转我的任务陌生拜访列表
	$scope.selectCycle = function(){
		$state.go("tab.my-task",{"taskReviewId":$scope.taskReviewId,"tcPeriod":$scope.tcPeriod}); 
	}
});