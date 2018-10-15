angular.module('${menuCode}')
.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
	    return $sce.trustAsHtml(text);
	};
}])
.controller("${widgetCode}Ctrl",function($scope,AppKit,$ionicActionSheet,$stateParams,$state,$rootScope,$ionicPopup){
	  
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
				$scope.tabCount['CustomerBasicInformation'] = rspJson.corpNewsCount;
				$scope.tabCount['VisitRecord'] = rspJson.industryNewsCount;
				$scope.tabCount['BusinessOpportunityManager'] = rspJson.techTrendsCount;
				$scope.tabCount['OrderManager'] = rspJson.traincenterCount;

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
	  
	    $scope.showActionSheet = function() {
			var tabCode = $scope.activeTab;
			var custState = $scope.listInfo.custState;
			if(tabCode==""){
				buidMyCustomerActionSheet(custState)
			}else{
				buidTaskActionSheet(tabCode);
			}

		  }; 
		function buidMyCustomerActionSheet(custState){
			if(custState=='初始化'){
				var hideSheet = $ionicActionSheet.show({
			          buttons: [
			            { text: '<b>保存</b> ' },
			            { text: '<b>提交</b> ' },
			            { text: '<b>新建联系人</b> ' }
			          ],
			          titleText: '请选择您的操作',
			          cancelText: '取消',
			          cancel: function() {
			        	  
			          },
			          buttonClicked: function(index) {
			        	  if(index==0){
			        		  $scope.update();
			        	  }
			        	  if(index==1){
			        		  $scope.submit();
			        	  }
			        	  if(index==2){
			        		  $scope.creatLinkman();
			        	  }
			            return true; 
			          }
			      });
			}else if(custState == '确认'||custState == '提交'){
				var hideSheet = $ionicActionSheet.show({
			          buttons: [
			            { text: '<b>新增拜访记录</b> ' }
			          ],
			          titleText: '请选择您的操作',
			          cancelText: '取消',
			          cancel: function() {
			        	  
			          },
			          buttonClicked: function(index) {
			        	  if(index==0){
			        		  $scope.creatVisit();
			        	  }
			            return true; 
			          }
			      });
			}
		}
		
		function buidTaskActionSheet(tabCode){
			if(tabCode == "CustomerBasicInformation"){
				if($scope.listInfo.recordState == true){
					var hideSheet = $ionicActionSheet.show({
				          buttons: [
				            { text: '<b>保存</b> ' },
				            { text: '<b>提交</b> ' },
				            { text: '<b>新建联系人</b> ' }
				          ],
				          titleText: '请选择您的操作',
				          cancelText: '取消',
				          cancel: function() {
				        	  
				          },
				          buttonClicked: function(index) {
				        	  if(index==0){
				        		  $scope.update();
				        	  }
				        	  if(index==1){
				        		  $scope.submit();
				        	  }
				        	  if(index==2){
				        		  $scope.creatLinkman();
				        	  }
				            return true; 
				          }
				      });
				}else{
					AppKit.successPopup({"title":"无效操作"});
				}
			}else if(tabCode == "VisitRecord"){
				var hideSheet = $ionicActionSheet.show({
			          buttons: [
			            { text: '<b>新增拜访记录</b> ' }
			          ],
			          titleText: '请选择您的操作',
			          cancelText: '取消',
			          cancel: function() {
			        	  
			          },
			          buttonClicked: function(index) {
			        	  if(index==0){
			        		  $scope.creatVisit();
			        	  }
			            return true; 
			          }
			      });
			}else if(tabCode == "BusinessOpportunityManager"){
				var hideSheet = $ionicActionSheet.show({
			          buttons: [
			            { text: '<b>新增商机</b> ' }
			          ],
			          titleText: '请选择您的操作',
			          cancelText: '取消',
			          cancel: function() {
			        	  
			          },
			          buttonClicked: function(index) {
			        	  if(index==0){
			        		  $scope.creatOpp();
			        	  }
			            return true; 
			          }
			      });
			}
		}
		  $scope.update = function(){
			  AppKit.isLogin().success(function(data, status, headers, config){
				  if (data.result=='true'){
					  $scope.userLogin = "isLogin";
						AppKit.secuityOperation("aeaicrm",{"backURL":"/map/repository/genassets/${navCode}/index.cv#/tab/home",
							"success":function(){
								var url="/aeaicrm/services/Customers/rest/update-cust-info";
								AppKit.postJsonApi(url,JSON.stringify($scope.listInfo)).then(function(response){
									if ("success" == response.data){
										AppKit.hideMask();
										var popup = $ionicPopup.show({
										    title: '保存成功',
										    cssClass : 'popup-extend-mask',
										    buttons: [{
									                 text: '关闭',type: 'button-positive',onTap: function(e) {
									                	 popup.close();
									                	 $state.go("tab.my-customers-list");
									                 }
									               }
										    	]			     
										});
									}else{
										AppKit.errorPopup();
									}
								});
							}
						})
				  }
			  })
			}
		  
		  $scope.submit = function(){
				var url="/aeaicrm/services/Customers/rest/update-cust-state/"+$stateParams.id+"/"+"Submit";
				AppKit.getJsonApi(url).success(function(rspJson){
					if ("success" == rspJson){
						AppKit.hideMask();
						var popup = $ionicPopup.show({
						    title: '提交成功',
						    cssClass : 'popup-extend-mask',
						    buttons: [{
					                 text: '关闭',type: 'button-positive',onTap: function(e) {
					                	 popup.close();
					                	 $state.go("tab.my-customers-list");
					                 }
					               }
						    	]			     
						});
					}else{
						AppKit.errorPopup();
					}
				});
			};
		  
		$scope.creatLinkman = function(){
			var custId = $scope.id;
			$state.go('tab.creat-linkman', {"custId": custId});
		}
		
		$scope.openModal = function(id,type){
				if(type=="linkmanDetail"){
				var custId = $scope.id;
				$state.go('tab.linkman-info', {"custId": custId,"linkmanId":id});
			}else if(type=="editLinkman"){
				var custId = $scope.id;
				$state.go('tab.edit-linkman', {"custId": custId,"linkmanId":id});
			}
		}
		
		$scope.deleteLinkman = function(id){
			AppKit.confirm({operaType:'delete',action:function(){
				var url = "/aeaicrm/services/Customers/rest/delete-contacts-info/"+id;
				AppKit.getJsonApi(url).success(function(rspJson){
					$scope.customerBasic();
				});
			}});
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
			tabCss();
		}
		
		$scope.orders = function(){
			var url = '/aeaicrm/services/Customers/rest/find-cust-order/'+$stateParams.id;
			AppKit.getJsonApi(url).success(function(rspJson){
				$scope.orderList = rspJson.datas;
			});
		}
		
		$scope.creatOpp = function(){
			var custId = $stateParams.id;
			  $state.go('tab.creat-business-opportunity',{"custId": custId}); 
		};
		
		$scope.creatVisit = function(){
		  	  var custId = $stateParams.id;
			  $state.go('tab.creat-visit-record',{"custId": custId}); 
		  };
		  
		$scope.selectProvince = function(){
			var url = '/aeaicrm/services/FormSelectUtil/rest/codeList/'+"PROVINCE";
			AppKit.getJsonApi(url).success(function(rspJson){
					$scope.provinceList=rspJson;
			});
		  }
		$scope.selectProvince();	
});

