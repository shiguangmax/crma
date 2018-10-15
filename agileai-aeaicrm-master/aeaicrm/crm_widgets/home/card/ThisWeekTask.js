angular.module('${menuCode}')
.controller("${widgetCode}Ctrl",function($scope,AppKit,$state,$ionicActionSheet,$timeout){
	$scope.initTaskCardInfos = function() {
		var url = '/aeaicrm/services/MyTasks/rest/home-card-list/';
		var promise = AppKit.getJsonApi(url);
		promise.success(function(rspJson){
			$scope.thisTaskList = rspJson.homeCardData;
			$scope.taskReviewId = rspJson.taskReviewId;
			$scope.tcPeriod = rspJson.tcPeriod;
			if($scope.thisTaskList.length == 0){
				$scope.thisTaskListRecords = true;
			}else{
				$scope.thisTaskListRecords = false;
			}
		});
	}
	$scope.initTaskCardInfos();
	
	//跳转意向跟进详情页
	$scope.jumpIntentionFollowup = function(taskId) {
		$state.go("tab.intent-followup",{"taskId": taskId,"taskReviewId":$scope.taskReviewId}); 
	}
	
	//跳转更多任务
	$scope.moreTask = function() {
		$scope.activeTab = 'IntentionFollowUp';
		$state.go("tab.my-task",{"taskReviewId":$scope.taskReviewId,"tcPeriod":$scope.tcPeriod,"activeTab":$scope.activeTab}); 
	}
	
});