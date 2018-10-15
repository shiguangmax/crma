angular.module('${menuCode}')
.controller("${widgetCode}Ctrl",function($scope,AppKit,$ionicActionSheet,$timeout,$state){
	
	$scope.search = function(){
		 AppKit.isLogin().success(function(data, status, headers, config){
			 if (data.result=='true'){
				 $scope.userLogin = "isLogin";
					AppKit.secuityOperation("aeaicrm",{"backURL":"/map/repository/genassets/${navCode}/index.cv#/tab/home",
						"success":function(){
							var url = '/aeaicrm/services/Customers/rest/list-for-name/'+$scope.searchWord;
							AppKit.getJsonApi(url).success(function(rspJson){
								$scope.listInfo = rspJson.datas;
							});
						}
					})
			 }
		 })
	}
	
	$scope.jumpInfoPage = function(id){
		$state.go('tab.my-customer-information', {"id": id});
	}
	
});