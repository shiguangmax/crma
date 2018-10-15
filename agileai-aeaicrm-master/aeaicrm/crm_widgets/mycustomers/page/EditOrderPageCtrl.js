angular.module('${menuCode}')
.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
	    return $sce.trustAsHtml(text);
	};
}])
.controller("${widgetCode}Ctrl",function($scope,AppKit,$ionicActionSheet,$stateParams,$state){
	
	$scope.orderinfo = function(){
		var url = '/aeaicrm/services/Customers/rest/get-cust-order/'+$stateParams.id;
		AppKit.getJsonApi(url).success(function(rspJson){
			$scope.orderInfo = rspJson;
		});	
	};
	$scope.orderinfo();
	
	$scope.creatOrderEntry = function(){
		$scope.id = $stateParams.id;
		AppKit.createModal("${menuCode}","CreatOrderEntry",$scope);
	};
	
	$scope.submit = function(){
		AppKit.isLogin().success(function(data, status, headers, config){
			if (data.result=='true'){
				$scope.userLogin = "isLogin";
				AppKit.secuityOperation("aeaicrm",{"backURL":"/map/repository/genassets/${navCode}/index.cv#/tab/home",
					"success":function(){
						var url = '/aeaicrm/services/Customers/rest/update-order-state/'+$stateParams.id+"/"+1;
						  AppKit.getJsonApi(url).success(function(rspJson){
							if("success"==rspJson){
								AppKit.successPopup();
								$scope.orderinfo();
							}else{
								AppKit.errorPopup();
							}
						});
					}
				})
			}
		})
	};
	
	$scope.showActionSheet = function() {
		AppKit.isLogin().success(function(data, status, headers, config){
			if (data.result=='true'){
				$scope.userLogin = "isLogin";
				AppKit.secuityOperation("aeaicrm",{"backURL":"/map/repository/genassets/${navCode}/index.cv#/tab/home",
					"success":function(){
						var hideSheet = $ionicActionSheet.show({
					          buttons: [
					            { text: '<b>提交</b> ' },
					            { text: '<b>保存</b> ' },
					            { text: '<b>新建产品清单</b> ' }
					          ],
					          titleText: '请选择您的操作',
					          cancelText: '取消',
					          cancel: function() {
					               // add cancel code..
					          },
					          buttonClicked: function(index) {
					        	  if(index==0){
					        		  $scope.submit();
					        		  $scope.orderinfo();
					        	  }
					        	  if(index==1){
					        		  var url ='/aeaicrm/services/Customers/rest/update-cust-order'
					        				AppKit.postJsonApi(url,JSON.stringify($scope.orderInfo)).then(function(response){
					        					if ("success" == response.data){
					        						AppKit.successPopup();
					        						$scope.orderinfo();
					        					}else{
					        						AppKit.errorPopup();
					        					}
					        				});
					        	  }
					        	  if(index==2){
					        		  $scope.creatOrderEntry();
					        	  }
					            return true; 
					          }
					      });
					}
				})
			}
		})
	};
});