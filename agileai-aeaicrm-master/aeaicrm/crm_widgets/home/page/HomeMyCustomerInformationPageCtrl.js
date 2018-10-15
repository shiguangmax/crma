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
				$scope.tabCount['HomeCustomerBasicInformation'] = rspJson.corpNewsCount;
				$scope.tabCount['HomeVisitRecord'] = rspJson.industryNewsCount;
				$scope.tabCount['HomeBusinessOppManager'] = rspJson.techTrendsCount;
				$scope.tabCount['HomeOrderManager'] = rspJson.traincenterCount;

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
	  
	//确认商机 
		$scope.confirmBusinessOpportunity = function(){
			$scope.state = "2";
			var url = '/aeaicrm/services/Customers/rest/update-opp-state/'+$stateParams.id+'/'+$scope.state;
			AppKit.getJsonApi(url).success(function(rspJson){
				if ("success" == rspJson){
					AppKit.successPopup({"title":"确认成功!"});
				}else{
					AppKit.errorPopup({"title":"确认失败!"});
				}
			});	
		}
		
		//反确认商机
		$scope.noConfirmBusinessOpportunity = function(){
			$scope.state = "0";
			var url = '/aeaicrm/services/Customers/rest/update-opp-state/'+$stateParams.id+'/'+$scope.state;
			AppKit.getJsonApi(url).success(function(rspJson){
				if ("success" == rspJson){
					AppKit.successPopup({"title":"确认成功!"});
				}else{
					AppKit.errorPopup({"title":"确认失败!"});
				}
			});	
		}
		
		//确认订单 
		$scope.confirmOrder = function(){
			AppKit.isLogin().success(function(data, status, headers, config){
				if (data.result=='true'){
					$scope.userLogin = "isLogin";
					AppKit.secuityOperation("aeaicrm",{"backURL":"/map/repository/genassets/${navCode}/index.cv#/tab/home",
						"success":function(){
							$scope.state = "2";
							var url = '/aeaicrm/services/Customers/rest/update-order-state/'+$stateParams.id+'/'+$scope.state;
							AppKit.getJsonApi(url).success(function(rspJson){
								if ("success" == rspJson){
									AppKit.successPopup({"title":"确认成功!"});
								}else{
									AppKit.errorPopup({"title":"确认失败!"});
								}
							});	
						}
					})
				}
			})
		}
		
		//反确认订单
		$scope.noConfirmOrder = function(){
			AppKit.isLogin().success(function(data, status, headers, config){
				if (data.result=='true'){
					 $scope.userLogin = "isLogin";
						AppKit.secuityOperation("aeaicrm",{"backURL":"/map/repository/genassets/${navCode}/index.cv#/tab/home",
							"success":function(){
								$scope.state = "0";
								var url = '/aeaicrm/services/Customers/rest/update-order-state/'+$stateParams.id+'/'+$scope.state;
								AppKit.getJsonApi(url).success(function(rspJson){
									if ("success" == rspJson){
										AppKit.successPopup({"title":"确认成功!"});
									}else{
										AppKit.errorPopup({"title":"确认失败!"});
									}
								});	
							}
						})
				}
			})
		}
	  
	  $scope.showActionSheet = function() {
			var tabCode = $scope.activeTab;
			if(tabCode == "HomeBusinessOppManager"){
				var hideSheet = $ionicActionSheet.show({
			          buttons: [
			            { text: '<b>确认商机</b> ' },
			            { text: '<b>反确认商机</b> ' }
			          ],
			          titleText: '请选择您的操作',
			          cancelText: '取消',
			          cancel: function() {
			               // add cancel code..
			          },
			          buttonClicked: function(index) {
			        	  if(index==0){
			        		  $scope.confirmBusinessOpportunity();
			        	  }
			        	  if(index==1){
			        		  $scope.noConfirmBusinessOpportunity();
			        	  }
			            return true; 
			          }
			      });
			}else if(tabCode == "HomeOrderManager"){
				var hideSheet = $ionicActionSheet.show({
					 buttons: [
			            { text: '<b>确认订单</b> ' },
			            { text: '<b>反确认订单</b> ' }
			          ],
			          titleText: '请选择您的操作',
			          cancelText: '取消',
			          cancel: function() {
			               // add cancel code..
			          },
			          buttonClicked: function(index) {
			        	  if(index==0){
			        		  $scope.confirmOrder();
			        	  }
			        	  if(index==1){
			        		  $scope.noConfirmOrder();
			        	  }
			            return true; 
			          }
			      });
			}
		  }; 
	    
		$scope.openModal = function(id,type){
				if(type=="linkmanDetail"){
				var custId = $scope.id;
				$state.go('tab.home-linkman-info', {"custId": custId,"linkmanId":id});
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

