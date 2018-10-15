angular.module('${menuCode}')
.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
	    return $sce.trustAsHtml(text);
	};
}])
.controller("${widgetCode}Ctrl",function($scope,AppKit,$stateParams,$ionicActionSheet,$ionicPopup,$state){
	  $scope.oppInfomation = function(){
		  var url = '/aeaicrm/services/Customers/rest/get-opp-info/'+$stateParams.id;
			AppKit.getJsonApi(url).success(function(rspJson){
				$scope.oppInfo = rspJson;
			});	
	  };
	  $scope.oppInfomation();
	  
	  $scope.updateSave = function(){
		  AppKit.isLogin().success(function(data, status, headers, config){
			  if (data.result=='true'){
				  $scope.userLogin = "isLogin";
					AppKit.secuityOperation("aeaicrm",{"backURL":"/map/repository/genassets/${navCode}/index.cv#/tab/home",
						"success":function(){
							var url = '/aeaicrm/services/Customers/rest/update-opp-info'
								AppKit.postJsonApi(url,JSON.stringify($scope.oppInfo)).then(function(response){
									if ("success" == response.data){
										var alertPopup = $ionicPopup.alert({  title: '保存成功!' });
										AppKit.hideMask();
								        alertPopup.then(function(res) {
								        	$state.go('tab.my-customer-information', {"id": $stateParams.custId});
							        });
									}else{
										AppKit.errorPopup();
									}
							});
						}
					})
			  }
		  })
	  };
	  
	  $scope.openModal = function(type){
			if(type="selectProduct"){
				AppKit.createModal("${menuCode}","SelectProduct",$scope);
			}
		}
		
		$scope.product = [{"value":"AEAI CRM"},
		                  {"value":"AEAI DP"},
		                  {"value":"AEAI ESB"},
		                  {"value":"AEAI HR"},
		                  {"value":"AEAI PORTAL"},
		                  {"value":"AEAI WM"}];
		

		$scope.doSelectProduct = function(){
			$scope.productList = [];
			for(var i=0;i < $scope.product.length;i++){
				var item =  $scope.product[i];
				if(item.checked){
					$scope.productList.push(item);
				}
			}
			$scope.oppInfo.productNames = "";
			for(var i=0;i < $scope.productList.length;i++){
				var productInfo =  $scope.productList[i];
				if(i != $scope.productList.length){
					$scope.oppInfo.productNames = $scope.oppInfo.productNames + productInfo.value + ",";
				}else{
					$scope.oppInfo.productNames = $scope.oppInfo.productNames + productInfo.value;	
				}
				
			}
		}
	  
	  $scope.oppInfo = {"name":"","concernProduct":"","expectInvest":"","level":"","des":""};
	  $scope.isValidSaveInfo = function(){
		  var oppInfo = $scope.oppInfo;
		  if (oppInfo.name && oppInfo.name != '' && oppInfo.concernProduct && oppInfo.concernProduct!='' && oppInfo.expectInvest && oppInfo.expectInvest!='' 
			  && oppInfo.level && oppInfo.level!='' && oppInfo.des && oppInfo.des!='' ){
			return true;
		  }
		  else{
			return false;
		  }
		};
		
		$scope.submit = function(){
			  var url = '/aeaicrm/services/Customers/rest/update-opp-state/'+$stateParams.id+"/"+1;
			  AppKit.getJsonApi(url).success(function(rspJson){
					if("success"==rspJson){
						var alertPopup = $ionicPopup.alert({  title: '提交成功!' });
						AppKit.hideMask();
				        alertPopup.then(function(res) {
				        	$state.go('tab.my-customer-information', {"id": $stateParams.custId});
			        });
					}else{
						AppKit.errorPopup();
					}
				});
		  };
	  
	  $scope.showActionSheet = function() {
			var hideSheet = $ionicActionSheet.show({
		          buttons: [
		            { text: '<b>保存</b> ' },
		            { text: '<b>提交</b> ' },
		          ],
		          titleText: '请选择您的操作',
		          cancelText: '取消',
		          cancel: function() {
		               // add cancel code..
		          },
		          buttonClicked: function(index) {
		        	  if(index==0){
		        		  $scope.updateSave();
		        	  }
		        	  if(index==1){
		        		  $scope.submit();
		        	  }
		            return true; 
		          }
		      });
	  }
});