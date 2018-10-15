angular.module('${menuCode}')
.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
	    return $sce.trustAsHtml(text);
	};
}])
.controller("${widgetCode}Ctrl",function($scope,AppKit,$ionicActionSheet,$stateParams,$state,$rootScope){
	  
	AppKit.addSwipeSupport($scope);
	
	  $scope.customerBasic = function(){
		var url = '/aeaicrm/services/Customers/rest/get-details/'+$stateParams.id;
		AppKit.getJsonApi(url).success(function(rspJson){
				$scope.listInfo=rspJson;
				$scope.id=rspJson.id;
				$scope.linkmanList();
		});
	  }
	
	  $scope.loadListData = function(){
			$scope.onInitState = true;
			var url ='/map/services/DataProvider/rest/static-data/Knowage';
			var promise = AppKit.getJsonApi(url);
			promise.success(function(rspJson){
				$scope.corpNews = rspJson.corpNews;
				$scope.industryNews = rspJson.industryNews;
				$scope.techTrends = rspJson.techTrends;
				$scope.traincenter = rspJson.traincenter;
				$scope.tabCount['TaskCustomerBasicInformation'] = rspJson.corpNewsCount;
				$scope.tabCount['TaskVisitRecord'] = rspJson.industryNewsCount;
				$scope.tabCount['TaskBusinessOppManager'] = rspJson.techTrendsCount;
				$scope.tabCount['TaskOrderManager'] = rspJson.traincenterCount;

				$scope.onInitState = false;
				$scope.tabMores[$scope.activeTab] = true;
			});
		}
		$scope.loadListData();
		
		$scope.setActiveTab = function (activeTab) {     
	        $scope.activeTab = activeTab; 
	        tabCss();
		};	
		
		
	  function tabCss (){
		  $(".item-content").css({transform: "translate3d(0px, 0px, 0px)"});
	  }
	  
	//确认计划 
		$scope.confirmPlan = function(){
			$scope.taskReviewDesc = "ConfirmPlan";
			var url = '/aeaicrm/services/TaskReview/rest/update-summary-state/'+$stateParams.taskReviewId+'/'+$scope.taskReviewDesc;
			AppKit.getJsonApi(url).success(function(rspJson){
				if ("success" == rspJson){
					AppKit.successPopup({"title":"确认成功!"});
				}else{
					AppKit.errorPopup({"title":"确认失败!"});
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
				}else{
					AppKit.errorPopup({"title":"打回失败!"});
				}
			});	
		}
	  
	  $scope.showActionSheet = function() {
			var hideSheet = $ionicActionSheet.show({
		          buttons: [
		            { text: '<b>确认计划</b> ' },
		            { text: '<b>打回计划</b> ' },
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
		        	  if(index==1){
		        		  $scope.repulsePlan();
		        	  }
		            return true; 
		          }
		      });
	   }
	    
		$scope.openModal = function(id,type){
				if(type=="linkmanDetail"){
				var custId = $scope.id;
				$state.go('tab.task-linkman-info', {"custId": custId,"linkmanId":id});
			}
		}
		
		$scope.linkmanList = function(){
			var linkmanUrl = '/aeaicrm/services/Customers/rest/find-cust-contacts/'+$stateParams.id;
			AppKit.getJsonApi(linkmanUrl).success(function(rspJson){
					$scope.linkman=rspJson.datas;
			});
		}
		
		$scope.opportunityList = function(){
			var url = '/aeaicrm/services/Customers/rest/find-cust-opp/'+$stateParams.id;
			AppKit.getJsonApi(url).success(function(rspJson){
				$scope.oppList = rspJson.datas;
			});	
		}
		
		$scope.orders = function(){
			var url = '/aeaicrm/services/Customers/rest/find-cust-order/'+$stateParams.id;
			AppKit.getJsonApi(url).success(function(rspJson){
				$scope.orderList = rspJson.datas;
			});
		}
});

