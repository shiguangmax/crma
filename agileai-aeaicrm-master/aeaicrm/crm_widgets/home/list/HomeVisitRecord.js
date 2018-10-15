angular.module('${menuCode}')
.controller("${widgetCode}Ctrl",function($scope,AppKit,$ionicActionSheet,$timeout,$stateParams,$state){
	 $scope.visitList = function(){
		  var url = '/aeaicrm/services/Customers/rest/find-cust-visit/'+$stateParams.id;
			AppKit.getJsonApi(url).success(function(rspJson){
				$scope.listInfo = rspJson.datas;
			});	
	  };
	  $scope.visitList();
	  
	  $scope.openModal = function(id,type) {
			if(type=="showDetails"){
				$state.go('tab.home-visit-record-infomation', {"id": id});
			}
		};
});