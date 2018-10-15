angular.module('${menuCode}')
.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
	    return $sce.trustAsHtml(text);
	};
}])
.controller("${widgetCode}Ctrl",function($scope,AppKit,$stateParams,$state,$ionicHistory){
	$scope.infoParam={"taskReviewId":$stateParams.taskReviewId,"name":""};
	$scope.activeTab = $stateParams.activeTab;
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
							});
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
	
	//复选框操作
	$scope.selected = [];
    $scope.selectedTags = [];
    $scope.orgIds ="";
    //实际操作数组的方法
    var updateStrangeSelect = function (action, orgId, orgName) {
        if (action == 'add' && $scope.selected.indexOf(orgId) == -1) {
            $scope.selected.push(orgId);
            $scope.selectedTags.push(orgName);
        }
        if (action == 'remove' && $scope.selected.indexOf(orgId) != -1) {
            var idx = $scope.selected.indexOf(orgId);
            $scope.selected.splice(idx, 1);
            $scope.selectedTags.splice(idx, 1);
        }
        $scope.orgIds = $scope.selected.join(",");
    };
    //根据传入的动作和要操作的id更新Array
    $scope.updateStrangeSelection = function ($event, orgId) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateStrangeSelect(action, orgId, checkbox.orgName);
        $scope.isValidSuspendInfo();
    };
    //返回true false
    $scope.isSelected = function (orgId) {
        return $scope.selected.indexOf(orgId) >= 0;
    };
    
    $scope.custIds ="";
    //实际操作数组的方法
    var updateIntentionSelect = function (action, custId, custName) {
        if (action == 'add' && $scope.selected.indexOf(custId) == -1) {
            $scope.selected.push(custId);
            $scope.selectedTags.push(custName);
        }
        if (action == 'remove' && $scope.selected.indexOf(custId) != -1) {
            var idx = $scope.selected.indexOf(custId);
            $scope.selected.splice(idx, 1);
            $scope.selectedTags.splice(idx, 1);
        }
        $scope.custIds = $scope.selected.join(",");
    };
    //根据传入的动作和要操作的id更新Array
    $scope.updateIntentionSelection = function ($event, custId) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateIntentionSelect(action, custId, checkbox.custName);
        $scope.isValidSuspendInfo();
    };
    //返回true false
    $scope.isSelected = function (custId) {
        return $scope.selected.indexOf(custId) >= 0;
    };
	
    //创建记录
	$scope.doCreate = function(){
		AppKit.isLogin().success(function(data, status, headers, config){
			if (data.result=='true'){
				$scope.userLogin = "isLogin";
				AppKit.secuityOperation("aeaicrm",{"backURL":"/map/repository/genassets/${navCode}/index.cv#/tab/home",
					"success":function(){
						$scope.taskReviewState = "ConfirmPlan";
						if("StrangeVisit" == $scope.activeTab){
							var url = '/aeaicrm/services/MyTasks/rest/create-intention-task/'+$stateParams.taskReviewId+'/'+$scope.taskReviewState+'/'+$scope.orgIds;
							AppKit.getJsonApi(url).success(function(rspJson){
								if ("success" == rspJson){
									AppKit.successPopup({"title":"创建成功!"});
									$ionicHistory.goBack();
									/*$state.go("tab.my-task",{"taskReviewId": $stateParams.taskReviewId,"tcPeriod": $stateParams.tcPeriod,"activeTab": $scope.activeTab});*/
								}else{
									AppKit.errorPopup({"title":"创建失败!"});
								}
							});	
						}else if("IntentionFollowUp" == $scope.activeTab){
							var url = '/aeaicrm/services/MyTasks/rest/create-strange-task/'+$stateParams.taskReviewId+'/'+$scope.taskReviewState+'/'+$scope.custIds;
							AppKit.getJsonApi(url).success(function(rspJson){
								if ("success" == rspJson){
									AppKit.successPopup({"title":"创建成功!"});
									$ionicHistory.goBack();
								}else{
									AppKit.errorPopup({"title":"创建失败!"});
								}
							});	
						}
					}
				})
			}
		})
	}
	
	//保存按钮校验
	if("StrangeVisit" == $scope.activeTab){
		$scope.isValidSuspendInfo = function(){
			if ( "" != $scope.orgIds ){
				return true;
			}
			else{
				return false;
			}
		}
	}else if("IntentionFollowUp" == $scope.activeTab){
		$scope.isValidSuspendInfo = function(){
			if ("" != $scope.custIds){
				return true;
			}
			else{
				return false;
			}
		}
	}
});