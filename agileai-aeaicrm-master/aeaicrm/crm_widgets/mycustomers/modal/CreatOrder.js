angular.module('${menuCode}')
.controller("${widgetCode}Ctrl",function($scope,AppKit,$ionicPopup){
	$scope.closeModal = function() {
		$scope.opportunityList();
		AppKit.closeModal();
	};
	
	$scope.orderInfo = {"oppId":$scope.id,"chief":"","deliveryCost":"","orderCost":"","saleMan":$scope.saleMan};
	
	$scope.creatOrderSave = function(){
		AppKit.isLogin().success(function(data, status, headers, config){
			if (data.result=='true'){
				$scope.userLogin = "isLogin";
				AppKit.secuityOperation("aeaicrm",{"backURL":"/map/repository/genassets/${navCode}/index.cv#/tab/home",
					"success":function(){
						var url="/aeaicrm/services/Customers/rest/add-cust-order";
						AppKit.postJsonApi(url,JSON.stringify($scope.orderInfo)).then(function(response){
							if ("success" == response.data){
								AppKit.hideMask();
								var popup = $ionicPopup.show({
								    title: '保存成功',
								    cssClass : 'popup-extend-mask',
								    buttons: [{
							                 text: '关闭',type: 'button-positive',onTap: function(e) {
							                	 popup.close();
							                	 $scope.opportunityList();
							                	 AppKit.closeModal();
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
	};
	
	
	$scope.isValidSaveInfo = function(){
		var orderInfo = $scope.orderInfo;
		if (orderInfo.chief && orderInfo.chief != '' && orderInfo.deliveryCost && orderInfo.deliveryCost!='' 
			&& orderInfo.orderCost && orderInfo.orderCost!='' ){
			return true;
		}
		else{
			return false;
		}
	};
});