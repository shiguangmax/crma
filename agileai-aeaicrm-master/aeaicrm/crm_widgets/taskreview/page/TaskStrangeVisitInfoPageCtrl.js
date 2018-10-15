angular.module('${menuCode}')
.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
	    return $sce.trustAsHtml(text);
	};
}])
.controller("${widgetCode}Ctrl",function($scope,AppKit,$stateParams,$ionicActionSheet,$state,$ionicHistory,$rootScope){
	//加载数据
	$scope.loadPotentialCustomerInfoData = function(){
		var url = '/aeaicrm/services/ProCustomer/rest/get-info/'+$stateParams.orgId;
		AppKit.getJsonApi(url).success(function(rspJson){
			$scope.customerInfo = rspJson;
		});	
	}
	$scope.loadPotentialCustomerInfoData();

	//打开拜访记录模态
	$scope.openVisitListModal = function(id,category) {
		$scope.visitId = id;
		if("我的客户拜访" == category){
			$scope.visitCategory = 'FOLLOW_CUST';
		}else if("潜在客户拜访" == category){
			$scope.visitCategory = 'PRO_CUST';
		}
		
		AppKit.createModal("${menuCode}","StrangeVisitRecordModal",$scope);
	}
	
	//确认计划 
	$scope.confirmPlan = function(){
		$scope.taskReviewDesc = "ConfirmPlan";
		var url = '/aeaicrm/services/TaskReview/rest/update-summary-state/'+$stateParams.taskReviewId+'/'+$scope.taskReviewDesc;
		AppKit.getJsonApi(url).success(function(rspJson){
			if ("success" == rspJson){
				AppKit.successPopup({"title":"确认成功!"});
				$scope.loadPotentialCustomerInfoData();
			}else{
				AppKit.errorPopup({"title":"确认失败!"});
				$scope.loadPotentialCustomerInfoData();
			}
		});	
	}
	
	//打回计划
	$scope.repulsePlan = function(){
		$scope.taskReviewDesc = "Init";
		var url = '/aeaicrm/services/TaskReview/rest/update-summary-state/'+$stateParams.taskReviewId+'/'+$scope.taskReviewDesc;
		AppKit.getJsonApi(url).success(function(rspJson){
			if ("success" == rspJson){
				AppKit.successPopup({"title":"打回成功!"});
				$scope.loadPotentialCustomerInfoData();
			}else{
				AppKit.errorPopup({"title":"打回失败!"});
				$scope.loadPotentialCustomerInfoData();
			}
		});	
	}
	
	$scope.showActionSheet = function() {
	      var hideSheet = $ionicActionSheet.show({
	          buttons: [
	            { text: '<b>确认计划</b>'  },
	            { text: '<b>打回计划</b>'  }
	          ],
	          titleText: '请选择您的操作',
	          cancelText: '取消',
	          cancel: function() {
	               // add cancel code..
	          },
	          buttonClicked: function(index) {
	        	  if(index==0){
	        		  $scope.confirmPlan();
	        	  }
	        	  else if(index==1){
	        		  $scope.repulsePlan();
	        	  }
	            return true; 
	          }
	      });
	  };
});