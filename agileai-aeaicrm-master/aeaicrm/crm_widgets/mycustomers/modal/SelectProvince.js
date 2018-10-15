angular.module('${menuCode}')
.controller("${widgetCode}Ctrl",function($scope,AppKit){
	$scope.closeModal = function() {
		AppKit.closeModal();
	};
	
	$scope.selectProvince = function(){
		var url = '/aeaicrm/services/FormSelectUtil/rest/codeList/'+"PROVINCE";
		AppKit.getJsonApi(url).success(function(rspJson){
				$scope.provinceList=rspJson;
		});
	  }
	$scope.selectProvince();
	
	$scope.setProvinceId = function(provinceId,provinceValue){
		$scope.info.province = provinceId;
		$scope.provinceValue = provinceValue;
	}
	
	$scope.doSelectProvince = function(){
		$scope.info.provinceName = $scope.provinceValue;

	}
});