angular.module('${menuCode}')
.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
	    return $sce.trustAsHtml(text);
	};
}])
.controller("${widgetCode}Ctrl",function($scope,AppKit,$stateParams,$ionicActionSheet,$state,$ionicHistory,$ionicPopup){
	//加载数据
	$scope.loadPotentialCustomerInfoData = function(){
		var url = '/aeaicrm/services/MyTasks/rest/strange-info/'+$stateParams.taskId;
		AppKit.getJsonApi(url).success(function(rspJson){
			$scope.customerInfo = rspJson;
		});	
	}
	$scope.loadPotentialCustomerInfoData();
	
	//打开拜访记录模态
	$scope.openMyTasksVisitModal = function(id,category) {
		$scope.visitId = id;
		$scope.visitCategory = category;
		AppKit.createModal("${menuCode}","TasksStrangeVisitRecordModal",$scope);
	}
	//放弃
	$scope.confirmWaiver = function() {
        var confirmPopup = $ionicPopup.confirm({
          title: '信息确认',
          template: '确认放弃此客户吗？'
        });
        confirmPopup.then(function(res) {
          if(res) {
        	  var url = "/aeaicrm/services/MyTasks/rest/no-follow-info/"+$stateParams.taskReviewId+'/'+$scope.customerInfo.orgId;
	      	  AppKit.getJsonApi(url).success(function(rspJson){
	      		if ("success" == rspJson){
	      			$ionicHistory.goBack();
	      			/*$state.go("tab.my-task",{"taskReviewId":$stateParams.taskReviewId,"activeTab":$stateParams.activeTab,"tcPeriod":$stateParams.tcPeriod});*/ 
	      		}
	      	  });
          } 
        });
      };
	
	$scope.showActionSheet = function() {
	      var hideSheet = $ionicActionSheet.show({
	          buttons: [
	            { text: '<b>暂缓</b>'  },
	            { text: '<b>跟进</b>'  },
	            { text: '<b>放弃</b>'  },
	            { text: '<b>编辑客户</b>'  }
	          ],
	          titleText: '请选择您的操作',
	          cancelText: '取消',
	          cancel: function() {
	               // add cancel code..
	          },
	          buttonClicked: function(index) {
	        	  if(index==0){
	        		  $state.go("tab.suspend-info",{"orgSalesman": $scope.customerInfo.orgSalesman,"orgSalesmanName": $scope.customerInfo.orgSalesmanName,"taskId":$stateParams.taskId,"orgId":$stateParams.orgId,"taskReviewId":$stateParams.taskReviewId,"activeTab":$stateParams.activeTab,"tcPeriod":$stateParams.tcPeriod});
	        	  }
	        	  else if(index==1){
	        		  $state.go("tab.followup-info",{"orgSalesman": $scope.customerInfo.orgSalesman,"orgSalesmanName": $scope.customerInfo.orgSalesmanName,"taskId":$stateParams.taskId,"orgId":$stateParams.orgId,"orgName":$scope.customerInfo.orgName,"taskReviewId":$stateParams.taskReviewId,"activeTab":$stateParams.activeTab,"tcPeriod":$stateParams.tcPeriod});
	        	  }
	        	  else if(index==2){
	        		  $scope.confirmWaiver();
	        	  }
	        	  else if(index==3){
	        		  $state.go("tab.potentialcustomer-Info",{"orgId": $stateParams.orgId}); 
	        	  }
	            return true; 
	          }
	      });
	  };
});