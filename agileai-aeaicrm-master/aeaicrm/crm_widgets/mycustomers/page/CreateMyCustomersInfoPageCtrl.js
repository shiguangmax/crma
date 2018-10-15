angular.module('${menuCode}')
.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
	    return $sce.trustAsHtml(text);
	};
}])
.controller("${widgetCode}Ctrl",function($scope,AppKit,$state,$ionicPopup){
	
	$scope.info = {"name":"","industry":"","province":"","level": "","progressState":"","address":"","web":"","introduce":""};
	
	$scope.saveCustomerInfo = function(){
		AppKit.isLogin().success(function(data, status, headers, config){
			if (data.result=='true'){
				$scope.userLogin = "isLogin";
				AppKit.secuityOperation("aeaicrm",{"backURL":"/map/repository/genassets/${navCode}/index.cv#/tab/home",
					"success":function(){
						var url = '/aeaicrm/services/Customers/rest/add-cust-info';
						AppKit.postJsonApi(url,JSON.stringify($scope.info)).then(function(response){
							if ("success" == response.data){
								var alertPopup = $ionicPopup.alert({  title: '保存成功!' });
								AppKit.hideMask();
						        alertPopup.then(function(res) {
						        	$state.go("tab.my-customers-list");
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
	
	$scope.openModal = function(type){
		if(type == "SelectProvince"){
			AppKit.createModal("${menuCode}","SelectProvince",$scope);
		}
		if(type == "SelectIndustry"){
			AppKit.createModal("${menuCode}","SelectIndustry",$scope);
		}
	}
	
	$scope.isValidSaveInfo = function(){
		var info = $scope.info;
		if (info.name && info.name != '' && info.industry && info.industry!='' && info.province && info.province!='' 
			&& info.level && info.level!='' && info.progressState && info.progressState!='' && info.address && info.address!=''
				&& info.web && info.web!='' && info.introduce && info.introduce!=''){
			return true;
		}
		else{
			return false;
		}
	};
});