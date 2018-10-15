angular.module('${menuCode}')
.controller("${widgetCode}Ctrl",function($scope,AppKit,$ionicActionSheet,$timeout,$stateParams){
	//搜索
	$scope.searchCustomerName = function(){
		if($scope.searchWord == undefined){
			$scope.searchWord = "";
		}
		
		$scope.infoParam={"taskReviewId":$stateParams.taskReviewId,"name":$scope.searchWord};
		if("StrangeVisit" == $scope.activeTab){//陌生拜访创建记录
			$scope.loadPotentialCustomerListData = function(){
				AppKit.isLogin().success(function(data, status, headers, config){
					if (data.result=='true'){
						$scope.userLogin = "isLogin";
						AppKit.secuityOperation("aeaicrm",{"backURL":"/map/repository/genassets/${navCode}/index.cv#/tab/home",
							"success":function(){
								var url = '/aeaicrm/services/MyTasks/rest/potential-cust-list/'+$scope.infoParam;
								AppKit.getJsonApi(url).success(function(rspJson){
									$scope.strangeCustomerList = rspJson.datas;
								})
							}
						})
					}
				})
			}
			$scope.loadPotentialCustomerListData();
		}else if("IntentionFollowUp" == $scope.activeTab){//意向跟进创建记录
			$scope.loadMyCustomerListData = function(){
				AppKit.isLogin().success(function(data, status, headers, config){
					 if (data.result=='true'){
						 $scope.userLogin = "isLogin";
							AppKit.secuityOperation("aeaicrm",{"backURL":"/map/repository/genassets/${navCode}/index.cv#/tab/home",
								"success":function(){
									var url = '/aeaicrm/services/MyTasks/rest/my-cust-list';
									AppKit.postJsonApi(url,JSON.stringify($scope.infoParam)).then(function(response){
										if(response.statusText == "OK"){
											AppKit.hideMask();
											$scope.intentionCustomerList = response.data.datas;
										}
									});
								}
							})
					 }
				})
			}
			$scope.loadMyCustomerListData();
		}
	}
	
});