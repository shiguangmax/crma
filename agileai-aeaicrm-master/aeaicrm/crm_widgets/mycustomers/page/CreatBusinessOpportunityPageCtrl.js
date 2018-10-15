angular.module('${menuCode}')
.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
	    return $sce.trustAsHtml(text);
	};
}])
.controller("${widgetCode}Ctrl",function($scope,AppKit,$stateParams,$state,$ionicPopup){
	
	$scope.oppList = function(){
		var url = '/aeaicrm/services/Customers/rest/find-cust-opp/'+$stateParams.custId;
		AppKit.getJsonApi(url).success(function(rspJson){
			$scope.oppList = rspJson.datas;
		});	
	 };
	 
	$scope.oppInfo = {"custId":$stateParams.custId,"name":"","productNames":"","expectInvest":"","level":"","des": ""};
	
	$scope.creatOppSave = function(){
		AppKit.isLogin().success(function(data, status, headers, config){
			if (data.result=='true'){
				$scope.userLogin = "isLogin";
				AppKit.secuityOperation("aeaicrm",{"backURL":"/map/repository/genassets/${navCode}/index.cv#/tab/home",
					"success":function(){
						var url = '/aeaicrm/services/Customers/rest/add-cust-opp';
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
	
	$scope.isValidSaveInfo = function(){
		var oppInfo = $scope.oppInfo;
		if (oppInfo.name && oppInfo.name != '' && oppInfo.concernProduct && oppInfo.concernProduct!='' && oppInfo.expectInvest && oppInfo.expectInvest!='' 
			&& oppInfo.level && oppInfo.level!='' && oppInfo.des && oppInfo.des!=''){
			return true;
		}
		else{
			return false;
		}
	};
});

