angular.module('${menuCode}')
.controller("${widgetCode}Ctrl",function($scope,AppKit,$ionicActionSheet,$timeout,$stateParams,$state){
	
	$scope.opportunityList();
	
	$scope.openModal = function(id,saleMan,type) {
		if(type=="oppDetails"){
			$state.go('tab.home-opp-information', {"id": id});
		}
	};
	
	$scope.deleteOpp = function(id){
		AppKit.confirm({operaType:'delete',action:function(){
			var url = "/aeaicrm/services/Customers/rest/delete-opp-info/"+id;
			AppKit.getJsonApi(url).success(function(rspJson){
				$scope.opportunityList();
			});
		}});
	};
	
});

