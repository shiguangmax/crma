angular.module('${menuCode}')
.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
	    return $sce.trustAsHtml(text);
	};
}])
.controller("${widgetCode}Ctrl",function($scope,AppKit,$stateParams,$filter,$state,$ionicHistory){
	$scope.suspendInfo = {"taskId":"","procustVisitRemark":"","procustVisitFillTime":"","procustVisitCustFocus":"","procustVisitEffect":"","procustVisitType":"","procustVisitFillId":"","procustVisitDate":"","taskReviewId":"","orgId":"","custId":""}
	//加载数据
	$scope.loadSuspendInfoData = function(){
		var today = new Date();
		$scope.suspendInfo.procustVisitDate = today;
		$scope.suspendInfo.procustVisitFillTime = $filter('date')(today, 'yyyy-MM-dd HH:mm:ss');  
		$scope.suspendInfo.procustVisitFillId = $stateParams.orgSalesman;
		$scope.suspendInfo.procustVisitFillName = $stateParams.orgSalesmanName;
		$scope.suspendInfo.taskId = $stateParams.taskId;
	}
	$scope.loadSuspendInfoData();
	
	//编辑保存
	$scope.suspendSave = function(){
		AppKit.isLogin().success(function(data, status, headers, config){
			if (data.result=='true'){
				$scope.userLogin = "isLogin";
				AppKit.secuityOperation("aeaicrm",{"backURL":"/map/repository/genassets/${navCode}/index.cv#/tab/home",
					"success":function(){
						var url = "/aeaicrm/services/MyTasks/rest/suspend-info";
						AppKit.postJsonApi(url,JSON.stringify($scope.suspendInfo)).then(function(response){
							if ("success" == response.data){
								AppKit.successPopup({"title":"保存成功!"});
								$ionicHistory.goBack(-2);
							}else{
								AppKit.errorPopup({"title":"保存失败!"});
								/*$state.go("tab.my-task",{"taskReviewId":$stateParams.taskReviewId,"activeTab":$stateParams.activeTab,"tcPeriod":$stateParams.tcPeriod});*/
							}
						});
					}
				})
			}
		})
	}
	//保存按钮校验
	$scope.isValidSuspendInfo = function(){
		var suspendInfo = $scope.suspendInfo;
		if (suspendInfo.procustVisitDate && suspendInfo.procustVisitDate != '' && suspendInfo.procustVisitType != '' 
				&& suspendInfo.procustVisitEffect != '' ){
			return true;
		}
		else{
			return false;
		}
	}
	
});