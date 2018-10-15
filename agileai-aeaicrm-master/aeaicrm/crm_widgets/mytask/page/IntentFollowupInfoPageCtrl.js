angular.module('${menuCode}')
.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
	    return $sce.trustAsHtml(text);
	};
}])
.controller("${widgetCode}Ctrl",function($scope,AppKit,$stateParams,$ionicActionSheet,$state,$ionicHistory,$rootScope){
	
	//加载数据
	$scope.loadIntentFollowupInfoData = function(){
		var url = '/aeaicrm/services/MyTasks/rest/intention-info/'+$stateParams.taskId;
		AppKit.getJsonApi(url).success(function(rspJson){
			$scope.customerInfo = rspJson;
		});	
	}
	$scope.loadIntentFollowupInfoData();
	
	//打开拜访记录模态
	$scope.openMyTasksIntentVisitModal = function(id,category) {
		$scope.visitId = id;
		$scope.visitCategory = category;
		AppKit.createModal("${menuCode}","TasksIntentFollowupRecordModal",$scope);
	}
	
	$scope.showActionSheet = function() {
	      var hideSheet = $ionicActionSheet.show({
	          buttons: [
	            { text: '<b>无意向</b>'  },
	            { text: '<b>再跟进</b>'  },
	            { text: '<b>编辑客户</b>'  }
	          ],
	          titleText: '请选择您的操作',
	          cancelText: '取消',
	          cancel: function() {
	               // add cancel code..
	          },
	          buttonClicked: function(index) {
	        	  if(index==0){
	        		  $state.go("tab.nointent-info",{"orgSalesman": $scope.customerInfo.custCreateId,"orgSalesmanName": $scope.customerInfo.custCreateName,"taskId":$stateParams.taskId,"taskReviewId":$stateParams.taskReviewId,"activeTab":$stateParams.activeTab,"tcPeriod":$stateParams.tcPeriod});
	        	  }
	        	  else if(index==1){
	        		  $state.go("tab.againfollowup-info",{"orgSalesman": $scope.customerInfo.custCreateId,"orgSalesmanName": $scope.customerInfo.custCreateName,"taskId":$stateParams.taskId,"orgId":$scope.customerInfo.orgId,"custName":$scope.customerInfo.custName,"custId":$scope.customerInfo.custId,"taskReviewId":$stateParams.taskReviewId,"activeTab":$stateParams.activeTab,"tcPeriod":$stateParams.tcPeriod});
	        	  }
	        	  else if(index==2){
	        		  $state.go("tab.my-customer-information",{"id": $stateParams.custId}); 
	        	  }
	            return true; 
	          }
	      });
	  };
});