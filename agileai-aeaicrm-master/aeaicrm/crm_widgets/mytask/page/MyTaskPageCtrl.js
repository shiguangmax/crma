angular.module('${menuCode}')
.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
	    return $sce.trustAsHtml(text);
	};
}])
.controller("${widgetCode}Ctrl",function($scope,AppKit,$ionicActionSheet,$state,$stateParams){
	$scope.tcPeriod = $stateParams.tcPeriod;//周期定义的时间
	$scope.taskReviewId =$stateParams.taskReviewId;
	
	$scope.activeTab = $stateParams.activeTab;
	if(undefined == $scope.activeTab){
		$scope.activeTab="StrangeVisit";
	}
	
	$scope.setActiveTab=function(activeTab){
		$scope.activeTab = activeTab;
	}
	
	//加载陌生拜访列表数据
	$scope.loadStrangeVisitListData = function(){
		AppKit.isLogin().success(function(data, status, headers, config){
			if (data.result=='true'){
				$scope.userLogin = "isLogin";
				AppKit.secuityOperation("aeaicrm",{"backURL":"/map/repository/genassets/${navCode}/index.cv#/tab/home",
					"success":function(){
						var url = '/aeaicrm/services/MyTasks/rest/strange-list/'+$stateParams.taskReviewId;
						AppKit.getJsonApi(url).success(function(rspJson){
							$scope.StrangeVisitList = rspJson.datas;
						});	
					}
				})
			}
		})
	}
	$scope.loadStrangeVisitListData();
	
	$scope.$on('$stateChangeSuccess', $scope.loadStrangeVisitListData);
	
	//加载意向跟进列表数据
	$scope.loadIntentFollowupListData = function(){
		AppKit.isLogin().success(function(data, status, headers, config){
			if (data.result=='true'){
				$scope.userLogin = "isLogin";
				AppKit.secuityOperation("aeaicrm",{"backURL":"/map/repository/genassets/${navCode}/index.cv#/tab/home",
					"success":function(){
						var url = '/aeaicrm/services/MyTasks/rest/intention-list/'+$stateParams.taskReviewId;
						AppKit.getJsonApi(url).success(function(rspJson){
							$scope.intentFollowupList = rspJson.datas;
						});
					}
				})
			}
		})
	}
	$scope.loadIntentFollowupListData();
	
	$scope.$on('$stateChangeSuccess', $scope.loadIntentFollowupListData);
	
	//加载工作总结数据
	$scope.loadWorkSummaryData = function(){
		AppKit.isLogin().success(function(data, status, headers, config){
			if (data.result=='true'){
				$scope.userLogin = "isLogin";
				AppKit.secuityOperation("aeaicrm",{"backURL":"/map/repository/genassets/${navCode}/index.cv#/tab/home",
					"success":function(){
						$scope.taskReviewId = $stateParams.taskReviewId;
						var url = '/aeaicrm/services/MyTasks/rest/get-summary-info/'+$stateParams.taskReviewId;
						AppKit.getJsonApi(url).success(function(rspJson){
							$scope.workSummary = rspJson;
							if(undefined == $scope.workSummary.taskReviewState){
								$scope.workSummary.taskReviewState = '无';
							}
						});	
					}
				})
			}
		})
	}
	$scope.loadWorkSummaryData();
	
	//跳转陌生拜访详情页
	$scope.jumpStrangeVisitInfoPage = function(taskId,orgId,taskReviewId) {
		$state.go("tab.strange-visit-info",{"taskId": taskId,"orgId": orgId,"taskReviewId":taskReviewId,"activeTab":$scope.activeTab,"tcPeriod":$scope.tcPeriod}); 
	}
	
	//跳转意向跟进详情页
	$scope.jumpIntentFollowupInfoPage = function(taskId,custId) {
		$state.go("tab.intent-followup",{"taskId": taskId,"custId": custId,"taskReviewId":$stateParams.taskReviewId,"activeTab":$scope.activeTab,"tcPeriod":$scope.tcPeriod}); 
	}
	
	//跳转编辑工作总结页
	$scope.jumpUpdateWorkSummaryPage = function() {
		$state.go("tab.update-worksummary",{"taskReviewId":$scope.taskReviewId,"taskReviewDesc":$scope.workSummary.taskReviewDesc}); 
	}
	
	//提交总结
	$scope.updateStateInfo = function(){
		$scope.taskReviewId = $stateParams.taskReviewId;
		$scope.taskReviewState = 'SubmitPlan';
		var url = '/aeaicrm/services/MyTasks/rest/update-state-info/'+$stateParams.taskReviewId+'/'+$scope.taskReviewState;
		AppKit.getJsonApi(url).success(function(rspJson){
			if ("success" == rspJson){
				AppKit.successPopup({"title":"提交成功!"});
				$scope.loadWorkSummaryData();
			}else{
				AppKit.errorPopup({"title":"提交失败!"});
			}
		});	
	}
	
	//工作汇总 
	$scope.summary = function(){
		var url = '/aeaicrm/services/MyTasks/rest/save-summary-info/'+$stateParams.taskReviewId+'/'+$scope.workSummary.orderNum+'/'+$scope.workSummary.oppNum;
		AppKit.getJsonApi(url).success(function(rspJson){
			if ("success" == rspJson){
				AppKit.successPopup({"title":"汇总成功!"});
				$scope.loadWorkSummaryData();
			}else{
				AppKit.errorPopup({"title":"汇总失败!"});
			}
		});	
	}
	
	$scope.showActionSheet = function() {
		if('WorkSummary'!=$scope.activeTab){
			var hideSheet = $ionicActionSheet.show({
		          buttons: [
		            { text: '<b>创建记录</b>'  },
		            { text: '<b>提交总结</b>'  },
		            { text: '<b>工作汇总</b>'  }
		          ],
		          titleText: '请选择您的操作',
		          cancelText: '取消',
		          cancel: function() {
		               // add cancel code..
		          },
		          buttonClicked: function(index) {
		        	  if(index==0){
		        		  $state.go("tab.Insert-Record",{"taskReviewId":$stateParams.taskReviewId,"activeTab":$scope.activeTab,"taskReviewState":$scope.workSummary.taskReviewState,"tcPeriod":$scope.tcPeriod});
		        	  }
		        	  else if(index==1){
		        		  $scope.updateStateInfo();
		        	  }
		        	  else if(index==2){
		        		  $scope.summary();
		        	  }
		            return true; 
		          }
		      });
		}else{
			var hideSheet = $ionicActionSheet.show({
		          buttons: [
		            { text: '<b>提交总结</b>'  },
		            { text: '<b>工作汇总</b>'  }
		          ],
		          titleText: '请选择您的操作',
		          cancelText: '取消',
		          cancel: function() {
		               // add cancel code..
		          },
		          buttonClicked: function(index) {
		        	  if(index==0){
		        		  $scope.updateStateInfo();
		        	  }
		        	  else if(index==1){
		        		  $scope.summary();
		        	  }
		            return true; 
		          }
		      });
		}
	      
	  };
});