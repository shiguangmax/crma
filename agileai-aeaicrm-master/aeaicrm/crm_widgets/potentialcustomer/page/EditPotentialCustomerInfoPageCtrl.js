angular.module('${menuCode}')
.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
	    return $sce.trustAsHtml(text);
	};
}])
.controller("${widgetCode}Ctrl",function($scope,AppKit,$stateParams,$ionicActionSheet,$state,$ionicHistory){
	//加载数据
	$scope.loadPotentialCustomerInfoData = function(){
		var url = '/aeaicrm/services/ProCustomer/rest/get-info/'+$stateParams.orgId;
		AppKit.getJsonApi(url).success(function(rspJson){
			$scope.customerInfo = rspJson;
		});	
	}
	$scope.loadPotentialCustomerInfoData();
	//编辑保存
	
	$scope.customerInfo = {"orgName":"","orgClassification":"","orgType":"","orgSources":"","orgLinkmanName":"","orgEmail":"","orgLabels":"","orgWebsite":"","orgSalesmanName":"","orgState":"","orgCreaterName":"","orgCreateTime":"","orgUpdateTime":"","orgContactWay":"","orgAddress":"","orgIntroduction":""}
	$scope.doSave = function(){
		var url = "/aeaicrm/services/ProCustomer/rest/update-cust-info";
		AppKit.postJsonApi(url,JSON.stringify($scope.customerInfo)).then(function(response){
			if ("success" == response.data){
				AppKit.successPopup({"title":"保存成功!"});
			}else{
				AppKit.errorPopup({"title":"保存失败!"});
			}
		});
	}
	//打开拜访记录模态
	$scope.openVisitListModal = function(id,category) {
		$scope.visitId = id;
		$scope.visitCategory = category;
		AppKit.createModal("${menuCode}","PotentialVisitingRecordModal",$scope);
	}
	//提示非空校验
	$scope.doRequired=function(){
		if(!$scope.customerInfo.orgName){
			return true;
		}
	}
	//提示邮箱校验
	$scope.emailVerifica=function(){
		if(""!=$scope.customerInfo.orgEmail){
			if(!$scope.customerInfo.orgEmail){
				return true;
			}
		}
	}
	//提示手机校验
	$scope.phoneVerifica=function(){
		if(""!=$scope.customerInfo.orgContactWay){
			if(!(/^1[34578]\d{9}$/.test($scope.customerInfo.orgContactWay))){
				return true;
			}
		}
	}
});