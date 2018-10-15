angular.module('${menuCode}')
.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
	    return $sce.trustAsHtml(text);
	};
}])
.controller("${widgetCode}Ctrl",function($scope,AppKit,$ionicActionSheet,$stateParams,$state,$ionicPopup){
	
	$scope.likman = function(){
		var url = '/aeaicrm/services/Customers/rest/get-contacts-info/'+$stateParams.linkmanId;
		AppKit.getJsonApi(url).success(function(rspJson){
				$scope.linkmanDetail=rspJson;
		});
	};
	
	$scope.updateSave = function(){
		var url ='/aeaicrm/services/Customers/rest/update-contacts-info'
			AppKit.postJsonApi(url,JSON.stringify($scope.linkmanDetail)).then(function(response){
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
	};
	
	$scope.linkmanDetail = {"name":"","sex":"","job":"","phone":"","email":"","other":""};
	$scope.isValidSaveInfo = function(){
		var linkmanDetail = $scope.linkmanDetail;
		if (linkmanDetail.name && linkmanDetail.name != '' && linkmanDetail.sex && linkmanDetail.sex!='' && linkmanDetail.job && linkmanDetail.job!='' 
			&& linkmanDetail.phone && linkmanDetail.phone!='' && linkmanDetail.email && linkmanDetail.email!='' && linkmanDetail.other && linkmanDetail.other!=''){
			return true;
		}
		else{
			return false;
		}
	};
});