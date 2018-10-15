angular.module('${menuCode}')
.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
	    return $sce.trustAsHtml(text);
	};
}])
.controller("${widgetCode}Ctrl",function($scope,AppKit,$ionicActionSheet,$state,$stateParams){
	$scope.userName=$stateParams.userName;
	
	$scope.tcPeriod = $stateParams.tcPeriod;
	$scope.tcId =$stateParams.tcId;
	$scope.tcBegin =$stateParams.tcBegin;
	$scope.tcEnd =$stateParams.tcEnd;
	
	$scope.activeTab="StrangeVisit";
	$scope.setActiveTab=function(activeTab){
		if('StrangeVisit'==activeTab){
			$scope.activeTab="StrangeVisit";
		}else if('IntentionFollowUp'==activeTab){
			$scope.activeTab="IntentionFollowUp";
		}else if('WorkSummary'==activeTab){
			$scope.activeTab="WorkSummary";
		}
	}
	
	//加载陌生拜访列表数据
	$scope.loadStrangeVisitListData = function(){
		var url = '/aeaicrm/services/TaskReview/rest/strange-list/'+$stateParams.tcId+'/'+$stateParams.userId;
		AppKit.getJsonApi(url).success(function(rspJson){
			if("isEmpty"!=rspJson.datas){
				$scope.StrangeVisitList = rspJson.datas;
			}else{
				$scope.StrangeVisitList = [];
			}
			
		});	
	}
	$scope.loadStrangeVisitListData();
	
	//加载意向跟进列表数据
	$scope.loadIntentFollowupListData = function(){
		var url = '/aeaicrm/services/TaskReview/rest/intention-list/'+$stateParams.tcId+'/'+$stateParams.userId;
		AppKit.getJsonApi(url).success(function(rspJson){
			if("isEmpty"!=rspJson.datas){
				$scope.intentFollowupList = rspJson.datas;
			}else{
				$scope.intentFollowupList = [];
			}
			
		});	
	}
	$scope.loadIntentFollowupListData();
	
	//加载工作总结数据
	$scope.loadWorkSummaryData = function(){
		$scope.tcId = $stateParams.tcId;
		var url = '/aeaicrm/services/TaskReview/rest/get-summary-info/'+$stateParams.tcId+'/'+$stateParams.userId;
		AppKit.getJsonApi(url).success(function(rspJson){
			if("isEmpty"!=rspJson.datas){
				$scope.workSummary = rspJson;
			}else{
				$scope.workSummary = [];
				$scope.workSummary.taskReviewState = '没有计划';
			}
		});	
	}
	$scope.loadWorkSummaryData();
	
	$scope.$on('$stateChangeSuccess', $scope.loadWorkSummaryData);
	
	//跳转陌生拜访详情页
	$scope.jumpStrangeVisitInfoPage = function(taskId,orgId) {
		$state.go("tab.task-strange-visit",{"orgId": orgId,"taskReviewId": $scope.workSummary.taskReviewId});  
	}
	
	//跳转意向跟进详情页
	$scope.jumpIntentFollowupInfoPage = function(taskId,custId) {
		$state.go("tab.task-my-customer-information",{"id": custId,"taskReviewId": $scope.workSummary.taskReviewId});  
	}
	
	//跳转编辑工作总结页
	$scope.jumpUpdateWorkSummaryPage = function() {
		$state.go("tab.update-worksummary",{"tcId":$scope.tcId,"taskReviewDesc":$scope.workSummary.taskReviewDesc}); 
	}
	
	//确认计划 
	$scope.confirmPlan = function(){
		$scope.taskReviewDesc = "ConfirmPlan";
		var url = '/aeaicrm/services/TaskReview/rest/update-summary-state/'+$scope.workSummary.taskReviewId+'/'+$scope.taskReviewDesc;
		AppKit.getJsonApi(url).success(function(rspJson){
			if ("success" == rspJson){
				AppKit.successPopup({"title":"确认成功!"});
				$scope.loadWorkSummaryData();
			}else{
				AppKit.errorPopup({"title":"确认失败!"});
			}
		});	
	}
	
	//打回计划
	$scope.repulsePlan = function(){
		$scope.taskReviewDesc = "Init";
		var url = '/aeaicrm/services/TaskReview/rest/update-summary-state/'+$scope.workSummary.taskReviewId+'/'+$scope.taskReviewDesc;
		AppKit.getJsonApi(url).success(function(rspJson){
			if ("success" == rspJson){
				AppKit.successPopup({"title":"打回成功!"});
				$scope.loadWorkSummaryData();
			}else{
				AppKit.errorPopup({"title":"打回失败!"});
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