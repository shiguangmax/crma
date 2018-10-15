angular.module('${menuCode}')
.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
	    return $sce.trustAsHtml(text);
	};
}])
.controller("${widgetCode}Ctrl",function($scope,AppKit,$ionicActionSheet,$state,$stateParams){
	//搜索
	$scope.doSearch = function(){
		$state.go("tab.potential-customer-search");
	}
	//加载列表数据
	$scope.loadPotentialCustomerListData = function(){
		AppKit.isLogin().success(function(data, status, headers, config){
			if (data.result=='true'){
				$scope.userLogin = "isLogin";
				AppKit.secuityOperation("aeaicrm",{"backURL":"/map/repository/genassets/${navCode}/index.cv#/tab/home",
					"success":function(){
						$scope.searchWord={"orgState":"","orgClassification":"","orgLabels":""};
						var url = '/aeaicrm/services/ProCustomer/rest/list/';
						AppKit.postJsonApi(url,JSON.stringify($scope.searchWord)).then(function(response){
							if (null != response.data){
								AppKit.hideMask();
								$scope.listInfo = response.data;
							}
						});
					}
				})
			}
		})
	}
	$scope.loadPotentialCustomerListData();
	//下拉选过滤数据，在list.js里调此方法
	$scope.selectPotentialCustomerListData = function(state,classificat,label){
		AppKit.isLogin().success(function(data, status, headers, config){
			if (data.result=='true'){
				$scope.userLogin = "isLogin";
				AppKit.secuityOperation("aeaicrm",{"backURL":"/map/repository/genassets/${navCode}/index.cv#/tab/home",
					"success":function(){
						if(classificat == undefined){
							classificat = "";
						}
						if(label == undefined){
							label = "";
						}
						$scope.searchWord={"orgState":"'+state+'","orgClassification":"'+classificat+'","orgLabels":"'+label+'"};
						var url = '/aeaicrm/services/ProCustomer/rest/list/';
						AppKit.postJsonApi(url,JSON.stringify($scope.searchWord)).then(function(response){
							if (null != response.data){
								AppKit.hideMask();
								$scope.listInfo = response.data;
							}
						});
					}
				})
			}
		})
	}
	
	$scope.$on('$stateChangeSuccess', $scope.loadPotentialCustomerListData); 
	
	//新增
	$scope.setupProfile = function(){
		$scope.resetAddCustomer();
		$scope.modalTitle = "新增潜在客户";
		AppKit.createModal("${menuCode}","AddPotentialCustomerModal",$scope);
	}
	
	$scope.resetAddCustomer = function(){
		$scope.addCustomer = {"orgName":"","orgClassification":"","orgType":"","orgSources":"","orgLinkmanName":"","orgEmail":"","orgLabels":"","orgWebsite":"","orgSalesmanName":"","orgState":"","orgCreaterName":"","orgCreateTime":"","orgUpdateTime":"","orgVisitAgainTime":"","orgContactWay":"","orgAddress":"","orgIntroduction":""};
	}
	
	//新增保存
	$scope.addCustomer = {"orgName":"","orgClassification":"","orgType":"","orgSources":"","orgLinkmanName":"","orgEmail":"","orgLabels":"","orgWebsite":"","orgSalesmanName":"","orgState":"","orgCreaterName":"","orgCreateTime":"","orgUpdateTime":"","orgVisitAgainTime":"","orgContactWay":"","orgAddress":"","orgIntroduction":""};
	$scope.doSave = function(){
		AppKit.isLogin().success(function(data, status, headers, config){
			if (data.result=='true'){
				$scope.userLogin = "isLogin";
				AppKit.secuityOperation("aeaicrm",{"backURL":"/map/repository/genassets/${navCode}/index.cv#/tab/home",
					"success":function(){
						var url = "/aeaicrm/services/ProCustomer/rest/add-cust-info/";
						AppKit.postJsonApi(url,JSON.stringify($scope.addCustomer)).then(function(response){
							if ("success" == response.data){
								AppKit.successPopup({"title":"保存成功!"});
								$scope.loadPotentialCustomerListData();
								AppKit.closeModal();
							}else{
								AppKit.errorPopup({"title":"保存失败!"});
								$scope.loadPotentialCustomerListData();
								AppKit.closeModal();
							}
						});
					}
				})
			}
		})
	}
	//提示非空校验
	$scope.doRequired=function(){
		if(!$scope.addCustomer.orgName){
			return true;
		}
	}
	//提示邮箱校验
	$scope.emailVerifica=function(){
		if(""!=$scope.addCustomer.orgEmail){
			if(!$scope.addCustomer.orgEmail){
				return true;
			}
		}
	}
	//提示手机校验
	$scope.phoneVerifica=function(){
		if(""!=$scope.addCustomer.orgContactWay){
			if(!(/^1[34578]\d{9}$/.test($scope.addCustomer.orgContactWay))){
				return true;
			}
		}
	}
});