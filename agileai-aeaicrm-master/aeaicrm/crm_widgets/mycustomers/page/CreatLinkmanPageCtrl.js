angular.module('${menuCode}')
.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
	    return $sce.trustAsHtml(text);
	};
}])
.controller("${widgetCode}Ctrl",function($scope,AppKit,$ionicActionSheet,$stateParams,$state,$ionicPopup){
	
	$scope.info = {"custId":$stateParams.custId,"name":"","sex":"M","job":"","phone":"","email":"","other":""};
	$scope.saveLinkman = function(){
		var url="/aeaicrm/services/Customers/rest/add-cust-contacts";
		AppKit.postJsonApi(url,JSON.stringify($scope.info)).then(function(response){
			if ("success" == response.data){
				var alertPopup = $ionicPopup.alert({  title: '保存成功!' });
					AppKit.hideMask();
			        alertPopup.then(function(res) {
			        	$state.go('tab.my-customer-information', {"id": $stateParams.custId});
						$scope.info = {"name":"","sex":"","job":"","phone":"","email":"","other":""};
		        });
			}else{
				AppKit.errorPopup();
			}
		});
	};
	
	
	$scope.isValidSaveInfo = function(){
		var linkmanInfo = $scope.info;
		if (linkmanInfo.name && linkmanInfo.name != '' && linkmanInfo.sex && linkmanInfo.sex!='' && linkmanInfo.job && linkmanInfo.job!='' 
			&& linkmanInfo.phone && linkmanInfo.phone!='' && linkmanInfo.email && linkmanInfo.email!='' && linkmanInfo.other && linkmanInfo.other!=''){
			return true;
		}
		else{
			return false;
		}
	};
});