angular.module('${menuCode}')
.controller("${widgetCode}Ctrl",function($scope,AppKit,$ionicPopup){
	$scope.closeModal = function() {
		$scope.orderinfo();
		AppKit.closeModal();
	};
	$scope.entryInfo = function(){
		var url = '/aeaicrm/services/Customers/rest/get-cust-order-entry/'+$scope.entryId;
		AppKit.getJsonApi(url).success(function(rspJson){
			$scope.orderEntryInfo = rspJson;
		});	
	};
	$scope.entryInfo();
	
	$scope.update = function(){
		var url = '/aeaicrm/services/Customers/rest/update-cust-order-entry'
			AppKit.postJsonApi(url,JSON.stringify($scope.orderEntryInfo)).then(function(response){
				if ("success" == response.data){
					AppKit.hideMask();
					var popup = $ionicPopup.show({
					    title: '保存成功',
					    cssClass : 'popup-extend-mask',
					    buttons: [{
				                 text: '关闭',type: 'button-positive',onTap: function(e) {
				                	 popup.close();
				                	 AppKit.closeModal();
				                	 $scope.orderinfo();
				                 }
				               }
					    	]			     
					});
				}else{
					AppKit.errorPopup();
				}
			});
	};
	
	$scope.entryDiscount = function (){
		var discount = document.getElementById("discount").value;
		if(discount<=0){
			AppKit.successPopup({"title":"折扣不可小于0"});
		}else if(discount>=10){
			AppKit.successPopup({"title":"折扣不可大于10"});
		}
	}
});