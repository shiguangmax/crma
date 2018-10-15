angular.module('${menuCode}')
.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
	    return $sce.trustAsHtml(text);
	};
}])
.controller("${widgetCode}Ctrl",function($scope,AppKit,$stateParams,$filter,$state,$ionicHistory){
	$scope.followupInfo = {"visitFillTime":"","visitCustFocus":"","visitReceptionName":"","visitFillName":"","contId":"","taskId":"","visitPeerName":"","orgId":"","visitContent":"","visitDate":"","visitImprovement":"","visitType":"","visitEffect":"","visitCostExplain":"","visitUserId":"","visitCost":"","taskReviewId":"","visitFillId":"","visitState":""}
	//加载数据
	$scope.loadIntentFollowupInfoData = function(){
		var today = new Date();
		$scope.followupInfo.visitFillTime = $filter('date')(today, 'yyyy-MM-dd HH:mm:ss');// new Date().format("yyyy-MM-dd HH:mm:ss");
		$scope.followupInfo.visitDate = $filter('date')(today, 'yyyy-MM-dd HH:mm:ss');  
		$scope.followupInfo.visitUserId = $stateParams.orgSalesman;
		$scope.followupInfo.visitUserName = $stateParams.orgSalesmanName;
		$scope.followupInfo.visitFillId = $stateParams.orgSalesman;
		$scope.followupInfo.visitFillName = $stateParams.orgSalesmanName;
		$scope.followupInfo.taskId = $stateParams.taskId;
		$scope.followupInfo.orgId = $stateParams.orgId;
		$scope.followupInfo.orgName = $stateParams.orgName;
		$scope.followupInfo.custId = "";
		$scope.followupInfo.visitStateName = "初始化"
		$scope.followupInfo.visitState = 'init';
	}
	$scope.loadIntentFollowupInfoData();
	
	//编辑保存
	$scope.followUpSave = function(){             
		var url = "/aeaicrm/services/MyTasks/rest/followup-info";
		AppKit.postJsonApi(url,JSON.stringify($scope.followupInfo)).then(function(response){
			if ("success" == response.data){
				AppKit.successPopup({"title":"保存成功!"});
				$scope.activeTab="StrangeVisit";
				$ionicHistory.goBack(-2);
			}else{
				AppKit.errorPopup({"title":"保存失败!"});
				/*$state.go("tab.my-task",{"taskReviewId":$stateParams.taskReviewId,"activeTab":$stateParams.activeTab,"tcPeriod":$stateParams.tcPeriod});*/
			}
		});
	}
	
	//保存按钮校验
	$scope.isValidSuspendInfo = function(){
		var followupInfo = $scope.followupInfo;
		if (followupInfo.visitType != '' && followupInfo.visitDate != '' && followupInfo.visitEffect != '' && followupInfo.visitReceptionName !='' && followupInfo.visitContent !='' && followupInfo.visitCustFocus !='' ){
			return true;
		}
		else{
			return false;
		}
	}
	
});