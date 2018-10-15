angular.module('${menuCode}')
.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
	    return $sce.trustAsHtml(text);
	};
}])
.controller("${widgetCode}Ctrl",function($scope,AppKit,$stateParams,$state,$ionicPopup){
	 
	$scope.visitList = function(){
		  var url = '/aeaicrm/services/Customers/rest/find-cust-visit/'+$stateParams.custId;
			AppKit.getJsonApi(url).success(function(rspJson){
				$scope.listInfo = rspJson.datas;
			});	
	 };
	 
	$scope.info = {"VISIT_CUST_ID":$stateParams.custId,"type":"","effect":"","visitDate":"","receptionName":"","receptionSex": "","receptionJob":"","receptionPhone":""};
	
	$scope.saveVisit = function(){
		AppKit.isLogin().success(function(data, status, headers, config){
			if (data.result=='true'){
				$scope.userLogin = "isLogin";
				AppKit.secuityOperation("aeaicrm",{"backURL":"/map/repository/genassets/${navCode}/index.cv#/tab/home",
					"success":function(){
						var url = '/aeaicrm/services/Customers/rest/add-cust-visit';
						AppKit.postJsonApi(url,JSON.stringify($scope.info)).then(function(response){
							if ("success" == response.data){
								var alertPopup = $ionicPopup.alert({  title: '保存成功!' });
								AppKit.hideMask();
						        alertPopup.then(function(res) {
						        	$state.go('tab.my-customer-information',{"id": $stateParams.custId});
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
	
	$scope.linkmans = function(){
		var url = '/aeaicrm/services/Customers/rest/find-cont-list/'+$stateParams.custId;
			AppKit.getJsonApi(url).success(function(rspJson){
				$scope.linkmanList = rspJson;
			});
	}
	$scope.linkmans();
	
	$scope.isValidSaveInfo = function(){
		var info = $scope.info;
		if (info.type && info.type != '' && info.effect && info.effect!='' && info.visitDate && info.visitDate!='' 
			&& info.receptionName && info.receptionName!='' && info.receptionSex && info.receptionSex!='' && info.receptionJob && info.receptionJob!=''
				&& info.receptionPhone && info.receptionPhone!=''){
			return true;
		}
		else{
			return false;
		}
	};
});